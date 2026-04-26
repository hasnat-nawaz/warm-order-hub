# Campus Dhaba 🍛

A warm, modern campus food-ordering web app. Browse vendors, build a cart, schedule a pickup time, pay (EasyPaisa / JazzCash / Cash), track your order in real time, and re-order favorites with one tap.

Built with **React 19 + TanStack Start + Vite + Tailwind v4 + Zustand + Framer Motion**.

---

## ✨ Features

- **Home** – hero + live vendor status cards
- **Vendor menu** – categorized items, quantity steppers, add to cart
- **Cart & Checkout** – pickup time picker, payment method (EasyPaisa, JazzCash, Cash)
- **Order tracking** – animated status (Pending → Preparing → Ready → Picked up)
- **Quick Order** – one-tap reordering of favorites / past orders
- **Vendor dashboard** (`/vendor`) – manage incoming orders and advance their status
- **Persistence** – cart, orders and favorites are saved in `localStorage`

---

## 🚀 Run it on your local machine

### 1. Prerequisites

You need **one** of these package managers / runtimes installed:

- [Bun](https://bun.sh) ≥ 1.1 _(recommended – matches the lockfile)_
- or **Node.js ≥ 20** with `npm` / `pnpm` / `yarn`

Check your versions:

```bash
bun --version    # or
node --version
```

### 2. Get the code

If you exported / cloned the repo:

```bash
git clone <your-repo-url> campus-dhaba
cd campus-dhaba
```

### 3. Install dependencies

Using **Bun** (recommended):

```bash
bun install
```

Or using **npm**:

```bash
npm install
```

### 4. Start the dev server

```bash
bun run dev
# or
npm run dev
```

The app will start on **http://localhost:8080** (or the next free port). Open it in your browser — Vite will hot-reload as you edit.

### 5. Build for production

```bash
bun run build      # production build
bun run preview    # preview the built site locally
```

---

## 🗺️ Available routes

| Route                | Description                          |
| -------------------- | ------------------------------------ |
| `/`                  | Home – hero + vendor list            |
| `/vendors/:vendorId` | Vendor menu (e.g. `/vendors/raju`)   |
| `/cart`              | Cart & checkout                      |
| `/quick-order`       | Favorites & one-tap reorder          |
| `/orders`            | Your order history                   |
| `/orders/:orderId`   | Live order tracking                  |
| `/vendor`            | Vendor-side dashboard (manage queue) |

---

## 🧰 Useful scripts

```bash
bun run dev         # start dev server
bun run build       # production build
bun run preview     # preview production build
bun run lint        # run ESLint
bun run format      # format with Prettier
```

---

## 📁 Project structure

```
src/
  assets/          # static food & vendor images
  components/      # Header + shadcn/ui components
  data/menu.ts     # vendors & menu items (static data)
  routes/          # file-based routes (TanStack Router)
  store/useApp.ts  # Zustand store (cart, orders, favorites)
  styles.css       # design tokens + Tailwind v4 setup
```

---

## 🎨 Design

Warm tones: terracotta, saffron and cream, with Fraunces (display) + Inter (body) typography. All colors are defined as semantic tokens in `src/styles.css` — change them there to re-theme the whole app.

---

## ❓ Troubleshooting

- **Port already in use** → kill the other process or run `bun run dev -- --port 5174`
- **Module not found after pulling new code** → re-run `bun install`
- **Blank page / weird build error** → delete `node_modules` and `bun.lockb` (or `package-lock.json`) and reinstall

Happy hacking! 🌶️
