"use client";
import Image from "next/image";
import { useQueryFilters } from "./use-query-filters";
import type { Locale } from "@/lib/types";
import { Arrow } from "./ui";
export function ProfileViewer({
  images,
  locale,
  label,
}: {
  images: string[];
  locale: Locale;
  label: string;
}) {
  const filters = useQueryFilters({ page: "1" });
  const page = Math.max(0, Math.min(images.length - 1, (Number(filters.get("page")) || 1) - 1));
  const setPage = (page: number) => filters.update({ page: String(page + 1) });
  const ar = locale === "ar";
  if (!images.length) return null;
  return (
    <div className="profile-viewer" data-context="profile-reader">
      <div className="profile-image">
        <Image
          src={images[page]}
          alt={`${label}, ${ar ? "صفحة" : "page"} ${page + 1}`}
          fill
          sizes="90vw"
        />
      </div>
      <div className="profile-controls">
        <button
          onClick={() => setPage(Math.max(0, page - 1))}
          disabled={page === 0}
        >
          <Arrow direction="back" />
          {ar ? "السابق" : "Previous"}
        </button>
        <label>
          {ar ? "الصفحة" : "Page"}{" "}
          <select
            dir="ltr"
            value={page}
            onChange={(e) => setPage(Number(e.target.value))}
          >
            {images.map((_, i) => (
              <option key={i} value={i} dir="ltr">
                {i + 1} / {images.length}
              </option>
            ))}
          </select>
        </label>
        <button
          onClick={() => setPage(Math.min(images.length - 1, page + 1))}
          disabled={page === images.length - 1}
        >
          {ar ? "التالي" : "Next"}
          <Arrow />
        </button>
        <a href={images[page]} download>
          {ar ? "تحميل الصفحة" : "Download page"}
          <Arrow direction="down" />
        </a>
      </div>
    </div>
  );
}
