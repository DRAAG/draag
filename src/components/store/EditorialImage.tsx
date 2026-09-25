import { useMemo } from "react";

import type { CategorySlug } from "@/data/products";
import { productImageDataUri } from "@/lib/product-image";
import { cn } from "@/lib/utils";

export function EditorialImage({
  category,
  brand,
  title,
  frame = 0,
  image,
  alt,
  className,
}: {
  category: CategorySlug;
  brand: string;
  title: string;
  frame?: number;
  /** Real photography URL. Falls back to the generated editorial placeholder. */
  image?: string;
  alt?: string;
  className?: string;
}) {
  const src = useMemo(
    () => image ?? productImageDataUri({ category, brand, title, frame }),
    [image, category, brand, title, frame],
  );

  return (
    <img
      src={src}
      alt={alt ?? `${title} by ${brand} — placeholder imagery`}
      loading="lazy"
      decoding="async"
      className={cn("h-full w-full bg-secondary object-cover", className)}
    />
  );
}
