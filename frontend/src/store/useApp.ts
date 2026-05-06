import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  type Category,
  type MenuItem,
  type Vendor,
  menuItemImage,
  vendorWithImage,
} from "@/data/menu";
import { apiFetch } from "@/lib/api";

export type CartLine = { itemId: string; qty: number };
export type OrderStatus = "Pending" | "Preparing" | "Ready" | "Picked up" | "Cancelled";
export type Role = "customer" | "vendor" | null;

export type Order = {
  id: string; // public id (stringified number)
  vendorId: string;
  lines: CartLine[];
  total: number;
  pickupTime: string; // HH:MM (24h)
  placedAt: number; // epoch ms
  status: OrderStatus;
  customer: string;
  payment: "EasyPaisa" | "JazzCash" | "Cash on Pickup";
  notes?: string;
  cancellationReason?: "user" | "vendor";
};

type ApiVendor = {
  id: string;
  name: string;
  tagline: string;
  location: string;
  hours: string;
  prep_time: string;
  accepting: boolean;
};

type ApiMenuItem = {
  id: string;
  vendor_id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  active: boolean;
};

type ApiOrder = {
  id: string; // uuid
  public_id: number;
  vendor_id: string;
  customer_display_name: string;
  status: OrderStatus;
  payment: Order["payment"];
  notes: string | null;
  pickup_time_24: string;
  placed_at: string;
  cancellation_reason: "user" | "vendor" | null;
  lines: Array<{ item_id: string; qty: number; unit_price?: number }>;
};

type Store = {
  // Auth
  token: string | null;
  role: Role;
  vendorLogin: string | null;
  username: string | null;
  displayName: string | null;
  customer: string;

  // Data
  vendors: Vendor[];
  menuItems: ApiMenuItem[];
  vendorAccepting: Record<string, boolean>;
  orders: Order[];
  _orderUuidByPublicId: Record<string, string>;

  // Cart
  cart: CartLine[];
  cartVendorId: string | null;
  favorites: string[];

  // Bootstrap/loaders
  bootstrap: () => Promise<void>;
  refreshOrders: () => Promise<void>;

  // Auth actions
  login: (username: string, password: string) => Promise<void>;
  signup: (displayName: string, username: string, password: string) => Promise<void>;
  logout: () => void;

  // Vendor actions
  toggleVendorAccepting: (vendorId: string) => Promise<void>;

  // Cart actions
  addToCart: (item: MenuItem, qty?: number) => { ok: boolean; reason?: string };
  removeFromCart: (itemId: string) => void;
  setQty: (itemId: string, qty: number) => void;
  clearCart: () => void;
  toggleFavorite: (itemId: string) => void;

  // Menu CRUD (vendor)
  addMenuItem: (item: {
    name: string;
    price: number;
    category: Category;
    description: string;
  }) => Promise<void>;
  updateMenuItem: (
    id: string,
    patch: Partial<Pick<MenuItem, "name" | "price" | "category" | "description">>,
  ) => Promise<void>;
  deleteMenuItem: (id: string) => Promise<void>;

  // Orders
  placeOrder: (opts: {
    pickupTime: string;
    payment: Order["payment"];
    notes?: string;
  }) => Promise<Order | null>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  updateOrderLines: (orderId: string, lines: CartLine[]) => Promise<void>;
  cancelOrder: (orderId: string, reason?: "user" | "vendor") => Promise<void>;
};

const mapApiOrder = (o: ApiOrder): Order => {
  const placedAt = Date.parse(o.placed_at);
  const total = o.lines.reduce((s, l) => s + (l.unit_price ?? 0) * l.qty, 0);
  return {
    id: String(o.public_id),
    vendorId: o.vendor_id,
    lines: o.lines.map((l) => ({ itemId: l.item_id, qty: l.qty })),
    total,
    pickupTime: o.pickup_time_24,
    placedAt: Number.isFinite(placedAt) ? placedAt : Date.now(),
    status: o.status,
    customer: o.customer_display_name,
    payment: o.payment,
    notes: o.notes ?? undefined,
    cancellationReason: o.cancellation_reason ?? undefined,
  };
};

export const useApp = create<Store>()(
  persist(
    (set, get) => ({
      token: null,
      role: null,
      vendorLogin: null,
      username: null,
      displayName: null,
      customer: "Guest",

      vendors: [],
      menuItems: [],
      vendorAccepting: {},
      orders: [],
      _orderUuidByPublicId: {},

      cart: [],
      cartVendorId: null,
      favorites: [],

      bootstrap: async () => {
        const v = await apiFetch<{ vendors: ApiVendor[] }>("/api/vendors");
        const vendors = v.vendors.map((x) =>
          vendorWithImage({
            id: x.id,
            name: x.name,
            tagline: x.tagline,
            location: x.location,
            hours: x.hours,
            prepTime: x.prep_time,
            accepting: x.accepting,
          }),
        );
        const vendorAccepting = vendors.reduce<Record<string, boolean>>((acc, x) => {
          acc[x.id] = x.accepting;
          return acc;
        }, {});

        const m = await apiFetch<{ items: ApiMenuItem[] }>("/api/menu");
        set({ vendors, vendorAccepting, menuItems: m.items });

        // If user is already logged in (persisted), refresh their orders.
        if (get().token && get().role) {
          await get().refreshOrders();
        }
      },

      refreshOrders: async () => {
        const { role, token } = get();
        if (!role || !token) {
          set({ orders: [], _orderUuidByPublicId: {} });
          return;
        }

        if (role === "customer") {
          const r = await apiFetch<{ orders: ApiOrder[] }>("/api/orders/me", { token });
          const map: Record<string, string> = {};
          for (const o of r.orders) map[String(o.public_id)] = o.id;
          set({ orders: r.orders.map(mapApiOrder), _orderUuidByPublicId: map });
        } else {
          const r = await apiFetch<{ orders: ApiOrder[] }>("/api/vendor/orders", { token });
          const map: Record<string, string> = {};
          for (const o of r.orders) map[String(o.public_id)] = o.id;
          set({ orders: r.orders.map(mapApiOrder), _orderUuidByPublicId: map });
        }
      },

      login: async (username, password) => {
        const r = await apiFetch<{
          token: string;
          user: {
            username: string;
            role: "customer" | "vendor";
            displayName: string;
            vendorId?: string | null;
          };
        }>("/api/auth/login", { method: "POST", body: { username, password } });

        set({
          token: r.token,
          role: r.user.role,
          username: r.user.username,
          displayName: r.user.displayName,
          customer: r.user.displayName,
          vendorLogin: r.user.role === "vendor" ? (r.user.vendorId ?? null) : null,
          cart: [],
          cartVendorId: null,
        });
        await get().refreshOrders();
      },

      signup: async (displayName, username, password) => {
        const r = await apiFetch<{
          token: string;
          user: { username: string; role: "customer"; displayName: string };
        }>("/api/auth/signup", { method: "POST", body: { displayName, username, password } });

        set({
          token: r.token,
          role: "customer",
          username: r.user.username,
          displayName: r.user.displayName,
          customer: r.user.displayName,
          vendorLogin: null,
          cart: [],
          cartVendorId: null,
        });
        await get().refreshOrders();
      },

      logout: () =>
        set({
          token: null,
          role: null,
          vendorLogin: null,
          username: null,
          displayName: null,
          customer: "Guest",
          orders: [],
          cart: [],
          cartVendorId: null,
        }),

      toggleVendorAccepting: async (vendorId) => {
        const { token, role, vendorLogin, vendorAccepting } = get();
        if (!token || role !== "vendor" || vendorLogin !== vendorId) return;
        const next = !(vendorAccepting[vendorId] ?? true);
        await apiFetch("/api/vendors/" + encodeURIComponent(vendorId) + "/accepting", {
          method: "PATCH",
          token,
          body: { accepting: next },
        });
        set({ vendorAccepting: { ...vendorAccepting, [vendorId]: next } });
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
        set({ cart: next, cartVendorId: next.length ? get().cartVendorId : null });
      },
      setQty: (itemId, qty) => {
        if (qty <= 0) return get().removeFromCart(itemId);
        set({ cart: get().cart.map((l) => (l.itemId === itemId ? { ...l, qty } : l)) });
      },
      clearCart: () => set({ cart: [], cartVendorId: null }),
      toggleFavorite: (itemId) => {
        const f = get().favorites;
        set({ favorites: f.includes(itemId) ? f.filter((x) => x !== itemId) : [...f, itemId] });
      },

      addMenuItem: async (item) => {
        const { token, role } = get();
        if (!token || role !== "vendor") return;
        const r = await apiFetch<{ item: ApiMenuItem }>("/api/vendor/menu-items", {
          method: "POST",
          token,
          body: item,
        });
        set({ menuItems: [r.item, ...get().menuItems] });
      },

      updateMenuItem: async (id, patch) => {
        const { token, role } = get();
        if (!token || role !== "vendor") return;
        const r = await apiFetch<{ item: ApiMenuItem }>(
          "/api/vendor/menu-items/" + encodeURIComponent(id),
          {
            method: "PATCH",
            token,
            body: patch,
          },
        );
        set({ menuItems: get().menuItems.map((x) => (x.id === id ? r.item : x)) });
      },

      deleteMenuItem: async (id) => {
        const { token, role } = get();
        if (!token || role !== "vendor") return;
        await apiFetch("/api/vendor/menu-items/" + encodeURIComponent(id), {
          method: "DELETE",
          token,
        });
        set({ menuItems: get().menuItems.filter((x) => x.id !== id) });
      },

      placeOrder: async ({ pickupTime, payment, notes }) => {
        const { token, role, cart, cartVendorId } = get();
        if (!token || role !== "customer") return null;
        if (!cart.length || !cartVendorId) return null;

        await apiFetch("/api/orders", {
          method: "POST",
          token,
          body: { vendorId: cartVendorId, pickupTime, payment, notes, lines: cart },
        });

        // Refresh orders from server (authoritative)
        await get().refreshOrders();
        set({ cart: [], cartVendorId: null });

        return get().orders[0] ?? null;
      },

      updateOrderStatus: async (orderId, status) => {
        const { token } = get();
        if (!token) return;
        // Backend route uses UUID internally; we store public id in UI.
        // So we resolve public id -> uuid from the loaded orders list.
        const match = get()._orderUuidByPublicId?.[orderId];
        if (!match) return;
        await apiFetch("/api/orders/" + encodeURIComponent(match) + "/status", {
          method: "PATCH",
          token,
          body: { status },
        });
        await get().refreshOrders();
      },

      updateOrderLines: async (orderId, lines) => {
        const { token } = get();
        if (!token) return;
        const match = get()._orderUuidByPublicId?.[orderId];
        if (!match) return;
        await apiFetch("/api/orders/" + encodeURIComponent(match) + "/lines", {
          method: "PATCH",
          token,
          body: { lines },
        });
        await get().refreshOrders();
      },

      cancelOrder: async (orderId, reason = "vendor") => {
        const { token } = get();
        if (!token) return;
        const match = get()._orderUuidByPublicId?.[orderId];
        if (!match) return;
        await apiFetch("/api/orders/" + encodeURIComponent(match) + "/status", {
          method: "PATCH",
          token,
          body: { status: "Cancelled", cancellationReason: reason },
        });
        await get().refreshOrders();
      },
    }),
    {
      name: "campus-dhaba",
      version: 4,
      migrate: (persisted: unknown) => {
        const s = (persisted ?? {}) as Partial<Store>;
        return {
          token: (s as Partial<Pick<Store, "token">>).token ?? null,
          role: s.role ?? null,
          vendorLogin: s.vendorLogin ?? null,
          username: s.username ?? null,
          displayName: s.displayName ?? null,
          customer: s.customer ?? "Guest",
          cart: s.cart ?? [],
          cartVendorId: s.cartVendorId ?? null,
          favorites: s.favorites ?? [],
          vendors: [],
          menuItems: [],
          vendorAccepting: {},
          orders: [],
          _orderUuidByPublicId: {},
        } as Store;
      },
      partialize: (s) => ({
        token: s.token,
        role: s.role,
        vendorLogin: s.vendorLogin,
        username: s.username,
        displayName: s.displayName,
        customer: s.customer,
        cart: s.cart,
        cartVendorId: s.cartVendorId,
        favorites: s.favorites,
      }),
    },
  ),
);

// Cross-tab sync.
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === "campus-dhaba") {
      useApp.persist.rehydrate();
    }
  });
}

// ---------- Live menu selectors ----------
let _lm_menuItems: Store["menuItems"] | null = null;
let _lm_cached: MenuItem[] | null = null;

const computeLiveMenu = (state: Store): MenuItem[] => {
  if (_lm_cached && _lm_menuItems === state.menuItems) return _lm_cached;

  _lm_menuItems = state.menuItems;
  _lm_cached = state.menuItems
    .filter((x) => x.active)
    .map((x) => {
      const cat = x.category as Category;
      return {
        id: x.id,
        vendorId: x.vendor_id,
        name: x.name,
        price: x.price,
        category: cat,
        description: x.description ?? "",
        image: menuItemImage(x.id, cat),
      } satisfies MenuItem;
    });
  return _lm_cached;
};

export const selectLiveMenu = (s: Store): MenuItem[] => computeLiveMenu(s);
export const useLiveMenu = (): MenuItem[] => useApp(selectLiveMenu);
export const findLiveItem = (state: Store, id: string) =>
  computeLiveMenu(state).find((m) => m.id === id);
export const itemsForVendorCategory = (list: MenuItem[], vendorId: string, cat: Category) =>
  list.filter((m) => m.vendorId === vendorId && m.category === cat);

// ---------- Cart helpers ----------

export const cartTotal = (cart: CartLine[], list: MenuItem[]) =>
  cart.reduce((s, l) => {
    const it = list.find((m) => m.id === l.itemId);
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

/** Compare two HH:MM (24h) strings: negative if a<b, 0 if equal, positive if a>b. */
export const compareTime24 = (a: string, b: string) => {
  const [ah, am] = a.split(":").map(Number);
  const [bh, bm] = b.split(":").map(Number);
  return ah * 60 + am - (bh * 60 + bm);
};

const vendorPrepUpperMinutes = (vendorId: string): number => {
  const v = useApp.getState().vendors.find((x) => x.id === vendorId);
  if (!v) return 10;
  const match = v.prepTime.match(/(\d+)\s*[–\-to]+\s*(\d+)/);
  if (match) return parseInt(match[2], 10);
  const single = v.prepTime.match(/(\d+)/);
  return single ? parseInt(single[1], 10) : 10;
};

/**
 * Suggested earliest pickup time based on the vendor's active queue.
 *
 * Cancelled / Picked up orders don't count. Each remaining order adds about
 * half a prep cycle to the wait, on top of one full prep cycle baseline.
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
  const wait = prep + Math.max(0, queue) * Math.max(3, Math.floor(prep / 2));
  return addMinutes24(nowTime24(), wait);
};

/** Back-compat helper used by quick order. */
export const suggestedPickupTime = (offsetMin = 10) => addMinutes24(nowTime24(), offsetMin);
