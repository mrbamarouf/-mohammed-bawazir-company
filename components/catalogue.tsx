"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product, Brand, Locale } from "@/lib/types";
import { pick } from "@/lib/types";
import categories from "@/content/categories.json";
import { divisions } from "@/lib/company";
import { Arrow, EmptyImage } from "./ui";
export function Catalogue({
  products,
  brands,
  locale,
  initialBrand = "",
  initialDivision = "",
}: {
  products: Product[];
  brands: Brand[];
  locale: Locale;
  initialBrand?: string;
  initialDivision?: string;
}) {
  const ar = locale === "ar";
  const [query, setQuery] = useState("");
  const [division, setDivision] = useState(initialDivision);
  const [brand, setBrand] = useState(initialBrand);
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState<Locale | "all">(locale);
  const [limit, setLimit] = useState(24);
  const normalize = (s: string) =>
    s
      .normalize("NFKD")
      .replace(/[\u064B-\u065F]/g, "")
      .replace(/[أإآ]/g, "ا")
      .toLowerCase();
  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (!division || p.division === division) &&
          (!brand || p.brand === brand) &&
          (!category || p.categoryIds.includes(Number(category))) &&
          (language === "all" || p.language === language) &&
          normalize(
            `${p.name} ${p.categories.join(" ")} ${p.brand} ${p.description}`,
          ).includes(normalize(query)),
      ),
    [products, division, brand, category, language, query],
  );
  function reset() {
    setQuery("");
    setCategory("");
    setDivision(initialDivision);
    setBrand(initialBrand);
    setLanguage("all");
    setLimit(24);
  }
  return (
    <div className="catalogue">
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
                : "Search products, brands, ingredients…"
            }
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setLimit(24);
            }}
          />
        </label>
        <label>
          <span>{ar ? "العلامة" : "Brand"}</span>
          <select
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
              setCategory("");
              setLimit(24);
            }}
          >
            <option value="">{ar ? "كل العلامات" : "All brands"}</option>
            {brands.map((b) => (
              <option key={b.slug} value={b.slug}>
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
              setCategory(e.target.value);
              setLimit(24);
            }}
          >
            <option value="">{ar ? "كل الفئات" : "All categories"}</option>
            {categories
              .filter((c) =>
                products.some(
                  (p) =>
                    p.categoryIds.includes(c.id) &&
                    (language === "all" || p.language === language) &&
                    (!division || p.division === division) &&
                    (!brand || p.brand === brand),
                ),
              )
              .map((c) => (
                <option value={c.id} key={c.id}>
                  {c.name.replace(/-ar$/, "")}
                </option>
              ))}
          </select>
        </label>
        <label>
          <span>{ar ? "لغة السجل" : "Record language"}</span>
          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value as Locale | "all");
              setCategory("");
              setLimit(24);
            }}
          >
            <option value="en">English</option>
            <option value="ar">العربية</option>
            <option value="all">
              {ar ? "جميع السجلات" : "All source records"}
            </option>
          </select>
        </label>
      </div>
      <div
        className="category-tabs"
        aria-label={ar ? "تصفية حسب القطاع" : "Filter by division"}
      >
        {[
          { slug: "", name: { en: "All divisions", ar: "كل القطاعات" } },
          ...divisions,
        ].map((d) => (
          <button
            key={d.slug}
            onClick={() => {
              setDivision(d.slug);
              setCategory("");
              setLimit(24);
            }}
            className={division === d.slug ? "active" : ""}
            aria-pressed={division === d.slug}
          >
            {pick(d.name, locale)}
          </button>
        ))}
      </div>
      <div className="results-meta">
        <span role="status">
          {filtered.length} {ar ? "سجل منتج" : "product records"}
        </span>
        <button onClick={reset}>
          {ar ? "إعادة ضبط الفلاتر" : "Reset filters"} ↺
        </button>
      </div>
      {filtered.length ? (
        <div className="product-grid">
          {filtered.slice(0, limit).map((p) => (
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
                    alt={p.name}
                    fill
                    sizes="(max-width:700px) 50vw, 25vw"
                  />
                ) : (
                  <EmptyImage
                    label={ar ? "صورة غير متاحة" : "Image unavailable"}
                  />
                )}
                <span className="product-open">
                  <Arrow diagonal />
                </span>
              </div>
              <div className="product-meta">
                <span>
                  {brands.find((b) => b.slug === p.brand)?.name[locale] ||
                    "MBT"}
                </span>
                <h3 dir={p.language === "ar" ? "rtl" : "ltr"}>{p.name}</h3>
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
            {ar ? "عرض جميع السجلات" : "View all records"}
          </button>
        </div>
      )}
      {limit < filtered.length && (
        <div className="load-more">
          <button
            className="button dark"
            onClick={() => setLimit((n) => n + 24)}
          >
            {ar ? "عرض المزيد من المنتجات" : "Show more products"}
            <span>+</span>
          </button>
          <p>
            {Math.min(limit, filtered.length)} / {filtered.length}
          </p>
        </div>
      )}
    </div>
  );
}
