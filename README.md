# Mohammed Bawazir Trading Company

A desktop-first bilingual corporate website built with Next.js 16, React 19 and TypeScript. It is built in the original supplied local folder, whose name includes a trailing space. No second clone or worktree was created.

## Run

```sh
npm ci
npm run dev
```

Open `http://localhost:3000/en` or `/ar`. The root redirects to English. For the production server: `npm run build` then `npm start`.

## Content

- `content/products.json`: all 394 original product records, independently preserved. English/Arabic disagreements are not silently merged. Records retain source links, categories and original-language labels.
- `content/brands.json`: curated bilingual brand directory from official pages, product categories and profiles.
- `content/articles.json`: all 33 news/event records. Publication dates are distinct from event dates. Where an Arabic source body is unavailable, the original English text is identified explicitly.
- `content/archive.json`, `content/profiles.json`: activity galleries and preserved profile editions. Missing original assets are documented, not substituted.
- `lib/company.ts`: verified headquarters details, branch city references, divisions, navigation and independent Arabic/English text.
- `components/home.tsx` and `components/pages.tsx`: independently authored English and Arabic editorial copy, not runtime machine translation.
- `CONTENT_INVENTORY.md`: original page inventory and preservation decisions.
- `CONTENT_REVIEW.md`: conflicting, dated or unavailable source information requiring company review.
- `audit/`: raw public API responses, crawl results and asset provenance. This directory is internal and is not served by Next.js.

Images are stored locally under `public/assets/{mbt,brands,products,company,history,news}`. Source originals are preserved; Next Image provides WebP renditions for visitors. Font files are local WOFF2 conversions of Google Fonts originals, with OFL licenses. The Saudi boundary is derived from Natural Earth 1:50m public-domain geography. Branch markers indicate city centres; route lines are conceptual connections, not freight routes or building coordinates.

## Functionality

- Full English and Arabic routes with correct document language and direction.
- Language switch preserves the current detail page.
- Search, division, brand, category and original-language filters; incremental catalogue loading; individual product pages.
- Searchable brand directory, news detail pages, activity galleries and keyboard-operable document viewer.
- Keyboard-accessible Saudi network and native modal navigation.
- Contact form validates and prepares a `mailto:` draft. It does **not** send mail from a server, store personal details or display a false delivery confirmation. A transactional email service can be connected as a separate integration.
- Careers uses the official legacy HR application URL. No invented vacancies or recruitment email.
- Reduced motion, static server-rendered content, local assets and no animation library. Automatic link prefetch is disabled to avoid speculative catalogue traffic.

## Validation

```sh
npm run typecheck
npm run lint
npm run build
npm run test:e2e
```

Tests run against `http://localhost:3000`; override with `TEST_BASE_URL`. Tests cover all major pages at 1920, 1728, 1440 and 1366 pixels in both languages, catalogue interactions, language changes, keyboard navigation, profile browsing, contact validation, missing routes and automated accessibility. See `QA_REPORT.md` for final outcomes and visual review evidence.

## Source audit tooling

The Python audit scripts require Python 3 plus BeautifulSoup and Pillow. They are migration/forensic utilities, not part of the deployed runtime. Preserve the curated JSON before rerunning import scripts; they intentionally reflect raw source content and are not a CMS. New editorial changes should be made in the curated content files. All source access was read-only.

## Deployment

Ready for a separate Next.js Vercel project. Set `NEXT_PUBLIC_SITE_URL` to that project's preview URL. Previews are noindex by default; set `ALLOW_INDEXING=true` only for an approved public launch. No Vercel project or production domain has been created or modified. The existing `https://www.mbtksa.com/` site remains untouched.

Dedicated mobile art direction is intentionally deferred until desktop approval. Smaller screens have basic layout and overflow protection.
