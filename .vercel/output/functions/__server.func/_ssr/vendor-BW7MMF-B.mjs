import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useApp, a as useLiveMenu, g as getVendor, f as format12 } from "./router-8hUpC1Lu.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { s as statusDotClasses, a as statusLabel, b as statusPillClasses } from "./orderStatus-DvkqIulZ.mjs";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogTitle, c as AlertDialogDescription, d as AlertDialogCancel, e as AlertDialogAction } from "./alert-dialog-C_kIqYfx.mjs";
import { P as Popover, a as PopoverTrigger, b as PopoverContent, C as Calendar } from "./popover-R8dmSBPM.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
import { c as ChefHat, P as Power, T as TriangleAlert, d as ClipboardList, e as PackageCheck, W as Wallet, f as ChevronLeft, g as CalendarDays, C as ChevronRight, h as Funnel, R as Receipt, i as StickyNote, X, j as CircleCheck } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-popover.mjs";
import "../_libs/react-day-picker.mjs";
import "../_libs/date-fns__tz.mjs";
import "../_libs/date-fns.mjs";
const NEXT = {
  Pending: "Preparing",
  Preparing: "Ready",
  Ready: "Picked up"
};
const sameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const STATUS_RANK = {
  Pending: 0,
  Preparing: 1,
  Ready: 2,
  "Picked up": 3,
  Cancelled: 4
};
function VendorDashboard() {
  const role = useApp((s) => s.role);
  const vendorLogin = useApp((s) => s.vendorLogin);
  const orders = useApp((s) => s.orders);
  const updateOrderStatus = useApp((s) => s.updateOrderStatus);
  const vendorAccepting = useApp((s) => s.vendorAccepting);
  const toggleVendorAccepting = useApp((s) => s.toggleVendorAccepting);
  const liveMenu = useLiveMenu();
  const myOrders = reactExports.useMemo(() => vendorLogin ? orders.filter((o) => o.vendorId === vendorLogin) : [], [orders, vendorLogin]);
  const [confirmToggle, setConfirmToggle] = reactExports.useState(false);
  const [filterDate, setFilterDate] = reactExports.useState(/* @__PURE__ */ new Date());
  const [popoverOpen, setPopoverOpen] = reactExports.useState(false);
  const sorted = reactExports.useMemo(() => {
    return [...myOrders].sort((a, b) => {
      const r = STATUS_RANK[a.status] - STATUS_RANK[b.status];
      return r !== 0 ? r : b.placedAt - a.placedAt;
    });
  }, [myOrders]);
  const orderDates = reactExports.useMemo(() => {
    const set = /* @__PURE__ */ new Set();
    for (const o of myOrders) {
      const d = new Date(o.placedAt);
      set.add(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`);
    }
    return set;
  }, [myOrders]);
  const filteredOrders = reactExports.useMemo(() => {
    if (!filterDate) return sorted;
    return sorted.filter((o) => sameDay(new Date(o.placedAt), filterDate));
  }, [sorted, filterDate]);
  if (role !== "vendor" || !vendorLogin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-md px-4 py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "You need to sign in as a vendor to view this page." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "mt-6 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground", children: "Go to sign in" })
    ] });
  }
  const vendor = getVendor(vendorLogin);
  const accepting = vendorAccepting[vendor.id] ?? vendor.accepting;
  const todayKey = (/* @__PURE__ */ new Date()).toDateString();
  const todays = myOrders.filter((o) => new Date(o.placedAt).toDateString() === todayKey);
  const stats = {
    pending: myOrders.filter((o) => o.status === "Pending").length,
    preparing: myOrders.filter((o) => o.status === "Preparing").length,
    ready: myOrders.filter((o) => o.status === "Ready").length,
    revenue: todays.filter((o) => o.status !== "Cancelled").reduce((s, o) => s + o.total, 0)
  };
  const advance = (orderId, current) => {
    const next = NEXT[current];
    if (!next) return;
    updateOrderStatus(orderId, next);
    toast.success(`Marked ${next}`);
  };
  const cancel = (orderId) => {
    const cancelOrder = useApp.getState().cancelOrder;
    cancelOrder(orderId, "vendor");
    toast.error("Order cancelled");
  };
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.main, { variants: containerVariants, initial: "hidden", animate: "showSections", className: "mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: blockVariants, style: {
      willChange: "transform, opacity"
    }, className: "flex flex-wrap items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "flex flex-wrap items-center gap-3 font-display text-2xl font-bold text-primary sm:text-3xl md:text-4xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-primary text-primary-foreground sm:h-12 sm:w-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { className: "h-5 w-5 sm:h-6 sm:w-6" }) }),
          vendor.name
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Accept, prepare, and track every incoming order." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setConfirmToggle(true), "aria-pressed": accepting, className: `inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold uppercase tracking-wide transition-all hover:-translate-y-0.5 active:translate-y-0 ${accepting ? "bg-primary text-primary-foreground shadow-warm hover:bg-primary/90" : "border border-primary bg-secondary/30 text-muted-foreground hover:bg-secondary/50"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Power, { className: `h-4 w-4 ${accepting ? "" : "text-primary"}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: accepting ? "Open" : "Closed" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: confirmToggle, onOpenChange: setConfirmToggle, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { className: "max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogTitle, { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: `h-5 w-5 ${accepting ? "text-destructive" : "text-primary"}` }),
        accepting ? "Close the dhaba?" : "Reopen the dhaba?"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: accepting ? "Customers won't be able to place new orders until you reopen. Existing orders won't be affected." : "You'll start receiving new orders again right away. Make sure your kitchen is ready." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-end pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { className: "rounded-full", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: () => {
          toggleVendorAccepting(vendor.id);
          toast(accepting ? "Closed for new orders" : "Now accepting orders");
          setConfirmToggle(false);
        }, className: `rounded-full ${accepting ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : "bg-primary text-primary-foreground hover:bg-primary/90"}`, children: accepting ? "Yes, close" : "Yes, reopen" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: blockVariants, style: {
      willChange: "transform, opacity"
    }, className: "mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-4 w-4" }), label: "To accept", value: stats.pending, tone: "muted" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { className: "h-4 w-4" }), label: "Preparing", value: stats.preparing, tone: "warning" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PackageCheck, { className: "h-4 w-4" }), label: "Ready", value: stats.ready, tone: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-4 w-4" }), label: "Today", value: `Rs. ${stats.revenue}`, tone: "primary" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: blockVariants, style: {
      willChange: "transform, opacity"
    }, className: "mt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold", children: "Orders" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Filter by day to quickly review what happened on a specific date." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap items-center gap-2", children: [
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-xs text-muted-foreground", children: [
        "Showing ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: filteredOrders.length }),
        " order",
        filteredOrders.length === 1 ? "" : "s",
        filterDate ? " on this day" : " in total"
      ] }),
      filteredOrders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-2xl border border-dashed border-border bg-card p-10 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "mx-auto h-8 w-8 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: myOrders.length === 0 ? "No orders yet. They'll appear here as customers place orders." : "No orders for this day. Try a different date." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: filteredOrders.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.article, { layout: true, initial: {
        opacity: 0,
        scale: 0.95
      }, animate: {
        opacity: 1,
        scale: 1
      }, exit: {
        opacity: 0,
        scale: 0.95
      }, transition: {
        duration: 0.3,
        ease: "easeOut"
      }, className: "relative flex flex-col gap-3 rounded-3xl border border-border bg-card p-5 shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${statusPillClasses(o.status)}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-1.5 w-1.5 rounded-full ${statusDotClasses(o.status)}` }),
          statusLabel(o.status, {
            cancellationReason: o.cancellationReason
          })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pr-24", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground", children: "Order" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-2xl font-black leading-none sm:text-3xl", children: [
            "#",
            o.id
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 truncate text-sm font-semibold", children: o.customer })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-secondary px-2.5 py-1 font-bold text-secondary-foreground", children: [
            "Pickup · ",
            format12(o.pickupTime)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-3 w-3" }),
            " ",
            o.payment
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1 text-sm", children: o.lines.map((l) => {
          const item = liveMenu.find((m) => m.id === l.itemId);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-baseline justify-between gap-3 border-b border-dashed border-border/70 pb-1 last:border-0 last:pb-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-primary", children: [
                l.qty,
                "×"
              ] }),
              " ",
              item?.name ?? l.itemId
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-muted-foreground", children: [
              "Rs. ",
              (item?.price ?? 0) * l.qty
            ] })
          ] }, l.itemId);
        }) }),
        o.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-warning/40 bg-warning/15 p-2.5 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 font-bold uppercase tracking-wider text-warning-foreground/80", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StickyNote, { className: "h-3 w-3" }),
            " Note"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-foreground", children: o.notes })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center justify-between border-t border-border pt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-xl font-black", children: [
            "Rs. ",
            o.total
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex gap-2", children: [
          o.status === "Pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => cancel(o.id), className: "inline-flex items-center justify-center gap-1 rounded-full border border-destructive/40 bg-destructive/5 px-3 py-2 text-xs font-bold text-destructive hover:bg-destructive/10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }),
              " Decline"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => advance(o.id, o.status), className: "inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-warm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
              " Accept order"
            ] })
          ] }),
          (o.status === "Preparing" || o.status === "Ready") && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => advance(o.id, o.status), className: "inline-flex flex-1 items-center justify-center rounded-full bg-foreground px-4 py-2.5 text-xs font-bold text-background hover:bg-foreground/90", children: [
            "Mark ",
            NEXT[o.status],
            " →"
          ] }),
          (o.status === "Picked up" || o.status === "Cancelled") && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 rounded-full border border-border bg-muted/40 px-4 py-2.5 text-center text-xs font-bold text-muted-foreground", children: "Closed" })
        ] })
      ] }, o.id)) }) })
    ] })
  ] });
}
function StatCard({
  icon,
  label,
  value,
  tone
}) {
  const toneClasses = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/15 text-success-foreground",
    warning: "bg-warning/30 text-warning-foreground",
    muted: "bg-muted text-muted-foreground"
  }[tone];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-4 shadow-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `grid h-8 w-8 place-items-center rounded-full ${toneClasses}`, children: icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground", children: label })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 font-display text-2xl font-black leading-none sm:text-3xl", children: value })
  ] });
}
export {
  VendorDashboard as component
};
