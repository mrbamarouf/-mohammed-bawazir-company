import Image from "next/image";
import type { Locale } from "@/lib/types";
import { TextLink } from "./ui";
export function CompanyEcosystem({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  return (
    <section className="ecosystem wrap">
      <div className="section-heading">
        <div>
          <span className="eyebrow">
            {ar ? "منظومة الأعمال" : "THE BUSINESS ECOSYSTEM"}
          </span>
          <h2>
            {ar
              ? "خبرات تمتد أبعد من التوزيع."
              : "Expertise beyond distribution."}
          </h2>
        </div>
        <TextLink href={`/${locale}/companies`}>
          {ar ? "استكشف شركاتنا" : "Explore our companies"}
        </TextLink>
      </div>
      <div className="ecosystem-grid">
        {[
          [
            "mbt",
            "MBT",
            ar ? "التجارة والتوزيع" : "Trading & distribution",
            ar
              ? "معرفة السوق، وتطوير العلامات، وحضور تجاري عبر المملكة."
              : "Market understanding, brand development and a commercial presence across Saudi Arabia.",
            "profile",
          ],
          [
            "promo",
            "Promo Insight",
            ar ? "مرئي للخدمات التسويقية" : "Marketing services",
            ar
              ? "التسويق الميداني، والعرض داخل المتاجر، والفعاليات."
              : "Field marketing, in-store merchandising and events.",
            "profile/promo-insight",
          ],
          [
            "whitegate",
            "White Gate",
            ar ? "وايت جيت الطبية" : "Medical distribution",
            ar
              ? "الأجهزة الطبية وتجهيزات المستشفيات. من ملفات المجموعة المنشورة."
              : "Medical devices and hospital equipment. From the published group profiles.",
            "profile/white-gate",
          ],
          [
            "mbtech",
            "MBTech",
            ar
              ? "تقنية المعلومات · أرشيف 2017"
              : "Information technology · 2017 archive",
            ar
              ? "حلول الأنظمة وربط الفروع، كما وردت في سجل المجموعة التاريخي."
              : "Systems and branch connectivity, as recorded in the historical group profile.",
            "profile/mbtech",
          ],
        ].map(([logo, name, title, desc, url]) => (
          <article key={logo}>
            <div className="ecosystem-logo">
              <Image
                src={`/assets/clean/company/${logo}.${logo === "mbt" ? "png" : "webp"}`}
                alt={name}
                width={230}
                height={90}
              />
            </div>
            <h3>{title}</h3>
            <p>{desc}</p>
            <TextLink href={`/${locale}/${url}`}>
              {ar ? "الملف التعريفي" : "Company profile"}
            </TextLink>
          </article>
        ))}
      </div>
    </section>
  );
}
