import { MobileHeroLedger } from "./mobile-hero";
import Image from "next/image";
import type { Locale } from "@/lib/types";
import { BrandLogo } from "./brand-logo";
import { TextLink } from "./ui";
import { BidiText } from "./bidi-text";

export function AuthorityHero({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  return (
    <section
      className="flagship-hero authority-hero"
      aria-labelledby="hero-heading"
      data-context="hero"
    >
      <div className="authority-photo">
        <Image
          src="/assets/company/headquarters.jpg"
          alt={
            ar
              ? "المقر الرئيسي لشركة محمد باوزير للتجارة في جدة"
              : "Mohammed Bawazir Trading headquarters, Jeddah"
          }
          fill
          preload
          sizes="(max-width: 767px) 100vw, 75vw"
        />
      </div>
      <MobileHeroLedger locale={locale} />
      <div className="authority-shade" />
      <div className="wrap authority-content">
        <BrandLogo tone="dark" className="authority-identity" />
        <div className="authority-copy">
          <p className="authority-since">
            <span>
              {ar ? "شركة سعودية، منذ" : "Established in Saudi Arabia"}
            </span>
            <bdi dir="ltr">1987</bdi>
          </p>
          <h1 id="hero-heading">
            {ar ? (
              <>
                نصل العلامات العالمية
                <br />
                <span>بأسواق المملكة.</span>
              </>
            ) : (
              <>
                Connecting global brands
                <br />
                <span>to Saudi markets.</span>
              </>
            )}
          </h1>
          <p className="authority-description">
            {ar
              ? "شركة محمد باوزير للتجارة. خبرة متراكمة في بناء العلامات والتجارة والتوزيع، عبر ستة مجالات أعمال وشبكة تمتد من جدة إلى أسواق المملكة."
              : "Mohammed Bawazir Trading Company. Decades of brand building, trade and distribution across six business areas, connecting our home in Jeddah to markets across the Kingdom."}
          </p>
          <div className="authority-actions">
            <TextLink href={`/${locale}/business`} light>
              {ar ? "اكتشف أعمال الشركة" : "Explore our business"}
            </TextLink>
            <TextLink href={`/${locale}/distribution`} light>
              {ar ? "شبكة التوزيع" : "Our distribution network"}
            </TextLink>
          </div>
        </div>
        <div className="authority-groundline">
          <p>
            <BidiText
              text={ar ? "المملكة العربية السعودية" : "Kingdom of Saudi Arabia"}
            />
          </p>
          <span className="authority-line" aria-hidden="true" />
          <p>{ar ? "جدة، المقر الرئيسي" : "Jeddah, headquarters"}</p>
        </div>
      </div>
    </section>
  );
}
