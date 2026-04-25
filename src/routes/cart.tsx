import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useApp, cartTotal, suggestedPickupTime } from "@/store/useApp";
import { getItem, getVendor } from "@/data/menu";
import { ArrowLeft, Minus, Plus, Trash2, Clock } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your cart — Campus Dhaba" }] }),
  component: CartPage,
});

function CartPage() {
  const cart = useApp(s => s.cart);
  const cartVendorId = useApp(s => s.cartVendorId);
  const setQty = useApp(s => s.setQty);
  const removeFromCart = useApp(s => s.removeFromCart);
  const placeOrder = useApp(s => s.placeOrder);
  const navigate = useNavigate();

  const [pickup, setPickup] = useState(suggestedPickupTime(15));
  const [payment, setPayment] = useState<"EasyPaisa" | "JazzCash" | "Cash on Pickup">("EasyPaisa");

  const vendor = cartVendorId ? getVendor(cartVendorId) : null;
  const total = useMemo(() => cartTotal(cart), [cart]);

  const handlePlace = () => {
    const order = placeOrder({ pickupTime: pickup, payment });
    if (!order) return;
    toast.success(`Order #${order.id} placed!`);
    navigate({ to: "/orders/$orderId", params: { orderId: order.id } });
  };

  if (!cart.length) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-secondary text-3xl">🥡</div>
        <h1 className="mt-6 font-display text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-sm text-muted-foreground">Pick a dhaba and add a few items to get started.</p>
        <Link to="/" className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground">Browse dhabas</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>
      <h1 className="mt-3 font-display text-4xl font-bold">Your cart</h1>
      {vendor && <p className="mt-1 text-sm text-muted-foreground">From <span className="font-semibold text-foreground">{vendor.name}</span></p>}

      <div className="mt-8 space-y-3">
        {cart.map((line) => {
          const item = getItem(line.itemId);
          if (!item) return null;
          return (
            <div key={line.itemId} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-3">
              <img src={item.image} alt={item.name} className="h-16 w-16 rounded-xl object-cover" loading="lazy" width={64} height={64} />
              <div className="min-w-0 flex-1">
                <div className="font-semibold">{item.name}</div>
                <div className="text-sm text-muted-foreground">Rs. {item.price}</div>
              </div>
              <div className="flex items-center rounded-full border border-border">
                <button onClick={() => setQty(line.itemId, line.qty - 1)} className="grid h-8 w-8 place-items-center"><Minus className="h-3.5 w-3.5" /></button>
                <span className="w-6 text-center text-sm font-bold">{line.qty}</span>
                <button onClick={() => setQty(line.itemId, line.qty + 1)} className="grid h-8 w-8 place-items-center"><Plus className="h-3.5 w-3.5" /></button>
              </div>
              <div className="w-20 text-right font-display font-bold">Rs. {item.price * line.qty}</div>
              <button onClick={() => removeFromCart(line.itemId)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-sm font-bold"><Clock className="h-4 w-4 text-primary" /> Pickup time</div>
          <p className="mt-1 text-xs text-muted-foreground">Suggested: {suggestedPickupTime(15)}</p>
          <input
            type="time"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="mt-3 w-full rounded-xl border border-input bg-background px-3 py-2 text-base font-semibold focus:border-primary focus:outline-none"
          />
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="text-sm font-bold">Payment</div>
          <div className="mt-3 flex flex-col gap-2">
            {(["EasyPaisa", "JazzCash", "Cash on Pickup"] as const).map((p) => (
              <label key={p} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition-colors ${payment === p ? "border-primary bg-primary/5" : "border-border"}`}>
                <input type="radio" name="payment" checked={payment === p} onChange={() => setPayment(p)} className="accent-primary" />
                <span className="font-medium">{p}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-foreground p-6 text-background">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider opacity-70">Total</div>
            <div className="font-display text-4xl font-black">Rs. {total}</div>
          </div>
          <button onClick={handlePlace} className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-warm hover:-translate-y-0.5 transition-transform">
            Confirm Order →
          </button>
        </div>
      </div>
    </main>
  );
}
