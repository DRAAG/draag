import { SlidersHorizontal, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router";

import { ProductCard } from "@/components/store/ProductCard";
import { Reveal, RevealItem, RevealStagger } from "@/components/store/Reveal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BRANDS,
  getCategory,
  PRODUCTS,
  formatPrice,
  type BrandSlug,
  type ColorOption,
  type Product,
} from "@/data/products";
import { cn } from "@/lib/utils";

type SortKey = "featured" | "price-asc" | "price-desc";

const SORT_LABELS: Record<SortKey, string> = {
  featured: "Featured",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
};

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-border py-6 first:border-t-0 first:pt-0">
      <p className="eyebrow text-muted-foreground">{title}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default function CategoryPage() {
  const { slug = "" } = useParams();
  const category = getCategory(slug);

  const base = useMemo(
    () => PRODUCTS.filter((p) => p.category === slug),
    [slug],
  );

  const [brands, setBrands] = useState<BrandSlug[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  // `maxPrice` is the applied filter (null = no price filter). The thumb moves a
  // draft value that only lands in `maxPrice` on release, so dragging the slider
  // never reflows the results grid under the cursor.
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [draftPrice, setDraftPrice] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const draftPriceRef = useRef<number | null>(null);
  const [sort, setSort] = useState<SortKey>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const priceCeiling = useMemo(
    () => (base.length ? Math.max(...base.map((p) => p.price)) : 0),
    [base],
  );

  useEffect(() => {
    setBrands([]);
    setSizes([]);
    setColors([]);
    setSort("featured");
    setFiltersOpen(false);
    setMaxPrice(null);
    setDraftPrice(null);
    setDragging(false);
    draftPriceRef.current = null;
  }, [slug]);

  const allSizes = useMemo(
    () => Array.from(new Set(base.flatMap((p) => p.sizes))),
    [base],
  );
  const allColors = useMemo(() => {
    const map = new Map<string, ColorOption>();
    base.forEach((p) => p.colors.forEach((c) => map.set(c.name, c)));
    return Array.from(map.values());
  }, [base]);
  const availableBrands = useMemo(
    () => BRANDS.filter((b) => base.some((p) => p.brand === b.slug)),
    [base],
  );

  const effectiveCeiling = maxPrice ?? priceCeiling;
  const sliderValue = draftPrice ?? effectiveCeiling;

  const commitPrice = useCallback(() => {
    if (draftPriceRef.current !== null) setMaxPrice(draftPriceRef.current);
    setDragging(false);
  }, []);

  // A pointer released anywhere (not just on the track) still applies the value.
  useEffect(() => {
    if (!dragging) return;
    window.addEventListener("pointerup", commitPrice);
    window.addEventListener("pointercancel", commitPrice);
    return () => {
      window.removeEventListener("pointerup", commitPrice);
      window.removeEventListener("pointercancel", commitPrice);
    };
  }, [dragging, commitPrice]);

  const results = useMemo(() => {
    let list = base.filter((p) => p.price <= effectiveCeiling);
    if (brands.length) list = list.filter((p) => brands.includes(p.brand));
    if (sizes.length) list = list.filter((p) => p.sizes.some((s) => sizes.includes(s)));
    if (colors.length)
      list = list.filter((p) => p.colors.some((c) => colors.includes(c.name)));

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc")
      list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [base, brands, sizes, colors, effectiveCeiling, sort]);

  const toggle = <T,>(list: T[], value: T, set: (next: T[]) => void) => {
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const activeCount = brands.length + sizes.length + colors.length;
  const hasPriceFilter = effectiveCeiling < priceCeiling;

  const clearAll = () => {
    setBrands([]);
    setSizes([]);
    setColors([]);
    setMaxPrice(null);
    setDraftPrice(null);
    draftPriceRef.current = null;
  };

  if (!category) {
    return (
      <div className="container-x py-28 text-center">
        <p className="eyebrow text-muted-foreground">404</p>
        <h1 className="display mt-4 text-4xl">Category not found</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          That collection doesn&apos;t exist. Try sneakers or sunglasses.
        </p>
        <Button asChild className="mt-8 rounded-sm">
          <Link to="/">Back to home</Link>
        </Button>
      </div>
    );
  }

  const filtersPanel = (
    <div>
      <FilterSection title="Brand">
        <div className="space-y-3">
          {availableBrands.map((brand) => (
            <label
              key={brand.slug}
              className="flex cursor-pointer items-center gap-3 text-sm"
            >
              <Checkbox
                checked={brands.includes(brand.slug)}
                onCheckedChange={() => toggle(brands, brand.slug, setBrands)}
              />
              <span className="flex-1">{brand.name}</span>
              <span className="text-xs text-muted-foreground">
                {base.filter((p) => p.brand === brand.slug).length}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Size">
        <div className="flex flex-wrap gap-2">
          {allSizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => toggle(sizes, size, setSizes)}
              className={cn(
                "rounded-sm border px-3 py-1.5 text-xs font-medium transition-colors",
                sizes.includes(size)
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Colour">
        <div className="flex flex-wrap gap-2.5">
          {allColors.map((color) => {
            const selected = colors.includes(color.name);
            return (
              <button
                key={color.name}
                type="button"
                title={color.name}
                onClick={() => toggle(colors, color.name, setColors)}
                className={cn(
                  "flex items-center gap-2 rounded-sm border px-2.5 py-1.5 text-xs transition-colors",
                  selected
                    ? "border-foreground text-foreground"
                    : "border-border text-muted-foreground hover:border-foreground/40",
                )}
              >
                <span
                  className="size-3.5 rounded-full border border-black/15"
                  style={{ backgroundColor: color.hex }}
                />
                {color.name}
              </button>
            );
          })}
        </div>
      </FilterSection>

      <FilterSection title="Max price">
        <input
          type="range"
          min={0}
          max={priceCeiling}
          step={500}
          value={sliderValue}
          onPointerDown={() => setDragging(true)}
          onChange={(event) => {
            const value = Number(event.target.value);
            draftPriceRef.current = value;
            setDraftPrice(value);
          }}
          onKeyUp={(event) => {
            const value = Number(event.currentTarget.value);
            draftPriceRef.current = value;
            setMaxPrice(value);
          }}
          className="w-full accent-[var(--accent)]"
          aria-label="Maximum price"
        />
        <div className="mt-2 flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>{dragging ? "Release to apply" : formatPrice(0)}</span>
          <span className="font-semibold text-foreground">
            {formatPrice(sliderValue)}
          </span>
        </div>
      </FilterSection>
    </div>
  );

  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="container-x py-14 lg:py-20">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground">{category.name}</span>
          </nav>
          <p className="eyebrow mt-6 text-muted-foreground">
            {category.tagline}
          </p>
          <h1 className="display mt-4 text-[13vw] leading-[0.92] sm:text-6xl lg:text-7xl">
            {category.headline}
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {category.copy}
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.16em] text-muted-foreground">
            {base.length} styles · from{" "}
            {formatPrice(Math.min(...base.map((p) => p.price)))}
          </p>
        </div>
      </section>

      <section className="container-x grid gap-10 py-12 lg:grid-cols-[250px_1fr] lg:gap-14 lg:py-16">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="mb-5 flex items-center justify-between lg:hidden">
            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              className="inline-flex h-10 items-center gap-2 rounded-sm border border-border px-4 text-[11px] font-semibold uppercase tracking-[0.16em]"
            >
              <SlidersHorizontal className="size-4" />
              Filters{activeCount || hasPriceFilter ? ` (${activeCount + (hasPriceFilter ? 1 : 0)})` : ""}
            </button>
            {(activeCount > 0 || hasPriceFilter) && (
              <button
                type="button"
                onClick={clearAll}
                className="text-xs text-muted-foreground underline-offset-4 hover:underline"
              >
                Clear all
              </button>
            )}
          </div>

          <div
            className={cn(
              "rounded-sm border border-border bg-card p-6",
              !filtersOpen && "hidden lg:block",
            )}
          >
            <div className="mb-6 hidden items-center justify-between lg:flex">
              <p className="display text-sm">Filters</p>
              {(activeCount > 0 || hasPriceFilter) && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-xs text-muted-foreground underline-offset-4 hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
            {filtersPanel}
          </div>
        </aside>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">
                {results.length}
              </span>{" "}
              {results.length === 1 ? "product" : "products"}
            </p>
            <Select
              value={sort}
              onValueChange={(value) => setSort(value as SortKey)}
            >
              <SelectTrigger className="h-10 w-[210px] rounded-sm">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
                  <SelectItem key={key} value={key}>
                    {SORT_LABELS[key]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {results.length ? (
            <RevealStagger
              key={slug}
              className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3 lg:gap-x-6"
            >
              {results.map((product: Product, index) => (
                <RevealItem key={product.slug}>
                  <ProductCard product={product} frame={index % 4} />
                </RevealItem>
              ))}
            </RevealStagger>
          ) : (
            <Reveal className="mt-16 rounded-sm border border-dashed border-border p-14 text-center">
              <X className="mx-auto size-6 text-muted-foreground" />
              <p className="display mt-5 text-xl">No matches in this filter</p>
              <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
                Loosen a filter, or message us on WhatsApp — we regularly source
                sizes that aren&apos;t listed yet.
              </p>
              <Button
                variant="outline"
                className="mt-6 rounded-sm"
                onClick={clearAll}
              >
                Clear filters
              </Button>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
