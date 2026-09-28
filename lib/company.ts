import type { Branch, Localized } from "./types";
export const company = {
  name: {
    en: "Mohammed Bawazir Trading Company",
    ar: "شركة محمد باوزير للتجارة المحدودة",
  },
  phone: "+966 12 698 9999",
  telephone: "+966126989999",
  email: "info@mbtksa.com",
  fax: "+966 12 639 0033",
  established: 1987,
  address: {
    en: "Abdul Maqsud Khojah Street, Al Rawdah, Jeddah 23435, Saudi Arabia",
    ar: "شارع عبد المقصود خوجة، حي الروضة، جدة 23435، المملكة العربية السعودية",
  },
  hours: {
    en: "Sunday–Thursday, 8:00–18:00",
    ar: "الأحد إلى الخميس، 8:00–18:00",
  },
  maps: "https://www.google.com/maps/search/?api=1&query=Mohammed+Bawazir+Trading+Jeddah",
  careers: "http://hr.mbtksa.com/hr/CareerReq.aspx",
};
export const divisions: {
  slug: string;
  name: Localized;
  description: Localized;
  number: string;
}[] = [
  {
    slug: "food",
    number: "01",
    name: { en: "Food", ar: "الأغذية" },
    description: {
      en: "A portfolio spanning everyday essentials, cooking ingredients, snacks and confectionery.",
      ar: "محفظة متنوعة من الأغذية الأساسية ومكونات الطهي والوجبات الخفيفة والحلويات.",
    },
  },
  {
    slug: "beverages",
    number: "02",
    name: { en: "Beverages", ar: "المشروبات" },
    description: {
      en: "Beverage brands and instant drinks within the MBT portfolio.",
      ar: "علامات المشروبات والمشروبات سريعة التحضير ضمن محفظة MBT.",
    },
  },
  {
    slug: "household",
    number: "03",
    name: {
      en: "Household & consumables",
      ar: "المستلزمات المنزلية والاستهلاكية",
    },
    description: {
      en: "Household care and consumer products, supported by local distribution knowledge.",
      ar: "منتجات العناية بالمنزل والمستلزمات الاستهلاكية، تدعمها خبرتنا في التوزيع المحلي.",
    },
  },
  {
    slug: "personal-care",
    number: "04",
    name: { en: "Personal care", ar: "العناية الشخصية" },
    description: {
      en: "Personal care brands for everyday wellbeing.",
      ar: "علامات للعناية الشخصية واحتياجات الحياة اليومية.",
    },
  },
  {
    slug: "pharma",
    number: "05",
    name: { en: "Pharma", ar: "القطاع الدوائي" },
    description: {
      en: "Our relationships in healthcare and pharmaceutical distribution.",
      ar: "شراكاتنا في الرعاية الصحية وتوزيع المنتجات الدوائية.",
    },
  },
  {
    slug: "tobacco",
    number: "06",
    name: { en: "Tobacco", ar: "التبغ" },
    description: {
      en: "Business relationships within our tobacco division.",
      ar: "العلاقات التجارية ضمن قطاع التبغ.",
    },
  },
];
export const branches: Branch[] = [
  {
    id: "jeddah",
    name: { en: "Jeddah", ar: "جدة" },
    region: {
      en: "Headquarters · Western region",
      ar: "المقر الرئيسي · المنطقة الغربية",
    },
    lat: 21.54,
    lon: 39.17,
    note: {
      en: "Head office in Al Rawdah. Jeddah branch in Al Nakhil.",
      ar: "المقر الرئيسي في الروضة، وفرع جدة في حي النخيل.",
    },
  },
  {
    id: "riyadh",
    name: { en: "Riyadh", ar: "الرياض" },
    region: { en: "Central region", ar: "المنطقة الوسطى" },
    lat: 24.71,
    lon: 46.68,
    note: {
      en: "Sulai district.",
      ar: "حي السلي.",
    },
  },
  {
    id: "dammam",
    name: { en: "Dammam", ar: "الدمام" },
    region: { en: "Eastern region", ar: "المنطقة الشرقية" },
    lat: 26.43,
    lon: 50.1,
    note: {
      en: "Al Jalawiyah district, Omar Bin Abdul Aziz Street.",
      ar: "حي الجلوية، شارع عمر بن عبد العزيز.",
    },
  },
  {
    id: "tabuk",
    name: { en: "Tabuk", ar: "تبوك" },
    region: { en: "Northern region", ar: "المنطقة الشمالية" },
    lat: 28.38,
    lon: 36.56,
    note: {
      en: "Fahad Bin Sultan Street.",
      ar: "شارع فهد بن سلطان.",
    },
  },
  {
    id: "qassim",
    name: { en: "Qassim", ar: "القصيم" },
    region: { en: "Central region", ar: "المنطقة الوسطى" },
    lat: 26.36,
    lon: 43.98,
    note: {
      en: "Al Jazira district, Buraydah.",
      ar: "حي الجزيرة، بريدة.",
    },
  },
  {
    id: "madinah",
    name: { en: "Madinah", ar: "المدينة المنورة" },
    region: { en: "Western region", ar: "المنطقة الغربية" },
    lat: 24.47,
    lon: 39.61,
    note: {
      en: "Madinah–Tabuk Road.",
      ar: "طريق المدينة وتبوك.",
    },
  },
  {
    id: "khamis",
    name: { en: "Khamis Mushait", ar: "خميس مشيط" },
    region: { en: "Southern region", ar: "المنطقة الجنوبية" },
    lat: 18.3,
    lon: 42.73,
    note: {
      en: "New Industrial Road, King Saud Street.",
      ar: "طريق الصناعية الجديدة، شارع الملك سعود.",
    },
  },
  {
    id: "jizan",
    name: { en: "Jizan", ar: "جيزان" },
    region: { en: "Southern region", ar: "المنطقة الجنوبية" },
    lat: 16.89,
    lon: 42.55,
    note: {
      en: "Contact our head office for enquiries in Jizan.",
      ar: "للاستفسارات في جيزان، تواصل مع مقرنا الرئيسي.",
    },
  },
];
export const navigation = [
  { slug: "about", name: { en: "About MBT", ar: "عن الشركة" } },
  { slug: "business", name: { en: "Business", ar: "أعمالنا" } },
  { slug: "brands", name: { en: "Brands", ar: "علاماتنا" } },
  { slug: "products", name: { en: "Products", ar: "المنتجات" } },
  { slug: "distribution", name: { en: "Distribution", ar: "شبكتنا" } },
  { slug: "news", name: { en: "News", ar: "الأخبار والفعاليات" } },
];
export const extraNavigation = [
  { slug: "companies", name: { en: "Our companies", ar: "شركاتنا" } },
  {
    slug: "marketing",
    name: { en: "Marketing activities", ar: "الأنشطة التسويقية" },
  },
  { slug: "careers", name: { en: "Careers", ar: "الوظائف" } },
  { slug: "contact", name: { en: "Contact us", ar: "تواصل معنا" } },
  { slug: "profile", name: { en: "Company profile", ar: "الملف التعريفي" } },
];
