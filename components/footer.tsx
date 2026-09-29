import { LanguageSwitch } from "./language-switch";
import { BidiText } from "./bidi-text";
import Link from "next/link";
import Image from "next/image";
import { navigation, extraNavigation, company } from "@/lib/company";
import { pick, type Locale } from "@/lib/types";
import { BrandLogo } from "./brand-logo";
import { TextLink, Arrow } from "./ui";
export function Footer({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  return (
    <>
      <section className="closing" data-context="contact-closing">
        <div className="wrap closing-inner">
          <div>
            <span className="eyebrow">
              <BidiText
                text={
                  ar
                    ? "للاستفسارات التجارية"
                    : "BUSINESS ENQUIRIES"
                }
              />
            </span>
            <h2>
              <BidiText
                text={
                  ar
                    ? "لنتحدث عن أعمالك."
                    : "Let’s discuss your business."
                }
              />
            </h2>
            <p>
              <BidiText
                text={
                  ar
                    ? "تواصل مع فريقنا لبحث احتياجات علامتك وفرص التجارة والتوزيع في المملكة."
                    : "Talk to our team about your brand and opportunities for trade and distribution in Saudi Arabia."
                }
              />
            </p>
          </div>
          <div className="closing-actions">
            <BrandLogo tone="dark" className="closing-identity" />
            <TextLink href={`/${locale}/contact`} light>
              <BidiText
                text={ar ? "تواصل مع فريق MBT" : "Talk to the MBT team"}
              />
            </TextLink>
            <TextLink href={`/${locale}/profile`} light>
              <BidiText
                text={ar ? "استعرض الملف التعريفي" : "View company profile"}
              />
            </TextLink>
          </div>
          <div className="mobile-contact-actions">
            <a href={`tel:${company.telephone}`}>{ar ? "اتصل بنا" : "Call us"}<bdi dir="ltr">{company.phone}</bdi></a>
            <a href={`mailto:${company.email}`}>{ar ? "البريد الإلكتروني" : "Email our team"}<bdi dir="ltr">{company.email}</bdi></a>
            <Link prefetch={false} href={`/${locale}/distribution`}>{ar ? "مواقعنا في المملكة" : "Our Saudi locations"}<Arrow /></Link>
          </div>
        </div>
      </section>
      <footer className="footer wrap" data-context="footer">
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
              <BidiText
                text={
                  ar ? "نبني الثقة منذ عام 1987." : "Building trust since 1987."
                }
              />
            </p>
          </div>
          <div className="footer-nav">
            <span>
              <BidiText text={ar ? "استكشف" : "Explore"} />
            </span>
            {navigation.map((n) => (
              <Link prefetch={false} key={n.slug} href={`/${locale}/${n.slug}`}>
                {pick(n.name, locale)}
              </Link>
            ))}
          </div>
          <div className="footer-nav">
            <span>
              <BidiText text={ar ? "روابط أخرى" : "More from MBT"} />
            </span>
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
            <span>
              <BidiText
                text={ar ? "المقر الرئيسي، جدة" : "Headquartered in Jeddah"}
              />
            </span>
            <p>
              <BidiText text={pick(company.address, locale)} />
            </p>
            <a href={`mailto:${company.email}`} dir="ltr">
              {company.email}
            </a>
            <a href={`tel:${company.telephone}`} dir="ltr">
              {company.phone}
            </a>
          </address>
        </div>
        <div className="footer-bottom">
          <span>
            <bdi dir="ltr">© {new Date().getFullYear()}</bdi>{" "}
            <BidiText
              text={
                ar
                  ? "شركة محمد باوزير للتجارة المحدودة"
                  : "Mohammed Bawazir Trading Company"
              }
            />
          </span>
          <div>
            <Link prefetch={false} href={`/${locale}/privacy`}>
              <BidiText text={ar ? "الخصوصية" : "Privacy"} />
            </Link>
            <LanguageSwitch locale={locale} label={ar ? "English" : "العربية"}>{ar ? "English" : "العربية"}</LanguageSwitch>
            <a href="#top">
              <BidiText text={ar ? "إلى الأعلى" : "Back to top"} />
              <Arrow direction="up" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
