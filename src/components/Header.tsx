import { Link, useRouterState } from "@tanstack/react-router";
import { useApp } from "@/store/useApp";
import { ShoppingBag, Flame } from "lucide-react";

export function Header() {
  const cartCount = useApp(s => s.cart.reduce((n, l) => n + l.qty, 0));
  const path = useRouterState({ select: s => s.location.pathname });

  const link = (to: string, label: string) => (
    <Link
      to={to}
      className={`relative px-1 py-2 text-sm font-medium transition-colors ${
        path === to ? "text-primary" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
      {path === to && (
        <span className="absolute -bottom-px left-0 right-0 h-[2px] rounded-full bg-primary" />
      )}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-warm shadow-warm">
            <Flame className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-bold">Campus Dhaba</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">GIKI · Eat fast</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {link("/", "Home")}
          {link("/quick-order", "Quick Order")}
          {link("/orders", "My Orders")}
          {link("/vendor", "Vendor")}
        </nav>

        <Link
          to="/cart"
          className="relative inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
        >
          <ShoppingBag className="h-4 w-4" />
          Cart
          {cartCount > 0 && (
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1.5 text-[11px] font-bold text-primary-foreground">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
