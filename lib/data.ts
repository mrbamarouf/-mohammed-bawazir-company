import productsJson from "@/content/products.json";
import brandsJson from "@/content/brands.json";
import articlesJson from "@/content/articles.json";
import archiveJson from "@/content/archive.json";
import assetsJson from "@/content/assets.json";
import type { Product, Brand, Article } from "./types";
export const products = productsJson as Product[];
export const brands = brandsJson as Brand[];
export const articles = articlesJson as Article[];
export const archive = archiveJson;
export const assets = assetsJson as Record<string, string>;
export function dateLabel(date: string, locale: "en" | "ar") {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    calendar: "gregory",
    timeZone: "UTC",
  }).format(new Date(date + "T12:00:00Z"));
}
