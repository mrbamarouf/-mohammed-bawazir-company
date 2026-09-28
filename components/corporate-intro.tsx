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
    if (document.documentElement.dataset.intro !== "pending" || !/^\/(ar|en)\/?$/.test(path)) {
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
    return () => { cancelAnimationFrame(frame); if (timer.current) clearTimeout(timer.current); el?.close(); if (document.documentElement.dataset.intro === "playing") delete document.documentElement.dataset.intro; };
  }, [path]);
  return <dialog ref={dialog} className="corporate-intro" aria-label={ar ? "مرحبًا بكم في شركة محمد باوزير للتجارة" : "Welcome to Mohammed Bawazir Trading Company"} onCancel={event => { event.preventDefault(); finish(); }}>
    <div className="intro-network" aria-hidden="true">
      <svg className="intro-network-wide" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <path className="intro-route intro-route-main" pathLength="1" d="M-30 270H270Q340 270 340 340V450H720H1090Q1160 450 1160 520V660H1470" />
        <path className="intro-route intro-route-secondary" pathLength="1" d="M-30 630H200Q270 630 270 560V450H720H1000Q1070 450 1070 380V230H1470M540 920V700Q540 650 590 650H720V450V220Q720 170 770 170H980V-20" />
        <circle className="intro-signal" r="4"><animateMotion dur="3.6s" repeatCount="1" path="M-30 270H270Q340 270 340 340V450H720H1090Q1160 450 1160 520V660H1470" fill="freeze" /></circle>
      </svg>
      <svg className="intro-network-portrait" viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice">
        <path className="intro-route intro-route-main" pathLength="1" d="M55-30V190Q55 222 87 222H163Q195 222 195 254V422V574Q195 606 227 606H303Q335 606 335 638V874" />
        <path className="intro-route intro-route-secondary" pathLength="1" d="M335-30V120Q335 155 300 155H260Q225 155 225 190V352Q225 387 195 387V450Q195 485 165 485H105Q70 485 70 520V874M-20 350H135Q165 350 165 380V422H215Q255 422 255 460V710Q255 744 289 744H410" />
        <circle className="intro-signal" r="3"><animateMotion dur="3.6s" repeatCount="1" path="M55-30V190Q55 222 87 222H163Q195 222 195 254V422V574Q195 606 227 606H303Q335 606 335 638V874" fill="freeze" /></circle>
      </svg>
    </div>
    <div className="intro-journey" aria-hidden="true"><span>{ar ? "علامات عالمية" : "Global brands"}</span><span>{ar ? "تخزين وتوزيع" : "Warehousing & distribution"}</span><span>{ar ? "أسواق المملكة" : "Saudi markets"}</span><span>{ar ? "في الحياة اليومية" : "Everyday life"}</span></div>
    <div className="intro-identity"><BrandLogo markOnly /><p>{ar ? "شراكات عالمية. قيمة محلية." : "Global partnerships. Local value."}</p><span>{ar ? "منذ" : "Since"} <bdi dir="ltr">1987</bdi></span></div>
    <button className="intro-skip" onClick={finish} autoFocus><span>{ar ? "تخطي المقدمة" : "Skip Intro"}</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="m6 5 9 7-9 7zm12 0v14" /></svg></button>
  </dialog>;
}
