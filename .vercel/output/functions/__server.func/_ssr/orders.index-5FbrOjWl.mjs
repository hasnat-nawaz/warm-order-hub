import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useApp, a as useLiveMenu, g as getVendor, f as format12 } from "./router-8hUpC1Lu.mjs";
import { P as Popover, a as PopoverTrigger, b as PopoverContent, C as Calendar } from "./popover-R8dmSBPM.mjs";
import { s as statusDotClasses, a as statusLabel, b as statusPillClasses } from "./orderStatus-DvkqIulZ.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogTitle, c as AlertDialogDescription, d as AlertDialogCancel, e as AlertDialogAction } from "./alert-dialog-C_kIqYfx.mjs";
import { o as ArrowLeft, S as ShoppingBag, f as ChevronLeft, g as CalendarDays, C as ChevronRight, h as Funnel, D as CircleX, G as Pen, T as TriangleAlert } from "../_libs/lucide-react.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/zustand.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/zod.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/radix-ui__react-popover.mjs";
import "../_libs/react-day-picker.mjs";
import "../_libs/date-fns__tz.mjs";
import "../_libs/date-fns.mjs";
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/class-variance-authority.mjs";
const sameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
function OrdersPage() {
  const orders = useApp((s) => s.orders);
  const cancelOrder = useApp((s) => s.cancelOrder);
  const liveMenu = useLiveMenu();
  const [filterDate, setFilterDate] = reactExports.useState(/* @__PURE__ */ new Date());
  const [popoverOpen, setPopoverOpen] = reactExports.useState(false);
  const [cancelTarget, setCancelTarget] = reactExports.useState(null);
  const sorted = reactExports.useMemo(() => [...orders].sort((a, b) => b.placedAt - a.placedAt), [orders]);
  const filtered = reactExports.useMemo(() => {
    if (!filterDate) return sorted;
    return sorted.filter((o) => sameDay(new Date(o.placedAt), filterDate));
  }, [sorted, filterDate]);
  const orderDates = reactExports.useMemo(() => {
    const set = /* @__PURE__ */ new Set();
    for (const o of orders) {
      const d = new Date(o.placedAt);
      set.add(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`);
    }
    return set;
  }, [orders]);
  const stepDay = (delta) => {
    const base = filterDate ?? /* @__PURE__ */ new Date();
    const next = new Date(base);
    next.setDate(base.getDate() + delta);
    setFilterDate(next);
  };
  const filterLabel = filterDate ? sameDay(filterDate, /* @__PURE__ */ new Date()) ? "Today" : filterDate.toLocaleDateString(void 0, {
    weekday: "short",
    month: "short",
    day: "numeric"
  }) : "All time";
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    showSections: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  const blockVariants = {
    hidden: {
      opacity: 0,
      y: 40
    },
    showSections: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", "aria-label": "Back", className: "fixed left-[3px] top-[67px] z-40 inline-flex items-center gap-1.5 rounded-full bg-foreground px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-background shadow-warm ring-1 ring-background/40 backdrop-blur transition-transform hover:-translate-y-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
      " Back"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.main, { variants: containerVariants, initial: "hidden", animate: "showSections", className: "mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: blockVariants, style: {
        willChange: "transform, opacity"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl bg-gradient-warm text-primary-foreground shadow-warm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-6 w-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold leading-tight sm:text-4xl", children: "My orders" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Browse orders by day. Pick a date from the calendar to filter." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: blockVariants, style: {
        willChange: "transform, opacity"
      }, className: "mt-6 flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => stepDay(-1), "aria-label": "Previous day", disabled: !filterDate, className: "grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-foreground disabled:opacity-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { open: popoverOpen, onOpenChange: setPopoverOpen, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-bold transition-colors hover:border-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-4 w-4 text-primary" }),
            filterLabel
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContent, { className: "w-auto rounded-2xl border-border bg-card p-2", align: "start", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { mode: "single", selected: filterDate ?? void 0, onSelect: (d) => {
            setFilterDate(d ?? null);
            setPopoverOpen(false);
          }, modifiers: {
            hasOrders: (date) => orderDates.has(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)
          }, modifiersClassNames: {
            hasOrders: "after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-1 after:rounded-full after:bg-primary"
          } }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => stepDay(1), "aria-label": "Next day", disabled: !filterDate, className: "grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-foreground disabled:opacity-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setFilterDate(filterDate ? null : /* @__PURE__ */ new Date()), className: `ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold transition-colors ${filterDate ? "bg-foreground text-background hover:bg-foreground/90" : "border border-primary bg-primary/10 text-primary"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-3.5 w-3.5" }),
          filterDate ? "Show all" : "Today"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: blockVariants, style: {
        willChange: "transform, opacity"
      }, className: "mt-2 text-xs text-muted-foreground", children: [
        "Showing ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: filtered.length }),
        " order",
        filtered.length === 1 ? "" : "s",
        filterDate ? " on this day" : " in total"
      ] }),
      filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: blockVariants, style: {
        willChange: "transform, opacity"
      }, className: "mt-10 rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground", children: orders.length === 0 ? "No orders yet. Place your first one!" : "No orders for this day. Try a different date." }) : /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: blockVariants, style: {
        willChange: "transform, opacity"
      }, className: "mt-6 space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: filtered.map((o) => {
        const v = getVendor(o.vendorId);
        const placed = new Date(o.placedAt);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { layout: true, initial: {
          opacity: 0,
          scale: 0.95
        }, animate: {
          opacity: 1,
          scale: 1
        }, exit: {
          opacity: 0,
          scale: 0.95
        }, transition: {
          duration: 0.2
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card transition-shadow hover:shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/orders/$orderId", params: {
            orderId: o.id
          }, className: "flex flex-wrap items-center justify-between gap-3 p-4 sm:gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                "Order #",
                o.id,
                " · ",
                v?.name,
                " ·",
                " ",
                placed.toLocaleDateString(void 0, {
                  month: "short",
                  day: "numeric"
                })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 truncate font-semibold", children: o.lines.map((l) => `${l.qty}× ${liveMenu.find((m) => m.id === l.itemId)?.name ?? "Item"}`).join(", ") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-xs text-muted-foreground", children: [
                "Pickup ",
                format12(o.pickupTime),
                " · Rs. ",
                o.total
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${statusPillClasses(o.status)}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-1.5 w-1.5 rounded-full ${statusDotClasses(o.status)}` }),
              statusLabel(o.status, {
                cancellationReason: o.cancellationReason
              })
            ] })
          ] }),
          o.status === "Pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border px-4 py-3 flex flex-wrap items-center justify-end gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: (e) => {
              e.preventDefault();
              e.stopPropagation();
              setCancelTarget(o.id);
            }, className: "inline-flex items-center gap-2 rounded-full border border-destructive/40 bg-destructive/10 px-3 py-1.5 text-xs font-bold text-destructive transition-colors hover:bg-destructive/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3.5 w-3.5" }),
              " Cancel order"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/orders/edit/$orderId", params: {
              orderId: o.id
            }, className: "inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-primary/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-3.5 w-3.5" }),
              " Edit order"
            ] })
          ] })
        ] }) }, o.id);
      }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: !!cancelTarget, onOpenChange: (open) => {
      if (!open) setCancelTarget(null);
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { className: "max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogTitle, { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5 text-destructive" }),
        "Cancel order?"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "Are you sure you want to cancel this order? This action cannot be undone." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-end pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { className: "rounded-full mt-0", children: "Keep order" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: () => {
          if (cancelTarget) {
            cancelOrder(cancelTarget, "user");
            toast.success("Order cancelled successfully.");
            setCancelTarget(null);
          }
        }, className: "rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90", children: "Cancel order" })
      ] })
    ] }) })
  ] });
}
export {
  OrdersPage as component
};
