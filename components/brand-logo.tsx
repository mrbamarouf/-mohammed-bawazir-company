import Image from "next/image";

/** Official artwork only. The dark lockup pairs the original mark with the
 * company's supplied white wordmarks; none of the artwork is recoloured. */
export function BrandLogo({
  tone = "light",
  markOnly = false,
  className = "",
  intro = false,
}: {
  tone?: "light" | "dark";
  markOnly?: boolean;
  className?: string;
  intro?: boolean;
}) {
  if (markOnly)
    return (
      <Image
        className={`brand-mark ${className}`}
        src="/assets/mbt/78224d6-mbt-png-logo.png"
        alt="MBT"
        width={550}
        height={202}
        sizes={intro ? "(max-width: 767px) 260px, 360px" : "180px"}
        unoptimized={intro}
        loading={intro ? "eager" : "lazy"}
        fetchPriority={intro ? "high" : "auto"}
      />
    );
  if (tone === "light")
    return (
      <Image
        className={`brand-lockup ${className}`}
        src="/assets/clean/company/mbt.png"
        alt="شركة محمد باوزير للتجارة المحدودة | Mohammed Bawazir Trading Company"
        width={834}
        height={97}
        sizes="300px"
      />
    );
  return (
    <span
      className={`brand-lockup-dark ${className}`}
      dir="ltr"
      role="img"
      aria-label="شركة محمد باوزير للتجارة المحدودة | Mohammed Bawazir Trading Company"
    >
      <Image
        className="brand-mark"
        src="/assets/mbt/78224d6-mbt-png-logo.png"
        alt=""
        width={550}
        height={202}
        sizes="160px"
      />
      <span className="brand-official-name">
        <Image
          src="/assets/brands/a2177d8-white-text-logo.arabic-2.png"
          alt=""
          width={550}
          height={55}
          sizes="350px"
        />
        <Image
          src="/assets/brands/cb48cf3-white-text-logo.png"
          alt=""
          width={550}
          height={46}
          sizes="350px"
        />
      </span>
    </span>
  );
}
