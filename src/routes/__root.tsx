import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Home, Store, LayoutGrid, ShoppingBag, Headphones } from "lucide-react";

import appCss from "../styles.css?url";
import { reportError } from "../lib/error-reporting";
import { CartProvider, useCart } from "../lib/cart";
import { Toaster } from "../components/ui/sonner";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "VYROX — Wear Your Attitude" },
      { name: "description", content: "Premium oversized streetwear for those who make a statement. Discover the latest VYROX drop." },
      { name: "author", content: "VYROX" },
      { property: "og:title", content: "VYROX — Wear Your Attitude" },
      { property: "og:description", content: "Premium oversized streetwear for those who make a statement." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "theme-color", content: "#050505" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      // DNS prefetch speeds up Google Fonts resolution
      { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
      { rel: "dns-prefetch", href: "https://fonts.gstatic.com" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      // Reduced font weights — only what's used
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=IBM+Plex+Sans:wght@400;500&family=Orbitron:wght@700&display=swap" },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
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

function MobileBottomNav() {
  const { count } = useCart();

  const tabs = [
    { label: "Home", icon: Home, to: "/", hasBadge: false },
    { label: "Shop", icon: Store, to: "/shop", hasBadge: false },
    { label: "Drops", icon: LayoutGrid, to: "/collections", hasBadge: false },
    { label: "Contact", icon: Headphones, to: "/contact", hasBadge: false },
    { label: "Cart", icon: ShoppingBag, to: "/checkout", hasBadge: true },
  ] as const;

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      aria-label="Primary Mobile Navigation"
    >
      {tabs.map(({ label, icon: Icon, to, hasBadge }) => (
        <Link
          key={label}
          to={to}
          activeProps={{ className: "text-primary" }}
          inactiveProps={{ className: "text-muted-foreground" }}
          className="relative flex flex-col items-center justify-center gap-1 py-2 text-[9px] font-bold uppercase tracking-widest transition-colors"
        >
          <Icon className="size-5" />
          <span>{label}</span>
          {hasBadge && count > 0 && (
            <span className="absolute right-[20%] top-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 font-display text-[9px] font-bold text-primary-foreground">
              {count}
            </span>
          )}
        </Link>
      ))}
    </nav>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-1">
            <Outlet />
          </div>
          <Footer />
          <MobileBottomNav />
          {/* Spacer for mobile bottom nav */}
          <div className="h-16 md:hidden" aria-hidden />
        </div>
        <Toaster position="top-center" />
      </CartProvider>
    </QueryClientProvider>
  );
}

