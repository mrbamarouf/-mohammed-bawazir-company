import Link from "next/link";
import { Arrow } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="wrap error-page">
      <p>
        <bdi lang="en" dir="ltr">404</bdi>
      </p>
      <h1>
        <bdi lang="en" dir="ltr">Let’s find your way.</bdi>
        <br />
        <bdi lang="ar" dir="rtl">لنجد وجهتك.</bdi>
      </h1>
      <p>
        <bdi lang="en" dir="ltr">The page could not be found.</bdi>{" "}
        <bdi lang="ar" dir="rtl">الصفحة المطلوبة غير موجودة.</bdi>
      </p>
      <Link prefetch={false} href="/en" className="button dark" lang="en" dir="ltr">
        English home <Arrow />
      </Link>
      <Link prefetch={false} href="/ar" className="text-link" lang="ar" dir="rtl">
        الرئيسية <Arrow />
      </Link>
    </section>
  );
}
