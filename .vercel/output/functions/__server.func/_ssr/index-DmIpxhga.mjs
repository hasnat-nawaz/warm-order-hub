import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useApp, a as useLiveMenu, v as vendors } from "./router-8hUpC1Lu.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { m as motion, u as useMotionValue, a as useTransform, b as animate } from "../_libs/framer-motion.mjs";
import { Z as Zap, A as ArrowRight, B as MapPin, q as Clock } from "../_libs/lucide-react.mjs";
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
const heroImg = "/assets/hero-DeL2nMNA.jpg";
function VendorCardLink({
  vendor,
  accepting
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/vendors/$vendorId", params: {
    vendorId: vendor.id
  }, disabled: !accepting, className: `group relative block overflow-hidden rounded-3xl border border-border/60 bg-card ring-1 ring-black/5 [box-shadow:0_4px_0_0_rgba(0,0,0,0.04),0_18px_28px_-12px_rgba(60,30,10,0.18),0_2px_6px_rgba(60,30,10,0.06)] transition-all duration-300 ${accepting ? "hover:-translate-y-1.5 hover:[box-shadow:0_6px_0_0_rgba(0,0,0,0.05),0_28px_40px_-14px_rgba(60,30,10,0.28),0_4px_10px_rgba(60,30,10,0.1)] active:translate-y-0" : "opacity-75"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[5/3] overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: vendor.image, alt: vendor.name, className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105", loading: "lazy", width: 1024, height: 640 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 right-3", children: accepting ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary backdrop-blur", children: "● Open" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground backdrop-blur", children: "Closed" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold", children: vendor.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: vendor.tagline }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
          " ",
          vendor.location
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
          " ",
          vendor.prepTime
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center text-sm font-bold text-primary opacity-90 transition-opacity group-hover:opacity-100", children: [
        "View menu ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" })
      ] })
    ] })
  ] });
}
function AnimatedCounter({
  value
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  reactExports.useEffect(() => {
    const animation = animate(count, value, {
      duration: 1.5,
      ease: "easeOut"
    });
    return animation.stop;
  }, [value, count]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { children: rounded });
}
function HomePage() {
  const favIds = useApp((s) => s.favorites);
  const vendorAccepting = useApp((s) => s.vendorAccepting);
  const liveMenu = useLiveMenu();
  const favItems = favIds.map((id) => liveMenu.find((m) => m.id === id)).filter(Boolean).slice(0, 3);
  const role = useApp((s) => s.role);
  const orders = useApp((s) => s.orders);
  const addToCart = useApp((s) => s.addToCart);
  const clearCart = useApp((s) => s.clearCart);
  const navigate = useNavigate();
  const todayStart = /* @__PURE__ */ new Date();
  todayStart.setHours(0, 0, 0, 0);
  const liveOrdersCount = orders.filter((o) => o.status !== "Cancelled" && o.placedAt >= todayStart.getTime()).length;
  const handleQuickOrder = (itemId, vendorId) => {
    if (!role) {
      toast.message("Please sign in to place an order.");
      navigate({
        to: "/login",
        search: {
          redirect: "/"
        }
      });
      return;
    }
    const item = liveMenu.find((m) => m.id === itemId);
    if (!item) return;
    if ((vendorAccepting[vendorId] ?? true) === false) {
      toast.error("This dhaba is closed right now.");
      return;
    }
    clearCart();
    const res = addToCart(item, 1);
    if (!res.ok) {
      toast.error(res.reason ?? "Could not add item.");
      return;
    }
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.main, { variants: containerVariants, initial: "hidden", animate: "showSections", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden", style: {
      contain: "paint"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-ember" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-6xl gap-10 px-4 pt-[25px] pb-16 sm:px-6 md:grid-cols-[1.1fr_1fr] md:items-center md:pt-20 md:pb-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: blockVariants, style: {
          willChange: "transform, opacity"
        }, className: "relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3.5 w-3.5" }),
            " Built for GIKI students"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-5 font-display text-4xl font-black leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-7xl", children: [
            "Skip the ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "queue." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "Eat ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-accent", children: "on time." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-md text-base text-muted-foreground md:text-lg", children: "Pre-order from your favourite campus dhabas, pick a slot between classes, and walk straight up to collect." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#vendors", className: "inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-warm transition-transform hover:-translate-y-0.5", children: [
              "Browse dhabas ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/quick-order", className: "inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4 text-accent" }),
              " Quick Order"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "mt-10 flex max-w-md items-start justify-start gap-6 pl-[30px] pr-[40px] sm:gap-10 md:gap-16 md:px-0", children: [["3+", "Dhabas"], ["~2 min", "Order time"], ["0", "Queue"]].map(([n, l]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "font-display text-3xl font-bold text-primary", children: n }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: l })
          ] }, l)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: blockVariants, style: {
          willChange: "transform, opacity"
        }, className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-2 rounded-[2.5rem] bg-gradient-warm opacity-40 blur-3xl sm:-inset-4 md:-inset-6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImg, alt: "Spread of pakistani street food including paratha, chai, biryani and burgers", className: "relative aspect-[4/3] w-full rounded-[2rem] object-cover shadow-warm", width: 1536, height: 1024 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -bottom-3 -left-3 hidden rounded-2xl bg-card px-4 py-3 shadow-card md:block lg:-bottom-5 lg:-left-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: "Avg pickup" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl font-bold", children: "8 minutes" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -top-3 -right-3 hidden rounded-2xl bg-foreground px-4 py-3 text-background shadow-card md:block lg:-top-5 lg:-right-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider opacity-70", children: "Live orders" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-xl font-bold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedCounter, { value: liveOrdersCount }),
              " today"
            ] })
          ] })
        ] })
      ] })
    ] }),
    favItems.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-y border-border/60 bg-secondary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 py-8 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-end justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-foreground/70", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3.5 w-3.5 text-primary" }),
            " One-tap reorder"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold md:text-3xl", children: "Your favourites" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/quick-order", className: "text-sm font-semibold text-primary hover:underline", children: "See all →" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-3", children: favItems.map((it) => it && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleQuickOrder(it.id, it.vendorId), className: "w-full text-left group flex items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: it.image, alt: it.name, className: "h-16 w-16 rounded-xl object-cover", loading: "lazy", width: 64, height: 64 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate font-semibold", children: it.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            "Rs. ",
            it.price
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground", children: "Order now" })
      ] }, it.id)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "vendors", className: "mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 flex items-end justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold uppercase tracking-wider text-primary", children: "Choose your dhaba" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl", children: "Today's vendors" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hidden max-w-xs text-sm text-muted-foreground md:block", children: "Hours, location and live status — all you need to pick a spot." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: vendors.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        scale: 0.95
      }, animate: {
        opacity: 1,
        scale: 1
      }, transition: {
        duration: 0.3,
        delay: i * 0.05
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(VendorCardLink, { vendor: v, accepting: vendorAccepting[v.id] ?? v.accepting }) }, v.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border/60 bg-secondary/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Campus Dhaba — GIKI HCI Project."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Skip the queue · Eat on time" })
    ] }) })
  ] });
}
export {
  HomePage as component
};
