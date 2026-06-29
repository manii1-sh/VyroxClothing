import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, Heart, Minus, Plus, Ruler, ShieldCheck, Share2, ShoppingBag, Truck, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { toast } from "sonner";
import { getProduct, PRODUCTS, SIZES, SIZE_CHART } from "../lib/products";
import { useCart } from "../lib/cart";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — VYROX` },
          { name: "description", content: loaderData.product.tagline },
          { property: "og:title", content: `${loaderData.product.name} — VYROX` },
          { property: "og:description", content: loaderData.product.tagline },
        ]
      : [],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const navigate = useNavigate();
  const { add } = useCart();
  const [size, setSize] = useState("L");
  const [qty, setQty] = useState(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const addToCart = () => {
    add({ slug: product.slug, name: product.name, price: product.priceValue, size, qty });
    toast.success(`Added ${product.name} (${size}) to cart`);
  };

  const buyNow = () => {
    add({ slug: product.slug, name: product.name, price: product.priceValue, size, qty });
    navigate({ to: "/checkout" });
  };

  return (
    <main className="bg-background text-foreground">
      <div className="section-shell pt-6 md:pt-10 pb-32 md:pb-16">
        <Link to="/shop" className="mb-6 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary">
          <ChevronLeft className="size-4" /> Back to shop
        </Link>


        <div className="grid gap-8 md:grid-cols-[5fr_7fr] lg:grid-cols-[4.5fr_7.5fr] md:gap-12 items-start">
          {/* Gallery — single image only */}
          <div 
            onClick={() => setIsLightboxOpen(true)}
            className="relative aspect-[4/5] overflow-hidden border border-border bg-card cursor-zoom-in group/gallery"
          >
            <img
              src={product.image}
              alt={product.name}
              width={800}
              height={1000}
              className="h-full w-full object-cover transition-transform duration-500 group-hover/gallery:scale-[1.02]"
            />
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toast.success("Added to wishlist");
              }}
              aria-label="Wishlist" 
              className="absolute right-3 top-3 grid size-10 place-items-center border border-border bg-background/80 backdrop-blur hover:text-primary transition-colors"
            >
              <Heart className="size-4" />
            </button>
          </div>

          {/* Details */}
          <div>
            <p className="section-kicker">New Drop</p>
            <h1 className="section-title mt-2">{product.name}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{product.tagline}</p>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-display text-3xl font-black">{product.price}</span>
              <span className="text-xs text-muted-foreground line-through">₹1,299</span>
              <span className="font-display text-xs font-bold uppercase text-primary">31% Off</span>
            </div>

            {/* Size */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <p className="font-display text-xs font-bold uppercase tracking-widest">Select Size</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-primary hover:underline">
                      <Ruler className="size-3" /> Size Chart
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-card">
                    <DialogHeader>
                      <DialogTitle className="font-display uppercase">Size Chart (inches)</DialogTitle>
                    </DialogHeader>
                    <table className="w-full border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-border text-left">
                          <th className="py-2">Size</th><th>Chest</th><th>Length</th><th>Shoulder</th>
                        </tr>
                      </thead>
                      <tbody>
                        {SIZE_CHART.map((row) => (
                          <tr key={row.size} className="border-b border-border/60">
                            <td className="py-2 font-bold">{row.size}</td>
                            <td>{row.chest}"</td>
                            <td>{row.length}"</td>
                            <td>{row.shoulder}"</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="mt-2 text-[11px] text-muted-foreground">Oversized fit. We recommend your usual size for a relaxed drop, or size down for a closer fit.</p>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`grid h-11 min-w-11 place-items-center border px-3 font-display text-sm font-bold ${size === s ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty */}
            <div className="mt-6">
              <p className="font-display text-xs font-bold uppercase tracking-widest">Quantity</p>
              <div className="mt-2 inline-flex items-center border border-border">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease" className="grid size-11 place-items-center hover:text-primary"><Minus className="size-4"/></button>
                <span className="w-10 text-center font-display text-base font-bold">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} aria-label="Increase" className="grid size-11 place-items-center hover:text-primary"><Plus className="size-4"/></button>
              </div>
            </div>

            {/* Desktop actions */}
            <div className="mt-7 hidden gap-3 md:flex">
              <Button onClick={addToCart} variant="outline" className="h-12 flex-1 px-7"><ShoppingBag className="mr-2 size-4"/>Add to Cart</Button>
              <Button onClick={buyNow} className="h-12 flex-1 px-7">Buy Now</Button>
              <Button variant="ghost" size="icon" aria-label="Share"><Share2 className="size-4"/></Button>
            </div>

            {/* Trust */}
            <ul className="mt-6 grid grid-cols-2 gap-3 text-[11px] text-muted-foreground">
              <li className="flex items-center gap-2"><Truck className="size-4 text-primary"/>Free shipping over ₹999</li>
              <li className="flex items-center gap-2"><ShieldCheck className="size-4 text-primary"/>100% Original Products</li>
            </ul>

            {/* Accordion */}
            <Accordion type="single" collapsible className="mt-8">
              <AccordionItem value="desc">
                <AccordionTrigger className="font-display uppercase">Description</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{product.description}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="fabric">
                <AccordionTrigger className="font-display uppercase">Fabric &amp; Care</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{product.fabric}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* You may also like */}
        <section className="mt-16">
          <h2 className="section-title mb-6">You may <span className="text-primary">also like</span></h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 4).map((p) => (
              <Link key={p.slug} to="/product/$slug" params={{ slug: p.slug }} className="group block overflow-hidden border border-border bg-card">
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-border p-4">
                  <div className="min-w-0">
                    <h3 className="truncate text-xs">{p.name}</h3>
                    <p className="mt-1 text-xs">{p.price}</p>
                  </div>
                  <ShoppingBag className="size-4 shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Mobile sticky buy bar */}
      <div className="fixed inset-x-0 bottom-16 z-40 grid grid-cols-2 gap-2 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden">
        <Button onClick={addToCart} variant="outline" className="h-12">Add to Cart</Button>
        <Button onClick={buyNow} className="h-12">Buy Now · {product.price}</Button>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center cursor-zoom-out"
        >
          <button 
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 z-[110] text-white hover:text-primary transition-colors size-10 flex items-center justify-center"
            aria-label="Close preview"
          >
            <X className="size-6" />
          </button>
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[92vh] max-w-[92vw] object-contain select-none pointer-events-none"
          />
        </div>
      )}
    </main>
  );
}
