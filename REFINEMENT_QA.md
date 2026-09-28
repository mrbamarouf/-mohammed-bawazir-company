# Desktop refinement verification — 28 September 2026

The rejected hero was replaced completely; the working navigation, catalogue, map, archive and directory structure remain. This pass is ready for the user's visual review, not a declaration of design approval.

## Delivered changes

- One authentic headquarters photograph anchors the full-width deep-green hero. Original company-supplied transparent mark and Arabic/English wordmark artwork establish the company identity. The opening communicates foundation in 1987, international brands, Saudi trading/distribution and six website business areas.
- Explicitly dated 2026-profile evidence now appears on Home, About and the distribution journey. Source pages, publication metadata, conflicts and corrections to the earlier transcription are in COMPANY_NUMBERS.md.
- The six-stage journey has a clear progression, an official MBT logo node, relevant figures, and direct page links. The people stage uses an everyday-life outcome without an invented counter.
- Distinct chapter surfaces separate company, sectors, brands, distribution, products, legacy, ecosystem, news and contact. Sectors keep authentic images/packshots/marks and now have distinct colour worlds; the tobacco archive has its own original store photograph.
- Visual MBT placeholders use official artwork. Ordinary references to MBT remain text in sentences and navigation copy. Logos retain source colours/proportions; no synthetic image, logo redraw or new white screenshot frame was created.
- Arabic quantities, Latin names, years, time ranges and mixed product copy are isolated structurally. Gregorian dates explicitly use Latin digits and UTC. Profile counters/slashes use LTR isolation; native form controls and SVG labels retain valid native markup. Forward/back arrows follow writing direction, while download/up arrows remain vertical.
- All 37 available standalone brand marks remain in the smooth duplicate-group marquee. Motion controls, hover/focus pause and reduced-motion behaviour remain available in both languages.

## Browser and visual evidence

Production server: `http://localhost:3001`, built with Next.js 16.3.6. Screenshots are actual Chromium output, not design mockups.

| Check | Result | Evidence |
| --- | --- | --- |
| Production build, ESLint, TypeScript | Pass; 1,023 generated pages | `npm run build`, `npm run lint`, `npm run typecheck` |
| Desktop/browser/interaction/accessibility suite | 22 passed | `audit/test-results.json` |
| Full-page viewport matrix | 96 captures, all HTTP 200, no overflow, broken images or page errors | `audit/refinement/visual-matrix.json` |
| All Arabic routes in Chromium at 1440 × 1000 | 509 passed: RTL/lang, one H1, no overflow, loaded-image failures, page errors or invalid option children | `audit/refinement/arabic-all-routes.json` |
| Mixed Arabic/Latin/numeric prose scan | No remaining unisolated mixed text candidates in the rendered page bodies, including header/footer | Same Arabic route report; explicitly directed dates/native options are handled separately |
| Detail and control review | 28 detail pages plus both-language profile next/back controls; no failures | `audit/refinement/detail-pages.json` |
| All bilingual routes over HTTP | 1,018 returned 200 | `audit/refinement/route-check.json` |
| Runtime asset references | 1,655 checked; no missing files | `audit/asset-validation.json` |
| Marquee | Both languages: every mark present, equal joined duplicate groups, viewport covered at 0/25/50/99.9999% of the cycle; pause/reduced-motion checks pass | `tests/redesign.spec.ts` and test results |

The homepage was reviewed from top to bottom in Arabic, then English, at **1920, 1728, 1440 and 1366** pixels. Full-page captures plus readable chapter crops were used to review section identity, hero composition, whitespace, sector separation, logo quality, Arabic text and metric ordering. The eleven other major destinations were inspected through the four-width image matrix. Additional detail views cover all six sectors, logo and text-only brand records, Arabic and English source product records, an article, historical profiles and privacy.

Retained captures: `audit/screenshots/refinement/`. File names identify route, locale and width; `section-*` files show the homepage chapters at 1440. `detail-*` indices map to the route order in `audit/refinement/detail-pages.json`. Intermediate contact sheets/crops are ignored because they reproduce the retained captures.

Defects found and fixed during review: low-contrast legacy caption and two sector labels; English hero wrapping at 1920; Arabic area-unit ordering; profile download/counter punctuation; Arabic time-range isolation; mixed-text fragments becoming separate flex items; invalid HTML wrappers inside SVG labels causing Arabic map hydration errors. The final build and browser checks were rerun after the fixes.

Accessibility automation covers home, catalogue, contact and distribution in both languages. It is supplemented by keyboard menu/map checks and visual review, not represented as a complete manual accessibility certification.

## Content preservation

`content/` and `public/assets/` are byte-for-byte unchanged from the prior committed redesign. All 394 original product records, 50 directory names, 33 stories, nine marketing destinations, seven PDFs and five profile viewers remain accessible. No importer was rerun and no record/source asset was deleted. Previous audit inventories and Git commits remain intact. Historical contradictions remain attributed; archive record counts are not presented as active operating totals.

## Performance

Local Chromium, production server, 1440 × 1000, fresh browser context per route, no CPU/network throttling. These are local lab observations, not field Core Web Vitals or an external-network guarantee.

| Route | LCP | CLS | JS transferred |
| --- | ---: | ---: | ---: |
| `/en` | 40 ms | 0.00024 | 161.7 KB |
| `/ar` | 48 ms | 0.00433 | 161.7 KB |
| `/en/products` | 40 ms | 0.02959 | 161.7 KB |
| `/ar/products` | 40 ms | 0.04585 | 161.7 KB |

See `audit/performance.json`. Hero photography is prioritised; lower chapters remain lazy; no animation package was added.

## Reproduction

```sh
npm run build
npm run start -- --port 3001
# In another terminal:
npm run lint
npm run typecheck
TEST_BASE_URL=http://localhost:3001 npm run test:e2e
node scripts/refinement-visual-qa.mjs
node scripts/arabic-refinement-qa.mjs
node scripts/refinement-detail-qa.mjs
node scripts/verify-routes.mjs
node scripts/verify-assets.mjs
node scripts/performance-qa.mjs
```

Dedicated mobile design remains deferred. The original live website and production domain were not modified. The enquiry form still prepares an email draft; QA sent no message. This refinement is saved separately on `main` in the existing repository and checkout.
