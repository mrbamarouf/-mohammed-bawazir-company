"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="wrap error-page">
      <h1>
        <bdi lang="en" dir="ltr">A connection interrupted.</bdi>
        <br />
        <bdi lang="ar" dir="rtl">تعذر تحميل الصفحة.</bdi>
      </h1>
      <p><bdi lang="en" dir="ltr">Please try again.</bdi>{" "}<bdi lang="ar" dir="rtl">يرجى المحاولة مجددًا.</bdi></p>
      <button className="button dark" onClick={reset}>
        <span dir="ltr"><bdi lang="en" dir="ltr">Try again</bdi> / <bdi lang="ar" dir="rtl">أعد المحاولة</bdi></span>
      </button>
    </section>
  );
}
