import type { MetadataRoute } from "next";
import { products, brands, articles } from "@/lib/data";
import { divisions } from "@/lib/company";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  if (!base) return [];
  const routes = [
    "",
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
    ...divisions.map((d) => "business/" + d.slug),
    ...["2018", "promo-insight", "white-gate", "mbtech"].map(
      (s) => "profile/" + s,
    ),
    ...[
      "in-store-food-display",
      "in-store-beverage-display",
      "in-store-consumables-display",
      "in-store-healthcare-display",
      "sales-man-with-handheld",
      "distribution-tools",
    ].map((s) => "marketing/" + s),
    ...products.map((p) => "products/" + p.slug),
    ...brands.map((b) => "brands/" + b.slug),
    ...articles.map((a) => "news/" + a.slug),
  ];
  return ["en", "ar"].flatMap((locale) =>
    routes.map((route) => ({
      url: `${base}/${locale}${route ? "/" + route : ""}`,
      alternates: {
        languages: {
          en: `${base}/en${route ? "/" + route : ""}`,
          ar: `${base}/ar${route ? "/" + route : ""}`,
        },
      },
    })),
  );
}
