import { Link } from "react-router";

import { Reveal } from "@/components/store/Reveal";
import { WhatsAppIcon } from "@/components/store/WhatsAppIcon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { whatsappChatUrl } from "@/lib/whatsapp";

const SECTIONS = [
  {
    id: "ordering",
    title: "Ordering via WhatsApp",
    items: [
      {
        q: "How do I actually place an order?",
        a: "Open any product, choose your size and colour, then tap “Order via WhatsApp”. Your selection is copied into a pre-filled message so you never have to type the details out. Send it, and we reply with availability and a payment link.",
      },
      {
        q: "Is there a cart or a checkout on this site?",
        a: "No — deliberately. DRAAG.CO has no cart, no checkout and no payment gateway. This keeps pricing honest and lets us confirm stock in hand before you pay anything.",
      },
      {
        q: "What information should I include?",
        a: "Product name, brand, size and colour — all of which are filled in automatically by the WhatsApp button. If you have a specific colourway in mind, add that in the chat.",
      },
      {
        q: "How long do replies take?",
        a: "Usually under 15 minutes during studio hours (Mon–Sat, 10:00–19:00 IST). Late-night messages get answered first thing the next morning.",
      },
      {
        q: "How do I pay?",
        a: "Once we confirm the pair is available in your size, we share a secure payment link or UPI handle. We never ask for payment before confirming stock.",
      },
    ],
  },
  {
    id: "sizing",
    title: "Sizing guide",
    items: [
      {
        q: "Do sneakers run true to size?",
        a: "Yes, across the brands we stock. Order your usual size. If you wear a different size in one brand, mention it in the chat and we'll match accordingly.",
      },
      {
        q: "What if I'm between sizes?",
        a: "Size up. Sneakers settle with wear and a half-size larger gives you room without looking bulky. For chunky silhouettes, staying true to size works better.",
      },
      {
        q: "How do sunglasses fit?",
        a: "All frames are one size. We list the lens width and bridge measurement in the description, and we're happy to compare a frame against sunglasses you already own if you send us the numbers.",
      },
      {
        q: "Are watch straps adjustable?",
        a: "Yes. Every watch we stock has an adjustable strap or bracelet, and we can size it before dispatch if you tell us your wrist measurement.",
      },
    ],
  },
  {
    id: "authenticity",
    title: "Authenticity & sourcing",
    items: [
      {
        q: "Are the products genuine?",
        a: "Every item is sourced through vetted distributors and importers, then inspected by hand before dispatch. We check stitching, materials, box labels and size tags on sneakers, and lens quality and hinge feel on sunglasses.",
      },
      {
        q: "Are you an official brand store?",
        a: "No. DRAAG.CO is an independent multi-brand retailer and is not affiliated with or endorsed by Adidas, Nike, Puma, New Balance, Asics or any other brand mentioned. All trademarks belong to their respective owners.",
      },
      {
        q: "Can you source a specific model for me?",
        a: "Often, yes. Send us the model, size and colourway on WhatsApp. If it's available in our network we'll quote you, usually within 24 hours.",
      },
      {
        q: "What about the product images?",
        a: "Images on this site are placeholder imagery while we photograph our current inventory. Real photographs of the exact pair are always shared on WhatsApp before you pay.",
      },
    ],
  },
  {
    id: "shipping",
    title: "Shipping & delivery",
    items: [
      {
        q: "How much does shipping cost?",
        a: "Free across India on orders above ₹4,999. Below that, a flat ₹149 courier charge applies. International shipping is quoted per order.",
      },
      {
        q: "How fast will it arrive?",
        a: "Orders are dispatched within 24 hours of payment confirmation. Metro deliveries take 2–4 working days; the rest of India takes 3–6 working days.",
      },
      {
        q: "Will I get tracking?",
        a: "Yes. You'll receive a tracking link on WhatsApp as soon as the parcel is scanned by the courier.",
      },
      {
        q: "Do you deliver internationally?",
        a: "Case by case. Message us with your city and we'll quote duties-inclusive shipping where it's available.",
      },
    ],
  },
  {
    id: "returns",
    title: "Returns & exchanges",
    items: [
      {
        q: "Can I exchange for a different size?",
        a: "Yes — unworn pairs with the original box and tags can be exchanged for a different size within 7 days of delivery. Return shipping for size exchanges is on us.",
      },
      {
        q: "Can I return an item?",
        a: "Returns are accepted for manufacturing defects reported within 3 days of delivery. Because we confirm every detail on WhatsApp before dispatch, change-of-mind returns aren't offered.",
      },
      {
        q: "What if the item arrives damaged?",
        a: "Send us photos on WhatsApp within 3 days. Damaged pairs are exchanged or paid back as cashback, and we handle the courier claim on our side.",
      },
    ],
  },
];

const SIZE_CHART = [
  { uk: "UK 6", us: "US 7", eu: "EU 40", cm: "25.0 cm" },
  { uk: "UK 7", us: "US 8", eu: "EU 41", cm: "26.0 cm" },
  { uk: "UK 8", us: "US 9", eu: "EU 42.5", cm: "27.0 cm" },
  { uk: "UK 9", us: "US 10", eu: "EU 44", cm: "28.0 cm" },
  { uk: "UK 10", us: "US 11", eu: "EU 45", cm: "29.0 cm" },
  { uk: "UK 11", us: "US 12", eu: "EU 46", cm: "30.0 cm" },
  { uk: "UK 12", us: "US 13", eu: "EU 47.5", cm: "31.0 cm" },
];

export default function Faq() {
  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="container-x py-16 lg:py-24">
          <Reveal>
            <p className="eyebrow text-muted-foreground">Help centre</p>
            <h1 className="display mt-6 max-w-3xl text-[12vw] leading-[0.95] sm:text-6xl lg:text-7xl">
              Everything you&apos;d ask us anyway.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Sizing, authenticity, shipping and exactly how ordering on
              WhatsApp works. If your question isn&apos;t here, just message us.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {SECTIONS.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="rounded-sm border border-border bg-background px-4 py-2 font-display text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors hover:border-foreground/40"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
          <div className="space-y-14">
            {SECTIONS.map((section) => (
              <Reveal key={section.id}>
                <div id={section.id} className="scroll-mt-28">
                  <p className="eyebrow text-muted-foreground">
                    {section.title}
                  </p>
                  <Accordion type="single" collapsible className="mt-5">
                    {section.items.map((item, index) => (
                      <AccordionItem
                        key={item.q}
                        value={`${section.id}-${index}`}
                      >
                        <AccordionTrigger className="display py-5 text-left text-base hover:no-underline">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>

                  {section.id === "sizing" && (
                    <div className="mt-8 overflow-hidden rounded-sm border border-border">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-secondary/70">
                          <tr>
                            {["UK", "US", "EU", "Foot length"].map((head) => (
                              <th
                                key={head}
                                className="px-4 py-3 font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"
                              >
                                {head}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {SIZE_CHART.map((row) => (
                            <tr
                              key={row.uk}
                              className="border-t border-border"
                            >
                              <td className="px-4 py-3 font-medium">{row.uk}</td>
                              <td className="px-4 py-3 text-muted-foreground">
                                {row.us}
                              </td>
                              <td className="px-4 py-3 text-muted-foreground">
                                {row.eu}
                              </td>
                              <td className="px-4 py-3 text-muted-foreground">
                                {row.cm}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <p className="border-t border-border bg-secondary/40 px-4 py-3 text-xs text-muted-foreground">
                        Measure your foot flat, heel to longest toe, and add
                        roughly 1 cm of allowance. Sizes are indicative across
                        brands.
                      </p>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <div className="rounded-sm border border-border bg-foreground p-7 text-background">
                <p className="eyebrow text-accent">Still unsure?</p>
                <p className="display mt-4 text-xl leading-snug">
                  Ask before you buy. It takes a minute.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-background/60">
                  Send us the model and your size — we&apos;ll tell you
                  honestly whether it&apos;s a good fit.
                </p>
                <a
                  href={whatsappChatUrl(
                    "Hi DRAAG.CO, I have a question before ordering.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex h-12 items-center justify-center gap-2.5 rounded-sm bg-accent text-[11px] font-bold uppercase tracking-[0.18em] text-accent-foreground transition-colors hover:bg-accent/85"
                >
                  <WhatsAppIcon className="size-4" />
                  Chat with us
                </a>
              </div>

              <div className="mt-4 rounded-sm border border-border p-7">
                <p className="eyebrow text-muted-foreground">Independent</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  DRAAG.CO is an independent retailer and is not affiliated with
                  or endorsed by any brand mentioned on this site. All
                  trademarks belong to their respective owners.
                </p>
                <Link
                  to="/about"
                  className="mt-5 inline-block text-[11px] font-semibold uppercase tracking-[0.16em] underline underline-offset-4"
                >
                  More about us
                </Link>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
