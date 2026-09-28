export type Locale = "en" | "ar";
export type Localized = { en: string; ar: string };
export type Product = {
  id: number;
  slug: string;
  name: string;
  description: string;
  image: string;
  categoryIds: number[];
  categories: string[];
  division: string;
  brand: string;
  source: string;
  language: Locale;
};
export type Article = {
  id: number;
  slug: string;
  title: Localized;
  date: string;
  body: Localized;
  image: string;
  gallery: string[];
  source: string;
};
export type Brand = {
  slug: string;
  name: Localized;
  division: string;
  image: string;
  source: string;
  description: Localized;
  categoryIds: number[];
};
export type Branch = {
  id: string;
  name: Localized;
  region: Localized;
  lat: number;
  lon: number;
  note: Localized;
};
export const pick = (text: Localized, locale: Locale) => text[locale];
