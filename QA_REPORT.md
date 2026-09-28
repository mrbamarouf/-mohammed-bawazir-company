# Desktop redesign and QA — 28 September 2026

The rejected design is preserved in the original three commits through `8ce0afd`. This new desktop implementation substantially replaces the homepage composition and shared visual system. The audit, prepared assets, interface and QA are separate commits. Desktop design approval remains with the company.

## Delivered scope

- White, charcoal and MBT green with restrained ivory and bronze; Archivo, Manrope and Noto Sans Arabic. Authentic retail and headquarters photography forms the new hero composition. Six distinct business sectors have prominent visual destinations.
- 50 source-backed brand/principal entries with 37 verified standalone logos. A two-row, continuous marquee includes every usable directory mark, equal repeated groups, hover/focus pause, an explicit pause control and a static reduced-motion layout. Images are deferred until the section approaches the viewport; all marks are then loaded to avoid gaps during travel.
- 394 independent original product records and 83 source categories preserved. Search, brand/category/sector/language filters and incremental loading remain. Four homepage product families each present six distinct products. The homepage client receives only its 24 selected records.
- A real Saudi boundary with eight source-listed branch cities, selectable markers and a six-stage brand-to-market flow. City centres and schematic connections are explicitly labelled. Conflicting historical business metrics are not used as current scale claims.
- 1987 history, dated recognition, founders and source-attributed leadership; MBT, Promo Insight, White Gate and the historical MBTech record; 33 searchable/year-filtered news entries; nine marketing destinations; careers and contact.
- Seven source PDFs / 251 pages, five profile viewers and historical galleries retained. Complete re-audit findings and missing/conflicting source information appear in `RE_AUDIT.md` and `CONTENT_REVIEW.md`.
- 1,018 bilingual content routes; 1,023 generated entries including root/framework/metadata routes. One previously malformed imported product slug was repaired.

## Verification

| Check | Result |
| --- | --- |
| Lint and TypeScript | Pass |
| Production build | Pass; 1,023 generated entries |
| Playwright suite | 21 passed; see `audit/test-results.json` |
| Complete generated route crawl | All 1,018 bilingual content URLs returned HTTP 200 |
| Automated desktop matrix | 12 routes × four widths × two languages = 96 checks |
| Full-page visual matrix | Home + About, Business, Brands, Products, Distribution, Companies, News, Contact; both languages at 1920, 1728, 1440 and 1366 = 72 screenshots |
| Visual matrix result | No page errors, broken loaded images or horizontal overflow |
| Accessibility | Zero axe WCAG 2 A/AA and 2.1 AA violations on home, catalogue, distribution and contact in both languages |
| Marquee | All 37 marks loaded; repeated groups remain joined and cover the viewport at 0%, 25%, 50% and just before 100%; pause and reduced motion pass |
| Content preservation | All 394 IDs, names, source links and category IDs unchanged; brand discovery fixes documented for 69 records |
| Interactions | Catalogue filtering/loading/details, bilingual route switching, map keyboard selection, modal focus/Escape, news search/year/reset, product families, archive paging and enquiry validation pass |
| Local asset references | 1,652 checked; zero missing files; 2,004 retained asset files, 521.5 MB including source archives and PDFs |

Evidence: `audit/build.log`, `audit/test-results.json`, `audit/asset-validation.json`, `audit/redesign/route-check.json`, `audit/redesign/visual-matrix.json`, and `audit/screenshots/redesign/`. Large retained source PDFs and originals are not loaded automatically by visitors.

## Visual critique and corrections

Reviewed the entire homepage and all eight major pages in English and Arabic, plus the four-width homepage compositions. Captured nine homepage sections individually in both languages to inspect logo scale, cutouts, map labels, RTL, CTA direction and typography at useful resolution.

The review changed a repeated sector photograph, rebuilt the final sector as a full-width band, corrected five mismatched brand mappings, expanded the Mayora/Bull Dose crops to preserve complete artwork, identified the misleadingly named Carina logo, selected six distinct products per family, and replaced three unavailable news photographs with neutral MBT panels. Low-resolution source products retain native dimension limits. All originals remain available.

No giant circle CTA, diagonal CTA arrows, tilted product cards or previous abstract homepage layout remain. The logo's authentic two-tone cartouche is preserved; no new rectangular screenshot background is added. 13 portfolio names remain text-only because a reliable standalone mark was unavailable. One near-white Reem package retains its original background because removing it would damage the packaging; it is excluded from the homepage product display.

## Performance

No animation library. Local WOFF2 fonts, WebP image delivery, deferred below-fold images and disabled speculative catalogue-link prefetch. Archivo font files were compressed from approximately 559 KB to 139 KB without changing the font outlines.

| Page | LCP (ms) | CLS | JS transferred | Resource requests |
| --- | ---: | ---: | ---: | ---: |
| `/en` | 44 | 0.0005 | 160.9 KB | 78 |
| `/ar` | 60 | 0.0098 | 160.9 KB | 77 |
| `/en/products` | 36 | 0.0296 | 160.9 KB | 39 |
| `/ar/products` | 36 | 0.0457 | 160.9 KB | 33 |

These are local Chromium production-server observations at 1440 × 1000, with a new browser context per route and no network/CPU throttling. They are not public-network or field Core Web Vitals measurements. See `audit/performance.json`.

## Boundaries

Dedicated mobile art direction remains outside this desktop phase. The contact form validates and opens a mail draft; server-side delivery is not configured and no message was sent by QA. Source conflicts, inaccessible historical media and unverified current leadership/statistics retain attribution. Historical Arabic pages preserve explicitly labelled English article bodies where a translated source body was unavailable. All source-site access was read-only; no live deployment or DNS change occurred. Preview indexing remains disabled.

## Git delivery

The redesign is committed on `main` in the supplied existing project and repository `https://github.com/mrbamarouf/-mohammed-bawazir-company.git`. The original commits remain ancestors; no history replacement, new repository or second local project was used. No credentials or login codes are stored in the repository.
