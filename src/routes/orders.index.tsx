import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useApp, format12 } from "@/store/useApp";
import { getItem, getVendor } from "@/data/menu";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/orders/")({
  head: () => ({ meta: [{ title: "My orders — Campus Dhaba" }] }),
  beforeLoad: ({ location }) => {
    if (typeof window === "undefined") return;
    const state = useApp.getState();
    if (state.role === "vendor") {
      throw redirect({ to: "/vendor" });
    }
    if (!state.role) {
      throw redirect({ to: "/login", search: { redirect: location.pathname } });
    }
  },
  component: OrdersPage,
});

const statusColor: Record<string, string> = {
  Pending: "bg-secondary text-secondary-foreground",
  Preparing: "bg-accent/30 text-accent-foreground",
  Ready: "bg-primary text-primary-foreground",
  "Picked up": "bg-muted text-muted-foreground",
};

function OrdersPage() {
  const orders = useApp((s) => s.orders);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>
      <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">My orders</h1>

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
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 transition-shadow hover:shadow-card sm:gap-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-muted-foreground">
                    Order #{o.id} · {v?.name}
                  </div>
                  <div className="mt-0.5 truncate font-semibold">
                    {o.lines.map((l) => `${l.qty}× ${getItem(l.itemId)?.name}`).join(", ")}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Pickup {format12(o.pickupTime)} · Rs. {o.total}
                  </div>
                </div>
                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-bold ${statusColor[o.status]}`}
                >
                  {o.status}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
