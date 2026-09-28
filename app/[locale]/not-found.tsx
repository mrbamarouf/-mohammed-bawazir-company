import Link from "next/link";
export default function NotFound() {
  return (
    <section className="wrap error-page">
      <p>404</p>
      <h1>
        Let’s find your way.
        <br />
        لنجد وجهتك.
      </h1>
      <p>The page could not be found. الصفحة المطلوبة غير موجودة.</p>
      <Link href="/en" className="button dark">
        MBT Home ↗
      </Link>
      <Link href="/ar" className="text-link">
        الرئيسية ←
      </Link>
    </section>
  );
}
