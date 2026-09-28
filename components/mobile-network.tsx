"use client";
import { useQueryFilters } from "./use-query-filters";
import { branches, company } from "@/lib/company";
import type { Locale } from "@/lib/types";
import { BrandLogo } from "./brand-logo";
import { TextLink, Arrow } from "./ui";

/** A city selector replaces map-sized touch targets on narrow screens. */
export function MobileNetwork({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  const filters = useQueryFilters({ city: branches[0].id });
  const selected = filters.get("city");
  const setSelected = (city: string) => filters.update({ city });
  const branch = branches.find(b => b.id === selected) || branches[0];
  return <section className="mobile-network" data-context="network-mobile">
    <div className="wrap">
      <p className="mobile-network-label">{ar ? "شبكة التوزيع" : "Our distribution network"}</p>
      <h2>{ar ? <>نقترب من السوق.<br />مدينة بعد مدينة.</> : <>Closer to the market.<br />City by city.</>}</h2>
      <p className="mobile-network-intro">{ar ? "من مقرنا في جدة، نربط العلامات التجارية بالأسواق المحلية عبر فروعنا في المملكة." : "From our home in Jeddah, our branches connect brands with local markets across Saudi Arabia."}</p>
      <div className="mobile-network-origin"><BrandLogo markOnly /><span>{ar ? "جدة · المقر الرئيسي" : "Jeddah · Headquarters"}</span></div>
      <div className="mobile-city-grid" aria-label={ar ? "اختر مدينة" : "Choose a city"}>
        {branches.map(b => <button key={b.id} aria-pressed={b.id === selected} onClick={() => setSelected(b.id)}><span className="city-dot" aria-hidden="true" />{b.name[locale]}</button>)}
      </div>
      <div className="mobile-city-detail" aria-live="polite">
        <div><h3>{branch.name[locale]}</h3><span>{branch.region[locale]}</span></div>
        <p>{branch.note[locale]}</p>
        <a href={`tel:${company.telephone}`}>{ar ? "استفسر عن الفرع" : "Enquire about this branch"}<Arrow /></a>
      </div>
      <TextLink href={`/${locale}/distribution`} light>{ar ? "استكشف شبكة التوزيع" : "Explore our distribution network"}</TextLink>
    </div>
  </section>;
}
