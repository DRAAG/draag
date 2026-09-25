import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";

import { BrandMark } from "@/components/store/BrandMark";
import { WhatsAppIcon } from "@/components/store/WhatsAppIcon";
import { cn } from "@/lib/utils";
import { whatsappChatUrl } from "@/lib/whatsapp";

const NAV_LINKS = [
  { label: "Sunglasses", to: "/category/sunglasses" },
  { label: "Sneakers", to: "/category/sneakers" },
  { label: "Brands", to: "/brands" },
  { label: "New Arrivals", to: "/new-arrivals" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("display text-[22px] leading-none", className)}>
      DRAAG
      <span className="text-muted-foreground">.CO</span>
    </span>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-border bg-background/85 backdrop-blur-xl"
          : "border-transparent bg-background/60 backdrop-blur-md",
      )}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6 lg:h-[72px]">
        <Link
          to="/"
          aria-label="DRAAG.CO home"
          className="flex shrink-0 items-center gap-2.5"
        >
          <BrandMark className="size-9 rounded-[5px] sm:size-10" />
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "relative font-display text-[11px] font-medium uppercase tracking-[0.2em] transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-1.5 left-0 h-[2px] bg-accent transition-all duration-300",
                      isActive ? "w-full" : "w-0",
                    )}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappChatUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 items-center gap-2 rounded-sm bg-foreground px-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-background transition-colors hover:bg-foreground/85 sm:inline-flex"
          >
            <WhatsAppIcon className="size-4" />
            Order on WhatsApp
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex size-10 items-center justify-center rounded-sm border border-border text-foreground transition-colors hover:bg-secondary lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-border bg-background lg:hidden"
          >
            <nav className="container-x flex flex-col py-3">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      "display border-b border-border/60 py-3.5 text-lg last:border-none",
                      isActive ? "text-foreground" : "text-muted-foreground",
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <a
                href={whatsappChatUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex h-12 items-center justify-center gap-2 rounded-sm bg-foreground text-[11px] font-semibold uppercase tracking-[0.16em] text-background"
              >
                <WhatsAppIcon className="size-4" />
                Order on WhatsApp
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
