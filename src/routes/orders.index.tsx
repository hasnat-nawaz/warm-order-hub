import { createFileRoute, Link } from "@tanstack/react-router";
import { useApp } from "@/store/useApp";
import { getItem, getVendor } from "@/data/menu";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/orders/")({
  head: () => ({ meta: [{ title: "My orders — Campus Dhaba" }] }),
  component: OrdersPage,
});

const statusColor: Record<string, string> = {
  Pending: "bg-secondary text-secondary-foreground",
  Preparing: "bg-accent/30 text-accent-foreground",
  Ready: "bg-primary text-primary-foreground",
  "Picked up": "bg-muted text-muted-foreground",
};

function OrdersPage() {
  const orders = useApp(s => s.orders);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>
      <h1 className="mt-3 font-display text-4xl font-bold">My orders</h1>

      {orders.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          No orders yet. Place your first one!
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {orders.map((o) => {
            const v = getVendor(o.vendorId);
            return (
              <Link
                key={o.id}
                to="/orders/$orderId"
                params={{ orderId: o.id }}
                className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4 transition-shadow hover:shadow-card"
              >
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">Order #{o.id} · {v?.name}</div>
                  <div className="mt-0.5 truncate font-semibold">
                    {o.lines.map(l => `${l.qty}× ${getItem(l.itemId)?.name}`).join(", ")}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">Pickup {o.pickupTime} · Rs. {o.total}</div>
                </div>
                <span className={`rounded-full px-3 py-1.5 text-xs font-bold ${statusColor[o.status]}`}>{o.status}</span>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
