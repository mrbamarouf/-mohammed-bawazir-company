# MBT complete source re-audit — 28 September 2026

This is a second, independent, read-only crawl of https://www.mbtksa.com/. No request modified the live website. First-pass evidence and the three existing Git history checkpoints are retained.

## Method and scope

Fetched all public REST pagination again (English and Arabic records), public post types and taxonomies, both sitemap entry points and their children. Seeded the crawl with every published record, taxonomy permalink, both language roots and the previous 735 URLs. Collected header, expanded navigation, footer and body links **before** cleaning page text. Followed internal links until the frontier was empty (three depths, no depth cap). Inspected the live homepage/navigation in Chromium. Raw HTML is retained locally; inventories and comparisons are versioned.

| Status | Evidence / disposition |
| --- | --- |
| FOUND | 874 distinct HTML URLs; 836 HTTP 200, including 768 non-demo pages and 68 explicitly marked template demonstrations. 139 more URLs than the first crawl. Every URL is classified in `audit/redesign/page-inventory.json`. |
| FOUND | Published API: 101 bilingual pages, 33 posts, 394 products, 83 product categories, 12 post categories, 40 tags, 18 product tags. All existing record IDs remain present. No new published product or article IDs. |
| FOUND | Public media API returned 6,717 records across all 74 advertised pages, although its total header says 7,339. Locale/all probes reproduce the discrepancy. This is a source limitation, not 622 identified missing files. |
| DOWNLOADED | Rechecked 684 directly referenced / brand-related media URLs: 682 recovered, including 207 additional downloads. See `asset-comparison.json`. All original files retained. Four additional official MBT wordmark variants recovered; highest horizontal artwork is 834 × 109. |
| MISSING | 38 HTML responses are 404, individually listed in `crawl-comparison.json`. Product records remain available through the public API and are retained locally. Two generic client placeholder images return 404. |
| MISSING | Private WordPress menu endpoints return 401; no authentication was attempted. Public HTML navigation was fully collected instead. Historical White Gate and Promo Insight slide failures remain documented in CONTENT_REVIEW.md; recovered 2017 PDF pages remain available. |
| UNUSABLE | 68 template demo pages and unrelated TheGem, organic-food, real-estate, stock portfolio and demo-logo assets. Preserved in audit evidence, excluded from claims and interface. Low-resolution slide screenshots are archive material, not hero photography. |
| CONFLICTING DATA | Homepage, 2022, 2025 and 2026 profiles disagree on branches, partners, brands, SKUs and turnover. Do not merge these editions or present undated totals as live scale metrics. The later refinement visually re-read the June 2026 PDF, corrected earlier transcription errors, and publishes selected figures explicitly as reported in that edition; see COMPANY_NUMBERS.md. Established 1987 is consistent. Six named business areas are supported by the site's division structure. |
| CONFLICTING DATA | Website leadership and recent PDF leadership differ. Preserve dated source attribution; do not infer current officeholders. Medcity page artwork says Madinat Dawaa and its prose references a Florida pharmacy. Withhold that logo rather than misidentify a company. |

## Important defects discovered in the local asset mapping

Visual comparison exposed incorrect logo assignments: NutriSari → Falcon, Bull Dose → Indo Coal, Mayora → Bright, Indo Coal → Tropicana charcoal, Falcon → Golden Coal. Corrected from the official page attachment IDs / inspected brand artwork. Recovered MDSF and Reckitt logos, plus MyMi, Axis and Bright. Distinct charcoal brands remain distinct. Text-only names remain where no reliable standalone mark is available. Elmore, Viva, Exotica, Tiger Pro and Carina artwork exists in the historical official media; these are explicitly presented as portfolio/archive entries, not newly asserted active exclusive partnerships.

## Content destinations and completeness

- All 394 independent product records and 83 source category records retained, including Arabic/English differences; no artificial deduplication or invented translations of product names.
- Company, founders, mission, values, dated leadership → About; six sectors → Business and individual destinations.
- Full portfolio → searchable sector-filtered Brands, with original source and supported product relations.
- Branches / distribution tools / outlet coverage / handheld sales / sales structure → Distribution and Marketing archive.
- All 33 news/events and their galleries → News and dated article routes. Arabic titles are provided; untranslated historical source bodies remain clearly labelled English.
- In-store food, beverage, consumables, healthcare and tobacco galleries → Marketing; no gallery discarded merely to simplify the homepage.
- MBT, Promo Insight, White Gate and historical MBTech → Companies and profiles. Seven distinct downloaded PDFs / 251 pages and five viewer editions remain accessible; damaged source slide sequences are disclosed, not filled with fabricated slides.
- Contact address, telephone, fax, hours, postal address, official HR destination preserved. No fake jobs, product prices or shopping checkout.

## Asset preparation policy

Original files are immutable. Source-pixel cropping excludes inherited website frames; only edge-connected near-white pixels become transparent. Internal white lettering and packaging remain intact. No logo redraw, generated photography, generative reconstruction or upscaling. Already transparent official MBT horizontal artwork retains its authentic two-tone cartouche. Every prepared file, source, dimensions and crop is recorded in `audit/redesign/clean-assets.json`; visually review the generated contact sheets before release.

## Reproduction

`scripts/re-audit.py`, `scripts/asset-re-audit.py`, `scripts/prepare-assets.mjs`. These are audit/build utilities, not visitor flows. Audit limitations are stated above; completeness means all publicly reachable legitimate content, not access to private administration or inaccessible server files.

## Catalogue and artwork corrections during visual review

The second visual pass identified 69 records with missing local brand associations. Many source records were filed only under WordPress “Uncategorized”; the first importer had incorrectly defaulted these to household products. Discovery metadata now follows explicit brand names in the original product title, with a per-record explanation in `classification-corrections.json`. Original titles, IDs, links and source category IDs are unchanged. The directory now contains 50 documented names, including seven additional names confirmed directly by published product records. 37 have usable standalone artwork. The file named `alkareem.jpg` actually depicts **Carina / كارينا**; the directory correctly identifies the artwork, not its misleading filename. Current availability is not inferred from archive presence.

One near-white Reem container could not be separated from its white background without losing packaging pixels. That derivative retains the original photograph rather than damaging the product. It is not used in the homepage display. Other cleaned packshots were inspected in five contact sheets. No original images were deleted. Run `refine-catalogue.py` after `prepare-assets.mjs` to reproduce the reviewed discovery metadata.

## Final route and artwork verification

All 1,018 bilingual routes returned HTTP 200. Product 9782 had an imported Arabic slug truncated mid-encoding; its new stable slug is `9782-pastadoro-pasta`, with source URL and product title preserved. See `audit/redesign/route-corrections.json`. Mayora and Bull Dose crops were expanded after visual inspection to retain the complete official lettering and symbols. All 303 derivatives were reviewed through brand/product contact sheets and page screenshots.
