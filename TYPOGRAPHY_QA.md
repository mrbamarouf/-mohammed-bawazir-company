# Typography correction

## Diagnosis

The reported phrase “من التوريد إلى الرف.” was reproduced in the real Distribution page in Chromium and WebKit. Chromium's platform-font inspection confirmed **Noto Sans Arabic SemiBold**, a downloaded custom face, not a fallback. The same tight reh/yeh positioning appeared with the original, otherwise valid font in both engines; disabling its kerning in an isolated diagnostic comparison changed that positioning. The fix replaces the Arabic family rather than disabling shaping features or spacing individual letters.

- Original Arabic WOFF2 files decode correctly, match their TTF character coverage (1,561 code points), contain GSUB/GPOS and declare real 400/500/600/700 weights. They are static Noto Sans Arabic 2.012 faces: no runtime variable axes, incorrect MIME/format, synthetic-weight selection or corrupted subset was involved in the reported heading.
- The reported heading and its inline child had normal letter spacing, zero additional word spacing, normal OpenType features, weight 600, no text transform and no fallback. The issue was not caused by wrapping, bidi splitting, the mobile reveal, a scale transform or a failed font load.
- Other components did contain broadly scoped tracking and aggressive Latin heading tracking. Those system-level risks are corrected as well.

## System correction

Arabic now uses **Readex Pro**, designed by Thomas Jockin and Nadine Chahine, throughout the website and for Arabic records displayed inside English pages. Its open geometric forms and clear joins were selected against MBT's corporate signage and existing logo, then compared in real page captures. [Upstream project](https://github.com/ThomasJockin/readexpro).

`public/assets/fonts/readex-arabic-{400,500,600,700}.woff2` are complete static instances, generated from a pinned upstream Google Fonts file with `wght` set to each real weight and `HEXP` fixed at its native default, 0. No glyph subsetting, outline edits or custom spacing tables. GSUB and GPOS are retained. All Arabic characters occurring in the content files are covered. `scripts/fonts.py` verifies the source SHA-256 and reproduces the files; `audit/typography/font-manifest.json` records provenance, coverage and checksums. The OFL license ships with them.

- `app/typography.css` loads after component styles. Both root layouts import the same styles in the same order, preventing production CSS chunk hoisting from moving the typography rules ahead of legacy mobile rules. All Arabic language contexts prohibit artificial letter/word spacing, including inline Arabic inside English UI. Real font weights are used with `font-synthesis: none`.
- Native kerning and ligatures remain enabled. No forced glyph substitutions, manual spaces between letters, or per-sentence correction.
- `BidiText` carries semantic language and direction on complete script runs, and isolates embedded Latin names/numerals, including the leading + in international phone numbers. Bilingual error/404 content also declares each language, and the retry label wraps as one button label. Product headings and catalogue titles identify the original record language. English product headings use the same Latin font in both interfaces.
- Arabic heading leading and mobile hero scale accommodate the new face. Major headings balance their lines; desktop-only hero breaks no longer force mobile orphans. Latin negative heading tracking is reduced to a restrained -0.015em.
- The two critical body/display face files are preloaded per locale. All assets remain self-hosted and only used weights load.
- Layout, company facts, routes, images and interactions are retained. This intentionally changes typography on desktop as well as mobile, as requested.

## Acceptance evidence

The reproducible `scripts/typography-qa.mjs` visits all public prerendered routes in each engine and resizes each to **320, 360, 375, 390, 393, 414, 430, 1366, 1440, 1728 and 1920px**. It checks actual DOM text styles, loaded fonts, horizontal overflow, heading range geometry, isolated punctuation and potential final-word orphans. Potential orphans are visual-review candidates, not automatic proof of a defect. Connected Arabic glyphs intentionally touch, so a blanket bounding-box overlap test would be invalid.

Unique headings, paragraphs and metadata are captured at their real page positions at 320 and 1440px with a small crop margin so ink overhang is not mistaken for clipping. Shared page templates are also captured with normal image loading, full pages and open controls. Diagnostic and full-resolution visual evidence stays local under `audit/typography/`; concise final results are recorded alongside the font manifest.

Browser engines are real Chromium and WebKit, with desktop/mobile viewport emulation. Physical iPhone/Android hardware is not available; the review is not a claim about every browser/device combination.

### Completed review — 29 September 2026

- 1,018 public routes (509 per locale), at all 11 requested widths, in Chromium 153.0.8010.12 and WebKit 26.6: **22,396 route/width checks**. No failed routes, browser errors, font failures, horizontal overflow, Arabic tracking/synthesis violations or heading geometry/punctuation/orphan candidates remained.
- **10,982 unique text captures** were generated across the two engines at 320/1440px. The distinct mobile text corpus from every public route was visually reviewed in readable contact sheets; desktop heading sheets and actual page contexts were reviewed as well. Shared repeated navigation/footer content was reviewed by template.
- **968 full-page captures** with normal images/network loading cover 22 representative routes, both locales, every requested width and both engines. No missing images, horizontal overflow or missing/duplicate primary headings were detected. Homepage width sheets, forms, footer, profile controls, menus, expanded filters and long article text were visually inspected.
- All four weights, Arabic diacritics/joins/lam-alef forms, Latin kerning/ligatures, numerals, units and mixed-script phone order were checked in additional browser-only specimens; real 404 pages and the production error component were reviewed: **132 checks passed**. Specimens never ship as public routes.
- Functional regression suites: **49/49 Chromium** and **15/15 WebKit**. Final typography regression tests after the error-page and phone-isolation corrections: **6/6 in each engine**, including a production CSS ordering regression check. Build, lint and TypeScript checks passed.
- No remaining typography defect was observed in the reviewed screenshots. This describes the tested pages, sizes and engines, with the physical-device limitation above.

Machine-readable totals: `audit/typography/summary.json`. Large raw captures stay local in `audit/typography/final/`, including per-engine text crops, desktop/mobile contact sheets, normal-network full pages and additional specimens.

After correcting production CSS chunk ordering, the entire 22,396-state matrix was rerun. It again had zero failures, and every recorded heading font/style/line metric matched the original visually reviewed corpus. A dedicated 320px hero/English tracking regression test guards this build-specific issue.
