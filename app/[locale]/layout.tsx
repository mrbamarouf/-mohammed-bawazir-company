import { siteUrl } from "@/lib/site-url";
import "../globals.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import type { Locale } from "@/lib/types";
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
      <body id="top">
        <Header locale={locale as Locale} />
        <main id="main">{children}</main>
        <Footer locale={locale as Locale} />
      </body>
    </html>
  );
}
