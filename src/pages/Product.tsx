import {
  Check,
  ChevronRight,
  PackageCheck,
  RotateCcw,
  Truck,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";

import { EditorialImage } from "@/components/store/EditorialImage";
import { ProductCard } from "@/components/store/ProductCard";
import { Reveal, RevealItem, RevealStagger } from "@/components/store/Reveal";
import { WhatsAppIcon } from "@/components/store/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BRANDS,
  FRAME_LABELS,
  PRODUCTS,
  brandName,
  formatPrice,
  getProductBySlug,
  productImage,
} from "@/data/products";
import { cn } from "@/lib/utils";
import { buildOrderMessage, whatsappOrderUrl } from "@/lib/whatsapp";

const PERKS = [
  { icon: Truck, label: "Ships in 24h" },
  { icon: RotateCcw, label: "7-day size exchange" },
  { icon: PackageCheck, label: "Inspected before dispatch" },
];

export default function ProductPage() {
  const { slug = "" } = useParams();
  const product = getProductBySlug(slug);

  const [activeFrame, setActiveFrame] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);

  useEffect(() => {
    setActiveFrame(0);
    setSize(product && product.sizes.length === 1 ? product.sizes[0] : null);
    setColor(null);
  }, [slug, product]);

  const related = useMemo(() => {
    if (!product) return [];
    const sameCategory = PRODUCTS.filter(
      (p) => p.category === product.category && p.slug !== product.slug,
    );
    const sameBrand = PRODUCTS.filter(
      (p) => p.brand === product.brand && p.slug !== product.slug,
    );
    const merged = [...sameCategory, ...sameBrand].filter(
      (p, index, arr) => arr.findIndex((x) => x.slug === p.slug) === index,
    );
    return merged.slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="container-x py-28 text-center">
        <p className="eyebrow text-muted-foreground">404</p>
        <h1 className="display mt-4 text-4xl">Product not found</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          This product may have sold out or moved.
        </p>
        <Button asChild className="mt-8 rounded-sm">
          <Link to="/">Back to home</Link>
        </Button>
      </div>
    );
  }

  const brand = brandName(product.brand);
  const ready = Boolean(size && color);

  const orderUrl = whatsappOrderUrl({
    productName: product.name,
    brand,
    size: size ?? "—",
    color: color ?? "—",
  });

  const previewMessage = buildOrderMessage({
    productName: product.name,
    brand,
    size: size ?? "[Size]",
    color: color ?? "[Colour]",
  });

  return (
    <>
      <section className="container-x py-8 lg:py-12">
        <nav className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="size-3" />
          <Link
            to={`/category/${product.category}`}
            className="capitalize transition-colors hover:text-foreground"
          >
            {product.category}
          </Link>
          <ChevronRight className="size-3" />
          <Link
            to={`/brand/${product.brand}`}
            className="transition-colors hover:text-foreground"
          >
            {brand}
          </Link>
          <ChevronRight className="size-3" />
          <span className="text-foreground">{product.name}</span>
        </nav>
      </section>

      <section className="container-x grid gap-12 pb-20 lg:grid-cols-2 lg:gap-16 lg:pb-28">
        {/* ------------------------------------------------------------ gallery */}
        <div>
          <div className="overflow-hidden rounded-sm border border-border bg-secondary">
            <div className="aspect-[4/5] w-full">
              <EditorialImage
                category={product.category}
                brand={brand}
                title={product.name}
                frame={activeFrame}
                image={productImage(product.slug, activeFrame)}
              />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {FRAME_LABELS.map((label, index) => (
              <button
                key={label}
                type="button"
                onClick={() => setActiveFrame(index)}
                aria-label={`View ${label} image`}
                aria-pressed={activeFrame === index}
                className={cn(
                  "overflow-hidden rounded-sm border bg-secondary transition-all",
                  activeFrame === index
                    ? "border-foreground"
                    : "border-border opacity-70 hover:opacity-100",
                )}
              >
                <span className="block aspect-square w-full">
                  <EditorialImage
                    category={product.category}
                    brand={brand}
                    title={product.name}
                    frame={index}
                    image={productImage(product.slug, index)}
                    alt={`${product.name} — ${label}`}
                  />
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------------ details */}
        <div className="lg:pt-2">
          <div className="flex items-center gap-3">
            <Link
              to={`/brand/${product.brand}`}
              className="eyebrow text-muted-foreground transition-colors hover:text-foreground"
            >
              {brand}
            </Link>
            <span className="size-1 rounded-full bg-accent" />
            <span className="eyebrow capitalize text-muted-foreground">
              {product.category}
            </span>
          </div>

          <h1 className="display mt-4 text-4xl leading-[1.05] sm:text-5xl">
            {product.name}
          </h1>

          <p className="mt-4 text-2xl font-semibold">
            {formatPrice(product.price)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Inclusive of all taxes · Free shipping over ₹4,999
          </p>

          <p className="mt-7 max-w-lg text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {/* size */}
          <div className="mt-9">
            <div className="flex items-baseline justify-between">
              <p className="eyebrow">Size</p>
              <Link
                to="/faq"
                className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Sizing guide
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.sizes.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSize(option)}
                  aria-pressed={size === option}
                  className={cn(
                    "min-w-[74px] rounded-sm border px-4 py-3 text-sm font-medium transition-colors",
                    size === option
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* colour */}
          <div className="mt-8">
            <div className="flex items-baseline justify-between">
              <p className="eyebrow">Colour</p>
              <span className="text-xs text-muted-foreground">
                {color ?? "Select a colour"}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {product.colors.map((option) => (
                <button
                  key={option.name}
                  type="button"
                  onClick={() => setColor(option.name)}
                  aria-pressed={color === option.name}
                  className={cn(
                    "flex items-center gap-2.5 rounded-sm border px-3 py-2.5 text-sm transition-colors",
                    color === option.name
                      ? "border-foreground"
                      : "border-border hover:border-foreground/40",
                  )}
                >
                  <span
                    className="flex size-5 items-center justify-center rounded-full border border-black/15"
                    style={{ backgroundColor: option.hex }}
                  >
                    {color === option.name && (
                      <Check className="size-3 text-white mix-blend-difference" />
                    )}
                  </span>
                  {option.name}
                </button>
              ))}
            </div>
          </div>

          {/* single CTA */}
          <div className="mt-10">
            {ready ? (
              <a
                href={orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 w-full items-center justify-center gap-3 rounded-sm bg-accent text-[12px] font-bold uppercase tracking-[0.18em] text-accent-foreground transition-transform duration-300 hover:scale-[1.01]"
              >
                <WhatsAppIcon className="size-5" />
                Order via WhatsApp
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="flex h-14 w-full cursor-not-allowed items-center justify-center gap-3 rounded-sm bg-muted text-[12px] font-bold uppercase tracking-[0.18em] text-muted-foreground"
              >
                <WhatsAppIcon className="size-5" />
                Order via WhatsApp
              </button>
            )}

            <p className="mt-3 text-center text-xs text-muted-foreground">
              {ready
                ? "Opens WhatsApp with your selection pre-filled."
                : "Select a size and colour to continue."}
            </p>

            {ready && (
              <div className="mt-5 rounded-sm border border-border bg-secondary/50 p-4">
                <p className="eyebrow text-muted-foreground">
                  Message preview
                </p>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {previewMessage}
                </p>
              </div>
            )}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 border-t border-border pt-8">
            {PERKS.map((perk) => (
              <div key={perk.label} className="flex items-center gap-2.5">
                <perk.icon className="size-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {perk.label}
                </span>
              </div>
            ))}
          </div>

          <Accordion type="single" collapsible className="mt-8">
            <AccordionItem value="sizing">
              <AccordionTrigger className="font-display text-xs uppercase tracking-[0.18em] hover:no-underline">
                Sizing
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                Sneakers run true to size across the brands we stock. If
                you&apos;re between sizes, size up for a roomier fit. Send us a
                note on WhatsApp and we&apos;ll match you to the right pair.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping">
              <AccordionTrigger className="font-display text-xs uppercase tracking-[0.18em] hover:no-underline">
                Shipping &amp; exchange
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                Dispatched within 24 hours of confirmation. Delivery takes 3–6
                working days across India. Unworn pairs can be exchanged for a
                different size within 7 days of delivery, and damaged pairs are
                exchanged or paid back within 3 days.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="authenticity">
              <AccordionTrigger className="font-display text-xs uppercase tracking-[0.18em] hover:no-underline">
                Sourcing &amp; trademarks
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                Every pair is sourced through vetted distributors and inspected
                in hand before dispatch. DRAAG.CO is an independent retailer —
                all brand names and trademarks belong to their respective
                owners.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-border bg-secondary/40">
          <div className="container-x py-16 lg:py-20">
            <Reveal>
              <p className="eyebrow text-muted-foreground">You may also like</p>
              <h2 className="display mt-4 text-3xl sm:text-4xl">
                Pair it with these.
              </h2>
            </Reveal>
            <RevealStagger className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
              {related.map((item, index) => (
                <RevealItem key={item.slug}>
                  <ProductCard product={item} frame={(index + 1) % 4} />
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>
      )}

      <section className="border-t border-border">
        <div className="container-x py-12">
          <p className="text-xs leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">
              Independent retailer notice:{" "}
            </span>
            DRAAG.CO is an independent retailer and is not affiliated with or
            endorsed by {BRANDS.map((b) => b.name).join(", ")}, or any other
            brand mentioned. All trademarks belong to their respective owners.
          </p>
        </div>
      </section>
    </>
  );
}
