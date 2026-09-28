import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/types";
import { BrandLogo } from "./brand-logo";
import { BidiText } from "./bidi-text";
export function Arrow({
  direction = "next",
}: {
  direction?: "next" | "back" | "down" | "up";
}) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`arrow arrow-${direction}`}
    >
      <path
        d={
          direction === "down"
            ? "M12 3v18m-4-4 4 4 4-4"
            : direction === "up"
              ? "M12 21V3m-4 4 4-4 4 4"
              : "M2 12h19m-4-4 4 4-4 4"
        }
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}
export function TextLink({
  href,
  children,
  light = false,
  direction = "next",
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
  direction?: "next" | "back";
}) {
  return (
    <Link
      prefetch={false}
      className={`text-link ${light ? "light" : ""}`}
      href={href}
    >
      <span>
        {typeof children === "string" ? <BidiText text={children} /> : children}
      </span>
      <Arrow direction={direction} />
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
  if (!src)
    return (
      <div
        className={`photo photo-empty ${className}`}
        role="img"
        aria-label={alt}
      >
        <BrandLogo tone="dark" />
      </div>
    );
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
    <section className="page-intro wrap" data-context="page-intro">
      <div className="breadcrumb">
        <Link prefetch={false} href={`/${locale}`}>
          {locale === "ar" ? "الرئيسية" : "Home"}
        </Link>
        <span>/</span>
        <span>
          <BidiText text={kicker} />
        </span>
      </div>
      <div className="intro-grid">
        <h1>
          <BidiText text={title} />
        </h1>
        <div>
          {description && (
            <p className="lead">
              <BidiText text={description} />
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
export function EmptyImage({ label, logo }: { label: string; logo?: string }) {
  return (
    <div className="empty-image">
      {logo ? (
        <Image
          className="product-brand-placeholder"
          src={logo}
          width={160}
          height={100}
          alt={label}
        />
      ) : (
        <BrandLogo markOnly />
      )}
      <p>{label}</p>
    </div>
  );
}
