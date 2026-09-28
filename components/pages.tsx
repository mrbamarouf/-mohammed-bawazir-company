import Image from "next/image";
import Link from "next/link";
import {
  type Locale,
  pick,
  type Product,
  type Brand,
  type Article,
} from "@/lib/types";
import { company, divisions, branches } from "@/lib/company";
import {
  assets,
  brands,
  products,
  articles,
  archive,
  dateLabel,
} from "@/lib/data";
import profiles from "@/content/profiles.json";
import {
  PageIntro,
  Photo,
  TextLink,
  Arrow,
  SourceLink,
  EmptyImage,
} from "./ui";
import { Network } from "./network";
import { Catalogue } from "./catalogue";
import { Enquiry } from "./enquiry";
import { ProfileViewer } from "./profile-viewer";
import { BrandDirectory } from "./brand-directory";
export function AboutPage({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  return (
    <>
      <PageIntro
        locale={locale}
        kicker={ar ? "عن الشركة" : "Our story"}
        title={ar ? "علاقات بُنيت لتدوم." : "Relationships, built to last."}
        description={
          ar
            ? "منذ عام 1987، تجمع شركة محمد باوزير للتجارة بين جذورها السعودية وعلاقاتها الدولية في تجارة وتوزيع السلع الاستهلاكية."
            : "Since 1987, Mohammed Bawazir Trading Company has brought Saudi market knowledge and international brand relationships together."
        }
      />
      <Photo
        className="about-panorama"
        src="/assets/company/headquarters.jpg"
        alt={ar ? "مقر MBT في جدة" : "MBT headquarters in Jeddah"}
        priority
      />
      <section className="wrap editorial-split">
        <h2>
          {ar ? (
            <>
              جذور راسخة.
              <br />
              <em>رؤية تتطلع للأمام.</em>
            </>
          ) : (
            <>
              Rooted in experience.
              <br />
              <em>Looking ahead.</em>
            </>
          )}
        </h2>
        <div>
          <p className="lead">
            {ar
              ? "ننشط في توزيع المنتجات الاستهلاكية وبناء العلامات التجارية في الأسواق المحلية والدولية."
              : "We work in consumer goods distribution and brand building in national and international markets."}
          </p>
          <p>
            {ar
              ? "يقع مقرنا الرئيسي في جدة، وتتوزع المدن الواردة في دليل فروعنا عبر مناطق المملكة. ترتكز أعمالنا على معرفة الأسواق والعمل الجماعي والعلاقات طويلة الأجل مع الشركاء."
              : "From our headquarters in Jeddah, our published branch network extends to cities across the Kingdom. Local understanding, teamwork and enduring partner relationships are central to the business."}
          </p>
          <TextLink href={`/${locale}/profile`}>
            {ar ? "اقرأ الملف التعريفي" : "Read the company profile"}
          </TextLink>
        </div>
      </section>
      <section className="principles wrap">
        {[
          {
            name: ar ? "رؤيتنا" : "Our vision",
            text: ar
              ? "أن نكون من روّاد السوق وبناة العلامات التجارية، وأن نُعرف بخدمات التوزيع المتميزة في أسواق الخليج."
              : "To be market leaders and brand builders, recognised for premium distribution services in the GCC market.",
          },
          {
            name: ar ? "رسالتنا" : "Our mission",
            text: ar
              ? "تقديم خدمات توزيع متميزة، مع دعم توافر المنتجات والتطوير المستمر للوعي بالعلامة التجارية وصورتها في دول الخليج."
              : "To provide superior distribution and services, supporting product availability and the continued development of brand awareness across the GCC.",
          },
          {
            name: ar ? "قيمنا" : "Our values",
            text: ar
              ? "العمل الجماعي، واحترام الفرد، والقيادة القوية، والثقة، والمسؤولية الاجتماعية."
              : "Teamwork, individual respect, strong leadership, trust and social responsibility.",
          },
        ].map((x) => (
          <div className="principle" key={x.name}>
            <h3>{x.name}</h3>
            <p>{x.text}</p>
          </div>
        ))}
      </section>
      <section id="legacy" className="history-section">
        <div className="wrap">
          <div className="section-heading">
            <h2>
              {ar ? (
                <>
                  إرث يتواصل.
                  <br />
                  <em>عبر الأجيال.</em>
                </>
              ) : (
                <>
                  A legacy that
                  <br />
                  <em>continues.</em>
                </>
              )}
            </h2>
            <p>
              {ar
                ? "محطات موثقة من حكاية MBT."
                : "Selected milestones from the MBT company record."}
            </p>
          </div>
          <div className="timeline">
            {[
              {
                year: "1987",
                title: ar ? "تأسيس الشركة" : "Our beginning",
                body: ar
                  ? "انطلاق شركة محمد باوزير للتجارة."
                  : "Mohammed Bawazir Trading Company was established.",
              },
              {
                year: "2019",
                title: ar ? "جائزة بريمادوتا" : "Primaduta Award",
                body: ar
                  ? "تقدير للالتزام والأداء في الأعمال مع الشركات الإندونيسية."
                  : "Recognition for commitment and performance in business with Indonesian companies.",
              },
              {
                year: "2024",
                title: ar
                  ? "تقدير متجدد للشراكة"
                  : "Partnership, recognised again",
                body: ar
                  ? "جائزة بريمادوتا الرئاسية لعام 2024، بحسب خبر الشركة المنشور في يناير 2025."
                  : "The Presidential Primaduta Award 2024, documented in the company’s January 2025 announcement.",
              },
            ].map((x) => (
              <div key={x.year}>
                <strong>{x.year}</strong>
                <h3>{x.title}</h3>
                <p>{x.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="wrap founder-section">
        <div>
          <p className="section-note">{ar ? "في الذاكرة" : "In remembrance"}</p>
          <h2>
            {ar
              ? "الناس الذين أسسوا الحكاية."
              : "The people who began the story."}
          </h2>
          <p>
            {ar
              ? "يحتفي سجل الشركة بإرث الراحلين فوزي باوزير ومحمد باوزير، وبأثرهما في تأسيس هوية MBT وعلاقاتها."
              : "The company honours the memory of Fawzi Bawazir and Mohammed Bawazir, whose legacy remains part of MBT’s identity and relationships."}
          </p>
          <SourceLink
            url="https://www.mbtksa.com/about-us-2/our-company/meet-our-teams/"
            locale={locale}
          />
        </div>
        <div className="founder-portraits">
          {[
            {
              name: ar ? "فوزي باوزير" : "Fawzi Bawazir",
              image: assets.founder,
            },
            {
              name: ar ? "محمد باوزير" : "Mohammed Bawazir",
              image: assets.founder2,
            },
          ].map((p) => (
            <figure key={p.name}>
              <Photo src={p.image} alt={p.name} sizes="25vw" />
              <figcaption>{p.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section id="leadership" className="leadership wrap">
        <div className="section-heading">
          <h2>{ar ? "قيادة وعلاقات." : "Leadership & relationships."}</h2>
          <p>
            {ar
              ? "الأسماء والمناصب كما وردت في صفحة فريق الشركة المنشورة."
              : "Names and roles as published on the company’s team page."}
          </p>
        </div>
        <div className="leadership-list">
          {[
            {
              en: "Raghad Bawazir",
              ar: "رغد باوزير",
              role: ar ? "الرئيس التنفيذي" : "Chief Executive Officer",
            },
            {
              en: "Fawzi Mohammed Bawazir",
              ar: "فوزي محمد باوزير",
              role: ar ? "المدير العام" : "General Manager",
            },
            {
              en: "Hussam Bawazir",
              ar: "حسام باوزير",
              role: ar
                ? "مدير التسويق والمبيعات"
                : "Marketing & Sales Director",
            },
            {
              en: "Saad Ghanem",
              ar: "سعد غانم",
              role: ar ? "مدير تطوير الأعمال" : "Business Development Director",
            },
            {
              en: "Hani Al Khayath",
              ar: "هاني الخياط",
              role: ar ? "المدير المالي" : "Finance Director",
            },
            {
              en: "Mohammed Zolan",
              ar: "محمد زولان",
              role: ar ? "مدير الموارد البشرية" : "Human Resource Director",
            },
          ].map((p) => (
            <div key={p.en}>
              <h3>{ar ? p.ar : p.en}</h3>
              <span>{p.role}</span>
            </div>
          ))}
        </div>
        <SourceLink
          url="https://www.mbtksa.com/about-us-2/our-company/meet-our-teams/"
          locale={locale}
        />
      </section>
    </>
  );
}
export function BusinessPage({
  locale,
  division,
}: {
  locale: Locale;
  division?: string;
}) {
  const ar = locale === "ar";
  const d = divisions.find((x) => x.slug === division);
  if (d)
    return (
      <>
        <PageIntro
          locale={locale}
          kicker={ar ? "أعمالنا" : "Our business"}
          title={pick(d.name, locale)}
          description={pick(d.description, locale)}
        />
        <section className="wrap division-detail">
          <div className="division-brand-list">
            {brands
              .filter((b) => b.division === d.slug)
              .map((b) => (
                <Link
                  prefetch={false}
                  key={b.slug}
                  href={`/${locale}/brands/${b.slug}`}
                >
                  {pick(b.name, locale)}
                  <Arrow diagonal />
                </Link>
              ))}
          </div>
          {d.slug === "tobacco" ? (
            <div className="prose">
              <h2>{ar ? "معلومات القطاع" : "Division information"}</h2>
              <p>
                {ar
                  ? "ورد قطاع التبغ ضمن قطاعات الشركة في المصدر الرسمي. هذه الصفحة تقدم مرجعًا مؤسسيًا للمعلومات المنشورة."
                  : "The tobacco division is listed in the official company structure. This page provides a corporate reference to the published division information."}
              </p>
              <SourceLink
                url="https://www.mbtksa.com/tobacco-6/"
                locale={locale}
              />
            </div>
          ) : (
            <Catalogue
              products={products}
              brands={brands}
              locale={locale}
              initialDivision={d.slug}
            />
          )}
        </section>
      </>
    );
  return (
    <>
      <PageIntro
        locale={locale}
        kicker={ar ? "أعمالنا" : "Our business"}
        title={
          ar
            ? "معرفة بالسوق. عبر قطاعات متعددة."
            : "Market understanding. Across categories."
        }
        description={
          ar
            ? "تحفظ محفظة MBT تنوعًا في قطاعات الأغذية والمشروبات والمنتجات المنزلية والعناية الشخصية والرعاية الصحية."
            : "The MBT portfolio spans food, beverages, household products, personal care and healthcare, alongside its other business divisions."
        }
      />
      <section className="wrap business-directory">
        {divisions.map((d) => (
          <Link
            prefetch={false}
            className="division-row"
            key={d.slug}
            href={`/${locale}/business/${d.slug}`}
          >
            <span className="division-number">{d.number}</span>
            <h2>{pick(d.name, locale)}</h2>
            <p>{pick(d.description, locale)}</p>
            <Arrow diagonal />
          </Link>
        ))}
      </section>
      <section className="wrap editorial-split">
        <h2>{ar ? "حضور يتجاوز التوزيع." : "Beyond distribution."}</h2>
        <div>
          <p>
            {ar
              ? "مرئي للخدمات التسويقية، Promo Insight، مدرجة ضمن شركات مجموعة MBT لتقديم الخدمات التسويقية المتكاملة."
              : "Promo Insight is listed as part of the MBT group, providing integrated marketing services."}
          </p>
          <TextLink href={`/${locale}/companies`}>
            {ar ? "تعرّف على شركاتنا" : "Explore our companies"}
          </TextLink>
        </div>
      </section>
    </>
  );
}
export function BrandsPage({
  locale,
  brand,
}: {
  locale: Locale;
  brand?: Brand;
}) {
  const ar = locale === "ar";
  if (brand)
    return (
      <>
        <PageIntro
          locale={locale}
          kicker={ar ? "علاماتنا" : "Our brands"}
          title={pick(brand.name, locale)}
          description={pick(brand.description, locale)}
        >
          {brand.image && (
            <Image
              className="detail-brand-logo"
              src={brand.image}
              width={210}
              height={110}
              alt={pick(brand.name, locale)}
            />
          )}
        </PageIntro>
        <section className="wrap detail-content">
          <SourceLink url={brand.source} locale={locale} />
          {brand.division !== "tobacco" ? (
            <Catalogue
              locale={locale}
              brands={brands}
              products={products}
              initialBrand={brand.slug}
            />
          ) : (
            <p>
              {ar
                ? "سجل العلامة ضمن المعلومات المؤسسية المنشورة للشركة."
                : "Brand record in the company’s published corporate information."}
            </p>
          )}
          <TextLink href={`/${locale}/brands`}>
            {ar ? "جميع العلامات" : "Back to all brands"}
          </TextLink>
        </section>
      </>
    );
  return (
    <>
      <PageIntro
        locale={locale}
        kicker={ar ? "علاماتنا" : "Our brands"}
        title={
          ar
            ? "أسماء عالمية. معرفة محلية."
            : "Global names. Local understanding."
        }
        description={
          ar
            ? "استكشف العلامات والشركاء الواردين في محفظة الشركة المنشورة، عبر مختلف القطاعات."
            : "Discover brands and partners featured in the company’s published portfolio, across our business divisions."
        }
      />
      <section className="wrap detail-content">
        <BrandDirectory locale={locale} brands={brands} />
      </section>
    </>
  );
}
export function ProductsPage({
  locale,
  product,
}: {
  locale: Locale;
  product?: Product;
}) {
  const ar = locale === "ar";
  if (product) {
    const brand = brands.find((b) => b.slug === product.brand);
    return (
      <section className="wrap product-detail">
        <div className="breadcrumb">
          <Link prefetch={false} href={`/${locale}/products`}>
            {ar ? "دليل المنتجات" : "Product catalogue"}
          </Link>
          <span>/</span>
          <span>{brand ? pick(brand.name, locale) : "MBT"}</span>
        </div>
        <div className="product-detail-grid">
          <div className="product-detail-image">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="50vw"
                preload
              />
            ) : (
              <EmptyImage
                label={ar ? "لا توجد صورة في المصدر" : "No image in source"}
              />
            )}
          </div>
          <div>
            <p className="section-note">
              {brand ? pick(brand.name, locale) : "MBT"}
            </p>
            <h1 dir={product.language === "ar" ? "rtl" : "ltr"}>
              {product.name}
            </h1>
            {product.description && (
              <p
                className="lead"
                dir={product.language === "ar" ? "rtl" : "ltr"}
              >
                {product.description}
              </p>
            )}
            <dl>
              <div>
                <dt>{ar ? "القسم" : "Division"}</dt>
                <dd>
                  {
                    divisions.find((d) => d.slug === product.division)?.name[
                      locale
                    ]
                  }
                </dd>
              </div>
              <div>
                <dt>{ar ? "الفئات الأصلية" : "Source categories"}</dt>
                <dd>{product.categories.join(" / ")}</dd>
              </div>
              <div>
                <dt>{ar ? "لغة السجل" : "Record language"}</dt>
                <dd>{product.language === "ar" ? "العربية" : "English"}</dd>
              </div>
            </dl>
            <SourceLink url={product.source} locale={locale} />
            <p className="small-note">
              {ar
                ? "المواصفات كما وردت في سجل المنتج الأصلي؛ التوافر والتعبئة قد يتغيران."
                : "Details are reproduced from the original product record; availability and packaging may change."}
            </p>
            {product.division !== "tobacco" && (
              <TextLink href={`/${locale}/contact`}>
                {ar ? "استفسار عن المحفظة" : "Ask about the portfolio"}
              </TextLink>
            )}
          </div>
        </div>
      </section>
    );
  }
  return (
    <>
      <PageIntro
        locale={locale}
        kicker={ar ? "المنتجات" : "Product catalogue"}
        title={ar ? "استكشف عالم المنتجات." : "A portfolio for everyday life."}
        description={
          ar
            ? "ابحث في السجلات المنشورة للشركة. يمكنك التصفية حسب القطاع والعلامة ولغة المحتوى الأصلي."
            : "Explore the company’s published product records. Search by name, browse by division, or filter by brand and original language."
        }
      />
      <section className="wrap detail-content">
        <Catalogue products={products} brands={brands} locale={locale} />
      </section>
    </>
  );
}
export function DistributionPage({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  return (
    <>
      <PageIntro
        locale={locale}
        kicker={ar ? "شبكتنا" : "Our network"}
        title={ar ? "معرفة محلية. روابط أبعد." : "Closer to our markets."}
        description={
          ar
            ? "شبكة الفروع الواردة في دليل الشركة تربط حضور MBT بمدن متعددة في المملكة."
            : "The company’s published branch directory connects the MBT business to cities across Saudi Arabia."
        }
      />
      <Network locale={locale} standalone />
      <section className="wrap editorial-split">
        <h2>{ar ? "من التوريد إلى الرف." : "From source to shelf."}</h2>
        <div>
          <p className="lead">
            {ar
              ? "التخزين، والتوزيع، وفرق المبيعات، والعرض في المتاجر أجزاء مترابطة في قصة الوصول إلى الأسواق."
              : "Warehousing, distribution, sales teams and in-store presence are connected parts of bringing products to market."}
          </p>
          <p>
            {ar
              ? "يوثق الملف التعريفي للشركة منشآت التخزين والأسطول وفرق العمل. تتوفر النسخ المؤرشفة للاطلاع على السياق التاريخي للعمليات."
              : "The company profile documents storage facilities, fleet operations and teams. Archived editions provide historical context for the operation."}
          </p>
          <TextLink href={`/${locale}/profile`}>
            {ar ? "استعرض الملف التعريفي" : "View the company profile"}
          </TextLink>
        </div>
      </section>
      <section className="branch-directory wrap">
        <h2>{ar ? "دليل المدن" : "City directory"}</h2>
        {branches.map((b) => (
          <div key={b.id}>
            <h3>{pick(b.name, locale)}</h3>
            <p>{pick(b.note, locale)}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.name.en + ", Saudi Arabia")}`}
              target="_blank"
              rel="noreferrer"
            >
              {ar ? "خريطة المدينة" : "City map"} ↗
            </a>
          </div>
        ))}
        <SourceLink
          url="https://www.mbtksa.com/about-us-2/our-company/our-branches/"
          locale={locale}
        />
        <SourceLink
          url="https://www.mbtksa.com/about-us/our-company/our-branches/"
          locale={locale}
        />
      </section>
    </>
  );
}
export function CompaniesPage({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  return (
    <>
      <PageIntro
        locale={locale}
        kicker={ar ? "شركاتنا" : "Our companies"}
        title={ar ? "خبرات تكمّل بعضها." : "Connected expertise."}
        description={
          ar
            ? "شركات وملفات تعريفية منشورة ضمن مجموعة MBT."
            : "Companies and profiles published within the MBT group’s official website."
        }
      />
      <section className="wrap company-features">
        <article>
          <Image src="/assets/mbt/logo.png" width={220} height={81} alt="MBT" />
          <div>
            <h2>{pick(company.name, locale)}</h2>
            <p>
              {ar
                ? "الشركة التجارية وأعمال التوزيع، انطلاقًا من المقر الرئيسي في جدة."
                : "The trading and distribution business, headquartered in Jeddah."}
            </p>
            <TextLink href={`/${locale}/profile`}>
              {ar ? "ملف الشركة" : "Company profile"}
            </TextLink>
          </div>
        </article>
        <article>
          {assets.promo && (
            <Image
              src={assets.promo}
              width={220}
              height={140}
              alt="Promo Insight"
            />
          )}
          <div>
            <h2>{ar ? "مرئي للخدمات التسويقية" : "Promo Insight"}</h2>
            <p>
              {ar
                ? "شركة خدمات تسويقية متكاملة مدرجة ضمن مجموعة MBT في جدة، المملكة العربية السعودية."
                : "An integrated marketing services company, listed as part of the MBT group in Jeddah, Saudi Arabia."}
            </p>
            <TextLink href={`/${locale}/profile/promo-insight`}>
              {ar ? "استعرض الملف المؤرشف" : "Explore the archived profile"}
            </TextLink>
          </div>
        </article>
        <article>
          {assets.whitegate && (
            <Image
              src={assets.whitegate}
              width={220}
              height={140}
              alt="White Gate"
            />
          )}
          <div>
            <h2>{ar ? "وايت جيت" : "White Gate"}</h2>
            <p>
              {ar
                ? "يذكر الملف التعريفي لعام 2017 تأسيس وايت جيت في 2005 لتوزيع الأجهزة الطبية وتجهيزات المستشفيات. يُعرض هذا السجل بوصفه جزءًا من تاريخ المجموعة."
                : "The 2017 profile records White Gate’s founding in 2005 for medical device and hospital equipment distribution. Preserved here as part of the group’s history."}
            </p>
            <TextLink href={`/${locale}/profile/white-gate`}>
              {ar ? "استعرض الملف المؤرشف" : "View the archived profile"}
            </TextLink>
          </div>
        </article>
        <article>
          <span className="company-wordmark" aria-hidden="true">
            MBTech
          </span>
          <div>
            <h2>{ar ? "محمد باوزير لتقنية المعلومات" : "MBTech"}</h2>
            <p>
              {ar
                ? "وردت ضمن شركات المجموعة في الملف التعريفي لعام 2017، في حلول تقنية المعلومات وتكامل الأنظمة وربط الفروع. هذا سجل تاريخي، وليس بيانًا عن وضعها الحالي."
                : "Listed in the 2017 group profile for IT solutions, systems integration and branch connectivity. This is a historical record; its present status is not established by the archive."}
            </p>
            <TextLink href={`/${locale}/profile/mbtech`}>
              {ar ? "السجل التاريخي · 2017" : "Historical record · 2017"}
            </TextLink>
          </div>
        </article>
      </section>
    </>
  );
}
export function NewsPage({
  locale,
  article,
}: {
  locale: Locale;
  article?: Article;
}) {
  const ar = locale === "ar";
  if (article)
    return (
      <>
        <section className="article-heading wrap">
          <div className="breadcrumb">
            <Link prefetch={false} href={`/${locale}/news`}>
              {ar ? "الأخبار والفعاليات" : "News & insights"}
            </Link>
            <span>/</span>
            <time>{dateLabel(article.date, locale)}</time>
          </div>
          <h1>{pick(article.title, locale)}</h1>
        </section>
        {article.image && (
          <Photo
            className="article-cover wrap"
            src={article.image}
            alt={pick(article.title, locale)}
            priority
          />
        )}
        <article className="article-body wrap">
          <div className="article-aside">
            <span>{ar ? "تاريخ النشر" : "Published"}</span>
            <time dateTime={article.date}>
              {dateLabel(article.date, locale)}
            </time>
            <SourceLink url={article.source} locale={locale} />
          </div>
          <div>
            {article.body[locale] ? (
              <p className="lead">{article.body[locale]}</p>
            ) : article.body.en ? (
              <>
                <p className="small-note">
                  {ar
                    ? "النص الأصلي لهذا الخبر متاح باللغة الإنجليزية."
                    : "Original company report."}
                </p>
                <p lang="en" dir="ltr" className="lead">
                  {article.body.en}
                </p>
              </>
            ) : (
              <p className="lead">
                {ar
                  ? "توثق الصور هذا الحدث من أرشيف الشركة."
                  : "A photographic record of this event from the company archive."}
              </p>
            )}
            <div className="article-gallery">
              {article.gallery
                .filter((x) => x !== article.image)
                .slice(0, 12)
                .map((src, i) => (
                  <Photo
                    key={src}
                    src={src}
                    alt={`${pick(article.title, locale)} ${i + 1}`}
                    sizes="50vw"
                  />
                ))}
            </div>
            {article.gallery.length > 13 && (
              <details>
                <summary>
                  {ar ? "عرض بقية صور الحدث" : "Show more event photographs"}
                </summary>
                <div className="article-gallery">
                  {article.gallery
                    .filter((x) => x !== article.image)
                    .slice(12)
                    .map((src, i) => (
                      <Photo
                        key={src}
                        src={src}
                        alt={`${pick(article.title, locale)} ${i + 13}`}
                        sizes="50vw"
                      />
                    ))}
                </div>
              </details>
            )}
            <TextLink href={`/${locale}/news`}>
              {ar ? "العودة إلى الأخبار" : "Back to news & insights"}
            </TextLink>
          </div>
        </article>
      </>
    );
  return (
    <>
      <PageIntro
        locale={locale}
        kicker={ar ? "الأخبار" : "News & insights"}
        title={ar ? "أخبار العلاقات التي نبنيها." : "Stories of connection."}
        description={
          ar
            ? "شراكات وفعاليات ومبادرات مجتمعية من أرشيف شركة محمد باوزير للتجارة."
            : "Partnerships, events and community initiatives from the Mohammed Bawazir Trading Company archive."
        }
      />
      <section className="wrap news-list">
        <div className="news-grid">
          {articles.map((a) => (
            <Link
              prefetch={false}
              href={`/${locale}/news/${a.slug}`}
              className="news-item"
              key={a.id}
            >
              {a.image ? (
                <Photo src={a.image} alt={pick(a.title, locale)} sizes="33vw" />
              ) : (
                <EmptyImage
                  label={ar ? "من أرشيف الشركة" : "From the company archive"}
                />
              )}
              <div className="article-date">
                <time dateTime={a.date}>{dateLabel(a.date, locale)}</time>
                <Arrow diagonal />
              </div>
              <h2>{pick(a.title, locale)}</h2>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
const marketingTypes = [
  {
    slug: "in-store-food-display",
    en: "Food, in store",
    ar: "الأغذية في المتاجر",
    id: 26131,
  },
  {
    slug: "in-store-beverage-display",
    en: "Beverages, in store",
    ar: "المشروبات في المتاجر",
    id: 26130,
  },
  {
    slug: "in-store-consumables-display",
    en: "Consumer products",
    ar: "عرض المنتجات الاستهلاكية",
    id: 26132,
  },
  {
    slug: "in-store-healthcare-display",
    en: "Personal care & pharma",
    ar: "العناية الشخصية والقطاع الدوائي",
    id: 26139,
  },
  {
    slug: "sales-man-with-handheld",
    en: "Sales teams",
    ar: "فرق المبيعات",
    id: 11450,
  },
  {
    slug: "distribution-tools",
    en: "Distribution resources",
    ar: "موارد التوزيع",
    id: 24926,
  },
];
export function MarketingPage({
  locale,
  slug,
}: {
  locale: Locale;
  slug?: string;
}) {
  const ar = locale === "ar";
  const type = marketingTypes.find((t) => t.slug === slug);
  const source = type ? archive.find((a) => a.id === type.id) : undefined;
  return (
    <>
      <PageIntro
        locale={locale}
        kicker={ar ? "الأنشطة التسويقية" : "Marketing activities"}
        title={
          type
            ? ar
              ? type.ar
              : type.en
            : ar
              ? "حضور في السوق."
              : "Where brands meet their markets."
        }
        description={
          ar
            ? "سجل بصري لأنشطة الشركة، من العرض في المتاجر إلى فرق العمل والفعاليات."
            : "A visual record of the company’s market activity, from in-store displays to teams and events."
        }
      />
      <section className="wrap detail-content">
        {source ? (
          <>
            <SourceLink locale={locale} url={source.source} />
            <p className="small-note">
              {ar
                ? "صور من أرشيف الشركة. تعكس العروض والتواريخ والأرقام الظاهرة فيها وقت نشرها، ولا تمثل بيانًا تشغيليًا حاليًا."
                : "From the company archive. Displays, dates and figures shown in these images reflect their original publication and are not current operational statements."}
            </p>
            <div className="marketing-gallery">
              {source.images
                .filter(
                  (x) =>
                    !x.includes("/brands/") &&
                    !x.includes("client") &&
                    !x.includes("logo"),
                )
                .map((src, i) => (
                  <Photo
                    key={src}
                    src={src}
                    alt={`${ar ? type!.ar : type!.en} ${i + 1}`}
                    sizes="50vw"
                  />
                ))}
            </div>
            <TextLink href={`/${locale}/marketing`}>
              {ar ? "كل الأنشطة" : "All marketing activities"}
            </TextLink>
          </>
        ) : (
          <div className="marketing-index">
            {marketingTypes.map((t) => {
              const a = archive.find((x) => x.id === t.id);
              const image =
                t.slug === "distribution-tools"
                  ? "/assets/company/headquarters.jpg"
                  : a?.images.find(
                      (x) => !x.includes("client") && !x.includes("/brands/"),
                    );
              return (
                <Link
                  prefetch={false}
                  href={`/${locale}/marketing/${t.slug}`}
                  key={t.slug}
                >
                  {image ? (
                    <Photo src={image} alt={ar ? t.ar : t.en} sizes="50vw" />
                  ) : (
                    <div className="marketing-typographic">
                      MBT<span>{ar ? "حضور في السوق" : "Market presence"}</span>
                    </div>
                  )}
                  <h2>
                    {ar ? t.ar : t.en}
                    <Arrow diagonal />
                  </h2>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
export function CareersPage({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  return (
    <>
      <PageIntro
        locale={locale}
        kicker={ar ? "الوظائف" : "Careers"}
        title={ar ? "كن جزءًا من الحكاية." : "People make the difference."}
        description={
          ar
            ? "تقوم العلاقات القوية على فرق عمل تؤمن بالاحترام والثقة والعمل الجماعي."
            : "Strong relationships begin with teams who value respect, trust and working together."
        }
      />
      <section className="wrap careers-layout">
        <Photo
          src={articles.find((a) => a.id === 36455)!.image}
          alt={
            ar
              ? "فريق MBT يستقبل وفدًا تجاريًا"
              : "MBT welcomes a trade delegation"
          }
          sizes="50vw"
        />
        <div>
          <h2>{ar ? "طريقك إلى MBT." : "Your path to MBT."}</h2>
          <p className="lead">
            {ar
              ? "استعرض مسار التقديم الرسمي لدى الشركة."
              : "Explore the company’s official application channel."}
          </p>
          <p>
            {ar
              ? "يربط الموقع الرسمي التوظيف ببوابة الموارد البشرية. للتأكد من الفرص الحالية أو للمساعدة في الوصول إلى البوابة، تواصل مع المقر الرئيسي."
              : "The official company website directs applications to its HR portal. For current opportunities or help accessing the portal, contact the head office."}
          </p>
          <a
            className="button dark"
            href={company.careers}
            target="_blank"
            rel="noreferrer"
          >
            {ar ? "افتح بوابة التوظيف" : "Open the careers portal"}
            <Arrow diagonal />
          </a>
          <p className="small-note">
            {ar
              ? "رابط خارجي إلى بوابة الموارد البشرية الحالية للشركة."
              : "External link to the company’s existing HR portal."}
          </p>
          <TextLink href={`/${locale}/contact`}>
            {ar ? "تواصل مع الشركة" : "Contact the company"}
          </TextLink>
        </div>
      </section>
    </>
  );
}
export function ContactPage({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  return (
    <>
      <PageIntro
        locale={locale}
        kicker={ar ? "تواصل معنا" : "Contact"}
        title={
          ar
            ? "الخطوة القادمة تبدأ بحوار."
            : "A conversation starts the next chapter."
        }
      />
      <section className="contact-layout wrap">
        <div className="contact-details">
          <span className="section-note">
            {ar ? "نتطلع لسماعك" : "We look forward to hearing from you."}
          </span>
          <a href={`mailto:${company.email}`} className="contact-email">
            {company.email}
          </a>
          <a
            href={`tel:${company.telephone}`}
            dir="ltr"
            className="contact-phone"
          >
            {company.phone}
          </a>
          <div>
            <h2>{ar ? "المقر الرئيسي" : "Head office"}</h2>
            <address>{pick(company.address, locale)}</address>
            <a
              href={company.maps}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              {ar ? "افتح موقع المقر" : "Get directions"}
              <Arrow diagonal />
            </a>
          </div>
          <div>
            <h3>{ar ? "ساعات العمل" : "Working hours"}</h3>
            <p>{pick(company.hours, locale)}</p>
            <p>{ar ? "الجمعة والسبت: مغلق" : "Friday & Saturday: closed"}</p>
          </div>
          <div>
            <h3>{ar ? "البريد والفاكس" : "Postal address & fax"}</h3>
            <p>
              {ar ? "ص.ب. 16129، جدة 21464" : "P.O. Box 16129, Jeddah 21464"}
            </p>
            <p dir="ltr">{company.fax}</p>
          </div>
          <TextLink href={`/${locale}/distribution`}>
            {ar ? "استكشف الفروع" : "Explore our branches"}
          </TextLink>
        </div>
        <Enquiry locale={locale} />
      </section>
      <div className="contact-hq wrap">
        <Photo
          src="/assets/company/headquarters.jpg"
          alt={ar ? "المقر الرئيسي في جدة" : "Jeddah headquarters"}
          sizes="90vw"
        />
        <span>
          {ar
            ? "جدة · المملكة العربية السعودية"
            : "Jeddah · Kingdom of Saudi Arabia"}
        </span>
      </div>
    </>
  );
}
export function ProfilePage({
  locale,
  edition,
}: {
  locale: Locale;
  edition?: string;
}) {
  const ar = locale === "ar";
  const key =
    edition === "promo-insight"
      ? "promo"
      : edition === "mbtech"
        ? "mbtech"
        : edition === "white-gate"
          ? "whitegate"
          : edition === "2018"
            ? "historic"
            : "recent";
  const profile = profiles[key];
  return (
    <>
      <PageIntro
        locale={locale}
        kicker={ar ? "الملف التعريفي" : "Company profile"}
        title={
          key === "promo"
            ? "Promo Insight"
            : key === "mbtech"
              ? "MBTech"
              : key === "whitegate"
                ? "White Gate"
                : ar
                  ? "حكاية الشركة. في صفحات."
                  : "The company, in its own words."
        }
        description={
          ar
            ? "نسخ محفوظة من ملفات الشركة الرسمية. تعرض هذه الوثائق المعلومات كما نُشرت في وقتها؛ قد تختلف بيانات التشغيل بين الإصدارات."
            : "Preserved editions of the official company profiles. These documents reflect their original publication; operational figures differ between editions."
        }
      />
      <section className="wrap detail-content">
        <div className="profile-editions">
          <Link prefetch={false} href={`/${locale}/profile`}>
            {ar ? "رفع مايو 2026" : "Uploaded May 2026"}
          </Link>
          <Link prefetch={false} href={`/${locale}/profile/2018`}>
            {ar ? "أرشيف 2018" : "2018 archive"}
          </Link>
          <Link prefetch={false} href={`/${locale}/profile/promo-insight`}>
            Promo Insight
          </Link>
          <Link prefetch={false} href={`/${locale}/profile/white-gate`}>
            White Gate
          </Link>
          <Link prefetch={false} href={`/${locale}/profile/mbtech`}>
            MBTech · 2017
          </Link>
        </div>
        <p className="small-note">{pick(profile.label, locale)}</p>
        <a
          className="text-link profile-download"
          href="/assets/history/c6a9377-company-profile-2017.pdf"
          download
        >
          {ar
            ? "تحميل الملف المؤرشف 2017 (PDF، 23.7 MB)"
            : "Download the 2017 archive (PDF, 23.7 MB)"}
          <span>↓</span>
        </a>
        <details className="document-downloads">
          <summary>
            {ar
              ? "جميع الوثائق المتاحة للتنزيل"
              : "All available document downloads"}
          </summary>
          <ul>
            {[
              [
                "3121b64-MBT-Profile-2026-v2.pdf",
                "Company profile · 2026 · 47 pages",
                "ملف الشركة · 2026 · 47 صفحة",
              ],
              [
                "6a47f8e-MBT-Profile-2025-v1.pdf",
                "Company profile · 2025 · 44 pages",
                "ملف الشركة · 2025 · 44 صفحة",
              ],
              [
                "7d574fb-MBT-Profile-v1-2025.pdf",
                "Company profile · 2025 · 46 pages",
                "ملف الشركة · 2025 · 46 صفحة",
              ],
              [
                "2f1d5cf-compnay-profile-2022-FINAL.pdf",
                "Company profile · 2022 · 47 pages",
                "ملف الشركة · 2022 · 47 صفحة",
              ],
              [
                "019232c-200.pdf",
                "Product catalogue · 2018 · 8 pages",
                "كتالوج المنتجات · 2018 · 8 صفحات",
              ],
              [
                "99ad21f-Al-Tijara-Magazine.pdf",
                "Al-Tijara magazine archive · 3 pages",
                "أرشيف مجلة التجارة · 3 صفحات",
              ],
            ].map(([file, en, arabic]) => (
              <li key={file}>
                <a href={`/assets/history/${file}`} download>
                  {ar ? arabic : en}
                  <span>PDF ↓</span>
                </a>
              </li>
            ))}
          </ul>
        </details>
        {profile.images.length ? (
          <ProfileViewer
            key={key}
            images={profile.images}
            locale={locale}
            label={pick(profile.label, locale)}
          />
        ) : (
          <div className="empty-results">
            <p>
              {ar
                ? "الملف مدرج في الموقع الأصلي، لكن صفحاته غير متاحة للاستخراج."
                : "The profile is listed on the original website, but its pages are not available for extraction."}
            </p>
            <SourceLink url={profile.source} locale={locale} />
          </div>
        )}
        <SourceLink url={profile.source} locale={locale} />
      </section>
    </>
  );
}
export function PrivacyPage({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  return (
    <>
      <PageIntro
        locale={locale}
        kicker={ar ? "الخصوصية" : "Privacy"}
        title={ar ? "خصوصيتك في هذه النسخة." : "Privacy on this website."}
      />
      <section className="wrap prose privacy-copy">
        <h2>{ar ? "استفساراتك" : "Your enquiries"}</h2>
        <p>
          {ar
            ? "يجهّز نموذج التواصل رسالة في تطبيق البريد الإلكتروني على جهازك. لا تُرسل بيانات النموذج إلى خادم الموقع، ولا تُحفظ فيه. يبقى إرسال الرسالة قرارًا تتخذه في تطبيق البريد."
            : "The contact form prepares a message in your own email application. Form details are not submitted to or stored on this website’s server. You choose whether to send the email in your email application."}
        </p>
        <h2>{ar ? "الخدمات الخارجية" : "External services"}</h2>
        <p>
          {ar
            ? "قد تنقلك روابط الخرائط وبوابة الموارد البشرية والمصادر إلى مواقع خارجية لها سياساتها الخاصة. هذه النسخة لا تستخدم أدوات تحليل أو ملفات تتبع إعلانية."
            : "Map links, the HR portal and source references lead to external websites with their own privacy practices. This implementation does not include analytics or advertising trackers."}
        </p>
        <h2>{ar ? "التواصل" : "Contact"}</h2>
        <a href={`mailto:${company.email}`}>{company.email}</a>
      </section>
    </>
  );
}
export const validMarketingSlugs = marketingTypes.map((t) => t.slug);
