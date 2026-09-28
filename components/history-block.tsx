import { MobileStory } from "./mobile-story";
import { BidiText } from "./bidi-text";
import type { Locale } from "@/lib/types";
import { Photo, TextLink } from "./ui";
export function HistoryBlock({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  return (
    <section className="history-feature chapter-legacy" id="legacy-preview" data-context="legacy">
      <MobileStory locale={locale} />
      <div className="wrap desktop-story">
        <div className="history-top">
          <span className="history-since">
            <BidiText text={ar ? "منذ" : "SINCE"} /> <b dir="ltr">1987</b>
          </span>
          <h2>
            <BidiText
              text={
                ar
                  ? "تاريخ من العمل.\nوعلاقات تستمر."
                  : "Built over decades.\nMade for what’s next."
              }
            />
          </h2>
        </div>
        <div className="history-grid">
          <figure>
            <Photo
              src="/assets/company/a63c325-office-group.jpg"
              alt={
                ar
                  ? "فريق شركة محمد باوزير للتجارة"
                  : "Mohammed Bawazir Trading Company team"
              }
              sizes="(max-width: 767px) 100vw, 50vw"
            />
            <figcaption>
              <BidiText
                text={
                  ar
                    ? "الأشخاص الذين صنعوا حكايتنا"
                    : "The people behind our business"
                }
              />
            </figcaption>
          </figure>
          <div className="history-story">
            <p>
              <BidiText
                text={
                  ar
                    ? "بدأت حكاية شركة محمد باوزير للتجارة في عام 1987. وعلى امتداد السنوات، اتسعت أعمالها من التجارة والتوزيع إلى بناء العلامات والخدمات التسويقية وقطاعات متخصصة."
                    : "Mohammed Bawazir Trading began in 1987. Over the years, its story expanded through trading, distribution, brand building, marketing services and specialist business sectors."
                }
              />
            </p>
            <div className="history-milestones">
              {[
                [
                  "1987",
                  ar
                    ? "تأسيس شركة محمد باوزير للتجارة"
                    : "Mohammed Bawazir Trading is established",
                ],
                [
                  "2005",
                  ar
                    ? "تأسيس وايت جيت للتوزيع الطبي"
                    : "White Gate established for medical distribution",
                ],
                [
                  "2009",
                  ar
                    ? "بداية مرئي للخدمات التسويقية"
                    : "Promo Insight’s marketing services begin",
                ],
                [
                  "2019 / 2024",
                  ar
                    ? "تكريم بريمادوتا للعلاقات التجارية"
                    : "Primaduta recognition for trade relationships",
                ],
              ].map(([year, title]) => (
                <div key={year}>
                  <b dir="ltr">{year}</b>
                  <span>{title}</span>
                </div>
              ))}
            </div>
            <TextLink href={`/${locale}/about`}>
              <BidiText
                text={ar ? "تعرّف على حكايتنا" : "Explore our history"}
              />
            </TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}
