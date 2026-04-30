import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useApp, format12, useLiveMenu } from "@/store/useApp";
import { getVendor } from "@/data/menu";
import { ArrowLeft, CalendarDays, ChevronLeft, ChevronRight, Filter, Edit2, ShoppingBag } from "lucide-react";
import { useMemo, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { motion, AnimatePresence } from "framer-motion";
import { statusDotClasses, statusLabel, statusPillClasses } from "@/lib/orderStatus";

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

const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

function OrdersPage() {
  const orders = useApp((s) => s.orders);
  const liveMenu = useLiveMenu();
  const [filterDate, setFilterDate] = useState<Date | null>(new Date());
  const [popoverOpen, setPopoverOpen] = useState(false);

  // Sort newest first
  const sorted = useMemo(() => [...orders].sort((a, b) => b.placedAt - a.placedAt), [orders]);

  const filtered = useMemo(() => {
    if (!filterDate) return sorted;
    return sorted.filter((o) => sameDay(new Date(o.placedAt), filterDate));
  }, [sorted, filterDate]);

  // Build a set of dates that have orders, for showing dots in the calendar.
  const orderDates = useMemo(() => {
    const set = new Set<string>();
    for (const o of orders) {
      const d = new Date(o.placedAt);
      set.add(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`);
    }
    return set;
  }, [orders]);

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
    <>
      <Link
        to="/"
        aria-label="Back"
        className="fixed left-4 top-20 z-40 inline-flex items-center gap-1.5 rounded-full bg-foreground px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-background shadow-warm ring-1 ring-background/40 backdrop-blur transition-transform hover:-translate-y-0.5 sm:left-6 sm:top-24"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back
      </Link>
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="showSections"
        className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10"
      >
        <motion.div variants={blockVariants} style={{ willChange: "transform, opacity" }}>
        <div className="mt-3 flex items-center gap-3">
          <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl bg-gradient-warm text-primary-foreground shadow-warm">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
            My orders
          </h1>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Browse orders by day. Pick a date from the calendar to filter.
        </p>

        </motion.div>

        {/* Filter row */}
        <motion.div variants={blockVariants} style={{ willChange: "transform, opacity" }} className="mt-6 flex flex-wrap items-center gap-2">
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
        </motion.div>

        <motion.div variants={blockVariants} style={{ willChange: "transform, opacity" }} className="mt-2 text-xs text-muted-foreground">
          Showing <span className="font-bold text-foreground">{filtered.length}</span> order
          {filtered.length === 1 ? "" : "s"}
          {filterDate ? " on this day" : " in total"}
        </motion.div>

        {filtered.length === 0 ? (
          <motion.div variants={blockVariants} style={{ willChange: "transform, opacity" }} className="mt-10 rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            {orders.length === 0
              ? "No orders yet. Place your first one!"
              : "No orders for this day. Try a different date."}
          </motion.div>
        ) : (
          <motion.div variants={blockVariants} style={{ willChange: "transform, opacity" }} className="mt-6 space-y-3">
            <AnimatePresence initial={false}>
              {filtered.map((o) => {
                const v = getVendor(o.vendorId);
                const placed = new Date(o.placedAt);
                return (
                  <motion.div
                    key={o.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="rounded-2xl border border-border bg-card transition-shadow hover:shadow-card">
                      <Link
                        to="/orders/$orderId"
                        params={{ orderId: o.id }}
                        className="flex flex-wrap items-center justify-between gap-3 p-4 sm:gap-4"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="text-xs text-muted-foreground">
                            Order #{o.id} · {v?.name} ·{" "}
                            {placed.toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                          <div className="mt-0.5 truncate font-semibold">
                            {o.lines
                              .map(
                                (l) =>
                                  `${l.qty}× ${liveMenu.find((m) => m.id === l.itemId)?.name ?? "Item"}`,
                              )
                              .join(", ")}
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            Pickup {format12(o.pickupTime)} · Rs. {o.total}
                          </div>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${statusPillClasses(
                            o.status,
                          )}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${statusDotClasses(o.status)}`}
                          />
                          {statusLabel(o.status, { cancellationReason: o.cancellationReason })}
                        </span>
                      </Link>
                      {o.status === "Pending" && (
                        <div className="border-t border-border px-4 py-3 flex items-center justify-end">
                          <Link
                            to="/orders/edit/$orderId"
                            params={{ orderId: o.id }}
                            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-primary/20"
                          >
                            <Edit2 className="h-3.5 w-3.5" /> Edit order
                          </Link>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </motion.main>
    </>
  );
}
