# Asset provenance

Company photographs, logos, product packshots and documents were downloaded read-only from publicly exposed `https://www.mbtksa.com/` media URLs for this authorized MBT rebuild. Ownership remains with the company and respective brand owners. No AI images or unrelated stock photographs were introduced.

- `audit/assets.json` maps official source URLs to local files, dimensions, sizes and source download errors.
- `audit/asset-queue.json` and `audit/profiles.json` additionally preserve the original profile-image references and download outcomes.
- `audit/pdf-downloads.json` covers seven downloadable PDF sources, including two distinct 2025 profile editions.
- `history/company-profile-2017-page-{53,54,55}.jpg` are unaltered full-page renders of the 2017 PDF, created solely to make archived company records readable in the web viewer.
- `mbt/logo.png` and `company/headquarters.jpg` are named copies of audited official assets for stable runtime paths. They are not newly fabricated branding or imagery.
- Originals are retained. Next Image serves size-specific WebP derivatives; PDFs are downloadable on demand and never preloaded.
- Old document images may contain out-of-date figures, addresses, roles and products. They are explicitly archival. See `CONTENT_REVIEW.md`.

Local fonts under `public/fonts/` are Manrope, Bodoni Moda and Noto Sans Arabic, supplied under their adjacent OFL licenses. The Saudi map boundary in `content/saudi-geometry.json` is derived from Natural Earth 1:50m public-domain data. Branch markers represent listed cities, not precise building locations; connections are conceptual.
