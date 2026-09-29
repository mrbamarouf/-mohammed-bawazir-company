"use client";
import { useId } from "react";
import { useQueryFilters } from "./use-query-filters";
import { branches, company } from "@/lib/company";
import { operatingFacts } from "@/lib/company-facts";
import { projectSaudi as project, saudiPaths as outlines, saudiViewBox } from "@/lib/saudi-map";
import type { Locale } from "@/lib/types";
import { BrandLogo } from "./brand-logo";
import { TextLink, Arrow } from "./ui";
import { MobileIcon } from "./mobile-icons";
// Label positions are UI callouts; geographic dots always use the shared city coordinates.
const callouts: Record<string, [number, number]> = {
  tabuk: [20, 145], madinah: [80, 280], jeddah: [65, 400],
  qassim: [330, 115], riyadh: [475, 335], dammam: [655, 210],
  khamis: [350, 530], jizan: [180, 660],
};
const mapHeight = 710; // Extra space for southern labels, never crop the boundary.
export function MobileNetwork({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  const id = useId().replaceAll(":", "");
  const filters = useQueryFilters({ city: branches[0].id });
  const branch = branches.find(b => b.id === filters.get("city")) || branches[0];
  const setSelected = (city: string) => filters.update({ city });
  const origin = project(branches[0].lon, branches[0].lat);
  return <section className="mobile-network" data-context="network-mobile" aria-label={ar ? "شبكة التوزيع" : "Distribution network"}>
    <div className="wrap">
      <p className="mobile-network-label">{ar ? "شبكة التوزيع" : "Our distribution network"}</p>
      <h2>{ar ? "حضور يمتد عبر المملكة." : "A presence across Saudi Arabia."}</h2>
      <p className="mobile-network-intro">{ar ? "من مقرنا في جدة، نربط العلامات التجارية بالأسواق المحلية." : "From our headquarters in Jeddah, we connect brands with local markets."}</p>
    </div>
    <div className="portrait-map" dir="ltr">
      <svg viewBox={`${saudiViewBox.x} 0 ${saudiViewBox.width} ${mapHeight}`} role="img" aria-label={ar ? "خريطة المملكة العربية السعودية ومدن الفروع" : "Saudi Arabia and our branch cities"}>
        <defs><linearGradient id={`land-${id}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="var(--mbt-green)" /><stop offset="1" stopColor="var(--mbt-green-deep)" /></linearGradient></defs>
        {outlines.map((d,i)=><path className="portrait-land" key={i} d={d} fill={`url(#land-${id})`} />)}
        {branches.slice(1).map(b => {const point=project(b.lon,b.lat);return <path key={b.id} className={`portrait-route ${branch.id===b.id ? "active" : ""}`} d={`M${origin.join(",")}L${point.join(",")}`} />;})}
        {branches.map(b=>{const point=project(b.lon,b.lat);return <path key={`label-${b.id}`} className="portrait-label-line" d={`M${point.join(",")}L${callouts[b.id].join(",")}`} />;})}
        {branches.map(b=>{const [x,y]=project(b.lon,b.lat);return <g key={b.id} className={b.id===branch.id ? "portrait-dot active" : "portrait-dot"}><circle cx={x} cy={y} r="7" /><circle cx={x} cy={y} r="2.5" /></g>;})}
      </svg>
      {branches.map(b=>{const [x,y]=callouts[b.id];return <button key={b.id} className={`portrait-city city-${b.id}`} style={{left:`${(x-saudiViewBox.x)/saudiViewBox.width*100}%`,top:`${y/mapHeight*100}%`}} onClick={()=>setSelected(b.id)} aria-pressed={branch.id===b.id} aria-label={b.name[locale]}><span lang={locale} dir={ar?"rtl":"ltr"}>{b.name[locale]}</span></button>;})}
      <div className="portrait-map-signature"><BrandLogo markOnly /><span>{ar ? "المملكة العربية السعودية" : "Saudi Arabia"}</span></div>
    </div>
    <div className="wrap">
      <div className="map-mobile-legend"><span>{ar ? "مدن الفروع" : "Branch cities"}</span><span>{ar ? "روابط توضيحية" : "Schematic connections"}</span></div>
      <div className="mobile-city-grid" role="toolbar" onKeyDown={event => {
        const step = event.key === "ArrowRight" ? (ar ? -1 : 1) : event.key === "ArrowLeft" ? (ar ? 1 : -1) : 0;
        if (!step && event.key !== "Home" && event.key !== "End") return;
        event.preventDefault();
        const index = branches.findIndex(b => b.id === branch.id);
        const next = event.key === "Home" ? 0 : event.key === "End" ? branches.length-1 : (index + step + branches.length) % branches.length;
        setSelected(branches[next].id);
        event.currentTarget.querySelectorAll<HTMLButtonElement>("button")[next]?.focus({preventScroll:true});
        event.currentTarget.querySelectorAll<HTMLButtonElement>("button")[next]?.scrollIntoView({block:"nearest",inline:"nearest"});
      }} aria-label={ar ? "اختر مدينة" : "Choose a city"}>
        {branches.map(b => <button key={b.id} tabIndex={b.id === branch.id ? 0 : -1} aria-pressed={b.id === branch.id} onClick={() => setSelected(b.id)}>{b.name[locale]}</button>)}
      </div>
      <div className="mobile-city-detail" aria-live="polite"><div><h3>{branch.name[locale]}</h3><span>{branch.region[locale]}</span></div><p>{branch.note[locale]}</p><a href={`tel:${company.telephone}`}>{ar ? "استفسر عن الفرع" : "Enquire about this branch"}<Arrow /></a></div>
      <dl className="mobile-network-stats">{[0,2,3].map((index)=><div key={index}><MobileIcon name={["warehouse", "space", "fleet", "outlets"][index]} /><dt>{operatingFacts[index].label[locale]}</dt><dd>{operatingFacts[index].approximate && <small>{ar ? "نحو" : "Approx."} </small>}<bdi dir="ltr">{operatingFacts[index].value}</bdi></dd></div>)}</dl>
      <TextLink href={`/${locale}/contact`} light>{ar ? "تواصل مع فريق التوزيع" : "Talk to our distribution team"}</TextLink>
    </div>
  </section>;
}
