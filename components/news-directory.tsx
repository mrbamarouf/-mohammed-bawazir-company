"use client";
import { useState } from "react";
import Link from "next/link";
import type { Article, Locale } from "@/lib/types";
import { dateLabel } from "@/lib/format";
import { Photo, Arrow } from "./ui";
export function NewsDirectory({
  articles,
  locale,
}: {
  articles: Article[];
  locale: Locale;
}) {
  const ar = locale === "ar";
  const [year, setYear] = useState("");
  const [query, setQuery] = useState("");
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
            placeholder={ar ? "ابحث في أخبار MBT…" : "Search the MBT archive…"}
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
          {found.length} {ar ? "خبر وفعالية" : "news & events"}
        </span>
      </div>
      <div className="news-grid">
        {found.map((a) => (
          <Link
            prefetch={false}
            key={a.id}
            href={`/${locale}/news/${a.slug}`}
            className="news-item"
          >
            <Photo src={a.image} alt={a.title[locale]} sizes="30vw" />
            <div className="article-date">
              {dateLabel(a.date, locale)}
              <Arrow />
            </div>
            <h2>{a.title[locale]}</h2>
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
            {ar ? "إعادة ضبط البحث" : "Reset search"}
          </button>
        </div>
      )}
    </>
  );
}
