import type { Product, Brand, Locale } from "@/lib/types";
import { catalogueResult } from "@/lib/catalogue";
import { CatalogueClient } from "./catalogue-client";
export function Catalogue({ products, brands, locale, initialBrand = "", initialDivision = "" }: {
  products: Product[]; brands: Brand[]; locale: Locale; initialBrand?: string; initialDivision?: string;
}) {
  const initialResult = catalogueResult(products, { q: "", division: initialDivision, brand: initialBrand, category: "", limit: 24 });
  return <CatalogueClient initialResult={initialResult} brands={brands} locale={locale} initialBrand={initialBrand} initialDivision={initialDivision} />;
}
