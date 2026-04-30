import { createFileRoute, Link } from "@tanstack/react-router";
import { vendors } from "@/data/menu";
import { useApp, useLiveMenu } from "@/store/useApp";
import { ArrowRight, Clock, MapPin, Star, Zap } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { motion } from "framer-motion";

function VendorCardLink({
  vendor,
  accepting,
}: {
  vendor: (typeof vendors)[number];
  accepting: boolean;
}) {
  return (
    <Link
      to="/vendors/$vendorId"
      params={{ vendorId: vendor.id }}
      disabled={!accepting}
      className={`group relative block overflow-hidden rounded-3xl border border-border/60 bg-card ring-1 ring-black/5 [box-shadow:0_4px_0_0_rgba(0,0,0,0.04),0_18px_28px_-12px_rgba(60,30,10,0.18),0_2px_6px_rgba(60,30,10,0.06)] transition-all duration-300 ${
        accepting
          ? "hover:-translate-y-1.5 hover:[box-shadow:0_6px_0_0_rgba(0,0,0,0.05),0_28px_40px_-14px_rgba(60,30,10,0.28),0_4px_10px_rgba(60,30,10,0.1)] active:translate-y-0"
          : "opacity-75"
      }`}
    >
      {/* subtle top sheen for the 3D feel */}
      <span className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
      <div className="relative aspect-[5/3] overflow-hidden">
        <img
          src={vendor.image}
          alt={vendor.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          width={1024}
          height={640}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
        <div className="absolute top-3 right-3">
          {accepting ? (
            <span className="rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary backdrop-blur">
              ● Open
            </span>
          ) : (
            <span className="rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground backdrop-blur">
              Closed
            </span>
          )}
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-bold backdrop-blur">
          <Star className="h-3 w-3 fill-accent text-accent" /> {vendor.rating}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl font-bold">{vendor.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{vendor.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> {vendor.location}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {vendor.prepTime}
          </span>
        </div>
      </div>
    </Link>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Campus Dhaba — Skip the queue at GIKI" },
      {
        name: "description",
        content: "Browse campus dhabas, place pre-orders, and pick up your food without waiting.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const favIds = useApp((s) => s.favorites);
  const vendorAccepting = useApp((s) => s.vendorAccepting);
  const liveMenu = useLiveMenu();
  const favItems = favIds
    .map((id) => liveMenu.find((m) => m.id === id))
    .filter(Boolean)
    .slice(0, 3);

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-ember" />
        <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-12 pb-16 sm:px-6 md:grid-cols-[1.1fr_1fr] md:items-center md:pt-20 md:pb-24">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <Zap className="h-3.5 w-3.5" /> Built for GIKI students
            </span>
            <h1 className="mt-5 font-display text-5xl font-black leading-[1.05] tracking-tight text-balance md:text-7xl">
              Skip the <span className="text-primary">queue.</span>
              <br />
              Eat <span className="italic text-accent">on time.</span>
            </h1>
            <p className="mt-5 max-w-md text-base text-muted-foreground md:text-lg">
              Pre-order from your favourite campus dhabas, pick a slot between classes, and walk
              straight up to collect.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#vendors"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-warm transition-transform hover:-translate-y-0.5"
              >
                Browse dhabas <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/quick-order"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                <Zap className="h-4 w-4 text-accent" /> Quick Order
              </Link>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[
                ["3+", "Dhabas"],
                ["~2 min", "Order time"],
                ["0", "Queue"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="font-display text-3xl font-bold text-primary">{n}</dt>
                  <dd className="text-xs uppercase tracking-wider text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-warm opacity-40 blur-3xl" />
            <img
              src={heroImg}
              alt="Spread of pakistani street food including paratha, chai, biryani and burgers"
              className="relative aspect-[4/3] w-full rounded-[2rem] object-cover shadow-warm"
              width={1536}
              height={1024}
            />
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl bg-card px-4 py-3 shadow-card md:block">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Avg pickup
              </div>
              <div className="font-display text-xl font-bold">8 minutes</div>
            </div>
            <div className="absolute -top-5 -right-5 hidden rounded-2xl bg-foreground px-4 py-3 text-background shadow-card md:block">
              <div className="text-[10px] uppercase tracking-wider opacity-70">Live orders</div>
              <div className="font-display text-xl font-bold">42 today</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Order strip */}
      {favItems.length > 0 && (
        <section className="border-y border-border/60 bg-secondary/40">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <div className="mb-5 flex items-end justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-foreground/70">
                  <Zap className="h-3.5 w-3.5 text-primary" /> One-tap reorder
                </div>
                <h2 className="font-display text-2xl font-bold md:text-3xl">Your favourites</h2>
              </div>
              <Link
                to="/quick-order"
                className="text-sm font-semibold text-primary hover:underline"
              >
                See all →
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {favItems.map(
                (it) =>
                  it && (
                    <Link
                      key={it.id}
                      to="/quick-order"
                      className="group flex items-center gap-3 rounded-2xl bg-card p-3 shadow-card transition-transform hover:-translate-y-0.5"
                    >
                      <img
                        src={it.image}
                        alt={it.name}
                        className="h-16 w-16 rounded-xl object-cover"
                        loading="lazy"
                        width={64}
                        height={64}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-semibold">{it.name}</div>
                        <div className="text-xs text-muted-foreground">Rs. {it.price}</div>
                      </div>
                      <span className="rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
                      Order now
                      </span>
                    </Link>
                  ),
              )}
            </div>
          </div>
        </section>
      )}

      {/* Vendors */}
      <section id="vendors" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-primary">
              Choose your dhaba
            </div>
            <h2 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Today's vendors
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm text-muted-foreground md:block">
            Hours, location and live status — all you need to pick a spot.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vendors.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <VendorCardLink vendor={v} accepting={vendorAccepting[v.id] ?? v.accepting} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-secondary/30">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Campus Dhaba — GIKI HCI Project.</p>
          <p>Skip the queue · Eat on time</p>
        </div>
      </footer>
    </motion.main>
  );
}
