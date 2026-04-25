import { createFileRoute } from "@tanstack/react-router";
import { useApp, type OrderStatus } from "@/store/useApp";
import { getItem, vendors } from "@/data/menu";
import { useState } from "react";
import { Bell, ChefHat } from "lucide-react";

export const Route = createFileRoute("/vendor")({
  head: () => ({ meta: [{ title: "Vendor dashboard — Campus Dhaba" }] }),
  component: VendorDashboard,
});

const next: Record<OrderStatus, OrderStatus | null> = {
  Pending: "Preparing",
  Preparing: "Ready",
  Ready: "Picked up",
  "Picked up": null,
};

const badge: Record<OrderStatus, string> = {
  Pending: "bg-secondary text-secondary-foreground",
  Preparing: "bg-accent/30 text-accent-foreground",
  Ready: "bg-primary text-primary-foreground",
  "Picked up": "bg-muted text-muted-foreground",
};

function VendorDashboard() {
  const [vendorId, setVendorId] = useState(vendors[0].id);
  const allOrders = useApp(s => s.orders);
  const update = useApp(s => s.updateOrderStatus);

  const orders = allOrders.filter(o => o.vendorId === vendorId);

  const counts = {
    Pending: orders.filter(o => o.status === "Pending").length,
    Preparing: orders.filter(o => o.status === "Preparing").length,
    Ready: orders.filter(o => o.status === "Ready").length,
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <ChefHat className="h-4 w-4" /> Vendor view
          </div>
          <h1 className="mt-1 font-display text-4xl font-bold">Order queue</h1>
        </div>
        <select
          value={vendorId}
          onChange={(e) => setVendorId(e.target.value)}
          className="rounded-full border border-input bg-card px-4 py-2 text-sm font-semibold focus:border-primary focus:outline-none"
        >
          {vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
        </select>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {(["Pending", "Preparing", "Ready"] as const).map(s => (
          <div key={s} className="rounded-2xl border border-border bg-card p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{s}</div>
            <div className="font-display text-3xl font-bold">{counts[s]}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-3">
        {orders.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
            <Bell className="mx-auto mb-3 h-6 w-6 opacity-50" />
            No orders for this vendor yet. Place one from the customer side to see it here.
          </div>
        )}
        {orders.map((o) => {
          const nx = next[o.status];
          return (
            <article key={o.id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card p-4">
              <div className="font-display text-2xl font-bold text-primary">#{o.id}</div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold">{o.customer}</div>
                <div className="truncate text-xs text-muted-foreground">
                  {o.lines.map(l => `${l.qty}× ${getItem(l.itemId)?.name}`).join(", ")}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">Pickup {o.pickupTime} · Rs. {o.total} · {o.payment}</div>
              </div>
              <span className={`rounded-full px-3 py-1.5 text-xs font-bold ${badge[o.status]}`}>{o.status}</span>
              {nx ? (
                <button
                  onClick={() => update(o.id, nx)}
                  className="rounded-full bg-foreground px-4 py-2 text-xs font-bold text-background hover:bg-foreground/90"
                >
                  Mark {nx} →
                </button>
              ) : (
                <span className="text-xs text-muted-foreground">Done</span>
              )}
            </article>
          );
        })}
      </div>
    </main>
  );
}
