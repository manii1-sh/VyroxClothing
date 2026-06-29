import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { Headphones, Mail, MapPin, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — VYROX" },
      { name: "description", content: "Get in touch with the VYROX team. Support, order tracking, and general inquiries." },
    ],
  }),
  component: ContactPage,
});

const FAQS = [
  {
    q: "How long does shipping take?",
    a: "All orders are dispatched within 24 hours. Delivery takes between 3 to 5 business days across India. You will receive a tracking link via SMS and email once your order is shipped.",
  },
  {
    q: "Do you offer returns or exchanges?",
    a: "To maintain the exclusivity of our limited streetwear drops, all sales are final. We only accept returns or exchanges if you receive a damaged or incorrect item. Please inspect your order upon reception and contact us immediately if there are any issues.",
  },
  {
    q: "How do I choose the right size?",
    a: "Our products feature an oversized, boxy silhouette. We recommend ordering your usual size for the intended relaxed streetwear look. If you prefer a more standard fit, we suggest sizing down. Refer to the size chart on any product page for exact measurements.",
  },
  {
    q: "Can I cancel or modify my order?",
    a: "Orders can be modified or cancelled within 2 hours of placing them. Please email support@vyroxclothing.com immediately with your Order ID for any urgent changes.",
  },
];

function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent! Our support team will get back to you shortly.");
      (e.target as HTMLFormElement).reset();
    }, 1200);
  };

  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="section-shell py-8 md:py-16 pb-32">
        
        {/* Page Header */}
        <div className="mb-12 text-center">
          <p className="section-kicker">GET IN TOUCH</p>
          <h1 className="section-title mt-1">
            Contact <span className="text-primary">Support</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">
            Have a question about an order, a drop, or just want to chat? Fill out the form or reach out directly.
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-10">
          
          {/* Contact Info Cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="border border-border bg-card p-5 flex flex-col items-center text-center">
              <Mail className="size-5 text-primary mb-3" />
              <h3 className="font-display text-xs font-bold uppercase tracking-widest">Email Us</h3>
              <p className="mt-1 text-xs text-muted-foreground break-all">support@vyrox.com</p>
            </div>
            <div className="border border-border bg-card p-5 flex flex-col items-center text-center">
              <Headphones className="size-5 text-primary mb-3" />
              <h3 className="font-display text-xs font-bold uppercase tracking-widest">Call Us</h3>
              <p className="mt-1 text-xs text-muted-foreground">+91 98765 43210</p>
            </div>
            <div className="border border-border bg-card p-5 flex flex-col items-center text-center">
              <MapPin className="size-5 text-primary mb-3" />
              <h3 className="font-display text-xs font-bold uppercase tracking-widest">HQ Location</h3>
              <p className="mt-1 text-xs text-muted-foreground">New Delhi, India</p>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="border border-border bg-card p-6 md:p-8 space-y-4">
            <h2 className="font-display text-lg font-bold uppercase tracking-wide border-b border-border pb-3 text-center sm:text-left">
              Send a Message
            </h2>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className="h-11 w-full border border-border bg-background/50 px-4 text-xs outline-none focus:border-primary transition-colors uppercase tracking-wider"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="h-11 w-full border border-border bg-background/50 px-4 text-xs outline-none focus:border-primary transition-colors uppercase tracking-wider"
                />
              </div>
            </div>

            <div>
              <label htmlFor="orderId" className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                Order ID (Optional)
              </label>
              <input
                id="orderId"
                type="text"
                placeholder="e.g., #VY-1024"
                className="h-11 w-full border border-border bg-background/50 px-4 text-xs outline-none focus:border-primary transition-colors uppercase tracking-wider"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                className="w-full border border-border bg-background/50 p-4 text-xs outline-none focus:border-primary transition-colors uppercase tracking-wider resize-none"
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full h-12 font-display font-bold tracking-widest text-xs">
              {loading ? "SENDING..." : (
                <>
                  <Send className="mr-2 size-4" /> SEND MESSAGE
                </>
              )}
            </Button>
          </form>

        </div>
      </div>
    </main>
  );
}
