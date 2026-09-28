# Content review register
Audit date: 2026-09-28. Source: https://www.mbtksa.com/. The existing site was read only.

| Topic | Source evidence | Decision |
|---|---|---|
| Foundation | English and Arabic homepages state 1987. First employee entry starts in 1986. | Use established 1987, avoid employee tenure calculation. |
| Scale | English homepage mentions 8 branches, 15 partners, 236 SKUs, $155m turnover, 65% molasses share, and 24% growth in 2012. Animated counters differ. | Do not publish these as present-day facts. Catalogue item count means source records, not active SKUs. |
| Branches | English branch page lists HQ plus 7 regional locations; Arabic additionally lists Jizan. | Show named cities with source attribution, Jizan marked Arabic-source listing. Do not claim an independently verified active branch total. |
| Branch addresses | Riyadh, Qassim and other branches repeat “Tabuk Madina Road”; Khamis phone repeats Jeddah; Jizan phone malformed. | Preserve raw source in audit, withhold contradictory address/phone fields. Route regional enquiries through verified HQ. Map points indicate city centres, not warehouse locations. |
| Leadership | English lists Raghad Bawazir (CEO), Fawzi Mohammed Bawazir (General Manager), and directors; Arabic list differs and older articles use other roles. | Label leadership as published in company source, retain bilingual source entries, request current confirmation before production launch. |
| Historic profile | Embedded company profile is named Company Profile 2018, saved by old plugin in 2022. | Preserve as an explicitly dated archive, never infer current numbers from it. |
| Divisions | Source contains Food, Beverage, Consumables/Household, Tobacco, Personal Care, Pharma and Promo Insight; homepage emphasizes fewer. | Preserve all significant business areas; Promo Insight lives under affiliated companies. No unsupported current exclusivity claims. |
| News | WordPress post dates can differ from event dates mentioned in titles. | Retain publication dates. Event year remains in source title/copy. |
| Health wording | Some news claims sweeteners are “safe and healthy”. | Report activity factually without endorsing medical efficacy or safety claims. |
| Career form | Official navigation points to legacy HR portal; no verified recruitment email. | Preserve official application link; do not invent jobs or a hiring mailbox. |
| Enquiry delivery | No authorized email transport credentials supplied. | Build validated enquiry composer that explicitly opens visitor's email application; never show false sent confirmation. |
| Historic media | Large library includes theme stock and duplicate product versions. | Inventory metadata; prioritize assets actually linked to company content. No fabricated logistics photography. |
| Production domain | Existing mbtksa.com must remain untouched. | No live-site writes, no domain configuration. Preview metadata stays noindex until deployment URL and launch are approved. |
| Additional profile versions | The 48-slide viewer and earlier editions remain separately archived. Its previous numerical transcription was not independently verified. | Do not transfer numbers between editions. The newly inspected 47-page June 2026 PDF has its own page-level evidence in COMPANY_NUMBERS.md. |
| Product sizes | Reem olive oil source records disagree (240 vs 250ml); vine leaves 1100 vs 1000g; some chicken/beef titles conflict with slugs. | Keep independent source records and source-language labels; do not auto-merge these products. |
| Deleted media | 81 URLs in the initial image download queue returned errors, including most older Promo Insight slides. All 11 White Gate profile images also returned 404. | Keep the complete failure ledger in audit/assets.json and audit/profiles.json. Render only available source pages; explicitly identify partial/unavailable profiles. |
| Public product permalinks | Some Arabic product pages return 404 while their public API records remain available. | Preserve their content and reference the accessible official API record from the new detail page. Original permalink remains in raw inventory. |
| Media count | 7,339 media records reported by API headers; 6,717 records actually returned from all 74 pages. | Preserve both counts, do not invent missing records. |
| Company source contact form | No source submission service is reused or called by the rebuild. | Enquiries are deliberate email drafts until a new transport is configured. |

| Archived PDF editions | Seven distinct PDFs remain preserved. The 47-page June 2026 PDF was visually re-read on 28 September 2026: p. 5 says 12 business partners, 60 product categories, 326 SKUs, approximately 7,286 direct outlets; p. 10 says 16 warehouses, 38,000 m², 144 fleet vehicles including 83 refrigerated; p. 20 says 446 employees. | Prior claims of 60 brands / 7 branches / $140m for this PDF were transcription errors, not a change in source. Use selected figures with explicit 2026-profile attribution; withhold the internally inconsistent branch count. See COMPANY_NUMBERS.md. |
| Historical related companies | 2017 PDF pp. 53–55 documents Promo Insight (2009), MBTech and White Gate (2005). | Preserve MBTech and the White Gate page as archival records. No unsupported current operating claim. |
| Shortcode galleries | 271 gallery attachment IDs were absent from the returned public media index; targeted include queries returned no corresponding public records. | Render recoverable photographs and retain original shortcode IDs in the raw page records. Do not invent missing images. |

| 2022 company profile | 47 pages; historical operating figures remain in the original document. Their earlier local transcription was not re-certified during this refinement. | Preserved as a downloadable historical source; totals are not promoted as current facts. |
