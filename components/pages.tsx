import { BidiText } from "./bidi-text";
import { BrandLogo } from "./brand-logo";
import { CompanyScale } from "./company-scale";
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
  marketing,
  dateLabel,
} from "@/lib/data";
import { profile2026 } from "@/lib/company-facts";
import { PageIntro, Photo, TextLink, Arrow, EmptyImage } from "./ui";
import { MobileNetwork } from "./mobile-network";
import { Network } from "./network";
import { Catalogue } from "./catalogue";
import { Enquiry } from "./enquiry";
import { ProfileViewer } from "./profile-viewer";
import { SectorPanels } from "./sector-panels";
import { HistoryBlock } from "./history-block";
import { ValueChain } from "./value-chain";
import { NewsDirectory } from "./news-directory";
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
      <section className="about-overview wrap">
        <Photo
          src="/assets/company/headquarters.jpg"
          alt={
            ar
              ? "مقر شركة محمد باوزير للتجارة في جدة"
              : "MBT headquarters in Jeddah"
          }
          priority
          sizes="(max-width: 767px) 100vw, 55vw"
        />
        <div className="about-overview-copy">
          <strong>1987</strong>
          <h2>
            <BidiText
              text={
                ar
                  ? "خبرة لها جذور. وحضور يتجدد."
                  : "Established expertise. An evolving presence."
              }
            />
          </h2>
          <p>
            <BidiText
              text={
                ar
                  ? "من جدة، نربط العلامات بالأسواق عبر التجارة والتوزيع وبناء العلاقات."
                  : "From Jeddah, connecting brands with markets through trading, distribution and lasting commercial relationships."
              }
            />
          </p>
        </div>
      </section>
      <CompanyScale locale={locale} />
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
            <BidiText
              text={
                ar
                  ? "ننشط في توزيع المنتجات الاستهلاكية وبناء العلامات التجارية في الأسواق المحلية والدولية."
                  : "We work in consumer goods distribution and brand building in national and international markets."
              }
            />
          </p>
          <p>
            <BidiText
              text={
                ar
                  ? "من مقرنا الرئيسي في جدة، تمتد شبكتنا إلى مدن المملكة. ترتكز أعمالنا على معرفة الأسواق والعمل الجماعي والعلاقات طويلة الأجل مع الشركاء."
                  : "From our headquarters in Jeddah, our branch network extends to cities across the Kingdom. Local understanding, teamwork and enduring partner relationships are central to the business."
              }
            />
          </p>
          <TextLink href={`/${locale}/profile`}>
            <BidiText
              text={ar ? "اقرأ الملف التعريفي" : "Read the company profile"}
            />
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
      <HistoryBlock locale={locale} />
      <section id="legacy" className="history-section">
        <div className="wrap">
          <div className="section-heading">
            <h2>
              {ar ? (
                <>
                  علاقات دولية.
                  <br />
                  <em>وتقدير متجدد.</em>
                </>
              ) : (
                <>
                  International trade.
                  <br />
                  <em>Lasting recognition.</em>
                </>
              )}
            </h2>
            <p>
              <BidiText
                text={
                  ar
                    ? "محطات من مسيرتنا في التجارة والشراكات الدولية."
                    : "Milestones in our international trade relationships."
                }
              />
            </p>
          </div>
          <div className="recognition-layout">
            <Photo
              src={articles.find((a) => a.id === 36455)!.image}
              alt={
                ar
                  ? "زيارة الوفد التجاري الإندونيسي إلى MBT"
                  : "Indonesian trade delegation visiting MBT"
              }
              sizes="(max-width: 767px) 100vw, 45vw"
            />
            <div className="timeline">
              {[
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
                    ? "حصلنا على جائزة بريمادوتا الرئاسية لعام 2024 تقديرًا لشراكاتنا التجارية."
                    : "We received the Presidential Primaduta Award 2024 in recognition of our trading partnerships.",
                },
              ].map((x) => (
                <div key={x.year}>
                  <strong>
                    <bdi dir="ltr">{x.year}</bdi>
                  </strong>
                  <h3>{x.title}</h3>
                  <p>
                    <BidiText text={x.body} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="wrap founder-section">
        <div>
          <p className="section-note">
            <BidiText text={ar ? "في الذاكرة" : "In remembrance"} />
          </p>
          <h2>
            <BidiText
              text={
                ar
                  ? "الناس الذين أسسوا الحكاية."
                  : "The people who began the story."
              }
            />
          </h2>
          <p>
            <BidiText
              text={
                ar
                  ? "نعتز بإرث الراحلين فوزي باوزير ومحمد باوزير، وبأثرهما في تأسيس هويتنا وعلاقاتنا."
                  : "We honour the memory of Fawzi Bawazir and Mohammed Bawazir, whose legacy continues to shape our identity and relationships."
              }
            />
          </p>
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
              <Photo src={p.image} alt={p.name} sizes="(max-width: 767px) 100vw, 25vw" />
              <figcaption>{p.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section id="leadership" className="leadership wrap">
        <div className="section-heading">
          <h2>
            <BidiText
              text={ar ? "قيادة وعلاقات." : "Leadership & relationships."}
            />
          </h2>
          <p>
            <BidiText
              text={
                ar
                  ? "تجمع قيادتنا خبرات التجارة والمبيعات والتسويق والعمليات، لبناء علاقات مستدامة مع شركائنا."
                  : "Our leadership brings together trading, sales, marketing and operational expertise to build lasting partner relationships."
              }
            />
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
          <SectorPanels locale={locale} only={d.slug} />
          <div className="division-brand-list">
            {brands
              .filter((b) => b.division === d.slug)
              .map((b) => (
                <Link
                  prefetch={false}
                  key={b.slug}
                  href={`/${locale}/brands/${b.slug}`}
                >
                  {b.image && (
                    <Image src={b.image} width={85} height={48} alt="" />
                  )}
                  {pick(b.name, locale)}
                  <Arrow />
                </Link>
              ))}
          </div>
          {d.slug === "tobacco" ? (
            <div className="prose">
              <h2>
                <BidiText
                  text={ar ? "معلومات القطاع" : "Division information"}
                />
              </h2>
              <p>
                <BidiText
                  text={
                    ar
                      ? "للاستفسارات المتعلقة بقطاع التبغ وعلاقاته التجارية، يرجى التواصل مع فريق الشركة."
                      : "For corporate enquiries about our tobacco division and its business relationships, please contact our team."
                  }
                />
              </p>
            </div>
          ) : products.some((p) => p.division === d.slug) ? (
            <Catalogue
              products={products}
              brands={brands}
              locale={locale}
              initialDivision={d.slug}
            />
          ) : (
            <div className="brand-enquiries">
              <h2>
                {ar
                  ? "شراكات تخدم الرعاية الصحية."
                  : "Partnerships in healthcare."}
              </h2>
              <p>
                {ar
                  ? "تواصل مع فريقنا للاستفسار عن أعمال القطاع الدوائي وشراكات التوزيع."
                  : "Contact our team about our pharmaceutical business and distribution partnerships."}
              </p>
              <TextLink href={`/${locale}/contact`}>
                {ar ? "تواصل معنا" : "Contact us"}
              </TextLink>
            </div>
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
            ? "تضم محفظتنا تنوعًا في قطاعات الأغذية والمشروبات والمنتجات المنزلية والعناية الشخصية والرعاية الصحية."
            : "The MBT portfolio spans food, beverages, household products, personal care and healthcare, alongside its other business divisions."
        }
      />
      <section className="wrap business-directory">
        <SectorPanels locale={locale} />
      </section>
      <section className="wrap editorial-split">
        <h2>
          <BidiText
            text={ar ? "حضور يتجاوز التوزيع." : "Beyond distribution."}
          />
        </h2>
        <div>
          <p>
            <BidiText
              text={
                ar
                  ? "تقدّم مرئي للخدمات التسويقية، Promo Insight، خدمات تسويقية متكاملة ضمن مجموعة MBT."
                  : "Our group’s Promo Insight business provides integrated marketing services."
              }
            />
          </p>
          <TextLink href={`/${locale}/companies`}>
            <BidiText
              text={ar ? "تعرّف على شركاتنا" : "Explore our companies"}
            />
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
          {brand.division !== "tobacco" &&
          products.some((p) => p.brand === brand.slug) ? (
            <Catalogue
              locale={locale}
              brands={brands}
              products={products}
              initialBrand={brand.slug}
            />
          ) : (
            <div className="brand-enquiries">
              <h2>
                {ar
                  ? "لنتحدث عن احتياجات أعمالك."
                  : "Let’s discuss your business needs."}
              </h2>
              <p>
                {ar
                  ? "فريقنا جاهز للإجابة عن استفساراتك حول هذه العلامة ومنتجاتها."
                  : "Our team can help with enquiries about this brand and its products."}
              </p>
              <TextLink href={`/${locale}/contact`}>
                {ar ? "تواصل مع فريقنا" : "Contact our team"}
              </TextLink>
            </div>
          )}
          <TextLink href={`/${locale}/brands`} direction="back">
            <BidiText text={ar ? "جميع العلامات" : "Back to all brands"} />
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
            ? "استكشف علاماتنا وشراكاتنا عبر قطاعات الأغذية والمشروبات والمنتجات الاستهلاكية والرعاية الصحية."
            : "Explore our brands and partnerships across food, beverages, consumer products and healthcare."
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
      <section className="wrap product-detail" data-context="product-detail">
        <div className="breadcrumb">
          <Link prefetch={false} href={`/${locale}/products`}>
            <BidiText text={ar ? "دليل المنتجات" : "Product catalogue"} />
          </Link>
          <span>/</span>
          <span>
            <BidiText
              text={
                brand
                  ? pick(brand.name, locale)
                  : ar
                    ? "محفظة الشركة"
                    : "Company portfolio"
              }
            />
          </span>
        </div>
        <div className="product-detail-grid">
          <div className="product-detail-image">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 767px) 100vw, 50vw"
                preload
              />
            ) : (
              <EmptyImage
                logo={brand?.image}
                label={
                  brand ? pick(brand.name, locale) : pick(company.name, locale)
                }
              />
            )}
          </div>
          <div>
            <p className="section-note">
              <BidiText
                text={
                  brand
                    ? pick(brand.name, locale)
                    : ar
                      ? "محفظة الشركة"
                      : "Company portfolio"
                }
              />
            </p>
            <h1 dir={product.language === "ar" ? "rtl" : "ltr"}>
              <BidiText text={product.name} />
            </h1>
            {product.description && (
              <p
                className="lead"
                dir={product.language === "ar" ? "rtl" : "ltr"}
              >
                <BidiText text={product.description} />
              </p>
            )}
            <dl>
              <div>
                <dt>
                  <BidiText text={ar ? "القسم" : "Division"} />
                </dt>
                <dd>
                  {
                    divisions.find((d) => d.slug === product.division)?.name[
                      locale
                    ]
                  }
                </dd>
              </div>
              <div>
                <dt>
                  <BidiText text={ar ? "فئة المنتج" : "Product category"} />
                </dt>
                <dd className="category-trail">
                  <BidiText
                    text={
                      brand
                        ? pick(brand.name, locale)
                        : divisions.find((d) => d.slug === product.division)
                            ?.name[locale] || (ar ? "منتجاتنا" : "Our products")
                    }
                  />
                </dd>
              </div>
            </dl>
            <p className="small-note">
              <BidiText
                text={
                  ar
                    ? "للاستفسار عن التوافر وأحجام التعبئة، تواصل مع فريق المبيعات."
                    : "Contact our sales team for availability and pack sizes."
                }
              />
            </p>
            {product.division !== "tobacco" && (
              <TextLink href={`/${locale}/contact`}>
                <BidiText
                  text={ar ? "استفسر عن المنتج" : "Enquire about this product"}
                />
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
            ? "اكتشف منتجاتنا وابحث حسب الاسم أو العلامة أو فئة المنتج."
            : "Discover our products. Search by name, explore our business sectors or browse by brand and category."
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
            ? "من جدة إلى مدن المملكة، تقرّب شبكتنا المنتجات والعلامات من أسواقها."
            : "From Jeddah to cities across Saudi Arabia, our network connects brands with their markets."
        }
      />
      <div className="distribution-home">
        <MobileNetwork locale={locale} />
            <Network locale={locale} standalone />
        <ValueChain locale={locale} />
      </div>
      <section className="wrap editorial-split">
        <h2>
          <BidiText
            text={ar ? "من التوريد إلى الرف." : "From warehouse to shelf."}
          />
        </h2>
        <div>
          <p className="lead">
            <BidiText
              text={
                ar
                  ? "التخزين، والتوزيع، وفرق المبيعات، والعرض في المتاجر أجزاء مترابطة في قصة الوصول إلى الأسواق."
                  : "Warehousing, distribution, sales teams and in-store presence are connected parts of bringing products to market."
              }
            />
          </p>
          <p>
            <BidiText
              text={
                ar
                  ? "تجمع شبكتنا بين المستودعات ومركبات التوزيع وفرق المبيعات، لتخدم قنوات البيع المتنوعة في المملكة."
                  : "Our warehouses, delivery fleet and sales teams work together to serve retail channels across the Kingdom."
              }
            />
          </p>
          <TextLink href={`/${locale}/profile`}>
            <BidiText
              text={ar ? "استعرض الملف التعريفي" : "View the company profile"}
            />
          </TextLink>
        </div>
      </section>
      <section className="branch-directory wrap">
        <h2>
          <BidiText text={ar ? "دليل المدن" : "City directory"} />
        </h2>
        {branches.map((b) => (
          <div key={b.id}>
            <h3>{pick(b.name, locale)}</h3>
            <p>{pick(b.note, locale)}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.name.en + ", Saudi Arabia")}`}
              target="_blank"
              rel="noreferrer"
            >
              <BidiText text={ar ? "خريطة المدينة" : "City map"} />
              <Arrow />
            </a>
          </div>
        ))}
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
            ? "تتكامل خبرات مجموعتنا في التجارة والتوزيع والخدمات التسويقية والطبية والتقنية."
            : "Our group brings together experience in trading, distribution, marketing, medical supply and technology."
        }
      />
      <section className="wrap company-features">
        <article id="mbt">
          <Image
            src="/assets/clean/company/mbt.png"
            width={220}
            height={81}
            alt="MBT"
          />
          <div>
            <h2>{pick(company.name, locale)}</h2>
            <p>
              <BidiText
                text={
                  ar
                    ? "الشركة التجارية وأعمال التوزيع، انطلاقًا من المقر الرئيسي في جدة."
                    : "The trading and distribution business, headquartered in Jeddah."
                }
              />
            </p>
            <TextLink href={`/${locale}/profile`}>
              <BidiText text={ar ? "ملف الشركة" : "Company profile"} />
            </TextLink>
          </div>
        </article>
        <article id="promo-insight">
          {assets.promo && (
            <Image
              src="/assets/clean/company/promo.webp"
              width={220}
              height={140}
              alt="Promo Insight"
            />
          )}
          <div>
            <h2>
              <BidiText
                text={ar ? "مرئي للخدمات التسويقية" : "Promo Insight"}
              />
            </h2>
            <p>
              <BidiText
                text={
                  ar
                    ? "شركة خدمات تسويقية متكاملة ضمن مجموعة MBT في جدة، المملكة العربية السعودية."
                    : "Our integrated marketing services company in Jeddah, Saudi Arabia."
                }
              />
            </p>
            <TextLink href={`/${locale}/contact`}>
              <BidiText text={ar ? "تواصل مع فريقنا" : "Talk to our team"} />
            </TextLink>
          </div>
        </article>
        <article id="white-gate">
          {assets.whitegate && (
            <Image
              src="/assets/clean/company/whitegate.webp"
              width={220}
              height={140}
              alt="White Gate"
            />
          )}
          <div>
            <h2>
              <BidiText text={ar ? "وايت جيت" : "White Gate"} />
            </h2>
            <p>
              <BidiText
                text={
                  ar
                    ? "تأسست وايت جيت في عام 2005 لتوزيع الأجهزة الطبية وتجهيزات المستشفيات، ضمن مسيرتنا في قطاع الرعاية الصحية."
                    : "We established White Gate in 2005 for medical device and hospital equipment distribution, extending our experience in healthcare."
                }
              />
            </p>
            <TextLink href={`/${locale}/contact`}>
              <BidiText text={ar ? "تواصل مع فريقنا" : "Talk to our team"} />
            </TextLink>
          </div>
        </article>
        <article id="mbtech">
          <Image
            src="/assets/clean/company/mbtech.webp"
            width={220}
            height={110}
            alt="MBTech"
          />
          <div>
            <h2>
              <BidiText text={ar ? "محمد باوزير لتقنية المعلومات" : "MBTech"} />
            </h2>
            <p>
              <BidiText
                text={
                  ar
                    ? "امتدت خبرات مجموعتنا إلى حلول تقنية المعلومات وتكامل الأنظمة وربط الفروع من خلال MBTech."
                    : "Through MBTech, our group developed expertise in IT solutions, systems integration and branch connectivity."
                }
              />
            </p>
            <TextLink href={`/${locale}/contact`}>
              <BidiText text={ar ? "تواصل مع فريقنا" : "Talk to our team"} />
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
              <BidiText text={ar ? "الأخبار والفعاليات" : "News & insights"} />
            </Link>
            <span>/</span>
            <time dateTime={article.date} dir={ar ? "rtl" : "ltr"}>
              {dateLabel(article.date, locale)}
            </time>
          </div>
          <h1>
            <BidiText text={pick(article.title, locale)} />
          </h1>
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
            <span>
              <BidiText text={ar ? "تاريخ النشر" : "Published"} />
            </span>
            <time dateTime={article.date} dir={ar ? "rtl" : "ltr"}>
              {dateLabel(article.date, locale)}
            </time>
          </div>
          <div>
            {article.body[locale] ? (
              <p className="lead">
                <BidiText text={article.body[locale]} />
              </p>
            ) : article.body.en ? (
              <>
                <p lang="en" dir="ltr" className="lead">
                  {article.body.en}
                </p>
              </>
            ) : (
              <p className="lead">
                <BidiText
                  text={
                    ar
                      ? "لحظات من مشاركتنا في هذه الفعالية."
                      : "Highlights from our participation in this event."
                  }
                />
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
                    sizes="(max-width: 767px) 100vw, 50vw"
                  />
                ))}
            </div>
            {article.gallery.length > 13 && (
              <details>
                <summary>
                  <BidiText
                    text={
                      ar ? "عرض بقية صور الحدث" : "Show more event photographs"
                    }
                  />
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
                        sizes="(max-width: 767px) 100vw, 50vw"
                      />
                    ))}
                </div>
              </details>
            )}
            <TextLink href={`/${locale}/news`} direction="back">
              <BidiText
                text={ar ? "العودة إلى الأخبار" : "Back to news & insights"}
              />
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
            ? "آخر أخبارنا وشراكاتنا وفعالياتنا ومبادراتنا المجتمعية."
            : "News from our business, partnerships, events and community initiatives."
        }
      />
      <section className="wrap news-list">
        <NewsDirectory locale={locale} articles={articles} dates={Object.fromEntries(articles.map(article => [article.id, dateLabel(article.date, locale)]))} />
      </section>
    </>
  );
}
const marketingTypes = [
  {
    slug: "in-store-tobacco-display",
    en: "Tobacco division",
    ar: "قطاع التبغ",
    id: 26133,
  },
  {
    slug: "coverage-by-outlets",
    en: "Retail outlet coverage",
    ar: "التغطية حسب منافذ البيع",
    id: 26127,
  },
  {
    slug: "sales-work-structure",
    en: "Sales structure",
    ar: "هيكل المبيعات",
    id: 24930,
  },
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
  const gallery = type ? marketing.find((a) => a.id === type.id) : undefined;
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
            ? "حضورنا في الأسواق، من عرض المنتجات في المتاجر إلى فرق المبيعات والفعاليات."
            : "Our work in the market, from in-store displays to sales teams and events."
        }
      />
      <section className="wrap detail-content">
        {slug === "coverage-by-outlets" ? (
          <>
            <CompanyScale locale={locale} />
            <MobileNetwork locale={locale} />
            <Network locale={locale} standalone />
          </>
        ) : slug === "sales-work-structure" || slug === "distribution-tools" ? (
          <>
            <div className="operations-intro">
              <h2>
                {slug === "distribution-tools"
                  ? ar ? "موارد تدعم حضورنا." : "Resources behind our reach."
                  : ar ? "فرق قريبة من السوق." : "Teams close to the market."}
              </h2>
              <p>
                {slug === "distribution-tools"
                  ? ar ? "تدعم مستودعاتنا وأسطول مركباتنا انتقال المنتجات إلى منافذ البيع، بالتنسيق مع فرق المبيعات والتوزيع."
                    : "Our warehouses and vehicle fleet support product delivery to retail outlets, in coordination with our sales and distribution teams."
                  : ar ? "تعمل فرقنا مع المتاجر والجملة والصيدليات، وتتابع الطلبات وعرض المنتجات لتقريب علاماتنا من عملائها."
                    : "Our teams work with stores, wholesalers and pharmacies, supporting orders and product displays to bring our brands closer to customers."}
              </p>
              <TextLink href={`/${locale}/distribution`}>
                {ar
                  ? "استكشف شبكة التوزيع"
                  : "Explore our distribution network"}
              </TextLink>
            </div>
            {slug === "distribution-tools" ? (
              <CompanyScale locale={locale} />
            ) : (
              <>
                <div className="marketing-gallery sales-gallery">
                  {(marketing.find((a) => a.id === 11450)?.images || []).slice(0, 2).map((src, i) => (
                    <Photo key={src} src={src} alt={`${ar ? "فريق المبيعات" : "Our sales team"} ${i + 1}`} sizes="(max-width: 767px) 100vw, 50vw" />
                  ))}
                </div>
                <TextLink href={`/${locale}/marketing/sales-man-with-handheld`}>
                  {ar ? "فرقنا في الميدان" : "Our teams in the field"}
                </TextLink>
              </>
            )}
            <TextLink href={`/${locale}/marketing`} direction="back">
              {ar ? "كل الأنشطة" : "All marketing activities"}
            </TextLink>
          </>
        ) : gallery ? (
          <>
            <div className={`marketing-gallery${slug === "sales-man-with-handheld" ? " sales-gallery" : ""}`}>
              {gallery.images
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
                    sizes="(max-width: 767px) 100vw, 50vw"
                  />
                ))}
            </div>
            <TextLink href={`/${locale}/marketing`} direction="back">
              <BidiText text={ar ? "كل الأنشطة" : "All marketing activities"} />
            </TextLink>
          </>
        ) : (
          <div className="marketing-index">
            {marketingTypes.map((t) => {
              const a = marketing.find((x) => x.id === t.id);
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
                    <Photo src={image} alt={ar ? t.ar : t.en} sizes="(max-width: 767px) 100vw, 50vw" />
                  ) : (
                    <div className="marketing-typographic">
                      <BrandLogo tone="dark" />
                      <span>
                        <BidiText
                          text={ar ? "حضور في السوق" : "Market presence"}
                        />
                      </span>
                    </div>
                  )}
                  <h2>
                    {ar ? t.ar : t.en}
                    <Arrow />
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
          sizes="(max-width: 767px) 100vw, 50vw"
        />
        <div>
          <h2>
            <BidiText text={ar ? "طريقك إلى MBT." : "Your path to MBT."} />
          </h2>
          <p className="lead">
            <BidiText
              text={
                ar
                  ? "نتطلع للتعرّف على أصحاب الخبرة والطموح."
                  : "We welcome people with experience, ambition and a commitment to teamwork."
              }
            />
          </p>
          <p>
            <BidiText
              text={
                ar
                  ? "للاستفسار عن الفرص الوظيفية والتقديم، راسل فريقنا مع نبذة عن خبراتك والمجال الذي ترغب في العمل به."
                  : "For career enquiries, email our team with an introduction to your experience and the area you would like to work in."
              }
            />
          </p>
          <a
            className="button dark"
            href={`mailto:${company.email}?subject=Careers%20enquiry`}
            target="_blank"
            rel="noreferrer"
          >
            <BidiText
              text={ar ? "راسلنا بشأن الوظائف" : "Email a careers enquiry"}
            />
            <Arrow />
          </a>
          <p className="small-note">
            <BidiText
              text={
                ar ? "نتطلع لسماعك." : "We look forward to hearing from you."
              }
            />
          </p>
          <TextLink href={`/${locale}/contact`}>
            <BidiText text={ar ? "تواصل مع الشركة" : "Contact the company"} />
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
            <BidiText
              text={
                ar ? "نتطلع لسماعك" : "We look forward to hearing from you."
              }
            />
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
            <h2>
              <BidiText text={ar ? "المقر الرئيسي" : "Head office"} />
            </h2>
            <address>
              <BidiText text={pick(company.address, locale)} />
            </address>
            <a
              href={company.maps}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              <BidiText text={ar ? "افتح موقع المقر" : "Get directions"} />
              <Arrow />
            </a>
          </div>
          <div>
            <h3>
              <BidiText text={ar ? "ساعات العمل" : "Working hours"} />
            </h3>
            <p>
              <BidiText text={pick(company.hours, locale)} />
            </p>
            <p>
              <BidiText
                text={ar ? "الجمعة والسبت: مغلق" : "Friday & Saturday: closed"}
              />
            </p>
          </div>
          <div>
            <h3>
              <BidiText text={ar ? "البريد والفاكس" : "Postal address & fax"} />
            </h3>
            <p>
              <BidiText
                text={
                  ar ? "ص.ب. 16129، جدة 21464" : "P.O. Box 16129, Jeddah 21464"
                }
              />
            </p>
            <p dir="ltr">{company.fax}</p>
          </div>
          <TextLink href={`/${locale}/distribution`}>
            <BidiText text={ar ? "استكشف الفروع" : "Explore our branches"} />
          </TextLink>
        </div>
        <Enquiry locale={locale} />
      </section>
      <div className="contact-hq wrap">
        <Photo
          src="/assets/company/headquarters.jpg"
          alt={ar ? "المقر الرئيسي في جدة" : "Jeddah headquarters"}
          sizes="(max-width: 767px) 100vw, 90vw"
        />
        <span>
          <BidiText
            text={
              ar
                ? "جدة · المملكة العربية السعودية"
                : "Jeddah · Kingdom of Saudi Arabia"
            }
          />
        </span>
      </div>
    </>
  );
}
export function ProfilePage({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  return (
    <>
      <PageIntro
        locale={locale}
        kicker={ar ? "عن الشركة" : "About MBT"}
        title={ar ? "الملف التعريفي للشركة" : "Company Profile"}
        description={
          ar
            ? "تعرّف على مسيرتنا وعلاماتنا وقطاعات أعمالنا، وعلى شبكة التوزيع التي تربطنا بأسواق المملكة."
            : "Discover our story, brands and business sectors, and the distribution network connecting us to Saudi markets."
        }
      />
      <section className="corporate-document wrap">
        <div className="document-overview">
          <div>
            <BrandLogo tone="dark" />
            <p className="document-year">
              <BidiText
                text={ar ? "ملف الشركة · 2026" : "Company profile · 2026"}
              />
            </p>
            <h2>
              {ar
                ? "أعمالنا. علاقاتنا. حضورنا."
                : "Our business. Our partnerships. Our reach."}
            </h2>
            <p>
              {ar
                ? "نظرة شاملة على شركة محمد باوزير للتجارة، منذ انطلاقتنا في جدة وحتى حضورنا عبر قطاعات وأسواق متعددة."
                : "An introduction to Mohammed Bawazir Trading Company, from our beginnings in Jeddah to our presence across sectors and markets."}
            </p>
            <a
              className="button document-download"
              href={profile2026.local}
              download="MBT-Company-Profile-2026.pdf"
            >
              <span>
                {ar ? "تحميل الملف التعريفي" : "Download company profile"}
              </span>
              <Arrow direction="down" />
            </a>
            <p className="document-format">
              <bdi dir="ltr">PDF · {profile2026.sizeMB} MB</bdi>
              <span>
                <BidiText text={ar ? "47 صفحة" : "47 pages"} />
              </span>
            </p>
          </div>
          <a
            className="document-cover"
            href="#profile-reader"
            aria-label={
              ar ? "تصفّح الملف التعريفي" : "Read the company profile"
            }
          >
            <Image
              src={profile2026.images[0]}
              alt={
                ar
                  ? "غلاف الملف التعريفي لشركة محمد باوزير للتجارة 2026"
                  : "Mohammed Bawazir Trading Company profile 2026 cover"
              }
              width={1700}
              height={957}
              sizes="(max-width: 767px) 100vw, 50vw"
              priority
            />
            <span>
              {ar ? "تصفّح الملف" : "Read the profile"}
              <Arrow />
            </span>
          </a>
        </div>
        <div id="profile-reader" className="document-reader">
          <div className="section-heading">
            <h2>{ar ? "اكتشف الشركة في صفحات." : "Explore the company."}</h2>
            <TextLink href={`/${locale}/contact`}>
              {ar ? "تواصل مع فريقنا" : "Speak to our team"}
            </TextLink>
          </div>
          <ProfileViewer
            images={profile2026.images}
            locale={locale}
            label={ar ? "الملف التعريفي للشركة 2026" : "Company Profile 2026"}
          />
        </div>
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
        title={ar ? "خصوصيتك تهمنا." : "Privacy on this website."}
      />
      <section className="wrap prose privacy-copy">
        <h2>
          <BidiText text={ar ? "استفساراتك" : "Your enquiries"} />
        </h2>
        <p>
          <BidiText
            text={
              ar
                ? "يجهّز نموذج التواصل رسالة في تطبيق البريد الإلكتروني على جهازك. لا تُرسل بيانات النموذج إلى خادم الموقع، ولا تُحفظ فيه. يبقى إرسال الرسالة قرارًا تتخذه في تطبيق البريد."
                : "The contact form prepares a message in your own email application. Form details are not submitted to or stored on this website’s server. You choose whether to send the email in your email application."
            }
          />
        </p>
        <h2>
          <BidiText text={ar ? "الخدمات الخارجية" : "External services"} />
        </h2>
        <p>
          <BidiText
            text={
              ar
                ? "تخضع خدمات الخرائط الخارجية لسياسات الخصوصية الخاصة بها. لا نستخدم ملفات تتبع إعلانية على هذا الموقع."
                : "External map services have their own privacy policies. We do not use advertising trackers on this website."
            }
          />
        </p>
        <h2>
          <BidiText text={ar ? "التواصل" : "Contact"} />
        </h2>
        <a href={`mailto:${company.email}`}>{company.email}</a>
      </section>
    </>
  );
}
export const validMarketingSlugs = marketingTypes.map((t) => t.slug);
