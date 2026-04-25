import { createFileRoute, Link } from "@tanstack/react-router";
import { useApp } from "@/store/useApp";
import { getItem, getVendor } from "@/data/menu";
import { ArrowLeft, Check, Clock, ChefHat, Package } from "lucide-react";
import { useEffect } from "react";

export const Route = createFileRoute("/orders/$orderId")({
  component: OrderDetail,
});

const STAGES = ["Pending", "Preparing", "Ready", "Picked up"] as const;

function OrderDetail() {
  const { orderId } = Route.useParams();
  const order = useApp(s => s.orders.find(o => o.id === orderId));
  const update = useApp(s => s.updateOrderStatus);

  // Simulate progress for demo
  useEffect(() => {
    if (!order) return;
    if (order.status === "Pending") {
      const t = setTimeout(() => update(order.id, "Preparing"), 4000);
      return () => clearTimeout(t);
    }
    if (order.status === "Preparing") {
      const t = setTimeout(() => update(order.id, "Ready"), 8000);
      return () => clearTimeout(t);
    }
  }, [order, update]);

  if (!order) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="text-muted-foreground">Order not found.</p>
        <Link to="/orders" className="mt-4 inline-block text-primary underline">Back to orders</Link>
      </main>
    );
  }

  const vendor = getVendor(order.vendorId);
  const stageIdx = STAGES.indexOf(order.status);

  const stageIcon = [Clock, ChefHat, Package, Check];

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <Link to="/orders" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> All orders
      </Link>

      <div className="mt-4 rounded-3xl bg-gradient-warm p-[1.5px] shadow-warm">
        <div className="rounded-[calc(1.5rem-1px)] bg-card p-6">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Order #{order.id}</div>
          <h1 className="font-display text-3xl font-bold">{vendor?.name}</h1>
          <p className="text-sm text-muted-foreground">Pickup at <span className="font-semibold text-foreground">{order.pickupTime}</span> · {order.payment}</p>

          {/* Stages */}
          <ol className="mt-8 grid grid-cols-4 gap-2">
            {STAGES.map((s, i) => {
              const Icon = stageIcon[i];
              const done = i <= stageIdx;
              return (
                <li key={s} className="flex flex-col items-center text-center">
                  <div className={`grid h-11 w-11 place-items-center rounded-full transition-colors ${done ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className={`mt-2 text-[11px] font-bold uppercase tracking-wider ${done ? "text-foreground" : "text-muted-foreground"}`}>{s}</div>
                </li>
              );
            })}
          </ol>
          <div className="mt-4 h-1 overflow-hidden rounded-full bg-muted">
            <div className="h-full bg-gradient-warm transition-all duration-700" style={{ width: `${((stageIdx + 1) / STAGES.length) * 100}%` }} />
          </div>

          {order.status === "Ready" && (
            <div className="mt-6 rounded-xl bg-primary/10 p-4 text-center text-sm font-semibold text-primary">
              🎉 Your order is ready! Show order #{order.id} at the counter.
            </div>
          )}
        </div>
      </div>

      {/* Items */}
      <section className="mt-6 rounded-2xl border border-border bg-card p-5">
        <h2 className="font-display text-lg font-bold">Items</h2>
        <ul className="mt-3 divide-y divide-border">
          {order.lines.map(l => {
            const it = getItem(l.itemId);
            if (!it) return null;
            return (
              <li key={l.itemId} className="flex items-center justify-between py-3">
                <span><span className="font-semibold">{l.qty}×</span> {it.name}</span>
                <span className="font-semibold">Rs. {it.price * l.qty}</span>
              </li>
            );
          })}
        </ul>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3 font-display text-xl font-bold">
          <span>Total</span><span>Rs. {order.total}</span>
        </div>
      </section>

      {order.status === "Ready" && (
        <button
          onClick={() => update(order.id, "Picked up")}
          className="mt-6 w-full rounded-full bg-foreground py-3 text-sm font-bold text-background hover:bg-foreground/90"
        >
          Mark as picked up
        </button>
      )}
    </main>
  );
}
