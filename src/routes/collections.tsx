import { createFileRoute, Link } from "@tanstack/react-router";
import collectionsImage from "../assets/vyrox-collections.jpg";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — VYROX" },
      { name: "description", content: "Explore the VYROX Streetwear collections: Oversized Tees, Premium Tees, Accessories, and Gift Boxes." },
    ],
  }),
  component: CollectionsPage,
});

const COLLECTIONS = [
  {
    name: "OVERSIZED TEES",
    description: "Heavyweight 240 GSM drop shoulder tees designed for maximum comfort and style.",
    searchParams: { category: "t-shirts", search: "oversized" },
  },
  {
    name: "PREMIUM TEES",
    description: "Sleek, refined fits in washed and garment-dyed premium fabrics.",
    searchParams: { category: "t-shirts", search: "premium" },
  },
  {
    name: "ACCESSORIES",
    description: "Complete your look with our upcoming limited edition drops.",
    searchParams: { category: "accessories" },
  },
  {
    name: "GIFT BOX",
    description: "Curated combos and custom packaging for the ultimate streetwear gift.",
    searchParams: { category: "combos" },
  },
];

function CollectionsPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="section-shell py-8 md:py-16 pb-32">
        
        {/* Page Header */}
        <div className="mb-12 text-center md:text-left">
          <p className="section-kicker">CURATED DROPS</p>
          <h1 className="section-title mt-1">
            Explore <span className="text-primary">Collections</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-xl">
            Discover our curated streetwear capsules. Each collection represents a unique attitude and aesthetic.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {COLLECTIONS.map((col, index) => (
            <Link
              key={col.name}
              to="/shop"
              search={col.searchParams}
              className="group relative aspect-[16/10] overflow-hidden border border-border bg-card cursor-pointer"
            >
              {/* Image with horizontal slice offset */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={collectionsImage}
                  alt={col.name}
                  loading="lazy"
                  className="h-full w-[400%] max-w-none object-cover opacity-75 transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-90"
                  style={{ transform: `translateX(-${index * 25}%)` }}
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent transition-opacity duration-300 group-hover:opacity-80" />
              </div>

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col justify-end">
                <p className="text-[10px] font-bold tracking-widest text-primary mb-1 uppercase">Capsule {index + 1}</p>
                <h2 className="font-display text-2xl md:text-3xl font-black uppercase tracking-wide group-hover:text-primary transition-colors">
                  {col.name}
                </h2>
                <p className="mt-2 text-xs text-muted-foreground max-w-md line-clamp-2 md:line-clamp-none transition-colors group-hover:text-foreground">
                  {col.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-[10px] font-bold tracking-widest text-primary uppercase">
                  <span>Explore Drop</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
