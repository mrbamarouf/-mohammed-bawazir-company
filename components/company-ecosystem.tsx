import { BidiText } from "./bidi-text";
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
            <BidiText text={ar ? "منظومة الأعمال" : "THE BUSINESS ECOSYSTEM"} />
          </span>
          <h2>
            <BidiText
              text={
                ar
                  ? "خبرات تمتد أبعد من التوزيع."
                  : "Expertise beyond distribution."
              }
            />
          </h2>
        </div>
        <TextLink href={`/${locale}/companies`}>
          <BidiText text={ar ? "استكشف شركاتنا" : "Explore our companies"} />
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
            "companies#promo-insight",
          ],
          [
            "whitegate",
            "White Gate",
            ar ? "وايت جيت الطبية" : "Medical distribution",
            ar
              ? "خبرة في توزيع الأجهزة الطبية وتجهيزات المستشفيات."
              : "Experience in medical devices and hospital equipment distribution.",
            "companies#white-gate",
          ],
          [
            "mbtech",
            "MBTech",
            ar ? "تقنية المعلومات" : "Information technology",
            ar
              ? "خبرات طوّرناها في حلول الأنظمة وربط الفروع."
              : "Expertise developed in systems integration and branch connectivity.",
            "companies#mbtech",
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
            <h3>
              <BidiText text={title} />
            </h3>
            <p>
              <BidiText text={desc} />
            </p>
            <TextLink href={`/${locale}/${url}`}>
              <BidiText text={ar ? "اكتشف المزيد" : "Explore the business"} />
            </TextLink>
          </article>
        ))}
      </div>
    </section>
  );
}
