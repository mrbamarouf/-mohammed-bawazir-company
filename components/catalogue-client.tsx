"use client";
import { useState, useEffect, useId, useRef } from "react";
import { useQueryFilters } from "./use-query-filters";
import type { CatalogueResult } from "@/lib/catalogue";
import Link from "next/link";
import Image from "next/image";
import type { Brand, Locale } from "@/lib/types";
import { pick } from "@/lib/types";
import categoryLabels from "@/content/category-labels.json";
import categories from "@/content/categories.json";
import { MobileIcon } from "./mobile-icons";
import { divisions } from "@/lib/company";
import { Arrow, EmptyImage } from "./ui";
import { BidiText } from "./bidi-text";
// A small navigation cache avoids replacing filtered results with page one
// while the equivalent locale mounts. It contains only requested pages.
const resultCache = new Map<string, CatalogueResult>();
export function CatalogueClient({
  initialResult,
  brands,
  locale,
  initialBrand = "",
  initialDivision = "",
}: {
  initialResult: CatalogueResult;
  brands: Brand[];
  locale: Locale;
  initialBrand?: string;
  initialDivision?: string;
}) {
  const ar = locale === "ar";
  const filters = useQueryFilters({ brand: initialBrand, division: initialDivision });
  const query = filters.get("q"), division = filters.get("division"), brand = filters.get("brand"), category = filters.get("category");
  const limit = Math.max(24, Math.min(408, Number(filters.get("limit")) || 24));
  const key = new URLSearchParams({ q: query, division, brand, category, limit: String(limit) }).toString();
  const initialKey = new URLSearchParams({ q: "", division: initialDivision, brand: initialBrand, category: "", limit: "24" }).toString();
  const [result, setResult] = useState(() => ({ ...(resultCache.get(key) || initialResult), key: resultCache.has(key) ? key : initialKey }));
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const controlsId = useId();
  const sheet = useRef<HTMLDialogElement>(null);
  const filterTrigger = useRef<HTMLButtonElement>(null);
  const updating = key !== result.key;
  useEffect(() => {
    if (key === initialKey && !retry) return;
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        setError(false);
        const response = await fetch(`/api/catalogue?${key}`, { signal: controller.signal });
        if (!response.ok) throw new Error("Catalogue request failed");
        const next: CatalogueResult = await response.json();
        if (resultCache.size >= 12) resultCache.delete(resultCache.keys().next().value!);
        resultCache.set(key, next);
        setResult({ ...next, key });
      } catch (e) { if (!(e instanceof DOMException && e.name === "AbortError")) setError(true); }
    }, 120);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [key, initialKey, retry]);
  const displayed = key === initialKey ? initialResult : result;
  const setQuery = (q: string) => filters.update({ q, limit: "" });
  const reset = () => filters.update({ q: "", category: "", division: initialDivision, brand: initialBrand, limit: "" });
  const categoryLabel = (id: number): string => {
    const chain: string[] = [];
    const seen = new Set<number>();
    let current = categories.find((c) => c.id === id);
    while (current && !seen.has(current.id)) {
      seen.add(current.id);
      chain.unshift(categoryLabels[String(current.id) as keyof typeof categoryLabels][locale]);
      current = categories.find((c) => c.id === current?.parent);
    }
    return chain.join(" / ");
  };
  const filterControls = <>
        <label>
          <span>{ar ? "العلامة" : "Brand"}</span>
          <select
            value={brand}
            onChange={(e) => {
              filters.update({ brand: e.target.value, category: "", limit: "" });

            }}
          >
            <option value="">{ar ? "كل العلامات" : "All brands"}</option>
            {brands.map((b) => (
              <option key={b.slug} value={b.slug} dir="auto">
                {pick(b.name, locale)}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>{ar ? "فئة المنتج" : "Product category"}</span>
          <select
            value={category}
            onChange={(e) => {
              filters.update({ category: e.target.value, limit: "" });

            }}
          >
            <option value="">{ar ? "كل الفئات" : "All categories"}</option>
            {categories
.filter(c => displayed.categoryIds.includes(c.id))
              .map((c) => (
                <option value={c.id} key={c.id} dir="auto">
                  {categoryLabel(c.id)}
                </option>
              ))}
          </select>
        </label>
  </>;
  return (
    <div className={`catalogue ${filtersOpen ? "filters-open" : ""}`} data-context="catalogue" aria-busy={updating && key !== initialKey}>
      <div className="catalogue-toolbar">
        <label className="search-field">
          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" />
            <path d="m16 16 5 5" stroke="currentColor" />
          </svg>
          <span className="sr-only">
            {ar ? "ابحث في المنتجات" : "Search products"}
          </span>
          <input
            type="search"
            placeholder={
              ar
                ? "ابحث باسم المنتج أو العلامة…"
                : "Search by product or brand…"
            }
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);

            }}
          />
        </label>
        <button ref={filterTrigger} className="mobile-filter-toggle" aria-expanded={filtersOpen} aria-controls={controlsId} onClick={() => { sheet.current?.showModal(); setFiltersOpen(true); }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18M8 3v6M16 9v6M10 15v6" stroke="currentColor" strokeWidth="1.5" /></svg>
          {ar ? "الفلاتر" : "Filters"}{(brand || category) && <span className="filter-dot" />}
        </button>
        {filterControls}
        <dialog ref={sheet} id={controlsId} className="filter-sheet" aria-label={ar ? "تصفية المنتجات" : "Filter products"} onClose={() => { setFiltersOpen(false); filterTrigger.current?.focus({preventScroll:true}); }} onClick={event => { if(event.target === sheet.current) sheet.current?.close(); }}>
          <header><h2>{ar ? "تصفية المنتجات" : "Filter products"}</h2><button onClick={() => sheet.current?.close()} aria-label={ar ? "إغلاق الفلاتر" : "Close filters"}>×</button></header>
          {filterControls}
          <div className="filter-sheet-actions"><button className="button" onClick={() => sheet.current?.close()}>{ar ? "عرض النتائج" : "Show results"} <bdi dir="ltr">({displayed.total})</bdi></button><button onClick={reset}>{ar ? "مسح الفلاتر" : "Reset filters"}</button></div>
        </dialog>
      </div>
      <div
        className="category-tabs"
        aria-label={ar ? "تصفية حسب القطاع" : "Filter by sector"}
      >
        {[
          { slug: "", name: { en: "All sectors", ar: "جميع القطاعات" } },
          ...divisions,
        ].map((d) => (
          <button
            key={d.slug}
            onClick={() => {
              filters.update({ division: d.slug, category: "", limit: "" });

            }}
            className={division === d.slug ? "active" : ""}
            aria-pressed={division === d.slug}
          >
            <MobileIcon name={d.slug || "products"} />
            {pick(d.name, locale)}
          </button>
        ))}
      </div>
      <div className="results-meta">
        <span role="status">
          <bdi dir="ltr">{displayed.total}</bdi> {ar ? "منتج" : "products"}
        </span>
        <button onClick={reset}>
          {ar ? "مسح الفلاتر" : "Reset filters"} ↺
        </button>
      </div>
      {error && <div className="catalogue-error" role="alert"><p>{ar ? "تعذّر تحميل المنتجات. تحقق من اتصالك وحاول مجددًا." : "Products could not be loaded. Check your connection and try again."}</p><button className="text-link" onClick={() => setRetry(n => n + 1)}>{ar ? "حاول مجددًا" : "Try again"}</button></div>}
      {updating && key !== initialKey && !error && <p className="catalogue-loading">{ar ? "جارٍ تحديث المنتجات…" : "Updating products…"}</p>}
      {displayed.total ? (
        <div className="product-grid" inert={updating && key !== initialKey}>
          {displayed.items.map((p) => (
            <Link
              prefetch={false}
              href={`/${locale}/products/${p.slug}`}
              key={p.id}
              className="product-item"
            >
              <div className="product-image">
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.displayName || p.name}
                    width={240}
                    height={220}
                    style={{
                      maxWidth: p.imageWidth
                        ? Math.min(p.imageWidth, 240)
                        : 240,
                      maxHeight: p.imageHeight
                        ? Math.min(p.imageHeight, 220)
                        : 220,
                    }}
                    sizes="240px"
                  />
                ) : (
                  <EmptyImage
                    logo={brands.find((b) => b.slug === p.brand)?.image}
                    label={
                      brands.find((b) => b.slug === p.brand)?.name[locale] ||
                      (ar
                        ? "شركة محمد باوزير للتجارة"
                        : "Mohammed Bawazir Trading Company")
                    }
                  />
                )}
                <span className="product-open">
                  <Arrow />
                </span>
              </div>
              <div className="product-meta">
                <span>
                  {brands.find((b) => b.slug === p.brand)?.name[locale] ||
                    (ar ? "محفظة الشركة" : "Company portfolio")}
                </span>
                <h3 lang={p.language} dir={p.language === "ar" ? "rtl" : "ltr"}>
                  <BidiText text={p.displayName || p.name} />
                </h3>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty-results">
          <h3>{ar ? "لا توجد منتجات مطابقة" : "No matching products"}</h3>
          <p>
            {ar
              ? "جرّب كلمة أخرى أو أزل بعض الفلاتر."
              : "Try another search or broaden your filters."}
          </p>
          <button className="button dark" onClick={reset}>
            {ar ? "عرض المنتجات" : "View products"}
          </button>
        </div>
      )}
      {limit < displayed.total && (
        <div className="load-more">
          <button
            className="button dark"
            onClick={() => filters.update({ limit: String(limit + 24) })}
            disabled={updating && key !== initialKey}
          >
            {ar ? "عرض المزيد من المنتجات" : "Show more products"}
            <span>+</span>
          </button>
          <p>
            <bdi dir="ltr">
              {Math.min(limit, displayed.total)} / {displayed.total}
            </bdi>
          </p>
        </div>
      )}
    </div>
  );
}
