import type { Locale } from "@/lib/types";
import { operatingFacts, profile2026 } from "@/lib/company-facts";
import { BidiText } from "./bidi-text";
import { Arrow } from "./ui";

export function CompanyScale({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  return (
    <section className="company-scale">
      <div className="wrap">
        <div className="scale-heading">
          <h2>
            {ar
              ? "البنية وراء الحضور."
              : "The infrastructure behind our reach."}
          </h2>
          <a href={profile2026.local} target="_blank" rel="noreferrer">
            <span>
              <BidiText
                text={
                  ar
                    ? "كما ورد في ملف الشركة، إصدار 2026"
                    : "Reported in the 2026 company profile"
                }
              />
            </span>
            <Arrow />
          </a>
        </div>
        <dl className="scale-facts">
          {operatingFacts.map((fact) => (
            <div key={fact.value}>
              <dt>{fact.label[locale]}</dt>
              <dd className="scale-value">
                {fact.approximate && <small>{ar ? "نحو" : "Approx."}</small>}
                <bdi dir="ltr">{fact.value}</bdi>
                {fact.unit && <span dir="ltr">{fact.unit[locale]}</span>}
              </dd>
              <dd className="scale-note">
                <BidiText text={fact.note[locale]} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
