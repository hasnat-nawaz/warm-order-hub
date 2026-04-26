import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useApp, format12, formatDate12 } from "@/store/useApp";
import { getItem, getVendor } from "@/data/menu";
import { ArrowLeft, Check, Clock, ChefHat, Package, MessageSquare, Radio } from "lucide-react";
import { useNow } from "@/hooks/use-now";

export const Route = createFileRoute("/orders/$orderId")({
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
  component: OrderDetail,
});

const STAGES = ["Pending", "Preparing", "Ready", "Picked up"] as const;

function OrderDetail() {
  const { orderId } = Route.useParams();
  const order = useApp((s) => s.orders.find((o) => o.id === orderId));
  const update = useApp((s) => s.updateOrderStatus);
  // 5-second tick so the "minutes ago" copy stays fresh.
  useNow(5_000);

  if (!order) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="text-muted-foreground">Order not found.</p>
        <Link to="/orders" className="mt-4 inline-block text-primary underline">
          Back to orders
        </Link>
      </main>
    );
  }

  const vendor = getVendor(order.vendorId);
  const stageIdx = STAGES.indexOf(order.status);
  const stageIcon = [Clock, ChefHat, Package, Check];

  const minutesAgo = Math.max(0, Math.floor((Date.now() - order.placedAt) / 60_000));
  const placedLabel = minutesAgo === 0 ? "Just now" : `${minutesAgo} min ago`;

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10">
      <Link
        to="/orders"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All orders
      </Link>

      <div className="mt-4 rounded-3xl bg-gradient-warm p-[1.5px] shadow-warm">
        <div className="rounded-[calc(1.5rem-1px)] bg-card p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Order #{order.id}
              </div>
              <h1 className="font-display text-2xl font-bold sm:text-3xl">{vendor?.name}</h1>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary">
              <Radio className="h-3 w-3 animate-pulse" /> Live
            </div>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Pickup at{" "}
            <span className="font-semibold text-foreground">{format12(order.pickupTime)}</span> ·{" "}
            {order.payment}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Placed {placedLabel} · Updates from the vendor in real time.
          </p>

          {/* Stages */}
          <ol className="mt-7 grid grid-cols-4 gap-2">
            {STAGES.map((s, i) => {
              const Icon = stageIcon[i];
              const done = i <= stageIdx;
              return (
                <li key={s} className="flex flex-col items-center text-center">
                  <div
                    className={`grid h-10 w-10 place-items-center rounded-full transition-colors sm:h-11 sm:w-11 ${
                      done ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div
                    className={`mt-2 text-[10px] font-bold uppercase tracking-wider sm:text-[11px] ${
                      done ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {s}
                  </div>
                </li>
              );
            })}
          </ol>
          <div
            className="mt-4 h-1 overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuenow={stageIdx + 1}
            aria-valuemin={0}
            aria-valuemax={STAGES.length}
          >
            <div
              className="h-full bg-gradient-warm transition-all duration-700"
              style={{ width: `${((stageIdx + 1) / STAGES.length) * 100}%` }}
            />
          </div>

          {order.status === "Pending" && (
            <div className="mt-6 rounded-xl bg-secondary/60 p-4 text-center text-sm font-semibold text-secondary-foreground">
              Waiting for the dhaba to accept your order…
            </div>
          )}
          {order.status === "Preparing" && (
            <div className="mt-6 rounded-xl bg-accent/20 p-4 text-center text-sm font-semibold text-accent-foreground">
              Your food is being prepared. Estimated pickup {format12(order.pickupTime)}.
            </div>
          )}
          {order.status === "Ready" && (
            <div className="mt-6 rounded-xl bg-primary/10 p-4 text-center text-sm font-semibold text-primary">
              🎉 Your order is ready! Show order #{order.id} at the counter.
            </div>
          )}
        </div>
      </div>

      {/* Notes */}
      {order.notes && (
        <section className="mt-4 rounded-2xl border border-border bg-card p-4 sm:p-5">
          <div className="flex items-center gap-2 text-sm font-bold">
            <MessageSquare className="h-4 w-4 text-primary" /> Your note
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{order.notes}</p>
        </section>
      )}

      {/* Items */}
      <section className="mt-4 rounded-2xl border border-border bg-card p-4 sm:p-5">
        <h2 className="font-display text-lg font-bold">Items</h2>
        <ul className="mt-3 divide-y divide-border">
          {order.lines.map((l) => {
            const it = getItem(l.itemId);
            if (!it) return null;
            return (
              <li key={l.itemId} className="flex items-center justify-between py-3">
                <span>
                  <span className="font-semibold">{l.qty}×</span> {it.name}
                </span>
                <span className="font-semibold">Rs. {it.price * l.qty}</span>
              </li>
            );
          })}
        </ul>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3 font-display text-lg font-bold sm:text-xl">
          <span>Total</span>
          <span>Rs. {order.total}</span>
        </div>
      </section>

      <div className="mt-3 text-center text-[11px] text-muted-foreground">
        Last updated {formatDate12(new Date())}
      </div>

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
