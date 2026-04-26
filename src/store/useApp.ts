import { create } from "zustand";
import { persist } from "zustand/middleware";
import { menu, vendors, getVendor, type MenuItem } from "@/data/menu";

export type CartLine = { itemId: string; qty: number };
export type OrderStatus = "Pending" | "Preparing" | "Ready" | "Picked up";
export type Role = "customer" | "vendor" | null;

export type Order = {
  id: string;
  vendorId: string;
  lines: CartLine[];
  total: number;
  pickupTime: string; // HH:MM (24h, internal)
  placedAt: number;
  status: OrderStatus;
  customer: string;
  payment: "EasyPaisa" | "JazzCash" | "Cash on Pickup";
  notes?: string;
};

type Store = {
  cart: CartLine[];
  cartVendorId: string | null;
  favorites: string[];
  orders: Order[];
  customer: string;

  // Auth
  role: Role;
  vendorLogin: string | null; // vendor id when role === "vendor"

  // Vendor state
  vendorAccepting: Record<string, boolean>;

  // Sequential id counter
  orderCounter: number;

  setRole: (role: Role, opts?: { vendorId?: string; customer?: string }) => void;
  logout: () => void;
  toggleVendorAccepting: (vendorId: string) => void;

  addToCart: (item: MenuItem, qty?: number) => { ok: boolean; reason?: string };
  removeFromCart: (itemId: string) => void;
  setQty: (itemId: string, qty: number) => void;
  clearCart: () => void;

  toggleFavorite: (itemId: string) => void;

  placeOrder: (opts: {
    pickupTime: string;
    payment: Order["payment"];
    notes?: string;
  }) => Order | null;
  quickOrder: (itemId: string, pickupTime: string) => Order;

  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
};

const defaultAccepting = vendors.reduce<Record<string, boolean>>((acc, v) => {
  acc[v.id] = v.accepting;
  return acc;
}, {});

export const useApp = create<Store>()(
  persist(
    (set, get) => ({
      cart: [],
      cartVendorId: null,
      favorites: ["hot-burger", "raju-roll", "sip-strawberry"],
      orders: [],
      customer: "Ahmed Khan",

      role: null,
      vendorLogin: null,

      vendorAccepting: defaultAccepting,
      orderCounter: 1001,

      setRole: (role, opts) => {
        if (role === "vendor") {
          set({
            role: "vendor",
            vendorLogin: opts?.vendorId ?? vendors[0].id,
            cart: [],
            cartVendorId: null,
          });
        } else if (role === "customer") {
          set({
            role: "customer",
            vendorLogin: null,
            customer: opts?.customer?.trim() || get().customer || "Guest",
          });
        } else {
          set({ role: null, vendorLogin: null });
        }
      },
      logout: () => set({ role: null, vendorLogin: null, cart: [], cartVendorId: null }),

      toggleVendorAccepting: (vendorId) => {
        const map = { ...get().vendorAccepting };
        map[vendorId] = !(map[vendorId] ?? true);
        set({ vendorAccepting: map });
      },

      addToCart: (item, qty = 1) => {
        const { cartVendorId, cart, vendorAccepting } = get();
        if (vendorAccepting[item.vendorId] === false) {
          return { ok: false, reason: "This dhaba is closed right now." };
        }
        if (cartVendorId && cartVendorId !== item.vendorId) {
          return {
            ok: false,
            reason: "Your cart has items from another vendor. Clear it first.",
          };
        }
        const existing = cart.find((l) => l.itemId === item.id);
        const next = existing
          ? cart.map((l) => (l.itemId === item.id ? { ...l, qty: l.qty + qty } : l))
          : [...cart, { itemId: item.id, qty }];
        set({ cart: next, cartVendorId: item.vendorId });
        return { ok: true };
      },
      removeFromCart: (itemId) => {
        const next = get().cart.filter((l) => l.itemId !== itemId);
        set({
          cart: next,
          cartVendorId: next.length ? get().cartVendorId : null,
        });
      },
      setQty: (itemId, qty) => {
        if (qty <= 0) return get().removeFromCart(itemId);
        set({
          cart: get().cart.map((l) => (l.itemId === itemId ? { ...l, qty } : l)),
        });
      },
      clearCart: () => set({ cart: [], cartVendorId: null }),

      toggleFavorite: (itemId) => {
        const f = get().favorites;
        set({
          favorites: f.includes(itemId) ? f.filter((x) => x !== itemId) : [...f, itemId],
        });
      },

      placeOrder: ({ pickupTime, payment, notes }) => {
        const { cart, cartVendorId, customer, orderCounter } = get();
        if (!cart.length || !cartVendorId) return null;
        const total = cart.reduce((s, l) => {
          const it = menu.find((m) => m.id === l.itemId);
          return s + (it?.price ?? 0) * l.qty;
        }, 0);
        const order: Order = {
          id: String(orderCounter),
          vendorId: cartVendorId,
          lines: cart,
          total,
          pickupTime,
          placedAt: Date.now(),
          status: "Pending",
          customer,
          payment,
          notes: notes?.trim() || undefined,
        };
        set({
          orders: [order, ...get().orders],
          cart: [],
          cartVendorId: null,
          orderCounter: orderCounter + 1,
        });
        return order;
      },

      quickOrder: (itemId, pickupTime) => {
        const item = menu.find((m) => m.id === itemId)!;
        const { orderCounter } = get();
        const order: Order = {
          id: String(orderCounter),
          vendorId: item.vendorId,
          lines: [{ itemId, qty: 1 }],
          total: item.price,
          pickupTime,
          placedAt: Date.now(),
          status: "Pending",
          customer: get().customer,
          payment: "EasyPaisa",
        };
        set({
          orders: [order, ...get().orders],
          orderCounter: orderCounter + 1,
        });
        return order;
      },

      updateOrderStatus: (orderId, status) => {
        set({
          orders: get().orders.map((o) => (o.id === orderId ? { ...o, status } : o)),
        });
      },
    }),
    {
      name: "campus-dhaba",
      version: 2,
      // Migrate older stored shape that lacked the new fields.
      migrate: (persisted: unknown) => {
        const state = (persisted ?? {}) as Partial<Store>;
        return {
          ...state,
          role: state.role ?? null,
          vendorLogin: state.vendorLogin ?? null,
          vendorAccepting: { ...defaultAccepting, ...(state.vendorAccepting ?? {}) },
          orderCounter:
            state.orderCounter && state.orderCounter >= 1001
              ? state.orderCounter
              : 1001 + (state.orders?.length ?? 0),
        } as Store;
      },
    },
  ),
);

// Cross-tab sync: when another tab updates persisted state (e.g. vendor marks
// an order ready), rehydrate this tab's store so the customer view updates
// in real time without a refresh.
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === "campus-dhaba") {
      useApp.persist.rehydrate();
    }
  });
}

// ---------- Selectors / helpers ----------

export const cartTotal = (cart: CartLine[]) =>
  cart.reduce((s, l) => {
    const it = menu.find((m) => m.id === l.itemId);
    return s + (it?.price ?? 0) * l.qty;
  }, 0);

// ---------- Time helpers (12-hour aware) ----------

const pad = (n: number) => String(n).padStart(2, "0");

/** Returns current local time as HH:MM in 24h (internal storage format). */
export const nowTime24 = () => {
  const d = new Date();
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

/** Convert HH:MM (24h) to today's Date object. */
export const time24ToDate = (t: string, base: Date = new Date()) => {
  const [h, m] = t.split(":").map((n) => parseInt(n, 10));
  const d = new Date(base);
  d.setHours(h, m, 0, 0);
  return d;
};

/** Convert HH:MM (24h) -> "h:mm AM/PM". */
export const format12 = (t: string) => {
  if (!t || !t.includes(":")) return t;
  const [hStr, mStr] = t.split(":");
  let h = parseInt(hStr, 10);
  const m = parseInt(mStr, 10);
  if (Number.isNaN(h) || Number.isNaN(m)) return t;
  const suffix = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${pad(m)} ${suffix}`;
};

/** Format a Date directly into "h:mm AM/PM". */
export const formatDate12 = (d: Date) =>
  d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true });

/** Add minutes to an HH:MM (24h) string and return HH:MM (24h). */
export const addMinutes24 = (t: string, mins: number) => {
  const d = time24ToDate(t);
  d.setMinutes(d.getMinutes() + mins);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

/** Compare two HH:MM (24h) strings: returns negative if a<b, 0 if equal, positive if a>b. */
export const compareTime24 = (a: string, b: string) => {
  const [ah, am] = a.split(":").map(Number);
  const [bh, bm] = b.split(":").map(Number);
  return ah * 60 + am - (bh * 60 + bm);
};

/**
 * Pull the upper-bound prep time (in minutes) from a vendor's "8–12 min" or
 * "10-15 min" string. Falls back to 10 if it can't be parsed.
 */
const vendorPrepUpperMinutes = (vendorId: string): number => {
  const v = getVendor(vendorId);
  if (!v) return 10;
  const match = v.prepTime.match(/(\d+)\s*[–\-to]+\s*(\d+)/);
  if (match) return parseInt(match[2], 10);
  const single = v.prepTime.match(/(\d+)/);
  return single ? parseInt(single[1], 10) : 10;
};

/**
 * Suggested earliest pickup time for a vendor based on its current queue.
 *
 * Logic: count active (not picked up) orders for that vendor and add the
 * vendor's per-order prep upper bound to "now". Also adds a small buffer so
 * the customer has time to walk over.
 */
export const suggestedPickupForVendor = (
  vendorId: string | null | undefined,
  orders: Order[],
): string => {
  if (!vendorId) return addMinutes24(nowTime24(), 10);
  const queue = orders.filter(
    (o) => o.vendorId === vendorId && (o.status === "Pending" || o.status === "Preparing"),
  ).length;
  const prep = vendorPrepUpperMinutes(vendorId);
  // first order = prep time only; each extra in queue adds half a prep cycle.
  const wait = prep + Math.max(0, queue) * Math.max(3, Math.floor(prep / 2));
  return addMinutes24(nowTime24(), wait);
};

/** Back-compat helper used by quick order. */
export const suggestedPickupTime = (offsetMin = 10) => addMinutes24(nowTime24(), offsetMin);
