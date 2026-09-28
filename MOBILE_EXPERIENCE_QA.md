# MBT application-style mobile experience

The production pass follows the attached eight-screen reference using the existing verified MBT data and authentic assets. It preserves the desktop composition and the static Readex Pro, Archivo and Manrope font system.

The starting checkpoint was clean and already pushed: `b04198ad716b41e76c816cffb145cab2a41cde0d`, `main`, the existing `mrbamarouf/-mohammed-bawazir-company` repository. No repository, local project, Vercel project, client-domain configuration or source website was created or replaced.

## Implementation

- `app/tokens.css` owns the MBT green palette. The final contact chapter, controls, maps and navigation use the same primary/deep/dark family. Partner artwork is unchanged.
- A 6.2-second SVG/CSS identity introduction has independently composed desktop and portrait routes. The official MBT artwork leads into the existing hero. Skip, Escape, reduced motion and session persistence are built in. Internal entries and locale changes mark the session seen. A pre-paint bootstrap prevents an initial white flash and has a failure timeout.
- Mobile uses the centered official mark, an immersive headquarters hero, four verified statistics, six sector navigation rows, dark brand tracks and a featured-brand carousel, a touch catalogue, a native filter dialog, a portrait Saudi network, a chronological story and a news feed. Four bottom destinations remain clear of safe-area content. Fullscreen navigation supports scroll, Escape, focus restoration and language changes.
- The Saudi boundary and eight branch-city coordinates come from the existing verified geometry and company data. Three principal city labels are direct map controls; every city is accessible through the city selector and keyboard arrows. Connections are explicitly schematic, not claimed road routes or office coordinates.
- Product results remain bounded to 24 initially. URL-based query/filter state and equivalent language routes remain intact. Existing product names and original record languages are retained.
- The previous text-only favicon now embeds the authentic official artwork.

## Verification evidence

The small JSON reports in `audit/mobile/app-*` record the measured results. Large screenshots and complete typography reports remain local, reproducible using the committed scripts.

- Mobile: 320, 360, 375, 390, 393, 414, 430 pixels, Arabic and English, Chromium and WebKit; 22 representative routes including six sectors, brand details, both product-record languages, news detail, profile, careers, contact, companies and marketing. 616 full-page captures plus focused follow-up captures.
- Additional short/long and landscape viewports: 320×480, 390×667, 430×932, 667×375, 844×390. Menu scrolling, the bottom bar and desktop containment are covered by interaction tests.
- Desktop: 1366, 1440, 1728, 1920 pixels, both locales, 12 main routes, both engines. The 96 Chromium before/after states retain all inner-page heights; home differs by one CSS pixel from inline markup rounding. No overflow or missing visible images.
- Typography: every one of 1,018 public routes at all 11 widths in both engines, 22,396 states, followed by focused rechecks of changed mobile headings. Real font files are loaded during the sweep. The structural checks cover font synthesis, Arabic tracking, heading bounds, punctuation and orphan candidates. Actual normal-network screenshots and intro frames supply the visual review.
- Functional coverage includes the full AR/EN route matrix, query and reading-context preservation, product search and pagination, filter dialogs, map selection, back/forward, refresh, intro timing/skip/persistence, reduced motion, marquee coverage and pause, enquiry validation, profile navigation and WCAG A/AA checks.
- WebKit represents browser-engine testing on this Mac; this is not a claim of testing physical iPhones.

The synthetic mobile performance sample uses Chromium at 390×844, DPR2, 4× CPU slowdown, 150ms latency and 1.6 Mbps download. Its figures are lab observations, not field Core Web Vitals. No animation library or new runtime dependency was added.

## Release

The release uses the existing Vercel project `mohammed-bawazir-company`. The review hostname is `https://mohammed-bawazir-company.vercel.app`. Release completion requires the remote Git SHA to match the ready deployment and an additional real-browser sweep of that live hostname. Live receipts are kept locally under `audit/mobile/deployed-app/`.
