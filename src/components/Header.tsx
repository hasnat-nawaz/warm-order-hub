import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useApp } from "@/store/useApp";
import { vendors } from "@/data/menu";
import { ShoppingBag, Flame, Menu, X, LogIn, LogOut, ChefHat, User } from "lucide-react";
import { useEffect, useState } from "react";

type NavLink = { to: string; label: string };

const customerLinks: NavLink[] = [
  { to: "/", label: "Home" },
  { to: "/quick-order", label: "Quick Order" },
  { to: "/orders", label: "My Orders" },
];

const vendorLinks: NavLink[] = [
  { to: "/vendor", label: "Dashboard" },
  { to: "/manage", label: "Manage" },
];

const guestLinks: NavLink[] = [
  { to: "/", label: "Home" },
  { to: "/quick-order", label: "Quick Order" },
];

/**
 * Profile chip: dark circular avatar with default user icon + username.
 * Sized smaller in mobile drawer ("compact" variant) for layout density.
 */
function ProfileChip({
  name,
  isVendor,
  compact = false,
}: {
  name: string;
  isVendor: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-border bg-card text-foreground ${
        compact ? "px-2 py-1.5 text-xs" : "px-2 py-1.5 text-sm"
      }`}
      aria-label={`Signed in as ${name}`}
    >
      <span
        className={`grid place-items-center rounded-full bg-foreground text-background ${
          compact ? "h-6 w-6" : "h-7 w-7"
        }`}
      >
        {isVendor ? (
          <ChefHat className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} strokeWidth={2.5} />
        ) : (
          <User className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} strokeWidth={2.5} />
        )}
      </span>
      <span className="max-w-[8rem] truncate font-semibold sm:max-w-[12rem]">{name}</span>
    </div>
  );
}

export function Header() {
  const cartCount = useApp((s) => s.cart.reduce((n, l) => n + l.qty, 0));
  const role = useApp((s) => s.role);
  const vendorLogin = useApp((s) => s.vendorLogin);
  const displayName = useApp((s) => s.displayName);
  const customer = useApp((s) => s.customer);
  const logout = useApp((s) => s.logout);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);

  const links = role === "vendor" ? vendorLinks : role === "customer" ? customerLinks : guestLinks;

  const isVendor = role === "vendor";
  const profileName =
    displayName ??
    (isVendor
      ? (vendors.find((v) => v.id === vendorLogin)?.name ?? "Vendor")
      : role === "customer"
        ? customer
        : "Guest");

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

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link to={isVendor ? "/vendor" : "/"} className="flex min-w-0 items-center gap-2">
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

          {/* Profile + Sign out (desktop) */}
          {role ? (
            <div className="hidden items-center gap-2 md:flex">
              <ProfileChip name={profileName} isVendor={isVendor} />
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                <LogOut className="h-3.5 w-3.5" /> Sign out
              </button>
            </div>
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
            {/* Profile row */}
            {role ? (
              <div className="flex items-center justify-between gap-3">
                <ProfileChip name={profileName} isVendor={isVendor} compact />
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground"
                >
                  <LogOut className="h-3.5 w-3.5" /> Sign out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-primary px-3 py-2.5 text-sm font-bold text-primary-foreground"
              >
                <LogIn className="h-4 w-4" /> Sign in
              </Link>
            )}

            <nav className="flex flex-col gap-1">{links.map((l) => renderLink(l, true))}</nav>
          </div>
        </div>
      )}
    </header>
  );
}
