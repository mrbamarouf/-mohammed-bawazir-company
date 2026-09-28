# Desktop implementation and QA

Reviewed 28 September 2026 against the production build on `http://localhost:3001`.

## Delivered scope

- Custom charcoal, warm ivory and bronze corporate identity with an editorial homepage, authentic headquarters imagery, a real Saudi boundary, selectable branch cities, a distribution journey and the 1987 legacy.
- Independent English/LTR and Arabic/RTL content and routes. Language switching retains the current detail page.
- All major corporate sections; six divisions; 38 brand/principal records; 394 separate source product records; 33 news/event records; marketing archives; related companies; profiles; careers and contact.
- 988 bilingual content routes, plus the root redirect and framework/metadata routes. The build reports 993 generated entries in total.
- Seven downloadable PDF sources, dated image profiles, recoverable historical company pages and local source assets. The download collection totals 251 PDF pages across the seven source files.
- 1,372 literal runtime asset references checked: zero missing files. 1,483 files retained under public/assets, approximately 470.6 MB including original archive documents. These files are not all downloaded by a visitor; images are resized on demand and PDFs require a download action.

## Validation results

| Check | Result |
|---|---|
| `npm run lint` | Pass |
| `npm run typecheck` | Pass |
| `npm run build` | Pass; 993 generated entries; no material build warnings |
| `TEST_BASE_URL=http://localhost:3001 npx playwright test --workers=1` | 17 passed, 23.7 seconds |
| Desktop route matrix | 12 major routes × 4 widths × 2 languages = 96 page checks |
| Viewports | 1920, 1728, 1440, 1366 pixels |
| Catalogue | Search, no-results state, reset, 48-item incremental loading, details and Arabic records |
| Navigation | Detail-preserving language switch, map keyboard selection, modal open/Escape, expected 404 |
| Contact | Required-field validation and explicit mail draft handoff; no message sent by QA |
| Archives | Profile paging, edition reset, White Gate and MBTech historical records, marketing galleries |
| Automated accessibility | Zero axe WCAG 2 A/AA and 2.1 AA violations on home, products, contact and distribution in both languages |
| Asset checks | No missing referenced local files; no broken loaded images on the accessibility sample |
| Visual capture script | Completed; zero page errors |

Evidence: `audit/test-results.json`, `audit/build.log`, `audit/asset-validation.json`, `audit/visual-errors.json` and `audit/screenshots/`.

## Visual review

Saved all eight home viewport/language captures, full-length English and Arabic homepages, and selected catalogue, about, contact, brands and profile screenshots. Reviewed hierarchy, spacing, the product compositions, map readability, RTL order, imagery, footer and navigation. No horizontal overflow was observed in the 96-page desktop matrix. The reduced-motion stylesheet disables animation and smooth scrolling.

The automatic Next.js link prefetch generated unnecessary speculative route traffic and coincided with intermittent browser navigation stalls in earlier test runs. Disabling prefetch on internal links removed those stalls in the final complete run and lowered initial homepage requests. The image pipeline now serves WebP, avoiding the higher cold-generation cost of AVIF. Archive edition changes reset the viewer to page one.

## Local performance observation

Chromium at 1440 × 1000 against a local production server, no network or CPU throttling, new browser context per page. This is a local diagnostic, not a public-network benchmark or field Core Web Vitals certification.

| Page | LCP (ms) | CLS | JS transferred | Resource requests |
|---|---:|---:|---:|---:|
| English home | 60 | 0.0024 | 158.5 KB | 28 |
| Arabic home | 56 | 0.0217 | 158.5 KB | 27 |
| English catalogue | 36 | 0.0011 | 158.5 KB | 35 |
| Arabic catalogue | 60 | 0.0315 | 158.5 KB | 31 |

Raw observations: `audit/performance.json`. A deployed preview should be measured on its actual hosting and network before a domain launch.

## Known boundaries and source review

- Dedicated mobile design remains outside this phase. Basic responsive protection is present.
- The enquiry form prepares an email draft in the visitor's mail application. Server-side email transport is not configured.
- Company-source statistics, leadership conflicts, questionable branch addresses, unavailable media and partial archives are documented in `CONTENT_REVIEW.md`. Archival numbers are labelled and are not used as current homepage scale claims.
- 81 original asset downloads failed at the source; 271 legacy gallery attachment IDs had no public media records in targeted lookup. Available gallery images are preserved. No replacement company photographs were invented.
- Arabic product records remain independent. Where a translated news body was unavailable, the original English body is explicitly labelled.
- The careers destination is the company's published external legacy HR portal; this rebuild cannot establish its ongoing availability.
- No Vercel deployment, DNS change or live-site mutation was performed. Preview indexing is disabled by default.

## Git delivery

Work was created directly in the supplied folder and committed in milestones. Origin is `https://github.com/mrbamarouf/-mohammed-bawazir-company.git`. GitHub upload requires local Git authentication; repository access through the connector does not provide a local Git credential. No credentials or login codes are stored in this repository.
