import type { Locale } from "@/lib/types";
import { Arrow } from "./ui";
/** The narrow-screen hero has its own caption, reading rhythm and scroll cue. */
export function MobileHeroLedger({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  return <div className="mobile-hero-ledger">
    <div><span>{ar ? "نبني الثقة منذ" : "Building trust since"}</span><bdi dir="ltr">1987</bdi></div>
    <a href="#company-scale"><span>{ar ? "من جدة، إلى أسواق المملكة" : "From Jeddah. Across Saudi Arabia."}</span><Arrow direction="down" /></a>
  </div>;
}
