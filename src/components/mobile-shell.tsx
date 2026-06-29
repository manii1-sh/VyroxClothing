import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Home, LayoutGrid, Menu, Search, ShoppingBag, Store, User, X } from "lucide-react";
import { useCart } from "../lib/cart";

const MENU = [
  ["Home", "/"],
  ["Shop", "/#best"],
  ["Oversized Tees", "/#best"],
  ["Collections", "/#collections"],
  ["Gift Box", "/#join"],
  ["Track Order", "/#join"],
  ["Contact", "/#join"],
] as const;

export function MobileHeader() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  return (
    <>
      <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur md:hidden">
        <button aria-label="Open menu" onClick={() => setOpen(true)} className="p-2 -ml-2">
          <Menu className="size-5" />
        </button>
        <Link to="/" className="font-logo text-lg tracking-[0.3em] text-primary">
          VYROX<span className="text-foreground">╱</span>
        </Link>
        <div className="flex items-center gap-1">
          <button aria-label="Search" className="p-2"><Search className="size-5" /></button>
          <Link to="/checkout" aria-label="Cart" className="relative p-2">
            <ShoppingBag className="size-5" />
            {count > 0 && (
              <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 font-display text-[10px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[100] md:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 flex h-full w-[82vw] max-w-sm flex-col border-r border-border bg-background p-6 animate-[slide-in-right_0.25s_ease-out]">
            <div className="flex items-center justify-between">
              <span className="font-logo text-xl tracking-[0.3em] text-primary">VYROX╱</span>
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="p-2"><X className="size-5"/></button>
            </div>
            <nav className="mt-8 flex flex-col gap-1">
              {MENU.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="border-b border-border py-4 font-display text-lg font-bold uppercase tracking-wide hover:text-primary"
                >
                  {label}
                </a>
              ))}
            </nav>
            <p className="mt-auto pt-8 text-[10px] uppercase tracking-widest text-muted-foreground">
              Wear your attitude.
            </p>
          </aside>
        </div>
      )}
    </>
  );
}

const TABS = [
  { label: "Home", icon: Home, href: "/" as const },
  { label: "Shop", icon: Store, href: "/#best" },
  { label: "Drops", icon: LayoutGrid, href: "/#collections" },
  { label: "Wishlist", icon: Heart, href: "/#join" },
  { label: "Account", icon: User, href: "/#join" },
];

export function MobileBottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      aria-label="Primary"
    >
      {TABS.map(({ label, icon: Icon, href }) => (
        <a
          key={label}
          href={href}
          className="flex flex-col items-center justify-center gap-1 py-2 text-[9px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary"
        >
          <Icon className="size-5" />
          {label}
        </a>
      ))}
    </nav>
  );
}

export function MobileChrome() {
  return (
    <>
      <MobileHeader />
      <MobileBottomNav />
      {/* spacer so bottom nav doesn't cover content */}
      <div className="h-16 md:hidden" aria-hidden />
    </>
  );
}
