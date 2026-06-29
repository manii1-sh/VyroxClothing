import img1 from "../assets/ChatGPT Image Jun 29, 2026, 11_57_19 AM.png";
import img2 from "../assets/ChatGPT Image Jun 29, 2026, 11_57_21 AM.png";
import img4 from "../assets/ChatGPT Image Jun 29, 2026, 11_57_43 AM.png";
import img5 from "../assets/ChatGPT Image Jun 29, 2026, 11_57_46 AM.png";
import img6 from "../assets/ChatGPT Image Jun 29, 2026, 11_57_49 AM.png";
import img7 from "../assets/ChatGPT Image Jun 29, 2026, 11_57_51 AM.png";
import img8 from "../assets/ChatGPT Image Jun 29, 2026, 11_57_52 AM.png";
import img9 from "../assets/ChatGPT Image Jun 29, 2026, 11_57_54 AM.png";
import img10 from "../assets/Gemini_Generated_Image_arph3narph3narph.png";
import img11 from "../assets/Gemini_Generated_Image_vh75hyvh75hyvh75.png";
import premiumImg1 from "../assets/WhatsApp Image 2026-06-28 at 18.45.49 (1).jpeg";
import premiumImg2 from "../assets/WhatsApp Image 2026-06-28 at 18.45.49.jpeg";
import premiumImg3 from "../assets/WhatsApp Image 2026-06-28 at 18.45.52.jpeg";

export type Product = {
  slug: string;
  name: string;
  price: string;
  priceValue: number;
  tagline: string;
  description: string;
  fabric: string;
  image: string;
  images: string[];
  category?: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "vyrox-premium-syndicate-tee",
    name: "VYROX Premium Syndicate Tee",
    price: "₹999",
    priceValue: 999,
    tagline: "The pinnacle of streetwear comfort.",
    description: "Part of our exclusive Premium Capsule. Crafted from ultra-heavyweight 280 GSM luxury combed cotton, featuring a custom vintage wash and distressed hems for a worn-in, high-fashion look.",
    fabric: "100% luxury combed cotton · 280 GSM · Vintage wash · Hand-distressed.",
    image: premiumImg1,
    images: [premiumImg1],
  },
  {
    slug: "vyrox-premium-dynasty-tee",
    name: "VYROX Premium Dynasty Tee",
    price: "₹999",
    priceValue: 999,
    tagline: "A legacy written in threads.",
    description: "Elevated streetwear silhouette with dropped shoulders and a boxy, cropped length. High-density puff print detailing on the back and signature embroidery on the chest.",
    fabric: "100% combed cotton · 260 GSM · Pre-shrunk · Puff print graphics.",
    image: premiumImg2,
    images: [premiumImg2],
  },
  {
    slug: "vyrox-premium-vanguard-tee",
    name: "VYROX Premium Vanguard Tee",
    price: "₹999",
    priceValue: 999,
    tagline: "Lead the crowd. Never follow.",
    description: "A premium heavyweight tee with a unique pigment-dye finish that gives every piece a one-of-a-kind character. Finished with custom metal tag accents and reinforced neck ribbing.",
    fabric: "100% luxury combed cotton · 260 GSM · Pigment-dyed · Metal hardware details.",
    image: premiumImg3,
    images: [premiumImg3],
  },
  {
    slug: "discipline-oversized-tee",
    name: "Discipline Oversized Tee",
    price: "₹899",
    priceValue: 899,
    tagline: "Built for those who stay consistent.",
    description: "Heavyweight 240 GSM cotton with a relaxed boxy fit. Drop shoulders, ribbed crew neck, and a hand-finished print that doesn't fade after the first wash.",
    fabric: "100% combed cotton · 240 GSM · Pre-shrunk · Machine wash cold.",
    image: img1,
    images: [img1],
  },
  {
    slug: "fearless-oversized-tee",
    name: "Fearless Oversized Tee",
    price: "₹899",
    priceValue: 899,
    tagline: "For the ones who don't ask for permission.",
    description: "Premium oversized silhouette with structured shoulders and elongated hem. Hand-printed crimson graphic on near-black cotton.",
    fabric: "100% combed cotton · 240 GSM · Pre-shrunk · Machine wash cold.",
    image: img2,
    images: [img2],
  },
  {
    slug: "crimson-rage-tee",
    name: "Crimson Rage Tee",
    price: "₹899",
    priceValue: 899,
    tagline: "Rage in red. Walk in silence.",
    description: "Bold crimson print on jet-black cotton. Every stitch is a statement of rebellion.",
    fabric: "100% combed cotton · 240 GSM · Pre-shrunk · Machine wash cold.",
    image: img4,
    images: [img4],
  },
  {
    slug: "void-oversized-tee",
    name: "Void Oversized Tee",
    price: "₹799",
    priceValue: 799,
    tagline: "Emptiness has never looked this loud.",
    description: "Clean oversized silhouette with a minimal dark graphic. Let your presence do the talking.",
    fabric: "100% combed cotton · 200 GSM · Soft hand-feel · Machine wash cold.",
    image: img5,
    images: [img5],
  },
  {
    slug: "born-to-stand-out-tee",
    name: "Born To Stand Out Tee",
    price: "₹799",
    priceValue: 799,
    tagline: "Loud silence. Quiet confidence.",
    description: "Mid-weight tee with a softer drape and slightly tapered fit. Signature VYROX chest crest and back wordmark.",
    fabric: "100% combed cotton · 200 GSM · Soft hand-feel · Machine wash cold.",
    image: img6,
    images: [img6],
  },
  {
    slug: "vyrox-blackout-tee",
    name: "VYROX Blackout Tee",
    price: "₹849",
    priceValue: 849,
    tagline: "All black. All attitude.",
    description: "Washed black cotton with subtle texture print. Understated aggression in every thread.",
    fabric: "100% combed cotton · 220 GSM · Garment dyed · Machine wash cold.",
    image: img7,
    images: [img7],
  },
  {
    slug: "vyrox-signature-tee",
    name: "VYROX Signature Tee",
    price: "₹699",
    priceValue: 699,
    tagline: "The everyday essential, done right.",
    description: "Our cleanest cut. Tubular knit body, double-stitched seams, and the embroidered VYROX monogram at the chest.",
    fabric: "100% combed cotton · 200 GSM · Garment dyed · Machine wash cold.",
    image: img8,
    images: [img8],
  },
  {
    slug: "vyrox-phantom-tee",
    name: "VYROX Phantom Tee",
    price: "₹899",
    priceValue: 899,
    tagline: "Appear. Disappear. Repeat.",
    description: "Ghost-washed cotton with a phantom-style back print. For those who move in silence.",
    fabric: "100% combed cotton · 240 GSM · Pre-shrunk · Machine wash cold.",
    image: img9,
    images: [img9],
  },
  {
    slug: "vyrox-gothic-tee",
    name: "VYROX Gothic Tee",
    price: "₹849",
    priceValue: 849,
    tagline: "Dark energy. Louder than words.",
    description: "Bold gothic artwork on heavyweight cotton. A statement piece that commands attention from every angle.",
    fabric: "100% combed cotton · 240 GSM · Pre-shrunk · Machine wash cold.",
    image: img10,
    images: [img10],
  },
  {
    slug: "vyrox-dark-ritual-tee",
    name: "Dark Ritual Tee",
    price: "₹849",
    priceValue: 849,
    tagline: "Some rituals are worn.",
    description: "Heavyweight oversized fit with intricate dark print. Limited edition artwork, unlimited attitude.",
    fabric: "100% combed cotton · 240 GSM · Pre-shrunk · Machine wash cold.",
    image: img11,
    images: [img11],
  },
];

export const SIZE_CHART = [
  { size: "S", chest: 42, length: 27, shoulder: 21 },
  { size: "M", chest: 44, length: 28, shoulder: 22 },
  { size: "L", chest: 46, length: 29, shoulder: 23 },
  { size: "XL", chest: 48, length: 30, shoulder: 24 },
  { size: "XXL", chest: 50, length: 31, shoulder: 25 },
];

export const SIZES = SIZE_CHART.map((s) => s.size);

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}
