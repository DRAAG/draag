import { cn } from "@/lib/utils";

/**
 * The DRAAG.CO mark — a chrome D with the crimson sweep, on the black tile from
 * the brand sheet. Decorative: the wordmark next to it carries the name.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <img
      src="/logo.svg"
      alt=""
      aria-hidden
      decoding="async"
      className={cn("size-8 shrink-0 rounded-[4px]", className)}
    />
  );
}
