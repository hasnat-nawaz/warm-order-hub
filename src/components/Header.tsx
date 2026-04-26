import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useApp, formatDate12 } from "@/store/useApp";
import { vendors } from "@/data/menu";
import { ShoppingBag, Flame, Menu, X, LogIn, LogOut, ChefHat, User, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useNow } from "@/hooks/use-now";

type NavLink = { to: string; label: string };

const customerLinks: NavLink[] = [
  { to: "/", label: "Home" },
  { to: "/quick-order", label: "Quick Order" },
  { to: "/orders", label: "My Orders" },
];

const vendorLinks: NavLink[] = [{ to: "/vendor", label: "Dashboard" }];

const guestLinks: NavLink[] = [
  { to: "/", label: "Home" },
  { to: "/quick-order", label: "Quick Order" },
];

export function Header() {
  const cartCount = useApp((s) => s.cart.reduce((n, l) => n + l.qty, 0));
  const role = useApp((s) => s.role);
  const vendorLogin = useApp((s) => s.vendorLogin);
  const customer = useApp((s) => s.customer);
  const logout = useApp((s) => s.logout);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const now = useNow(30_000);

  const [open, setOpen] = useState(false);
  // Close mobile menu on route change.
  useEffect(() => setOpen(false), [path]);

  const links = role === "vendor" ? vendorLinks : role === "customer" ? customerLinks : guestLinks;

  const isVendor = role === "vendor";

  const handleSignOut = () => {
    logout();
    navigate({ to: "/" });
  };

  const renderLink = (l: NavLink, mobile = false) => {
    const active = path === l.to || (l.to !== "/" && path.startsWith(l.to));
    return (
      <Link
        key={l.to}
        to={l.to}
        className={
          mobile
            ? `block rounded-xl px-3 py-2.5 text-base font-medium transition-colors ${
                active ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary"
              }`
            : `relative px-1 py-2 text-sm font-medium transition-colors ${
                active ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`
        }
      >
        {l.label}
        {!mobile && active && (
          <span className="absolute -bottom-px left-0 right-0 h-[2px] rounded-full bg-primary" />
        )}
      </Link>
    );
  };

  const vendorName = vendors.find((v) => v.id === vendorLogin)?.name;

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link to={isVendor ? "/vendor" : "/"} className="flex items-center gap-2 min-w-0">
          <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl bg-gradient-warm shadow-warm">
            <Flame className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <div className="min-w-0 leading-tight">
            <div className="truncate font-display text-lg font-bold">Campus Dhaba</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {isVendor ? "Vendor Console" : "GIKI · Eat fast"}
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">{links.map((l) => renderLink(l))}</nav>

        <div className="flex items-center gap-2">
          {/* Live clock — visible from sm up. Helps customers pick a pickup time. */}
          <div
            aria-label="Current time"
            className="hidden items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground sm:inline-flex"
          >
            <Clock className="h-3.5 w-3.5 text-primary" />
            <span className="tabular-nums">{formatDate12(now)}</span>
          </div>

          {/* Customer-only cart pill */}
          {!isVendor && (
            <Link
              to="/cart"
              className="relative inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-2 text-sm font-medium text-background transition-transform hover:-translate-y-0.5 sm:px-4"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1.5 text-[11px] font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          {/* Sign in / out (desktop) */}
          {role ? (
            <button
              onClick={handleSignOut}
              className="hidden items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-secondary md:inline-flex"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          ) : (
            <Link
              to="/login"
              className="hidden items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20 md:inline-flex"
            >
              <LogIn className="h-3.5 w-3.5" /> Sign in
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-card text-foreground md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto max-w-6xl space-y-3 px-4 py-4 sm:px-6">
            {/* Status row */}
            <div className="flex items-center justify-between rounded-2xl border border-border bg-card px-3 py-2.5">
              <div className="flex items-center gap-2 text-sm font-semibold">
                {isVendor ? (
                  <ChefHat className="h-4 w-4 text-primary" />
                ) : role === "customer" ? (
                  <User className="h-4 w-4 text-primary" />
                ) : (
                  <User className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="truncate">
                  {isVendor ? (vendorName ?? "Vendor") : role === "customer" ? customer : "Guest"}
                </span>
              </div>
              <div className="inline-flex items-center gap-1 text-xs text-muted-foreground tabular-nums">
                <Clock className="h-3 w-3" />
                {formatDate12(now)}
              </div>
            </div>

            <nav className="flex flex-col gap-1">{links.map((l) => renderLink(l, true))}</nav>

            <div className="pt-2">
              {role ? (
                <button
                  onClick={handleSignOut}
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-border bg-card px-3 py-2 text-sm font-semibold text-foreground"
                >
                  <LogOut className="h-4 w-4" /> Sign out
                </button>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-primary px-3 py-2.5 text-sm font-bold text-primary-foreground"
                >
                  <LogIn className="h-4 w-4" /> Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
