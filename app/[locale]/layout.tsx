import { siteUrl } from "@/lib/site-url";
// Keep shared stylesheet order identical in both root layouts.
import "../globals.css";
import "../mobile.css";
import "../typography.css";
import { MobileExperience } from "@/components/mobile-experience";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import type { Locale } from "@/lib/types";
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#10251d" };
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MBT | Mohammed Bawazir Trading Company",
    template: "%s | MBT",
  },
  description:
    "Connecting global brands, Saudi markets and people since 1987. Discover Mohammed Bawazir Trading Company.",
  robots:
    process.env.ALLOW_INDEXING === "true"
      ? { index: true, follow: true }
      : { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: "MBT",
    images: [
      {
        url: "/assets/company/headquarters.jpg",
        width: 1920,
        height: 905,
        alt: "Mohammed Bawazir Trading headquarters",
      },
    ],
  },
  icons: { icon: "/icon.svg" },
};
export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "ar") notFound();
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <head>
        <link rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" href={locale === "ar" ? "/assets/fonts/readex-arabic-400.woff2" : "/assets/fonts/manrope-0.woff2"} />
        <link rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" href={locale === "ar" ? "/assets/fonts/readex-arabic-600.woff2" : "/assets/fonts/archivo-2.woff2"} />
      </head>
      <body id="top">
        <MobileExperience />
        <Header locale={locale as Locale} />
        <main id="main">{children}</main>
        <Footer locale={locale as Locale} />
      </body>
    </html>
  );
}
