# Backend — Warm Order Hub API

> The Express + TypeScript REST API for **Warm Order Hub**. It owns authentication, vendor / menu data, and the full order lifecycle, and talks to a Neon PostgreSQL database over TLS. Everything the frontend, the vendor dashboard, and the CI/CD pipeline rely on lives behind these endpoints.

## What this README is

This is the README for the **`backend/`** workspace. It documents:

- What the backend is responsible for and what's deliberately *not* here.
- How authentication, validation, and database access work.
- How to run the backend on your laptop, in Docker, and in production.
- Every REST endpoint, with the role required and the request/response shape.
- The database schema, migration script, and demo seed data.

For the bigger picture (frontend, CI/CD, EC2 deploy), see the top-level [`../README.md`](../README.md).

---

## Table of Contents

- [What the Backend Owns](#what-the-backend-owns)
- [How It's Built](#how-its-built)
- [First-Time Setup](#first-time-setup)
- [Running the Backend](#running-the-backend)
- [Database Schema & Migrations](#database-schema--migrations)
- [Seed Data](#seed-data)
- [REST API Reference](#rest-api-reference)
- [Authentication Model](#authentication-model)
- [Validation & Error Format](#validation--error-format)
- [Environment Variables](#environment-variables)
- [Building & Containerizing](#building--containerizing)
- [Project Layout](#project-layout)
- [Common Issues](#common-issues)

---

## What the Backend Owns

The backend is the **single source of truth** for:

- **Identity** — customer/vendor signup and login, password hashing, JWT issuing.
- **Authorization** — role-based access (customers can place orders, vendors can manage their menu and orders).
- **Vendors & menus** — read endpoints for the storefront, plus vendor-only write endpoints for menu management.
- **Orders** — placing, listing, status transitions (`Pending → Preparing → Ready → Picked up`, plus `Cancelled`), edits while still pending, and cancellation reasons.
- **Vendor availability** — the "currently accepting orders" toggle each vendor sees on their dashboard.

What's deliberately **not** here:

- **Static images** — menu item photos are bundled with the frontend (`frontend/src/assets/items/<id>.jpg`). The DB only stores an optional `image_key`.
- **Mocks / fake data in production** — every list the frontend renders comes from real Postgres rows.
- **Persistent state on the server** — Postgres is on **Neon** (managed cloud), so wiping or rebuilding the EC2 host does not lose data.

---

## How It's Built

| Concern             | Choice                                                                                              |
| ------------------- | --------------------------------------------------------------------------------------------------- |
| **Runtime**         | Node.js 20 (Alpine in Docker)                                                                       |
| **Language**        | TypeScript 5 (strict, ESM)                                                                          |
| **HTTP framework**  | Express 5                                                                                           |
| **Validation**      | [Zod](https://zod.dev) on every request body and route param                                        |
| **Auth**            | JSON Web Tokens (`jsonwebtoken`), 7-day expiry, signed with `JWT_SECRET`                            |
| **Passwords**       | `bcrypt` with cost factor 12                                                                        |
| **Security**        | `helmet` (HTTP hardening) + strict CORS allow-list driven by `CLIENT_ORIGIN`                        |
| **Database client** | `pg` (node-postgres) connection pool, TLS auto-enabled when the URL has `sslmode=require`           |
| **Dev runtime**     | `tsx watch` for hot-reload TypeScript                                                               |
| **Build**           | `tsc -p tsconfig.json` → `dist/`                                                                    |
| **Production run**  | `node dist/index.js`                                                                                |

The whole API lives in one focused file (`src/index.ts`) so you can read every endpoint in a single scroll. Auth, DB, and middleware are split out for clarity.

---

## First-Time Setup

Run these once after cloning the monorepo.

### Prerequisites

- **Node.js ≥ 20** and **npm ≥ 10**
- A **PostgreSQL** database (the supported default is [Neon](https://neon.tech) — its free tier is enough)

### 1. Install dependencies

From the **repo root**:

```bash
npm install
```

This installs the backend workspace too (npm workspaces). You don't need a separate `npm install` inside `backend/` unless you want to add a dependency *only* to the backend — in that case use `npm install <pkg> -w backend`.

### 2. Create your `.env`

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env`:

```env
PORT=8080
DATABASE_URL=postgresql://<user>:<pass>@<host>/<db>?sslmode=require
JWT_SECRET=<a-long-random-string>
CLIENT_ORIGIN=http://localhost:5173,http://localhost:8081
```

> Generate a strong `JWT_SECRET` quickly: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`.

### 3. Apply the schema and seed demo data

```bash
npm run db:apply:schema -w backend
npm run db:seed -w backend
```

The schema is **idempotent** (every `CREATE` uses `IF NOT EXISTS`, every enum is conditional, every trigger is wrapped in `DO $$ ... $$`). The seed uses `ON CONFLICT DO UPDATE` so re-running it upserts rather than duplicating.

---

## Running the Backend

### Development (hot reload)

From the repo root:

```bash
npm run dev -w backend
```

Or, from the `backend/` folder:

```bash
npm run dev
```

Internally this runs `tsx watch src/index.ts`. Save any `.ts` file and the server restarts automatically.

You should see:

```
Backend listening on http://localhost:8080
```

### Health check

```bash
curl http://localhost:8080/api/health
# → {"ok":true}
```

### Production mode (compiled)

```bash
npm run build -w backend       # tsc → dist/
npm run start -w backend       # node dist/index.js
```

The Docker production image runs exactly this `start` command (see [Building & Containerizing](#building--containerizing)).

### Combined dev (backend + frontend)

From the repo root:

```bash
npm start
```

Starts both workspaces with `concurrently`, colour-coded logs, and hot reload on each side.

---

## Database Schema & Migrations

The schema lives in [`db/schema.sql`](db/schema.sql). It's a single file that creates everything in a `BEGIN; … COMMIT;` block.

### Tables (created in order)

| Table         | Purpose                                                                                  |
| ------------- | ---------------------------------------------------------------------------------------- |
| `vendors`     | One row per dhaba (id, name, tagline, location, hours, prep_time, accepting flag).        |
| `users`       | Customers and vendors. `role` ENUM, optional `vendor_id` FK enforced by a CHECK.          |
| `menu_items`  | Per-vendor menu, soft-deleted by toggling `active` to FALSE.                              |
| `orders`      | One row per order, plus a human-friendly `public_id BIGINT IDENTITY`.                     |
| `order_lines` | Per-item lines (`qty`, `unit_price`, `item_name` snapshot for audit).                     |
| `favorites`   | Per-user favourite items (FK chain, `ON DELETE CASCADE`).                                 |

### Enums

- `user_role` — `customer | vendor`
- `order_status` — `Pending | Preparing | Ready | Picked up | Cancelled`
- `payment_method` — `EasyPaisa | JazzCash | Cash on Pickup`
- `cancel_reason` — `user | vendor`

### Triggers

Every table that has `updated_at` is fitted with a `BEFORE UPDATE` trigger calling `set_updated_at()`, so timestamps are always honest.

### Apply / re-apply the schema

```bash
npm run db:apply:schema -w backend
```

Behind the scenes:

```ts
const sql = await readFile("db/schema.sql", "utf8");
await pool.query(sql);
```

Safe to run on an empty DB *or* on an existing one — no rows are touched, only DDL is reconciled. There is intentionally **no migration framework** (Knex, Prisma, Sequelize) — the schema is small enough that one idempotent file is the simpler win.

---

## Seed Data

Run by:

```bash
npm run db:seed -w backend
```

It's a transactional script (`BEGIN … COMMIT`) that inserts:

- **4 vendors** — Ayan Gardens, Sip Spot, Raju Hotel, Juice Spot.
- **~70 menu items** spread across the vendors and categories like *Breakfast*, *Desi*, *Fastfood*, *Chinese*, *Drinks*, *Tea*, *Coffee*, *Snacks*, *Juices*.
- **7 demo users** (3 customers + 4 vendors). Passwords are bcrypt-hashed at seed time.

| Role     | Username | Password   |
| -------- | -------- | ---------- |
| customer | ahmed    | ahmed123   |
| customer | ali      | ali123     |
| customer | demo     | demo123    |
| vendor   | ayan     | ayan123    |
| vendor   | sip      | sip123     |
| vendor   | raju     | raju123    |
| vendor   | juice    | juice123   |

Re-running the seed is **safe**: every insert uses `ON CONFLICT (...) DO UPDATE`, so it upserts vendors / menu items / users rather than duplicating them.

---

## REST API Reference

Base URL in dev: `http://localhost:8080`. All non-public endpoints expect a `Bearer <jwt>` header.

| Method | Path                                       | Auth         | Role     | What it does                                                    |
| ------ | ------------------------------------------ | ------------ | -------- | ---------------------------------------------------------------- |
| GET    | `/api/health`                              | public       | —        | Liveness probe → `{ ok: true }`                                  |
| POST   | `/api/auth/signup`                         | public       | —        | Create a customer account, return JWT + user.                    |
| POST   | `/api/auth/login`                          | public       | any      | Verify credentials, return JWT + user.                           |
| GET    | `/api/vendors`                             | public       | —        | List all vendors (sorted by name).                                |
| GET    | `/api/menu`                                | public       | —        | List all *active* menu items across all vendors.                 |
| GET    | `/api/vendors/:vendorId/menu`              | public       | —        | List active menu items for a single vendor.                       |
| POST   | `/api/vendor/menu-items`                   | required     | vendor   | Create a new item for the caller's vendor.                        |
| PATCH  | `/api/vendor/menu-items/:itemId`           | required     | vendor   | Partial update of name/price/category/description/active.         |
| DELETE | `/api/vendor/menu-items/:itemId`           | required     | vendor   | Soft-delete (sets `active = FALSE`).                              |
| POST   | `/api/orders`                              | required     | customer | Place a new order with one or more `lines`.                       |
| GET    | `/api/orders/me`                           | required     | customer | Caller's order history (newest first), including `lines`.         |
| GET    | `/api/vendor/orders`                       | required     | vendor   | All orders for the caller's vendor, including `lines`.            |
| PATCH  | `/api/orders/:orderId/status`              | required     | owner¹   | Move an order between statuses, with cancellation reason rules.   |
| PATCH  | `/api/orders/:orderId/lines`               | required     | customer | Replace order lines while order is still `Pending` (own order).   |
| PATCH  | `/api/vendors/:vendorId/accepting`         | required     | vendor   | Toggle the vendor's "accepting orders" flag.                      |

> ¹ "owner" = the customer who placed the order, OR the vendor it belongs to.

### Examples

**Login:**

```bash
curl -s -X POST http://localhost:8080/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"demo","password":"demo123"}'
```

```json
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": { "id": "uuid", "username": "demo", "role": "customer", "displayName": "Demo Student" }
  }
}
```

**Place an order:**

```bash
TOKEN='paste-the-jwt-here'
curl -s -X POST http://localhost:8080/api/orders \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "vendorId": "ayan",
    "pickupTime": "13:30",
    "payment": "Cash on Pickup",
    "notes": "Less spicy please",
    "lines": [
      { "itemId": "ayan-biryani", "qty": 1 },
      { "itemId": "ayan-mint-lemonade", "qty": 2 }
    ]
  }'
```

The backend always re-prices the order from `menu_items.price` — the client cannot send unit prices, so a tampered request can't lower the total.

**Advance an order's status (vendor):**

```bash
curl -s -X PATCH http://localhost:8080/api/orders/<order-id>/status \
  -H "Authorization: Bearer $VENDOR_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"status":"Preparing"}'
```

---

## Authentication Model

- **Signup** creates a customer (`role = 'customer'`, no `vendor_id`). Vendor accounts are created only via the seed script — vendors don't self-serve sign up.
- **Login** matches on `username` (case-insensitive), checks bcrypt hash.
- On both endpoints, the response includes a **JWT** with payload:

  ```json
  { "sub": "<user-uuid>", "role": "customer|vendor", "vendorId": "ayan|null" }
  ```

  signed with `JWT_SECRET`, expiring in **7 days**.

- The `authRequired` middleware:

  - Reads `Authorization: Bearer <token>`.
  - Verifies the signature, validates the payload with Zod (`jwtPayloadSchema`).
  - Attaches `req.user = { id, role, vendorId }` for handlers to use.
  - Returns `401 UNAUTHORIZED` if anything is wrong.

- The frontend stores the JWT in `localStorage` via the Zustand session store and adds the header on every authenticated `fetch`.

---

## Validation & Error Format

Every input is parsed with a Zod schema *before* the handler runs. On failure, the API returns a **400 BAD_REQUEST** without ever calling the database.

The standard error body is:

```json
{ "error": { "code": "BAD_REQUEST", "message": "Invalid order payload" } }
```

| HTTP status | `error.code`     | When                                                                    |
| ----------- | ---------------- | ----------------------------------------------------------------------- |
| 400         | `BAD_REQUEST`    | Schema validation failed, missing path param, item not found in cart.    |
| 401         | `UNAUTHORIZED`   | Missing or invalid JWT, wrong username/password.                         |
| 403         | `FORBIDDEN`      | Authenticated, but wrong role for this endpoint.                          |
| 404         | `NOT_FOUND`      | Resource doesn't exist (or isn't yours).                                  |
| 409         | `CONFLICT`       | Duplicate username on signup; editing a non-pending order.               |
| 500         | `INTERNAL`       | Unexpected DB or server error.                                            |

Successful responses are wrapped under `{ "data": ... }` by the `ok()` helper.

---

## Environment Variables

Loaded from `backend/.env` via `dotenv/config`. The server **refuses to start** if a required variable is missing.

| Variable        | Required | Default                  | What it does                                                                                          |
| --------------- | -------- | ------------------------ | ------------------------------------------------------------------------------------------------------ |
| `PORT`          | no       | `8080`                   | TCP port the Express server binds to.                                                                  |
| `DATABASE_URL`  | **yes**  | —                        | Postgres connection string. TLS is auto-enabled when the URL contains `sslmode=require` or `ssl=true`. |
| `JWT_SECRET`    | **yes**  | —                        | Secret used to sign and verify JWTs (7-day expiry).                                                    |
| `CLIENT_ORIGIN` | no       | `http://localhost:5173`  | Comma-separated CORS allow-list. Any `http://localhost:<port>` is also auto-allowed for dev.            |

The CI/CD `deploy` job rewrites `backend/.env` on the EC2 host from GitHub Secrets via a heredoc, so production credentials are never committed.

---

## Building & Containerizing

### Local production build

```bash
npm run build -w backend       # TypeScript → dist/
npm run start -w backend       # node dist/index.js
```

### Docker image

`backend/Dockerfile` is a **two-stage** build:

1. **`builder`** (`node:20-alpine`) — installs all deps, copies `src/`, `scripts/`, `db/`, runs `npm run build`.
2. **`production`** (`node:20-alpine`) — fresh image, `NODE_ENV=production`, installs prod deps only (`--omit=dev --ignore-scripts`), copies in just `dist/`, `db/`, and `scripts/`.

Build & run it locally:

```bash
docker build -t warm-order-hub-backend ./backend
docker run --rm -p 8080:8080 --env-file ./backend/.env warm-order-hub-backend
```

In `docker-compose.yml` the backend service:

- Mounts `backend/.env` via `env_file:`.
- Sets `NODE_ENV=production`.
- Listens on `:8080` (mapped to host `8080`).
- Joins the private `app-network` bridge so the frontend Nginx can reverse-proxy `/api/*` to it by service name (`http://backend:8080`).

In CI/CD, this image is built and pushed to Docker Hub as `<DOCKERHUB_USERNAME>/warm-order-hub-backend:latest`.

---

## Project Layout

```
backend/
├── src/
│   ├── index.ts             # Express app + every REST route
│   ├── db.ts                # pg Pool, TLS auto-detection
│   ├── http.ts              # ok() / apiError() response helpers
│   ├── auth.ts              # JWT sign/verify + Zod payload schema
│   └── middleware/
│       └── authRequired.ts  # Bearer-token middleware → req.user
├── db/
│   └── schema.sql           # idempotent DDL for the whole app
├── scripts/
│   ├── apply-schema.ts      # runs schema.sql against DATABASE_URL
│   └── seed.ts              # vendors + menu items + demo users
├── Dockerfile               # multi-stage backend image
├── .env.example
├── package.json
├── tsconfig.json
└── README.md                # ← you are here
```

---

## Common Issues

### `Error: DATABASE_URL is required`

`backend/.env` is missing or `DATABASE_URL` is empty. **Fix:** `cp backend/.env.example backend/.env` and fill it in.

### `Error: JWT_SECRET is required`

Same as above, but for `JWT_SECRET`. Generate one with `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`.

### `CORS blocked for origin: ...`

The browser origin isn't in `CLIENT_ORIGIN`. Add it (comma-separated) and restart the backend. Any `http://localhost:<port>` is auto-allowed in addition.

### `Username already exists` on signup

That's `409 CONFLICT` from the unique constraint on `users.username`. Pick a different username — the seed script uses `ahmed`, `ali`, `demo`, `ayan`, `sip`, `raju`, `juice`.

### `Order can only be edited while Pending`

`PATCH /api/orders/:orderId/lines` deliberately rejects edits once the vendor has moved the order to `Preparing` or beyond. This is a feature, not a bug — once the kitchen is cooking, the line items are locked.

### Neon project asleep / first request hangs

Neon's free tier auto-suspends idle projects. The first request after suspension can take a few seconds while the compute wakes up. Subsequent requests are fast.
