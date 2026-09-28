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
      en: "Personal care brands featured in the company’s published portfolio.",
      ar: "علامات العناية الشخصية الواردة في محفظة الشركة المنشورة.",
    },
  },
  {
    slug: "pharma",
    number: "05",
    name: { en: "Pharma", ar: "القطاع الدوائي" },
    description: {
      en: "Healthcare partners and pharmaceutical business information from the company archive.",
      ar: "شركاء الرعاية الصحية ومعلومات النشاط الدوائي من أرشيف الشركة.",
    },
  },
  {
    slug: "tobacco",
    number: "06",
    name: { en: "Tobacco", ar: "التبغ" },
    description: {
      en: "Corporate information and historical portfolio records for the tobacco division.",
      ar: "معلومات مؤسسية وسجلات المحفظة المنشورة لقسم التبغ.",
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
      en: "Head office in Al Rawdah. A separate Jeddah branch is listed in Al Nakhil.",
      ar: "المقر الرئيسي في الروضة، وفرع جدة مدرج في حي النخيل.",
    },
  },
  {
    id: "riyadh",
    name: { en: "Riyadh", ar: "الرياض" },
    region: { en: "Central region", ar: "المنطقة الوسطى" },
    lat: 24.71,
    lon: 46.68,
    note: {
      en: "Sulai district branch, as listed in the company directory.",
      ar: "فرع حي السلي، بحسب دليل الشركة.",
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
      en: "Fahad Bin Sultan Street, as listed in the company directory.",
      ar: "شارع فهد بن سلطان، بحسب دليل الشركة.",
    },
  },
  {
    id: "qassim",
    name: { en: "Qassim", ar: "القصيم" },
    region: { en: "Central region", ar: "المنطقة الوسطى" },
    lat: 26.36,
    lon: 43.98,
    note: {
      en: "Buraydah / Al Jazira district listing in the company directory.",
      ar: "فرع بريدة / حي الجزيرة، بحسب دليل الشركة.",
    },
  },
  {
    id: "madinah",
    name: { en: "Madinah", ar: "المدينة المنورة" },
    region: { en: "Western region", ar: "المنطقة الغربية" },
    lat: 24.47,
    lon: 39.61,
    note: {
      en: "Madinah–Tabuk Road branch listing in the company directory.",
      ar: "فرع طريق المدينة وتبوك، بحسب دليل الشركة.",
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
      en: "Listed in the Arabic branch directory. Contact headquarters for current details.",
      ar: "مدرج في دليل الفروع العربي. تواصل مع المقر الرئيسي للتفاصيل الحالية.",
    },
  },
];
export const navigation = [
  { slug: "about", name: { en: "Our story", ar: "حكايتنا" } },
  { slug: "business", name: { en: "Our business", ar: "أعمالنا" } },
  { slug: "brands", name: { en: "Our brands", ar: "علاماتنا" } },
  { slug: "distribution", name: { en: "Our network", ar: "شبكتنا" } },
  { slug: "news", name: { en: "News & insights", ar: "الأخبار والفعاليات" } },
];
export const extraNavigation = [
  { slug: "products", name: { en: "Product catalogue", ar: "دليل المنتجات" } },
  { slug: "companies", name: { en: "Our companies", ar: "شركاتنا" } },
  {
    slug: "marketing",
    name: { en: "Marketing activities", ar: "الأنشطة التسويقية" },
  },
  { slug: "careers", name: { en: "Careers", ar: "الوظائف" } },
  { slug: "contact", name: { en: "Contact us", ar: "تواصل معنا" } },
  { slug: "profile", name: { en: "Company profile", ar: "الملف التعريفي" } },
];
