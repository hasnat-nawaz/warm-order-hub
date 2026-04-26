import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useApp, format12, type OrderStatus } from "@/store/useApp";
import { getItem, getVendor, vendors } from "@/data/menu";
import {
  Bell,
  ChefHat,
  CheckCircle2,
  Clock,
  MessageSquare,
  Power,
  Receipt,
  Wallet,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/vendor")({
  head: () => ({ meta: [{ title: "Vendor dashboard — Campus Dhaba" }] }),
  beforeLoad: ({ location }) => {
    // Skip on SSR: the persisted store hydrates only on the client.
    if (typeof window === "undefined") return;
    const state = useApp.getState();
    if (state.role !== "vendor") {
      throw redirect({
        to: "/login",
        search: { redirect: location.pathname },
      });
    }
  },
  component: VendorDashboard,
});

const next: Record<OrderStatus, OrderStatus | null> = {
  Pending: "Preparing",
  Preparing: "Ready",
  Ready: "Picked up",
  "Picked up": null,
};

const badge: Record<OrderStatus, string> = {
  Pending: "bg-secondary text-secondary-foreground",
  Preparing: "bg-accent/30 text-accent-foreground",
  Ready: "bg-primary text-primary-foreground",
  "Picked up": "bg-muted text-muted-foreground",
};

function VendorDashboard() {
  const role = useApp((s) => s.role);
  const vendorLogin = useApp((s) => s.vendorLogin);
  const allOrders = useApp((s) => s.orders);
  const update = useApp((s) => s.updateOrderStatus);
  const vendorAccepting = useApp((s) => s.vendorAccepting);
  const toggleAccepting = useApp((s) => s.toggleVendorAccepting);

  if (role !== "vendor" || !vendorLogin) {
    return (
      <main className="mx-auto max-w-md px-4 py-20 text-center">
        <p className="text-sm text-muted-foreground">
          You need to sign in as a vendor to view this page.
        </p>
        <Link
          to="/login"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
        >
          Go to sign in
        </Link>
      </main>
    );
  }

  const vendor = getVendor(vendorLogin)!;
  const isOpen = vendorAccepting[vendorLogin] ?? vendor.accepting;

  const orders = allOrders
    .filter((o) => o.vendorId === vendorLogin)
    .sort((a, b) => b.placedAt - a.placedAt);

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const today = orders.filter((o) => o.placedAt >= todayStart.getTime());
  const revenue = today
    .filter((o) => o.status !== "Pending") // accepted-or-after counts toward revenue
    .reduce((s, o) => s + o.total, 0);

  const counts = {
    Pending: orders.filter((o) => o.status === "Pending").length,
    Preparing: orders.filter((o) => o.status === "Preparing").length,
    Ready: orders.filter((o) => o.status === "Ready").length,
  };

  const handleAccept = (orderId: string) => {
    if (!isOpen) {
      toast.error("Open your dhaba before accepting orders.");
      return;
    }
    update(orderId, "Preparing");
    toast.success(`Order #${orderId} accepted`);
  };

  const handleReject = (orderId: string) => {
    update(orderId, "Picked up");
    toast.info(`Order #${orderId} closed without preparation`);
  };

  const handleAdvance = (orderId: string, nx: OrderStatus) => {
    update(orderId, nx);
    toast.success(`Order #${orderId} marked ${nx}`);
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <ChefHat className="h-4 w-4" /> Vendor view
          </div>
          <h1 className="mt-1 truncate font-display text-3xl font-bold sm:text-4xl">
            {vendor.name}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{vendor.tagline}</p>
        </div>

        <button
          onClick={() => {
            toggleAccepting(vendor.id);
            toast.success(isOpen ? "Dhaba closed for new orders" : "Dhaba is now open");
          }}
          className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold shadow-card transition-transform hover:-translate-y-0.5 ${
            isOpen
              ? "bg-primary text-primary-foreground shadow-warm"
              : "border border-border bg-card text-foreground"
          }`}
          aria-pressed={isOpen}
        >
          <Power className="h-4 w-4" />
          {isOpen ? "Open · Accepting orders" : "Closed · Reopen"}
        </button>
      </div>

      {/* Stat cards */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Bell className="h-4 w-4" />}
          label="To accept"
          value={counts.Pending}
          tone="primary"
        />
        <StatCard
          icon={<ChefHat className="h-4 w-4" />}
          label="Preparing"
          value={counts.Preparing}
        />
        <StatCard icon={<CheckCircle2 className="h-4 w-4" />} label="Ready" value={counts.Ready} />
        <StatCard
          icon={<Wallet className="h-4 w-4" />}
          label="Today's revenue"
          value={`Rs. ${revenue}`}
        />
      </div>

      {/* Orders list */}
      <div className="mt-8 space-y-3">
        {orders.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
            <Receipt className="mx-auto mb-3 h-6 w-6 opacity-50" />
            No orders yet. They'll show up here as they come in.
          </div>
        )}

        {orders.map((o) => {
          const nx = next[o.status];
          const isPending = o.status === "Pending";
          return (
            <article
              key={o.id}
              className="rounded-2xl border border-border bg-card p-4 shadow-card"
            >
              <div className="flex flex-wrap items-start gap-x-4 gap-y-3">
                <div className="font-display text-2xl font-bold text-primary">#{o.id}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-sm font-semibold">{o.customer}</span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${badge[o.status]}`}
                    >
                      {o.status}
                    </span>
                  </div>
                  <div className="mt-1 truncate text-xs text-muted-foreground">
                    {o.lines.map((l) => `${l.qty}× ${getItem(l.itemId)?.name}`).join(", ")}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Pickup {format12(o.pickupTime)}
                    </span>
                    <span>Rs. {o.total}</span>
                    <span>{o.payment}</span>
                  </div>
                  {o.notes && (
                    <div className="mt-2 flex gap-2 rounded-xl bg-secondary/60 p-2.5 text-xs text-secondary-foreground">
                      <MessageSquare className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" />
                      <span className="leading-snug">{o.notes}</span>
                    </div>
                  )}
                </div>

                {/* Action area */}
                <div className="flex w-full flex-wrap items-center justify-end gap-2 sm:w-auto">
                  {isPending ? (
                    <>
                      <button
                        onClick={() => handleReject(o.id)}
                        className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-bold text-muted-foreground hover:text-foreground"
                      >
                        <XCircle className="h-3.5 w-3.5" /> Decline
                      </button>
                      <button
                        onClick={() => handleAccept(o.id)}
                        className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-warm hover:-translate-y-0.5 transition-transform"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" /> Accept order
                      </button>
                    </>
                  ) : nx ? (
                    <button
                      onClick={() => handleAdvance(o.id, nx)}
                      className="rounded-full bg-foreground px-4 py-2 text-xs font-bold text-background hover:bg-foreground/90"
                    >
                      Mark {nx} →
                    </button>
                  ) : (
                    <span className="text-xs text-muted-foreground">Done</span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Switch vendor (only if multiple vendors exist for this account) */}
      {vendors.length > 1 && (
        <p className="mt-10 text-center text-xs text-muted-foreground">
          Need to switch dhabas?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Sign in as another vendor
          </Link>
        </p>
      )}
    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  tone?: "primary";
}) {
  return (
    <div
      className={`rounded-2xl border border-border bg-card p-4 ${
        tone === "primary" ? "ring-1 ring-primary/30" : ""
      }`}
    >
      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <span className={tone === "primary" ? "text-primary" : ""}>{icon}</span>
        {label}
      </div>
      <div className="mt-1 font-display text-3xl font-bold">{value}</div>
    </div>
  );
}
