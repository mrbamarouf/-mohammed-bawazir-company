export const profile2026 = {
  year: "2026",
  sizeMB: "8.6",
  url: "https://www.mbtksa.com/wp-content/uploads/2026/06/MBT-Profile-2026-v2.pdf",
  local: "/assets/documents/MBT-Company-Profile-2026.pdf",
  images: Array.from(
    { length: 47 },
    (_, i) =>
      `/assets/documents/profile-2026/page-${String(i + 1).padStart(2, "0")}.webp`,
  ),
};
// These are dated, company-reported figures, not live operational counters.
export const operatingFacts = [
  {
    value: "16",
    page: 10,
    label: { en: "Warehouses", ar: "مستودعًا" },
    note: {
      en: "Storage across several cities",
      ar: "بنية تخزين في مدن متعددة",
    },
  },
  {
    value: "38,000",
    unit: { en: "m²", ar: "متر مربع" },
    page: 10,
    label: { en: "Warehouse space", ar: "مساحة التخزين" },
    note: {
      en: "Supporting our distribution network",
      ar: "مساحة تدعم شبكة التوزيع",
    },
  },
  {
    value: "144",
    page: 10,
    label: { en: "Fleet vehicles", ar: "مركبة في الأسطول" },
    note: {
      en: "Including 83 refrigerated vehicles",
      ar: "منها 83 مركبة مبردة",
    },
  },
  {
    value: "7,286",
    approximate: true,
    page: 5,
    label: { en: "Direct outlets", ar: "منفذ بيع مباشر" },
    note: {
      en: "Across multiple retail channels",
      ar: "عبر قنوات تجزئة متعددة",
    },
  },
];
