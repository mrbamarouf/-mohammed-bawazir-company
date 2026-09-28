"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { navigation, extraNavigation, company } from "@/lib/company";
import { pick, type Locale } from "@/lib/types";
import { Arrow } from "./ui";
export function Header({ locale }: { locale: Locale }) {
  const path = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const ar = locale === "ar";
  const other = ar ? "en" : "ar";
  const close = () => dialog.current?.close();
  return (
    <>
      <a href="#main" className="skip-link">
        {ar ? "انتقل إلى المحتوى" : "Skip to content"}
      </a>
      <header className="site-header">
        <Link
          prefetch={false}
          href={`/${locale}`}
          aria-label={pick(company.name, locale)}
          className="identity"
        >
          <Image
            src="/assets/clean/company/mbt.png"
            width={276}
            height={37}
            alt="MBT"
            preload
          />
        </Link>
        <nav aria-label={ar ? "القائمة الرئيسية" : "Main navigation"}>
          {navigation.map((n) => (
            <Link
              prefetch={false}
              key={n.slug}
              aria-current={path.split("/")[2] === n.slug ? "page" : undefined}
              href={`/${locale}/${n.slug}`}
            >
              {pick(n.name, locale)}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link
            prefetch={false}
            className="language"
            href={path.replace(/^\/(en|ar)(?=\/|$)/, `/${other}`)}
            lang={other}
            aria-label={ar ? "Switch to English" : "التحويل إلى العربية"}
          >
            {ar ? "EN" : "العربية"}
          </Link>
          <Link
            prefetch={false}
            className="header-contact"
            href={`/${locale}/contact`}
          >
            {ar ? "تواصل معنا" : "Contact"}
            <Arrow />
          </Link>
          <button
            className="menu-toggle"
            aria-label={ar ? "افتح جميع الأقسام" : "Open all sections"}
            onClick={() => dialog.current?.showModal()}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      <dialog
        ref={dialog}
        className="nav-dialog"
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
      >
        <div className="dialog-top">
          <span>{ar ? "اكتشف MBT" : "Explore MBT"}</span>
          <button
            onClick={close}
            aria-label={ar ? "إغلاق القائمة" : "Close menu"}
            className="close-button"
          >
            ×
          </button>
        </div>
        <nav aria-label={ar ? "كل الأقسام" : "All sections"}>
          {[...navigation, ...extraNavigation].map((n) => (
            <Link
              prefetch={false}
              href={`/${locale}/${n.slug}`}
              key={n.slug}
              onClick={close}
            >
              {pick(n.name, locale)}
              <Arrow />
            </Link>
          ))}
        </nav>
        <a href={`mailto:${company.email}`} className="dialog-email">
          {company.email}
        </a>
      </dialog>
    </>
  );
}
