import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useApp, format12, useLiveMenu } from "@/store/useApp";
import { getVendor } from "@/data/menu";
import { ArrowLeft, CalendarDays, ChevronLeft, ChevronRight, Filter, Edit2 } from "lucide-react";
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

  return (
    <motion.main
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10"
    >
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>
      <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">My orders</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Browse orders by day. Pick a date from the calendar to filter.
      </p>

      {/* Filter row */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
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
        Showing <span className="font-bold text-foreground">{filtered.length}</span> order
        {filtered.length === 1 ? "" : "s"}
        {filterDate ? " on this day" : " in total"}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          {orders.length === 0
            ? "No orders yet. Place your first one!"
            : "No orders for this day. Try a different date."}
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          <AnimatePresence initial={false}>
            {filtered.map((o) => {
              const v = getVendor(o.vendorId);
              const placed = new Date(o.placedAt);
              return (
                <motion.div
                  key={o.id}
                  layout
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
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
                          {placed.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
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
                        <span className={`h-1.5 w-1.5 rounded-full ${statusDotClasses(o.status)}`} />
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
        </div>
      )}
    </motion.main>
  );
}
