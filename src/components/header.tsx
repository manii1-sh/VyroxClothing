import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "../lib/cart";

const MENU_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Collections", to: "/collections" },
  { label: "Contact", to: "/contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { count } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine header classes based on route and scroll state
  const headerClass = isHome
    ? scrolled
      ? "fixed inset-x-0 top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border transition-all duration-300"
      : "absolute inset-x-0 top-0 z-50 bg-transparent border-b border-transparent transition-all duration-300"
    : "sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border";

  return (
    <>
      {/* Desktop & Mobile Header Container */}
      <header className={headerClass}>
        {showSearch ? (
          <div className="mx-auto flex max-w-[1500px] h-[61px] md:h-[81px] items-center px-4 md:px-9">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  navigate({ to: "/shop", search: { search: searchQuery.trim() } });
                  setShowSearch(false);
                  setSearchQuery("");
                }
              }}
              className="flex w-full items-center gap-3"
            >
              <Search className="size-4 md:size-5 text-muted-foreground" />
              <input
                type="text"
                autoFocus
                placeholder="SEARCH STREETWEAR..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 flex-1 bg-transparent text-xs md:text-sm font-bold uppercase tracking-widest outline-none border-b border-border focus:border-primary transition-colors"
              />
              <button 
                type="button" 
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery("");
                }}
                className="p-2 text-foreground hover:text-primary"
                aria-label="Close search"
              >
                <X className="size-4 md:size-5" />
              </button>
            </form>
          </div>
        ) : (
          <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-4 py-3 md:px-9 md:py-5">
            
            {/* Mobile Menu Button */}
            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="p-2 -ml-2 text-foreground hover:text-primary md:hidden"
            >
              <Menu className="size-5" />
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="font-logo text-xl tracking-[0.3em] text-primary sm:text-2xl md:tracking-[0.35em]"
            >
              VYROX<span className="text-foreground">╱</span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden items-center gap-8 text-[10px] font-semibold uppercase tracking-widest md:flex">
              {MENU_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  activeProps={{ className: "text-primary" }}
                  inactiveProps={{ className: "text-foreground hover:text-primary" }}
                  className="transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Actions (Search, Cart, Shop Button) */}
            <div className="flex items-center gap-1 sm:gap-3">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Search"
                onClick={() => setShowSearch(true)}
                className="text-foreground hover:text-primary"
              >
                <Search className="size-4 md:size-5" />
              </Button>
              
              {/* Cart Button */}
              <Link
                to="/checkout"
                aria-label="Shopping bag"
                className="relative inline-grid size-9 place-items-center text-foreground hover:text-primary"
              >
                <ShoppingBag className="size-4 md:size-5" />
                {count > 0 && (
                  <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 font-display text-[10px] font-bold text-primary-foreground">
                    {count}
                  </span>
                )}
              </Link>

              <Link to="/shop" className="hidden sm:inline-flex">
                <Button size="sm" className="h-9">Shop Now</Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer Navigation */}
      {open && (
        <div className="fixed inset-0 z-[100] md:hidden" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            onClick={() => setOpen(false)}
          />
          
          {/* Drawer Panel */}
          <aside className="absolute left-0 top-0 flex h-full w-[80vw] max-w-sm flex-col border-r border-border bg-background p-6 shadow-2xl transition-transform duration-300">
            <div className="flex items-center justify-between">
              <span className="font-logo text-xl tracking-[0.3em] text-primary">VYROX╱</span>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="p-2 text-foreground hover:text-primary"
              >
                <X className="size-5" />
              </button>
            </div>
            
            <nav className="mt-8 flex flex-col gap-1">
              {MENU_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  activeProps={{ className: "text-primary border-primary" }}
                  inactiveProps={{ className: "text-foreground border-border hover:text-primary" }}
                  className="border-b py-4 font-display text-lg font-bold uppercase tracking-wide transition-colors"
                >
                  {item.label}
                </Link>
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
