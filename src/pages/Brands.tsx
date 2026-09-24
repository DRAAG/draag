import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import { Reveal, RevealItem, RevealStagger } from "@/components/store/Reveal";
import { BRANDS, filterProducts } from "@/data/products";

export default function Brands() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-x py-16 lg:py-24">
          <Reveal>
            <p className="eyebrow text-muted-foreground">Brands</p>
            <h1 className="display mt-6 max-w-3xl text-[12vw] leading-[0.95] sm:text-6xl lg:text-7xl">
              The houses we carry.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Five labels, filtered into one edit. These are brand filters, not
              partnerships — DRAAG.CO is a stockist, and every trademark belongs
              to its owner.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-16 lg:py-20">
        <RevealStagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BRANDS.map((brand, index) => {
            const items = filterProducts({ brand: brand.slug });
            const categories = Array.from(
              new Set(items.map((p) => p.category)),
            );
            return (
              <RevealItem key={brand.slug}>
                <Link
                  to={`/brand/${brand.slug}`}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-sm border border-border bg-background p-7 transition-all duration-300 hover:border-foreground/30 hover:shadow-[0_20px_50px_-32px_rgba(0,0,0,0.5)]"
                >
                  <div>
                    <p className="font-display text-xs tracking-[0.2em] text-muted-foreground/50">
                      0{index + 1}
                    </p>
                    <p className="display mt-6 text-4xl">{brand.name}</p>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                      {brand.origin} · {items.length} styles
                    </p>
                  </div>

                  <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
                    {brand.blurb}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <span
                        key={category}
                        className="rounded-full border border-border px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] capitalize text-muted-foreground"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  <span className="mt-7 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]">
                    Explore {brand.name}
                    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>

                  <span
                    aria-hidden
                    className="absolute right-0 top-0 h-20 w-20 -translate-y-10 translate-x-10 rounded-full bg-accent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
                  />
                </Link>
              </RevealItem>
            );
          })}

          <RevealItem>
            <div className="flex h-full flex-col justify-between rounded-sm border border-foreground/15 bg-foreground p-7 text-background">
              <div>
                <p className="eyebrow text-accent">Sourcing</p>
                <p className="display mt-6 text-3xl leading-tight">
                  Looking for something we don&apos;t list?
                </p>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-background/60">
                We source to order through vetted distributors. Send us the
                model, size and colourway and we&apos;ll come back with a quote.
              </p>
              <Link
                to="/contact"
                className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-sm bg-accent text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-foreground transition-colors hover:bg-accent/85"
              >
                Request a pair
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </RevealItem>
        </RevealStagger>

        <Reveal className="mt-14 rounded-sm border border-border bg-secondary/50 p-5">
          <p className="text-xs leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">Disclaimer: </span>
            DRAAG.CO is an independent retailer. All brand names, logos, and
            trademarks belong to their respective owners and are referenced only
            to describe the products we stock.
          </p>
        </Reveal>
      </section>
    </>
  );
}
