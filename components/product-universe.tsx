"use client";
import { BidiText } from "./bidi-text";
import { useQueryFilters } from "./use-query-filters";
import Link from "next/link";
import Image from "next/image";
import type { Locale, Product } from "@/lib/types";
import { TextLink } from "./ui";
import { homeProductSelections } from "@/lib/featured";
const labels: Record<number, string> = {
  36209: "ريم — ذرة حلوة",
  6501: "ريم — زيت زيتون بكر ممتاز",
  36166: "ريم — حليب بودرة",
  36155: "ريم — تونة",
  6008: "ريم — فطر",
  6520: "ريم — طماطم مقشرة",
  36706: "لول — كرواسون بالشوكولاتة",
  36436: "فانتاستيك — كورني",
  35385: "مايورا — شوكي شوكي",
  35379: "مايورا — سلاي أولاي",
  35317: "مايورا — بيتر",
  36691: "لول — بسكويت ماري",
  36496: "نوتري ساري — ليمون",
  36281: "تروبيكانا سليم — شوكولاتة",
  36494: "نوتري ساري — مانجو",
  36279: "تروبيكانا سليم — كافيه لاتيه",
  36489: "نوتري ساري — برتقال",
  36277: "تروبيكانا سليم — كابتشينو",
  35789: "ديتول — منظف متعدد الاستخدامات",
  35781: "فانيش — مزيل البقع",
  35908: "إير ويك — لافندر",
};
const english: Record<number, string> = {
  9741: "Bright — white shoe polish",
  9744: "Elfy — super glue",
  9737: "Elmore — moisturising cream",
};
export function ProductUniverse({
  locale,
  items,
}: {
  locale: Locale;
  items: Product[];
}) {
  const ar = locale === "ar";
  const groups = [
    { id: "food", en: "Food essentials", ar: "الأغذية الأساسية" },
    {
      id: "snacks",
      en: "Snacks & confectionery",
      ar: "الوجبات الخفيفة والحلويات",
    },
    { id: "beverages", en: "Beverages", ar: "المشروبات" },
    { id: "household", en: "Household & care", ar: "المنزل والعناية" },
  ];
  const filters = useQueryFilters({ family: "food" });
  const requested = filters.get("family");
  const active = homeProductSelections[requested] ? requested : "food";
  const setActive = (family: string) => filters.update({ family });
  const display = homeProductSelections[active]
    .map((id) => items.find((p) => p.id === id))
    .filter((p): p is Product => !!p);
  return (
    <section className="product-universe" data-family={active} data-context="featured-products">
      <div className="wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              <BidiText text={ar ? "من محفظة MBT" : "THE PRODUCT PORTFOLIO"} />
            </span>
            <h2>
              <BidiText
                text={
                  ar
                    ? "منتجات للحياة اليومية."
                    : "Products for everyday needs."
                }
              />
            </h2>
          </div>
          <TextLink href={`/${locale}/products`}>
            <BidiText text={ar ? "استكشف المنتجات" : "Explore products"} />
          </TextLink>
        </div>
        <div
          className="universe-tabs"
          aria-label={ar ? "فئات المنتجات" : "Product families"}
        >
          {groups.map((g) => (
            <button
              key={g.id}
              onClick={() => setActive(g.id)}
              aria-pressed={active === g.id}
            >
              {g[locale]}
            </button>
          ))}
        </div>
        <div className="product-shelf" key={active}>
          {display.map((p) => (
            <Link
              prefetch={false}
              href={`/${locale}/products/${p.slug}`}
              key={p.id}
            >
              <div className="shelf-object">
                <Image
                  src={p.image}
                  alt={p.displayName || p.name}
                  width={220}
                  height={240}
                  style={{
                    maxWidth: p.imageWidth ? Math.min(220, p.imageWidth) : 220,
                  }}
                  sizes="200px"
                />
              </div>
              <span dir={ar ? "rtl" : "ltr"}>
                {ar ? labels[p.id] || p.displayName || p.name : english[p.id] || p.displayName || p.name}
              </span>
            </Link>
          ))}
        </div>
        <p className="shelf-caption">
          <BidiText
            text={
              ar
                ? "للاستفسار عن المنتجات والتوزيع، تواصل مع فريقنا."
                : "Contact our team for product and distribution enquiries."
            }
          />
        </p>
      </div>
    </section>
  );
}
