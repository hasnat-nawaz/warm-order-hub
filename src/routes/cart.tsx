import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import {
  useApp,
  cartTotal,
  format12,
  compareTime24,
  suggestedPickupForVendor,
  useLiveMenu,
} from "@/store/useApp";
import { getVendor } from "@/data/menu";
import { ArrowLeft, Minus, Plus, Trash2, Calendar, MessageSquare, CreditCard, ChevronDown, Clock } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { useNow } from "@/hooks/use-now";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your cart — Campus Dhaba" }] }),
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    const state = useApp.getState();
    if (state.role === "vendor") {
      throw redirect({ to: "/vendor" });
    }
  },
  component: CartPage,
});

function QtyInput({ itemId, qty }: { itemId: string; qty: number }) {
  const setQty = useApp((s) => s.setQty);
  const [val, setVal] = useState(qty.toString());

  useEffect(() => {
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

  return (
    <input
      type="text"
      inputMode="numeric"
      value={val}
      onChange={(e) => setVal(e.target.value.replace(/[^0-9]/g, ""))}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          e.currentTarget.blur();
        }
      }}
      onFocus={(e) => e.target.select()}
      aria-label="Item quantity"
      className="w-12 text-center text-lg font-bold bg-transparent outline-none focus:bg-muted/50 rounded-md"
    />
  );
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

  // Recompute the queue-based suggestion every minute as time/queue change.
  useNow(60_000);
  const suggested = useMemo(
    () => suggestedPickupForVendor(cartVendorId, orders),
    [cartVendorId, orders],
  );

  const [pickup, setPickup] = useState(suggested);
  const [edited, setEdited] = useState(false);
  const [notes, setNotes] = useState("");
  const [payment, setPayment] = useState<"EasyPaisa" | "JazzCash" | "Cash on Pickup">("EasyPaisa");
  const timeInputRef = useRef<HTMLInputElement>(null);

  // Keep pickup auto-synced to the suggestion until the user manually changes it.
  useEffect(() => {
    if (!edited) setPickup(suggested);
  }, [suggested, edited]);

  const vendor = cartVendorId ? getVendor(cartVendorId) : null;
  const total = useMemo(() => cartTotal(cart, liveMenu), [cart, liveMenu]);

  const timeInvalid = compareTime24(pickup, suggested) < 0;

  const handlePickupChange = (value: string) => {
    if (!value) return;
    setEdited(true);
    setPickup(value);
  };

  const openPicker = () => {
    const el = timeInputRef.current;
    if (!el) return;
    // showPicker is supported on Chromium and Safari TP; fall back to focus.
    type WithShow = HTMLInputElement & { showPicker?: () => void };
    const withShow = el as WithShow;
    if (typeof withShow.showPicker === "function") {
      try {
        withShow.showPicker();
        return;
      } catch {
        /* fall through */
      }
    }
    el.focus();
    el.click();
  };

  const handlePlace = () => {
    if (!role) {
      toast.message("Please sign in to place an order.");
      navigate({ to: "/login", search: { redirect: "/cart" } });
      return;
    }
    if (compareTime24(pickup, suggested) < 0) {
      toast.error("Pickup time must be at or after the suggested earliest time.");
      return;
    }
    const order = placeOrder({ pickupTime: pickup, payment, notes });
    if (!order) return;
    toast.success(`Order #${order.id} placed!`, {
      description: `Pickup ${format12(order.pickupTime)} · ${order.payment}`,
    });
    navigate({ to: "/orders/$orderId", params: { orderId: order.id } });
  };

  if (!cart.length) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-secondary text-3xl">
          🥡
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Pick a dhaba and add a few items to get started.
        </p>
        <Link
          to="/"
          className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
        >
          Browse dhabas
        </Link>
      </main>
    );
  }

  return (
    <>
      <Link
        to="/"
        aria-label="Back"
        className="fixed left-2 top-[4.5rem] z-40 inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-background shadow-warm ring-1 ring-background/40 backdrop-blur transition-transform hover:-translate-y-0.5 sm:left-4 sm:top-20"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>
      <motion.main
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10"
      >
        <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Your cart</h1>
        {vendor && (
          <p className="mt-1 text-sm text-muted-foreground">
            From <span className="font-semibold text-foreground">{vendor.name}</span>
          </p>
        )}

        <div className="mt-8 space-y-4">
          <AnimatePresence initial={false}>
            {cart.map((line) => {
              const item = liveMenu.find((m) => m.id === line.itemId);
              if (!item) return null;
              return (
                <motion.div
                  key={line.itemId}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-wrap items-center gap-4 rounded-3xl border border-border bg-card p-4 shadow-card sm:gap-5 sm:p-5"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 flex-shrink-0 rounded-2xl object-cover sm:h-28 sm:w-28"
                    loading="lazy"
                    width={112}
                    height={112}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-display text-lg font-bold sm:text-xl">{item.name}</div>
                    <div className="mt-0.5 text-sm text-muted-foreground">
                      Rs. {item.price} <span className="opacity-60">each</span>
                    </div>
                  </div>
                  <div className="flex items-center rounded-full border border-border bg-background">
                    <button
                      onClick={() => setQty(line.itemId, line.qty - 1)}
                      aria-label="Decrease quantity"
                      className="grid h-12 w-12 place-items-center transition-colors hover:bg-muted"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                    <QtyInput itemId={line.itemId} qty={line.qty} />
                    <button
                      onClick={() => setQty(line.itemId, line.qty + 1)}
                      aria-label="Increase quantity"
                      className="grid h-12 w-12 place-items-center transition-colors hover:bg-muted"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="ml-auto w-24 text-right font-display text-lg font-bold sm:ml-0 sm:text-xl">
                    Rs. {item.price * line.qty}
                  </div>
                  <button
                    onClick={() => removeFromCart(line.itemId)}
                    aria-label="Remove from cart"
                    className="grid h-12 w-12 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {/* Pickup time */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-sm font-bold">
              <Calendar className="h-4 w-4 text-primary" /> Pickup time
            </div>
            <div className={`mt-3 rounded-2xl px-4 py-3 text-center transition-colors ${timeInvalid ? "bg-destructive/10" : "bg-primary/5"}`}>
              <div className={`text-[10px] font-bold uppercase tracking-widest ${timeInvalid ? "text-destructive/70" : "text-muted-foreground"}`}>
                Pickup at
              </div>
              <div className={`mt-0.5 font-display text-3xl font-black sm:text-4xl ${timeInvalid ? "text-destructive" : "text-primary"}`}>
                {format12(pickup)}
              </div>
            </div>

            {timeInvalid && (
              <p className="mt-3 text-center text-xs font-semibold text-destructive">
                Must be at or after {format12(suggested)}
              </p>
            )}

            <button
              type="button"
              onClick={openPicker}
              className="mt-3 inline-flex w-full items-center justify-between rounded-xl border border-input bg-background px-4 py-3 text-sm font-bold text-foreground transition-all hover:border-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                {edited ? "Change time" : "Select pickup time"}
              </span>
              <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform" />
            </button>

            {/* Native input is kept off-screen but accessible — supplies the
              picker UI when "Select time" is tapped. */}
            <input
              ref={timeInputRef}
              type="time"
              value={pickup}
              min={suggested}
              step={60}
              onChange={(e) => handlePickupChange(e.target.value)}
              aria-label="Pickup time"
              className="sr-only"
            />
          </div>

          {/* Payment */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-sm font-bold">
              <CreditCard className="h-4 w-4 text-primary" /> Payment
            </div>
            <div className="mt-3 flex flex-col gap-2">
              {(["EasyPaisa", "JazzCash", "Cash on Pickup"] as const).map((p) => (
                <label
                  key={p}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                    payment === p ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === p}
                    onChange={() => setPayment(p)}
                    className="accent-primary"
                  />
                  <span className="font-medium">{p}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Special instructions */}
        <div className="mt-4 rounded-2xl border border-border bg-card p-5">
          <label htmlFor="order-notes" className="flex items-center gap-2 text-sm font-bold">
            <MessageSquare className="h-4 w-4 text-primary" /> Extra instructions
            <span className="text-xs font-medium text-muted-foreground">(optional)</span>
          </label>
          <p className="mt-1 text-xs text-muted-foreground">
            Anything the dhaba should know? E.g. "Less spicy", "No raw onion", etc.
          </p>
          <textarea
            id="order-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value.slice(0, 240))}
            rows={3}
            placeholder="Add a note for the chef…"
            className="mt-3 w-full resize-none rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
          />
          <div className="mt-1 text-right text-[11px] text-muted-foreground">
            {notes.length}/240
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-foreground p-5 text-background sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-wider opacity-70">Total</div>
              <div className="font-display text-3xl font-black sm:text-4xl">Rs. {total}</div>
              <div className="mt-1 text-xs opacity-70">
                Pickup at <span className="font-semibold opacity-100">{format12(pickup)}</span>
              </div>
            </div>
            <button
              onClick={handlePlace}
              disabled={timeInvalid}
              className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-warm transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none disabled:hover:translate-y-0"
            >
              Confirm Order →
            </button>
          </div>
        </div>
      </motion.main>
    </>
  );
}
