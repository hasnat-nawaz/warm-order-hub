import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useApp, format12, type OrderStatus, useLiveMenu } from "@/store/useApp";
import { getVendor } from "@/data/menu";
import {
  CheckCircle2,
  ChefHat,
  ClipboardList,
  PackageCheck,
  Power,
  Receipt,
  StickyNote,
  Wallet,
  X,
} from "lucide-react";
import { useMemo } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { statusPillClasses, statusDotClasses, statusLabel } from "@/lib/orderStatus";

export const Route = createFileRoute("/vendor")({
  head: () => ({ meta: [{ title: "Vendor Console — Campus Dhaba" }] }),
  beforeLoad: ({ location }) => {
    if (typeof window === "undefined") return;
    const state = useApp.getState();
    if (state.role !== "vendor") {
      throw redirect({
        to: "/login",
        search: { redirect: location.pathname },
      });
    }
  },
  component: VendorDashboard,
});

const NEXT: Partial<Record<OrderStatus, OrderStatus>> = {
  Pending: "Preparing",
  Preparing: "Ready",
  Ready: "Picked up",
};

function VendorDashboard() {
  const role = useApp((s) => s.role);
  const vendorLogin = useApp((s) => s.vendorLogin);
  const orders = useApp((s) => s.orders);
  const updateOrderStatus = useApp((s) => s.updateOrderStatus);
  const vendorAccepting = useApp((s) => s.vendorAccepting);
  const toggleVendorAccepting = useApp((s) => s.toggleVendorAccepting);
  const liveMenu = useLiveMenu();

  // Run hooks unconditionally so React's hook order invariant is preserved
  // even on the bail-out path below.
  const myOrders = useMemo(
    () => (vendorLogin ? orders.filter((o) => o.vendorId === vendorLogin) : []),
    [orders, vendorLogin],
  );

  if (role !== "vendor" || !vendorLogin) {
    return (
      <main className="mx-auto max-w-md px-4 py-20 text-center">
        <p className="text-sm text-muted-foreground">
          You need to sign in as a vendor to view this page.
        </p>
        <Link
          to="/login"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
        >
          Go to sign in
        </Link>
      </main>
    );
  }

  const vendor = getVendor(vendorLogin)!;
  const accepting = vendorAccepting[vendor.id] ?? vendor.accepting;

  const todayKey = new Date().toDateString();
  const todays = myOrders.filter((o) => new Date(o.placedAt).toDateString() === todayKey);

  const stats = {
    pending: myOrders.filter((o) => o.status === "Pending").length,
    preparing: myOrders.filter((o) => o.status === "Preparing").length,
    ready: myOrders.filter((o) => o.status === "Ready").length,
    revenue: todays.filter((o) => o.status !== "Cancelled").reduce((s, o) => s + o.total, 0),
  };

  const advance = (orderId: string, current: OrderStatus) => {
    const next = NEXT[current];
    if (!next) return;
    updateOrderStatus(orderId, next);
    toast.success(`Marked ${next}`);
  };

  const cancel = (orderId: string) => {
    updateOrderStatus(orderId, "Cancelled");
    toast.error("Order cancelled");
  };

  // Sort by status urgency, then by placement (newest first within same status).
  const statusRank: Record<OrderStatus, number> = {
    Pending: 0,
    Preparing: 1,
    Ready: 2,
    "Picked up": 3,
    Cancelled: 4,
  };
  const sorted = [...myOrders].sort((a, b) => {
    const r = statusRank[a.status] - statusRank[b.status];
    return r !== 0 ? r : b.placedAt - a.placedAt;
  });

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <ChefHat className="h-4 w-4" /> {vendor.name}
          </div>
          <h1 className="mt-1 font-display text-3xl font-bold sm:text-4xl">Vendor dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Accept, prepare, and track every incoming order.
          </p>
        </div>
        <button
          onClick={() => {
            toggleVendorAccepting(vendor.id);
            toast(accepting ? "Closed for new orders" : "Now accepting orders");
          }}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold shadow-warm transition-transform hover:-translate-y-0.5 ${
            accepting ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"
          }`}
        >
          <Power className="h-4 w-4" />
          {accepting ? "Open · Accepting orders" : "Closed · Reopen"}
        </button>
      </div>

      {/* Stats — 2x2 on mobile, 4-col on lg */}
      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          icon={<ClipboardList className="h-4 w-4" />}
          label="To accept"
          value={stats.pending}
          tone="muted"
        />
        <StatCard
          icon={<ChefHat className="h-4 w-4" />}
          label="Preparing"
          value={stats.preparing}
          tone="warning"
        />
        <StatCard
          icon={<PackageCheck className="h-4 w-4" />}
          label="Ready"
          value={stats.ready}
          tone="success"
        />
        <StatCard
          icon={<Wallet className="h-4 w-4" />}
          label="Today"
          value={`Rs. ${stats.revenue}`}
          tone="primary"
        />
      </div>

      <div className="mt-8">
        <h2 className="font-display text-2xl font-bold">Live orders</h2>
        {sorted.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
            <Receipt className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-3 text-sm text-muted-foreground">
              No orders yet. They'll appear here as customers tap order.
            </p>
          </div>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {sorted.map((o) => (
                <motion.article
                  key={o.id}
                  layout
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.22 }}
                  className="relative flex flex-col gap-3 rounded-3xl border border-border bg-card p-5 shadow-card"
                >
                  {/* Status pill — top right */}
                  <span
                    className={`absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${statusPillClasses(
                      o.status,
                    )}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${statusDotClasses(o.status)}`} />
                    {statusLabel(o.status)}
                  </span>

                  {/* Header — order #, customer */}
                  <div className="pr-24">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Order
                    </div>
                    <div className="font-display text-3xl font-black leading-none">#{o.id}</div>
                    <div className="mt-1 truncate text-sm font-semibold">{o.customer}</div>
                  </div>

                  {/* Time + payment */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="rounded-full bg-secondary px-2.5 py-1 font-bold text-secondary-foreground">
                      Pickup · {format12(o.pickupTime)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Wallet className="h-3 w-3" /> {o.payment}
                    </span>
                  </div>

                  {/* Items */}
                  <ul className="space-y-1 text-sm">
                    {o.lines.map((l) => {
                      const item = liveMenu.find((m) => m.id === l.itemId);
                      return (
                        <li
                          key={l.itemId}
                          className="flex items-baseline justify-between gap-3 border-b border-dashed border-border/70 pb-1 last:border-0 last:pb-0"
                        >
                          <span className="truncate">
                            <span className="font-bold text-primary">{l.qty}×</span>{" "}
                            {item?.name ?? l.itemId}
                          </span>
                          <span className="text-xs font-semibold text-muted-foreground">
                            Rs. {(item?.price ?? 0) * l.qty}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  {o.notes && (
                    <div className="rounded-xl border border-warning/40 bg-warning/15 p-2.5 text-xs">
                      <div className="flex items-center gap-1 font-bold uppercase tracking-wider text-warning-foreground/80">
                        <StickyNote className="h-3 w-3" /> Note
                      </div>
                      <div className="mt-1 text-foreground">{o.notes}</div>
                    </div>
                  )}

                  <div className="mt-1 flex items-center justify-between border-t border-border pt-3">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">
                      Total
                    </div>
                    <div className="font-display text-xl font-black">Rs. {o.total}</div>
                  </div>

                  {/* Action row — at the bottom of the block */}
                  <div className="mt-1 flex gap-2">
                    {o.status === "Pending" && (
                      <>
                        <button
                          onClick={() => cancel(o.id)}
                          className="inline-flex items-center justify-center gap-1 rounded-full border border-destructive/40 bg-destructive/5 px-3 py-2 text-xs font-bold text-destructive hover:bg-destructive/10"
                        >
                          <X className="h-3.5 w-3.5" /> Decline
                        </button>
                        <button
                          onClick={() => advance(o.id, o.status)}
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-warm"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" /> Accept order
                        </button>
                      </>
                    )}
                    {(o.status === "Preparing" || o.status === "Ready") && (
                      <button
                        onClick={() => advance(o.id, o.status)}
                        className="inline-flex flex-1 items-center justify-center rounded-full bg-foreground px-4 py-2.5 text-xs font-bold text-background hover:bg-foreground/90"
                      >
                        Mark {NEXT[o.status]} →
                      </button>
                    )}
                    {(o.status === "Picked up" || o.status === "Cancelled") && (
                      <div className="flex-1 rounded-full border border-border bg-muted/40 px-4 py-2.5 text-center text-xs font-bold text-muted-foreground">
                        Closed
                      </div>
                    )}
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  tone: "primary" | "success" | "warning" | "muted";
}) {
  const toneClasses = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/15 text-success-foreground",
    warning: "bg-warning/30 text-warning-foreground",
    muted: "bg-muted text-muted-foreground",
  }[tone];
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
      <div className="flex items-center gap-2">
        <span className={`grid h-8 w-8 place-items-center rounded-full ${toneClasses}`}>
          {icon}
        </span>
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="mt-3 font-display text-3xl font-black leading-none">{value}</div>
    </div>
  );
}
