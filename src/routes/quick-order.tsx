import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useApp, format12, suggestedPickupForVendor } from "@/store/useApp";
import { menu, getItem, getVendor } from "@/data/menu";
import { Heart, Zap, ArrowLeft, Clock, Repeat } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/quick-order")({
  head: () => ({
    meta: [
      { title: "Quick Order — Campus Dhaba" },
      {
        name: "description",
        content: "Repeat your last order or tap a favourite to send it instantly.",
      },
    ],
  }),
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    const state = useApp.getState();
    if (state.role === "vendor") {
      throw redirect({ to: "/vendor" });
    }
  },
  component: QuickOrderPage,
});

function QuickOrderPage() {
  const favorites = useApp((s) => s.favorites);
  const orders = useApp((s) => s.orders);
  const role = useApp((s) => s.role);
  const vendorAccepting = useApp((s) => s.vendorAccepting);
  const quickOrder = useApp((s) => s.quickOrder);
  const toggleFavorite = useApp((s) => s.toggleFavorite);
  const navigate = useNavigate();

  const lastOrder = orders[0];
  const lastVendor = lastOrder ? getVendor(lastOrder.vendorId) : null;

  const requireLogin = (): boolean => {
    if (!role) {
      toast.message("Please sign in to place an order.");
      navigate({ to: "/login", search: { redirect: "/quick-order" } });
      return false;
    }
    return true;
  };

  const handleQuick = (itemId: string) => {
    if (!requireLogin()) return;
    const item = getItem(itemId);
    if (!item) return;
    if ((vendorAccepting[item.vendorId] ?? true) === false) {
      toast.error(`${getVendor(item.vendorId)?.name ?? "This dhaba"} is closed right now.`);
      return;
    }
    const suggested = suggestedPickupForVendor(item.vendorId, orders);
    const order = quickOrder(itemId, suggested);
    toast.success(`Order #${order.id} placed!`, {
      description: `Pickup at ${format12(order.pickupTime)}`,
    });
    navigate({ to: "/orders/$orderId", params: { orderId: order.id } });
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>
      <div className="mt-3 flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-warm text-primary-foreground shadow-warm">
          <Zap className="h-6 w-6" />
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl">Quick Order</h1>
          <p className="text-sm text-muted-foreground">
            One tap. We'll suggest the fastest pickup time.
          </p>
        </div>
      </div>

      {/* Repeat last order */}
      {lastOrder && lastVendor && (
        <section className="mt-8 overflow-hidden rounded-3xl bg-gradient-warm p-[1.5px] shadow-warm">
          <div className="rounded-[calc(1.5rem-1px)] bg-card p-5 sm:p-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <Repeat className="h-3.5 w-3.5" /> Repeat last order
            </div>
            <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
              <div className="min-w-0">
                <div className="font-display text-2xl font-bold">{lastVendor.name}</div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {lastOrder.lines.map((l) => `${l.qty}× ${getItem(l.itemId)?.name}`).join(", ")}
                </p>
                <div className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" /> Total Rs. {lastOrder.total} · Last pickup{" "}
                  {format12(lastOrder.pickupTime)}
                </div>
              </div>
              <button
                onClick={() => {
                  if (lastOrder.lines.length === 1) handleQuick(lastOrder.lines[0].itemId);
                  else toast.info("Multi-item repeat coming soon — try a favourite below.");
                }}
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:-translate-y-0.5 transition-transform"
              >
                Reorder →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Favourites */}
      <section className="mt-10">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-2xl font-bold">Saved favourites</h2>
          <span className="text-xs text-muted-foreground">Tap to order instantly</span>
        </div>
        <div className="grid gap-3">
          {favorites.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              No favourites yet. Tap the heart on any dish below.
            </div>
          )}
          {favorites.map((id) => {
            const item = getItem(id);
            if (!item) return null;
            const vendor = getVendor(item.vendorId);
            const open = vendorAccepting[item.vendorId] ?? true;
            return (
              <div
                key={id}
                className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-card sm:gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 flex-shrink-0 rounded-xl object-cover sm:h-20 sm:w-20"
                  loading="lazy"
                  width={80}
                  height={80}
                />
                <div className="min-w-0 flex-1">
                  <div className="font-display text-base font-bold leading-tight sm:text-lg">
                    {item.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {vendor?.name} · Rs. {item.price}
                    {!open && <span className="ml-2 font-semibold text-destructive">Closed</span>}
                  </div>
                </div>
                <button
                  onClick={() => toggleFavorite(id)}
                  aria-label="Remove favourite"
                  className="text-primary"
                >
                  <Heart className="h-5 w-5 fill-current" />
                </button>
                <button
                  onClick={() => handleQuick(id)}
                  disabled={!open}
                  className="rounded-full bg-foreground px-4 py-2.5 text-xs font-bold text-background hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {open ? "Tap to order" : "Closed"}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Add favourites */}
      <section className="mt-12">
        <h2 className="mb-4 font-display text-2xl font-bold">Add more favourites</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {menu
            .filter((m) => !favorites.includes(m.id))
            .map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  toggleFavorite(item.id);
                  toast.success(`${item.name} saved`);
                }}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 text-left transition-colors hover:border-primary"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-12 w-12 rounded-lg object-cover"
                  loading="lazy"
                  width={48}
                  height={48}
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{item.name}</div>
                  <div className="text-xs text-muted-foreground">Rs. {item.price}</div>
                </div>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
        </div>
      </section>
    </main>
  );
}
