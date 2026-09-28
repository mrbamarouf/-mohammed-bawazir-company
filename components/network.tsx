"use client";
import { BidiText } from "./bidi-text";
import { useState, useRef, useEffect } from "react";
import geometry from "@/content/saudi-geometry.json";
import { branches, company } from "@/lib/company";
import { pick, type Locale } from "@/lib/types";
import { TextLink, Arrow } from "./ui";
const project = (lon: number, lat: number) => [
  (lon - 34) * 32,
  (33 - lat) * 34,
];
const paths = geometry.coordinates.map((polygon) =>
  polygon
    .map(
      (ring) =>
        ring
          .map(
            ([lon, lat], i) =>
              `${i ? "L" : "M"}${project(lon, lat)
                .map((v) => v.toFixed(1))
                .join(",")}`,
          )
          .join(" ") + "Z",
    )
    .join(" "),
);
export function Network({
  locale,
  standalone = false,
}: {
  locale: Locale;
  standalone?: boolean;
}) {
  const [selected, setSelected] = useState("jeddah");
  const [seen, setSeen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const ar = locale === "ar";
  const branch = branches.find((b) => b.id === selected)!;
  useEffect(() => {
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          ob.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);
  const origin = project(branches[0].lon, branches[0].lat);
  return (
    <section className={`network ${seen ? "network-seen" : ""}`} ref={ref}>
      <div className="wrap network-layout">
        <div className="network-copy">
          <p className="section-note">
            <BidiText
              text={ar ? "شبكة التوزيع" : "SAUDI DISTRIBUTION NETWORK"}
            />
          </p>
          <h2>
            {ar ? (
              <>
                حضور يمتد
                <br />
                <em>عبر المملكة.</em>
              </>
            ) : (
              <>
                A presence
                <br />
                across <em>Saudi Arabia.</em>
              </>
            )}
          </h2>
          <p>
            <BidiText
              text={
                ar
                  ? "من مقرنا في جدة، تربط شبكة فروعنا العلامات التجارية بالأسواق المحلية. اختر مدينة لاستكشاف حضورنا."
                  : "From our home in Jeddah, our branch network brings brands closer to local markets. Select a city to explore our presence."
              }
            />
          </p>
          <div className="network-location" aria-live="polite">
            <span className="location-dot" />
            <div>
              <h3>{pick(branch.name, locale)}</h3>
              <span>{pick(branch.region, locale)}</span>
              <p>{pick(branch.note, locale)}</p>
            </div>
          </div>
          <TextLink
            href={standalone ? `/${locale}/contact` : `/${locale}/distribution`}
            light
          >
            <BidiText text={ar ? "تعرّف على شبكتنا" : "Explore our network"} />
          </TextLink>
        </div>
        <div className="map-wrap">
          <span className="map-caption">
            <BidiText
              text={ar ? "المملكة العربية السعودية" : "KINGDOM OF SAUDI ARABIA"}
            />
          </span>
          <svg
            className="network-map"
            viewBox="-45 0 790 650"
            aria-label={ar ? "خريطة مدن فروع MBT" : "Map of MBT branch cities"}
            role="group"
          >
            <defs>
              <pattern
                id="map-grid"
                width="32"
                height="34"
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx="1"
                  cy="1"
                  r=".8"
                  fill="currentColor"
                  opacity=".13"
                />
              </pattern>
            </defs>
            <rect
              x="-45"
              y="0"
              width="790"
              height="650"
              fill="url(#map-grid)"
            />
            {paths.map((d, i) => (
              <path d={d} key={i} className="country-shape" />
            ))}
            <text
              x="615"
              y="330"
              className="sea-label"
              transform="rotate(-65 615 330)"
            >
              {ar ? "الخليج العربي" : "ARABIAN GULF"}
            </text>
            <text
              x="80"
              y="450"
              className="sea-label"
              transform="rotate(55 80 450)"
            >
              {ar ? "البحر الأحمر" : "RED SEA"}
            </text>
            {branches.slice(1).map((b, i) => {
              const [x, y] = project(b.lon, b.lat);
              return (
                <path
                  key={b.id}
                  className={`network-route ${b.id === selected ? "active" : ""}`}
                  style={{ animationDelay: `${i * 0.16}s` }}
                  d={`M${origin[0]} ${origin[1]} Q${(x + origin[0]) / 2 + 50} ${(y + origin[1]) / 2 - 45} ${x} ${y}`}
                />
              );
            })}
            {branches.map((b) => {
              const [x, y] = project(b.lon, b.lat);
              return (
                <g
                  role="button"
                  aria-pressed={selected === b.id}
                  aria-label={pick(b.name, locale)}
                  tabIndex={0}
                  key={b.id}
                  className={`map-point ${selected === b.id ? "selected" : ""}`}
                  onMouseEnter={() => setSelected(b.id)}
                  onFocus={() => setSelected(b.id)}
                  onClick={() => setSelected(b.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelected(b.id);
                    }
                  }}
                  transform={`translate(${x},${y})`}
                >
                  <circle r="20" className="point-hit" />
                  <circle r="12" className="point-halo" />
                  <circle r="4" className="point-core" />
                  <text
                    x={b.id === "jizan" ? -12 : 13}
                    y={b.id === "jizan" ? 19 : 5}
                    textAnchor={b.id === "jizan" ? "end" : "start"}
                  >
                    {pick(b.name, locale)}
                  </text>
                </g>
              );
            })}
          </svg>
          <div className="map-legend">
            <span>
              <i />
              <BidiText text={ar ? "مدن الفروع" : "Branch cities"} />
            </span>
            <span>
              <BidiText
                text={
                  ar ? "المسارات توضيحية" : "Connections shown schematically"
                }
              />
            </span>
          </div>
        </div>
      </div>
      {standalone && (
        <div className="wrap branch-index">
          {branches.map((b) => (
            <button
              key={b.id}
              className={selected === b.id ? "active" : ""}
              onClick={() => setSelected(b.id)}
              aria-pressed={selected === b.id}
            >
              {pick(b.name, locale)}
              <Arrow />
            </button>
          ))}
          <p>
            <BidiText
              text={
                ar
                  ? "مواقع النقاط تمثل مراكز المدن وليست إحداثيات المكاتب. للتفاصيل الحالية:"
                  : "Map markers indicate city centres, not office entrances. For current branch details:"
              }
            />{" "}
            <a href={`tel:${company.telephone}`} dir="ltr">
              {company.phone}
            </a>
          </p>
        </div>
      )}
    </section>
  );
}
