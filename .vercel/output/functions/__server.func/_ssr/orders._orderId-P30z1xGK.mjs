import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { j as Route$1, u as useApp, a as useLiveMenu, g as getVendor, f as format12, k as formatDate12 } from "./router-8hUpC1Lu.mjs";
import { u as useNow } from "./use-now-DqBMmVtn.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { S as STAGE_FLOW, s as statusDotClasses, a as statusLabel, b as statusPillClasses } from "./orderStatus-DvkqIulZ.mjs";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogTitle, c as AlertDialogDescription, d as AlertDialogCancel, e as AlertDialogAction } from "./alert-dialog-C_kIqYfx.mjs";
import { o as ArrowLeft, D as CircleX, G as Pen, q as Clock, J as Radio, c as ChefHat, K as Package, a as Check, z as MessageSquare, T as TriangleAlert } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
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
function OrderDetail() {
  const {
    orderId
  } = Route$1.useParams();
  const order = useApp((s) => s.orders.find((o) => o.id === orderId));
  const update = useApp((s) => s.updateOrderStatus);
  const cancelOrder = useApp((s) => s.cancelOrder);
  const liveMenu = useLiveMenu();
  const navigate = useNavigate();
  const [showCancelDialog, setShowCancelDialog] = reactExports.useState(false);
  useNow(5e3);
  if (!order) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-2xl px-4 py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Order not found." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/orders", className: "mt-4 inline-block text-primary underline", children: "Back to orders" })
    ] });
  }
  const vendor = getVendor(order.vendorId);
  const isCancelled = order.status === "Cancelled";
  const stageIdx = STAGE_FLOW.indexOf(order.status);
  const stageIcon = [Clock, ChefHat, Package, Check];
  const minutesAgo = Math.max(0, Math.floor((Date.now() - order.placedAt) / 6e4));
  const placedLabel = minutesAgo === 0 ? "Just now" : `${minutesAgo} min ago`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/orders", "aria-label": "Back to orders", className: "fixed left-[3px] top-[67px] z-40 inline-flex items-center gap-1.5 rounded-full bg-foreground px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-background shadow-warm ring-1 ring-background/40 backdrop-blur transition-transform hover:-translate-y-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
      " All orders"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.main, { initial: {
      opacity: 0,
      scale: 0.96
    }, animate: {
      opacity: 1,
      scale: 1
    }, transition: {
      duration: 0.3,
      ease: "easeOut"
    }, className: "mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-4 rounded-3xl p-[1.5px] shadow-warm ${isCancelled ? "bg-destructive/40" : "bg-gradient-warm"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[calc(1.5rem-1px)] bg-card p-5 sm:p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: [
              "Order #",
              order.id
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold sm:text-3xl", children: vendor?.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row flex-wrap items-center justify-end gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${statusPillClasses(order.status)}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-1.5 w-1.5 rounded-full ${statusDotClasses(order.status)}` }),
              statusLabel(order.status, {
                cancellationReason: order.cancellationReason
              })
            ] }),
            order.status === "Pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowCancelDialog(true), className: "inline-flex items-center gap-1.5 rounded-full border border-destructive/40 bg-destructive/10 px-2.5 py-1 text-[10px] font-bold text-destructive transition-colors hover:bg-destructive/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3 w-3" }),
                " Cancel"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/orders/edit/$orderId", params: {
                orderId: order.id
              }, className: "inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary transition-colors hover:bg-primary/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-3 w-3" }),
                " Edit"
              ] })
            ] })
          ] })
        ] }),
        !isCancelled && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-3 rounded-2xl bg-primary/5 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-6 w-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground", children: "Pickup time" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl font-black leading-tight text-primary sm:text-2xl md:text-3xl", children: format12(order.pickupTime) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-xs text-muted-foreground", children: [
          order.payment,
          " · Placed ",
          placedLabel,
          !isCancelled && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: " · " }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "h-3 w-3 animate-pulse" }),
              " Live"
            ] })
          ] })
        ] }),
        isCancelled ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/10 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold text-destructive", children: order.cancellationReason === "user" ? "You cancelled this order" : "Your order was not accepted" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
              order.cancellationReason === "user" ? "This order was cancelled as per your request. No payment was charged." : `${vendor?.name ?? "The vendor"} couldn't take this order. No payment was charged.`,
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              order.cancellationReason !== "user" && "Try a different time or vendor — your favourites are still ready to reorder."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "mt-3 inline-flex items-center gap-1 rounded-full bg-foreground px-3 py-1.5 text-xs font-bold text-background hover:bg-foreground/90", children: "Browse vendors" })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "mt-7 grid grid-cols-4 gap-1.5 sm:gap-2", children: STAGE_FLOW.map((s, i) => {
            const Icon = stageIcon[i];
            const done = i <= stageIdx;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex flex-col items-center text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid h-10 w-10 place-items-center rounded-full transition-colors sm:h-11 sm:w-11 ${done ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-2 text-[10px] font-bold uppercase tracking-wider sm:text-[11px] ${done ? "text-foreground" : "text-muted-foreground"}`, children: s })
            ] }, s);
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 h-1 overflow-hidden rounded-full bg-muted", role: "progressbar", "aria-valuenow": stageIdx + 1, "aria-valuemin": 0, "aria-valuemax": STAGE_FLOW.length, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-gradient-warm transition-all duration-700", style: {
            width: `${(stageIdx + 1) / STAGE_FLOW.length * 100}%`
          } }) }),
          order.status === "Pending" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 rounded-xl bg-secondary/60 p-4 text-center text-sm font-semibold text-secondary-foreground", children: "Waiting for the dhaba to accept your order…" }),
          order.status === "Preparing" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-xl border border-warning/30 bg-warning/20 p-4 text-center text-sm font-semibold text-warning-foreground", children: [
            "Your food is being prepared. Estimated pickup ",
            format12(order.pickupTime),
            "."
          ] }),
          order.status === "Ready" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-xl border border-success/30 bg-success/15 p-4 text-center text-sm font-semibold text-success-foreground", children: [
            "Your order is ready — show order #",
            order.id,
            " at the counter."
          ] })
        ] })
      ] }) }),
      order.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-4 rounded-2xl border border-border bg-card p-4 sm:p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm font-bold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4 text-primary" }),
          " Your note"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: order.notes })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-4 rounded-2xl border border-border bg-card p-4 sm:p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold", children: "Items" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 divide-y divide-border", children: order.lines.map((l) => {
          const it = liveMenu.find((m) => m.id === l.itemId);
          if (!it) return null;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
                l.qty,
                "×"
              ] }),
              " ",
              it.name
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
              "Rs. ",
              it.price * l.qty
            ] })
          ] }, l.itemId);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between border-t border-border pt-3 font-display text-lg font-bold sm:text-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Rs. ",
            order.total
          ] })
        ] })
      ] }),
      !isCancelled && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-center text-[11px] text-muted-foreground", children: [
        "Last updated ",
        formatDate12(/* @__PURE__ */ new Date())
      ] }),
      order.status === "Ready" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => update(order.id, "Picked up"), className: "mt-6 w-full rounded-full bg-foreground py-3 text-sm font-bold text-background hover:bg-foreground/90", children: "Mark as picked up" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: showCancelDialog, onOpenChange: setShowCancelDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { className: "max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogTitle, { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5 text-destructive" }),
        "Cancel order?"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "Are you sure you want to cancel this order? This action cannot be undone." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-end pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { className: "rounded-full mt-0", children: "Keep order" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: () => {
          cancelOrder(orderId, "user");
          toast.success("Order cancelled successfully.");
          navigate({
            to: "/orders"
          });
        }, className: "rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90", children: "Cancel order" })
      ] })
    ] }) })
  ] });
}
export {
  OrderDetail as component
};
