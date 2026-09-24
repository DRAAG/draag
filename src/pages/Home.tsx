import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, PackageCheck, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router";

import { EditorialImage } from "@/components/store/EditorialImage";
import { ProductCard } from "@/components/store/ProductCard";
import { Reveal, RevealItem, RevealStagger } from "@/components/store/Reveal";
import { ScrollShowcase } from "@/components/store/ScrollShowcase";
import { WhatsAppIcon } from "@/components/store/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import {
  BRANDS,
  CATEGORIES,
  brandName,
  filterProducts,
  formatPrice,
} from "@/data/products";
import { whatsappChatUrl } from "@/lib/whatsapp";

const EASE = [0.16, 1, 0.3, 1] as const;

const heroSneaker = filterProducts({ category: "sneakers", tag: "featured" })[0];

const STATS = [
  { value: "5", label: "Brands stocked" },
  { value: "3", label: "Categories" },
  { value: "100%", label: "Authentic sourcing" },
  { value: "24h", label: "Dispatch window" },
];

const STEPS = [
  {
    icon: Sparkles,
    title: "Pick your pair",
    copy: "Browse the grid, open a product and choose your size and colour.",
  },
  {
    icon: WhatsAppIcon,
    title: "Tap Order on WhatsApp",
    copy: "Your selection is pre-filled into a message. No forms, no carts.",
  },
  {
    icon: PackageCheck,
    title: "Confirm and receive",
    copy: "We confirm availability, share payment details and dispatch in 24h.",
  },
];

export default function Home() {
  const trending = filterProducts({ tag: "trending" });
  const featuredGrid = [
    ...trending,
    ...filterProducts({ limit: 8 }).filter(
      (p) => !trending.some((t) => t.slug === p.slug),
    ),
  ].slice(0, 8);

  return (
    <>
      {/* ---------------------------------------------------------------- hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in oklab, var(--foreground) 6%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--foreground) 6%, transparent) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div className="container-x relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="eyebrow inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-muted-foreground"
            >
              <span className="size-1.5 rounded-full bg-accent" />
              Independent multi-brand retailer
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.06, ease: EASE }}
              className="display mt-6 text-[13vw] leading-[0.9] sm:text-6xl lg:text-[4.6rem] xl:text-[5.4rem]"
            >
              Sneakers worth
              <br />
              the scroll.
              <span className="block text-muted-foreground">
                Shades worth the stare.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
              className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground"
            >
              DRAAG.CO curates Adidas, Nike, Puma, New Balance and Asics in small
              runs out of India. No cart, no checkout — you pick a size and
              colour, and we finish the order over WhatsApp.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24, ease: EASE }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Button
                asChild
                size="lg"
                className="h-12 rounded-sm px-6 text-[11px] font-semibold uppercase tracking-[0.16em]"
              >
                <Link to="/category/sneakers">
                  Shop sneakers
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-sm border-foreground/20 px-6 text-[11px] font-semibold uppercase tracking-[0.16em]"
              >
                <Link to="/category/sunglasses">Shop sunglasses</Link>
              </Button>
              <a
                href={whatsappChatUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
              >
                <WhatsAppIcon className="size-4" />
                Ask a question
              </a>
            </motion.div>

            <div className="mt-12 grid max-w-lg grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
              {STATS.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.06, ease: EASE }}
                >
                  <p className="display text-2xl">{stat.value}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1, ease: EASE }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-sm border border-border bg-secondary">
              <div className="aspect-[4/5] w-full">
                <EditorialImage
                  category={heroSneaker.category}
                  brand={brandName(heroSneaker.brand)}
                  title={heroSneaker.name}
                  frame={0}
                  alt="Featured sneaker placeholder"
                />
              </div>
            </div>
            <div className="absolute -bottom-5 left-5 right-5 flex items-center justify-between gap-4 rounded-sm border border-border bg-background/95 px-5 py-4 backdrop-blur sm:left-8 sm:right-auto sm:w-72">
              <div className="min-w-0">
                <p className="eyebrow text-muted-foreground">
                  {brandName(heroSneaker.brand)}
                </p>
                <p className="display mt-1 truncate text-sm">
                  {heroSneaker.name}
                </p>
              </div>
              <p className="shrink-0 text-sm font-semibold">
                {formatPrice(heroSneaker.price)}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------- signature scroll showcase */}
      <ScrollShowcase />

      {/* -------------------------------------------------------- brand strip */}
      <div className="overflow-hidden border-b border-border bg-secondary/50 py-5">
        <div className="marquee-track flex w-max items-center">
          {[...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS].map((brand, index) => (
            <span
              key={`${brand.slug}-${index}`}
              className="flex items-center whitespace-nowrap font-display text-lg font-semibold uppercase tracking-[0.18em] text-muted-foreground/70"
            >
              {brand.name}
              <span className="mx-8 inline-block size-1.5 rounded-full bg-accent" />
            </span>
          ))}
        </div>
      </div>

      {/* ----------------------------------------------------------- trending */}
      <section className="container-x py-20 lg:py-28">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-muted-foreground">Trending now</p>
            <h2 className="display mt-4 text-4xl leading-[1.05] sm:text-5xl">
              In the rotation.
            </h2>
          </div>
          <Link
            to="/new-arrivals"
            className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
          >
            View all arrivals
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>

        <RevealStagger className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
          {featuredGrid.map((product, index) => (
            <RevealItem key={product.slug}>
              <ProductCard product={product} frame={index % 4} />
            </RevealItem>
          ))}
        </RevealStagger>
      </section>

      {/* ------------------------------------------------------ shop by brand */}
      <section className="border-y border-border bg-secondary/40">
        <div className="container-x py-20 lg:py-24">
          <Reveal>
            <p className="eyebrow text-muted-foreground">Shop by brand</p>
            <h2 className="display mt-4 max-w-2xl text-4xl leading-[1.05] sm:text-5xl">
              Five houses. One edit.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              We aren&apos;t a flagship and we don&apos;t pretend to be. These
              are brand filters for the labels we stock — nothing more.
            </p>
          </Reveal>

          <RevealStagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BRANDS.map((brand, index) => {
              const count = filterProducts({ brand: brand.slug }).length;
              return (
                <RevealItem key={brand.slug}>
                  <Link
                    to={`/brand/${brand.slug}`}
                    className="group relative flex h-full flex-col justify-between overflow-hidden rounded-sm border border-border bg-background p-6 transition-all duration-300 hover:border-foreground/30 hover:shadow-[0_18px_40px_-28px_rgba(0,0,0,0.45)]"
                  >
                    <span
                      aria-hidden
                      className="absolute right-0 top-0 h-16 w-16 -translate-y-8 translate-x-8 rounded-full bg-accent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
                    />
                    <div className="relative">
                      <p className="display text-3xl">{brand.name}</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                        {brand.origin} · {count} styles
                      </p>
                    </div>
                    <p className="relative mt-8 max-w-xs text-sm leading-relaxed text-muted-foreground">
                      {brand.blurb}
                    </p>
                    <span className="relative mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]">
                      Browse {brand.name}
                      <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <span className="absolute bottom-6 right-6 font-display text-xs text-muted-foreground/40">
                      0{index + 1}
                    </span>
                  </Link>
                </RevealItem>
              );
            })}

            <RevealItem>
              <div className="flex h-full flex-col justify-between rounded-sm border border-foreground/15 bg-foreground p-6 text-background">
                <div>
                  <p className="eyebrow text-accent">Categories</p>
                  <p className="display mt-4 text-2xl">
                    Not sure where to start?
                  </p>
                </div>
                <div className="mt-8 flex flex-col gap-2">
                  {CATEGORIES.map((category) => (
                    <Link
                      key={category.slug}
                      to={`/category/${category.slug}`}
                      className="group flex items-center justify-between border-b border-white/10 py-3 text-sm transition-colors last:border-none hover:text-accent"
                    >
                      {category.name}
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  ))}
                </div>
              </div>
            </RevealItem>
          </RevealStagger>
        </div>
      </section>

      {/* -------------------------------------------------------- how it works */}
      <section className="container-x py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow text-muted-foreground">How ordering works</p>
            <h2 className="display mt-4 text-4xl leading-[1.05] sm:text-5xl">
              Three taps, then a human.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              There is deliberately no cart and no checkout on this site. You
              choose what you want and we take it from there — sizing advice,
              stock confirmation and dispatch, all in one chat.
            </p>
            <div className="mt-8 inline-flex items-center gap-2.5 rounded-sm border border-border bg-secondary/60 px-4 py-3 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 text-foreground" />
              Every pair is inspected and verified before it ships.
            </div>
          </Reveal>

          <RevealStagger className="grid gap-4">
            {STEPS.map((step, index) => (
              <RevealItem key={step.title}>
                <div className="flex gap-5 rounded-sm border border-border bg-background p-6">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-sm bg-foreground text-background">
                    <step.icon className="size-5" />
                  </span>
                  <div>
                    <p className="font-display text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Step 0{index + 1}
                    </p>
                    <p className="display mt-2 text-lg">{step.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.copy}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* --------------------------------------------------------- cta banner */}
      <section className="border-t border-border bg-foreground text-background">
        <div className="container-x grid items-center gap-10 py-16 lg:grid-cols-[1.2fr_1fr] lg:py-20">
          <Reveal>
            <p className="eyebrow text-accent">Live stock, real answers</p>
            <h2 className="display mt-4 text-4xl leading-[1.05] sm:text-5xl">
              Tell us the size. We&apos;ll find the pair.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-background/65">
              Message us with a silhouette in mind and we&apos;ll come back with
              what&apos;s available, in your size, at the best price we can hold
              it at.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-wrap gap-3 lg:justify-end">
            <a
              href={whatsappChatUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2.5 rounded-sm bg-accent px-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-foreground transition-colors hover:bg-accent/85"
            >
              <WhatsAppIcon className="size-4" />
              Chat on WhatsApp
            </a>
            <Link
              to="/faq"
              className="inline-flex h-12 items-center rounded-sm border border-white/20 px-6 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors hover:border-white/50 hover:bg-white/5"
            >
              Read the FAQ
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
