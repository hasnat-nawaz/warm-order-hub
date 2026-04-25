import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { getVendor, itemsByVendor } from "@/data/menu";
import { useApp } from "@/store/useApp";
import { ArrowLeft, Clock, MapPin, Minus, Plus, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/vendors/$vendorId")({
  component: VendorPage,
  notFoundComponent: () => <div className="p-10">Vendor not found.</div>,
});

function VendorPage() {
  const { vendorId } = Route.useParams();
  const vendor = getVendor(vendorId);
  const items = itemsByVendor(vendorId);
  const addToCart = useApp(s => s.addToCart);
  const clearCart = useApp(s => s.clearCart);
  const cartVendorId = useApp(s => s.cartVendorId);
  const navigate = useNavigate();
  const [qtys, setQtys] = useState<Record<string, number>>({});

  if (!vendor) return <div className="p-10">Vendor not found.</div>;

  const setQty = (id: string, q: number) => setQtys((p) => ({ ...p, [id]: Math.max(1, q) }));

  const handleAdd = (itemId: string) => {
    const item = items.find(i => i.id === itemId)!;
    const qty = qtys[itemId] ?? 1;
    const res = addToCart(item, qty);
    if (!res.ok) {
      toast.error(res.reason ?? "Could not add", {
        action: { label: "Clear cart", onClick: () => { clearCart(); addToCart(item, qty); toast.success(`Added ${item.name}`); } },
      });
      return;
    }
    toast.success(`Added ${qty}× ${item.name}`);
  };

  const categories = Array.from(new Set(items.map(i => i.category)));

  return (
    <main className="mx-auto max-w-5xl px-4 pb-24 sm:px-6">
      {/* Banner */}
      <div className="relative mt-6 overflow-hidden rounded-3xl">
        <img src={vendor.image} alt={vendor.name} className="aspect-[16/6] w-full object-cover" width={1024} height={384} />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 to-transparent" />
        <Link to="/" className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold backdrop-blur">
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </Link>
        <div className="absolute bottom-5 left-5 right-5 text-cream">
          <h1 className="font-display text-4xl font-black md:text-5xl">{vendor.name}</h1>
          <p className="mt-1 text-sm opacity-90">{vendor.tagline}</p>
          <div className="mt-3 flex flex-wrap gap-3 text-xs">
            <span className="inline-flex items-center gap-1 rounded-full bg-background/15 px-2.5 py-1 backdrop-blur"><Star className="h-3 w-3 fill-accent text-accent" /> {vendor.rating}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-background/15 px-2.5 py-1 backdrop-blur"><MapPin className="h-3 w-3" /> {vendor.location}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-background/15 px-2.5 py-1 backdrop-blur"><Clock className="h-3 w-3" /> {vendor.prepTime}</span>
          </div>
        </div>
      </div>

      {cartVendorId && cartVendorId !== vendor.id && (
        <div className="mt-6 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm">
          You have items from another vendor in your cart.{" "}
          <button onClick={() => { clearCart(); toast.success("Cart cleared"); }} className="font-semibold text-destructive underline">
            Clear cart
          </button>
        </div>
      )}

      {/* Menu by category */}
      {categories.map((cat) => (
        <section key={cat} className="mt-10">
          <h2 className="mb-4 font-display text-2xl font-bold">{cat}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {items.filter(i => i.category === cat).map((item) => {
              const qty = qtys[item.id] ?? 1;
              return (
                <article key={item.id} className="flex gap-4 rounded-2xl border border-border bg-card p-4 transition-shadow hover:shadow-card">
                  <img src={item.image} alt={item.name} className="h-28 w-28 flex-shrink-0 rounded-xl object-cover" loading="lazy" width={112} height={112} />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <h3 className="font-display text-lg font-bold leading-tight">{item.name}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
                    <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                      <div className="font-display text-lg font-bold text-primary">Rs. {item.price}</div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center rounded-full border border-border">
                          <button onClick={() => setQty(item.id, qty - 1)} className="grid h-8 w-8 place-items-center text-muted-foreground hover:text-foreground"><Minus className="h-3.5 w-3.5" /></button>
                          <span className="w-6 text-center text-sm font-bold">{qty}</span>
                          <button onClick={() => setQty(item.id, qty + 1)} className="grid h-8 w-8 place-items-center text-muted-foreground hover:text-foreground"><Plus className="h-3.5 w-3.5" /></button>
                        </div>
                        <button onClick={() => handleAdd(item.id)} className="rounded-full bg-foreground px-4 py-2 text-xs font-bold text-background hover:bg-foreground/90">
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}

      <button
        onClick={() => navigate({ to: "/cart" })}
        className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-warm hover:-translate-y-0.5 hover:-translate-x-1/2"
      >
        View cart →
      </button>
    </main>
  );
}
