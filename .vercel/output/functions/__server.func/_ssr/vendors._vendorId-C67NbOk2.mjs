import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { i as Route$2, g as getVendor, a as useLiveMenu, u as useApp, C as CATEGORIES, b as CATEGORY_IMAGES } from "./router-8hUpC1Lu.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { o as ArrowLeft, B as MapPin, q as Clock, v as Minus, r as Plus, a as Check } from "../_libs/lucide-react.mjs";
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
function VendorPage() {
  const {
    vendorId
  } = Route$2.useParams();
  const vendor = getVendor(vendorId);
  const liveMenu = useLiveMenu();
  const items = reactExports.useMemo(() => liveMenu.filter((m) => m.vendorId === vendorId), [liveMenu, vendorId]);
  const addToCart = useApp((s) => s.addToCart);
  const clearCart = useApp((s) => s.clearCart);
  const cartVendorId = useApp((s) => s.cartVendorId);
  const vendorAccepting = useApp((s) => s.vendorAccepting);
  useNavigate();
  const [qtys, setQtys] = reactExports.useState({});
  const [addingItem, setAddingItem] = reactExports.useState(null);
  if (!vendor) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-10", children: "Vendor not found." });
  const accepting = vendorAccepting[vendor.id] ?? vendor.accepting;
  const setQty = (id, q) => setQtys((p) => ({
    ...p,
    [id]: Math.max(1, q)
  }));
  const handleAdd = (itemId) => {
    if (!accepting) {
      toast.error(`${vendor.name} is currently closed.`);
      return;
    }
    const item = items.find((i) => i.id === itemId);
    if (!item) return;
    const qty = qtys[itemId] ?? 1;
    const res = addToCart(item, qty);
    if (!res.ok) {
      toast.error(res.reason ?? "Could not add", {
        action: {
          label: "Clear cart",
          onClick: () => {
            clearCart();
            addToCart(item, qty);
            toast.success(`Added ${item.name}`);
          }
        }
      });
      return;
    }
    toast.success(`Added ${qty}× ${item.name}`);
    setAddingItem(itemId);
    setTimeout(() => setAddingItem(null), 1e3);
  };
  const presentCategories = CATEGORIES.filter((c) => items.some((i) => i.category === c));
  const sectionId = (c) => `cat-${c.toLowerCase()}`;
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    showSections: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25
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
        duration: 1,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", "aria-label": "Back", className: "hidden md:inline-flex fixed left-[3px] top-[67px] z-40 items-center gap-1.5 rounded-full bg-foreground px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-background shadow-warm ring-1 ring-background/40 backdrop-blur transition-transform hover:-translate-y-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
      " Back"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.main, { variants: containerVariants, initial: "hidden", animate: "showSections", className: "mx-auto max-w-5xl px-4 pb-24 sm:px-6", style: {
      contain: "layout"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: blockVariants, style: {
        willChange: "transform, opacity"
      }, className: "relative mt-6 overflow-hidden rounded-3xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: vendor.image, alt: vendor.name, className: "aspect-[16/8] w-full object-cover sm:aspect-[16/6]", width: 1024, height: 384 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-4 top-4", children: accepting ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-warm", children: "● Open" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground backdrop-blur", children: "Closed" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-4 left-4 right-4 text-cream sm:bottom-5 sm:left-5 sm:right-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-black sm:text-3xl md:text-4xl lg:text-5xl", children: vendor.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm opacity-90", children: vendor.tagline }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-2 text-xs sm:gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-background/15 px-2.5 py-1 backdrop-blur", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
              " ",
              vendor.location
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-background/15 px-2.5 py-1 backdrop-blur", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
              " ",
              vendor.prepTime
            ] })
          ] })
        ] })
      ] }),
      !accepting && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: vendor.name }),
        " isn't accepting orders right now. You can still browse the menu — check back when they reopen."
      ] }),
      cartVendorId && cartVendorId !== vendor.id && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm", children: [
        "You have items from another vendor in your cart.",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          clearCart();
          toast.success("Cart cleared");
        }, className: "font-semibold text-destructive underline", children: "Clear cart" })
      ] }),
      presentCategories.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.section, { variants: blockVariants, style: {
        willChange: "transform, opacity"
      }, className: "mt-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-end justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold", children: "Browse by category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Tap a card" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 md:grid-cols-3", children: presentCategories.map((cat, i) => {
          const count = items.filter((i2) => i2.category === cat).length;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.a, { href: `#${sectionId(cat)}`, initial: {
            opacity: 0,
            scale: 0.95
          }, animate: {
            opacity: 1,
            scale: 1
          }, transition: {
            duration: 0.3,
            delay: i * 0.04,
            ease: "easeOut"
          }, whileTap: {
            scale: 0.97
          }, className: "group relative overflow-hidden rounded-3xl bg-card shadow-card transition-all hover:-translate-y-0.5 hover:shadow-warm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[5/3]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: CATEGORY_IMAGES[cat], alt: cat, className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105", loading: "lazy" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 left-4 text-cream", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-black", children: cat }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs opacity-90", children: [
                count,
                " item",
                count === 1 ? "" : "s"
              ] })
            ] })
          ] }) }, cat);
        }) })
      ] }),
      presentCategories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.section, { variants: blockVariants, style: {
        willChange: "transform, opacity"
      }, id: sectionId(cat), className: "mt-12 scroll-mt-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 font-display text-2xl font-bold", children: cat }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2", children: items.filter((i) => i.category === cat).map((item) => {
          const qty = qtys[item.id] ?? 1;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.article, { initial: {
            opacity: 0,
            scale: 0.95
          }, animate: {
            opacity: 1,
            scale: 1
          }, transition: {
            duration: 0.3,
            ease: "easeOut"
          }, className: "flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 transition-shadow hover:shadow-card sm:flex-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.image, alt: item.name, className: "h-32 w-full flex-shrink-0 rounded-xl object-cover sm:h-28 sm:w-28", loading: "lazy", width: 112, height: 112 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold leading-tight", children: item.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 line-clamp-2 text-sm text-muted-foreground", children: item.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex flex-wrap items-center justify-between gap-2 pt-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-lg font-bold text-primary", children: [
                  "Rs. ",
                  item.price
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center rounded-full border border-border", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(item.id, qty - 1), "aria-label": "Decrease", className: "grid h-8 w-8 place-items-center text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3.5 w-3.5" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 text-center text-sm font-bold", children: qty }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(item.id, qty + 1), "aria-label": "Increase", className: "grid h-8 w-8 place-items-center text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleAdd(item.id), disabled: !accepting || addingItem === item.id, className: "flex items-center justify-center min-w-[60px] rounded-full bg-foreground px-3 py-2 text-xs font-bold text-background transition-colors hover:bg-foreground/90 disabled:cursor-not-allowed disabled:bg-primary disabled:text-primary-foreground sm:px-4", children: addingItem === item.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
                    scale: 0.5,
                    opacity: 0
                  }, animate: {
                    scale: 1,
                    opacity: 1
                  }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }) : accepting ? "Add" : "Closed" })
                ] })
              ] })
            ] })
          ] }, item.id);
        }) })
      ] }, cat))
    ] })
  ] });
}
export {
  VendorPage as component
};
