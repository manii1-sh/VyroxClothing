import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { z } from "zod";
import { Search, ShoppingBag, SlidersHorizontal, Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";
import { PRODUCTS } from "../lib/products";
import { useCart } from "../lib/cart";
import { toast } from "sonner";

// Define search parameters validation schema using Zod
const shopSearchSchema = z.object({
  category: z.string().catch("").optional(),
  search: z.string().catch("").optional(),
  sort: z.string().catch("").optional(),
});

type ShopSearch = z.infer<typeof shopSearchSchema>;

export const Route = createFileRoute("/shop")({
  validateSearch: (search) => shopSearchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Shop Streetwear — VYROX" },
      { name: "description", content: "Explore the latest VYROX streetwear collection. Premium oversized tees, limited drops, and more." },
    ],
  }),
  component: ShopPage,
});

const CATEGORIES = [
  { label: "All", value: "" },
  { label: "T-Shirts", value: "t-shirts" },
  { label: "Accessories", value: "accessories" },
  { label: "Combos", value: "combos" },
];

const SORT_OPTIONS = [
  { label: "Featured", value: "" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A-Z", value: "name-asc" },
];

function ShopPage() {
  const { category = "", search = "", sort = "" } = Route.useSearch() as ShopSearch;
  const navigate = useNavigate({ from: Route.fullPath });
  const { add } = useCart();

  // Handle updating search parameters
  const updateSearch = (params: Partial<ShopSearch>) => {
    navigate({
      search: (prev) => ({
        ...prev,
        ...params,
      }),
    });
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // 1. Category Filter
    if (category === "t-shirts") {
      result = result.filter((p) => p.name.toLowerCase().includes("tee"));
    } else if (category === "accessories") {
      result = result.filter((p) => p.name.toLowerCase().includes("accessory") || p.category === "accessories");
    } else if (category === "combos") {
      result = result.filter((p) => p.name.toLowerCase().includes("combo") || p.category === "combos");
    }

    // 2. Search Filter
    if (search.trim()) {
      const query = search.toLowerCase().trim();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(query) || p.tagline.toLowerCase().includes(query)
      );
    }

    // 3. Sorting
    if (sort === "price-asc") {
      result.sort((a, b) => a.priceValue - b.priceValue);
    } else if (sort === "price-desc") {
      result.sort((a, b) => b.priceValue - a.priceValue);
    } else if (sort === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [category, search, sort]);

  const handleAddToCart = (e: React.MouseEvent, p: typeof PRODUCTS[0]) => {
    e.preventDefault(); // Prevent navigating to product detail
    add({ slug: p.slug, name: p.name, price: p.priceValue, size: "L", qty: 1 });
    toast.success(`Added ${p.name} (L) to cart`);
  };

  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="section-shell py-8 md:py-16 pb-32">
        
        {/* Page Header */}
        <div className="mb-10 text-center md:text-left">
          <p className="section-kicker">VYROX CATALOG</p>
          <h1 className="section-title mt-1">
            Shop <span className="text-primary">Streetwear</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-xl">
            Premium heavyweight fabrics, bold graphics, and relaxed fits designed to make a statement.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
          
          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                onClick={() => updateSearch({ category: cat.value })}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border transition-all shrink-0 ${
                  category === cat.value
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-primary text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => updateSearch({ search: e.target.value })}
                className="h-10 w-full border border-border bg-card pl-9 pr-4 text-xs tracking-wider uppercase outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => updateSearch({ sort: e.target.value })}
                className="h-10 w-full appearance-none border border-border bg-card px-4 pr-10 text-xs font-bold uppercase tracking-widest outline-none focus:border-primary cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <SlidersHorizontal className="size-3" />
              </div>
            </div>
          </div>
        </div>

        {/* Product count */}
        <div className="mt-6 text-right text-[10px] uppercase tracking-widest text-muted-foreground">
          Showing {filteredProducts.length} product{filteredProducts.length === 1 ? "" : "s"}
        </div>

        {/* Products Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((p) => (
              <Link
                key={p.slug}
                to="/product/$slug"
                params={{ slug: p.slug }}
                className="group block overflow-hidden border border-border bg-card transition-all hover:border-primary"
              >
                {/* Product Image */}
                <div className="aspect-[4/5] overflow-hidden relative bg-neutral-900">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                {/* Product Info */}
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-border p-4">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold group-hover:text-primary transition-colors">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-sm font-bold text-primary">{p.price}</p>
                  </div>
                  <ShoppingBag className="size-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Premium Empty State / Coming Soon Teaser */
          <div className="mt-12 border border-border bg-card p-12 text-center max-w-2xl mx-auto">
            <div className="inline-flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
              <Sparkles className="size-6 animate-pulse" />
            </div>
            <h3 className="font-display text-2xl font-black uppercase tracking-wide">
              {category === "accessories" || category === "combos"
                ? `The ${category} drop is coming soon`
                : "No Products Found"}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
              {category === "accessories" || category === "combos"
                ? "We are currently finalizing our premium limited-edition release. Join the movement to get early access and notifications."
                : "We couldn't find any products matching your search query. Try adjusting your search term or filters."}
            </p>

            {(category === "accessories" || category === "combos") && (
              <form
                className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.success("Subscribed! We will notify you of the next drop.");
                }}
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="h-10 flex-1 border border-border bg-background/80 px-4 text-xs outline-none focus:border-primary uppercase tracking-wider"
                />
                <Button type="submit" className="h-10 px-6 font-display font-bold text-xs tracking-wider">
                  Notify Me
                </Button>
              </form>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
