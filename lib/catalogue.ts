import categories from "@/content/categories.json";
import type { Product } from "./types";
export type CatalogueFilters = { q: string; division: string; brand: string; category: string; limit: number };
export function catalogueResult(products: Product[], filters: CatalogueFilters) {
  const normalize = (value: string) => value.normalize("NFKD").replace(/[\u064B-\u065F]/g, "").replace(/[أإآ]/g, "ا").toLowerCase();
  const seen = new Set<string>();
  const unique = products.filter(p => {
    if (!p.image) return true;
    const key = JSON.stringify([p.image, p.name, p.description, p.brand, p.language]);
    if (seen.has(key)) return false;
    seen.add(key); return true;
  });
  const available = products.filter(p => (!filters.division || p.division === filters.division) && (!filters.brand || p.brand === filters.brand));
  const filtered = unique.filter(p => (!filters.division || p.division === filters.division) && (!filters.brand || p.brand === filters.brand) && (!filters.category || p.categoryIds.includes(Number(filters.category))) && normalize(`${p.name} ${p.displayName || ""} ${p.categories.join(" ")} ${p.brand} ${p.description}`).includes(normalize(filters.q)));
  return { items: filtered.slice(0, filters.limit), total: filtered.length, categoryIds: categories.filter(c => available.some(p => p.categoryIds.includes(c.id))).map(c => c.id) };
}
export type CatalogueResult = ReturnType<typeof catalogueResult>;
