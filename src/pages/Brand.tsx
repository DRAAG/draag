import { useMemo, useState } from "react";
import { Link, useParams } from "react-router";

import { ProductCard } from "@/components/store/ProductCard";
import { Reveal, RevealItem, RevealStagger } from "@/components/store/Reveal";
import { Button } from "@/components/ui/button";
import {
  brandName,
  filterProducts,
  formatPrice,
  getBrand,
  type CategorySlug,
} from "@/data/products";
import { cn } from "@/lib/utils";

const TRADEMARK_LINE =
  "DRAAG.CO is an independent retailer. All brand names, logos, and trademarks belong to their respective owners.";

export default function BrandPage() {
  const { slug = "" } = useParams();
  const brand = getBrand(slug);
  const [filter, setFilter] = useState<CategorySlug | "all">("all");

  const all = useMemo(
    () => (brand ? filterProducts({ brand: brand.slug }) : []),
    [brand],
  );

  if (!brand) {
    return (
      <div className="container-x py-28 text-center">
        <p className="eyebrow text-muted-foreground">404</p>
        <h1 className="display mt-4 text-4xl">Brand not found</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          We stock Adidas, Nike, Puma, New Balance and Asics.
        </p>
        <Button asChild className="mt-8 rounded-sm">
          <Link to="/brands">See all brands</Link>
        </Button>
      </div>
    );
  }

  const categories = Array.from(new Set(all.map((p) => p.category)));
  const results = all.filter((p) => filter === "all" || p.category === filter);

  return (
    <>
      <section className="border-b border-border bg-foreground text-background">
        <div className="container-x py-16 lg:py-24">
          <nav className="flex items-center gap-2 text-xs text-background/50">
            <Link to="/" className="transition-colors hover:text-background">
              Home
            </Link>
            <span>/</span>
            <Link
              to="/brands"
              className="transition-colors hover:text-background"
            >
              Brands
            </Link>
            <span>/</span>
            <span className="text-background">{brand.name}</span>
          </nav>

          <p className="eyebrow mt-8 text-accent">{brand.origin}</p>
          <h1 className="display mt-4 text-[14vw] leading-[0.9] sm:text-7xl lg:text-8xl">
            {brand.name}
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-background/65">
            {brand.blurb}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.16em] text-background/50">
            <span>{all.length} styles stocked</span>
            <span className="size-1 rounded-full bg-accent" />
            <span>
              From {formatPrice(Math.min(...all.map((p) => p.price)))}
            </span>
          </div>
        </div>
      </section>

      <section className="container-x py-12 lg:py-16">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={cn(
              "rounded-sm border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors",
              filter === "all"
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
            )}
          >
            All ({all.length})
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              className={cn(
                "rounded-sm border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] capitalize transition-colors",
                filter === category
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
              )}
            >
              {category} (
              {all.filter((p) => p.category === category).length})
            </button>
          ))}
        </div>

        <RevealStagger
          key={`${slug}-${filter}`}
          className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4 lg:gap-x-6"
        >
          {results.map((product, index) => (
            <RevealItem key={product.slug}>
              <ProductCard product={product} frame={index % 4} />
            </RevealItem>
          ))}
        </RevealStagger>

        <Reveal className="mt-16 rounded-sm border border-border bg-secondary/50 p-5">
          <p className="text-xs leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">
              Independent retailer notice:{" "}
            </span>
            {TRADEMARK_LINE}
          </p>
        </Reveal>
      </section>

      <section className="border-t border-border">
        <div className="container-x flex flex-wrap items-center justify-between gap-6 py-14">
          <div>
            <p className="display text-2xl">
              Want another {" "}
              <span className="text-muted-foreground">{brand.name}</span>{" "}
              silhouette?
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              We source to order. Tell us the model and size and we&apos;ll try.
            </p>
          </div>
          <Button asChild variant="outline" className="h-11 rounded-sm px-6 text-[11px] font-semibold uppercase tracking-[0.16em]">
            <Link to="/contact">Request a pair</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
