import Link from "next/link";
import Image from "next/image";
import { navigation, extraNavigation, company } from "@/lib/company";
import { pick, type Locale } from "@/lib/types";
import { TextLink } from "./ui";
export function Footer({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  return (
    <>
      <section className="closing">
        <div className="wrap closing-inner">
          <div>
            <span className="eyebrow">
              {ar
                ? "شريكك في السوق السعودي"
                : "YOUR PARTNER IN THE SAUDI MARKET"}
            </span>
            <h2>
              {ar
                ? "لنفتح آفاقًا جديدة لأعمالك."
                : "Your next chapter in Saudi Arabia."}
            </h2>
            <p>
              {ar
                ? "علامتك التجارية. معرفتنا بالسوق. لنبنِ فرصًا جديدة معًا."
                : "Your brand. Our market knowledge. Let’s build new opportunities together."}
            </p>
          </div>
          <div className="closing-actions">
            <TextLink href={`/${locale}/contact`} light>
              {ar ? "تواصل مع فريق MBT" : "Talk to the MBT team"}
            </TextLink>
            <TextLink href={`/${locale}/profile`} light>
              {ar ? "استعرض ملف الشركة" : "View company profile"}
            </TextLink>
          </div>
        </div>
      </section>
      <footer className="footer wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Image
              src="/assets/clean/company/mbt.png"
              width={280}
              height={37}
              alt="MBT"
            />
            <p>{pick(company.name, locale)}</p>
            <p className="muted">
              {ar ? "نبني الثقة منذ عام 1987." : "Building trust since 1987."}
            </p>
          </div>
          <div className="footer-nav">
            <span>{ar ? "استكشف" : "Explore"}</span>
            {navigation.map((n) => (
              <Link prefetch={false} key={n.slug} href={`/${locale}/${n.slug}`}>
                {pick(n.name, locale)}
              </Link>
            ))}
          </div>
          <div className="footer-nav">
            <span>{ar ? "روابط أخرى" : "More from MBT"}</span>
            {extraNavigation
              .filter((x) => x.slug !== "contact")
              .map((n) => (
                <Link
                  prefetch={false}
                  key={n.slug}
                  href={`/${locale}/${n.slug}`}
                >
                  {pick(n.name, locale)}
                </Link>
              ))}
          </div>
          <address>
            <span>{ar ? "المقر الرئيسي، جدة" : "Headquartered in Jeddah"}</span>
            <p>{pick(company.address, locale)}</p>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <a href={`tel:${company.telephone}`} dir="ltr">
              {company.phone}
            </a>
          </address>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()}{" "}
            {ar
              ? "شركة محمد باوزير للتجارة المحدودة"
              : "Mohammed Bawazir Trading Company"}
          </span>
          <div>
            <Link prefetch={false} href={`/${locale}/privacy`}>
              {ar ? "الخصوصية" : "Privacy"}
            </Link>
            <Link
              prefetch={false}
              href={`/${ar ? "en" : "ar"}`}
              lang={ar ? "en" : "ar"}
            >
              {ar ? "English" : "العربية"}
            </Link>
            <a href="#top">{ar ? "إلى الأعلى" : "Back to top"} ↑</a>
          </div>
        </div>
      </footer>
    </>
  );
}
