import { siteUrl } from "@/lib/site-url";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { Home } from "@/components/home";
import {
  AboutPage,
  BusinessPage,
  BrandsPage,
  ProductsPage,
  DistributionPage,
  CompaniesPage,
  NewsPage,
  MarketingPage,
  CareersPage,
  ContactPage,
  ProfilePage,
  PrivacyPage,
  validMarketingSlugs,
} from "@/components/pages";
import { products, brands, articles } from "@/lib/data";
import { company, divisions, navigation, extraNavigation } from "@/lib/company";
import { pick, type Locale } from "@/lib/types";
type Params = { locale: Locale; slug?: string[] };
export function generateStaticParams() {
  const routes = [
    [],
    ...[
      "about",
      "business",
      "brands",
      "products",
      "distribution",
      "companies",
      "news",
      "marketing",
      "careers",
      "contact",
      "profile",
      "privacy",
    ].map((x) => [x]),
    ...divisions.map((d) => ["business", d.slug]),
    ...brands.map((b) => ["brands", b.slug]),
    ...products.map((p) => ["products", p.slug]),
    ...articles.map((a) => ["news", a.slug]),
    ...validMarketingSlugs.map((s) => ["marketing", s]),
    ...["2018", "promo-insight", "white-gate", "mbtech"].map((s) => [
      "profile",
      s,
    ]),
  ];
  return routes.map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug = [] } = await params;
  const [section, detail] = slug;
  let title =
    [...navigation, ...extraNavigation].find((n) => n.slug === section)?.name[
      locale
    ] ||
    (locale === "ar"
      ? "شركة محمد باوزير للتجارة"
      : "Mohammed Bawazir Trading Company");
  if (section === "products" && detail)
    title = products.find((p) => p.slug === detail)?.displayName || title;
  if (section === "brands" && detail)
    title = brands.find((b) => b.slug === detail)?.name[locale] || title;
  if (section === "news" && detail)
    title = articles.find((a) => a.slug === detail)?.title[locale] || title;
  if (section === "business" && detail)
    title = divisions.find((d) => d.slug === detail)?.name[locale] || title;
  if (section === "privacy")
    title = locale === "ar" ? "سياسة الخصوصية" : "Privacy policy";
  const path = slug.length ? "/" + slug.join("/") : "";
  return {
    title,
    description:
      locale === "ar"
        ? `${title}. تعرّف على شركة محمد باوزير للتجارة، منذ 1987.`
        : `${title}. Discover MBT, connecting brands and Saudi markets since 1987.`,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: { en: `/en${path}`, ar: `/ar${path}` },
    },
    openGraph: {
      title,
      locale: locale === "ar" ? "ar_SA" : "en_GB",
      type: "website",
      siteName: "MBT",
      images: [
        {
          url: "/assets/company/headquarters.jpg",
          width: 1920,
          height: 905,
          alt: "Mohammed Bawazir Trading headquarters",
        },
      ],
    },
  };
}
export default async function Page({ params }: { params: Promise<Params> }) {
  const { locale, slug = [] } = await params;
  const [section, detail] = slug;
  if (!["en", "ar"].includes(locale) || slug.length > 2) notFound();
  if (!section)
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: pick(company.name, locale),
              foundingDate: "1987",
              email: company.email,
              telephone: company.telephone,
              address: {
                "@type": "PostalAddress",
                streetAddress: "Abdul Maqsud Khojah Street, Al Rawdah",
                addressLocality: "Jeddah",
                postalCode: "23435",
                addressCountry: "SA",
              },
              url: siteUrl,
            }),
          }}
        />
        <Home locale={locale} />
      </>
    );
  if (detail) {
    if (section === "products") {
      const product = products.find((x) => x.slug === detail);
      if (!product) notFound();
      return <ProductsPage locale={locale} product={product} />;
    }
    if (section === "brands") {
      const brand = brands.find((x) => x.slug === detail);
      if (!brand) notFound();
      return <BrandsPage locale={locale} brand={brand} />;
    }
    if (section === "news") {
      const article = articles.find((x) => x.slug === detail);
      if (!article) notFound();
      return <NewsPage locale={locale} article={article} />;
    }
    if (section === "business" && divisions.some((x) => x.slug === detail))
      return <BusinessPage locale={locale} division={detail} />;
    if (section === "marketing" && validMarketingSlugs.includes(detail))
      return <MarketingPage locale={locale} slug={detail} />;
    if (
      section === "profile" &&
      ["2018", "promo-insight", "white-gate", "mbtech"].includes(detail)
    )
      permanentRedirect(
        detail === "2018"
          ? `/${locale}/profile`
          : `/${locale}/companies#${detail}`,
      );
    notFound();
  }
  switch (section) {
    case "about":
      return <AboutPage locale={locale} />;
    case "business":
      return <BusinessPage locale={locale} />;
    case "brands":
      return <BrandsPage locale={locale} />;
    case "products":
      return <ProductsPage locale={locale} />;
    case "distribution":
      return <DistributionPage locale={locale} />;
    case "companies":
      return <CompaniesPage locale={locale} />;
    case "news":
      return <NewsPage locale={locale} />;
    case "marketing":
      return <MarketingPage locale={locale} />;
    case "careers":
      return <CareersPage locale={locale} />;
    case "contact":
      return <ContactPage locale={locale} />;
    case "profile":
      return <ProfilePage locale={locale} />;
    case "privacy":
      return <PrivacyPage locale={locale} />;
    default:
      notFound();
  }
}
