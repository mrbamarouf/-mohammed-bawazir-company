import { MobileIcon } from "./mobile-icons";
import type { Locale } from "@/lib/types";
import { operatingFacts } from "@/lib/company-facts";
import { BidiText } from "./bidi-text";
import { Arrow } from "./ui";

export function CompanyScale({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  return (
    <section className="company-scale" id="company-scale" data-context="scale">
      <div className="wrap">
        <div className="scale-heading">
          <h2>
            {ar
              ? "البنية وراء الحضور."
              : "The infrastructure behind our reach."}
          </h2>
          <a href={`/${locale}/profile`}>
            <span>
              <BidiText
                text={
                  ar
                    ? "شركتنا بالأرقام · 2026"
                    : "Our company in numbers · 2026"
                }
              />
            </span>
            <Arrow />
          </a>
        </div>
        <dl className="scale-facts">
          {operatingFacts.map((fact, index) => (
            <div key={fact.value}>
              <MobileIcon name={["warehouse", "space", "fleet", "outlets"][index]} />
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
