import type { Locale } from "@/lib/types";
import { profile2026 } from "@/lib/company-facts";
import { BrandLogo } from "./brand-logo";
import { BidiText } from "./bidi-text";

export function ValueChain({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  const stages = [
    {
      title: ar ? "العلامات العالمية" : "Global brands",
      value: "12",
      unit: ar ? "شريك أعمال" : "business partners",
      note: ar
        ? "علاقات تربط الأسواق الدولية بالمملكة"
        : "International relationships, local market knowledge",
      page: 5,
    },
    {
      title: ar ? "شركة محمد باوزير" : "Mohammed Bawazir",
      value: "1987",
      unit: ar ? "عام التأسيس" : "established",
      note: ar
        ? "خبرة في بناء العلامات والتجارة"
        : "Brand building and trading expertise",
      page: 4,
    },
    {
      title: ar ? "التخزين" : "Warehousing",
      value: "16",
      unit: ar ? "مستودعًا" : "warehouses",
      note: ar
        ? "38,000 متر مربع من مساحة التخزين"
        : "38,000 m² of warehouse space",
      page: 10,
    },
    {
      title: ar ? "التوزيع" : "Distribution",
      value: "144",
      unit: ar ? "مركبة في الأسطول" : "fleet vehicles",
      note: ar ? "منها 83 مركبة مبردة" : "Including 83 refrigerated vehicles",
      page: 10,
    },
    {
      title: ar ? "التجزئة" : "Retail",
      value: "7,286",
      unit: ar ? "منفذ مباشر تقريبًا" : "direct outlets, approximately",
      note: ar
        ? "المتاجر، والجملة، والصيدليات، وقنوات أخرى"
        : "Stores, wholesale, pharmacies and other channels",
      page: 5,
    },
    {
      title: ar ? "الناس" : "People",
      value: ar ? "كل يوم" : "Every day",
      unit: ar ? "منتجات للحياة اليومية" : "products for everyday life",
      note: ar
        ? "العلامات أقرب إلى الناس في أسواق المملكة"
        : "Bringing brands closer to people in Saudi markets",
    },
  ];
  return (
    <section
      className="value-chain value-chain-expanded wrap"
      aria-labelledby="chain-heading"
    >
      <div className="chain-heading">
        <h2 id="chain-heading">
          {ar
            ? "من العلامة، إلى الحياة اليومية."
            : "From brand to everyday life."}
        </h2>
        <p>
          <BidiText
            text={
              ar
                ? "الأرقام التشغيلية بحسب ملف الشركة، إصدار 2026."
                : "Operational figures reported in the 2026 company profile."
            }
          />
        </p>
      </div>
      <ol>
        {stages.map((stage, i) => (
          <li key={stage.title}>
            <div className="chain-node">
              {i === 1 ? (
                <BrandLogo markOnly />
              ) : (
                <span className="chain-step" aria-hidden="true">
                  <bdi dir="ltr">{String(i + 1).padStart(2, "0")}</bdi>
                </span>
              )}
            </div>
            <h3>{stage.title}</h3>
            <strong className="chain-value">
              <bdi dir={i === 5 ? "auto" : "ltr"}>{stage.value}</bdi>
            </strong>
            <span className="chain-unit">{stage.unit}</span>
            <p>
              <BidiText text={stage.note} />
            </p>
            {stage.page && (
              <a
                href={`${profile2026.local}#page=${stage.page}`}
                target="_blank"
                rel="noreferrer"
                className="chain-source"
              >
                <BidiText
                  text={
                    ar
                      ? `ملف 2026، ص ${stage.page}`
                      : `2026 profile, p. ${stage.page}`
                  }
                />
              </a>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
