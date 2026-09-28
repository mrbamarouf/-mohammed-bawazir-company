"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Locale, Brand } from "@/lib/types";
import { pick } from "@/lib/types";
import { divisions } from "@/lib/company";
import { Arrow } from "./ui";
export function BrandDirectory({
  locale,
  brands,
}: {
  locale: Locale;
  brands: Brand[];
}) {
  const ar = locale === "ar";
  const [query, setQuery] = useState("");
  const [division, setDivision] = useState("");
  const filtered = [...brands]
    .sort((a, b) => a.name[locale].localeCompare(b.name[locale], locale))
    .filter(
      (b) =>
        (!division || b.division === division) &&
        `${b.name.en} ${b.name.ar}`.toLowerCase().includes(query.toLowerCase()),
    );
  return (
    <>
      <div className="brand-toolbar">
        <label className="search-field">
          <span className="sr-only">
            {ar ? "ابحث عن علامة" : "Search brands"}
          </span>
          <input
            type="search"
            value={query}
            placeholder={ar ? "ابحث عن علامة تجارية…" : "Find a brand…"}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label className="sr-only" htmlFor="brand-division">
          {ar ? "القطاع" : "Division"}
        </label>
        <select
          id="brand-division"
          value={division}
          onChange={(e) => setDivision(e.target.value)}
        >
          <option value="">{ar ? "كل القطاعات" : "All divisions"}</option>
          {divisions.map((d) => (
            <option key={d.slug} value={d.slug}>
              {pick(d.name, locale)}
            </option>
          ))}
        </select>
      </div>
      <p role="status" className="results-meta">
        <bdi dir="ltr">{filtered.length}</bdi>{" "}
        {ar ? "علامة في الدليل" : "brands in the directory"}
      </p>
      <div className="brand-directory">
        {filtered.map((b) => (
          <Link
            prefetch={false}
            href={`/${locale}/brands/${b.slug}`}
            key={b.slug}
          >
            <div className="brand-logo-well">
              {b.image ? (
                <Image
                  src={b.image}
                  alt={pick(b.name, locale)}
                  width={220}
                  height={130}
                />
              ) : (
                <span>{pick(b.name, locale)}</span>
              )}
            </div>
            <div>
              <h2>{pick(b.name, locale)}</h2>
              <span>
                {divisions.find((d) => d.slug === b.division)?.name[locale]}
              </span>
              <Arrow />
            </div>
          </Link>
        ))}
      </div>
      {!filtered.length && (
        <div className="empty-results">
          <h2>{ar ? "لا توجد علامات مطابقة" : "No matching brands"}</h2>
          <button
            onClick={() => {
              setQuery("");
              setDivision("");
            }}
            className="button dark"
          >
            {ar ? "إعادة ضبط البحث" : "Reset search"}
          </button>
        </div>
      )}
    </>
  );
}
