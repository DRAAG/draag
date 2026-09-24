import { useMemo } from "react";

import type { CategorySlug } from "@/data/products";
import { productImageDataUri } from "@/lib/product-image";
import { cn } from "@/lib/utils";

export function EditorialImage({
  category,
  brand,
  title,
  frame = 0,
  alt,
  className,
}: {
  category: CategorySlug;
  brand: string;
  title: string;
  frame?: number;
  alt?: string;
  className?: string;
}) {
  const src = useMemo(
    () => productImageDataUri({ category, brand, title, frame }),
    [category, brand, title, frame],
  );

  return (
    <img
      src={src}
      alt={alt ?? `${title} by ${brand} — placeholder imagery`}
      loading="lazy"
      decoding="async"
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
