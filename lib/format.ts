export function dateLabel(date: string, locale: "en" | "ar") {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    calendar: "gregory",
    timeZone: "UTC",
  }).format(new Date(date + "T12:00:00Z"));
}
