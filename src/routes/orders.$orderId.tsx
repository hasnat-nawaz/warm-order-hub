import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useApp, format12, formatDate12, useLiveMenu } from "@/store/useApp";
import { getVendor } from "@/data/menu";
import {
  ArrowLeft,
  Check,
  Clock,
  ChefHat,
  Package,
  MessageSquare,
  Radio,
  XCircle,
  Edit2,
} from "lucide-react";
import { useNow } from "@/hooks/use-now";
import { motion } from "framer-motion";
import { STAGE_FLOW, statusDotClasses, statusLabel, statusPillClasses } from "@/lib/orderStatus";

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

function OrderDetail() {
  const { orderId } = Route.useParams();
  const order = useApp((s) => s.orders.find((o) => o.id === orderId));
  const update = useApp((s) => s.updateOrderStatus);
  const liveMenu = useLiveMenu();
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
  const isCancelled = order.status === "Cancelled";
  const stageIdx = STAGE_FLOW.indexOf(order.status);
  const stageIcon = [Clock, ChefHat, Package, Check];

  const minutesAgo = Math.max(0, Math.floor((Date.now() - order.placedAt) / 60_000));
  const placedLabel = minutesAgo === 0 ? "Just now" : `${minutesAgo} min ago`;

  return (
    <motion.main
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10"
    >
      <Link
        to="/orders"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All orders
      </Link>

      <div
        className={`mt-4 rounded-3xl p-[1.5px] shadow-warm ${
          isCancelled ? "bg-destructive/40" : "bg-gradient-warm"
        }`}
      >
        <div className="rounded-[calc(1.5rem-1px)] bg-card p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Order #{order.id}
              </div>
              <h1 className="font-display text-2xl font-bold sm:text-3xl">{vendor?.name}</h1>
            </div>
            <div className="flex flex-row flex-wrap items-center justify-end gap-2">
              <div
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${statusPillClasses(
                  order.status,
                )}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${statusDotClasses(order.status)}`} />
                {statusLabel(order.status, { cancellationReason: order.cancellationReason })}
              </div>
              {order.status === "Pending" && (
                <Link
                  to="/orders/edit/$orderId"
                  params={{ orderId: order.id }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary transition-colors hover:bg-primary/20"
                >
                  <Edit2 className="h-3 w-3" /> Edit
                </Link>
              )}
            </div>
          </div>
          {!isCancelled && (
            <div className="mt-4 flex items-center gap-3 rounded-2xl bg-primary/5 p-3">
              <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground">
                <Clock className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Pickup time
                </div>
                <div className="font-display text-2xl font-black leading-tight text-primary sm:text-3xl">
                  {format12(order.pickupTime)}
                </div>
              </div>
            </div>
          )}
          <p className="mt-3 text-xs text-muted-foreground">
            {order.payment} · Placed {placedLabel}
            {!isCancelled && (
              <>
                <span aria-hidden="true"> · </span>
                <span className="inline-flex items-center gap-1 text-primary">
                  <Radio className="h-3 w-3 animate-pulse" /> Live
                </span>
              </>
            )}
          </p>

          {isCancelled ? (
            <div className="mt-7 flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/10 p-4">
              <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
              <div>
                <div className="text-sm font-bold text-destructive">
                  {order.cancellationReason === "user"
                    ? "You cancelled this order"
                    : "Your order was not accepted"}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {order.cancellationReason === "user"
                    ? "This order was cancelled as per your request. No payment was charged."
                    : `${vendor?.name ?? "The vendor"} couldn't take this order. No payment was charged.`}
                  <br />
                  {order.cancellationReason !== "user" &&
                    "Try a different time or vendor — your favourites are still ready to reorder."}
                </p>
                <Link
                  to="/"
                  className="mt-3 inline-flex items-center gap-1 rounded-full bg-foreground px-3 py-1.5 text-xs font-bold text-background hover:bg-foreground/90"
                >
                  Browse vendors
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Stages */}
              <ol className="mt-7 grid grid-cols-4 gap-2">
                {STAGE_FLOW.map((s, i) => {
                  const Icon = stageIcon[i];
                  const done = i <= stageIdx;
                  return (
                    <li key={s} className="flex flex-col items-center text-center">
                      <div
                        className={`grid h-10 w-10 place-items-center rounded-full transition-colors sm:h-11 sm:w-11 ${
                          done
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
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
                aria-valuemax={STAGE_FLOW.length}
              >
                <div
                  className="h-full bg-gradient-warm transition-all duration-700"
                  style={{ width: `${((stageIdx + 1) / STAGE_FLOW.length) * 100}%` }}
                />
              </div>

              {order.status === "Pending" && (
                <div className="mt-6 rounded-xl bg-secondary/60 p-4 text-center text-sm font-semibold text-secondary-foreground">
                  Waiting for the dhaba to accept your order…
                </div>
              )}
              {order.status === "Preparing" && (
                <div className="mt-6 rounded-xl border border-warning/30 bg-warning/20 p-4 text-center text-sm font-semibold text-warning-foreground">
                  Your food is being prepared. Estimated pickup {format12(order.pickupTime)}.
                </div>
              )}
              {order.status === "Ready" && (
                <div className="mt-6 rounded-xl border border-success/30 bg-success/15 p-4 text-center text-sm font-semibold text-success-foreground">
                  Your order is ready — show order #{order.id} at the counter.
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {order.notes && (
        <section className="mt-4 rounded-2xl border border-border bg-card p-4 sm:p-5">
          <div className="flex items-center gap-2 text-sm font-bold">
            <MessageSquare className="h-4 w-4 text-primary" /> Your note
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{order.notes}</p>
        </section>
      )}

      <section className="mt-4 rounded-2xl border border-border bg-card p-4 sm:p-5">
        <h2 className="font-display text-lg font-bold">Items</h2>
        <ul className="mt-3 divide-y divide-border">
          {order.lines.map((l) => {
            const it = liveMenu.find((m) => m.id === l.itemId);
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

      {!isCancelled && (
        <div className="mt-3 text-center text-[11px] text-muted-foreground">
          Last updated {formatDate12(new Date())}
        </div>
      )}

      {order.status === "Ready" && (
        <button
          onClick={() => update(order.id, "Picked up")}
          className="mt-6 w-full rounded-full bg-foreground py-3 text-sm font-bold text-background hover:bg-foreground/90"
        >
          Mark as picked up
        </button>
      )}
    </motion.main>
  );
}
