# Frontend — Warm Order Hub SPA

> The **React + Vite + TypeScript** single-page app for **Warm Order Hub**. It's the customer-facing storefront *and* the vendor's admin dashboard, built around TanStack Router (file-based routing), a Zustand session/cart store, Tailwind CSS 4, Radix UI primitives, and Framer Motion animations. In production it's served by Nginx, which also reverse-proxies `/api/*` to the backend.

## What this README is

This is the README for the **`frontend/`** workspace. By the end of it you'll know:

- What the SPA does, who its two audiences are, and how it talks to the backend.
- The routing model (file-based, TanStack Router) and the role each route plays.
- How the cart and session live in a Zustand store with `localStorage` persistence.
- How to run the dev server, run the production preview, lint, and build.
- How the Docker image is built and how the SPA's API URL is configured.

For the bigger picture (backend, CI/CD, deploy), see the top-level [`../README.md`](../README.md).

---

## Table of Contents

- [What the Frontend Does](#what-the-frontend-does)
- [How It's Built](#how-its-built)
- [Routing Map](#routing-map)
- [State Management](#state-management)
- [Talking to the Backend](#talking-to-the-backend)
- [First-Time Setup](#first-time-setup)
- [Running the Frontend](#running-the-frontend)
- [Build, Preview & Lint](#build-preview--lint)
- [Containerizing](#containerizing)
- [Project Layout](#project-layout)
- [Environment Variables](#environment-variables)
- [Common Issues](#common-issues)

---

## What the Frontend Does

The same SPA serves **two distinct roles**, with the UI swapping based on the JWT in the Zustand store.

**Customer flow:**

1. **Sign up / log in** at `/signup` or `/login` (JWT issued by the backend, cached in `localStorage`).
2. **Browse vendors** on the home page (`/`) — Ayan Gardens, Sip Spot, Raju Hotel, Juice Spot — each with status (open/accepting), prep time, and tagline.
3. **Open a vendor** at `/vendors/$vendorId` to see the menu, filter by category, and add items to the cart.
4. **Checkout** at `/cart` — pick a payment method (EasyPaisa / JazzCash / Cash on Pickup), pickup time, optional notes.
5. **Track orders** at `/orders` and `/orders/$orderId`. Edit a still-pending order at `/orders/edit/$orderId`.

**Vendor flow:**

1. **Log in** as a vendor (e.g. `ayan / ayan123`) — the same form, different role on the JWT.
2. **Vendor dashboard** at `/vendor` — live list of incoming orders, status transitions (Pending → Preparing → Ready → Picked up), the "currently accepting orders" toggle, plus cancellation.
3. **Manage menu** at `/manage` — create, edit, soft-delete menu items.

Everything is dynamic: the SPA boots, calls the backend for vendors, menu items, and the user's orders, and renders from those responses. There is **no mock data** in production.

---

## How It's Built

| Concern              | Choice                                                                                          |
| -------------------- | ----------------------------------------------------------------------------------------------- |
| **Framework**        | React 19                                                                                         |
| **Build tool**       | Vite 7 (lightning-fast HMR in dev, optimized SSR-style bundle in prod via TanStack Start)        |
| **Language**         | TypeScript 5 (strict)                                                                            |
| **Routing**          | [TanStack Router](https://tanstack.com/router) (file-based, type-safe, generated `routeTree.gen`) |
| **State**            | [Zustand](https://zustand-demo.pmnd.rs) with `persist` middleware → `localStorage`                |
| **Server cache**     | TanStack Query (queued for read-heavy screens; primary data still flows through Zustand)         |
| **Forms**            | `react-hook-form` + `@hookform/resolvers` + Zod                                                   |
| **Styling**          | Tailwind CSS 4 + `tw-animate-css`                                                                 |
| **UI primitives**    | Radix UI (`@radix-ui/react-*`) wrapped by lightweight components in `src/components/ui`           |
| **Animations**       | Framer Motion (`motion/react`) for page transitions and the loading "burger"                      |
| **Toasts**           | `sonner` (top-centre, auto-dismiss on outside-click)                                              |
| **Icons**            | `lucide-react`                                                                                    |
| **Validation**       | `zod` (shared with backend payloads)                                                              |
| **Production server**| `server-node.mjs` (a small Node HTTP server that serves `dist/client/*` and handles SSR-style fetch). In Docker we additionally use **Nginx** for the SPA fallback + `/api` reverse proxy. |

---

## Routing Map

Routing is **file-based** under `src/routes/`. Each file exports a route module; `routeTree.gen.ts` is auto-generated (do **not** edit it by hand).

| Route file                          | URL                            | Audience       | What it does                                                                  |
| ----------------------------------- | ------------------------------ | -------------- | ----------------------------------------------------------------------------- |
| `__root.tsx`                        | (layout)                       | shared         | App shell: header, toaster, loading overlay, cart-floating-button, bootstrap. |
| `index.tsx`                         | `/`                            | customer       | Home — list of vendors with live "accepting orders" status.                   |
| `signup.tsx`                        | `/signup`                      | customer       | Customer signup form.                                                          |
| `login.tsx`                         | `/login`                       | both           | Single login form for customers and vendors (role determined by the JWT).      |
| `vendors.$vendorId.tsx`             | `/vendors/:vendorId`           | customer       | A single vendor's menu, filterable by category; add-to-cart actions.           |
| `cart.tsx`                          | `/cart`                        | customer       | Cart + checkout (payment, pickup time, notes) → places the order.              |
| `quick-order.tsx`                   | `/quick-order`                 | customer       | Streamlined "I just want food now" flow.                                        |
| `orders.index.tsx`                  | `/orders`                      | customer       | The customer's order history with live status.                                  |
| `orders.$orderId.tsx`               | `/orders/:orderId`             | customer       | Detail view for a single order.                                                 |
| `orders.edit.$orderId.tsx`          | `/orders/edit/:orderId`        | customer       | Edit a still-`Pending` order's lines.                                           |
| `vendor.tsx`                        | `/vendor`                      | vendor         | Vendor dashboard — incoming orders, status transitions, accept-toggle.          |
| `manage.tsx`                        | `/manage`                      | vendor         | Menu management — add / edit / soft-delete items.                               |

A custom `notFoundComponent` (see `__root.tsx`) handles unknown URLs with a friendly 404.

> **Quirk worth noting:** `__root.tsx` performs a **redirect to `/` on first mount**. That's intentional — refreshing on a deep link can leave the SPA in a half-loaded auth state, and we'd rather restart cleanly than ship a half-rendered page.

---

## State Management

All client state lives in a single Zustand store at `src/store/useApp.ts`, persisted to `localStorage` via the `persist` middleware. The store handles:

- **Auth** — `token`, `role`, `username`, `displayName`, `vendorLogin`.
- **Reference data** — `vendors`, `menuItems`, `vendorAccepting` map.
- **Cart** — `cart` (lines), `cartVendorId`, `favorites`. Adding from a *different* vendor returns `{ ok: false, reason }` so the UI can prompt the user.
- **Orders** — `orders` array (customer view) and live `_orderUuidByPublicId` map for routing by public id.

**Lifecycle:**

- `bootstrap()` is called once from the root layout. It fetches vendors + menu items, and (if logged in) the user's orders.
- `login()` / `signup()` call the backend, store the JWT, and immediately call `bootstrap()`.
- `logout()` wipes the token and bounces back to the landing page.
- Every CRUD action (`addMenuItem`, `placeOrder`, `toggleVendorAccepting`, …) is **server-first** — it calls the backend, then updates the local store from the response. There is no optimistic-then-reconcile pattern.

> **Why Zustand and not Redux?** The whole client state fits in one file, components only need a *slice* (`useApp((s) => s.cart)`), and we get persistence for free with one middleware import. Redux would be triple the boilerplate for this size.

---

## Talking to the Backend

A single helper lives at `src/lib/api.ts`:

```ts
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export async function apiFetch<T>(
  path: string,
  opts?: { method?: string; token?: string | null; body?: unknown; schema?: z.ZodType<T> }
): Promise<T> { /* fetch + JSON + Bearer token + Zod parse + uniform error throw */ }
```

Two important properties:

1. **`VITE_API_URL` is read at build time.** Vite inlines `import.meta.env.VITE_*` values into the bundle, so the URL is *fixed* the moment `vite build` runs. To point production at a different backend, you must rebuild with the new value.
2. **Errors are thrown as `Error(message)`** with the backend's `error.message` if available. UI code wraps `apiFetch` in `try / catch` and shows a `sonner` toast on failure.

In **deployed Docker**, Nginx handles `/api/*` and proxies it to the backend container by service name (`backend:8080`), so the browser sees one same-origin URL — there is no CORS preflight in production.

---

## First-Time Setup

### Prerequisites

- **Node.js ≥ 20** and **npm ≥ 10**

### 1. Install dependencies (from the repo root)

```bash
npm install
```

The frontend is an npm workspace, so this single command installs both workspaces.

### 2. Configure your local API URL

```bash
cp frontend/.env.example frontend/.env.local
```

Edit `frontend/.env.local`:

```env
VITE_API_URL=http://localhost:8080
```

> Use `.env.local` (gitignored) rather than `.env` for personal tweaks. Vite picks both up; `.env.local` wins.

### 3. (Once) make sure the backend is set up too

The frontend is useless without the API. From the repo root:

```bash
npm run db:apply:schema -w backend
npm run db:seed -w backend
```

(See [`../backend/README.md`](../backend/README.md) for full details.)

---

## Running the Frontend

### Dev server (HMR, default)

From the **repo root**:

```bash
npm run dev -w frontend
```

Or from inside `frontend/`:

```bash
npm run dev
```

Open http://localhost:5173 (or the next free port — Vite tells you in the console).

You'll get:

- Instant hot-module replacement on any `.tsx` / `.css` change.
- TypeScript errors surfaced inline by the editor.
- ESLint warnings on save (with the project's flat config).

### Combined dev (frontend + backend together)

From the repo root:

```bash
npm start
```

Spawns both with `concurrently`, colour-coded logs. Recommended workflow.

### Lint

```bash
npm run lint -w frontend            # ESLint with warnings allowed
npm run lint:strict -w frontend     # zero-warnings mode (used by CI in Job 1)
```

### Format

```bash
npm run format -w frontend
```

Prettier rewrites `.tsx`/`.ts`/`.css` files in place.

---

## Build, Preview & Lint

### Production build

```bash
npm run build -w frontend
```

Vite writes the optimized bundle to `frontend/dist/`. The TanStack Start build produces both:

- `dist/client/` — static assets (HTML, JS, CSS, images) for Nginx to serve.
- `dist/server/` — an SSR-style fetch handler used by `server-node.mjs`.

### Local preview of the built bundle

```bash
npm run preview -w frontend
```

Vite spins up a small static server on `:4173` so you can sanity-check the production build before pushing. It does **not** include the `/api` proxy — for that, use Docker Compose.

### Strict lint (CI)

```bash
npm run lint:strict -w frontend
```

This is what GitHub Actions Job 1 runs. Any warning fails the build.

---

## Containerizing

`frontend/Dockerfile` is a **two-stage** build (`node:20-alpine` for both stages):

1. **`builder`** — `npm install`, copy source, accept `VITE_API_URL` as a `--build-arg`, run `npm run build`. The build arg is **baked into the JS bundle** by Vite.
2. **`production`** — fresh image, `NODE_ENV=production`, prod-only deps, copy in `dist/` and `server-node.mjs`, expose `:80`, start with `node ./server-node.mjs`.

Build & run locally:

```bash
docker build \
  --build-arg VITE_API_URL=http://localhost:8080 \
  -t warm-order-hub-frontend ./frontend

docker run --rm -p 80:80 warm-order-hub-frontend
```

Then open http://localhost.

### Compose-managed run

In the project's `docker-compose.yml` the frontend service:

- Uses the image `<DOCKERHUB_USERNAME>/warm-order-hub-frontend:latest`.
- Forwards `VITE_API_URL` from the host environment into the build (`args: VITE_API_URL: ${VITE_API_URL:-http://localhost:8080}`).
- Maps host `80` → container `80`.
- `depends_on: backend`.
- Joins the private `app-network` bridge with the backend.

In CI the same image is built with the **production** `VITE_API_URL` (a GitHub Secret) and pushed to Docker Hub.

### Nginx note

In the Docker / EC2 deployment, an Nginx-style configuration (`frontend/nginx.conf`) is also used to:

- Serve the SPA with HTML5-history fallback (`try_files $uri $uri/ /index.html;`).
- Reverse-proxy `/api/*` to `http://backend:8080`, so the browser sees one same-origin URL and CORS is sidestepped.
- Apply 1-year `Cache-Control: immutable` on `/assets/`.
- Enable gzip for text payloads.

---

## Project Layout

```
frontend/
├── src/
│   ├── routes/                     # File-based TanStack Router routes
│   │   ├── __root.tsx              # App shell: header, toaster, loading overlay, bootstrap
│   │   ├── index.tsx               # Home — vendor list
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   ├── vendors.$vendorId.tsx   # Vendor menu page
│   │   ├── cart.tsx                # Cart + checkout
│   │   ├── quick-order.tsx         # Quick-order flow
│   │   ├── orders.index.tsx        # Customer order list
│   │   ├── orders.$orderId.tsx     # Customer order detail
│   │   ├── orders.edit.$orderId.tsx
│   │   ├── vendor.tsx              # Vendor dashboard (incoming orders)
│   │   └── manage.tsx              # Vendor menu management
│   ├── components/
│   │   ├── Header.tsx              # Top nav, login/cart status
│   │   ├── UserAvatar.tsx
│   │   └── ui/                     # Radix-based primitives (button, dialog, drawer, …)
│   ├── store/useApp.ts             # Zustand store (auth, vendors, menu, cart, orders)
│   ├── lib/
│   │   ├── api.ts                  # apiFetch helper — fetch + Bearer + Zod + errors
│   │   ├── orderStatus.ts          # status colours & ordering
│   │   └── utils.ts                # misc helpers (cn(), date, etc.)
│   ├── data/                       # Static reference data (categories, accounts, vendors-image map)
│   ├── hooks/
│   │   ├── use-mobile.tsx          # responsive breakpoint hook
│   │   └── use-now.ts              # ticking "now" hook for live timers
│   ├── assets/                     # Vendor + menu item images (frontend-static)
│   ├── styles.css                  # Tailwind 4 entrypoint + design tokens
│   ├── router.tsx                  # createRouter() with default error component
│   └── routeTree.gen.ts            # AUTOGENERATED — do not edit
├── nginx.conf                      # Production Nginx config (used in deployed setup)
├── server-node.mjs                 # Tiny Node static + SSR fetch server (used by Dockerfile)
├── Dockerfile                      # Multi-stage frontend image
├── eslint.config.js                # Flat ESLint config
├── vite.config.ts                  # Vite + TanStack Start
├── package.json
├── tsconfig.json
└── README.md                       # ← you are here
```

---

## Environment Variables

| Variable        | Required | Default                  | What it does                                                                                                  |
| --------------- | -------- | ------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `VITE_API_URL`  | yes      | `http://localhost:8080`  | Base URL the SPA calls. **Inlined at build time** by Vite, so changing it requires `vite build` to rerun.       |

In dev: set in `frontend/.env.local`.
In prod (Docker / CI): passed as `--build-arg VITE_API_URL=...` so the right URL ends up baked into the bundle.

> **Anything not prefixed with `VITE_` is invisible to the browser bundle**, by Vite's design. That's a feature — it stops you from leaking server secrets into client code.

---

## Common Issues

### Blank screen + "Could not connect to backend" toast

The SPA bootstraps by calling the backend on first load. If the backend is down (or `VITE_API_URL` points to the wrong host), `__root.tsx` will show that toast. **Fix:** start the backend (`npm run dev -w backend`) and reload, or correct `VITE_API_URL` in `.env.local` and restart the Vite dev server.

### Production build calls `localhost` even though I'm on the EC2 IP

The frontend was built without setting the production `VITE_API_URL`. Vite has already inlined `localhost:8080` into the bundle. **Fix:** rebuild with `--build-arg VITE_API_URL=http://<EC2_PUBLIC_IP>:8080` (or set the `VITE_API_URL` GitHub Secret and re-trigger the pipeline).

### CORS error in the browser console (dev)

The backend's `CLIENT_ORIGIN` allow-list doesn't include the Vite dev origin (e.g. `http://localhost:5173` or `:5174` if 5173 was busy). **Fix:** edit `backend/.env`'s `CLIENT_ORIGIN` to include the actual port, comma-separated. Any `http://localhost:<port>` is auto-allowed too — but only for `http://`, not `https://`.

### `routeTree.gen.ts` shows up in my diff

It's auto-generated by the TanStack Router plugin on dev/build. **Don't edit it by hand**, but **do** commit it — Tanstack Start needs it at build time on CI. If it's out of date, just run `npm run dev -w frontend` once and it'll regenerate.

### `npm run lint:strict` fails on a fresh clone

Strict lint is zero-warnings (used by CI). Most warnings fall into "unused variable" or "exhaustive-deps". **Fix:** run `npm run lint -w frontend` (warnings allowed) to see the list, address them, then re-run strict lint. Don't disable rules globally to dodge it.

### Cart contains items from two vendors

It can't — the store enforces "one vendor per cart". Adding an item from a different vendor returns `{ ok: false, reason: "different-vendor" }` and the UI shows a confirm-then-clear flow. If you ever see mixed-vendor lines in `localStorage`, clear it from DevTools (`Application → Local Storage → http://localhost:5173`) and reload.
