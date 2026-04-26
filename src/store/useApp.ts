import { create } from "zustand";
import { persist } from "zustand/middleware";
import { baseMenu, vendors, getVendor, type Category, type MenuItem } from "@/data/menu";

export type CartLine = { itemId: string; qty: number };
export type OrderStatus = "Pending" | "Preparing" | "Ready" | "Picked up" | "Cancelled";
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

export type StoredMenuItem = MenuItem & { custom?: boolean };

type Store = {
  cart: CartLine[];
  cartVendorId: string | null;
  favorites: string[];
  orders: Order[];
  customer: string;

  // Auth
  role: Role;
  vendorLogin: string | null;
  username: string | null;
  displayName: string | null;

  // Vendor state
  vendorAccepting: Record<string, boolean>;

  // Menu state — vendor-managed extensions to the base menu
  customItems: StoredMenuItem[];
  itemOverrides: Record<string, Partial<MenuItem>>; // edits on baseMenu items
  removedItemIds: string[]; // soft-delete for both base and custom items

  // Sequential id counter
  orderCounter: number;
  itemCounter: number;

  setRole: (
    role: Role,
    opts?: {
      vendorId?: string;
      customer?: string;
      username?: string;
      displayName?: string;
    },
  ) => void;
  logout: () => void;
  toggleVendorAccepting: (vendorId: string) => void;

  addToCart: (item: MenuItem, qty?: number) => { ok: boolean; reason?: string };
  removeFromCart: (itemId: string) => void;
  setQty: (itemId: string, qty: number) => void;
  clearCart: () => void;

  toggleFavorite: (itemId: string) => void;

  // Menu CRUD
  addMenuItem: (item: Omit<MenuItem, "id">) => StoredMenuItem;
  updateMenuItem: (id: string, patch: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;

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
      username: null,
      displayName: null,

      vendorAccepting: defaultAccepting,

      customItems: [],
      itemOverrides: {},
      removedItemIds: [],

      orderCounter: 1001,
      itemCounter: 1,

      setRole: (role, opts) => {
        if (role === "vendor") {
          set({
            role: "vendor",
            vendorLogin: opts?.vendorId ?? vendors[0].id,
            username: opts?.username ?? null,
            displayName: opts?.displayName ?? null,
            cart: [],
            cartVendorId: null,
          });
        } else if (role === "customer") {
          const display = opts?.displayName?.trim() || opts?.customer?.trim() || "Guest";
          set({
            role: "customer",
            vendorLogin: null,
            username: opts?.username ?? null,
            displayName: display,
            customer: display,
          });
        } else {
          set({
            role: null,
            vendorLogin: null,
            username: null,
            displayName: null,
          });
        }
      },
      logout: () =>
        set({
          role: null,
          vendorLogin: null,
          username: null,
          displayName: null,
          cart: [],
          cartVendorId: null,
        }),

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

      addMenuItem: (input) => {
        const { itemCounter } = get();
        const item: StoredMenuItem = {
          ...input,
          id: `custom-${itemCounter}`,
          custom: true,
        };
        set({
          customItems: [...get().customItems, item],
          itemCounter: itemCounter + 1,
        });
        return item;
      },
      updateMenuItem: (id, patch) => {
        const { customItems, itemOverrides } = get();
        // If it's a custom item, edit in place. Otherwise persist an override.
        const isCustom = customItems.some((c) => c.id === id);
        if (isCustom) {
          set({
            customItems: customItems.map((c) => (c.id === id ? { ...c, ...patch, id: c.id } : c)),
          });
        } else {
          set({
            itemOverrides: { ...itemOverrides, [id]: { ...itemOverrides[id], ...patch } },
          });
        }
      },
      deleteMenuItem: (id) => {
        const { customItems, removedItemIds } = get();
        const isCustom = customItems.some((c) => c.id === id);
        if (isCustom) {
          set({ customItems: customItems.filter((c) => c.id !== id) });
        } else if (!removedItemIds.includes(id)) {
          set({ removedItemIds: [...removedItemIds, id] });
        }
      },

      placeOrder: ({ pickupTime, payment, notes }) => {
        const { cart, cartVendorId, customer, orderCounter } = get();
        if (!cart.length || !cartVendorId) return null;
        const total = cart.reduce((s, l) => {
          const it = liveMenuFromState(get())().find((m) => m.id === l.itemId);
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
        const item = liveMenuFromState(get())().find((m) => m.id === itemId)!;
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
      version: 3,
      migrate: (persisted: unknown) => {
        const state = (persisted ?? {}) as Partial<Store>;
        return {
          ...state,
          role: state.role ?? null,
          vendorLogin: state.vendorLogin ?? null,
          username: state.username ?? null,
          displayName: state.displayName ?? null,
          vendorAccepting: { ...defaultAccepting, ...(state.vendorAccepting ?? {}) },
          customItems: state.customItems ?? [],
          itemOverrides: state.itemOverrides ?? {},
          removedItemIds: state.removedItemIds ?? [],
          itemCounter: state.itemCounter ?? 1,
          orderCounter:
            state.orderCounter && state.orderCounter >= 1001
              ? state.orderCounter
              : 1001 + (state.orders?.length ?? 0),
        } as Store;
      },
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
// The "live" menu = base seed (with overrides) ∪ vendor-added custom items,
// minus anything in removedItemIds. We expose both a hook-friendly selector
// and a low-level helper for places that already have raw state.

// IMPORTANT (React 19 + SSR): selectors used with useSyncExternalStore must
// return a stable snapshot when the underlying store state hasn't changed.
// If we compute a *new array* each time, React can enter an update loop and
// throw: "The result of getServerSnapshot should be cached".
//
// This memoizer returns the same array reference as long as the relevant
// state slice references are unchanged (Zustand updates immutably, so that
// means "no actual change").
let _lm_customItems: Store["customItems"] | null = null;
let _lm_itemOverrides: Store["itemOverrides"] | null = null;
let _lm_removedIds: Store["removedItemIds"] | null = null;
let _lm_cached: MenuItem[] | null = null;

const computeLiveMenu = (state: Store): MenuItem[] => {
  if (
    _lm_cached &&
    _lm_customItems === state.customItems &&
    _lm_itemOverrides === state.itemOverrides &&
    _lm_removedIds === state.removedItemIds
  ) {
    return _lm_cached;
  }

  const removed = new Set(state.removedItemIds);
  const overrides = state.itemOverrides;
  const basePart = baseMenu
    .filter((m) => !removed.has(m.id))
    .map((m) => (overrides[m.id] ? { ...m, ...overrides[m.id] } : m));
  const customPart = state.customItems.filter((c) => !removed.has(c.id));

  _lm_customItems = state.customItems;
  _lm_itemOverrides = state.itemOverrides;
  _lm_removedIds = state.removedItemIds;
  _lm_cached = [...basePart, ...customPart];
  return _lm_cached;
};

const liveMenuFromState = (state: Store) => (): MenuItem[] => computeLiveMenu(state);

/** Selector helper: returns the live menu computed from store state. */
export const selectLiveMenu = (s: Store): MenuItem[] => computeLiveMenu(s);

/** React hook returning the live, vendor-edited menu. */
export const useLiveMenu = (): MenuItem[] => useApp(selectLiveMenu);

/** Look up a single item against the live menu (state version). */
export const findLiveItem = (state: Store, id: string) =>
  computeLiveMenu(state).find((m) => m.id === id);

/** Re-export categories helper for convenience. */
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
  const v = getVendor(vendorId);
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
