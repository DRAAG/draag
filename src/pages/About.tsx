import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router";

import { EditorialImage } from "@/components/store/EditorialImage";
import { Reveal, RevealItem, RevealStagger } from "@/components/store/Reveal";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/data/products";

const NUMBERS = [
  { value: "2021", label: "Year we started" },
  { value: "12,400+", label: "Pairs delivered" },
  { value: "5", label: "Brands curated" },
  { value: "4.8/5", label: "Buyer rating" },
];

const PRINCIPLES = [
  {
    title: "Small runs, real stock",
    copy: "We buy in limited quantities and list only what we can actually put our hands on. If it's on this site, it exists.",
  },
  {
    title: "One conversation per order",
    copy: "No cart, no checkout, no auto-replies. Every order is confirmed by a person who has the product in front of them.",
  },
  {
    title: "Verified before it ships",
    copy: "Stitching, sizing, box labels and material feel — checked in hand before anything leaves the studio.",
  },
  {
    title: "Independent, and honest about it",
    copy: "We're a multi-brand retailer, not a flagship. We say so everywhere, and we let the product do the talking.",
  },
];

export default function About() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-x py-16 lg:py-24">
          <Reveal>
            <p className="eyebrow text-muted-foreground">About DRAAG.CO</p>
            <h1 className="display mt-6 max-w-4xl text-[12vw] leading-[0.95] sm:text-6xl lg:text-7xl">
              A small shop with a very specific obsession.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground">
              DRAAG.CO started in a spare room with three pairs of sneakers, a
              phone number and a WhatsApp list of forty people. Five years on
              we&apos;re still independent, still answering every message
              ourselves, and still convinced that the best way to sell a pair of
              shoes is to talk about it.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-x grid gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <Reveal className="order-2 lg:order-1">
          <div className="overflow-hidden rounded-sm border border-border bg-secondary">
            <div className="aspect-[4/5] w-full">
              <EditorialImage
                category="sneakers"
                brand="DRAAG.CO"
                title="The studio"
                frame={1}
                alt="Editorial studio placeholder"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="order-1 lg:order-2">
          <p className="eyebrow text-muted-foreground">The story</p>
          <h2 className="display mt-4 text-3xl leading-[1.1] sm:text-4xl">
            Built the slow way, on purpose.
          </h2>
          <div className="mt-6 space-y-5 text-sm leading-relaxed text-muted-foreground">
            <p>
              We never wanted to run a marketplace. Sneakers move fast, sizes
              disappear, and a grid of forty near-identical products doesn&apos;t
              help anyone decide. So we went the other way: a tight edit, honest
              photography, and a conversation instead of a checkout page.
            </p>
            <p>
              Sunglasses came next — sport frames and street shapes that work
              with the same rotation. Then watches, because the people buying
              our sneakers kept asking what to pair with them. Three categories,
              five brands, one standard.
            </p>
            <p>
              Today DRAAG.CO ships across India. The catalogue is still small
              enough that we know every product on it, and the WhatsApp number
              is still the same one from the spare room.
            </p>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild className="h-11 rounded-sm px-6 text-[11px] font-semibold uppercase tracking-[0.16em]">
              <Link to="/new-arrivals">
                Shop new arrivals
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-sm px-6 text-[11px] font-semibold uppercase tracking-[0.16em]"
            >
              <Link to="/contact">Talk to us</Link>
            </Button>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-border bg-foreground text-background">
        <div className="container-x grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:py-20">
          {NUMBERS.map((item, index) => (
            <Reveal key={item.label} delay={index * 0.06}>
              <p className="display text-4xl lg:text-5xl">{item.value}</p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-background/50">
                {item.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x py-16 lg:py-24">
        <Reveal>
          <p className="eyebrow text-muted-foreground">How we work</p>
          <h2 className="display mt-4 max-w-2xl text-3xl leading-[1.1] sm:text-4xl">
            Four things we refuse to compromise on.
          </h2>
        </Reveal>

        <RevealStagger className="mt-12 grid gap-4 sm:grid-cols-2">
          {PRINCIPLES.map((principle, index) => (
            <RevealItem key={principle.title}>
              <div className="h-full rounded-sm border border-border bg-background p-7">
                <p className="font-display text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  0{index + 1}
                </p>
                <p className="display mt-4 text-xl">{principle.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {principle.copy}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className="container-x grid gap-10 py-16 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:py-24">
          <Reveal>
            <p className="eyebrow text-muted-foreground">What we stock</p>
            <h2 className="display mt-4 text-3xl leading-[1.1] sm:text-4xl">
              Three categories, edited hard.
            </h2>
            <ul className="mt-8 space-y-3">
              {CATEGORIES.map((category) => (
                <li key={category.slug} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-foreground" />
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {category.name} —{" "}
                    </span>
                    {category.copy}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <RevealStagger className="grid grid-cols-3 gap-3">
            {CATEGORIES.map((category, index) => (
              <RevealItem key={category.slug}>
                <Link
                  to={`/category/${category.slug}`}
                  className="group block overflow-hidden rounded-sm border border-border bg-background"
                >
                  <span className="block aspect-[3/4] w-full overflow-hidden">
                    <EditorialImage
                      category={category.slug}
                      brand="DRAAG.CO"
                      title={category.name}
                      frame={index}
                      className="transition-transform duration-700 group-hover:scale-105"
                    />
                  </span>
                  <span className="flex items-center justify-between px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.14em]">
                    {category.name}
                    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container-x py-16 lg:py-20">
          <Reveal className="rounded-sm border border-border bg-secondary/50 p-8 lg:p-12">
            <p className="eyebrow text-muted-foreground">Independent retailer</p>
            <h2 className="display mt-4 max-w-2xl text-2xl leading-[1.2] sm:text-3xl">
              We&apos;re a multi-brand retailer — not a brand.
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              DRAAG.CO is an independent retailer and is not affiliated with or
              endorsed by Adidas, Nike, Puma, New Balance, Asics, or any other
              brand mentioned. All product names, logos, and trademarks are the
              property of their respective owners and are used here only to
              describe the products we stock.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
