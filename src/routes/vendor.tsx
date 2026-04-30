import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useApp, format12, type OrderStatus, useLiveMenu } from "@/store/useApp";
import { getVendor } from "@/data/menu";
import {
  CheckCircle2,
  ChefHat,
  ClipboardList,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Filter,
  PackageCheck,
  Power,
  Receipt,
  StickyNote,
  Wallet,
  X,
  AlertTriangle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { statusPillClasses, statusDotClasses, statusLabel } from "@/lib/orderStatus";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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

const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

// Sort by status urgency, then by placement (newest first within same status).
const STATUS_RANK: Record<OrderStatus, number> = {
  Pending: 0,
  Preparing: 1,
  Ready: 2,
  "Picked up": 3,
  Cancelled: 4,
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
  const [confirmToggle, setConfirmToggle] = useState(false);
  const [filterDate, setFilterDate] = useState<Date | null>(new Date());
  const [popoverOpen, setPopoverOpen] = useState(false);

  const sorted = useMemo(() => {
    return [...myOrders].sort((a, b) => {
      const r = STATUS_RANK[a.status] - STATUS_RANK[b.status];
      return r !== 0 ? r : b.placedAt - a.placedAt;
    });
  }, [myOrders]);

  const orderDates = useMemo(() => {
    const set = new Set<string>();
    for (const o of myOrders) {
      const d = new Date(o.placedAt);
      set.add(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`);
    }
    return set;
  }, [myOrders]);

  const filteredOrders = useMemo(() => {
    if (!filterDate) return sorted;
    return sorted.filter((o) => sameDay(new Date(o.placedAt), filterDate));
  }, [sorted, filterDate]);

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
    const cancelOrder = useApp.getState().cancelOrder;
    cancelOrder(orderId, "vendor");
    toast.error("Order cancelled");
  };

  const stepDay = (delta: number) => {
    const base = filterDate ?? new Date();
    const next = new Date(base);
    next.setDate(base.getDate() + delta);
    setFilterDate(next);
  };

  const filterLabel = filterDate
    ? sameDay(filterDate, new Date())
      ? "Today"
      : filterDate.toLocaleDateString(undefined, {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
    : "All time";

  const containerVariants = {
    hidden: { opacity: 0 },
    showSections: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const blockVariants = {
    hidden: { opacity: 0, y: 40 },
    showSections: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <motion.main variants={containerVariants} initial="hidden" animate="showSections" className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <motion.div variants={blockVariants} style={{ willChange: "transform, opacity" }} className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <h1 className="flex flex-wrap items-center gap-3 font-display text-3xl font-bold text-primary sm:text-4xl">
            <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-primary text-primary-foreground sm:h-12 sm:w-12">
              <ChefHat className="h-5 w-5 sm:h-6 sm:w-6" />
            </span>
            {vendor.name}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Accept, prepare, and track every incoming order.
          </p>
        </div>
        <button
          onClick={() => setConfirmToggle(true)}
          aria-pressed={accepting}
          className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold uppercase tracking-wide transition-all hover:-translate-y-0.5 active:translate-y-0 ${
            accepting
              ? "bg-primary text-primary-foreground shadow-warm hover:bg-primary/90"
              : "border border-primary bg-secondary/30 text-muted-foreground hover:bg-secondary/50"
          }`}
        >
          <Power className={`h-4 w-4 ${accepting ? "" : "text-primary"}`} />
          <span>{accepting ? "Open" : "Closed"}</span>
        </button>
      </motion.div>

      <AlertDialog open={confirmToggle} onOpenChange={setConfirmToggle}>
        <AlertDialogContent className="max-w-sm">
          <AlertDialogTitle className="flex items-center gap-3">
            <AlertTriangle className={`h-5 w-5 ${accepting ? "text-destructive" : "text-primary"}`} />
            {accepting ? "Close the dhaba?" : "Reopen the dhaba?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {accepting
              ? "Customers won't be able to place new orders until you reopen. Existing orders won't be affected."
              : "You'll start receiving new orders again right away. Make sure your kitchen is ready."}
          </AlertDialogDescription>
          <div className="flex gap-3 justify-end pt-4">
            <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                toggleVendorAccepting(vendor.id);
                toast(accepting ? "Closed for new orders" : "Now accepting orders");
                setConfirmToggle(false);
              }}
              className={`rounded-full ${
                accepting
                  ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              {accepting ? "Yes, close" : "Yes, reopen"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Stats — 2x2 on mobile, 4-col on lg */}
      <motion.div variants={blockVariants} style={{ willChange: "transform, opacity" }} className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
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
      </motion.div>

      <motion.div variants={blockVariants} style={{ willChange: "transform, opacity" }} className="mt-8">
        <h2 className="font-display text-2xl font-bold">Orders</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Filter by day to quickly review what happened on a specific date.
        </p>

        {/* Filter row (same UI as customer orders page) */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            onClick={() => stepDay(-1)}
            aria-label="Previous day"
            disabled={!filterDate}
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-foreground disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <button className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-bold transition-colors hover:border-primary">
                <CalendarDays className="h-4 w-4 text-primary" />
                {filterLabel}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto rounded-2xl border-border bg-card p-2" align="start">
              <Calendar
                mode="single"
                selected={filterDate ?? undefined}
                onSelect={(d) => {
                  setFilterDate(d ?? null);
                  setPopoverOpen(false);
                }}
                modifiers={{
                  hasOrders: (date) =>
                    orderDates.has(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`),
                }}
                modifiersClassNames={{
                  hasOrders:
                    "after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-1 after:rounded-full after:bg-primary",
                }}
              />
            </PopoverContent>
          </Popover>

          <button
            onClick={() => stepDay(1)}
            aria-label="Next day"
            disabled={!filterDate}
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-foreground disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <button
            onClick={() => setFilterDate(filterDate ? null : new Date())}
            className={`ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold transition-colors ${
              filterDate
                ? "bg-foreground text-background hover:bg-foreground/90"
                : "border border-primary bg-primary/10 text-primary"
            }`}
          >
            <Filter className="h-3.5 w-3.5" />
            {filterDate ? "Show all" : "Today"}
          </button>
        </div>

        <div className="mt-2 text-xs text-muted-foreground">
          Showing <span className="font-bold text-foreground">{filteredOrders.length}</span> order
          {filteredOrders.length === 1 ? "" : "s"}
          {filterDate ? " on this day" : " in total"}
        </div>

        {filteredOrders.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
            <Receipt className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-3 text-sm text-muted-foreground">
              {myOrders.length === 0
                ? "No orders yet. They'll appear here as customers place orders."
                : "No orders for this day. Try a different date."}
            </p>
          </div>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredOrders.map((o) => (
                <motion.article
                  key={o.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative flex flex-col gap-3 rounded-3xl border border-border bg-card p-5 shadow-card"
                >
                  {/* Status pill — top right */}
                  <span
                    className={`absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${statusPillClasses(
                      o.status,
                    )}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${statusDotClasses(o.status)}`} />
                    {statusLabel(o.status, { cancellationReason: o.cancellationReason })}
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
      </motion.div>
    </motion.main>
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
