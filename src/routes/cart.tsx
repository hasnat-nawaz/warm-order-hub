import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import {
  useApp,
  cartTotal,
  format12,
  compareTime24,
  suggestedPickupForVendor,
} from "@/store/useApp";
import { getItem, getVendor } from "@/data/menu";
import { ArrowLeft, Minus, Plus, Trash2, Clock, MessageSquare, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useNow } from "@/hooks/use-now";

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

function CartPage() {
  const cart = useApp((s) => s.cart);
  const cartVendorId = useApp((s) => s.cartVendorId);
  const orders = useApp((s) => s.orders);
  const role = useApp((s) => s.role);
  const setQty = useApp((s) => s.setQty);
  const removeFromCart = useApp((s) => s.removeFromCart);
  const placeOrder = useApp((s) => s.placeOrder);
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

  // Keep pickup auto-synced to the suggestion until the user manually changes it.
  useEffect(() => {
    if (!edited) setPickup(suggested);
  }, [suggested, edited]);

  const vendor = cartVendorId ? getVendor(cartVendorId) : null;
  const total = useMemo(() => cartTotal(cart), [cart]);

  const handlePickupChange = (value: string) => {
    setEdited(true);
    if (compareTime24(value, suggested) < 0) {
      toast.error(`Earliest possible pickup is ${format12(suggested)} based on the current queue.`);
      setPickup(suggested);
      return;
    }
    setPickup(value);
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
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>
      <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Your cart</h1>
      {vendor && (
        <p className="mt-1 text-sm text-muted-foreground">
          From <span className="font-semibold text-foreground">{vendor.name}</span>
        </p>
      )}

      <div className="mt-8 space-y-3">
        {cart.map((line) => {
          const item = getItem(line.itemId);
          if (!item) return null;
          return (
            <div
              key={line.itemId}
              className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card p-3 sm:gap-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 flex-shrink-0 rounded-xl object-cover"
                loading="lazy"
                width={64}
                height={64}
              />
              <div className="min-w-0 flex-1">
                <div className="font-semibold">{item.name}</div>
                <div className="text-sm text-muted-foreground">Rs. {item.price}</div>
              </div>
              <div className="flex items-center rounded-full border border-border">
                <button
                  onClick={() => setQty(line.itemId, line.qty - 1)}
                  aria-label="Decrease quantity"
                  className="grid h-8 w-8 place-items-center"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-6 text-center text-sm font-bold">{line.qty}</span>
                <button
                  onClick={() => setQty(line.itemId, line.qty + 1)}
                  aria-label="Increase quantity"
                  className="grid h-8 w-8 place-items-center"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="ml-auto w-20 text-right font-display font-bold sm:ml-0">
                Rs. {item.price * line.qty}
              </div>
              <button
                onClick={() => removeFromCart(line.itemId)}
                aria-label="Remove from cart"
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {/* Pickup time */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-sm font-bold">
            <Clock className="h-4 w-4 text-primary" /> Pickup time
          </div>
          <div className="mt-2 flex items-start gap-2 rounded-xl bg-secondary/60 p-3 text-xs text-secondary-foreground">
            <Sparkles className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" />
            <div>
              Based on the current queue, the earliest pickup is{" "}
              <span className="font-bold text-foreground">{format12(suggested)}</span>. You can pick
              a later time if you'd like, but not earlier.
            </div>
          </div>
          <input
            type="time"
            value={pickup}
            min={suggested}
            step={60}
            onChange={(e) => handlePickupChange(e.target.value)}
            className="mt-3 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-base font-semibold focus:border-primary focus:outline-none"
          />
          <div className="mt-2 text-xs text-muted-foreground">
            Showing as: <span className="font-semibold text-foreground">{format12(pickup)}</span>
          </div>
        </div>

        {/* Payment */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="text-sm font-bold">Payment</div>
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
        <div className="mt-1 text-right text-[11px] text-muted-foreground">{notes.length}/240</div>
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
            className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-warm transition-transform hover:-translate-y-0.5"
          >
            Confirm Order →
          </button>
        </div>
      </div>
    </main>
  );
}
