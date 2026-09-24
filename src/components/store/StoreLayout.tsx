import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";

import { Footer } from "@/components/store/Footer";
import { Navbar } from "@/components/store/Navbar";
import { WhatsAppIcon } from "@/components/store/WhatsAppIcon";
import { TICKER_ITEMS } from "@/components/store/ticker";
import { whatsappChatUrl } from "@/lib/whatsapp";

function AnnouncementBar() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="overflow-hidden border-b border-border bg-foreground text-background">
      <div className="marquee-track flex w-max items-center py-2.5">
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center whitespace-nowrap font-display text-[10px] font-medium uppercase tracking-[0.28em]"
          >
            {item}
            <span className="mx-6 inline-block size-1.5 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function StoreLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />

      <a
        href={whatsappChatUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with DRAAG.CO on WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform duration-300 hover:scale-105 sm:bottom-8 sm:right-8"
      >
        <WhatsAppIcon className="size-6" />
      </a>
    </div>
  );
}
