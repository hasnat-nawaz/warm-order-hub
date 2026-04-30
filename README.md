# Campus Dhaba (Warm Order Hub)

**Campus Dhaba** is a premium, beautifully animated food-ordering platform tailored specifically for GIKI students. The goal is to solve the age-old problem of waiting in long lines between classes: students can browse menus from on-campus dhabas, add items to their cart, pre-order ahead of time, select a specific pickup slot, and then walk straight up to collect their food right when it's ready!

The platform features an ultra-premium "frosty glassmorphism" aesthetic, warm inviting gradients (ember/saffron), beautifully staggered high-performance page animations, and an independent interface for vendors to manage their incoming queues and menus.

---

## 🚀 How to Run the Project

This project uses **React**, **Vite**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. It uses **Zustand** for state management and **TanStack Router** for client-side routing.

### Prerequisites
- Ensure you have Node.js installed.

### Steps
1. **Install dependencies:**
   Open your terminal in the project root and run:
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **View the app:**
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🍔 Demo Values and Features

The application comes pre-loaded with a realistic set of static data (handled in the Zustand store) so you can test both the **Customer** and **Vendor** flows without needing a database!

### 1. The Vendors (Dhabas)
There are three built-in demo vendors:
* **Raju Dhaba** (`raju`): Serves Desi classics & morning parathas (e.g. Aloo Paratha, Karak Chai, Chicken Biryani).
* **Hot & Spicy** (`hot`): Fired up fast food (e.g. Hot Fillet Burger, Crispy Fries, Club Sandwich).
* **Sip Spot** (`sip`): Fresh juices & cold beverages. *(Note: This vendor is set to "Closed / Not Accepting Orders" by default so you can test the "Closed" UI state).*

### 2. Roles (Customer vs. Vendor)
You can experience both sides of the application! To switch roles, click the **"Vendor Sign In"** button at the bottom of the Home page, or go to `/login`.

**Customer View:**
- You can log in using any of the following demo customer accounts:
  - **Username:** `demo` | **Password:** `demo123`
  - **Username:** `ahmed` | **Password:** `ahmed123`
  - **Username:** `ali` | **Password:** `ali123`
- Browse the dhabas, add items to your cart, pick a time slot, and "Place Order".
- Check your previous orders on the "My Orders" page.
- Use "Quick Order" to repeat past orders with a single tap.

**Vendor View:**
- You can log in as a vendor using any of their specific credentials:
  - **Username:** `raju` | **Password:** `raju123` (Raju Dhaba)
  - **Username:** `hot` | **Password:** `hot123` (Hot & Spicy)
  - **Username:** `sip` | **Password:** `sip123` (Sip Spot)
- The Vendor Dashboard allows you to open/close the shop.
- Accept incoming orders, mark them as "Preparing", and finally "Ready" or "Picked up".
- Filter orders by date and view today's revenue.
- Manage your menu (add new items, edit prices/descriptions) from the **Manage Menu** page.

### 3. Aesthetics & Animations
Be sure to navigate around the site! The platform utilizes advanced `framer-motion` implementations to provide high-end, 60fps staggered entrance animations on almost every screen (Home, My Orders, Quick Order, Vendor Dashboard). Watch the sections elegantly slide up independently whenever a new page mounts!
