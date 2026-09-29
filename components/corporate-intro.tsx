"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { BrandLogo } from "./brand-logo";
import type { Locale } from "@/lib/types";

import { introKey } from "@/lib/intro";

export function CorporateIntro({ locale }: { locale: Locale }) {
  const path = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ending = useRef(false);
  const ar = locale === "ar";
  const finish = () => {
    if (ending.current || !dialog.current?.open) return;
    ending.current = true;
    if (timer.current) clearTimeout(timer.current);
    dialog.current.classList.add("intro-ending");
    timer.current = setTimeout(() => {
      dialog.current?.close();
      delete document.documentElement.dataset.intro;
      document.querySelector<HTMLElement>(".site-header .identity")?.focus({ preventScroll: true });
    }, 450);
  };
  useEffect(() => {
    const el = dialog.current;
    if (document.documentElement.dataset.intro !== "pending") {
      try { sessionStorage.setItem(introKey, "seen"); } catch { /* Optional enhancement. */ }
      return;
    }
    const frame = requestAnimationFrame(() => {
    try { sessionStorage.setItem(introKey, "seen"); } catch { /* No replay within this document. */ }
    document.documentElement.dataset.intro = "playing";
    ending.current = false;
    el?.classList.remove("intro-ending");
    el?.showModal();
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // The full journey completes in 6.2 seconds, including the final dissolve.
    timer.current = setTimeout(() => {
      ending.current = true;
      el?.classList.add("intro-ending");
      timer.current = setTimeout(() => {
        el?.close(); delete document.documentElement.dataset.intro;
      }, 450);
    }, reduced ? 650 : 5750);
    });
    const leave = () => { if (timer.current) clearTimeout(timer.current); el?.close(); delete document.documentElement.dataset.intro; };
    window.addEventListener("pagehide", leave);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("pagehide", leave); if (timer.current) clearTimeout(timer.current); el?.close(); if (document.documentElement.dataset.intro === "playing") delete document.documentElement.dataset.intro; };
  }, [path]);
  return <dialog ref={dialog} className="corporate-intro" aria-label={ar ? "مرحبًا بكم في شركة محمد باوزير للتجارة" : "Welcome to Mohammed Bawazir Trading Company"} onCancel={event => { event.preventDefault(); finish(); }}>
    <div className="intro-network" aria-hidden="true">
      <svg className="intro-network-wide" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <path className="intro-route intro-route-main" pathLength="1" d="M-30 270H270Q340 270 340 340V450H720" />
        <path className="intro-route intro-route-secondary" pathLength="1" d="M1470 230H1100Q1070 230 1070 260V400Q1070 450 1020 450H720M540 920V700Q540 650 590 650H670Q720 650 720 600V450" />
        <circle className="intro-signal" r="4"><animateMotion dur="2.6s" repeatCount="1" path="M-30 270H270Q340 270 340 340V450H720" fill="freeze" /></circle>
      </svg>
      <svg className="intro-network-portrait" viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice">
        <path className="intro-route intro-route-main" pathLength="1" d="M55-30V190Q55 222 87 222H163Q195 222 195 254V422" />
        <path className="intro-route intro-route-secondary" pathLength="1" d="M335 874V650Q335 615 300 615H230Q195 615 195 580V422M410 180H290Q255 180 255 215V387Q255 422 220 422H195" />
        <circle className="intro-signal" r="3"><animateMotion dur="2.6s" repeatCount="1" path="M55-30V190Q55 222 87 222H163Q195 222 195 254V422" fill="freeze" /></circle>
      </svg>
    </div>
    <div className="intro-journey" aria-hidden="true"><span>{ar ? "علاقات عالمية" : "Global connections"}</span><span>{ar ? "تخزين وتوزيع" : "Warehousing & distribution"}</span><span>{ar ? "المملكة العربية السعودية" : "Saudi Arabia"}</span></div>
    <div className="intro-identity"><BrandLogo markOnly intro /><p>{ar ? "شراكات عالمية. قيمة محلية." : "Global partnerships. Local value."}</p><span>{ar ? "منذ" : "Since"} <bdi dir="ltr">1987</bdi></span></div>
    <button className="intro-skip" onClick={finish} autoFocus><span>{ar ? "تخطي المقدمة" : "Skip Intro"}</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="m6 5 9 7-9 7zm12 0v14" /></svg></button>
  </dialog>;
}
