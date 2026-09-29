# Final client-delivery review — 29 September 2026

## Scope and factual boundaries

The checkpoint is `a48d5e02d396c14102607a8ec191b53fed5d93b9` on the existing repository's `main`. This pass preserves the approved desktop/mobile direction. It updates the map composition, intro identity/reload logic and bilingual editorial presentation. The client domain, WordPress and DNS are outside the deployment scope.

Content reviewed: public page templates, six sectors, 50 brand records, 394 product records, 83 catalogue categories, 33 news records, marketing galleries, company/profile content, leadership, navigation, forms, search/filter states, errors, metadata and downloads. Product names preserve their recorded language and are marked with the correct `lang` and bidi isolation even on the other locale's page.

Facts retained from the collected official material and 2026 company profile: established 1987; 16 warehouses; 38,000 m²; 144 distribution vehicles including 83 refrigerated vehicles; approximately 7,286 direct points of sale. No disputed aggregate brand or branch count is presented as an operating statistic.

The existing eight-location dataset is unchanged: Jeddah, Riyadh, Dammam, Tabuk, Qassim/Buraydah, Madinah, Khamis Mushait, Jizan. A location is a city-level marker, not a precise building coordinate. Lines represent schematic connections, labelled accordingly. Jeddah remains the verified headquarters and existing visualization origin.

Primary factual references (read-only):
- https://www.mbtksa.com/
- https://www.mbtksa.com/contact-us/
- https://www.mbtksa.com/about-us-2/our-company/our-branches/
- https://www.mbtksa.com/about-us/our-company/our-branches/
- https://www.mbtksa.com/about-us-2/our-company/meet-our-teams/
- The collected 2026 official company profile, published unchanged as `/assets/documents/MBT-Company-Profile-2026.pdf`.

The current English leadership page conflicts with the older Arabic/project record for the HR manager. The uncertain named HR entry was withheld; no replacement was guessed. Five consistent leadership entries remain. Historical articles retain their dates and do not establish current leadership roles.

## Editorial decisions

Arabic was edited independently for natural Saudi corporate usage. English uses concise international business language and consistent British spelling. Descriptions identifying a brand merely as a record on a website/profile were replaced with verified product categories or a straightforward enquiry invitation where source detail was insufficient. No exclusivity, market leadership or unsupported capability was added.

Raw `content/products.json` names, identifiers, slugs, source URLs and category identifiers are preserved. `lib/product-copy.ts` supplies the edited public display: spelling, grammatical word order, proper names, sentence case, dimensions and units. Search accepts both original and edited names. Duplicate name-only descriptions are omitted.

Conflicting or malformed pack attributes are withheld from the display for records 34405, 6498, 34448, 6488, 34443, 6478, 34388, 35777, 35775, 35727, 35723, 35721 and 35715. The unitless `+ 1.8` in 35789 and mistranslated packaging word in 9852, 9849 and 9847 are also withheld. The ambiguous imported “All Spices / جميع البهارات” label is presented as spices without inferring a blend or a specific botanical spice. Product identity and legitimate route remain available; specifications can be discussed through the existing enquiry CTA. Quantities outside these exceptions are preserved and tested. Record 5173 is discoverable under its named Bull Dose beverage brand rather than its erroneous imported Pons classification.

All 83 raw category IDs have explicit Arabic and English public labels. Raw import suffixes and misspellings no longer appear in category controls. Product translations are not invented to fill missing source information.

The contact form accurately describes an email draft requiring the visitor to send it from their email application. It does not claim server delivery. Careers links to the verified company contact email rather than advertising nonexistent vacancies or sending visitors to the unavailable historical HR service.

## Controlled vocabulary

| Concept | Arabic | English |
|---|---|---|
| Company | شركة محمد باوزير للتجارة / MBT | Mohammed Bawazir Trading Company / MBT |
| Business sectors | قطاعات الأعمال | Business sectors |
| Brands | العلامات التجارية / علاماتنا | Brands |
| Products | المنتجات | Products |
| Distribution network | شبكة التوزيع | Distribution network |
| Warehouses | المستودعات | Warehouses |
| Distribution vehicles | مركبات التوزيع | Distribution vehicles |
| Direct outlets | منافذ البيع المباشر | Direct points of sale |
| Branches | الفروع | Branches |
| Partners | الشركاء | Partners |
| Company profile | الملف التعريفي للشركة | Company profile |
| News and events | الأخبار والفعاليات | News & events |
| Careers | الوظائف | Careers |
| Contact | تواصل معنا | Contact us |
| Customers | العملاء | Customers |
| Country | المملكة العربية السعودية / المملكة | Saudi Arabia |

Short navigation labels are contextual abbreviations, not alternate concepts.

## Map and intro implementation

`lib/saudi-map.ts` contains the shared unchanged projection and all four polygons/rings from `content/saudi-geometry.json` (14, 26, 388 and 8 vertices). Desktop and mobile render identical geographic path data. Mobile extends vertical space for southern labels; eight 44px or larger callouts link to actual projected city points and the synchronized location panel/list.

The intro uses the original transparent 550×202 PNG `/assets/mbt/78224d6-mbt-png-logo.png`. It is not recoloured, cropped or redrawn. The small white portion within the official artwork is intrinsic; no white container was added. Direct original-image loading avoids needless recompression. Desktop width is 360px; mobile width is responsive up to 260px. The route animation converges on the mark before the corporate statement. Full duration remains approximately 6.2 seconds; reduced motion is approximately 1.1 seconds.

The before-paint bootstrap uses the document's PerformanceNavigationTiming type. A real reload always plays, including after Skip and on inner pages. Normal SPA navigation does not execute the bootstrap again. Locale navigation and history traversal do not replay. `pagehide` closes an in-progress dialog before a possible back/forward cache restore. Storage failure does not prevent detecting a reload.

Reference: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming/type

Quantity/unit pairs remain together across line breaks through the shared `BidiText` renderer. Rapid filter/location selections update immediately while History API writes are coalesced at 300ms to stay within Safari’s rate limit; a locale switch reads the pending selection as well as committed URL state.

Live verification also exposed a slow-network navigation race: a queued History API write could supersede a link transition before its response arrived. Pending writes are now cancelled after an internal link handler consumes the current query. Regression coverage delays both locale and product-route responses to verify that navigation completes with the selected city preserved where applicable.

Desktop and mobile also share URL-backed city selection. A direct city link, locale change or viewport transition retains the same location panel instead of resetting the desktop map to Jeddah. Both language directions are covered by the delivery tests.

## Verification evidence

Reproducible checks: `tests/delivery.spec.ts`, the existing Playwright suite, `scripts/typography-qa.mjs`, `scripts/mobile-visual-qa.mjs`, `scripts/desktop-preservation-qa.mjs`, and `scripts/live-experience-qa.mjs`.

Raw screenshots and exhaustive geometry reports stay in ignored local audit folders. A compact release QA receipt is retained in `audit/delivery/qa-summary.json` after completion. Live receipts are written after deployment and identify the final Git SHA and Vercel deployment ID without creating another release commit.
