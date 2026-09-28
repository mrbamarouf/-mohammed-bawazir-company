import type { Locale } from "@/lib/types";
export function ValueChain({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  return (
    <div className="value-chain wrap">
      <p>{ar ? "من العلامة إلى الناس" : "From brand to people"}</p>
      <ol>
        {(ar
          ? [
              "العلامات العالمية",
              "MBT",
              "التخزين",
              "التوزيع",
              "التجزئة",
              "الناس",
            ]
          : [
              "Global brands",
              "MBT",
              "Warehousing",
              "Distribution",
              "Retail",
              "People",
            ]
        ).map((s, i) => (
          <li key={s}>
            <span className="chain-symbol" aria-hidden="true">
              {i === 1 ? (
                "MBT"
              ) : (
                <svg viewBox="0 0 40 40" fill="none">
                  <path
                    d={
                      [
                        "M20 4a16 16 0 1 0 0 32a16 16 0 1 0 0-32M4 20h32M20 4c-12 14-12 18 0 32M20 4c12 14 12 18 0 32",
                        "",
                        "M5 35V16L20 5l15 11v19M13 35V21h14v14M13 27h14",
                        "M4 11h21v20H4zM25 18h7l5 8v5H25M12 31v5m18-5v5",
                        "M6 14h28v21H6zM3 14l4-9h26l4 9M13 35V23h14v12",
                        "M20 20a7 7 0 1 0 0-14a7 7 0 1 0 0 14M7 36v-4a13 13 0 0 1 26 0v4",
                      ][i]
                    }
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              )}
            </span>
            <strong>{s}</strong>
          </li>
        ))}
      </ol>
    </div>
  );
}
