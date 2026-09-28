import Link from "next/link";
import { Arrow } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="wrap error-page">
      <p>
        <bdi dir="ltr">404</bdi>
      </p>
      <h1>
        <bdi dir="ltr">Let’s find your way.</bdi>
        <br />
        <bdi dir="rtl">لنجد وجهتك.</bdi>
      </h1>
      <p>
        <bdi dir="ltr">The page could not be found.</bdi>{" "}
        <bdi dir="rtl">الصفحة المطلوبة غير موجودة.</bdi>
      </p>
      <Link prefetch={false} href="/en" className="button dark" dir="ltr">
        English home <Arrow />
      </Link>
      <Link prefetch={false} href="/ar" className="text-link" dir="rtl">
        الرئيسية <Arrow />
      </Link>
    </section>
  );
}
