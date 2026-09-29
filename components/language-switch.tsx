"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { querySearch } from "./use-query-filters";
import type { Locale } from "@/lib/types";

export const languageContextKey = "mbt-language-context";
export function LanguageSwitch({ locale, className, children, onSwitch, label }: {
  locale: Locale; className?: string; children?: React.ReactNode; label?: string; onSwitch?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const other = locale === "ar" ? "en" : "ar";
  const href = pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${other}`);
  return <Link prefetch={false} href={href} scroll={false} className={className} lang={other}
    aria-label={label || (locale === "ar" ? "Switch to English" : "التحويل إلى العربية")}
    onClick={event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const sections = [...document.querySelectorAll<HTMLElement>("[data-context]")].filter(el => el.offsetHeight > 0);
      // Follow the section occupying the screen, including one beginning below
      // the sticky header. Arabic and English sections have different heights.
      const visibleHeight = (el: HTMLElement) => {
        const rect = el.getBoundingClientRect();
        return Math.max(0, Math.min(innerHeight, rect.bottom) - Math.max(68, rect.top));
      };
      const current = sections.filter(el => visibleHeight(el) > 0).sort((a, b) => visibleHeight(b) - visibleHeight(a))[0];
      const context = { path: href, section: current?.dataset.context, offset: current ? -current.getBoundingClientRect().top / current.offsetHeight : 0, y: window.scrollY, time: Date.now() };
      try { sessionStorage.setItem(languageContextKey, JSON.stringify(context)); } catch { /* Storage may be disabled. Routing still works. */ }
      document.documentElement.dataset.languageSwitch = "true";
      onSwitch?.();
      router.push(href + querySearch() + window.location.hash, { scroll: false });
    }}>{children || (locale === "ar" ? "EN" : "AR")}</Link>;
}
