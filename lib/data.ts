import { productPresentation } from "./product-copy";
import productsJson from "@/content/products.json";
import brandsJson from "@/content/brands.json";
import articlesJson from "@/content/articles.json";
import marketingJson from "@/content/marketing.json";
import assetsJson from "@/content/assets.json";
import type { Product, Brand, Article } from "./types";
export const products = productsJson.map(({ source, ...product }) => {
  void source;
  return { ...product, ...productPresentation(product as Product), ...(product.id === 5173 ? {brand:"bull-dose",division:"beverages"} : {}) };
}) as Product[];
export const brands = brandsJson.map(({ source, ...brand }) => {
  void source;
  return brand;
}) as Brand[];
export const articles = articlesJson.map(({ source, ...article }) => {
  void source;
  return article;
}) as Article[];
export const marketing = marketingJson;
export const assets = assetsJson as Record<string, string>;
export { dateLabel } from "./format";
