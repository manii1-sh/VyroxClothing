import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2, MapPin } from "lucide-react";
import { Button } from "../components/ui/button";
import { useCart } from "../lib/cart";
import { getProduct } from "../lib/products";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — VYROX" },
      { name: "description", content: "Enter your shipping details and place your VYROX order." },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { items, subtotal, remove, clear } = useCart();
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 79;
  const total = subtotal + shipping;

  // Form State
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!fullName || !phone || !email || !address || !city || !state || !zip) {
      toast.error("Please fill in all shipping details");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    let itemsText = "";
    items.forEach((item, index) => {
      const itemUrl = typeof window !== "undefined"
        ? `${window.location.origin}/product/${item.slug}`
        : `https://vyroxclothing.com/product/${item.slug}`;
      itemsText += `${index + 1}. *${item.name}* (Size: ${item.size}, Qty: ${item.qty}) - ₹${item.price * item.qty}\n   _Link:_ ${itemUrl}\n`;
    });

    const text = `Hello VYROX! I want to place an order:

*Shipping Details:*
- *Name:* ${fullName}
- *Phone:* ${phone}
- *Email:* ${email}
- *Address:* ${address}, ${city}, ${state} - ${zip}

*Items:*
${itemsText}
*Subtotal:* ₹${subtotal}
*Shipping:* ${shipping === 0 ? "Free" : `₹${shipping}`}
*Total Amount:* ₹${total}

Please confirm my order and send payment details.`;

    const whatsappUrl = `https://wa.me/919322520682?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
    clear();
    toast.success("Order details sent to WhatsApp!");
  };

  return (
    <main className="bg-background text-foreground">
      <div className="section-shell py-8 md:py-12 pb-32">
        <h1 className="section-title">Checkout</h1>
        <p className="mt-2 text-sm text-muted-foreground">{items.length} item{items.length === 1 ? "" : "s"} in your cart</p>

        {items.length === 0 ? (
          <div className="mt-12 border border-border bg-card p-10 text-center">
            <p className="font-display text-xl font-bold uppercase">Your cart is empty</p>
            <p className="mt-2 text-sm text-muted-foreground">Find a fit that speaks for you.</p>
            <Link to="/shop" className="mt-6 inline-block"><Button>Continue Shopping</Button></Link>
          </div>
        ) : (
          <form onSubmit={placeOrder} className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px] items-start">
            
            {/* Left Column: Shipping Form & Cart Items */}
            <div className="space-y-8">
              
              {/* Shipping Form */}
              <div className="border border-border bg-card p-6 md:p-8 space-y-6">
                <div className="flex items-center gap-2 border-b border-border pb-3">
                  <MapPin className="size-5 text-primary" />
                  <h2 className="font-display text-lg font-bold uppercase tracking-wide">
                    Shipping Details
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="h-11 w-full border border-border bg-background/50 px-4 text-xs outline-none focus:border-primary transition-colors uppercase tracking-wider"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-11 w-full border border-border bg-background/50 px-4 text-xs outline-none focus:border-primary transition-colors uppercase tracking-wider"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-11 w-full border border-border bg-background/50 px-4 text-xs outline-none focus:border-primary transition-colors uppercase tracking-wider"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                      Street Address
                    </label>
                    <input
                      id="address"
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="h-11 w-full border border-border bg-background/50 px-4 text-xs outline-none focus:border-primary transition-colors uppercase tracking-wider"
                    />
                  </div>

                  <div className="grid gap-4 grid-cols-3">
                    <div>
                      <label htmlFor="city" className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                        City
                      </label>
                      <input
                        id="city"
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="h-11 w-full border border-border bg-background/50 px-4 text-xs outline-none focus:border-primary transition-colors uppercase tracking-wider"
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                        State
                      </label>
                      <input
                        id="state"
                        type="text"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="h-11 w-full border border-border bg-background/50 px-4 text-xs outline-none focus:border-primary transition-colors uppercase tracking-wider"
                      />
                    </div>
                    <div>
                      <label htmlFor="zip" className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                        ZIP / Postal Code
                      </label>
                      <input
                        id="zip"
                        type="text"
                        required
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        className="h-11 w-full border border-border bg-background/50 px-4 text-xs outline-none focus:border-primary transition-colors uppercase tracking-wider"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Cart Items Review */}
              <div className="space-y-3">
                <h3 className="font-display text-sm font-bold uppercase tracking-widest text-muted-foreground">
                  Review Items
                </h3>
                <ul className="divide-y divide-border border border-border bg-card">
                  {items.map((item) => {
                    const product = getProduct(item.slug);
                    return (
                      <li key={`${item.slug}-${item.size}`} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 p-4">
                        {product && (
                          <Link
                            to="/product/$slug"
                            params={{ slug: item.slug }}
                            className="size-20 shrink-0 overflow-hidden border border-border bg-neutral-900 group"
                          >
                            <img
                              src={product.image}
                              alt={item.name}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </Link>
                        )}
                        <div className="min-w-0">
                          <Link to="/product/$slug" params={{ slug: item.slug }} className="block truncate font-display font-bold uppercase hover:text-primary">{item.name}</Link>
                          <p className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">Size {item.size} · Qty {item.qty}</p>
                          <p className="mt-1 font-display text-sm font-bold">₹{item.price * item.qty}</p>
                        </div>
                        <button type="button" aria-label="Remove" onClick={() => remove(item.slug, item.size)} className="p-2 text-muted-foreground hover:text-primary"><Trash2 className="size-4"/></button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <aside className="h-fit border border-border bg-card p-6 lg:sticky lg:top-24">
              <h2 className="font-display text-lg font-bold uppercase">Order Summary</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><dt>Subtotal</dt><dd>₹{subtotal}</dd></div>
                <div className="flex justify-between"><dt>Shipping</dt><dd>{shipping === 0 ? "Free" : `₹${shipping}`}</dd></div>
                <div className="mt-3 flex justify-between border-t border-border pt-3 font-display text-base font-bold uppercase"><dt>Total</dt><dd>₹{total}</dd></div>
              </dl>
              <Button type="submit" className="mt-5 h-12 w-full font-display font-bold tracking-widest text-xs">
                PLACE ORDER VIA WHATSAPP
              </Button>
              <button type="button" onClick={clear} className="mt-3 w-full text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary">Clear Cart</button>
            </aside>
          </form>
        )}
      </div>
    </main>
  );
}
