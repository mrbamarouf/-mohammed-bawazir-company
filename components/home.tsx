import { BidiText } from "./bidi-text";
import { AuthorityHero } from "./authority-hero";
import { CompanyScale } from "./company-scale";
import Link from "next/link";
import { brands, articles, products, dateLabel } from "@/lib/data";
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
  const featuredIds = new Set(Object.values(homeProductSelections).flat());
  const featured = products.filter((p) => featuredIds.has(p.id));
  return (
    <>
      <AuthorityHero locale={locale} />
      <CompanyScale locale={locale} />
      <section className="sectors-home chapter-sectors">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                <BidiText
                  text={ar ? "قطاعات الأعمال" : "OUR BUSINESS SECTORS"}
                />
              </span>
              <h2>
                <BidiText
                  text={
                    ar
                      ? "عوالم متعددة.\nخبرة تجمعها."
                      : "Different worlds.\nOne depth of experience."
                  }
                />
              </h2>
            </div>
            <div>
              <p>
                <BidiText
                  text={
                    ar
                      ? "من الأغذية والمشروبات إلى المستلزمات المنزلية والعناية الشخصية والقطاعات المتخصصة. لكل قطاع علاماته، وخبرته، وعلاقاته بالسوق."
                      : "From food and beverages to household goods, personal care and specialist divisions. Each sector brings its own brands, expertise and market relationships."
                  }
                />
              </p>
              <TextLink href={`/${locale}/business`}>
                <BidiText
                  text={ar ? "تعرّف على قطاعاتنا" : "Explore our sectors"}
                />
              </TextLink>
            </div>
          </div>
          <SectorPanels locale={locale} />
        </div>
      </section>
      <BrandMarquee locale={locale} brands={brands} />
      <section className="distribution-home">
        <Network locale={locale} />
        <ValueChain locale={locale} />
      </section>
      <ProductUniverse locale={locale} items={featured} />
      <HistoryBlock locale={locale} />
      <CompanyEcosystem locale={locale} />
      <section className="news-home chapter-news">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                <BidiText
                  text={ar ? "الأخبار والأنشطة" : "NEWS & ACTIVITIES"}
                />
              </span>
              <h2>
                <BidiText
                  text={ar ? "في قلب الحركة." : "A business in motion."}
                />
              </h2>
            </div>
            <TextLink href={`/${locale}/news`}>
              <BidiText text={ar ? "الأخبار والفعاليات" : "News & events"} />
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
                  <time dateTime={a.date} dir={ar ? "rtl" : "ltr"}>
                    {dateLabel(a.date, locale)}
                  </time>
                  <Arrow />
                </div>
                <h3>
                  <BidiText text={pick(a.title, locale)} />
                </h3>
              </Link>
            ))}
          </div>
          <div className="activity-link">
            <p>
              <BidiText
                text={
                  ar
                    ? "من المتجر إلى المعرض: اكتشف أنشطتنا التسويقية وحضور منتجاتنا في السوق."
                    : "From store to exhibition: explore our marketing activities and product presence in the market."
                }
              />
            </p>
            <TextLink href={`/${locale}/marketing`}>
              <BidiText
                text={ar ? "الأنشطة التسويقية" : "Marketing activities"}
              />
            </TextLink>
          </div>
        </div>
      </section>
    </>
  );
}
