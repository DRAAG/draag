import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";

import { EditorialImage } from "@/components/store/EditorialImage";
import {
  CATEGORIES,
  brandName,
  filterProducts,
  formatPrice,
  type Category,
  type Product,
} from "@/data/products";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

function ShowcaseRow({
  category,
  index,
  product,
  count,
  fromPrice,
  active,
  onActivate,
}: {
  category: Category;
  index: number;
  product: Product;
  count: number;
  fromPrice: number;
  active: boolean;
  onActivate: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onActivate(index);
  }, [inView, index, onActivate]);

  return (
    <div
      ref={ref}
      className="border-t border-white/10 py-14 first:border-t-0 lg:flex lg:min-h-[76vh] lg:flex-col lg:justify-center lg:py-0"
    >
      <motion.div
        initial={{ opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.75, ease: EASE }}
      >
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "block h-[2px] transition-all duration-500",
              active ? "w-10 bg-accent" : "w-5 bg-white/25",
            )}
          />
          <p className="eyebrow text-accent">
            0{index + 1} / 0{CATEGORIES.length} — {category.tagline}
          </p>
        </div>

        <h3 className="display mt-5 text-[13vw] leading-[0.92] sm:text-6xl lg:text-6xl xl:text-7xl">
          {category.headline}
        </h3>

        <p className="mt-5 max-w-md text-sm leading-relaxed text-background/65">
          {category.copy}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            to={`/category/${category.slug}`}
            className="group inline-flex h-11 items-center gap-2 rounded-sm bg-accent px-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-foreground transition-colors hover:bg-accent/85"
          >
            Shop {category.name}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            to={`/brand/${product.brand}`}
            className="inline-flex h-11 items-center rounded-sm border border-white/20 px-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-background transition-colors hover:border-white/50 hover:bg-white/5"
          >
            {brandName(product.brand)} collection
          </Link>
        </div>

        {/* Mobile / tablet visual — the sticky panel only exists on large screens */}
        <div className="mt-10 aspect-[4/5] w-full overflow-hidden rounded-sm bg-black lg:hidden">
          <EditorialImage
            category={category.slug}
            brand={brandName(product.brand)}
            title={product.name}
            frame={index + 1}
          />
        </div>

        <div className="mt-10 flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-background/45">
          <span>{count} styles in stock</span>
          <span className="h-px flex-1 bg-white/15" />
          <span>From {formatPrice(fromPrice)}</span>
        </div>
      </motion.div>
    </div>
  );
}

export function ScrollShowcase() {
  const [active, setActive] = useState(0);
  const onActivate = useCallback((index: number) => setActive(index), []);

  const entries = CATEGORIES.map((category) => {
    const items = filterProducts({ category: category.slug });
    return {
      category,
      product: items[0],
      count: items.length,
      fromPrice: Math.min(...items.map((p) => p.price)),
    };
  }).filter((entry): entry is typeof entry & { product: Product } =>
    Boolean(entry.product),
  );

  return (
    <section className="border-y border-border bg-foreground text-background">
      <div className="container-x pt-20 sm:pt-24 lg:pt-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow text-accent">The showcase</p>
            <h2 className="display mt-4 text-4xl leading-[1.05] sm:text-5xl">
              Three ways to move.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-background/60">
            Scroll to walk through the three categories we live in. Each one is
            sourced in small runs and sold one conversation at a time.
          </p>
        </div>
      </div>

      <div className="container-x grid gap-8 pb-20 pt-12 lg:grid-cols-2 lg:gap-16 lg:pb-28 lg:pt-16">
        <div className="hidden lg:block">
          <div className="sticky top-28">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-black">
              {entries.map((entry, index) => (
                <motion.div
                  key={entry.category.slug}
                  className="absolute inset-0"
                  animate={{
                    opacity: active === index ? 1 : 0,
                    scale: active === index ? 1 : 1.07,
                  }}
                  transition={{ duration: 0.9, ease: EASE }}
                  style={{ zIndex: active === index ? 2 : 1 }}
                >
                  <EditorialImage
                    category={entry.category.slug}
                    brand={brandName(entry.product.brand)}
                    title={entry.product.name}
                    frame={index + 1}
                  />
                </motion.div>
              ))}

              <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between bg-linear-to-t from-black/70 to-transparent p-5">
                <span className="eyebrow text-white/80">
                  {entries[active]?.category.name}
                </span>
                <span className="font-display text-xs tracking-[0.2em] text-white/60">
                  0{active + 1}
                </span>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              {entries.map((entry, index) => (
                <span
                  key={entry.category.slug}
                  className={cn(
                    "h-[3px] flex-1 rounded-full transition-colors duration-500",
                    active === index ? "bg-accent" : "bg-white/15",
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <div>
          {entries.map((entry, index) => (
            <ShowcaseRow
              key={entry.category.slug}
              category={entry.category}
              index={index}
              product={entry.product}
              count={entry.count}
              fromPrice={entry.fromPrice}
              active={active === index}
              onActivate={onActivate}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
