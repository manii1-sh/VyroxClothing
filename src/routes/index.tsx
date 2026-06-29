import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Box, Instagram, Lock, ShieldCheck, ShoppingBag, Sparkles, Truck } from "lucide-react";
import { Button } from "../components/ui/button";
import { PRODUCTS } from "../lib/products";
import heroModels from "../assets/vyrox-hero-models-v2.png";
import collectionsImage from "../assets/vyrox-collections.jpg";
import campaignImage from "../assets/vyrox-campaign.jpg";
import newsletterImage from "../assets/vyrox-newsletter.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VYROX Streetwear — Wear Your Attitude" },
      { name: "description", content: "Premium oversized streetwear for those who make a statement. Explore the latest VYROX collection." },
      { property: "og:title", content: "VYROX Streetwear — Wear Your Attitude" },
      { property: "og:description", content: "Not just a T-shirt. It's a statement." },
    ],
  }),
  component: Index,
});

const collectionData = [
  { name: "OVERSIZED TEES", search: { category: "t-shirts", search: "oversized" } },
  { name: "PREMIUM TEES", search: { category: "t-shirts", search: "premium" } },
  { name: "ACCESSORIES", search: { category: "accessories" } },
  { name: "GIFT BOX", search: { category: "combos" } },
];

const benefits = [
  [Truck, "FREE SHIPPING", "On Orders Above ₹999"],
  [Lock, "SECURE PAYMENTS", "100% Safe Transactions"],
  [ShieldCheck, "QUALITY ASSURED", "Premium Products"],
  [Sparkles, "LIMITED DROPS", "Exclusive Releases"],
] as const;

function Index() {
  const sceneRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scene = sceneRef.current;
      if (!scene) return;
      const rect = scene.getBoundingClientRect();
      const distance = scene.offsetHeight - window.innerHeight;
      setProgress(Math.min(1, Math.max(0, -rect.top / Math.max(distance, 1))));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const reveal = (start: number, end: number) => Math.min(1, Math.max(0, (progress - start) / (end - start)));
  const words = reveal(0.12, 0.42);
  const details = reveal(0.4, 0.7);

  return (
    <main className="overflow-clip bg-background text-foreground">
      <section ref={sceneRef} className="relative h-[220vh] md:h-[300vh]" aria-label="VYROX campaign introduction">
        <div className="sticky top-0 h-dvh overflow-hidden border-b border-border bg-hero">
          <div className="hero-grid absolute inset-0 opacity-30" />

          <div className="absolute inset-0 pt-12">
            <div className="absolute inset-x-[4vw] top-[18%] z-10 text-center font-display text-[32vw] sm:text-[17vw] font-black leading-none tracking-[-0.08em] text-transparent hero-outline sm:top-[12%]" style={{ opacity: words, transform: `translateY(${(1 - words) * 70}px) scale(${0.82 + words * 0.18})` }}>VYROX</div>

            {/* Main Hero Text (z-30 so it overlays the models on mobile) */}
            <div className="absolute left-[5vw] bottom-20 sm:bottom-auto sm:top-[24%] z-30 max-w-[34rem] drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)] sm:drop-shadow-none" style={{ opacity: words, transform: `translateX(${(1 - words) * -80}px)` }}>
              <p className="mb-2 font-display text-sm font-bold uppercase tracking-widest text-primary sm:text-lg">Not just a T-shirt.</p>
              <h1 className="font-display text-[15vw] font-black uppercase leading-[0.8] tracking-tight sm:text-[7vw] lg:text-[6rem]">It’s a<br/><span className="text-primary">Statement.</span></h1>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.25em] sm:text-xs block">Premium style. Premium you.</p>
              <div className="mt-6 flex gap-3">
                <Link to="/shop"><Button className="h-10 sm:h-12 px-5 sm:px-7 text-xs sm:text-sm">Shop Now</Button></Link>
                <Link to="/collections"><Button className="h-10 sm:h-12 px-5 sm:px-7 text-xs sm:text-sm" variant="outline">View Collection</Button></Link>
              </div>
            </div>

            {/* Models Image (z-20 so they stand behind the text on mobile, creating a premium layered look) */}
            <div className="absolute inset-x-0 bottom-0 z-20 flex justify-center" style={{ transform: `translateY(${progress * 12}px) scale(${0.94 + progress * 0.06})` }}><img src={heroModels} alt="Female and male VYROX models in crimson tailoring" width={1024} height={1536} className="h-auto w-[96vw] max-w-none object-contain drop-shadow-hero sm:h-[92vh] sm:w-auto" /></div>

            <div className="absolute bottom-[15%] right-[5vw] z-40 hidden w-48 border border-border bg-panel/95 p-4 backdrop-blur-md md:block" style={{ opacity: details, transform: `translateY(${(1 - details) * 50}px)` }}>
              <p className="font-display text-[10px] font-black uppercase tracking-[0.2em] text-primary">New Drop</p>
              <p className="font-display text-lg font-bold uppercase leading-none mt-1">Limited Edition</p>
              
              {/* Technical Specifications */}
              <div className="mt-4 pt-3 border-t border-border/60 space-y-1.5 text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
                <div className="flex justify-between"><span>Batch:</span><span className="text-foreground">VYRX-SS26</span></div>
                <div className="flex justify-between"><span>Fabric:</span><span className="text-foreground">240 GSM Cotton</span></div>
                <div className="flex justify-between"><span>Fit:</span><span className="text-foreground">Oversized Boxy</span></div>
              </div>

              {/* Technical Barcode */}
              <div className="mt-4 flex h-7 items-center justify-between opacity-50 px-1">
                {[2, 4, 1, 3, 1, 2, 4, 1, 2, 3, 1, 4, 2, 1, 3, 2].map((w, i) => (
                  <div key={i} className="h-full bg-foreground" style={{ width: `${w}px` }} />
                ))}
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-40 hidden border-t border-border bg-background/75 backdrop-blur-sm lg:block" style={{ opacity: details }}>
            <div className="mx-auto grid max-w-[1500px] grid-cols-4 gap-8 px-9 py-4">
              {benefits.map(([Icon, title, copy]) => <div key={title} className="flex items-center gap-3"><Icon className="size-6 text-primary"/><div><b className="block font-display text-xs">{title}</b><span className="text-[10px] text-muted-foreground">{copy}</span></div></div>)}
            </div>
          </div>
          <div className="absolute bottom-5 left-5 z-50 font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground lg:hidden">Scroll to reveal · {Math.round(progress * 100)}%</div>
        </div>
      </section>

      <section id="best" className="border-b border-border py-20">
        <div className="section-shell mb-9 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div><p className="section-kicker">Trending Now</p><h2 className="section-title">Best Sellers</h2></div>
          <div className="flex gap-7 text-[10px] font-bold uppercase tracking-widest">
            <Link to="/shop" className="text-primary">All</Link>
            <Link to="/shop" search={{ category: "t-shirts" }}>T-Shirts</Link>
            <Link to="/shop" search={{ category: "accessories" }}>Accessories</Link>
            <Link to="/shop" search={{ category: "combos" }}>Combos</Link>
          </div>
        </div>
        <BestSellersCarousel />
      </section>

      <section id="collections" className="section-shell border-b border-border py-20">
        <div className="mb-8 flex items-center justify-between"><h2 className="section-title">Explore Our <span className="text-primary">Collections</span></h2><div className="flex gap-2"><Button variant="outline" size="icon"><ArrowLeft className="size-4"/></Button><Button variant="outline" size="icon"><ArrowRight className="size-4"/></Button></div></div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {collectionData.map((col, index) => (
            <Link
              key={col.name}
              to="/shop"
              search={col.search}
              className="group relative aspect-[4/5] overflow-hidden border border-border"
            >
              <img
                src={collectionsImage}
                alt={col.name}
                loading="lazy"
                width={1536}
                height={864}
                className="h-full w-[400%] max-w-none object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                style={{ transform: `translateX(-${index * 25}%)` }}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/80 to-transparent p-5 pt-20">
                <h3 className="font-display text-xl font-bold">{col.name}</h3>
                <p className="mt-3 text-[9px] font-bold text-primary">SHOP NOW →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative min-h-[680px] overflow-hidden border-b border-border"><img src={campaignImage} alt="VYROX attitude streetwear campaign" loading="lazy" width={1536} height={864} className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-campaign"/><div className="section-shell relative z-10 flex min-h-[680px] items-center"><div className="max-w-md"><h2 className="section-title text-5xl sm:text-7xl">Wear <span className="text-primary">VYROX.</span><br/>Own the attitude.</h2><p className="mt-5 text-sm text-muted-foreground">Fashion that speaks before you do.</p><Link to="/shop"><Button variant="outline" className="mt-7 h-12 px-7">Explore Now</Button></Link></div></div></section>

      <section className="section-shell grid gap-px border-b border-border bg-border py-px sm:grid-cols-2 lg:grid-cols-4">{benefits.map(([Icon, title, copy]) => <div key={title} className="flex items-center gap-4 bg-background px-5 py-8"><Icon className="size-7 text-primary"/><div><b className="font-display text-sm">{title}</b><p className="mt-1 text-[10px] text-muted-foreground">{copy}</p></div></div>)}</section>

      <section className="section-shell py-20"><h2 className="section-title mb-9 text-center">What Our <span className="text-primary">Customers</span> Say</h2><div className="grid gap-4 md:grid-cols-3">{[["Amazing quality and perfect fit. Vyrox is not just a brand, it’s an attitude!","Rohit M."],["The oversized tees are next level. Got so many compliments!","Aryan S."],["Loved the packaging and the free gift. Will shop again for sure.","Karan D."]].map(([quote,name]) => <blockquote key={name} className="border border-border bg-card p-6"><div className="mb-4 tracking-widest text-primary">★★★★★</div><p className="min-h-14 text-xs leading-6 text-muted-foreground">{quote}</p><footer className="mt-6 text-xs">— {name}</footer></blockquote>)}</div></section>

      <section id="join" className="relative overflow-hidden">
        <img src={newsletterImage} alt="VYROX black hoodie campaign" loading="lazy" width={1536} height={768} className="absolute inset-0 h-full w-full object-cover"/>
        <div className="absolute inset-0 bg-newsletter"/>
        <div className="section-shell relative z-10 grid min-h-[390px] items-center py-16 md:grid-cols-2">
          <div className="md:col-start-2 md:justify-self-end md:text-right">
            <h2 className="section-title">Join the VYROX movement</h2>
            <p className="mt-3 text-sm text-muted-foreground">Be bold. Be you. Be Vyrox.</p>
            <div className="mt-7 flex md:justify-end">
              <a
                href="https://www.instagram.com/vyrox990?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button className="h-12 px-8 gap-2 font-display font-bold tracking-widest text-xs">
                  <Instagram className="size-4" /> JOIN ON INSTAGRAM
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function BestSellersCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("a")?.offsetWidth ?? 280;
    el.scrollBy({ left: dir === "right" ? cardWidth + 12 : -(cardWidth + 12), behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Left arrow */}
      <button
        onClick={() => scroll("left")}
        aria-label="Scroll left"
        className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center size-10 border border-border bg-background/90 backdrop-blur hover:border-primary hover:text-primary md:flex"
      >
        <ArrowLeft className="size-4" />
      </button>

      {/* Scrollable track */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scroll-smooth pb-2 px-4 md:px-0"
        style={{ scrollbarWidth: "none" }}
      >
        {PRODUCTS.map((p) => (
          <Link
            key={p.slug}
            to="/product/$slug"
            params={{ slug: p.slug }}
            className="group block w-[72vw] shrink-0 overflow-hidden border border-border bg-card sm:w-[44vw] md:w-[calc(20%-10px)] lg:w-[calc(20%-10px)]"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-border p-4">
              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold">{p.name}</h3>
                <p className="mt-1 text-sm font-bold text-primary">{p.price}</p>
              </div>
              <ShoppingBag className="size-4 shrink-0 text-muted-foreground" />
            </div>
          </Link>
        ))}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scroll("right")}
        aria-label="Scroll right"
        className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center size-10 border border-border bg-background/90 backdrop-blur hover:border-primary hover:text-primary md:flex"
      >
        <ArrowRight className="size-4" />
      </button>
    </div>
  );
}


