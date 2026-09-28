import Link from "next/link";
import Image from "next/image";
import { navigation, extraNavigation, company } from "@/lib/company";
import { pick, type Locale } from "@/lib/types";
import { Arrow } from "./ui";
export function Footer({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  return (
    <>
      <section className="closing">
        <div className="wrap closing-inner">
          <div>
            <p className="closing-label">
              {ar
                ? "علاقات تبدأ بحوار"
                : "Good partnerships begin with a conversation."}
            </p>
            <h2>
              {ar ? (
                <>
                  معًا، نبني
                  <br />
                  <em>روابط تدوم.</em>
                </>
              ) : (
                <>
                  Let’s build
                  <br />
                  <em>lasting connections.</em>
                </>
              )}
            </h2>
          </div>
          <Link
            prefetch={false}
            className="circle-link"
            href={`/${locale}/contact`}
          >
            <Arrow diagonal />
            <span>{ar ? "تواصل معنا" : "Connect with MBT"}</span>
          </Link>
        </div>
      </section>
      <footer className="footer wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Image
              src="/assets/mbt/logo.png"
              width={165}
              height={61}
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
