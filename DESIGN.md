# MBT desktop flagship — refinement

Retains the accepted elements of the second direction and replaces its rejected hero. Voice: **established, commercial, precise**. Reference register: an international distribution group's annual report and operational signage; authentic Saudi trading history, never a fashion portfolio.

## System

White #fff, ink #17221e, dark #0b211a, official-family green #087447, warm paper #f3f2ed, restrained bronze #9b7845. Distinct chapter surfaces: architectural deep green, warm ivory, muted mint, logo white, operational dark green, product-family colour, forest green, editorial white, news dark green, closing brand green. Archivo Latin display, Manrope body, Readex Pro Arabic. Solid sans headings (no editorial italic serif); 48–72px Latin hero / 44–64px Arabic hero, 38–56px section headings, body 16–18px, minimum 13px supporting UI. Arabic line heights and columns composed independently. 12-column desktop grid with 64px gutters at 1440, proportional at 1366/1728/1920. No dedicated mobile work this cycle.

## Homepage composition

Single photographic hero: authentic headquarters building, deep green editorial field, prominent official mark with company-supplied transparent bilingual wordmark artwork, 1987, global brands and Saudi trading/distribution across six website business areas. No collage, generated image or logo redraw. Dated company-scale band states 16 warehouses / 38,000 m² / 144 fleet vehicles / approximately 7,286 direct outlets, explicitly attributed to the 2026 company profile. Six substantial business panels, each supported by relevant actual brands, products or imagery. Two genuinely seamless logo tracks using all usable directory marks, opposite directions, hover/focus/pause and reduced-motion static layout. Saudi network with source city centres and labelled schematic connections, paired with a six-step value chain using page-linked 2026 evidence, the official MBT mark, and an unnumbered everyday-life outcome. Product shelf using source-native transparent objects, category controls and catalogue access. Authentic historic photographs and dated milestones, group ecosystem, then actual news. Confident rectangular/text actions in final green statement.

## Interaction and templates

One small horizontal directional glyph, line and text; forward/back navigation follows the local writing direction. Download and back-to-top use vertical arrows without RTL reversal. Arabic Latin names, quantities, years, dates, slashes and time ranges use direction isolation, including source-language product titles. No diagonal arrows, circular CTAs or tilted product cards. Compact page intros are informative mastheads, not empty displays. Business destination image/brand evidence; logo directory with large normalized marks; product catalogue dense, searchable and category-filtered; About proof/photography/history; Companies true official logos; News dates, filters and all history; Contact practical direct details and enquiry mail draft. Preserve existing keyboard, error, empty and focus states.

## Truth and assets

Use RE_AUDIT.md and COMPANY_NUMBERS.md. Only selected dated profile facts are published, with visible attribution; branch totals, turnover and current brand totals remain withheld. Directory is a published/historical portfolio, not a claim all entries are currently exclusive. Natural Earth Saudi boundary, markers are city centres, connectors schematic. Only authentic company photography or neutral design; no synthetic infrastructure. Source assets retained separately from reviewed clean presentation derivatives.

## Acceptance

Browser review the entire homepage in Arabic then English at 1920,1728,1440,1366, plus eleven major destinations in both languages. Visit all 509 Arabic routes for structural/RTL checks and review shared detail templates visually. Check actual decoding, correct logo-name mapping, visible product contours, type contrast, real RTL, overflow, filters, links, archive access, marquee group geometry and pause/reduced motion. No preload of hundreds of products. No animation dependency. Preserve previous commits; commit this refinement separately.

## Dedicated mobile composition, September 2026

The approved desktop remains the visual baseline. `app/mobile.css` scopes the dedicated composition to 767px and below. It reuses the original semantic headings, official imagery and shared data; extra mobile controls are hidden above the breakpoint. Desktop content order is retained through a `display: contents` wrapper.

Mobile opens with a compact 68px logo/menu/language header, composed headline, full-width headquarters photograph, overlapping 1987 ledger and direct business action. A two-by-two scale ledger leads into both seamless brand tracks, then six full-width sector chapters. The product shelf offers a focused object and a visible next item with native horizontal snapping. Distribution becomes a vertical chain and an eight-city touch selector instead of a miniature map. A vertical history, swipeable group companies, large editorial news and actionable green closing finish the story. Insets use safe-area values; the menu fills the dynamic viewport. Reduced motion disables introductory and marquee motion.

Navigation state lives in URL parameters, including catalogue search/category/brand/division/limit, news year/search, brand search/division, featured family, profile page and network city. Language switches keep the corresponding path and query, restore the dominant visible semantic section after layout settles, and skip the one-time mobile introduction. Dates displayed by the news client are formatted on the server to avoid WebKit/Node Arabic punctuation differences.

The catalogue's initial server payload contains only 24 product records. Further filters/pages use `/api/catalogue` with cancellation, bounded requests, a small navigation cache and retry feedback. Stale results become inert while a request is pending. Existing product records, factual content and desktop presentation are retained.

## Typography correction, September 2026

Arabic uses complete self-hosted Readex Pro static faces at 400/500/600/700, with native OpenType shaping and no artificial letter/word spacing. Font synthesis is disabled. Script language and bidi isolation follow the content, including original Arabic records in English pages; English product titles use Manrope in both interfaces. Arabic headings have sufficient leading; Latin heading tracking is restrained to -0.015em. Desktop hero line breaks are removed on mobile so headings can balance as complete sentences. See `TYPOGRAPHY_QA.md` for the reproduced font-positioning issue, diagnosis and browser evidence. This is a shared typography correction, preserving page composition and verified content.
