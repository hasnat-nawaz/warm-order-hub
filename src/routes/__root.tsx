import { Outlet, Link, createRootRoute, HeadContent, Scripts, useRouter, useRouterState } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { useApp } from "@/store/useApp";
import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import { toast } from "sonner";

import appCss from "../styles.css?url";

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
