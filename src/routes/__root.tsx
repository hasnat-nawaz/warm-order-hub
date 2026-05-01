import { Outlet, Link, createRootRoute, HeadContent, Scripts, useRouter, useRouterState } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { useApp } from "@/store/useApp";
import { Toaster } from "@/components/ui/sonner";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

import appCss from "../styles.css?url";

function LoadingOverlay({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="route-loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="fixed inset-0 z-[60] grid place-items-center bg-background/70 backdrop-blur-md"
          aria-label="Loading"
          role="status"
          aria-live="polite"
        >
          <motion.div
            initial={{ y: 6, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="flex flex-col items-center gap-4 rounded-3xl border border-border bg-card px-6 py-5 shadow-card"
          >
            {/* Burger animation (pure CSS via motion + Tailwind) */}
            <div className="relative h-16 w-16">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="absolute left-1/2 top-1 h-3 w-12 -translate-x-1/2 rounded-full bg-accent shadow-sm" />
                <div className="absolute left-1/2 top-[18px] h-2 w-11 -translate-x-1/2 rounded-full bg-success/70" />
                <div className="absolute left-1/2 top-[28px] h-2.5 w-12 -translate-x-1/2 rounded-full bg-warning/80" />
                <div className="absolute left-1/2 top-[38px] h-3 w-12 -translate-x-1/2 rounded-full bg-primary/90 shadow-sm" />
                <div className="absolute left-1/2 top-[52px] h-3 w-12 -translate-x-1/2 rounded-full bg-accent shadow-sm" />
              </motion.div>
              <motion.div
                className="absolute -bottom-2 left-1/2 h-2.5 w-14 -translate-x-1/2 rounded-full bg-foreground/10"
                animate={{ scaleX: [0.9, 1.05, 0.9], opacity: [0.35, 0.18, 0.35] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <div className="text-center">
              <p className="text-sm font-bold text-foreground">Loading…</p>
              <p className="mt-1 text-xs text-muted-foreground">Cooking up your next page</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for has wandered off the menu.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Back to dhabas
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Campus Dhaba — Skip the queue, eat on time" },
      {
        name: "description",
        content:
          "Pre-order food from GIKI campus dhabas. Pick a vendor, choose a pickup time, and skip the rush.",
      },
      { property: "og:title", content: "Campus Dhaba" },
      { property: "og:description", content: "Pre-order food from GIKI campus dhabas." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700;9..144,900&family=Inter:wght@400;500;600;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const cart = useApp((s) => s.cart);
  const router = useRouter();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const routerStatus = useRouterState({ select: (s) => (s as any).status as string | undefined });
  const [showBoot, setShowBoot] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setShowBoot(false), 550);
    return () => window.clearTimeout(t);
  }, []);

  const isRoutePending = useMemo(() => routerStatus === "pending", [routerStatus]);
  const showLoading = showBoot || isRoutePending;

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      // If the user clicks outside the toaster area, dismiss any visible toasts.
      // This makes popups feel less "sticky" and matches the request to close
      // when clicking elsewhere.
      if (target && target.closest(".toaster")) return;
      toast.dismiss();
    };
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, []);

  // Always land on the home page on first load (even if the user refreshes on a deep link).
  useEffect(() => {
    if (path !== "/") {
      router.navigate({ to: "/", replace: true });
    }
    // Intentionally run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When navigating to a new page, start at the top.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [path]);

  return (
    <div className="min-h-screen bg-background">
      <LoadingOverlay show={showLoading} />
      <Header />
      <Outlet />
      <Toaster richColors position="top-center" expand />
      {cart.length > 0 && path !== "/cart" && path !== "/login" && (
        <Link
          to="/cart"
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow-warm transition-transform hover:-translate-y-0.5"
        >
          Go to cart
        </Link>
      )}
    </div>
  );
}
