import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { l as Route, u as useApp, a as useLiveMenu, g as getVendor } from "./router-8hUpC1Lu.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogTitle, c as AlertDialogDescription, d as AlertDialogCancel, e as AlertDialogAction } from "./alert-dialog-C_kIqYfx.mjs";
import { o as ArrowLeft, v as Minus, r as Plus, t as Trash2, T as TriangleAlert } from "../_libs/lucide-react.mjs";
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
function EditOrderPage() {
  const {
    orderId
  } = Route.useParams();
  const order = useApp((s) => s.orders.find((o) => o.id === orderId));
  const updateOrderLines = useApp((s) => s.updateOrderLines);
  const cancelOrder = useApp((s) => s.cancelOrder);
  const liveMenu = useLiveMenu();
  const navigate = useNavigate();
  const [editedLines, setEditedLines] = reactExports.useState(order?.lines ?? []);
  const [showCancelDialog, setShowCancelDialog] = reactExports.useState(false);
  const newTotal = reactExports.useMemo(() => {
    return editedLines.reduce((s, l) => {
      const it = liveMenu.find((m) => m.id === l.itemId);
      return s + (it?.price ?? 0) * l.qty;
    }, 0);
  }, [editedLines, liveMenu]);
  if (!order) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-2xl px-4 py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Order not found." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/orders", className: "mt-4 inline-block text-primary underline", children: "Back to orders" })
    ] });
  }
  if (order.status !== "Pending") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-2xl px-4 py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "This order cannot be edited because it has already been accepted by the vendor." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/orders/$orderId", params: {
        orderId
      }, className: "mt-4 inline-block text-primary underline", children: "Back to order" })
    ] });
  }
  const vendor = getVendor(order.vendorId);
  const hasChanges = JSON.stringify(editedLines) !== JSON.stringify(order.lines);
  const handleQtyChange = (itemId, delta) => {
    setEditedLines((prev) => prev.map((l) => l.itemId === itemId ? {
      ...l,
      qty: Math.max(0, l.qty + delta)
    } : l).filter((l) => l.qty > 0));
  };
  const handleRemove = (itemId) => {
    setEditedLines((prev) => prev.filter((l) => l.itemId !== itemId));
  };
  const handleSave = () => {
    if (editedLines.length === 0) {
      toast.error("Order must have at least one item.");
      return;
    }
    updateOrderLines(orderId, editedLines);
    toast.success("Order updated successfully!");
    navigate({
      to: "/orders/$orderId",
      params: {
        orderId
      }
    });
  };
  const handleConfirmCancel = () => {
    cancelOrder(orderId, "user");
    toast.success("Order cancelled successfully.");
    navigate({
      to: "/orders"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/orders/$orderId", params: {
      orderId
    }, "aria-label": "Back", className: "fixed left-[3px] top-[67px] z-40 inline-flex items-center gap-1.5 rounded-full bg-foreground px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-background shadow-warm ring-1 ring-background/40 backdrop-blur transition-transform hover:-translate-y-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
      " Back"
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-3xl font-bold sm:text-4xl", children: "Edit order" }),
      vendor && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
        "Order #",
        order.id,
        " from",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: vendor.name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-2xl border border-border bg-card p-4 sm:p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold", children: "Items" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-3", children: editedLines.map((l) => {
          const it = liveMenu.find((m) => m.id === l.itemId);
          if (!it) return null;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between gap-3 rounded-xl border border-border bg-secondary/30 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: it.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
                "Rs. ",
                it.price,
                " each"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleQtyChange(l.itemId, -1), className: "grid h-8 w-8 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground", "aria-label": "Decrease quantity", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 text-center font-semibold", children: l.qty }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleQtyChange(l.itemId, 1), className: "grid h-8 w-8 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground", "aria-label": "Increase quantity", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleRemove(l.itemId), className: "grid h-8 w-8 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive", "aria-label": "Remove item", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
          ] }, l.itemId);
        }) }),
        editedLines.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-center text-sm text-muted-foreground", children: "No items in order" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between border-t border-border pt-4 font-display text-lg font-bold sm:text-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "New total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Rs. ",
            newTotal
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleSave, disabled: !hasChanges || editedLines.length === 0, className: "w-full rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed", children: "Save changes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShowCancelDialog(true), className: "w-full rounded-full border border-destructive/40 bg-destructive/10 py-3 text-sm font-bold text-destructive transition-colors hover:bg-destructive/20", children: "Cancel order" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/orders/$orderId", params: {
          orderId
        }, className: "block w-full rounded-full border border-border bg-card py-3 text-center text-sm font-bold text-foreground transition-colors hover:bg-secondary", children: "Discard changes" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: showCancelDialog, onOpenChange: setShowCancelDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { className: "max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogTitle, { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5 text-destructive" }),
          "Cancel order?"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "Are you sure you want to cancel this order? This action cannot be undone." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-end pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { className: "rounded-full mt-0", children: "Keep order" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: handleConfirmCancel, className: "rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90", children: "Cancel order" })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  EditOrderPage as component
};
