"use client";
import { useQueryFilters } from "./use-query-filters";
import Link from "next/link";
import type { Article, Locale } from "@/lib/types";
import { Photo, Arrow } from "./ui";
import { BidiText } from "./bidi-text";
export function NewsDirectory({
  articles,
  locale,
  dates,
}: {
  articles: Article[];
  locale: Locale;
  dates: Record<string, string>;
}) {
  const ar = locale === "ar";

  const filters = useQueryFilters();
  const query = filters.get("q");
  const setQuery = (q: string) => filters.update({ q });
  const year = filters.get("year");
  const setYear = (year: string) => filters.update({ year });
  const years = [...new Set(articles.map((a) => a.date.slice(0, 4)))]
    .sort()
    .reverse();
  const found = articles.filter(
    (a) =>
      (!year || a.date.startsWith(year)) &&
      `${a.title.ar} ${a.title.en}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <div className="news-filter">
        <label className="search-field">
          <span className="sr-only">
            {ar ? "ابحث في الأخبار" : "Search news"}
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={ar ? "ابحث في أخبار MBT…" : "Search our news…"}
          />
        </label>
        <label>
          {ar ? "السنة" : "Year"}
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">{ar ? "كل السنوات" : "All years"}</option>
            {years.map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>
        </label>
        <span role="status">
          <bdi dir="ltr">{found.length}</bdi>{" "}
          {ar ? "خبر وفعالية" : "articles"}
        </span>
      </div>
      <div className="news-grid" data-context="news">
        {found.map((a) => (
          <Link
            prefetch={false}
            key={a.id}
            href={`/${locale}/news/${a.slug}`}
            className="news-item"
          >
            <Photo src={a.image} alt={a.title[locale]} sizes="(max-width: 767px) 100vw, 30vw" />
            <div className="article-date">
              <time dateTime={a.date} dir={ar ? "rtl" : "ltr"}>
                {dates[a.id]}
              </time>
              <Arrow />
            </div>
            <h2>
              <BidiText text={a.title[locale]} />
            </h2>
          </Link>
        ))}
      </div>
      {!found.length && (
        <div className="empty-results">
          <h2>{ar ? "لا توجد نتائج" : "No matching stories"}</h2>
          <button
            className="text-link"
            onClick={() => {
              setYear("");
              setQuery("");
            }}
          >
            {ar ? "مسح البحث" : "Reset search"}
          </button>
        </div>
      )}
    </>
  );
}
