import "dotenv/config";
import express, { type Request, type Response } from "express";
import cors from "cors";
import helmet from "helmet";
import bcrypt from "bcrypt";
import { z } from "zod";
import { pool } from "./db.js";
import { apiError, ok } from "./http.js";
import { signToken } from "./auth.js";
import { authRequired, type AuthedRequest } from "./middleware/authRequired.js";

const PORT = Number(process.env.PORT ?? 8080);
const CLIENT_ORIGINS = (process.env.CLIENT_ORIGIN ?? "http://localhost:5173")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const app = express();
app.use(helmet());
app.use(
  cors({
    origin: (origin, cb) => {
      // Allow non-browser requests (curl/postman) with no Origin header.
      if (!origin) return cb(null, true);

      // Explicit allow-list from env (comma-separated).
      if (CLIENT_ORIGINS.includes(origin)) return cb(null, true);

      // Local dev convenience: allow any localhost port.
      if (/^http:\/\/localhost:\d+$/.test(origin)) return cb(null, true);

      return cb(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: false,
  }),
);
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req: Request, res: Response) => res.json({ ok: true }));

// ---------- Auth ----------
const signupSchema = z.object({
  username: z.string().trim().min(3).max(32),
  password: z.string().min(6).max(72),
  displayName: z.string().trim().min(1).max(64),
});

app.post("/api/auth/signup", async (req: Request, res: Response) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) {
    const e = apiError("BAD_REQUEST", "Invalid signup payload", 400);
    return res.status(e.status).json(e.body);
  }

  const { username, password, displayName } = parsed.data;
  const uname = username.toLowerCase();

  try {
    const hash = await bcrypt.hash(password, 12);
    const q = await pool.query(
      `INSERT INTO users (username, password_hash, role, display_name, vendor_id)
       VALUES ($1, $2, 'customer', $3, NULL)
       RETURNING id, username, role, display_name`,
      [uname, hash, displayName],
    );

    const user = q.rows[0] as {
      id: string;
      username: string;
      role: "customer";
      display_name: string;
    };
    const token = signToken({ sub: user.id, role: "customer", vendorId: null });
    return res.json(
      ok({
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          displayName: user.display_name,
        },
      }).body,
    );
  } catch (err: unknown) {
    const pgCode =
      typeof err === "object" && err && "code" in err
        ? String((err as { code?: unknown }).code)
        : null;
    if (pgCode === "23505") {
      const e = apiError("CONFLICT", "Username already exists", 409);
      return res.status(e.status).json(e.body);
    }
    const e = apiError("INTERNAL", "Signup failed", 500);
    return res.status(e.status).json(e.body);
  }
});

const loginSchema = z.object({
  username: z.string().trim().min(1),
  password: z.string().min(1),
});

app.post("/api/auth/login", async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    const e = apiError("BAD_REQUEST", "Invalid login payload", 400);
    return res.status(e.status).json(e.body);
  }
  const { username, password } = parsed.data;
  const uname = username.toLowerCase();

  try {
    const q = await pool.query(
      `SELECT id, username, password_hash, role, display_name, vendor_id
       FROM users
       WHERE username = $1
       LIMIT 1`,
      [uname],
    );
    const row = q.rows[0] as
      | {
          id: string;
          username: string;
          password_hash: string;
          role: "customer" | "vendor";
          display_name: string;
          vendor_id: string | null;
        }
      | undefined;

    // Generic error message (secure pattern)
    if (!row) {
      const e = apiError("UNAUTHORIZED", "Invalid username or password", 401);
      return res.status(e.status).json(e.body);
    }

    const okPwd = await bcrypt.compare(password, row.password_hash);
    if (!okPwd) {
      const e = apiError("UNAUTHORIZED", "Invalid username or password", 401);
      return res.status(e.status).json(e.body);
    }

    const token = signToken({ sub: row.id, role: row.role, vendorId: row.vendor_id });
    return res.json(
      ok({
        token,
        user: {
          id: row.id,
          username: row.username,
          role: row.role,
          displayName: row.display_name,
          vendorId: row.vendor_id,
        },
      }).body,
    );
  } catch {
    const e = apiError("INTERNAL", "Login failed", 500);
    return res.status(e.status).json(e.body);
  }
});

// ---------- Public data (images remain frontend-static) ----------
app.get("/api/vendors", async (_req: Request, res: Response) => {
  try {
    const q = await pool.query(
      `SELECT id, name, tagline, location, hours, prep_time, accepting
       FROM vendors
       ORDER BY name ASC`,
    );
    return res.json(ok({ vendors: q.rows }).body);
  } catch {
    const e = apiError("INTERNAL", "Could not load vendors", 500);
    return res.status(e.status).json(e.body);
  }
});

app.get("/api/menu", async (_req: Request, res: Response) => {
  try {
    const q = await pool.query(
      `SELECT id, vendor_id, name, price, category, description, active
       FROM menu_items
       WHERE active = TRUE
       ORDER BY vendor_id ASC, name ASC`,
    );
    return res.json(ok({ items: q.rows }).body);
  } catch {
    const e = apiError("INTERNAL", "Could not load menu", 500);
    return res.status(e.status).json(e.body);
  }
});

app.get("/api/vendors/:vendorId/menu", async (req: Request, res: Response) => {
  const vendorId = String(req.params.vendorId || "");
  if (!vendorId) {
    const e = apiError("BAD_REQUEST", "Missing vendorId", 400);
    return res.status(e.status).json(e.body);
  }
  try {
    const q = await pool.query(
      `SELECT id, vendor_id, name, price, category, description, active
       FROM menu_items
       WHERE vendor_id = $1 AND active = TRUE
       ORDER BY name ASC`,
      [vendorId],
    );
    return res.json(ok({ items: q.rows }).body);
  } catch {
    const e = apiError("INTERNAL", "Could not load vendor menu", 500);
    return res.status(e.status).json(e.body);
  }
});

// ---------- Vendor menu management ----------
const vendorMenuCreateSchema = z.object({
  name: z.string().trim().min(1).max(80),
  price: z.number().int().min(0).max(200000),
  category: z.string().trim().min(1).max(40),
  description: z.string().trim().max(240).optional(),
});

app.post("/api/vendor/menu-items", authRequired, async (req: AuthedRequest, res: Response) => {
  if (req.user?.role !== "vendor" || !req.user.vendorId) {
    const e = apiError("FORBIDDEN", "Only vendors can manage menu", 403);
    return res.status(e.status).json(e.body);
  }
  const parsed = vendorMenuCreateSchema.safeParse(req.body);
  if (!parsed.success) {
    const e = apiError("BAD_REQUEST", "Invalid menu item payload", 400);
    return res.status(e.status).json(e.body);
  }
  const { name, price, category, description } = parsed.data;
  const id = `custom-${crypto.randomUUID()}`;
  try {
    const q = await pool.query(
      `INSERT INTO menu_items (id, vendor_id, name, price, category, description, image_key, active)
       VALUES ($1,$2,$3,$4,$5,$6,NULL,TRUE)
       RETURNING id, vendor_id, name, price, category, description, active`,
      [id, req.user.vendorId, name, price, category, description ?? ""],
    );
    return res.json(ok({ item: q.rows[0] }).body);
  } catch {
    const e = apiError("INTERNAL", "Could not create menu item", 500);
    return res.status(e.status).json(e.body);
  }
});

const vendorMenuPatchSchema = z
  .object({
    name: z.string().trim().min(1).max(80).optional(),
    price: z.number().int().min(0).max(200000).optional(),
    category: z.string().trim().min(1).max(40).optional(),
    description: z.string().trim().max(240).optional(),
    active: z.boolean().optional(),
  })
  .refine((x) => Object.keys(x).length > 0, { message: "Empty patch" });

app.patch(
  "/api/vendor/menu-items/:itemId",
  authRequired,
  async (req: AuthedRequest, res: Response) => {
    if (req.user?.role !== "vendor" || !req.user.vendorId) {
      const e = apiError("FORBIDDEN", "Only vendors can manage menu", 403);
      return res.status(e.status).json(e.body);
    }
    const itemId = String(req.params.itemId || "");
    const parsed = vendorMenuPatchSchema.safeParse(req.body);
    if (!itemId || !parsed.success) {
      const e = apiError("BAD_REQUEST", "Invalid request", 400);
      return res.status(e.status).json(e.body);
    }

    try {
      const existing = await pool.query(
        `SELECT id, vendor_id FROM menu_items WHERE id = $1 LIMIT 1`,
        [itemId],
      );
      const row = existing.rows[0] as { id: string; vendor_id: string } | undefined;
      if (!row) {
        const e = apiError("NOT_FOUND", "Item not found", 404);
        return res.status(e.status).json(e.body);
      }
      if (row.vendor_id !== req.user.vendorId) {
        const e = apiError("FORBIDDEN", "Not allowed", 403);
        return res.status(e.status).json(e.body);
      }

      const patch = parsed.data;
      const q = await pool.query(
        `UPDATE menu_items
       SET
         name = COALESCE($2, name),
         price = COALESCE($3, price),
         category = COALESCE($4, category),
         description = COALESCE($5, description),
         active = COALESCE($6, active)
       WHERE id = $1
       RETURNING id, vendor_id, name, price, category, description, active`,
        [
          itemId,
          patch.name ?? null,
          typeof patch.price === "number" ? patch.price : null,
          patch.category ?? null,
          patch.description ?? null,
          typeof patch.active === "boolean" ? patch.active : null,
        ],
      );
      return res.json(ok({ item: q.rows[0] }).body);
    } catch {
      const e = apiError("INTERNAL", "Could not update menu item", 500);
      return res.status(e.status).json(e.body);
    }
  },
);

app.delete(
  "/api/vendor/menu-items/:itemId",
  authRequired,
  async (req: AuthedRequest, res: Response) => {
    if (req.user?.role !== "vendor" || !req.user.vendorId) {
      const e = apiError("FORBIDDEN", "Only vendors can manage menu", 403);
      return res.status(e.status).json(e.body);
    }
    const itemId = String(req.params.itemId || "");
    if (!itemId) {
      const e = apiError("BAD_REQUEST", "Missing itemId", 400);
      return res.status(e.status).json(e.body);
    }
    try {
      const q = await pool.query(
        `UPDATE menu_items
       SET active = FALSE
       WHERE id = $1 AND vendor_id = $2
       RETURNING id`,
        [itemId, req.user.vendorId],
      );
      if (q.rowCount === 0) {
        const e = apiError("NOT_FOUND", "Item not found", 404);
        return res.status(e.status).json(e.body);
      }
      return res.json(ok({ ok: true }).body);
    } catch {
      const e = apiError("INTERNAL", "Could not delete menu item", 500);
      return res.status(e.status).json(e.body);
    }
  },
);

// ---------- Orders ----------
const createOrderSchema = z.object({
  vendorId: z.string().min(1).max(64),
  pickupTime: z.string().regex(/^\d{2}:\d{2}$/),
  payment: z.enum(["EasyPaisa", "JazzCash", "Cash on Pickup"]),
  notes: z.string().max(240).optional(),
  lines: z
    .array(z.object({ itemId: z.string().min(1).max(64), qty: z.number().int().min(1).max(50) }))
    .min(1),
});

app.post("/api/orders", authRequired, async (req: AuthedRequest, res: Response) => {
  const parsed = createOrderSchema.safeParse(req.body);
  if (!parsed.success) {
    const e = apiError("BAD_REQUEST", "Invalid order payload", 400);
    return res.status(e.status).json(e.body);
  }
  if (req.user?.role !== "customer") {
    const e = apiError("FORBIDDEN", "Only customers can place orders", 403);
    return res.status(e.status).json(e.body);
  }

  const { vendorId, pickupTime, payment, notes, lines } = parsed.data;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const u = await client.query(`SELECT display_name FROM users WHERE id = $1`, [req.user.id]);
    const displayName = (u.rows[0]?.display_name as string | undefined) ?? "Customer";

    const orderIns = await client.query(
      `INSERT INTO orders (vendor_id, customer_user_id, customer_display_name, payment, notes, pickup_time_24)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, public_id, vendor_id, customer_display_name, status, payment, notes, pickup_time_24, placed_at, cancellation_reason`,
      [vendorId, req.user.id, displayName, payment, notes ?? null, pickupTime],
    );
    const order = orderIns.rows[0];

    // Fetch item names/prices for the order lines (authoritative pricing).
    const itemIds = lines.map((l) => l.itemId);
    const itemsQ = await client.query(
      `SELECT id, vendor_id, name, price
       FROM menu_items
       WHERE id = ANY($1::text[]) AND active = TRUE`,
      [itemIds],
    );
    const map = new Map<string, { id: string; vendor_id: string; name: string; price: number }>();
    for (const r of itemsQ.rows) map.set(String(r.id), r);

    for (const line of lines) {
      const it = map.get(line.itemId);
      if (!it) {
        await client.query("ROLLBACK");
        const e = apiError("BAD_REQUEST", `Invalid item: ${line.itemId}`, 400);
        return res.status(e.status).json(e.body);
      }
      if (it.vendor_id !== vendorId) {
        await client.query("ROLLBACK");
        const e = apiError("BAD_REQUEST", "All items must belong to the same vendor", 400);
        return res.status(e.status).json(e.body);
      }
      await client.query(
        `INSERT INTO order_lines (order_id, item_id, qty, unit_price, item_name)
         VALUES ($1, $2, $3, $4, $5)`,
        [order.id, it.id, line.qty, it.price, it.name],
      );
    }

    await client.query("COMMIT");
    return res.json(ok({ order }).body);
  } catch {
    await client.query("ROLLBACK");
    const e = apiError("INTERNAL", "Could not place order", 500);
    return res.status(e.status).json(e.body);
  } finally {
    client.release();
  }
});

app.get("/api/orders/me", authRequired, async (req: AuthedRequest, res: Response) => {
  if (req.user?.role !== "customer") {
    const e = apiError("FORBIDDEN", "Only customers can view this", 403);
    return res.status(e.status).json(e.body);
  }
  try {
    const q = await pool.query(
      `SELECT id, public_id, vendor_id, customer_display_name, status, payment, notes, pickup_time_24, placed_at, cancellation_reason
       FROM orders
       WHERE customer_user_id = $1
       ORDER BY placed_at DESC`,
      [req.user.id],
    );
    const ids = q.rows.map((r) => r.id);
    const linesQ =
      ids.length === 0
        ? { rows: [] as Array<Record<string, unknown>> }
        : await pool.query(
            `SELECT order_id, item_id, qty, unit_price, item_name
             FROM order_lines
             WHERE order_id = ANY($1::uuid[])`,
            [ids],
          );
    const linesByOrder = new Map<string, Array<Record<string, unknown>>>();
    for (const l of linesQ.rows) {
      const arr = linesByOrder.get(l.order_id) ?? [];
      arr.push(l);
      linesByOrder.set(l.order_id, arr);
    }
    const orders = q.rows.map((o) => ({ ...o, lines: linesByOrder.get(o.id) ?? [] }));
    return res.json(ok({ orders }).body);
  } catch {
    const e = apiError("INTERNAL", "Could not load orders", 500);
    return res.status(e.status).json(e.body);
  }
});

app.get("/api/vendor/orders", authRequired, async (req: AuthedRequest, res: Response) => {
  if (req.user?.role !== "vendor" || !req.user.vendorId) {
    const e = apiError("FORBIDDEN", "Only vendors can view this", 403);
    return res.status(e.status).json(e.body);
  }
  try {
    const q = await pool.query(
      `SELECT id, public_id, vendor_id, customer_display_name, status, payment, notes, pickup_time_24, placed_at, cancellation_reason
       FROM orders
       WHERE vendor_id = $1
       ORDER BY placed_at DESC`,
      [req.user.vendorId],
    );
    const ids = q.rows.map((r) => r.id);
    const linesQ =
      ids.length === 0
        ? { rows: [] as Array<Record<string, unknown>> }
        : await pool.query(
            `SELECT order_id, item_id, qty, unit_price, item_name
             FROM order_lines
             WHERE order_id = ANY($1::uuid[])`,
            [ids],
          );
    const linesByOrder = new Map<string, Array<Record<string, unknown>>>();
    for (const l of linesQ.rows) {
      const arr = linesByOrder.get(l.order_id) ?? [];
      arr.push(l);
      linesByOrder.set(l.order_id, arr);
    }
    const orders = q.rows.map((o) => ({ ...o, lines: linesByOrder.get(o.id) ?? [] }));
    return res.json(ok({ orders }).body);
  } catch {
    const e = apiError("INTERNAL", "Could not load vendor orders", 500);
    return res.status(e.status).json(e.body);
  }
});

const updateStatusSchema = z.object({
  status: z.enum(["Pending", "Preparing", "Ready", "Picked up", "Cancelled"]),
  cancellationReason: z.enum(["user", "vendor"]).optional(),
});

app.patch(
  "/api/orders/:orderId/status",
  authRequired,
  async (req: AuthedRequest, res: Response) => {
    const orderId = String(req.params.orderId || "");
    const parsed = updateStatusSchema.safeParse(req.body);
    if (!orderId || !parsed.success) {
      const e = apiError("BAD_REQUEST", "Invalid request", 400);
      return res.status(e.status).json(e.body);
    }

    const { status, cancellationReason } = parsed.data;
    const user = req.user!;

    try {
      const q = await pool.query(
        `SELECT id, vendor_id, customer_user_id, status FROM orders WHERE id = $1 LIMIT 1`,
        [orderId],
      );
      const row = q.rows[0] as
        | { id: string; vendor_id: string; customer_user_id: string | null; status: string }
        | undefined;
      if (!row) {
        const e = apiError("NOT_FOUND", "Order not found", 404);
        return res.status(e.status).json(e.body);
      }

      const isCustomerOwner = user.role === "customer" && row.customer_user_id === user.id;
      const isVendorOwner =
        user.role === "vendor" && user.vendorId && row.vendor_id === user.vendorId;
      if (!isCustomerOwner && !isVendorOwner) {
        const e = apiError("FORBIDDEN", "Not allowed", 403);
        return res.status(e.status).json(e.body);
      }

      // cancellation reason rules
      let reason: "user" | "vendor" | null = null;
      if (status === "Cancelled") {
        reason = cancellationReason ?? (user.role === "customer" ? "user" : "vendor");
      }

      await pool.query(
        `UPDATE orders
       SET status = $2, cancellation_reason = $3
       WHERE id = $1`,
        [orderId, status, reason],
      );

      return res.json(ok({ ok: true }).body);
    } catch {
      const e = apiError("INTERNAL", "Could not update order", 500);
      return res.status(e.status).json(e.body);
    }
  },
);

const updateLinesSchema = z.object({
  lines: z
    .array(z.object({ itemId: z.string().min(1).max(64), qty: z.number().int().min(1).max(50) }))
    .min(1),
});

app.patch("/api/orders/:orderId/lines", authRequired, async (req: AuthedRequest, res: Response) => {
  const orderId = String(req.params.orderId || "");
  const parsed = updateLinesSchema.safeParse(req.body);
  if (!orderId || !parsed.success) {
    const e = apiError("BAD_REQUEST", "Invalid request", 400);
    return res.status(e.status).json(e.body);
  }
  if (req.user?.role !== "customer") {
    const e = apiError("FORBIDDEN", "Only customers can edit orders", 403);
    return res.status(e.status).json(e.body);
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const q = await client.query(
      `SELECT id, vendor_id, customer_user_id, status
       FROM orders
       WHERE id = $1
       LIMIT 1`,
      [orderId],
    );
    const order = q.rows[0] as
      | { id: string; vendor_id: string; customer_user_id: string | null; status: string }
      | undefined;
    if (!order) {
      await client.query("ROLLBACK");
      const e = apiError("NOT_FOUND", "Order not found", 404);
      return res.status(e.status).json(e.body);
    }
    if (order.customer_user_id !== req.user.id) {
      await client.query("ROLLBACK");
      const e = apiError("FORBIDDEN", "Not allowed", 403);
      return res.status(e.status).json(e.body);
    }
    if (order.status !== "Pending") {
      await client.query("ROLLBACK");
      const e = apiError("CONFLICT", "Order can only be edited while Pending", 409);
      return res.status(e.status).json(e.body);
    }

    const itemIds = parsed.data.lines.map((l) => l.itemId);
    const itemsQ = await client.query(
      `SELECT id, vendor_id, name, price
       FROM menu_items
       WHERE id = ANY($1::text[]) AND active = TRUE`,
      [itemIds],
    );
    const map = new Map<string, { id: string; vendor_id: string; name: string; price: number }>();
    for (const r of itemsQ.rows) map.set(String(r.id), r);
    for (const line of parsed.data.lines) {
      const it = map.get(line.itemId);
      if (!it) {
        await client.query("ROLLBACK");
        const e = apiError("BAD_REQUEST", `Invalid item: ${line.itemId}`, 400);
        return res.status(e.status).json(e.body);
      }
      if (it.vendor_id !== order.vendor_id) {
        await client.query("ROLLBACK");
        const e = apiError("BAD_REQUEST", "All items must belong to the same vendor", 400);
        return res.status(e.status).json(e.body);
      }
    }

    await client.query(`DELETE FROM order_lines WHERE order_id = $1`, [orderId]);
    for (const line of parsed.data.lines) {
      const it = map.get(line.itemId)!;
      await client.query(
        `INSERT INTO order_lines (order_id, item_id, qty, unit_price, item_name)
         VALUES ($1, $2, $3, $4, $5)`,
        [orderId, it.id, line.qty, it.price, it.name],
      );
    }

    await client.query("COMMIT");
    return res.json(ok({ ok: true }).body);
  } catch {
    await client.query("ROLLBACK");
    const e = apiError("INTERNAL", "Could not update order", 500);
    return res.status(e.status).json(e.body);
  } finally {
    client.release();
  }
});

// ---------- Vendor toggles ----------
app.patch(
  "/api/vendors/:vendorId/accepting",
  authRequired,
  async (req: AuthedRequest, res: Response) => {
    const vendorId = String(req.params.vendorId || "");
    const parsed = z.object({ accepting: z.boolean() }).safeParse(req.body);
    if (!vendorId || !parsed.success) {
      const e = apiError("BAD_REQUEST", "Invalid request", 400);
      return res.status(e.status).json(e.body);
    }

    if (req.user?.role !== "vendor" || req.user.vendorId !== vendorId) {
      const e = apiError("FORBIDDEN", "Not allowed", 403);
      return res.status(e.status).json(e.body);
    }

    try {
      await pool.query(`UPDATE vendors SET accepting = $2 WHERE id = $1`, [
        vendorId,
        parsed.data.accepting,
      ]);
      return res.json(ok({ ok: true }).body);
    } catch {
      const e = apiError("INTERNAL", "Could not update vendor", 500);
      return res.status(e.status).json(e.body);
    }
  },
);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on http://localhost:${PORT}`);
});
