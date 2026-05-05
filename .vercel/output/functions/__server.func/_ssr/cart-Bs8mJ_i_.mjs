import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useApp, a as useLiveMenu, s as suggestedPickupForVendor, g as getVendor, e as cartTotal, h as compareTime24, f as format12 } from "./router-8hUpC1Lu.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useNow } from "./use-now-DqBMmVtn.mjs";
import { o as ArrowLeft, v as Minus, r as Plus, t as Trash2, w as Calendar, q as Clock, x as ChevronDown, y as CreditCard, z as MessageSquare } from "../_libs/lucide-react.mjs";
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
function WheelColumn({
  options,
  value,
  onChange
}) {
  const scrollRef = reactExports.useRef(null);
  const [localValue, setLocalValue] = reactExports.useState(value);
  reactExports.useEffect(() => {
    setLocalValue(value);
  }, [value]);
  reactExports.useEffect(() => {
    if (scrollRef.current) {
      const idx = options.indexOf(value);
      if (idx !== -1) {
        const itemHeight = scrollRef.current.children[1]?.clientHeight || 48;
        scrollRef.current.scrollTop = idx * itemHeight;
      }
    }
  }, []);
  reactExports.useEffect(() => {
    const t = setTimeout(() => {
      if (localValue !== value) onChange(localValue);
    }, 150);
    return () => clearTimeout(t);
  }, [localValue, value, onChange]);
  const handleScroll = (e) => {
    const el = e.currentTarget;
    const itemHeight = el.children[1]?.clientHeight || 48;
    const index = Math.round(el.scrollTop / itemHeight);
    const clamped = Math.max(0, Math.min(options.length - 1, index));
    if (options[clamped] !== localValue) {
      setLocalValue(options[clamped]);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-48 flex-1 overflow-hidden rounded-2xl bg-secondary/20 before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-16 before:bg-gradient-to-b before:from-card before:to-transparent before:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:z-10 after:h-16 after:bg-gradient-to-t after:from-card after:to-transparent after:pointer-events-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 top-1/2 -mt-6 h-12 border-y-2 border-primary/20 pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: scrollRef, className: "h-full overflow-y-auto snap-y snap-mandatory no-scrollbar", onScroll: handleScroll, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[calc(50%-1.5rem)]" }),
      options.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 snap-center flex items-center justify-center font-display text-2xl font-bold cursor-pointer transition-colors", onClick: (e) => {
        const parent = e.currentTarget.parentElement;
        if (parent) {
          const itemHeight = e.currentTarget.clientHeight;
          parent.scrollTo({
            top: options.indexOf(opt) * itemHeight,
            behavior: "smooth"
          });
        }
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: opt === localValue ? "text-primary scale-110 transition-transform" : "text-muted-foreground opacity-50 transition-transform", children: opt }) }, opt)),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[calc(50%-1.5rem)]" })
    ] })
  ] });
}
const parseTime = (t) => {
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return {
    hStr: hour12.toString().padStart(2, "0"),
    mStr: m.toString().padStart(2, "0"),
    ampm
  };
};
const buildTime = (hStr, mStr, ampm) => {
  let h = parseInt(hStr, 10);
  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  return `${h.toString().padStart(2, "0")}:${mStr}`;
};
const HOURS = Array.from({
  length: 12
}, (_, i) => (i + 1).toString().padStart(2, "0"));
const MINUTES = Array.from({
  length: 60
}, (_, i) => i.toString().padStart(2, "0"));
function QtyInput({
  itemId,
  qty
}) {
  const setQty = useApp((s) => s.setQty);
  const [val, setVal] = reactExports.useState(qty.toString());
  reactExports.useEffect(() => {
    setVal(qty.toString());
  }, [qty]);
  const commit = () => {
    const num = parseInt(val, 10);
    if (!val || isNaN(num) || num < 1) {
      setVal("1");
      setQty(itemId, 1);
    } else {
      setVal(num.toString());
      setQty(itemId, num);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", inputMode: "numeric", value: val, onChange: (e) => setVal(e.target.value.replace(/[^0-9]/g, "")), onBlur: commit, onKeyDown: (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
    }
  }, onFocus: (e) => e.target.select(), "aria-label": "Item quantity", className: "w-12 text-center text-lg font-bold bg-transparent outline-none focus:bg-muted/50 rounded-md" });
}
function CartPage() {
  const cart = useApp((s) => s.cart);
  const cartVendorId = useApp((s) => s.cartVendorId);
  const orders = useApp((s) => s.orders);
  const role = useApp((s) => s.role);
  const setQty = useApp((s) => s.setQty);
  const removeFromCart = useApp((s) => s.removeFromCart);
  const placeOrder = useApp((s) => s.placeOrder);
  const liveMenu = useLiveMenu();
  const navigate = useNavigate();
  useNow(6e4);
  const suggested = reactExports.useMemo(() => suggestedPickupForVendor(cartVendorId, orders), [cartVendorId, orders]);
  const [pickup, setPickup] = reactExports.useState(suggested);
  const [edited, setEdited] = reactExports.useState(false);
  const [notes, setNotes] = reactExports.useState("");
  const [payment, setPayment] = reactExports.useState("EasyPaisa");
  reactExports.useRef(null);
  const [timePickerOpen, setTimePickerOpen] = reactExports.useState(false);
  const [tempH, setTempH] = reactExports.useState("12");
  const [tempM, setTempM] = reactExports.useState("00");
  const [tempA, setTempA] = reactExports.useState("PM");
  reactExports.useEffect(() => {
    if (!edited) setPickup(suggested);
  }, [suggested, edited]);
  const vendor = cartVendorId ? getVendor(cartVendorId) : null;
  const total = reactExports.useMemo(() => cartTotal(cart, liveMenu), [cart, liveMenu]);
  const timeInvalid = compareTime24(pickup, suggested) < 0;
  const handlePickupChange = (value) => {
    if (!value) return;
    setEdited(true);
    setPickup(value);
  };
  const openPicker = () => {
    const {
      hStr,
      mStr,
      ampm
    } = parseTime(pickup);
    setTempH(hStr);
    setTempM(mStr);
    setTempA(ampm);
    setTimePickerOpen(true);
  };
  const handlePlace = () => {
    if (!role) {
      toast.message("Please sign in to place an order.");
      navigate({
        to: "/login",
        search: {
          redirect: "/cart"
        }
      });
      return;
    }
    if (compareTime24(pickup, suggested) < 0) {
      toast.error("Pickup time must be at or after the suggested earliest time.");
      return;
    }
    const order = placeOrder({
      pickupTime: pickup,
      payment,
      notes
    });
    if (!order) return;
    toast.success(`Order #${order.id} placed!`, {
      description: `Pickup ${format12(order.pickupTime)} · ${order.payment}`
    });
    navigate({
      to: "/orders/$orderId",
      params: {
        orderId: order.id
      }
    });
  };
  if (!cart.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-20 w-20 place-items-center rounded-full bg-secondary text-3xl", children: "🥡" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-6 font-display text-3xl font-bold", children: "Your cart is empty" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Pick a dhaba and add a few items to get started." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "mt-6 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground", children: "Browse dhabas" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", "aria-label": "Back", className: "fixed left-[3px] top-[67px] z-40 inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-background shadow-warm ring-1 ring-background/40 backdrop-blur transition-transform hover:-translate-y-0.5 sm:px-4 sm:py-2.5 sm:text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
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
    }, className: "mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-3xl font-bold sm:text-4xl", children: "Your cart" }),
      vendor && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
        "From ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: vendor.name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: cart.map((line) => {
        const item = liveMenu.find((m) => m.id === line.itemId);
        if (!item) return null;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { layout: true, initial: {
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
        }, className: "flex flex-col gap-3 rounded-3xl border border-border bg-card p-4 shadow-card sm:flex-row sm:flex-wrap sm:items-center sm:gap-5 sm:p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 sm:gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.image, alt: item.name, className: "h-20 w-20 flex-shrink-0 rounded-2xl object-cover sm:h-24 sm:w-24 md:h-28 md:w-28", loading: "lazy", width: 112, height: 112 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-base font-bold sm:text-lg md:text-xl", children: item.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-0.5 text-sm text-muted-foreground", children: [
                "Rs. ",
                item.price,
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-60", children: "each" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 sm:gap-4 sm:ml-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center rounded-full border border-border bg-background", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(line.itemId, line.qty - 1), "aria-label": "Decrease quantity", className: "grid h-12 w-12 place-items-center transition-colors hover:bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-5 w-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(QtyInput, { itemId: line.itemId, qty: line.qty }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(line.itemId, line.qty + 1), "aria-label": "Increase quantity", className: "grid h-12 w-12 place-items-center transition-colors hover:bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-5 w-5" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-base font-bold sm:text-lg md:text-xl", children: [
              "Rs. ",
              item.price * line.qty
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeFromCart(line.itemId), "aria-label": "Remove from cart", className: "grid h-12 w-12 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-5 w-5" }) })
          ] })
        ] }, line.itemId);
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm font-bold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-primary" }),
            " Pickup time"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mt-3 rounded-2xl px-4 py-3 text-center transition-colors ${timeInvalid ? "bg-destructive/10" : "bg-primary/5"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-[10px] font-bold uppercase tracking-widest ${timeInvalid ? "text-destructive/70" : "text-muted-foreground"}`, children: "Pickup at" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-0.5 font-display text-3xl font-black sm:text-4xl ${timeInvalid ? "text-destructive" : "text-primary"}`, children: format12(pickup) })
          ] }),
          timeInvalid && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-center text-xs font-semibold text-destructive", children: [
            "Must be at or after ",
            format12(suggested)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: openPicker, className: "mt-3 inline-flex w-full items-center justify-between rounded-xl border border-input bg-background px-4 py-3 text-sm font-bold text-foreground transition-all hover:border-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-muted-foreground" }),
              edited ? "Change time" : "Select pickup time"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 text-muted-foreground transition-transform" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: timePickerOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
            opacity: 0
          }, animate: {
            opacity: 1
          }, exit: {
            opacity: 0
          }, transition: {
            duration: 0.2
          }, className: "absolute inset-0 bg-black/60 backdrop-blur-sm", onClick: () => setTimePickerOpen(false) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
            opacity: 0,
            scale: 0.96,
            y: 10
          }, animate: {
            opacity: 1,
            scale: 1,
            y: 0
          }, exit: {
            opacity: 0,
            scale: 0.96,
            y: 10
          }, transition: {
            duration: 0.3,
            ease: "easeOut"
          }, className: "relative w-full max-w-sm rounded-3xl border border-border bg-card p-6 shadow-warm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "flex items-center gap-2 font-display text-2xl font-bold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-5 w-5 text-primary" }),
              " Select pickup time"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Choose when you'd like to pick up your order." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-8 flex justify-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(WheelColumn, { options: HOURS, value: tempH, onChange: setTempH }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center font-display text-3xl font-bold text-primary/50", children: ":" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(WheelColumn, { options: MINUTES, value: tempM, onChange: setTempM }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(WheelColumn, { options: ["AM", "PM"], value: tempA, onChange: setTempA })
            ] }),
            compareTime24(buildTime(tempH, tempM, tempA), suggested) < 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-4 text-center text-sm font-semibold text-destructive", children: [
              "Must be at or after ",
              format12(suggested)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTimePickerOpen(false), className: "rounded-full border border-border bg-card px-5 py-2.5 text-sm font-bold transition-colors hover:bg-secondary", children: "Cancel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
                const t = buildTime(tempH, tempM, tempA);
                if (compareTime24(t, suggested) >= 0) {
                  handlePickupChange(t);
                  setTimePickerOpen(false);
                }
              }, disabled: compareTime24(buildTime(tempH, tempM, tempA), suggested) < 0, className: "rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-warm transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0", children: "Save" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm font-bold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-4 w-4 text-primary" }),
            " Payment"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-col gap-2", children: ["EasyPaisa", "JazzCash", "Cash on Pickup"].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition-colors ${payment === p ? "border-primary bg-primary/5" : "border-border"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "payment", checked: payment === p, onChange: () => setPayment(p), className: "accent-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: p })
          ] }, p)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-2xl border border-border bg-card p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "order-notes", className: "flex items-center gap-2 text-sm font-bold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4 text-primary" }),
          " Extra instructions",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground", children: "(optional)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: 'Anything the dhaba should know? E.g. "Less spicy", "No raw onion", etc.' }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { id: "order-notes", value: notes, onChange: (e) => setNotes(e.target.value.slice(0, 240)), rows: 3, placeholder: "Add a note for the chef…", className: "mt-3 w-full resize-none rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-right text-[11px] text-muted-foreground", children: [
          notes.length,
          "/240"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 rounded-2xl bg-foreground p-5 text-background sm:p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider opacity-70", children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-3xl font-black sm:text-4xl", children: [
            "Rs. ",
            total
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-xs opacity-70", children: [
            "Pickup at ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold opacity-100", children: format12(pickup) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handlePlace, disabled: timeInvalid, className: "rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-warm transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none disabled:hover:translate-y-0", children: "Confirm Order →" })
      ] }) })
    ] })
  ] });
}
export {
  CartPage as component
};
