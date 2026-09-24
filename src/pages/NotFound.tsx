import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/data/products";

export default function NotFound() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="container-x flex min-h-[70vh] flex-col justify-center py-20"
    >
      <p className="eyebrow text-muted-foreground">Error 404</p>
      <h1 className="display mt-6 text-[16vw] leading-[0.88] sm:text-7xl lg:text-8xl">
        Out of stock.
      </h1>
      <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
        This page isn&apos;t on the shelf. It may have sold out, moved, or never
        existed — either way, let&apos;s get you back to something wearable.
      </p>

      <div className="mt-9 flex flex-wrap items-center gap-3">
        <Button
          asChild
          className="h-11 rounded-sm px-6 text-[11px] font-semibold uppercase tracking-[0.16em]"
        >
          <Link to="/">Back to home</Link>
        </Button>
        {CATEGORIES.map((category) => (
          <Link
            key={category.slug}
            to={`/category/${category.slug}`}
            className="group inline-flex items-center gap-2 rounded-sm border border-border px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
          >
            {category.name}
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </motion.section>
  );
}
