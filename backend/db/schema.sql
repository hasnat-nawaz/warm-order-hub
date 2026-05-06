-- Warm Order Hub (Campus Dhaba) schema for Neon PostgreSQL
-- Safe to re-run: uses IF NOT EXISTS where possible.

BEGIN;

-- ---------- Extensions ----------
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ---------- Enums ----------
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('customer', 'vendor');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'order_status') THEN
    CREATE TYPE order_status AS ENUM ('Pending', 'Preparing', 'Ready', 'Picked up', 'Cancelled');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'payment_method') THEN
    CREATE TYPE payment_method AS ENUM ('EasyPaisa', 'JazzCash', 'Cash on Pickup');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'cancel_reason') THEN
    CREATE TYPE cancel_reason AS ENUM ('user', 'vendor');
  END IF;
END $$;

-- ---------- Core tables ----------
CREATE TABLE IF NOT EXISTS vendors (
  id              TEXT PRIMARY KEY,
  name            TEXT NOT NULL,
  tagline         TEXT NOT NULL DEFAULT '',
  location        TEXT NOT NULL DEFAULT '',
  hours           TEXT NOT NULL DEFAULT '',
  prep_time       TEXT NOT NULL DEFAULT '',
  accepting       BOOLEAN NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username        TEXT NOT NULL UNIQUE,
  password_hash   TEXT NOT NULL,
  role            user_role NOT NULL,
  display_name    TEXT NOT NULL,
  vendor_id       TEXT NULL REFERENCES vendors(id) ON DELETE SET NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT users_vendor_role_check
    CHECK ((role = 'vendor' AND vendor_id IS NOT NULL) OR (role = 'customer' AND vendor_id IS NULL))
);

-- NOTE: images stay frontend-static. We store only an optional "image_key"
-- (e.g. item id) for future use; current frontend derives images by id/category.
CREATE TABLE IF NOT EXISTS menu_items (
  id              TEXT PRIMARY KEY,
  vendor_id       TEXT NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  price           INTEGER NOT NULL CHECK (price >= 0),
  category        TEXT NOT NULL,
  description     TEXT NOT NULL DEFAULT '',
  image_key       TEXT NULL,
  active          BOOLEAN NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_menu_items_vendor ON menu_items(vendor_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_vendor_active ON menu_items(vendor_id, active);

CREATE TABLE IF NOT EXISTS orders (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  public_id             BIGINT GENERATED ALWAYS AS IDENTITY UNIQUE,
  vendor_id             TEXT NOT NULL REFERENCES vendors(id) ON DELETE RESTRICT,
  customer_user_id      UUID NULL REFERENCES users(id) ON DELETE SET NULL,
  customer_display_name TEXT NOT NULL,
  status                order_status NOT NULL DEFAULT 'Pending',
  payment               payment_method NOT NULL,
  notes                 TEXT NULL,
  pickup_time_24        TEXT NOT NULL, -- "HH:MM" (matches frontend)
  placed_at             TIMESTAMPTZ NOT NULL DEFAULT now(),
  cancellation_reason   cancel_reason NULL,
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT orders_cancel_check CHECK (
    (status = 'Cancelled' AND cancellation_reason IS NOT NULL)
    OR (status <> 'Cancelled' AND cancellation_reason IS NULL)
  )
);

CREATE INDEX IF NOT EXISTS idx_orders_vendor_placed ON orders(vendor_id, placed_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_customer_placed ON orders(customer_user_id, placed_at DESC);

CREATE TABLE IF NOT EXISTS order_lines (
  order_id   UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  item_id    TEXT NOT NULL REFERENCES menu_items(id) ON DELETE RESTRICT,
  qty        INTEGER NOT NULL CHECK (qty > 0),
  unit_price INTEGER NOT NULL CHECK (unit_price >= 0),
  item_name  TEXT NOT NULL,
  PRIMARY KEY (order_id, item_id)
);

-- Optional per-user favourites (frontend currently stores in local state,
-- but we support DB so "static data" is gone).
CREATE TABLE IF NOT EXISTS favorites (
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  item_id    TEXT NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, item_id)
);

-- ---------- Triggers for updated_at ----------
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_vendors_updated_at') THEN
    CREATE TRIGGER trg_vendors_updated_at
    BEFORE UPDATE ON vendors
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_users_updated_at') THEN
    CREATE TRIGGER trg_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_menu_items_updated_at') THEN
    CREATE TRIGGER trg_menu_items_updated_at
    BEFORE UPDATE ON menu_items
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_orders_updated_at') THEN
    CREATE TRIGGER trg_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
  END IF;
END $$;

COMMIT;

