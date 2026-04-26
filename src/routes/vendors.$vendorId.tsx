import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { CATEGORIES, CATEGORY_IMAGES, getVendor, type Category } from "@/data/menu";
import { useApp, useLiveMenu } from "@/store/useApp";
import { ArrowLeft, Clock, MapPin, Minus, Plus, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export const Route = createFileRoute("/vendors/$vendorId")({
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    const state = useApp.getState();
    if (state.role === "vendor") {
      throw redirect({ to: "/vendor" });
    }
  },
  component: VendorPage,
  notFoundComponent: () => <div className="p-10">Vendor not found.</div>,
});

function VendorPage() {
  const { vendorId } = Route.useParams();
  const vendor = getVendor(vendorId);
  const liveMenu = useLiveMenu();
  const items = useMemo(
    () => liveMenu.filter((m) => m.vendorId === vendorId),
    [liveMenu, vendorId],
  );
  const addToCart = useApp((s) => s.addToCart);
  const clearCart = useApp((s) => s.clearCart);
  const cartVendorId = useApp((s) => s.cartVendorId);
  const vendorAccepting = useApp((s) => s.vendorAccepting);
  const navigate = useNavigate();
  const [qtys, setQtys] = useState<Record<string, number>>({});

  if (!vendor) return <div className="p-10">Vendor not found.</div>;

  const accepting = vendorAccepting[vendor.id] ?? vendor.accepting;

  const setQty = (id: string, q: number) => setQtys((p) => ({ ...p, [id]: Math.max(1, q) }));

  const handleAdd = (itemId: string) => {
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
          },
        },
      });
      return;
    }
    toast.success(`Added ${qty}× ${item.name}`);
  };

  // Only show categories that this vendor actually has items in.
  const presentCategories: Category[] = CATEGORIES.filter((c) =>
    items.some((i) => i.category === c),
  );

  const sectionId = (c: Category) => `cat-${c.toLowerCase()}`;

  return (
    <main className="mx-auto max-w-5xl px-4 pb-24 sm:px-6">
      {/* Banner. Back button is intentionally desktop-only — on phones it
          previously overlapped the bottom-fixed cart button + first card. */}
      <div className="relative mt-6 overflow-hidden rounded-3xl">
        <img
          src={vendor.image}
          alt={vendor.name}
          className="aspect-[16/8] w-full object-cover sm:aspect-[16/6]"
          width={1024}
          height={384}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 to-transparent" />
        <Link
          to="/"
          className="absolute left-4 top-4 hidden items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold backdrop-blur sm:inline-flex"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </Link>
        <div className="absolute right-4 top-4">
          {accepting ? (
            <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-warm">
              ● Open
            </span>
          ) : (
            <span className="rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground backdrop-blur">
              Closed
            </span>
          )}
        </div>
        <div className="absolute bottom-5 left-5 right-5 text-cream">
          <h1 className="font-display text-3xl font-black sm:text-4xl md:text-5xl">
            {vendor.name}
          </h1>
          <p className="mt-1 text-sm opacity-90">{vendor.tagline}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs sm:gap-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-background/15 px-2.5 py-1 backdrop-blur">
              <Star className="h-3 w-3 fill-accent text-accent" /> {vendor.rating}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-background/15 px-2.5 py-1 backdrop-blur">
              <MapPin className="h-3 w-3" /> {vendor.location}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-background/15 px-2.5 py-1 backdrop-blur">
              <Clock className="h-3 w-3" /> {vendor.prepTime}
            </span>
          </div>
        </div>
      </div>

      {!accepting && (
        <div className="mt-6 rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{vendor.name}</span> isn't accepting
          orders right now. You can still browse the menu — check back when they reopen.
        </div>
      )}

      {cartVendorId && cartVendorId !== vendor.id && (
        <div className="mt-6 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm">
          You have items from another vendor in your cart.{" "}
          <button
            onClick={() => {
              clearCart();
              toast.success("Cart cleared");
            }}
            className="font-semibold text-destructive underline"
          >
            Clear cart
          </button>
        </div>
      )}

      {/* Category cards — tap to scroll to section */}
      {presentCategories.length > 0 && (
        <section className="mt-8">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="font-display text-2xl font-bold">Browse by category</h2>
            <span className="text-xs text-muted-foreground">Tap a card</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {presentCategories.map((cat, i) => {
              const count = items.filter((i) => i.category === cat).length;
              return (
                <motion.a
                  key={cat}
                  href={`#${sectionId(cat)}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative overflow-hidden rounded-3xl bg-card shadow-card transition-all hover:-translate-y-0.5 hover:shadow-warm"
                >
                  <div className="relative aspect-[5/3]">
                    <img
                      src={CATEGORY_IMAGES[cat]}
                      alt={cat}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent" />
                    <div className="absolute bottom-3 left-4 text-cream">
                      <h3 className="font-display text-2xl font-black">{cat}</h3>
                      <p className="text-xs opacity-90">
                        {count} item{count === 1 ? "" : "s"}
                      </p>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </section>
      )}

      {/* Menu by category */}
      {presentCategories.map((cat) => (
        <section key={cat} id={sectionId(cat)} className="mt-12 scroll-mt-24">
          <h2 className="mb-4 font-display text-2xl font-bold">{cat}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {items
              .filter((i) => i.category === cat)
              .map((item) => {
                const qty = qtys[item.id] ?? 1;
                return (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 transition-shadow hover:shadow-card sm:flex-row"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-32 w-full flex-shrink-0 rounded-xl object-cover sm:h-28 sm:w-28"
                      loading="lazy"
                      width={112}
                      height={112}
                    />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <h3 className="font-display text-lg font-bold leading-tight">{item.name}</h3>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-3">
                        <div className="font-display text-lg font-bold text-primary">
                          Rs. {item.price}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center rounded-full border border-border">
                            <button
                              onClick={() => setQty(item.id, qty - 1)}
                              aria-label="Decrease"
                              className="grid h-8 w-8 place-items-center text-muted-foreground hover:text-foreground"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-6 text-center text-sm font-bold">{qty}</span>
                            <button
                              onClick={() => setQty(item.id, qty + 1)}
                              aria-label="Increase"
                              className="grid h-8 w-8 place-items-center text-muted-foreground hover:text-foreground"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <button
                            onClick={() => handleAdd(item.id)}
                            disabled={!accepting}
                            className="rounded-full bg-foreground px-4 py-2 text-xs font-bold text-background hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {accepting ? "Add" : "Closed"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
          </div>
        </section>
      ))}

      <button
        onClick={() => navigate({ to: "/cart" })}
        className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-warm transition-transform hover:-translate-y-0.5 hover:-translate-x-1/2"
      >
        View cart →
      </button>
    </main>
  );
}
