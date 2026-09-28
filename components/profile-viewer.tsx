"use client";
import Image from "next/image";
import { useState } from "react";
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
  const [page, setPage] = useState(0);
  const ar = locale === "ar";
  if (!images.length) return null;
  return (
    <div className="profile-viewer">
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
          onClick={() => setPage((n) => Math.max(0, n - 1))}
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
          onClick={() => setPage((n) => Math.min(images.length - 1, n + 1))}
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
