import { create } from "zustand";
import { persist } from "zustand/middleware";
import { menu, type MenuItem } from "@/data/menu";

export type CartLine = { itemId: string; qty: number };
export type OrderStatus = "Pending" | "Preparing" | "Ready" | "Picked up";

export type Order = {
  id: string;
  vendorId: string;
  lines: CartLine[];
  total: number;
  pickupTime: string; // HH:MM
  placedAt: number;
  status: OrderStatus;
  customer: string;
  payment: "EasyPaisa" | "JazzCash" | "Cash on Pickup";
};

type Store = {
  cart: CartLine[];
  cartVendorId: string | null;
  favorites: string[]; // itemIds
  orders: Order[];
  customer: string;

  addToCart: (item: MenuItem, qty?: number) => { ok: boolean; reason?: string };
  removeFromCart: (itemId: string) => void;
  setQty: (itemId: string, qty: number) => void;
  clearCart: () => void;

  toggleFavorite: (itemId: string) => void;

  placeOrder: (opts: { pickupTime: string; payment: Order["payment"] }) => Order | null;
  quickOrder: (itemId: string, pickupTime: string) => Order;

  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
};

export const useApp = create<Store>()(
  persist(
    (set, get) => ({
      cart: [],
      cartVendorId: null,
      favorites: ["hot-burger", "raju-roll", "sip-strawberry"],
      orders: [],
      customer: "Ahmed Khan",

      addToCart: (item, qty = 1) => {
        const { cartVendorId, cart } = get();
        if (cartVendorId && cartVendorId !== item.vendorId) {
          return { ok: false, reason: "Your cart has items from another vendor. Clear it first." };
        }
        const existing = cart.find(l => l.itemId === item.id);
        const next = existing
          ? cart.map(l => l.itemId === item.id ? { ...l, qty: l.qty + qty } : l)
          : [...cart, { itemId: item.id, qty }];
        set({ cart: next, cartVendorId: item.vendorId });
        return { ok: true };
      },
      removeFromCart: (itemId) => {
        const next = get().cart.filter(l => l.itemId !== itemId);
        set({ cart: next, cartVendorId: next.length ? get().cartVendorId : null });
      },
      setQty: (itemId, qty) => {
        if (qty <= 0) return get().removeFromCart(itemId);
        set({ cart: get().cart.map(l => l.itemId === itemId ? { ...l, qty } : l) });
      },
      clearCart: () => set({ cart: [], cartVendorId: null }),

      toggleFavorite: (itemId) => {
        const f = get().favorites;
        set({ favorites: f.includes(itemId) ? f.filter(x => x !== itemId) : [...f, itemId] });
      },

      placeOrder: ({ pickupTime, payment }) => {
        const { cart, cartVendorId, customer } = get();
        if (!cart.length || !cartVendorId) return null;
        const total = cart.reduce((s, l) => {
          const it = menu.find(m => m.id === l.itemId);
          return s + (it?.price ?? 0) * l.qty;
        }, 0);
        const order: Order = {
          id: String(1000 + Math.floor(Math.random() * 9000)),
          vendorId: cartVendorId,
          lines: cart,
          total,
          pickupTime,
          placedAt: Date.now(),
          status: "Pending",
          customer,
          payment,
        };
        set({ orders: [order, ...get().orders], cart: [], cartVendorId: null });
        return order;
      },

      quickOrder: (itemId, pickupTime) => {
        const item = menu.find(m => m.id === itemId)!;
        const order: Order = {
          id: String(1000 + Math.floor(Math.random() * 9000)),
          vendorId: item.vendorId,
          lines: [{ itemId, qty: 1 }],
          total: item.price,
          pickupTime,
          placedAt: Date.now(),
          status: "Pending",
          customer: get().customer,
          payment: "EasyPaisa",
        };
        set({ orders: [order, ...get().orders] });
        return order;
      },

      updateOrderStatus: (orderId, status) => {
        set({ orders: get().orders.map(o => o.id === orderId ? { ...o, status } : o) });
      },
    }),
    { name: "campus-dhaba" }
  )
);

export const cartTotal = (cart: CartLine[]) =>
  cart.reduce((s, l) => {
    const it = menu.find(m => m.id === l.itemId);
    return s + (it?.price ?? 0) * l.qty;
  }, 0);

export const suggestedPickupTime = (offsetMin = 10) => {
  const d = new Date(Date.now() + offsetMin * 60_000);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
};
