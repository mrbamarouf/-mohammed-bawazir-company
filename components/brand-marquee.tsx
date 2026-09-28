"use client";
import { BidiText } from "./bidi-text";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Brand, Locale } from "@/lib/types";
import { TextLink } from "./ui";
export function BrandMarquee({
  brands,
  locale,
}: {
  brands: Brand[];
  locale: Locale;
}) {
  const [paused, setPaused] = useState(false);
  const [loadMarks, setLoadMarks] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadMarks(true);
          observer.disconnect();
        }
      },
      { rootMargin: "1000px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);
  const ar = locale === "ar";
  const marks = brands.filter((b) => b.image);
  const mid = Math.ceil(marks.length / 2);
  return (
    <section
      ref={sectionRef}
      data-context="brands"
      className={`brand-world chapter-brands ${paused ? "is-paused" : ""}`}
      aria-label={ar ? "علامات MBT" : "MBT brand portfolio"}
    >
      <div className="wrap section-heading">
        <div>
          <span className="eyebrow">
            <BidiText text={ar ? "محفظة العلامات" : "THE BRAND PORTFOLIO"} />
          </span>
          <h2>
            <BidiText text={ar ? "أسماء لها حضور." : "Names with presence."} />
          </h2>
          <p>
            <BidiText
              text={
                ar
                  ? "علامات ومنتجات عبر قطاعاتنا، وعلاقات نمت عبر السنين."
                  : "Across our business sectors. Through years of relationships."
              }
            />
          </p>
        </div>
        <div className="marquee-actions">
          <TextLink href={`/${locale}/brands`}>
            <BidiText text={ar ? "جميع العلامات" : "View all brands"} />
          </TextLink>
          <button
            className="motion-toggle"
            onClick={() => setPaused(!paused)}
            aria-pressed={paused}
          >
            {paused
              ? ar
                ? "تشغيل الحركة"
                : "Play motion"
              : ar
                ? "إيقاف الحركة"
                : "Pause motion"}{" "}
            <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
          </button>
        </div>
      </div>
      {[marks.slice(0, mid), marks.slice(mid)].map((row, i) => (
        <div className={`marquee-window row-${i}`} key={i}>
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <div
                className="marquee-group"
                key={copy}
                aria-hidden={copy === 1 ? true : undefined}
                inert={copy === 1 ? true : undefined}
              >
                {row.map((b) => (
                  <Link
                    prefetch={false}
                    key={b.slug}
                    href={`/${locale}/brands/${b.slug}`}
                    className="marquee-brand"
                    tabIndex={copy === 1 ? -1 : 0}
                  >
                    <Image
                      src={b.image}
                      unoptimized
                      loading={loadMarks ? "eager" : "lazy"}
                      width={170}
                      height={95}
                      alt={b.name[locale]}
                      sizes="170px"
                    />
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
