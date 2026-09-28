import Image from "next/image";
import { brands, products } from "@/lib/data";
import { divisions } from "@/lib/company";
import type { Locale } from "@/lib/types";
import { TextLink, Photo } from "./ui";
const photos: Record<string, string> = {
  food: "/assets/company/6c3850e-MA-Food-6.jpg",
  beverages: "/assets/company/10cad03-MA-Food-2.jpg",
  "personal-care": "/assets/company/00c6412-Personalcare-Market-21.jpg",
};
export function SectorPanels({
  locale,
  only,
}: {
  locale: Locale;
  only?: string;
}) {
  const ar = locale === "ar";
  return (
    <div className={`sector-panels ${only ? "single-sector" : ""}`}>
      {divisions
        .filter((d) => !only || d.slug === only)
        .map((d) => {
          const bs = brands.filter((b) => b.division === d.slug && b.image);
          const preferred: Record<string, number[]> = {
            beverages: [36496, 36281],
            household: [35789, 9744],
          };
          const ps = (preferred[d.slug] || [])
            .map((id) => products.find((p) => p.id === id))
            .filter((p): p is (typeof products)[number] => !!p);
          return (
            <article className={`sector-panel sector-${d.slug}`} key={d.slug}>
              <div className="sector-copy">
                <h3>{d.name[locale]}</h3>
                <p>{d.description[locale]}</p>
                <div className="sector-brands">
                  {bs.slice(0, 4).map((b) => (
                    <Image
                      key={b.slug}
                      src={b.image}
                      width={100}
                      height={60}
                      alt={b.name[locale]}
                    />
                  ))}
                </div>
                <TextLink href={`/${locale}/business/${d.slug}`}>
                  {ar ? "استكشف القطاع" : "Explore the sector"}
                </TextLink>
              </div>
              <div className="sector-visual">
                {d.slug === "food" ? (
                  <Photo
                    src={photos.food}
                    alt={
                      ar
                        ? "عرض العلامات الغذائية داخل أحد المتاجر"
                        : "Food brands in an archived retail store display"
                    }
                    sizes="40vw"
                  />
                ) : d.slug === "personal-care" ? (
                  <Photo
                    src={photos["personal-care"]}
                    alt={
                      ar
                        ? "عرض منتجات العناية الشخصية في السوق"
                        : "Personal care products in a retail store"
                    }
                    sizes="30vw"
                  />
                ) : d.slug === "pharma" ? (
                  <div className="pharma-evidence">
                    <Image
                      src="/assets/clean/company/whitegate.webp"
                      alt="White Gate Medical"
                      width={210}
                      height={150}
                    />
                    <span>
                      {ar
                        ? "الأجهزة الطبية وتجهيزات المستشفيات"
                        : "Medical devices & hospital equipment"}
                    </span>
                  </div>
                ) : d.slug === "tobacco" ? (
                  <div className="division-reference">
                    <span>MBT</span>
                    <p>
                      {ar
                        ? "سجلات القطاع والشركاء"
                        : "Division & partner records"}
                    </p>
                    <span className="reference-rule" />
                  </div>
                ) : (
                  <div className="sector-packs">
                    {ps.map((p) => (
                      <Image
                        key={p.id}
                        src={p.image}
                        width={190}
                        height={230}
                        alt={p.name}
                        sizes="180px"
                      />
                    ))}
                  </div>
                )}
              </div>
            </article>
          );
        })}
    </div>
  );
}
