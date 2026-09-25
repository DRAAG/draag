import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import { ProductCard } from "@/components/store/ProductCard";
import { Reveal, RevealItem, RevealStagger } from "@/components/store/Reveal";
import { WhatsAppIcon } from "@/components/store/WhatsAppIcon";
import { CATEGORIES, PRODUCTS, filterProducts } from "@/data/products";
import { whatsappChatUrl } from "@/lib/whatsapp";

export default function NewArrivals() {
  const newIn = filterProducts({ tag: "new" });
  const trending = filterProducts({ tag: "trending" });
  const rest = PRODUCTS.filter(
    (p) => !newIn.some((n) => n.slug === p.slug),
  );
  const grid = [...newIn, ...trending, ...rest]
    .filter((p, index, arr) => arr.findIndex((x) => x.slug === p.slug) === index)
    .slice(0, 10);

  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="container-x py-16 lg:py-24">
          <Reveal>
            <p className="eyebrow text-muted-foreground">New arrivals</p>
            <h1 className="display mt-6 max-w-3xl text-[12vw] leading-[0.95] sm:text-6xl lg:text-7xl">
              Fresh off the last drop.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground">
              New stock lands every day, in limited quantities. What you see is
              what&apos;s on hand — when a size goes, it goes.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className="group inline-flex items-center gap-2 rounded-sm border border-border bg-background px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors hover:border-foreground/40"
                >
                  {category.name}
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-16 lg:py-20">
        <RevealStagger className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
          {grid.map((product, index) => (
            <RevealItem key={product.slug}>
              <ProductCard product={product} frame={index % 4} />
            </RevealItem>
          ))}
        </RevealStagger>

        <Reveal className="mt-16 flex flex-col items-start justify-between gap-6 rounded-sm border border-border bg-foreground p-8 text-background sm:flex-row sm:items-center lg:p-10">
          <div>
            <p className="eyebrow text-accent">Restock alerts</p>
            <p className="display mt-3 text-2xl">
              Want first look at the next drop?
            </p>
            <p className="mt-2 max-w-md text-sm text-background/60">
              Message us the silhouette and size you&apos;re chasing. We&apos;ll
              ping you the moment it lands.
            </p>
          </div>
          <a
            href={whatsappChatUrl(
              "Hi DRAAG.CO, please add me to the restock list.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 shrink-0 items-center gap-2.5 rounded-sm bg-accent px-6 text-[11px] font-bold uppercase tracking-[0.18em] text-accent-foreground transition-colors hover:bg-accent/85"
          >
            <WhatsAppIcon className="size-4" />
            Join the list
          </a>
        </Reveal>
      </section>
    </>
  );
}
