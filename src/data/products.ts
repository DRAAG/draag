export type CategorySlug = "sunglasses" | "sneakers" | "watches";
export type BrandSlug = "nike" | "adidas" | "puma" | "new-balance" | "asics";
export type ProductTag = "new" | "trending" | "featured";

export interface Brand {
  slug: BrandSlug;
  name: string;
  origin: string;
  blurb: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  headline: string;
  tagline: string;
  copy: string;
}

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Product {
  slug: string;
  name: string;
  brand: BrandSlug;
  category: CategorySlug;
  price: number;
  description: string;
  colors: ColorOption[];
  sizes: string[];
  tags: ProductTag[];
  /** Dummy catalogue photo — replace with real product photography. */
  image: string;
}

export const WHATSAPP_NUMBER = "919995589035";
export const WHATSAPP_DISPLAY = "+91 99955 89035";
export const INSTAGRAM_HANDLE = "@draag.co";
/** Instagram business DM — every enquiry that used to be an email goes here. */
export const INSTAGRAM_DM_URL =
  "https://www.instagram.com/draag.co?stkn=MWdxcDh3YmRtdDNnaA==";

export const BRANDS: Brand[] = [
  {
    slug: "nike",
    name: "Nike",
    origin: "USA",
    blurb: "Court icons and running silhouettes that shaped sneaker culture.",
  },
  {
    slug: "adidas",
    name: "Adidas",
    origin: "Germany",
    blurb: "Terraced classics and modern runners with unmistakable lines.",
  },
  {
    slug: "puma",
    name: "Puma",
    origin: "Germany",
    blurb: "Suede heritage and track-ready shapes with a sporty edge.",
  },
  {
    slug: "new-balance",
    name: "New Balance",
    origin: "USA",
    blurb: "Chunky, technical comfort in premium material mixes.",
  },
  {
    slug: "asics",
    name: "Asics",
    origin: "Japan",
    blurb: "Gel-cushioned runners with a retro-tech design language.",
  },
];

/** Order is deliberate — sunglasses, sneakers, watches (used by the scroll showcase). */
export const CATEGORIES: Category[] = [
  {
    slug: "sunglasses",
    name: "Sunglasses",
    headline: "Sunglasses",
    tagline: "Frames with attitude",
    copy: "Sport-wrapped and street-ready frames built for harsh light and long days. UV400 lenses, featherweight builds and shapes that hold their line.",
  },
  {
    slug: "sneakers",
    name: "Sneakers",
    headline: "Sneakers",
    tagline: "The main event",
    copy: "From terraced classics to technical runners. Every pair is sourced in limited runs, so the rotation stays sharp and the sizes stay honest.",
  },
  {
    slug: "watches",
    name: "Watches",
    headline: "Watches",
    tagline: "Wrist weight done right",
    copy: "Quiet, functional timepieces that pair with a fresh pair of sneakers. Stainless cases, clean dials and straps that survive daily wear.",
  },
];

const SIZE_SNEAKERS = ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"];
const SIZE_ONE = ["One Size"];

const C = {
  black: { name: "Black", hex: "#17171A" },
  white: { name: "White", hex: "#F4F2EC" },
  bone: { name: "Bone", hex: "#DED7C7" },
  volt: { name: "Volt", hex: "#C6F03A" },
  red: { name: "Red", hex: "#C6382E" },
  navy: { name: "Navy", hex: "#22304F" },
  grey: { name: "Grey", hex: "#9A9A96" },
  sand: { name: "Sand", hex: "#C9AE86" },
  green: { name: "Forest", hex: "#2E4A34" },
  tortoise: { name: "Tortoise", hex: "#7A4B22" },
  chrome: { name: "Chrome", hex: "#B9BDC2" },
  silver: { name: "Silver", hex: "#D3D5D8" },
} satisfies Record<string, ColorOption>;

/**
 * Dummy catalogue photography: a deterministic real photo per product and
 * frame, so the grid reads like a stocked store instead of empty plates.
 */
export function productImage(slug: string, frame = 0): string {
  return `https://picsum.photos/seed/draag-${slug}-${frame}/1000/1250`;
}

const PRODUCT_DATA: Omit<Product, "image">[] = [
  // ---------------------------------------------------------------- sneakers
  {
    slug: "nike-air-max-90",
    name: "Air Max 90",
    brand: "nike",
    category: "sneakers",
    price: 11999,
    description:
      "The blueprint. Visible Air cushioning, layered mesh and suede panelling, and a waffle outsole that has kept this silhouette on the street for decades. A grail that never leaves the rotation.",
    colors: [C.white, C.black, C.volt],
    sizes: SIZE_SNEAKERS,
    tags: ["trending", "featured"],
  },
  {
    slug: "nike-dunk-low",
    name: "Dunk Low",
    brand: "nike",
    category: "sneakers",
    price: 9499,
    description:
      "A court shoe turned cultural staple. Low-profile panelling, padded collar and a clean toe box that goes with everything from denim to tailoring.",
    colors: [C.white, C.red, C.navy],
    sizes: SIZE_SNEAKERS,
    tags: ["trending"],
  },
  {
    slug: "adidas-samba-og",
    name: "Samba OG",
    brand: "adidas",
    category: "sneakers",
    price: 10999,
    description:
      "Three stripes, gum sole, zero noise. The terrace classic has moved from the stands to the front row without changing a single line.",
    colors: [C.black, C.white, C.green],
    sizes: SIZE_SNEAKERS,
    tags: ["featured"],
  },
  {
    slug: "adidas-gazelle",
    name: "Gazelle",
    brand: "adidas",
    category: "sneakers",
    price: 8999,
    description:
      "Slim suede upper on a low terracotta sole. Understated, slightly retro, endlessly wearable — the quiet one in a loud rotation.",
    colors: [C.navy, C.bone, C.green],
    sizes: SIZE_SNEAKERS,
    tags: [],
  },
  {
    slug: "puma-suede-classic",
    name: "Suede Classic",
    brand: "puma",
    category: "sneakers",
    price: 7499,
    description:
      "Since 1968 this has been the shape of Puma. Soft suede, formstrip side detailing and a simple cupsole that only looks better scuffed up.",
    colors: [C.black, C.red, C.white],
    sizes: SIZE_SNEAKERS,
    tags: [],
  },
  {
    slug: "puma-palermo",
    name: "Palermo",
    brand: "puma",
    category: "sneakers",
    price: 7999,
    description:
      "A terrace revival with a narrow toe, suede overlays and a low gum sole. Retro proportions done with modern comfort.",
    colors: [C.sand, C.green, C.black],
    sizes: SIZE_SNEAKERS,
    tags: ["new"],
  },
  {
    slug: "new-balance-550",
    name: "550",
    brand: "new-balance",
    category: "sneakers",
    price: 10999,
    description:
      "A 1989 basketball shoe brought back with premium leather. High collar, chunky midsole and a colour-blocked upper that reads instantly.",
    colors: [C.white, C.red, C.navy],
    sizes: SIZE_SNEAKERS,
    tags: ["trending"],
  },
  {
    slug: "new-balance-9060",
    name: "9060",
    brand: "new-balance",
    category: "sneakers",
    price: 14999,
    description:
      "Sculpted, maximal and unapologetic. Wavy overlays sit over ABZORB cushioning for a futuristic take on the dad-shoe canon.",
    colors: [C.grey, C.bone, C.black],
    sizes: SIZE_SNEAKERS,
    tags: ["new", "featured"],
  },
  {
    slug: "asics-gel-kayano-14",
    name: "Gel-Kayano 14",
    brand: "asics",
    category: "sneakers",
    price: 13499,
    description:
      "Technical running heritage with GEL cushioning and a layered mesh upper. Silver-metallic accents keep it firmly in Y2K territory.",
    colors: [C.silver, C.white, C.black],
    sizes: SIZE_SNEAKERS,
    tags: ["trending"],
  },
  {
    slug: "asics-gel-1130",
    name: "GEL-1130",
    brand: "asics",
    category: "sneakers",
    price: 9999,
    description:
      "A late-2000s runner reborn. Breathable mesh, synthetic overlays and a stacked GEL heel for all-day comfort with a techy edge.",
    colors: [C.white, C.navy, C.volt],
    sizes: SIZE_SNEAKERS,
    tags: [],
  },
  // -------------------------------------------------------------- sunglasses
  {
    slug: "nike-windstorm",
    name: "Windstorm",
    brand: "nike",
    category: "sunglasses",
    price: 6499,
    description:
      "A wraparound sport frame built for speed. Single-piece lens geometry, rubber temples and UV400 protection for full-day glare.",
    colors: [C.black, C.grey, C.volt],
    sizes: SIZE_ONE,
    tags: ["featured"],
  },
  {
    slug: "adidas-sp0093",
    name: "SP0093 Sport",
    brand: "adidas",
    category: "sunglasses",
    price: 5999,
    description:
      "A lightweight half-rim sports frame with a curved shield lens and non-slip nose pads. Made for pavement, not just pitches.",
    colors: [C.black, C.chrome, C.navy],
    sizes: SIZE_ONE,
    tags: [],
  },
  {
    slug: "puma-billy",
    name: "Billy Oval",
    brand: "puma",
    category: "sunglasses",
    price: 4499,
    description:
      "A slim oval frame with a thin metal core and tinted lenses. Small, sharp and a little bit retro in all the right ways.",
    colors: [C.tortoise, C.black, C.chrome],
    sizes: SIZE_ONE,
    tags: ["new"],
  },
  {
    slug: "new-balance-nb-sport",
    name: "NB Sport Shield",
    brand: "new-balance",
    category: "sunglasses",
    price: 5499,
    description:
      "A wide shield frame with a matte finish and mirrored lens. Maximum coverage, minimum fuss.",
    colors: [C.black, C.silver, C.red],
    sizes: SIZE_ONE,
    tags: [],
  },
  {
    slug: "asics-solstice",
    name: "Solstice",
    brand: "asics",
    category: "sunglasses",
    price: 4999,
    description:
      "A running-derived frame with a sculpted brow line and grippy temple tips. Light enough to forget you're wearing them.",
    colors: [C.navy, C.black, C.green],
    sizes: SIZE_ONE,
    tags: [],
  },
  // ----------------------------------------------------------------- watches
  {
    slug: "puma-contender",
    name: "Contender Chrono",
    brand: "puma",
    category: "watches",
    price: 8999,
    description:
      "A stainless steel chronograph with a matte dial and a sport cuff strap. Built to take a beating and still look considered.",
    colors: [C.black, C.silver, C.navy],
    sizes: SIZE_ONE,
    tags: ["new"],
  },
  {
    slug: "adidas-process-m1",
    name: "Process M1",
    brand: "adidas",
    category: "watches",
    price: 7499,
    description:
      "A clean minimal dial in a brushed alloy case with a silicone strap. Quiet design that pairs with a fresh pair of sneakers.",
    colors: [C.black, C.white, C.volt],
    sizes: SIZE_ONE,
    tags: ["featured"],
  },
];

/** Every product gets a dummy photo; use `productImage(slug, frame)` for the rest. */
export const PRODUCTS: Product[] = PRODUCT_DATA.map((product) => ({
  ...product,
  image: productImage(product.slug),
}));

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getBrand(slug: string): Brand | undefined {
  return BRANDS.find((b) => b.slug === slug);
}

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function brandName(slug: BrandSlug): string {
  return getBrand(slug)?.name ?? slug;
}

export function formatPrice(value: number): string {
  return `₹${value.toLocaleString("en-IN")}`;
}

export function filterProducts(options: {
  category?: CategorySlug;
  brand?: BrandSlug;
  tag?: ProductTag;
  brands?: BrandSlug[];
  sizes?: string[];
  colors?: string[];
  limit?: number;
}): Product[] {
  let list = PRODUCTS.slice();
  if (options.category) list = list.filter((p) => p.category === options.category);
  if (options.brand) list = list.filter((p) => p.brand === options.brand);
  const tag = options.tag;
  if (tag) list = list.filter((p) => p.tags.includes(tag));
  if (options.brands?.length)
    list = list.filter((p) => options.brands!.includes(p.brand));
  if (options.sizes?.length)
    list = list.filter((p) => p.sizes.some((s) => options.sizes!.includes(s)));
  if (options.colors?.length)
    list = list.filter((p) =>
      p.colors.some((c) => options.colors!.includes(c.name)),
    );
  if (options.limit) list = list.slice(0, options.limit);
  return list;
}

export const FRAME_LABELS = ["Studio", "Editorial", "Detail", "On foot"];
