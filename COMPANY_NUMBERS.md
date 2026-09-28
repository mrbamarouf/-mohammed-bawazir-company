# MBT company numbers — source review, 28 September 2026

The interface reports selected figures **as stated in the 2026 company profile**. They are dated company statements, not live operational counters or independently audited present-day totals. No figure from a different edition is added to them.

## Primary evidence

- [Official 47-page company profile](https://www.mbtksa.com/wp-content/uploads/2026/06/MBT-Profile-2026-v2.pdf), downloaded again on 28 September 2026. The file name/media title identifies the 2026 edition; its brand timeline also reaches 2026. Physical PDF page numbers below are one-based.
- [Official media record 36714](https://www.mbtksa.com/wp-json/wp/v2/media/36714): uploaded and modified **10 June 2026, 08:05:26 GMT**, according to `date_gmt`/`modified_gmt`. This is the publication metadata, not a separate date of operational verification. Saved response: `audit/refinement/profile-media.json`.
- Existing local copy: `public/assets/history/3121b64-MBT-Profile-2026-v2.pdf`. Re-downloaded SHA-256 matches: `96e7ca72ac15dad3bc5a8f0252ab988e4183a3378b02bbc6c0b0e37153671b85`.
- Pages were rendered and read visually because the PDF is image-based. Full-resolution evidence for the main figures is retained in `audit/refinement/profile-2026/detail-05.png`, `detail-10.png`, `detail-20.png`.

## Page-level fact ledger

All rows from the PDF share the June 2026 publication metadata and 28 September 2026 review date above.

| Fact | Source | Evidence and decision | Interface use |
| --- | --- | --- | --- |
| Established 1987 | PDF p. 4; official English/Arabic website introductions | Consistent foundation year. Avoid anniversary calculations. | Hero, legacy, company journey. |
| 12 business partners | PDF p. 5 | Label is business partners, not number of brands. | First journey stage, explicitly linked to p. 5. |
| 60 product categories | PDF p. 5 | **Not 60 brands.** Source wording must be preserved. | Recorded here; not used as a brand counter. |
| 326 SKUs | PDF p. 5 | Dated profile statement. Does not equal the 394 archived bilingual product records. | Recorded here; catalogue continues to say product records. |
| Approximately 7,286 direct outlets | PDF p. 5 | Retain approximation; do not mix with website's 6,280 / 18,000 statements. | Company scale and retail stage. |
| 16 warehouses | PDF pp. 5, 10 | Repeated within the same document. | Company scale, warehousing stage. |
| 38,000 m² warehouse space | PDF p. 10 | Profile's warehouse-space figure. | Company scale and warehousing detail; Arabic unit written out clearly. |
| 144 fleet vehicles | PDF p. 10 | Total fleet; not all are refrigerated. | Company scale and distribution stage. |
| 83 refrigerated vehicles | PDF p. 10 | Subset of the 144, never added to the total. | Supporting fleet caption. |
| 446 employees | PDF p. 20 | Dated company-reported headcount. | Research ledger; no live headcount claim. |
| 121 sales and marketing staff | PDF p. 20 | Subset/team figure, not additional total employees. | Research ledger. |
| 6 branches versus 7 mapped cities | PDF pp. 5, 20 state 6; p. 9 map labels Jeddah, Tabuk, Khamis, Dammam, Riyadh, Madinah, Buraidah | Internal inconsistency; do not claim a verified active branch total. | Named-city directory retained with source attribution; no total. |
| More than $141m contribution | PDF p. 5 | Wording does not establish annual revenue or reporting period. | Withheld from promotional metrics. |
| 6 website business areas | Official website's division structure, reviewed 28 September 2026 | Food, beverages, household/consumables, tobacco, personal care, pharma. PDF p. 22 groups areas more broadly. This is website information architecture, not a claim about legal divisions. | Six sector destinations and hero description. |
| Current brand total | No unambiguous current official total found | Partners, product categories, portfolio names and logo count are different concepts. | No current brand-total claim; all 50 source-backed portfolio names and 37 usable official marks retained. |
| Geographic presence | [Official branch directory](https://www.mbtksa.com/about-us-2/our-company/our-branches/); Arabic branch records and PDF p. 9 | Source-named Saudi cities retained. Jizan originates in the Arabic directory; conflicting addresses/phones remain withheld as documented in CONTENT_REVIEW.md. | Existing map and attributed city directory retained. |

## Conflicting and historical evidence

[Official About page](https://www.mbtksa.com/about-us-2/) and homepage material were checked read-only. The text mixes 8 branches, 15 partners, 236 SKUs, $155m and a growth reference to 2012; it also mentions 12 warehouses / 120,000 m² and different outlet counts. The page does not establish a current measurement date. These are not used as current company scale.

The [company LinkedIn page](https://www.linkedin.com/company/mohammed-bawazir-for-trading-co-ltd) has undated summary figures that disagree with the 2026 document, including branches, SKUs and company-size range. They are not used. Aggregator employee estimates also disagree and are not treated as authoritative evidence.

2017, 2018/viewer, 2022, 2024 and 2025 material remains available as historical content. Uploading an old slide deck later does not make its operational figures current. No historical total has been blended into the 2026 metrics.

## Correction to the earlier local audit

The earlier local review incorrectly transcribed the June 2026 PDF as “60 brands / 7 branches / $140m”. Direct visual re-reading of the **same bytes** corrects that account. The source did not change. The 2026 page-level ledger above supersedes those numerical statements, and CONTENT_REVIEW.md / RE_AUDIT.md now point here. All original documents and Git history remain intact.

## Publishing rule

`lib/company-facts.ts` holds the selected company-scale data. The scale panel links its visible “2026 company profile” attribution to the retained PDF. Journey stages link to the corresponding PDF pages. Future updates must replace the dated set together after source verification; never silently relabel it as current or use archive record counts as active operating totals.
