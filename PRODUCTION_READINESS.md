# Production readiness, 28 September 2026

This pass separates company communication from internal research, preserves Git history and uses the existing Vercel project `mohammed-bawazir-company` connected to `mrbamarouf/-mohammed-bawazir-company`. The client domain and WordPress installation are outside this deployment.

## Public communication

Source/reference links, provenance warnings, archive language and extraction notes have been removed from public components. Brand descriptions, business sectors, distribution, leadership, news, careers and privacy use customer-facing company language. Source fields stay in internal JSON and are stripped before client component serialization.

The company profile experience presents the verified June 2026 PDF and all 47 pages, with correct download, previous/next and RTL semantics. Its PDF hash remains the verified original. Superseded PDFs and slide decks are retained in `audit/internal`, outside `public`; legacy profile routes redirect to the current profile or the relevant company section.

Empty marketing destinations now explain the company's operations and show relevant company photography. Sales structure, field sales and distribution resources have distinct content; a duplicate image and a closing presentation slide stay out of the public gallery. Filters no longer expose source-record language. Only exact product duplicates with matching image, name, description, brand and language are consolidated in results; all 394 product records and their original routes remain. Eleven missing product packshots were restored from unambiguous matching official product URLs; the evidence is in `audit/production/recovered-packshots.json`. Products without a recoverable packshot show the official brand/company identity, without inventing a product photograph.

The inaccessible legacy HR portal is replaced with an email enquiry to the existing company address; no application or message is sent during QA.

## Verification

Run the production build, lint, TypeScript and Playwright suite. `scripts/production-site-qa.mjs` checks every bilingual route in Chromium, including public copy, legacy links, bidi isolation, overflow, runtime/console errors, internal links and asset responses. `scripts/production-visual-qa.mjs` captures the major destinations at 1920, 1728, 1440 and 1366 pixels, Arabic before English. The `TEST_BASE_URL` and `QA_RUN` variables repeat the same checks against Vercel.

Reports live in `audit/production/local/` and `audit/production/deployed/`; large browser screenshots and deployment-only evidence remain available locally and are excluded from uploads. Internal research and QA files are excluded from CLI uploads through `.vercelignore`.

Indexing remains disabled for the review deployment. Metadata uses the deployment's own URL. No client production domain or DNS change is part of this work.

Local production verification: build, lint and TypeScript pass; 1,018 browser routes and 1,298 public image/document URLs pass without failures, public research copy, overflow or console errors. The visual matrix contains 96 major-page captures across both languages and all four requested desktop widths; detailed review covers all six sectors, product/brand/article detail, every marketing gallery, privacy and legacy document redirects.
