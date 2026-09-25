import { MotionConfig, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
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

const EASE = [0.16, 1, 0.3, 1] as const;

interface ShowcaseEntry {
  category: Category;
  product: Product;
  count: number;
  fromPrice: number;
}

/**
 * One of the three category sections. Every panel reveals itself as soon as it
 * is on screen, staggered left → right so all three come up side by side.
 */
function ShowcasePanel({
  entry,
  index,
}: {
  entry: ShowcaseEntry;
  index: number;
}) {
  const { category, product, count, fromPrice } = entry;
  const delay = index * 0.14;

  return (
    <motion.article
      initial={{ opacity: 0, y: 104 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className="flex h-full flex-col"
    >
      <Link
        to={`/category/${category.slug}`}
        className="group/img relative block aspect-[4/3] overflow-hidden rounded-sm bg-black sm:aspect-[16/10] lg:aspect-[3/4]"
      >
        <motion.div
          className="absolute inset-0"
          initial={{ y: "34%" }}
          whileInView={{ y: "0%" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, delay: delay + 0.08, ease: EASE }}
        >
          <EditorialImage
            category={category.slug}
            brand={brandName(product.brand)}
            title={product.name}
            frame={index + 1}
            className="transition-transform duration-700 ease-out group-hover/img:scale-[1.05]"
          />
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4 sm:p-5">
          <span className="eyebrow text-white/55">0{index + 1}</span>
          <span className="eyebrow text-white/70">/ 03</span>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-linear-to-t from-black/85 via-black/40 to-transparent p-4 sm:p-5">
          <div>
            <span className="eyebrow text-accent">{category.tagline}</span>
            <h3 className="display mt-2 text-3xl leading-none text-white sm:text-4xl">
              {category.name}
            </h3>
          </div>
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur-sm transition-colors duration-300 group-hover/img:border-accent group-hover/img:bg-accent group-hover/img:text-accent-foreground">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </Link>

      <p className="mt-6 text-sm leading-relaxed text-background/65">
        {category.copy}
      </p>

      <div className="mt-6 flex items-center gap-4 text-[10px] uppercase tracking-[0.18em] text-background/45">
        <span className="whitespace-nowrap">{count} styles in stock</span>
        <span className="h-px flex-1 bg-white/15" />
        <span className="whitespace-nowrap">From {formatPrice(fromPrice)}</span>
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-8">
        <Link
          to={`/category/${category.slug}`}
          className="group/cta inline-flex h-11 items-center gap-2 rounded-sm bg-accent px-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-foreground transition-colors hover:bg-accent/85"
        >
          Shop {category.name}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
        </Link>
        <Link
          to={`/brand/${product.brand}`}
          className="text-[11px] font-semibold uppercase tracking-[0.16em] text-background/55 transition-colors hover:text-background"
        >
          {brandName(product.brand)} collection
        </Link>
      </div>
    </motion.article>
  );
}

export function ScrollShowcase() {
  const entries = CATEGORIES.map((category) => {
    const items = filterProducts({ category: category.slug });
    return {
      category,
      product: items[0],
      count: items.length,
      fromPrice: items.length ? Math.min(...items.map((p) => p.price)) : 0,
    };
  }).filter((entry): entry is ShowcaseEntry => Boolean(entry.product));

  return (
    <section className="border-y border-border bg-foreground text-background">
      <div className="container-x pt-20 sm:pt-24 lg:pt-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow text-accent">The showcase</p>
            <h2 className="display mt-4 text-4xl leading-[1.05] sm:text-5xl">
              Three racks. One scroll.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-background/60">
            Keep scrolling and all three come up together — shades, sneakers and
            watches, side by side. Each rack is sourced in small runs and sold
            one conversation at a time.
          </p>
        </div>
      </div>

      <MotionConfig reducedMotion="user">
        <div className="container-x grid gap-12 pb-20 pt-14 sm:gap-14 lg:grid-cols-3 lg:gap-6 lg:pb-28 lg:pt-20">
          {entries.map((entry, index) => (
            <ShowcasePanel
              key={entry.category.slug}
              entry={entry}
              index={index}
            />
          ))}
        </div>
      </MotionConfig>
    </section>
  );
}
