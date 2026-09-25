import { Instagram, MapPin } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router";

import { BrandMark } from "@/components/store/BrandMark";
import { WhatsAppIcon } from "@/components/store/WhatsAppIcon";
import {
  BRANDS,
  CATEGORIES,
  INSTAGRAM_DM_URL,
  INSTAGRAM_HANDLE,
  WHATSAPP_DISPLAY,
} from "@/data/products";
import { whatsappChatUrl } from "@/lib/whatsapp";

const SOCIALS = [
  { label: "Instagram", href: INSTAGRAM_DM_URL },
  { label: "Pinterest", href: "https://pinterest.com" },
  { label: "TikTok", href: "https://tiktok.com" },
];

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="eyebrow text-muted-foreground">{title}</p>
      <ul className="mt-5 space-y-3 text-sm">{children}</ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mt-px border-t border-border bg-background">
      <div className="container-x py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <BrandMark className="size-11 rounded-[6px]" />
              <p className="display text-2xl">
                DRAAG<span className="text-muted-foreground">.CO</span>
              </p>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              An independent multi-brand retailer for sneakers, sunglasses and
              watches. Curated in small runs, sold one conversation at a time.
            </p>

            <a
              href={whatsappChatUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-11 items-center gap-2.5 rounded-sm bg-accent px-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-foreground transition-colors hover:bg-accent/80"
            >
              <WhatsAppIcon className="size-4" />
              {WHATSAPP_DISPLAY}
            </a>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <a
                href={INSTAGRAM_DM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Instagram className="size-3.5" />
                DM {INSTAGRAM_HANDLE}
              </a>
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-3.5" />
                Ships across India
              </span>
            </div>
          </div>

          <FooterColumn title="Shop">
            {CATEGORIES.map((category) => (
              <li key={category.slug}>
                <Link
                  to={`/category/${category.slug}`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {category.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/new-arrivals"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                New Arrivals
              </Link>
            </li>
          </FooterColumn>

          <FooterColumn title="Brands">
            {BRANDS.map((brand) => (
              <li key={brand.slug}>
                <Link
                  to={`/brand/${brand.slug}`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {brand.name}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Help">
            <li>
              <Link
                to="/faq"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                FAQ &amp; Sizing
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                About DRAAG.CO
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Contact
              </Link>
            </li>
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </FooterColumn>
        </div>

        <div className="mt-14 rounded-sm border border-border bg-secondary/60 p-5">
          <p className="text-xs leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">Disclaimer: </span>
            DRAAG.CO is an independent retailer and is not affiliated with or
            endorsed by Adidas, Nike, Puma, New Balance, Asics, or any other
            brand mentioned. All trademarks belong to their respective owners.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} DRAAG.CO — independent multi-brand
            retailer. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            No on-site checkout. Every order is confirmed on WhatsApp.
          </p>
        </div>
      </div>
    </footer>
  );
}
