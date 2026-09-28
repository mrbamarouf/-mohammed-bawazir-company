import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/types";
export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={diagonal ? "arrow diagonal" : "arrow"}
    >
      <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
export function TextLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <Link
      prefetch={false}
      className={`text-link ${light ? "light" : ""}`}
      href={href}
    >
      <span>{children}</span>
      <Arrow />
    </Link>
  );
}
export function Photo({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "100vw",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`photo ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} preload={priority} />
    </div>
  );
}
export function PageIntro({
  locale,
  title,
  kicker,
  description,
  children,
}: {
  locale: Locale;
  title: string;
  kicker: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-intro wrap">
      <div className="breadcrumb">
        <Link prefetch={false} href={`/${locale}`}>
          MBT
        </Link>
        <span>/</span>
        <span>{kicker}</span>
      </div>
      <div className="intro-grid">
        <h1>{title}</h1>
        <div>
          {description && <p className="lead">{description}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
export function SourceLink({ url, locale }: { url: string; locale: Locale }) {
  return (
    <a className="source-link" href={url} target="_blank" rel="noreferrer">
      {locale === "ar" ? "المصدر الرسمي" : "Company source"} ↗
    </a>
  );
}
export function EmptyImage({ label }: { label: string }) {
  return (
    <div className="empty-image">
      <span>MBT</span>
      <p>{label}</p>
    </div>
  );
}
