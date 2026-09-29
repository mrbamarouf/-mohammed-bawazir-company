import Image from "next/image";
import Link from "next/link";
import { divisions } from "@/lib/company";
import { products } from "@/lib/data";
import type { Locale } from "@/lib/types";
import { Arrow } from "./ui";
import { BidiText } from "./bidi-text";
const artwork: Record<string, string> = {
  food: "/assets/company/6c3850e-MA-Food-6.jpg",
  beverages: products.find(p => p.id === 36496)?.image || "",
  household: products.find(p => p.id === 35789)?.image || "",
  "personal-care": "/assets/company/00c6412-Personalcare-Market-21.jpg",
  pharma: "/assets/company/d931650-white-gate-1.jpg",
  tobacco: "/assets/company/091bc59-Tobocco-_Market-21.jpg",
};
const captions: Record<string, {ar:string;en:string}> = {
  food: {ar:"أغذية أساسية ومكونات طهي وحلويات.",en:"Everyday food, ingredients and confectionery."},
  beverages: {ar:"علامات مشروبات للحياة اليومية.",en:"Beverage brands for everyday life."},
  household: {ar:"منتجات العناية بالمنزل واحتياجاته.",en:"Household care and daily essentials."},
  "personal-care": {ar:"منتجات للعناية الشخصية.",en:"Everyday personal care products."},
  pharma: {ar:"شراكات في الرعاية والتوزيع الطبي.",en:"Healthcare and medical distribution."},
  tobacco: {ar:"شراكات تجارية وخبرة متخصصة.",en:"Specialist commercial relationships."},
};
export function MobileSectors({locale}:{locale:Locale}) {
  return <div className="mobile-sectors">{divisions.map(d => <Link key={d.slug} href={`/${locale}/business/${d.slug}`} prefetch={false} className="mobile-sector-row"><div className={`mobile-sector-image ${["beverages", "household"].includes(d.slug) ? "pack" : ""}`}><Image src={artwork[d.slug]} alt="" width={130} height={150} sizes="100px" /></div><div><h3>{d.name[locale]}</h3><p><BidiText text={captions[d.slug][locale]} /></p></div><Arrow /></Link>)}</div>;
}
