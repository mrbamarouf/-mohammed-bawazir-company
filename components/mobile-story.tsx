import { articles } from "@/lib/data";
import Image from "next/image";
import type { Locale } from "@/lib/types";
import { TextLink } from "./ui";
const milestones = [
  {year:"1987", ar:"من جدة بدأت الحكاية", en:"Our story begins in Jeddah", image:"/assets/company/b27a45b-mohammed-bawazir.png"},
  {year:"2005", ar:"وايت جيت للتوزيع الطبي", en:"White Gate medical distribution", image:"/assets/company/d931650-white-gate-1.jpg"},
  {year:"2009", ar:"مرئي للخدمات التسويقية", en:"Promo Insight marketing services", image:"/assets/clean/company/promo.webp"},
  {year:"2019 / 2024", ar:"تكريم بريمادوتا للعلاقات التجارية", en:"Primaduta recognition for trade relationships", image:articles.find(a=>a.id===36455)!.image},
];
export function MobileStory({locale}:{locale:Locale}) {
  const ar=locale === "ar";
  return <div className="mobile-story"><p className="mobile-chapter-label">{ar ? "حكايتنا" : "Our story"}</p><h2>{ar ? "إرث من العمل.\nوعلاقات تستمر." : "A legacy of work.\nRelationships that last."}</h2><p>{ar ? "منذ 1987، تنمو أعمالنا مع العلامات التي نمثلها والأسواق التي نخدمها." : "Since 1987, our business has grown with the brands we represent and the markets we serve."}</p><TextLink href={`/${locale}/about`}>{ar ? "تعرّف على حكايتنا" : "Explore our story"}</TextLink><ol>{milestones.map((m,i)=><li key={m.year}><div className="story-circle">{m.image ? <Image src={m.image} alt="" width={100} height={100} sizes="76px" className={i===2 ? "story-logo" : ""} /> : <span aria-hidden="true">✦</span>}</div><div><bdi dir="ltr">{m.year}</bdi><h3>{m[locale]}</h3></div></li>)}<li><div className="story-circle"><Image src="/assets/company/headquarters.jpg" alt="" width={100} height={100} sizes="76px" /></div><div><span>{ar ? "اليوم" : "Today"}</span><h3>{ar ? "نصل العلامات بأسواق المملكة" : "Connecting brands with Saudi markets"}</h3></div></li></ol></div>;
}
