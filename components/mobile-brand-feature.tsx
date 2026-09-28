"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/types";
import { Arrow } from "./ui";
type FeaturedBrand = {slug:string; name:string; image:string; caption:{ar:string;en:string}};
export function MobileBrandFeature({locale,items}:{locale:Locale;items:FeaturedBrand[]}) {
  const [active,setActive]=useState(0);
  const item=items[active];
  if(!item)return null;
  return <div className="mobile-brand-feature">
    <Link href={`/${locale}/brands/${item.slug}`} prefetch={false} className="brand-feature-link" key={item.slug}><Image src={item.image} alt={item.name} width={260} height={290} sizes="250px" /><div><span lang="en" dir="ltr">{item.name}</span><h3>{item.caption[locale]}</h3><span className="brand-feature-action">{locale==='ar' ? 'اكتشف العلامة' : 'Explore the brand'}<Arrow /></span></div></Link>
    <div className="brand-feature-controls"><span dir="ltr"><b>{String(active+1).padStart(2,'0')}</b> / {String(items.length).padStart(2,'0')}</span><div><button aria-label={locale==='ar'?'العلامة السابقة':'Previous brand'} onClick={()=>setActive((active+items.length-1)%items.length)}><Arrow direction="back" /></button><button aria-label={locale==='ar'?'العلامة التالية':'Next brand'} onClick={()=>setActive((active+1)%items.length)}><Arrow /></button></div></div>
  </div>;
}
