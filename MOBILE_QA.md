# Dedicated mobile acceptance

Desktop reference: `fa55c3645cf758f7a1927993cae10871f0ce5ca8`.

## Verification on the production build

- `npm run lint`, `npm run typecheck`, `npm run build`: pass.
- Chromium: 46 passing tests, including the existing desktop suite and new mobile coverage. Mobile routes checked in Arabic and English at 320, 360, 375, 390, 393, 414 and 430px. Heights include 568, 812 and 844px.
- WebKit: 12 passing mobile tests, including both languages at 320, 390 and 430px, filtering, menu, document controls and accessibility.
- Both browser engines: one heading, correct language/direction, no horizontal page overflow, no broken visible images or uncaught runtime errors across the tested route matrix.
- Arabic reviewed first, then English. Visual coverage includes Home, About, Business and all six sectors, Brands and brand detail, Products and original Arabic/English product records, Distribution, News and article detail, Profile, Careers, Contact, Companies and Marketing.
- Language switches tested in both directions from Home, Brands, filtered Products, product detail, sector, News, Contact, Profile page 16, brand detail, article detail and a selected network city. Routes and URL parameters persist; featured-product section context is restored; the introduction does not replay. Footer and menu switches also use the same context-preserving control.
- Touch: 44px minimum checks on the primary controls, native Chromium touch swipes in both text directions, no horizontal body movement, full-screen dialog, Escape and navigation closing.
- Accessibility: axe WCAG A/AA checks on the main mobile templates and menu; reduced-motion marquee and introduction; correct RTL document and article arrows. All 394 original product records remain intact.
- Performance: catalogue renders only 24 records initially and fetches further results on demand. Slow requests cannot open stale results. Responsive optimized images, lazy loading and one-time motion are used. Synthetic lab samples are recorded in `audit/mobile/local/performance.json`; these are not physical-device or field measurements.

## Desktop preservation

96 complete desktop page captures and 22 homepage section captures were compared with the approved baseline in both languages at 1920, 1728, 1440 and 1366px. All 118 JPEG captures are byte-identical after restoring the catalogue's original image candidate sizing. No approved desktop visual changes were retained.

Shared behavioral fixes: URL-backed filters and language context; bounded catalogue data loading with inert stale results; server-formatted news dates to remove WebKit's Arabic date hydration mismatch.

## Reproduction

```sh
TEST_BASE_URL=http://localhost:3003 npx playwright test --output=test-results/chromium
TEST_BASE_URL=http://localhost:3003 MOBILE_BROWSER=webkit npx playwright test tests/mobile.spec.ts --output=test-results/webkit
TEST_BASE_URL=http://localhost:3003 QA_RUN=local node scripts/mobile-visual-qa.mjs
TEST_BASE_URL=http://localhost:3003 QA_RUN=desktop-after node scripts/desktop-preservation-qa.mjs
TEST_BASE_URL=http://localhost:3003 QA_RUN=local node scripts/mobile-performance-qa.mjs
```

Use separate Playwright output directories when running engines concurrently. Full-resolution captures stay local under `audit/mobile/*/screenshots/`; compact check results are retained in Git. The post-push inspection targets the actual existing Vercel alias and is saved locally under `audit/mobile/deployed*/`.

## Existing limitations

83 catalogue records do not have original product packshots; the existing honest brand/MBT fallback remains. Tests use real Chromium and WebKit engines with emulated mobile viewports and touch; physical iPhone/Android hardware was not available. No company facts or source records were invented or rewritten for this phase.
