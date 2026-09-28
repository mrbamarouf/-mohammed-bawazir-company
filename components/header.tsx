"use client";
import { BidiText } from "./bidi-text";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { MobileIcon } from "./mobile-icons";
import { navigation, extraNavigation, company } from "@/lib/company";
import { pick, type Locale } from "@/lib/types";
import { LanguageSwitch } from "./language-switch";
import { BrandLogo } from "./brand-logo";
import { Arrow } from "./ui";
export function Header({ locale }: { locale: Locale }) {
  const path = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const menuTrigger = useRef<HTMLButtonElement>(null);
  const ar = locale === "ar";
  const [menuOpen, setMenuOpen] = useState(false);
  const page = path.split("/")[2] || "home";
  const open = (event: React.MouseEvent<HTMLButtonElement>) => { menuTrigger.current = event.currentTarget; dialog.current?.showModal(); setMenuOpen(true); };
  const close = () => dialog.current?.close();
  return (
    <>
      <a href="#main" className="skip-link">
        <BidiText text={ar ? "انتقل إلى المحتوى" : "Skip to content"} />
      </a>
      <header className="site-header" data-page={page}>
        <Link
          prefetch={false}
          href={`/${locale}`}
          aria-label={pick(company.name, locale)}
          className="identity"
        >
          <Image
            className="desktop-header-logo"
            src="/assets/clean/company/mbt.png"
            width={276}
            height={37}
            alt="MBT"
            preload
          />
          <BrandLogo markOnly className="mobile-header-logo" />
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
          <LanguageSwitch locale={locale} className="language">
            <span className="desktop-language">{ar ? "EN" : "العربية"}</span>
            <span className="mobile-language" dir="ltr">{ar ? "EN" : "AR"}</span>
          </LanguageSwitch>
          <Link
            prefetch={false}
            className="header-contact"
            href={`/${locale}/contact`}
          >
            <BidiText text={ar ? "تواصل معنا" : "Contact"} />
            <Arrow />
          </Link>
          <button
            className="menu-toggle"
            aria-label={ar ? "افتح جميع الأقسام" : "Open all sections"}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={open}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      <dialog
        ref={dialog}
        id="site-menu"
        onClose={() => { setMenuOpen(false); menuTrigger.current?.focus({preventScroll:true}); }}
        className="nav-dialog"
        aria-label={ar ? "قائمة الموقع" : "Site menu"}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
      >
        <div className="dialog-top">
          <span className="desktop-menu-title"><BidiText text={ar ? "اكتشف MBT" : "Explore MBT"} /></span>
          <BrandLogo markOnly className="mobile-menu-logo" />
          <button
            onClick={close}
            aria-label={ar ? "إغلاق القائمة" : "Close menu"}
            className="close-button"
          >
            ×
          </button>
        </div>
        <nav aria-label={ar ? "كل الأقسام" : "All sections"}>
          <Link prefetch={false} href={`/${locale}`} onClick={close} className="mobile-menu-home"><MobileIcon name="home" />{ar ? "الرئيسية" : "Home"}<Arrow /></Link>
          {[...navigation, ...extraNavigation].map((n) => (
            <Link
              prefetch={false}
              href={`/${locale}/${n.slug}`}
              key={n.slug}
              onClick={close}
            >
              <MobileIcon name={n.slug} />
              {pick(n.name, locale)}
              <Arrow />
            </Link>
          ))}
        </nav>
        <div className="mobile-menu-bottom"><LanguageSwitch locale={locale} onSwitch={close}>{ar ? "English" : "العربية"}</LanguageSwitch><a href={`tel:${company.telephone}`} dir="ltr">{company.phone}</a></div>
        <a href={`mailto:${company.email}`} className="dialog-email" dir="ltr">
          {company.email}
        </a>
        <p className="mobile-menu-company">{pick(company.name, locale)}<br />{ar ? "جدة، المملكة العربية السعودية" : "Jeddah, Saudi Arabia"}</p>
      </dialog>
      <nav className="bottom-navigation" aria-label={ar ? "التنقل السريع" : "Quick navigation"}>
        {[{slug:"", icon:"home", en:"Home", ar:"الرئيسية"}, {slug:"products",icon:"products",en:"Products",ar:"المنتجات"}, {slug:"brands",icon:"brands",en:"Brands",ar:"العلامات"}].map(item => <Link prefetch={false} key={item.icon} href={`/${locale}${item.slug ? "/" + item.slug : ""}`} aria-current={page === (item.slug || "home") ? "page" : undefined}><MobileIcon name={item.icon} /><span>{item[locale]}</span></Link>)}
        <button onClick={open} aria-expanded={menuOpen} aria-controls="site-menu" data-active={!["home", "products", "brands"].includes(page)}><MobileIcon name="more" /><span>{ar ? "المزيد" : "More"}</span></button>
      </nav>
    </>
  );
}
