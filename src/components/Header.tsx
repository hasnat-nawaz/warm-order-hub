import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useApp } from "@/store/useApp";
import { vendors } from "@/data/menu";
import { ShoppingBag, Flame, Menu, X, LogIn, LogOut, ChefHat, User } from "lucide-react";
import { forwardRef, useEffect, useState, useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

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
 * Rendered inside a DropdownMenuTrigger so the whole pill is clickable —
 * tapping it reveals the sign-out action (no separate "Sign out" button
 * crowds the header).
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
  const base = `inline-flex items-center gap-2 rounded-full border border-border bg-card text-foreground ${compact ? "px-2 py-1.5 text-xs" : "px-2 py-1.5 text-sm"
    }`;
  return (
    <div className={base} aria-label={`Signed in as ${name}`}>
      <span
        className={`grid place-items-center rounded-full bg-foreground text-background ${compact ? "h-6 w-6" : "h-7 w-7"
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

const ProfileChipTrigger = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    name: string;
    isVendor: boolean;
    compact?: boolean;
  }
>(function ProfileChipTrigger({ name, isVendor, compact = false, className, ...props }, ref) {
  const base = cn(
    "inline-flex items-center justify-center rounded-full md:border md:border-border md:bg-card md:text-foreground md:transition-colors md:hover:bg-secondary md:gap-2",
    compact ? "md:px-2 md:py-1.5 md:text-xs" : "md:px-2 md:py-1.5 md:text-sm",
    "h-10 w-10 bg-foreground text-background shadow-warm ring-1 ring-black/5 transition-transform hover:-translate-y-0.5 active:translate-y-0 md:h-auto md:w-auto md:shadow-none md:ring-0 md:hover:translate-y-0 md:active:translate-y-0",
    className,
  );
  return (
    <button
      ref={ref}
      type="button"
      className={base}
      aria-label={`Account menu for ${name}`}
      {...props}
    >
      <span
        className={cn(
          "grid place-items-center rounded-full flex-shrink-0",
          "md:bg-foreground md:text-background",
          compact ? "md:h-6 md:w-6" : "md:h-7 md:w-7"
        )}
      >
        {isVendor ? (
          <ChefHat className="h-5 w-5 md:h-3 md:w-3" strokeWidth={2.5} />
        ) : (
          <User className="h-5 w-5 md:h-3 md:w-3" strokeWidth={2.5} />
        )}
      </span>
      <span className="hidden md:block max-w-[8rem] truncate font-semibold sm:max-w-[12rem]">{name}</span>
    </button>
  );
});

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
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (open && headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

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
            ? `block rounded-xl px-3 py-2.5 text-base font-medium transition-colors ${active ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary"
            }`
            : `relative px-1 py-2 text-sm font-medium transition-colors ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"
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

  /**
   * Reusable account dropdown — the only place the user can sign out.
   * Sign out item is in destructive red to match the rest of the app's
   * "danger" affordances (cancel order, decline, etc.).
   */
  const AccountDropdown = ({ compact = false }: { compact?: boolean }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ProfileChipTrigger name={profileName} isVendor={isVendor} compact={compact} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="px-3 py-2">
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Signed in as
          </div>
          <div className="mt-0.5 truncate text-sm font-bold text-foreground">{profileName}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            handleSignOut();
          }}
          className="font-bold text-destructive focus:bg-destructive/10 focus:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <>
    {/* Spacer to offset fixed header height */}
    <div className="h-16" />
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl"
    >
      <div className="relative flex h-16 w-full items-center justify-between gap-3 px-4 sm:px-6 md:px-8">
        <div className="flex items-center gap-4 md:flex-1">
          {/* Mobile menu toggle */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full bg-foreground text-background shadow-warm ring-1 ring-black/5 transition-transform hover:-translate-y-0.5 active:translate-y-0 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Desktop Logo */}
          <Link to={isVendor ? "/vendor" : "/"} className="hidden min-w-0 items-center gap-2 md:flex">
            <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-gradient-warm shadow-warm">
              <Flame className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <div className="min-w-0 leading-tight">
              <div className="truncate font-display text-lg font-bold">Campus Dhaba</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {isVendor ? "Vendor Console" : "GIKI · Eat fast"}
              </div>
            </div>
          </Link>
        </div>

        {/* Center Container */}
        <div className="flex items-center justify-center">
          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">{links.map((l) => renderLink(l))}</nav>

          {/* Mobile Logo Text */}
          <Link to={isVendor ? "/vendor" : "/"} className="flex flex-col items-center justify-center md:hidden">
            <div className="font-display text-lg font-bold leading-tight text-foreground">Campus Dhaba</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mt-0.5">
              {isVendor ? "Vendor Console" : "GIKI · Eat fast"}
            </div>
          </Link>
        </div>

        <div className="flex items-center justify-end gap-3 md:flex-1">
          {/* Customer-only cart — icon-only takeout-bag for a food-first feel */}
          {!isVendor && (
            <Link
              to="/cart"
              aria-label={cartCount > 0 ? `Cart, ${cartCount} items` : "Cart"}
              className="relative grid h-10 w-10 place-items-center rounded-full bg-foreground text-background shadow-warm ring-1 ring-black/5 transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={2.25} />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground ring-2 ring-background">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          {/* Account */}
          {role ? (
            <AccountDropdown compact />
          ) : (
            <>
              {/* Desktop signin */}
              <Link
                to="/login"
                className="hidden items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20 md:inline-flex"
              >
                <LogIn className="h-3.5 w-3.5" /> Sign in
              </Link>
              {/* Mobile signin */}
              <Link
                to="/login"
                className="grid h-10 w-10 place-items-center rounded-full bg-foreground text-background shadow-warm ring-1 ring-black/5 transition-transform hover:-translate-y-0.5 active:translate-y-0 md:hidden"
              >
                <LogIn className="h-5 w-5" />
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur-xl md:hidden">
          <div className="space-y-3 px-4 py-4 sm:px-6">
            <nav className="flex flex-col gap-1">
              {links.map((l) => (
                <div key={l.to} onClick={() => setOpen(false)}>
                  {renderLink(l, true)}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
    </>
  );
}
