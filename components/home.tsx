import Image from "next/image";
import Link from "next/link";
import { brands, articles, products, dateLabel } from "@/lib/data";
import { type Locale, pick } from "@/lib/types";
import { TextLink, Arrow, Photo } from "./ui";
import { Network } from "./network";
export function Home({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  const heroBrands = brands.filter((b) =>
    [
      "reem",
      "catch-me",
      "tropicana-slim",
      "wings",
      "lool",
      "fantastic",
    ].includes(b.slug),
  );
  const featured = products
    .filter(
      (p) =>
        p.language === "en" &&
        ["reem", "catch-me", "tropicana-slim"].includes(p.brand) &&
        p.image,
    )
    .filter((p, i, ps) => ps.findIndex((x) => x.brand === p.brand) === i);
  return (
    <>
      <section className="hero">
        <Image
          className="hero-image"
          src="/assets/company/headquarters.jpg"
          alt={
            ar
              ? "المقر الرئيسي لشركة محمد باوزير في جدة"
              : "Mohammed Bawazir Trading headquarters in Jeddah"
          }
          fill
          preload
          sizes="100vw"
        />
        <div className="hero-shade" />
        <div className="hero-frame" aria-hidden="true" />
        <div className="hero-content wrap">
          <div className="hero-topline">
            <span className="live-dot" />
            {ar
              ? "جذور سعودية. آفاق عالمية."
              : "SAUDI ROOTS. GLOBAL CONNECTIONS."}
          </div>
          <h1>
            {ar ? (
              <>
                علامات عالمية.
                <br />
                <em>روابط إنسانية.</em>
              </>
            ) : (
              <>
                Global brands.
                <br />
                <em>Closer to people.</em>
              </>
            )}
          </h1>
          <div className="hero-description">
            <span className="hero-rule" />
            <p>
              {ar
                ? "منذ 1987، نبني الثقة بين العلامات التجارية والأسواق والناس في المملكة العربية السعودية."
                : "Since 1987, connecting brands, markets and people through enduring partnerships in Saudi Arabia."}
            </p>
          </div>
          <TextLink href={`/${locale}/about`} light>
            {ar ? "اكتشف حكاية MBT" : "Discover the MBT story"}
          </TextLink>
        </div>
        <div className="hero-coordinate">
          <span>21°32′ N &nbsp; 39°10′ E</span>
          <p>
            {ar ? "جدة، حيث تبدأ حكايتنا" : "Jeddah. Where our story begins."}
          </p>
        </div>
        <div className="hero-bottom wrap">
          <a href="#connections" className="scroll-cue">
            <span>↓</span>
            {ar ? "اكتشف الروابط" : "Follow the connections"}
          </a>
          <div className="hero-flow">
            <span>{ar ? "علامات عالمية" : "Global brands"}</span>
            <i />
            <b>MBT</b>
            <i />
            <span>{ar ? "الأسواق السعودية" : "Saudi markets"}</span>
          </div>
          <span className="hero-founded">{ar ? "منذ" : "EST."} 1987</span>
        </div>
      </section>
      <section className="introduction wrap" id="connections">
        <div className="intro-side">
          <span className="section-note">
            {ar
              ? "حضور بُني على الثقة"
              : "A legacy of bringing things together."}
          </span>
          <div className="established">
            <span>1987</span>
            <p>{ar ? "بداية حكايتنا" : "The year our story began"}</p>
          </div>
        </div>
        <div className="intro-statement">
          <h2>
            {ar ? (
              <>
                نقرّب العالم
                <br />
                من <em>الحياة اليومية.</em>
              </>
            ) : (
              <>
                Bringing the world
                <br />
                into <em>everyday life.</em>
              </>
            )}
          </h2>
          <p>
            {ar
              ? "شركة محمد باوزير للتجارة شركة سعودية تعمل في توزيع السلع الاستهلاكية وبناء العلامات التجارية. نجمع معرفة السوق المحلي بعلاقات دولية، لنصل بالمنتجات إلى المكان الذي يحتاجها فيه الناس."
              : "Mohammed Bawazir Trading Company is a Saudi business with a long-standing presence in consumer goods distribution. We bring local market understanding and international relationships together, connecting products with the people who use them."}
          </p>
          <div className="intro-proof">
            <div>
              <span>{ar ? "علاقات دولية" : "International relationships"}</span>
              <strong>
                {ar ? "جائزة بريمادوتا" : "Primaduta recognition"}
              </strong>
              <small>2019 · 2024</small>
            </div>
            <TextLink href={`/${locale}/about`}>
              {ar ? "تعرّف علينا" : "Get to know MBT"}
            </TextLink>
          </div>
        </div>
      </section>
      <section className="brands-section">
        <div className="wrap">
          <div className="section-heading compact">
            <h2>
              {ar
                ? "أسماء تعرفها. علاقات نعتز بها."
                : "Familiar names. Lasting partnerships."}
            </h2>
            <TextLink href={`/${locale}/brands`}>
              {ar ? "استكشف العلامات" : "Explore our brands"}
            </TextLink>
          </div>
          <div className="brand-strip">
            {heroBrands.map((b) => (
              <Link
                prefetch={false}
                href={`/${locale}/brands/${b.slug}`}
                key={b.slug}
                className="brand-mark"
              >
                <Image
                  src={b.image}
                  alt={pick(b.name, locale)}
                  width={180}
                  height={100}
                />
                <span>
                  {pick(b.name, locale)} <span>↗</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Network locale={locale} />
      <section className="business-home wrap">
        <div className="section-heading">
          <div>
            <span className="section-note">
              {ar
                ? "محفظة متنوعة. معرفة مشتركة."
                : "Many categories. One shared commitment."}
            </span>
            <h2>
              {ar ? (
                <>
                  في قلب
                  <br />
                  <em>الحياة اليومية.</em>
                </>
              ) : (
                <>
                  Part of
                  <br />
                  <em>the everyday.</em>
                </>
              )}
            </h2>
          </div>
          <p>
            {ar
              ? "قطاعات مختلفة يجمعها فهم احتياجات السوق والعناية بعلاقات طويلة المدى."
              : "Different sectors, connected by an understanding of local needs and a commitment to long-term relationships."}
          </p>
        </div>
        <div className="business-feature">
          <div className="business-feature-copy">
            <span className="business-num">
              01 / {ar ? "أعمالنا" : "OUR BUSINESS"}
            </span>
            <h3>{ar ? "عالم من المذاق." : "A world of taste."}</h3>
            <p>
              {ar
                ? "من مكونات المائدة اليومية إلى المشروبات والحلويات، اكتشف محفظة الأغذية لدى MBT."
                : "From everyday kitchen essentials to beverages and confectionery, discover the food portfolio at MBT."}
            </p>
            <TextLink href={`/${locale}/business/food`}>
              {ar ? "استكشف قطاع الأغذية" : "Explore food & beverages"}
            </TextLink>
          </div>
          <div className="product-composition">
            {featured.map((p, i) => (
              <Image
                key={p.id}
                className={`pack pack-${i}`}
                src={p.image}
                alt={p.name}
                width={320}
                height={340}
                sizes="30vw"
              />
            ))}
            <span className="composition-caption">
              {ar ? "من محفظة MBT" : "FROM THE MBT PORTFOLIO"}
            </span>
          </div>
        </div>
        <div className="business-rows">
          {[
            {
              slug: "household",
              en: "Household & consumables",
              ar: "المنزل والمستلزمات الاستهلاكية",
              desc: ar
                ? "منتجات للحياة اليومية"
                : "Products for everyday living",
            },
            {
              slug: "personal-care",
              en: "Personal care & healthcare",
              ar: "العناية الشخصية والرعاية الصحية",
              desc: ar ? "استكشف سجلات القطاع" : "Explore the division archive",
            },
            {
              slug: "tobacco",
              en: "Other business divisions",
              ar: "قطاعات الأعمال الأخرى",
              desc: ar
                ? "المعلومات المؤسسية للقطاعات"
                : "Corporate division information",
            },
          ].map((d) => (
            <Link
              prefetch={false}
              key={d.slug}
              href={`/${locale}/business/${d.slug}`}
            >
              <h3>{ar ? d.ar : d.en}</h3>
              <span>{d.desc}</span>
              <Arrow diagonal />
            </Link>
          ))}
        </div>
      </section>
      <section className="journey">
        <div className="wrap">
          <div className="section-heading">
            <h2>
              {ar ? (
                <>
                  كل خطوة
                  <br />
                  <em>تقرّبنا أكثر.</em>
                </>
              ) : (
                <>
                  Every connection
                  <br />
                  <em>moves us forward.</em>
                </>
              )}
            </h2>
            <p>
              {ar
                ? "من العلاقة مع العلامة التجارية إلى حضورها على الرف، تبني MBT جسورًا بين المنتج والسوق."
                : "From a relationship with a brand to its presence on a shelf, MBT connects the people and processes that bring products to market."}
            </p>
          </div>
          <ol className="journey-line">
            {(ar
              ? [
                  "العلامات العالمية",
                  "التوريد",
                  "التخزين",
                  "التوزيع",
                  "التجزئة",
                  "الناس",
                ]
              : [
                  "Global brands",
                  "Sourcing",
                  "Warehousing",
                  "Distribution",
                  "Retail",
                  "People",
                ]
            ).map((s, i) => (
              <li key={s}>
                <span className="journey-node">
                  {i === 0
                    ? "↗"
                    : i === 5
                      ? "◎"
                      : String(i + 1).padStart(2, "0")}
                </span>
                <h3>{s}</h3>
                <span className="journey-line-segment" />
              </li>
            ))}
          </ol>
          <div className="journey-bottom">
            <span>MBT</span>
            <p>
              {ar
                ? "معرفة محلية في كل مرحلة."
                : "Local understanding at every stage."}
            </p>
            <TextLink href={`/${locale}/distribution`}>
              {ar ? "كيف نصل إلى أسواقنا" : "How we connect our markets"}
            </TextLink>
          </div>
        </div>
      </section>
      <section className="legacy wrap">
        <div className="legacy-year" aria-hidden="true">
          19
          <br />
          <span>87</span>
        </div>
        <div className="legacy-content">
          <span className="section-note">
            {ar ? "ثقة تنتقل بين الأجيال" : "A foundation that lasts."}
          </span>
          <h2>
            {ar ? (
              <>
                حكاية تبدأ بالناس.
                <br />
                <em>وتستمر بالثقة.</em>
              </>
            ) : (
              <>
                Built by people.
                <br />
                <em>Carried by trust.</em>
              </>
            )}
          </h2>
          <p>
            {ar
              ? "منذ التأسيس في عام 1987، ارتبطت حكاية MBT بالأشخاص الذين بنوها وبالعلاقات التي استمرت معها. نحفظ إرث المؤسسين، ونتطلع إلى الفصل القادم."
              : "Since our founding in 1987, the MBT story has been shaped by the people who built the business and the relationships that grew with it. Our founders’ legacy remains part of the company’s story."}
          </p>
          <div className="legacy-dates">
            <span>
              <b>1987</b>
              {ar ? "البداية" : "Our beginning"}
            </span>
            <span>
              <b>2019</b>
              {ar ? "بريمادوتا" : "Primaduta Award"}
            </span>
            <span>
              <b>2024</b>
              {ar ? "تقدير متجدد" : "Recognition renewed"}
            </span>
          </div>
          <TextLink href={`/${locale}/about#legacy`}>
            {ar ? "استكشف إرثنا" : "Explore our legacy"}
          </TextLink>
        </div>
      </section>
      <section className="portfolio-preview">
        <div className="wrap portfolio-grid">
          <div>
            <p className="section-note">
              {ar ? "محفظة المنتجات" : "The MBT portfolio"}
            </p>
            <h2>
              {ar ? (
                <>
                  خيارات متعددة.
                  <br />
                  <em>قصة واحدة.</em>
                </>
              ) : (
                <>
                  Everyday variety.
                  <br />
                  <em>A shared story.</em>
                </>
              )}
            </h2>
            <p>
              {ar
                ? "استعرض العلامات والفئات والمنتجات في كتالوج منظم مستند إلى سجلات الشركة."
                : "Explore the brands, categories and product records that make up the company’s published catalogue."}
            </p>
            <TextLink href={`/${locale}/products`}>
              {ar ? "استعرض دليل المنتجات" : "Explore the product catalogue"}
            </TextLink>
          </div>
          <div className="portfolio-art portfolio-products">
            {["lool", "wings", "nutrisari"].map((brand, i) => {
              const p = products.find(
                (p) => p.brand === brand && p.language === "en" && p.image,
              )!;
              return (
                <Image
                  key={brand}
                  src={p.image}
                  alt={p.name}
                  width={320}
                  height={320}
                  className={`portfolio-pack portfolio-pack-${i}`}
                  sizes="20vw"
                />
              );
            })}
          </div>
        </div>
      </section>
      <section className="people-home wrap">
        <div className="people-title">
          <span className="section-note">
            {ar
              ? "الأشخاص وراء العلاقات"
              : "The people behind the relationships"}
          </span>
          <h2>{ar ? "حضور إنساني." : "Business, with a human connection."}</h2>
          <TextLink href={`/${locale}/about#leadership`}>
            {ar ? "تعرّف على فريقنا" : "Meet the company"}
          </TextLink>
        </div>
        <Photo
          src={articles.find((a) => a.id === 36455)!.image}
          alt={
            ar
              ? "زيارة الوفد التجاري الإندونيسي إلى مقر MBT"
              : "Indonesian trade delegation visiting MBT"
          }
          sizes="55vw"
        />
      </section>
      <section className="news-home wrap">
        <div className="section-heading compact">
          <h2>{ar ? "من عالم MBT." : "Inside the world of MBT."}</h2>
          <TextLink href={`/${locale}/news`}>
            {ar ? "جميع الأخبار" : "All news & insights"}
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
              <Photo src={a.image} alt={pick(a.title, locale)} sizes="33vw" />
              <div className="article-date">
                {dateLabel(a.date, locale)}
                <Arrow diagonal />
              </div>
              <h3>{pick(a.title, locale)}</h3>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
