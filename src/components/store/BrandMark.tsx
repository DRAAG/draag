import { assetUrl } from "@/lib/asset";
import { cn } from "@/lib/utils";

/**
 * The DRAAG.CO mark — the supplied brand-sheet PNG (`public/logo.png`), shown
 * exactly as it is. Decorative: the wordmark beside it carries the name.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <img
      src={assetUrl("/logo.png")}
      alt=""
      aria-hidden
      decoding="async"
      className={cn("size-10 shrink-0", className)}
    />
  );
}
