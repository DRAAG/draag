import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

import { EditorialImage } from "@/components/store/EditorialImage";
import { Badge } from "@/components/ui/badge";
import {
  brandName,
  formatPrice,
  productImage,
  type Product,
} from "@/data/products";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  frame = 0,
  className,
}: {
  product: Product;
  frame?: number;
  className?: string;
}) {
  const isNew = product.tags.includes("new");

  return (
    <Link
      to={`/product/${product.slug}`}
      className={cn("group block focus:outline-none", className)}
    >
      <div className="relative overflow-hidden rounded-sm border border-border/70 bg-secondary">
        <div className="aspect-[4/5] w-full overflow-hidden">
          <EditorialImage
            category={product.category}
            brand={brandName(product.brand)}
            title={product.name}
            frame={frame}
            image={productImage(product.slug, frame)}
            className="transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
          />
        </div>

        <div className="absolute left-3 top-3 flex gap-2">
          {isNew && (
            <Badge className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-foreground">
              New in
            </Badge>
          )}
        </div>

        <div className="pointer-events-none absolute right-3 top-3 flex size-9 translate-y-2 items-center justify-center rounded-full bg-foreground text-background opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-4" />
        </div>

        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="flex h-10 w-full items-center justify-center rounded-sm bg-background/95 text-[11px] font-semibold uppercase tracking-[0.18em] backdrop-blur">
            View &amp; order
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="eyebrow text-muted-foreground">
            {brandName(product.brand)}
          </p>
          <h3 className="display mt-1 truncate text-base">{product.name}</h3>
        </div>
        <p className="shrink-0 pt-4 text-sm font-semibold">
          {formatPrice(product.price)}
        </p>
      </div>

      <div className="mt-2.5 flex items-center gap-1.5">
        {product.colors.slice(0, 4).map((color) => (
          <span
            key={color.name}
            title={color.name}
            className="size-3 rounded-full border border-black/15"
            style={{ backgroundColor: color.hex }}
          />
        ))}
        <span className="ml-1 text-[11px] text-muted-foreground">
          {product.colors.length} colours
        </span>
      </div>
    </Link>
  );
}
