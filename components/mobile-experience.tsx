"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { languageContextKey } from "./language-switch";

/** Enhancements are optional. All content is visible without JavaScript or motion. */
export function MobileExperience() {
  const pathname = usePathname();
  useEffect(() => {
    let cancelled = false;
    let frame = 0;
    let switched = false;
    try {
      const saved = JSON.parse(sessionStorage.getItem(languageContextKey) || "null");
      if (saved?.path === pathname && Date.now() - saved.time < 15000) {
        switched = true;
        document.fonts.ready.then(() => {
          const started = performance.now();
          const restore = () => {
            if (cancelled) return;
            if (document.querySelector('[data-context][aria-busy="true"]') && performance.now() - started < 2500) {
              frame = requestAnimationFrame(restore);
              return;
            }
            const section = [...document.querySelectorAll<HTMLElement>("[data-context]")].find(el => el.dataset.context === saved.section && el.offsetHeight);
            const y = section ? section.getBoundingClientRect().top + window.scrollY + Math.max(-1, Math.min(saved.offset, 1)) * section.offsetHeight : saved.y;
            window.scrollTo({ top: y, behavior: "instant" });
            sessionStorage.removeItem(languageContextKey);
            delete document.documentElement.dataset.languageSwitch;
          };
          frame = requestAnimationFrame(() => { frame = requestAnimationFrame(restore); });
        });
      }
      const hero = document.querySelector<HTMLElement>(".authority-hero");
      if (hero && window.matchMedia("(max-width: 767px)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches && !switched && !sessionStorage.getItem("mbt-mobile-intro")) {
        sessionStorage.setItem("mbt-mobile-intro", "seen");
        hero.dataset.introPlayed = "true";
        hero.querySelector(".authority-photo")?.animate([{ clipPath: "inset(0 0 8% 0)" }, { clipPath: "inset(0 0 0 0)" }], { duration: 850, easing: "cubic-bezier(.22,1,.36,1)" });
        hero.querySelector("h1")?.animate([{ transform: "translateY(8px)" }, { transform: "translateY(0)" }], { duration: 650, easing: "ease-out" });
      }
    } catch { /* Private browsing must not block navigation or the page. */ }
    return () => { cancelled = true; cancelAnimationFrame(frame); };
  }, [pathname]);
  return null;
}
