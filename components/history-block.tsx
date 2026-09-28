import type { Locale } from "@/lib/types";
import { Photo, TextLink } from "./ui";
export function HistoryBlock({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  return (
    <section className="history-feature" id="legacy-preview">
      <div className="wrap">
        <div className="history-top">
          <span className="history-since">
            {ar ? "منذ" : "SINCE"} <b>1987</b>
          </span>
          <h2>
            {ar
              ? "تاريخ من العمل.\nوعلاقات تستمر."
              : "Built over decades.\nMade for what’s next."}
          </h2>
        </div>
        <div className="history-grid">
          <figure>
            <Photo
              src="/assets/company/a63c325-office-group.jpg"
              alt={
                ar
                  ? "صورة فريق MBT من أرشيف الشركة"
                  : "MBT team photograph from the company archive"
              }
              sizes="50vw"
            />
            <figcaption>
              {ar
                ? "الأشخاص الذين صنعوا الحكاية — من أرشيف MBT"
                : "The people behind the business — from the MBT archive"}
            </figcaption>
          </figure>
          <div className="history-story">
            <p>
              {ar
                ? "بدأت حكاية شركة محمد باوزير للتجارة في عام 1987. وعلى امتداد السنوات، اتسعت أعمالها من التجارة والتوزيع إلى بناء العلامات والخدمات التسويقية وقطاعات متخصصة."
                : "Mohammed Bawazir Trading began in 1987. Over the years, its story expanded through trading, distribution, brand building, marketing services and specialist business sectors."}
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
                    ? "تأسيس وايت جيت، وفق ملف المجموعة"
                    : "White Gate established, as recorded in the group profile",
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
              {ar ? "تعرّف على حكايتنا" : "Explore our history"}
            </TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}
