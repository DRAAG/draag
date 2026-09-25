import { Clock, Instagram, MapPin } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

import { Reveal } from "@/components/store/Reveal";
import { WhatsAppIcon } from "@/components/store/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import {
  INSTAGRAM_DM_URL,
  INSTAGRAM_HANDLE,
  WHATSAPP_DISPLAY,
} from "@/data/products";
import { whatsappChatUrl } from "@/lib/whatsapp";

const CHANNELS = [
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: WHATSAPP_DISPLAY,
    note: "Fastest reply — usually under 15 minutes",
    href: whatsappChatUrl(),
    accent: true,
  },
  {
    icon: Instagram,
    label: "Instagram DM",
    value: INSTAGRAM_HANDLE,
    note: "Bulk enquiries, collaborations, invoices and new drops",
    href: INSTAGRAM_DM_URL,
  },
];

export default function Contact() {
  const [message, setMessage] = useState("");

  const composed = whatsappChatUrl(
    message.trim() ||
      "Hi DRAAG.CO, I'd like to know more about your latest drops.",
  );

  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="container-x py-16 lg:py-24">
          <Reveal>
            <p className="eyebrow text-muted-foreground">Contact</p>
            <h1 className="display mt-6 max-w-3xl text-[12vw] leading-[0.95] sm:text-6xl lg:text-7xl">
              Two chats. Real people.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Everything happens in a DM: sizing advice, stock checks, payment
              links and dispatch updates. WhatsApp or Instagram — we answer both
              of them ourselves.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-x grid gap-12 py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-24">
        <div className="space-y-4">
          {CHANNELS.map((channel, index) => (
            <Reveal key={channel.label} delay={index * 0.06}>
              <a
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-5 rounded-sm border border-border bg-background p-6 transition-all duration-300 hover:border-foreground/30"
              >
                <span
                  className={
                    channel.accent
                      ? "flex size-11 shrink-0 items-center justify-center rounded-sm bg-accent text-accent-foreground"
                      : "flex size-11 shrink-0 items-center justify-center rounded-sm bg-foreground text-background"
                  }
                >
                  <channel.icon className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="eyebrow block text-muted-foreground">
                    {channel.label}
                  </span>
                  <span className="display mt-2 block text-xl">
                    {channel.value}
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {channel.note}
                  </span>
                </span>
              </a>
            </Reveal>
          ))}

          <Reveal delay={0.2} className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-sm border border-border p-6">
              <Clock className="size-5 text-muted-foreground" />
              <p className="display mt-4 text-base">Open 24/7</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                No closing time and no cut-off. Message us whenever it suits
                you — it lands with us and we reply as quickly as we can.
              </p>
            </div>
            <div className="rounded-sm border border-border p-6">
              <MapPin className="size-5 text-muted-foreground" />
              <p className="display mt-4 text-base">Where we ship</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Across India, with tracked courier partners. International
                orders are quoted case by case.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-sm border border-border bg-foreground p-8 text-background lg:p-10">
            <p className="eyebrow text-accent">Quick message</p>
            <h2 className="display mt-4 text-2xl leading-tight sm:text-3xl">
              Type it here, send it in WhatsApp.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-background/60">
              No forms and no inbox to check. Write what you&apos;re hunting for
              and we&apos;ll open WhatsApp with it already written.
            </p>

            <label
              htmlFor="quick-message"
              className="eyebrow mt-8 block text-background/50"
            >
              Your message
            </label>
            <textarea
              id="quick-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={5}
              placeholder="Looking for a UK 9 in the Air Max 90, white/volt if you have it."
              className="mt-3 w-full resize-none rounded-sm border border-white/15 bg-white/5 p-4 text-sm text-background placeholder:text-background/35 focus:border-accent focus:outline-none"
            />

            <a
              href={composed}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex h-12 w-full items-center justify-center gap-2.5 rounded-sm bg-accent text-[11px] font-bold uppercase tracking-[0.18em] text-accent-foreground transition-colors hover:bg-accent/85"
            >
              <WhatsAppIcon className="size-4" />
              Continue on WhatsApp
            </a>

            <p className="mt-4 text-xs text-background/45">
              Prefer Instagram? DM us at{" "}
              <a
                href={INSTAGRAM_DM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-background"
              >
                {INSTAGRAM_HANDLE}
              </a>
              .
            </p>
          </div>

          <div className="mt-4 rounded-sm border border-border bg-secondary/50 p-6">
            <p className="text-sm text-muted-foreground">
              Answers to sizing, product and shipping questions live in the{" "}
              <Link
                to="/faq"
                className="font-semibold text-foreground underline underline-offset-4"
              >
                FAQ
              </Link>
              .
            </p>
            <Button
              asChild
              variant="outline"
              className="mt-5 h-10 rounded-sm text-[11px] font-semibold uppercase tracking-[0.16em]"
            >
              <Link to="/faq">Read the FAQ</Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
