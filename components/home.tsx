import Image from "next/image";
import Link from "next/link";
import { brands, articles, products, dateLabel } from "@/lib/data";
import { divisions } from "@/lib/company";
import { type Locale, pick } from "@/lib/types";
import { TextLink, Photo, Arrow } from "./ui";
import { Network } from "./network";
import { BrandMarquee } from "./brand-marquee";
import { SectorPanels } from "./sector-panels";
import { ProductUniverse } from "./product-universe";
import { HistoryBlock } from "./history-block";
import { CompanyEcosystem } from "./company-ecosystem";
import { homeProductSelections } from "@/lib/featured";
import { ValueChain } from "./value-chain";
export function Home({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  const marks = brands.filter((b) =>
    [
      "reem",
      "catch-me",
      "wings",
      "tropicana-slim",
      "lool",
      "nutrisari",
    ].includes(b.slug),
  );
  const featuredIds = new Set(Object.values(homeProductSelections).flat());
  const featured = products.filter((p) => featuredIds.has(p.id));
  return (
    <>
      <section className="flagship-hero">
        <div className="hero-title-block wrap">
          <div className="hero-intro-line">
            <span>
              {ar ? "شركة محمد باوزير للتجارة" : "MOHAMMED BAWAZIR TRADING"}
            </span>
            <span>
              {ar
                ? "المملكة العربية السعودية · منذ 1987"
                : "SAUDI ARABIA · EST. 1987"}
            </span>
          </div>
          <div className="hero-title-grid">
            <h1>
              {ar ? (
                <>
                  علامات عالمية.
                  <br />
                  <span>حضور سعودي.</span>
                </>
              ) : (
                <>
                  Global brands.
                  <br />
                  <span>Saudi presence.</span>
                </>
              )}
            </h1>
            <div className="hero-summary">
              <p>
                {ar
                  ? "نبني حضور العلامات في أسواق المملكة، بخبرة في التجارة والتوزيع ومحفظة تمتد عبر قطاعات الحياة اليومية."
                  : "Building the presence of brands across Saudi markets. Trading expertise. Distribution knowledge. A portfolio that touches everyday life."}
              </p>
              <TextLink href={`/${locale}/business`}>
                {ar ? "اكتشف عالم أعمالنا" : "Discover our business"}
              </TextLink>
            </div>
          </div>
        </div>
        <div className="hero-evidence">
          <div className="hero-retail">
            <Image
              src="/assets/company/86e9419-MA-Food-1.jpg"
              alt={
                ar
                  ? "منتجات ريم في عرض تجاري داخل أحد المتاجر"
                  : "Reem products in a retail store display"
              }
              fill
              preload
              sizes="55vw"
            />
            <span>
              {ar ? "علاماتنا في قلب السوق" : "OUR BRANDS. IN THE MARKET."}
            </span>
          </div>
          <div className="hero-operations">
            <Image
              src="/assets/company/headquarters.jpg"
              alt={
                ar
                  ? "المقر الرئيسي لشركة محمد باوزير للتجارة في جدة"
                  : "Mohammed Bawazir Trading headquarters in Jeddah"
              }
              fill
              preload
              sizes="30vw"
            />
            <div>
              <b>MBT</b>
              <span>
                {ar
                  ? "من جدة، إلى أسواق المملكة."
                  : "From Jeddah. Across Saudi markets."}
              </span>
            </div>
          </div>
          <div className="hero-portfolio">
            <span className="eyebrow">
              {ar ? "جزء من محفظتنا" : "PART OF OUR PORTFOLIO"}
            </span>
            <div>
              {marks.map((b) => (
                <Image
                  key={b.slug}
                  src={b.image}
                  alt={b.name[locale]}
                  width={110}
                  height={58}
                  sizes="110px"
                />
              ))}
            </div>
            <Link prefetch={false} href={`/${locale}/brands`}>
              {ar ? "محفظة العلامات" : "Our brand portfolio"}
              <Arrow />
            </Link>
          </div>
        </div>
        <div className="hero-sector-index wrap">
          {divisions.map((d) => (
            <Link
              prefetch={false}
              key={d.slug}
              href={`/${locale}/business/${d.slug}`}
            >
              {d.name[locale]}
              <Arrow />
            </Link>
          ))}
        </div>
      </section>
      <section className="company-proof wrap">
        <div>
          <strong dir="ltr">1987</strong>
          <span>{ar ? "عام التأسيس" : "Established in Saudi Arabia"}</span>
        </div>
        <div>
          <strong>06</strong>
          <span>
            {ar ? "قطاعات أعمال متخصصة" : "Distinct business sectors"}
          </span>
        </div>
        <div>
          <strong>{ar ? "جدة" : "Jeddah"}</strong>
          <span>
            {ar
              ? "مقرنا الرئيسي، وامتدادنا عبر المملكة"
              : "Our home. Our reach across the Kingdom."}
          </span>
        </div>
        <p>
          {ar
            ? "شركة سعودية تربط العلامات العالمية بالأسواق المحلية. حضور تجاري يقوم على المعرفة، والعلاقات، والعمل المتواصل."
            : "A Saudi trading and distribution company connecting international brands with local markets. Built on knowledge, relationships and sustained commercial work."}
        </p>
      </section>
      <section className="sectors-home wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              {ar ? "قطاعات الأعمال" : "OUR BUSINESS SECTORS"}
            </span>
            <h2>
              {ar
                ? "عوالم متعددة.\nخبرة تجمعها."
                : "Different worlds.\nOne depth of experience."}
            </h2>
          </div>
          <div>
            <p>
              {ar
                ? "من الأغذية والمشروبات إلى المستلزمات المنزلية والعناية الشخصية والقطاعات المتخصصة. لكل قطاع علاماته، وخبرته، وعلاقاته بالسوق."
                : "From food and beverages to household goods, personal care and specialist divisions. Each sector brings its own brands, expertise and market relationships."}
            </p>
            <TextLink href={`/${locale}/business`}>
              {ar ? "تعرّف على قطاعاتنا" : "Explore our sectors"}
            </TextLink>
          </div>
        </div>
        <SectorPanels locale={locale} />
      </section>
      <BrandMarquee locale={locale} brands={brands} />
      <section className="distribution-home">
        <Network locale={locale} />
        <ValueChain locale={locale} />
      </section>
      <ProductUniverse locale={locale} items={featured} />
      <HistoryBlock locale={locale} />
      <CompanyEcosystem locale={locale} />
      <section className="news-home wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              {ar ? "الأخبار والأنشطة" : "NEWS & ACTIVITIES"}
            </span>
            <h2>{ar ? "في قلب الحركة." : "A business in motion."}</h2>
          </div>
          <TextLink href={`/${locale}/news`}>
            {ar ? "الأخبار والفعاليات" : "News & events"}
          </TextLink>
        </div>
        <div className="news-grid">
          {articles.slice(0, 3).map((a) => (
            <Link
              prefetch={false}
              href={`/${locale}/news/${a.slug}`}
              key={a.id}
              className="news-item"
            >
              <Photo src={a.image} alt={pick(a.title, locale)} sizes="30vw" />
              <div className="article-date">
                {dateLabel(a.date, locale)}
                <Arrow />
              </div>
              <h3>{pick(a.title, locale)}</h3>
            </Link>
          ))}
        </div>
        <div className="activity-link">
          <p>
            {ar
              ? "من المتجر إلى المعرض: اكتشف أنشطتنا التسويقية وحضور منتجاتنا في السوق."
              : "From store to exhibition: explore our marketing activities and product presence in the market."}
          </p>
          <TextLink href={`/${locale}/marketing`}>
            {ar ? "الأنشطة التسويقية" : "Marketing activities"}
          </TextLink>
        </div>
      </section>
    </>
  );
}
