import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useApp, a as useLiveMenu, g as getVendor, f as format12 } from "./router-8hUpC1Lu.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { o as ArrowLeft, Z as Zap, p as Repeat, q as Clock, H as Heart } from "../_libs/lucide-react.mjs";
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
function QuickOrderPage() {
  const favorites = useApp((s) => s.favorites);
  const orders = useApp((s) => s.orders);
  const role = useApp((s) => s.role);
  const vendorAccepting = useApp((s) => s.vendorAccepting);
  const addToCart = useApp((s) => s.addToCart);
  const clearCart = useApp((s) => s.clearCart);
  const toggleFavorite = useApp((s) => s.toggleFavorite);
  const liveMenu = useLiveMenu();
  const navigate = useNavigate();
  const lastOrder = orders[0];
  const lastVendor = lastOrder ? getVendor(lastOrder.vendorId) : null;
  const requireLogin = () => {
    if (!role) {
      toast.message("Please sign in to place an order.");
      navigate({
        to: "/login",
        search: {
          redirect: "/quick-order"
        }
      });
      return false;
    }
    return true;
  };
  const sendToCheckout = (lines) => {
    if (!requireLogin()) return;
    if (!lines.length) return;
    const first = liveMenu.find((m) => m.id === lines[0].itemId);
    if (!first) {
      toast.error("Item is no longer available.");
      return;
    }
    if ((vendorAccepting[first.vendorId] ?? true) === false) {
      toast.error(`${getVendor(first.vendorId)?.name ?? "This dhaba"} is closed right now.`);
      return;
    }
    clearCart();
    let failed = false;
    for (const line of lines) {
      const item = liveMenu.find((m) => m.id === line.itemId);
      if (!item) continue;
      const res = addToCart(item, line.qty);
      if (!res.ok) {
        failed = true;
        toast.error(res.reason ?? "Could not add item.");
        break;
      }
    }
    if (failed) return;
    navigate({
      to: "/cart"
    });
  };
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
      }, className: "mt-3 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-12 w-12 place-items-center rounded-2xl bg-gradient-warm text-primary-foreground shadow-warm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold leading-tight sm:text-4xl", children: "Quick Order" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "One tap to checkout — pick your time and pay your way." })
        ] })
      ] }),
      lastOrder && lastVendor && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.section, { variants: blockVariants, style: {
        willChange: "transform, opacity"
      }, className: "group mt-8 overflow-hidden rounded-3xl bg-gradient-warm p-[1.5px] shadow-warm transition-all hover:-translate-y-0.5 hover:shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[calc(1.5rem-1px)] bg-card p-5 sm:p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Repeat, { className: "h-3.5 w-3.5" }),
          " Repeat last order"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap items-end justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl font-bold", children: lastVendor.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: lastOrder.lines.map((l) => `${l.qty}× ${liveMenu.find((m) => m.id === l.itemId)?.name ?? "Item"}`).join(", ") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
              " Total Rs. ",
              lastOrder.total,
              " · Last pickup",
              " ",
              format12(lastOrder.pickupTime)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => sendToCheckout(lastOrder.lines), className: "rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90", children: [
            "Reorder ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block transition-transform group-hover:translate-x-1", children: "→" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.section, { variants: blockVariants, style: {
        willChange: "transform, opacity"
      }, className: "mt-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-end justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold", children: "Saved favourites" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Tap to checkout" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3", children: [
          favorites.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground", children: "No favourites yet. Tap the heart on any dish below." }),
          favorites.map((id) => {
            const item = liveMenu.find((m) => m.id === id);
            if (!item) return null;
            const vendor = getVendor(item.vendorId);
            const open = vendorAccepting[item.vendorId] ?? true;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { layout: true, className: `flex flex-col gap-3 rounded-3xl border border-border bg-card p-4 shadow-card transition-all sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:p-5 ${open ? "group hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md" : ""}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 sm:gap-4 sm:flex-1 sm:min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.image, alt: item.name, className: "h-16 w-16 flex-shrink-0 rounded-2xl object-cover sm:h-20 sm:w-20 md:h-24 md:w-24", loading: "lazy", width: 96, height: 96 }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-base font-bold leading-tight sm:text-lg md:text-xl", children: item.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-0.5 text-sm text-muted-foreground", children: [
                    vendor?.name,
                    " · Rs. ",
                    item.price,
                    !open && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 font-semibold text-destructive", children: "Closed" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 sm:ml-auto", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toggleFavorite(id), "aria-label": "Remove favourite", className: "grid h-11 w-11 place-items-center rounded-full text-primary transition-colors hover:bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-5 w-5 fill-current" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => sendToCheckout([{
                  itemId: id,
                  qty: 1
                }]), disabled: !open, className: "rounded-full border border-primary/30 bg-primary/5 px-4 py-2.5 text-xs font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground disabled:cursor-not-allowed disabled:border-muted disabled:bg-muted/10 disabled:text-muted-foreground", children: open ? "Order now" : "Closed" })
              ] })
            ] }, id);
          })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.section, { variants: blockVariants, style: {
        willChange: "transform, opacity"
      }, className: "mt-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 font-display text-2xl font-bold", children: "Popular" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: liveMenu.filter((m) => !favorites.includes(m.id)).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
          toggleFavorite(item.id);
          toast.success(`${item.name} saved`);
        }, className: "flex items-center gap-3 rounded-2xl border border-border bg-card p-3 text-left transition-colors hover:border-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.image, alt: item.name, className: "h-12 w-12 rounded-lg object-cover", loading: "lazy", width: 48, height: 48 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-sm font-semibold", children: item.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              "Rs. ",
              item.price
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-4 w-4 text-muted-foreground" })
        ] }, item.id)) })
      ] })
    ] })
  ] });
}
export {
  QuickOrderPage as component
};
