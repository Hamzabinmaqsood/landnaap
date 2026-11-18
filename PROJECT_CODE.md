# LandNaap: complete source code

Every file in the project (excluding `node_modules`, `dist`, `package-lock.json` and the binary `public/og-image.png`).

## Setup

```bash
# Node.js 22.23.4 or newer is required by Astro 7
mkdir landnaap && cd landnaap
npm init -y
npm install astro@^7.4.12 @astrojs/sitemap@^3.7.5 tailwindcss@^4.3.5 @tailwindcss/vite@^4.3.5
npm install -D @astrojs/check@^0.9.12 typescript@^6.0.3

# create every file below (package.json replaces the generated one), then:
npm run dev        # http://localhost:4321
npm test           # 16 tests: math, slugs, links, llms.txt coverage
npm run llms       # regenerate public/llms.txt from site data
npm run build      # astro check + static build into ./dist (71 indexable pages)
npx wrangler pages deploy dist --project-name=landnaap   # optional direct upload
```

## File tree

```
.gitignore
.nvmrc
README.md
astro.config.mjs
package.json
tsconfig.json
wrangler.toml
public/_headers
public/ads.txt
public/favicon.svg
public/llms.txt
public/robots.txt
scripts/generate-llms.ts
src/components/AdSlot.astro
src/components/Breadcrumbs.astro
src/components/BreakdownTable.astro
src/components/Faq.astro
src/components/Footer.astro
src/components/FormulaList.astro
src/components/Header.astro
src/components/LandConverter.astro
src/components/LinkGrid.astro
src/components/PlotCalculator.astro
src/components/ReferenceTable.astro
src/components/SidebarLinks.astro
src/components/StandardSelector.astro
src/config/site.ts
src/data/conversions.ts
src/data/faqs.ts
src/data/guides.ts
src/layouts/BaseLayout.astro
src/layouts/GuideLayout.astro
src/lib/schema.ts
src/lib/units.ts
src/pages/404.astro
src/pages/about.astro
src/pages/contact.astro
src/pages/convert/[slug].astro
src/pages/convert/index.astro
src/pages/guides/covered-area-vs-plot-area-construction.astro
src/pages/guides/dha-bahria-town-lda-plot-dimensions.astro
src/pages/guides/fard-intiqal-land-units-kanal-marla-sarsai.astro
src/pages/guides/how-to-measure-irregular-plot-area.astro
src/pages/guides/index.astro
src/pages/guides/karachi-sq-yards-gaz-vs-punjab-marla.astro
src/pages/guides/marla-size-pakistan-225-vs-272-25.astro
src/pages/index.astro
src/pages/plot-size-calculator.astro
src/pages/privacy-policy.astro
src/pages/terms.astro
src/styles/global.css
tests/pages.test.ts
tests/units.test.ts
```

## `.gitignore`

```
# build output
dist/
.astro/

# dependencies
node_modules/

# logs
npm-debug.log*
yarn-debug.log*
pnpm-debug.log*

# environment
.env
.env.*
!.env.example

# Cloudflare
.wrangler/

# OS / editor
.DS_Store
.vscode/*
!.vscode/extensions.json
.idea/
```

## `.nvmrc`

```
22.23.4
```

## `README.md`

````markdown
# LandNaap — Marla, Kanal & Plot Size Calculator

A static, zero-backend Astro + Tailwind CSS site for Pakistani / South Asian land measurement, built for Cloudflare Pages.

- **Land Area Converter**: live, bidirectional Marla ⇄ Kanal ⇄ sq ft ⇄ sq yd (gaz) ⇄ sq m ⇄ acre ⇄ Sarsai, with 225 / 272.25 / 250 sq ft Marla standards, a three-standard comparison table, Copy Results and shareable URLs (`/?v=5&u=marla&s=225`).
- **Plot Dimension & Cutting Calculator**: frontage × depth gives sq ft, sq yd, sq m, exact Marla, Kanal, a Kanal–Marla–Sarsai breakdown and the closest standard plot size.
- **Programmatic SEO**: 57 pre-rendered `/convert/[slug]/` pages in 6 groups, each with a unique context paragraph, a generated title, description and canonical URL, a worked calculation for every standard, a static reference table, links to adjacent sizes, an FAQ, and `SoftwareApplication` + `FAQPage` + `BreadcrumbList` JSON-LD.
- **Guides**: `/guides/` plus 6 long-form references (600–900 words each) with `Article` + `FAQPage` JSON-LD, an automatic table of contents and reading time.
- **71 indexable pages** in the sitemap (plus the 404 page).
- **AI search (GEO)**: `public/llms.txt`, AI-crawler-friendly `robots.txt`, formulas in JSON-LD and visible HTML.
- **AdSense-ready**: placements render nothing until configured, then use fixed `min-h-[90px]` / `min-h-[250px]` wrappers (zero CLS). Includes About, Privacy Policy, Terms and Contact pages.

## Quick start

```bash
# Requires Node.js 22.23.4+ (see .nvmrc)
npm install
npm run dev        # http://localhost:4321
npm test           # conversion engine + page/link/llms.txt integrity tests
npm run llms       # regenerate public/llms.txt from the site data
npm run build      # astro check + static build to ./dist
npm run preview    # serve ./dist locally
```

## Site details

Domain, contact email, operator and location live in `src/config/site.ts`:

| Setting | Value |
|---|---|
| `SITE.url` | `https://landnaap.app` (also read by `astro.config.mjs`) |
| `SITE.contactEmail` | `contact@landnaap.app` |
| `SITE.owner` | Hamza Bin Maqsood |
| `SITE.city` / `SITE.jurisdiction` | Islamabad, Pakistan / Islamabad |

`public/robots.txt` and `public/llms.txt` are static files, so if the domain ever changes, update them too.

## Deploy to Cloudflare Pages

**Git integration (recommended)**
1. Push this repo to GitHub or GitLab.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.
3. Framework preset: **Astro**. Build command: `npm run build`. Build output directory: `dist`.
4. Environment variable: `NODE_VERSION = 22.23.4` (or newer). `.nvmrc` is also respected.

**Direct upload**
```bash
npm run build
npx wrangler pages deploy dist --project-name=landnaap
```

`public/_headers` adds security headers and one-year immutable caching for hashed `/_astro/*` assets.

## Activating Google AdSense

Ads are **off by default**: no AdSense script loads and no ad containers render, so there are no empty boxes before approval.

1. After approval, open `src/config/site.ts` and set `ADSENSE.client` (e.g. `ca-pub-1234567890123456`).
   That alone adds the AdSense loader to every page (enough for Auto ads and site verification).
2. For manual placements, create display ad units in AdSense and paste their slot IDs into `ADSENSE.slots`
   (`header-banner`, `sidebar-rectangle`, `in-content-1`). Each placement with an ID renders an invisible wrapper with a
   fixed `min-h-[90px]` or `min-h-[250px]`, so ads load with zero layout shift. Placements left as `''` stay hidden.
3. Uncomment and fill the line in `public/ads.txt` with your publisher ID.
4. For EEA/UK traffic, enable a Google-certified consent message (AdSense → Privacy & messaging).

## Adding a conversion page

Add a spec to `SPECS` in `src/data/conversions.ts` with a `value`, `from`, `to`, `category` and a unique `context` paragraph. The slug (`{value}-{from}-to-{to}`, with `3.5` becoming `3-5`), title, description, H1, answers, worked calculation, reference table, related links, FAQ, JSON-LD and sitemap entry are generated automatically. Then run `npm run llms` and `npm test`. The tests fail if a page is missing from `llms.txt`, has no inbound link, or duplicates another page's title, description or context.

## Adding a guide

1. Add its metadata and FAQs to `GUIDES` in `src/data/guides.ts`.
2. Create `src/pages/guides/<slug>.astro` that wraps the body in `<GuideLayout guide={getGuide('<slug>')}>`. Give every `<h2>` an `id` so it appears in the table of contents.
3. Run `npm run llms` and `npm test`.

## Project structure

```
├── astro.config.mjs          # static output, sitemap, Tailwind v4 (Vite plugin)
├── public/
│   ├── _headers              # Cloudflare Pages headers
│   ├── ads.txt               # AdSense authorised sellers (fill after approval)
│   ├── favicon.svg
│   ├── llms.txt              # LLM-readable summary + formulas
│   ├── og-image.png
│   └── robots.txt
├── src/
│   ├── components/           # calculators, tables, link grids, ad slots, layout parts
│   ├── config/site.ts        # brand, contact, nav
│   ├── data/                 # conversions.ts (57 specs), guides.ts, faqs.ts
│   ├── layouts/              # BaseLayout.astro, GuideLayout.astro
│   ├── lib/units.ts          # conversion engine (shared by build + browser)
│   ├── lib/schema.ts         # JSON-LD builders
│   ├── pages/                # routes: convert/[slug].astro, guides/*.astro, legal pages
│   └── styles/global.css
├── scripts/generate-llms.ts  # builds public/llms.txt from the data
└── tests/                    # units.test.ts, pages.test.ts
```

## Conversion constants

| Constant | Value |
|---|---|
| 1 Marla | 225, 250 or 272.25 sq ft (selectable) |
| 1 Kanal | 20 Marla |
| 1 Sarsai | 1/9 Marla |
| 1 sq yd | 9 sq ft |
| 1 sq ft | 0.09290304 sq m |
| 1 Acre | 43,560 sq ft |
````

## `astro.config.mjs`

```js
// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { SITE } from './src/config/site.ts';

// Production domain comes from src/config/site.ts (SITE.url). It drives canonical URLs,
// Open Graph tags, JSON-LD and the sitemap. public/robots.txt and public/llms.txt use the same domain.
const SITE_URL = SITE.url;

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // Inline the (small) Tailwind stylesheet into every page: no render-blocking CSS request.
    inlineStylesheets: 'always',
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  integrations: [
    // Google ignores <priority>/<changefreq>; <lastmod> (build date) is what matters.
    sitemap({
      filter: (page) => !page.includes('/404'),
      lastmod: new Date(),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

## `package.json`

```json
{
  "name": "landnaap",
  "type": "module",
  "version": "1.0.0",
  "private": true,
  "description": "LandNaap: Marla, Kanal and plot size calculators for Pakistan, built with Astro and Tailwind CSS for Cloudflare Pages.",
  "engines": {
    "node": ">=22.23.4"
  },
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "build:fast": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "test": "node --experimental-strip-types --test tests/units.test.ts tests/pages.test.ts",
    "astro": "astro",
    "llms": "node --experimental-strip-types scripts/generate-llms.ts"
  },
  "dependencies": {
    "@astrojs/sitemap": "^3.7.5",
    "@tailwindcss/vite": "^4.3.5",
    "astro": "^7.4.12",
    "tailwindcss": "^4.3.5"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.12",
    "typescript": "^6.0.3"
  }
}
```

## `tsconfig.json`

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist", "node_modules"],
  "compilerOptions": {
    "allowImportingTsExtensions": true
  }
}
```

## `wrangler.toml`

```toml
# Optional: only needed for direct uploads with `npx wrangler pages deploy`.
# Git-connected Cloudflare Pages projects can ignore this file.
name = "landnaap"
compatibility_date = "2026-11-01"
pages_build_output_dir = "./dist"
```

## `public/_headers`

```
# Cloudflare Pages custom headers
# https://developers.cloudflare.com/pages/configuration/headers/

/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
  X-Frame-Options: SAMEORIGIN

# Hashed build assets never change: cache for a year.
/_astro/*
  Cache-Control: public, max-age=31536000, immutable

/favicon.svg
  Cache-Control: public, max-age=604800

/og-image.png
  Cache-Control: public, max-age=604800

/llms.txt
  Content-Type: text/markdown; charset=utf-8
  Cache-Control: public, max-age=3600
```

## `public/ads.txt`

```text
# ads.txt for landnaap.app
# Authorised digital sellers. Add the exact line shown in your Google AdSense account
# (Sites > ads.txt) here after approval.
```

## `public/favicon.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#047857"/><path d="M7 23V9h8v6h10v8z" fill="none" stroke="#fff" stroke-width="2.2" stroke-linejoin="round"/><path d="M15 15v8" stroke="#a7f3d0" stroke-width="2.2"/></svg>
```

## `public/llms.txt`

```text
# LandNaap: Marla, Kanal & Plot Size Calculator (Pakistan)

> Free, client-side land area calculators and guides for Pakistan and South Asia. Converts Marla, Kanal, square feet, square yards (gaz), square meters, acres and Sarsai using three Marla standards (225, 250 and 272.25 sq ft), and calculates plot area and standard plot size from frontage × depth.

All calculations run in the browser. Every tool page also contains static HTML reference tables and JSON-LD (SoftwareApplication, FAQPage, BreadcrumbList); guides carry Article + FAQPage JSON-LD. Operated by Hamza Bin Maqsood, Islamabad, Pakistan. Contact: contact@landnaap.app.

Base URL: https://landnaap.app

## Marla standards

| Standard | 1 Marla | 1 Kanal (20 Marla) | 1 Sarsai (1/9 Marla) | Used by |
|---|---|---|---|---|
| Housing Society | 225 sq ft (25 sq yd) | 4,500 sq ft | 25 sq ft | DHA, Bahria Town, LDA-approved and most housing societies |
| Revenue / Patwari | 272.25 sq ft (30.25 sq yd) | 5,445 sq ft | 30.25 sq ft (1 square karam, 5.5 ft × 5.5 ft) | Revenue records (fard, jamabandi, registry, intiqal), agricultural land |
| Custom Developer | 250 sq ft (27.78 sq yd) | 5,000 sq ft | 27.78 sq ft | Some private developer schemes |

The word "Marla" is ambiguous: always state which standard is used. On the revenue standard, 1 Acre = 8 Kanal = 160 Marla. Results below are listed as value @225 | @250 | @272.25 sq ft Marla.

## Exact formulas

- Square Feet = Marla × Marla size (225, 250 or 272.25 sq ft)
- Marla = Square Feet ÷ Marla size
- 1 Kanal = 20 Marla (4,500 sq ft at 225; 5,000 sq ft at 250; 5,445 sq ft at 272.25)
- 1 Sarsai = 1/9 Marla (25 sq ft at 225; 27.78 sq ft at 250; 30.25 sq ft at 272.25)
- Square Yards (Gaz) = Square Feet ÷ 9
- Square Meters = Square Feet × 0.09290304
- Acres = Square Feet ÷ 43,560 (1 Acre = 8 Kanal = 160 Marla on the 272.25 revenue standard)
- Plot Area (sq ft) = Frontage (ft) × Depth (ft); Marla = Plot Area ÷ Marla size
- Kanal = Marla ÷ 20 and Sarsai = Marla × 9 (identical in every standard)
- Closest standard plot = nearest of 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16 Marla or 1, 1.5, 2, 3, 4, 8 Kanal; within ±2.5% counts as a match

## Tools

- [Land Area Converter](https://landnaap.app/): live bidirectional conversion between Marla, Kanal, sq ft, sq yd, sq m, acres and Sarsai, with a side-by-side comparison of all three Marla standards. Shareable URLs: `/?v=5&u=marla&s=225` (u = marla | kanal | sqft | sqyd | sqm | acre | sarsai; s = 225 | 250 | 272.25).
- [Plot Size Calculator](https://landnaap.app/plot-size-calculator/): frontage × depth in feet → sq ft, sq yd, sq m, exact Marla, Kanal, Kanal–Marla–Sarsai breakdown and closest standard plot category.

## Guides

- [All guides](https://landnaap.app/guides/)
- [Why Marla Size Differs: 225 vs 272.25 vs 250 Sq Ft](https://landnaap.app/guides/marla-size-pakistan-225-vs-272-25/): The karam behind each Marla standard, where each one is used and how to avoid paying for land you do not get.
- [Standard Plot Dimensions in DHA, Bahria Town and LDA Schemes](https://landnaap.app/guides/dha-bahria-town-lda-plot-dimensions/): Typical plot cuts (25×45, 30×60, 35×65, 50×90 ft), why some are slightly over size, and what to check before buying.
- [Converting Karachi Square Yards (Gaz) to Punjab Marla and Kanal](https://landnaap.app/guides/karachi-sq-yards-gaz-vs-punjab-marla/): How 120, 240, 500 and 1,000 gaz plots map onto Marla and Kanal, and the shortcuts that make it mental arithmetic.
- [Understanding Revenue Records: How Kanal, Marla, Sarsai and Karam Work Together](https://landnaap.app/guides/fard-intiqal-land-units-kanal-marla-sarsai/): The karam-based unit chain used by the Patwari, how areas appear on a fard, and how to turn them into square feet.
- [Plot Area vs Covered Area and FAR Basics for Construction Estimates](https://landnaap.app/guides/covered-area-vs-plot-area-construction/): Why a 5 Marla plot is not 5 Marla of house: setbacks, ground coverage, FAR and how builders quote covered area.
- [How to Calculate the Area of an Irregular Plot (Heron's Formula and Triangulation)](https://landnaap.app/guides/how-to-measure-irregular-plot-area/): A step-by-step method for non-rectangular plots using a diagonal and Heron's formula, with a worked example.

## Conversion pages

URL pattern: https://landnaap.app/convert/{value}-{from}-to-{to}/ where decimals use a hyphen (3.5 → 3-5) and units are marla, kanal, sq-ft, sq-yards, sq-meters, acre, sarsai. Index: https://landnaap.app/convert/

### Marla to Square Feet

- [2 Marla to Sq Ft](https://landnaap.app/convert/2-marla-to-sq-ft/): 2 Marla = 450 Sq Ft @225 | 500 Sq Ft @250 | 544.5 Sq Ft @272.25
- [3 Marla to Sq Ft](https://landnaap.app/convert/3-marla-to-sq-ft/): 3 Marla = 675 Sq Ft @225 | 750 Sq Ft @250 | 816.75 Sq Ft @272.25
- [3.5 Marla to Sq Ft](https://landnaap.app/convert/3-5-marla-to-sq-ft/): 3.5 Marla = 787.5 Sq Ft @225 | 875 Sq Ft @250 | 952.88 Sq Ft @272.25
- [4 Marla to Sq Ft](https://landnaap.app/convert/4-marla-to-sq-ft/): 4 Marla = 900 Sq Ft @225 | 1,000 Sq Ft @250 | 1,089 Sq Ft @272.25
- [5 Marla to Sq Ft](https://landnaap.app/convert/5-marla-to-sq-ft/): 5 Marla = 1,125 Sq Ft @225 | 1,250 Sq Ft @250 | 1,361.25 Sq Ft @272.25
- [6 Marla to Sq Ft](https://landnaap.app/convert/6-marla-to-sq-ft/): 6 Marla = 1,350 Sq Ft @225 | 1,500 Sq Ft @250 | 1,633.5 Sq Ft @272.25
- [7 Marla to Sq Ft](https://landnaap.app/convert/7-marla-to-sq-ft/): 7 Marla = 1,575 Sq Ft @225 | 1,750 Sq Ft @250 | 1,905.75 Sq Ft @272.25
- [8 Marla to Sq Ft](https://landnaap.app/convert/8-marla-to-sq-ft/): 8 Marla = 1,800 Sq Ft @225 | 2,000 Sq Ft @250 | 2,178 Sq Ft @272.25
- [10 Marla to Sq Ft](https://landnaap.app/convert/10-marla-to-sq-ft/): 10 Marla = 2,250 Sq Ft @225 | 2,500 Sq Ft @250 | 2,722.5 Sq Ft @272.25
- [12 Marla to Sq Ft](https://landnaap.app/convert/12-marla-to-sq-ft/): 12 Marla = 2,700 Sq Ft @225 | 3,000 Sq Ft @250 | 3,267 Sq Ft @272.25
- [15 Marla to Sq Ft](https://landnaap.app/convert/15-marla-to-sq-ft/): 15 Marla = 3,375 Sq Ft @225 | 3,750 Sq Ft @250 | 4,083.75 Sq Ft @272.25

### Marla to Square Yards (Gaz)

- [1 Marla to Sq Yards](https://landnaap.app/convert/1-marla-to-sq-yards/): 1 Marla = 25 Sq Yards @225 | 27.7778 Sq Yards @250 | 30.25 Sq Yards @272.25
- [2 Marla to Sq Yards](https://landnaap.app/convert/2-marla-to-sq-yards/): 2 Marla = 50 Sq Yards @225 | 55.5556 Sq Yards @250 | 60.5 Sq Yards @272.25
- [3 Marla to Sq Yards](https://landnaap.app/convert/3-marla-to-sq-yards/): 3 Marla = 75 Sq Yards @225 | 83.3333 Sq Yards @250 | 90.75 Sq Yards @272.25
- [4 Marla to Sq Yards](https://landnaap.app/convert/4-marla-to-sq-yards/): 4 Marla = 100 Sq Yards @225 | 111.11 Sq Yards @250 | 121 Sq Yards @272.25
- [5 Marla to Sq Yards](https://landnaap.app/convert/5-marla-to-sq-yards/): 5 Marla = 125 Sq Yards @225 | 138.89 Sq Yards @250 | 151.25 Sq Yards @272.25
- [6 Marla to Sq Yards](https://landnaap.app/convert/6-marla-to-sq-yards/): 6 Marla = 150 Sq Yards @225 | 166.67 Sq Yards @250 | 181.5 Sq Yards @272.25
- [7 Marla to Sq Yards](https://landnaap.app/convert/7-marla-to-sq-yards/): 7 Marla = 175 Sq Yards @225 | 194.44 Sq Yards @250 | 211.75 Sq Yards @272.25
- [8 Marla to Sq Yards](https://landnaap.app/convert/8-marla-to-sq-yards/): 8 Marla = 200 Sq Yards @225 | 222.22 Sq Yards @250 | 242 Sq Yards @272.25
- [10 Marla to Sq Yards](https://landnaap.app/convert/10-marla-to-sq-yards/): 10 Marla = 250 Sq Yards @225 | 277.78 Sq Yards @250 | 302.5 Sq Yards @272.25
- [12 Marla to Sq Yards](https://landnaap.app/convert/12-marla-to-sq-yards/): 12 Marla = 300 Sq Yards @225 | 333.33 Sq Yards @250 | 363 Sq Yards @272.25
- [15 Marla to Sq Yards](https://landnaap.app/convert/15-marla-to-sq-yards/): 15 Marla = 375 Sq Yards @225 | 416.67 Sq Yards @250 | 453.75 Sq Yards @272.25

### Marla to Square Meters

- [3 Marla to Sq Meters](https://landnaap.app/convert/3-marla-to-sq-meters/): 3 Marla = 62.7096 Sq Meters @225 | 69.6773 Sq Meters @250 | 75.8786 Sq Meters @272.25
- [5 Marla to Sq Meters](https://landnaap.app/convert/5-marla-to-sq-meters/): 5 Marla = 104.52 Sq Meters @225 | 116.13 Sq Meters @250 | 126.46 Sq Meters @272.25
- [7 Marla to Sq Meters](https://landnaap.app/convert/7-marla-to-sq-meters/): 7 Marla = 146.32 Sq Meters @225 | 162.58 Sq Meters @250 | 177.05 Sq Meters @272.25
- [10 Marla to Sq Meters](https://landnaap.app/convert/10-marla-to-sq-meters/): 10 Marla = 209.03 Sq Meters @225 | 232.26 Sq Meters @250 | 252.93 Sq Meters @272.25

### Kanal Conversions

- [1 Kanal to Sq Ft](https://landnaap.app/convert/1-kanal-to-sq-ft/): 1 Kanal = 4,500 Sq Ft @225 | 5,000 Sq Ft @250 | 5,445 Sq Ft @272.25
- [1 Kanal to Marla](https://landnaap.app/convert/1-kanal-to-marla/): 1 Kanal = 20 Marla (all standards)
- [1 Kanal to Sq Yards](https://landnaap.app/convert/1-kanal-to-sq-yards/): 1 Kanal = 500 Sq Yards @225 | 555.56 Sq Yards @250 | 605 Sq Yards @272.25
- [1 Kanal to Sq Meters](https://landnaap.app/convert/1-kanal-to-sq-meters/): 1 Kanal = 418.06 Sq Meters @225 | 464.52 Sq Meters @250 | 505.86 Sq Meters @272.25
- [1 Kanal to Acres](https://landnaap.app/convert/1-kanal-to-acre/): 1 Kanal = 0.103306 Acres @225 | 0.114784 Acres @250 | 0.125 Acres @272.25
- [2 Kanal to Sq Ft](https://landnaap.app/convert/2-kanal-to-sq-ft/): 2 Kanal = 9,000 Sq Ft @225 | 10,000 Sq Ft @250 | 10,890 Sq Ft @272.25
- [2 Kanal to Marla](https://landnaap.app/convert/2-kanal-to-marla/): 2 Kanal = 40 Marla (all standards)
- [2 Kanal to Sq Yards](https://landnaap.app/convert/2-kanal-to-sq-yards/): 2 Kanal = 1,000 Sq Yards @225 | 1,111.11 Sq Yards @250 | 1,210 Sq Yards @272.25
- [4 Kanal to Acres](https://landnaap.app/convert/4-kanal-to-acre/): 4 Kanal = 0.413223 Acres @225 | 0.459137 Acres @250 | 0.5 Acres @272.25
- [8 Kanal to Acres](https://landnaap.app/convert/8-kanal-to-acre/): 8 Kanal = 0.826446 Acres @225 | 0.918274 Acres @250 | 1 Acre @272.25
- [10 Kanal to Acres](https://landnaap.app/convert/10-kanal-to-acre/): 10 Kanal = 1.0331 Acres @225 | 1.1478 Acres @250 | 1.25 Acres @272.25

### Acre & Square Feet (Reverse)

- [1 Acre to Kanal](https://landnaap.app/convert/1-acre-to-kanal/): 1 Acre = 9.68 Kanal @225 | 8.712 Kanal @250 | 8 Kanal @272.25
- [1 Acre to Marla](https://landnaap.app/convert/1-acre-to-marla/): 1 Acre = 193.6 Marla @225 | 174.24 Marla @250 | 160 Marla @272.25
- [1 Acre to Sq Ft](https://landnaap.app/convert/1-acre-to-sq-ft/): 1 Acre = 43,560 Sq Ft (all standards)
- [1 Acre to Sq Yards](https://landnaap.app/convert/1-acre-to-sq-yards/): 1 Acre = 4,840 Sq Yards (all standards)
- [2 Acres to Kanal](https://landnaap.app/convert/2-acre-to-kanal/): 2 Acres = 19.36 Kanal @225 | 17.424 Kanal @250 | 16 Kanal @272.25
- [5 Acres to Kanal](https://landnaap.app/convert/5-acre-to-kanal/): 5 Acres = 48.4 Kanal @225 | 43.56 Kanal @250 | 40 Kanal @272.25
- [1,000 Sq Ft to Marla](https://landnaap.app/convert/1000-sq-ft-to-marla/): 1,000 Sq Ft = 4.4444 Marla @225 | 4 Marla @250 | 3.6731 Marla @272.25
- [1,125 Sq Ft to Marla](https://landnaap.app/convert/1125-sq-ft-to-marla/): 1,125 Sq Ft = 5 Marla @225 | 4.5 Marla @250 | 4.1322 Marla @272.25
- [2,250 Sq Ft to Marla](https://landnaap.app/convert/2250-sq-ft-to-marla/): 2,250 Sq Ft = 10 Marla @225 | 9 Marla @250 | 8.2645 Marla @272.25
- [4,500 Sq Ft to Marla](https://landnaap.app/convert/4500-sq-ft-to-marla/): 4,500 Sq Ft = 20 Marla @225 | 18 Marla @250 | 16.5289 Marla @272.25
- [5,445 Sq Ft to Marla](https://landnaap.app/convert/5445-sq-ft-to-marla/): 5,445 Sq Ft = 24.2 Marla @225 | 21.78 Marla @250 | 20 Marla @272.25

### Sarsai & Gaz Conversions

- [1 Marla to Sarsai](https://landnaap.app/convert/1-marla-to-sarsai/): 1 Marla = 9 Sarsai (all standards)
- [1 Marla to Sq Ft](https://landnaap.app/convert/1-marla-to-sq-ft/): 1 Marla = 225 Sq Ft @225 | 250 Sq Ft @250 | 272.25 Sq Ft @272.25
- [100 Sq Yards to Marla](https://landnaap.app/convert/100-sq-yards-to-marla/): 100 Sq Yards = 4 Marla @225 | 3.6 Marla @250 | 3.3058 Marla @272.25
- [120 Sq Yards to Marla](https://landnaap.app/convert/120-sq-yards-to-marla/): 120 Sq Yards = 4.8 Marla @225 | 4.32 Marla @250 | 3.9669 Marla @272.25
- [240 Sq Yards to Marla](https://landnaap.app/convert/240-sq-yards-to-marla/): 240 Sq Yards = 9.6 Marla @225 | 8.64 Marla @250 | 7.9339 Marla @272.25
- [250 Sq Yards to Marla](https://landnaap.app/convert/250-sq-yards-to-marla/): 250 Sq Yards = 10 Marla @225 | 9 Marla @250 | 8.2645 Marla @272.25
- [400 Sq Yards to Marla](https://landnaap.app/convert/400-sq-yards-to-marla/): 400 Sq Yards = 16 Marla @225 | 14.4 Marla @250 | 13.2231 Marla @272.25
- [500 Sq Yards to Kanal](https://landnaap.app/convert/500-sq-yards-to-kanal/): 500 Sq Yards = 1 Kanal @225 | 0.9 Kanal @250 | 0.826446 Kanal @272.25
- [1,000 Sq Yards to Kanal](https://landnaap.app/convert/1000-sq-yards-to-kanal/): 1,000 Sq Yards = 2 Kanal @225 | 1.8 Kanal @250 | 1.6529 Kanal @272.25

## Optional

- [About](https://landnaap.app/about/)
- [Privacy Policy](https://landnaap.app/privacy-policy/)
- [Terms of Use](https://landnaap.app/terms/)
- [Contact](https://landnaap.app/contact/)
- [Sitemap](https://landnaap.app/sitemap-index.xml)
```

## `public/robots.txt`

```text
# robots.txt for LandNaap

User-agent: *
Allow: /
Disallow: /404

# AI / LLM crawlers are welcome. Site summary for LLMs: /llms.txt
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: https://landnaap.app/sitemap-index.xml
```

## `scripts/generate-llms.ts`

```ts
/**
 * Regenerates public/llms.txt from the site's own data, so the file always lists every
 * conversion page and guide with numbers identical to the calculators.
 *
 *   npm run llms
 *
 * `npm test` fails if public/llms.txt is missing any conversion or guide URL.
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { SITE } from '../src/config/site.ts';
import { ANSWER_ORDER, CATEGORIES, CONVERSIONS, conversionsInCategory, shortName } from '../src/data/conversions.ts';
import { GUIDES } from '../src/data/guides.ts';
import { FORMULAS, formatNumber } from '../src/lib/units.ts';

const base = SITE.url;
const u = (path: string) => `${base}${path}`;

function conversionLine(slug: string): string {
  const c = CONVERSIONS.find((x) => x.slug === slug);
  if (!c) throw new Error(slug);
  const answer = c.sameAcross
    ? `${formatNumber(c.results['225'])} ${shortName(c.to, c.results['225'])} (all standards)`
    : ANSWER_ORDER.map((s) => `${formatNumber(c.results[s])} ${shortName(c.to, c.results[s])} @${s}`).join(' | ');
  return `- [${c.linkLabel}](${u(`/convert/${c.slug}/`)}): ${formatNumber(c.value)} ${shortName(c.from, c.value)} = ${answer}`;
}

const lines: string[] = [
  `# ${SITE.name}: Marla, Kanal & Plot Size Calculator (Pakistan)`,
  '',
  `> Free, client-side land area calculators and guides for Pakistan and South Asia. Converts Marla, Kanal, square feet, square yards (gaz), square meters, acres and Sarsai using three Marla standards (225, 250 and 272.25 sq ft), and calculates plot area and standard plot size from frontage × depth.`,
  '',
  `All calculations run in the browser. Every tool page also contains static HTML reference tables and JSON-LD (SoftwareApplication, FAQPage, BreadcrumbList); guides carry Article + FAQPage JSON-LD. Operated by ${SITE.owner}, ${SITE.city}. Contact: ${SITE.contactEmail}.`,
  '',
  `Base URL: ${base}`,
  '',
  '## Marla standards',
  '',
  '| Standard | 1 Marla | 1 Kanal (20 Marla) | 1 Sarsai (1/9 Marla) | Used by |',
  '|---|---|---|---|---|',
  '| Housing Society | 225 sq ft (25 sq yd) | 4,500 sq ft | 25 sq ft | DHA, Bahria Town, LDA-approved and most housing societies |',
  '| Revenue / Patwari | 272.25 sq ft (30.25 sq yd) | 5,445 sq ft | 30.25 sq ft (1 square karam, 5.5 ft × 5.5 ft) | Revenue records (fard, jamabandi, registry, intiqal), agricultural land |',
  '| Custom Developer | 250 sq ft (27.78 sq yd) | 5,000 sq ft | 27.78 sq ft | Some private developer schemes |',
  '',
  'The word "Marla" is ambiguous: always state which standard is used. On the revenue standard, 1 Acre = 8 Kanal = 160 Marla. Results below are listed as value @225 | @250 | @272.25 sq ft Marla.',
  '',
  '## Exact formulas',
  '',
  ...FORMULAS.map((f) => `- ${f}`),
  '- Kanal = Marla ÷ 20 and Sarsai = Marla × 9 (identical in every standard)',
  '- Closest standard plot = nearest of 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16 Marla or 1, 1.5, 2, 3, 4, 8 Kanal; within ±2.5% counts as a match',
  '',
  '## Tools',
  '',
  `- [Land Area Converter](${u('/')}): live bidirectional conversion between Marla, Kanal, sq ft, sq yd, sq m, acres and Sarsai, with a side-by-side comparison of all three Marla standards. Shareable URLs: \`/?v=5&u=marla&s=225\` (u = marla | kanal | sqft | sqyd | sqm | acre | sarsai; s = 225 | 250 | 272.25).`,
  `- [Plot Size Calculator](${u('/plot-size-calculator/')}): frontage × depth in feet → sq ft, sq yd, sq m, exact Marla, Kanal, Kanal–Marla–Sarsai breakdown and closest standard plot category.`,
  '',
  '## Guides',
  '',
  `- [All guides](${u('/guides/')})`,
  ...GUIDES.map((g) => `- [${g.h1}](${u(`/guides/${g.slug}/`)}): ${g.summary}`),
  '',
  '## Conversion pages',
  '',
  `URL pattern: ${base}/convert/{value}-{from}-to-{to}/ where decimals use a hyphen (3.5 → 3-5) and units are marla, kanal, sq-ft, sq-yards, sq-meters, acre, sarsai. Index: ${u('/convert/')}`,
  '',
];

for (const cat of CATEGORIES) {
  lines.push(`### ${cat.title}`, '');
  for (const c of conversionsInCategory(cat.id)) lines.push(conversionLine(c.slug));
  lines.push('');
}

lines.push(
  '## Optional',
  '',
  `- [About](${u('/about/')})`,
  `- [Privacy Policy](${u('/privacy-policy/')})`,
  `- [Terms of Use](${u('/terms/')})`,
  `- [Contact](${u('/contact/')})`,
  `- [Sitemap](${u('/sitemap-index.xml')})`,
  '',
);

const out = fileURLToPath(new URL('../public/llms.txt', import.meta.url));
writeFileSync(out, lines.join('\n'));
console.log(`Wrote ${out} (${CONVERSIONS.length} conversions, ${GUIDES.length} guides)`);
```

## `src/components/AdSlot.astro`

```astro
---
/**
 * Google AdSense placement.
 *
 * Until a publisher ID and a slot ID for this placement are set in src/config/site.ts
 * (ADSENSE), this renders ONLY an HTML comment marking the position. No box, border,
 * background, label or reserved space appears on screen.
 *
 * Once configured it renders an invisible (no border, no background) wrapper with a fixed
 * min-height, so the ad fills space that is already reserved: zero Cumulative Layout Shift.
 *   variant="banner"    -> min-h-[90px]
 *   variant="rectangle" -> min-h-[250px]
 */
import { ADSENSE, adsEnabled, type AdPlacement } from '../config/site';

interface Props {
  variant: 'banner' | 'rectangle';
  name: AdPlacement;
  class?: string;
}

const { variant, name, class: className = '' } = Astro.props;
const enabled = adsEnabled(name);
const sizeClass = variant === 'banner' ? 'min-h-[90px]' : 'min-h-[250px]';
const minHeight = variant === 'banner' ? '90px' : '250px';
const placeholderComment = `<!-- AdSense placement "${name}" (${variant}, ${minHeight} reserved when active): set ADSENSE.client and ADSENSE.slots["${name}"] in src/config/site.ts to show an ad here -->`;
---

{
  enabled ? (
    <div class:list={['w-full overflow-hidden', sizeClass, className]} data-ad-placement={name}>
      <ins
        class="adsbygoogle"
        style={`display:block;min-height:${minHeight}`}
        data-ad-client={ADSENSE.client}
        data-ad-slot={ADSENSE.slots[name]}
        data-ad-format={variant === 'banner' ? 'horizontal' : 'rectangle'}
        data-full-width-responsive="true"
      />
      <script is:inline>(window.adsbygoogle = window.adsbygoogle || []).push({});</script>
    </div>
  ) : (
    <Fragment set:html={placeholderComment} />
  )
}
```

## `src/components/Breadcrumbs.astro`

```astro
---
interface Props {
  items: { name: string; href?: string }[];
}
const { items } = Astro.props;
---

<nav aria-label="Breadcrumb" class="mb-4 text-sm">
  <ol class="flex flex-wrap items-center gap-1.5 text-slate-600">
    {
      items.map((it, i) => (
        <li class="flex items-center gap-1.5">
          {i > 0 && (
            <span aria-hidden="true" class="text-slate-400">
              /
            </span>
          )}
          {it.href ? (
            <a href={it.href} class="hover:text-brand-700 hover:underline">
              {it.name}
            </a>
          ) : (
            <span aria-current="page" class="font-medium text-slate-900">
              {it.name}
            </span>
          )}
        </li>
      ))
    }
  </ol>
</nav>
```

## `src/components/BreakdownTable.astro`

```astro
---
/** Static table: one input value expressed in every unit under every Marla standard. */
import { STANDARDS, UNITS, UNIT_ORDER, compareStandards, formatNumber, unitLabel, type UnitId } from '../lib/units';

interface Props {
  value: number;
  unit: UnitId;
}
const { value, unit } = Astro.props;
const data = compareStandards(value, unit);
---

<div class="overflow-x-auto rounded-xl border border-slate-200 bg-white">
  <table class="data-table">
    <caption class="px-3 py-3 text-left text-sm font-medium text-slate-600">
      {formatNumber(value)} {unitLabel(unit, value)} in every unit and Marla standard
    </caption>
    <thead>
      <tr>
        <th scope="col">Unit</th>
        {
          STANDARDS.map((s) => (
            <th scope="col" class="text-right">
              <span class="num block">{s.label}</span>
              <span class="block text-xs font-medium text-slate-600">{s.name}</span>
            </th>
          ))
        }
      </tr>
    </thead>
    <tbody>
      {
        UNIT_ORDER.map((u) => (
          <tr>
            <th scope="row">
              {UNITS[u].label}
            </th>
            {STANDARDS.map((s) => (
              <td class="text-right">{formatNumber(data[s.id][u])}</td>
            ))}
          </tr>
        ))
      }
    </tbody>
  </table>
</div>
```

## `src/components/Faq.astro`

```astro
---
import type { FaqItem } from '../data/faqs';

interface Props {
  items: FaqItem[];
  heading?: string;
  id?: string;
}
const { items, heading = 'Frequently asked questions', id = 'faq' } = Astro.props;
---

<section aria-labelledby={`${id}-heading`} class="mt-12">
  <h2 id={`${id}-heading`} class="mb-4 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{heading}</h2>
  <div class="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
    {
      items.map((f, i) => (
        <details class="group" open={i === 0}>
          <summary class="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-left font-semibold text-slate-900 hover:bg-slate-50 sm:px-5 [&::-webkit-details-marker]:hidden">
            <h3 class="text-base">{f.q}</h3>
            <svg class="h-5 w-5 shrink-0 text-slate-500 transition-transform group-open:rotate-180" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
            </svg>
          </summary>
          <p class="px-4 pb-4 leading-7 text-slate-700 sm:px-5">{f.a}</p>
        </details>
      ))
    }
  </div>
</section>
```

## `src/components/Footer.astro`

```astro
---
import { FOOTER_LINKS, SITE } from '../config/site';
import { POPULAR_CONVERSIONS } from '../data/conversions';
import { GUIDES } from '../data/guides';

const year = new Date().getFullYear();
---

<footer class="mt-16 border-t border-slate-200 bg-white">
  <div class="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
    <div class="lg:col-span-2">
      <p class="text-lg font-extrabold text-slate-900">{SITE.name}</p>
      <p class="mt-2 max-w-md text-sm leading-6 text-slate-600">
        Free land area tools for Pakistan and South Asia. Convert Marla, Kanal, square feet, square yards, square meters,
        acres and Sarsai using the 225, 250 or 272.25 sq ft Marla standard.
      </p>
      <p class="mt-4 max-w-md text-xs leading-5 text-slate-500">
        Results are for information only. Always confirm measurements with your housing society, the revenue department
        or a licensed surveyor before buying or selling land.
      </p>
    </div>
    <nav aria-label="Popular conversions">
      <p class="text-sm font-bold text-slate-900">Popular conversions</p>
      <ul class="mt-3 space-y-1.5 text-sm">
        {
          POPULAR_CONVERSIONS.map((c) => (
            <li>
              <a href={`/convert/${c.slug}/`} class="text-slate-600 hover:text-brand-700 hover:underline">
                {c.linkLabel}
              </a>
            </li>
          ))
        }
        <li><a href="/convert/" class="font-semibold text-brand-700 hover:underline">All conversions →</a></li>
      </ul>
    </nav>
    <nav aria-label="Site information">
      <p class="text-sm font-bold text-slate-900">Tools & info</p>
      <ul class="mt-3 space-y-1.5 text-sm">
        <li><a href="/" class="text-slate-600 hover:text-brand-700 hover:underline">Land Area Converter</a></li>
        <li><a href="/plot-size-calculator/" class="text-slate-600 hover:text-brand-700 hover:underline">Plot Size Calculator</a></li>
        <li><a href="/guides/" class="text-slate-600 hover:text-brand-700 hover:underline">Guides ({GUIDES.length})</a></li>
        {
          FOOTER_LINKS.map((l) => (
            <li>
              <a href={l.href} class="text-slate-600 hover:text-brand-700 hover:underline">
                {l.label}
              </a>
            </li>
          ))
        }
      </ul>
    </nav>
  </div>
  <div class="border-t border-slate-100">
    <p class="mx-auto max-w-6xl px-4 py-4 text-xs text-slate-500">© {year} {SITE.name} · Operated by {SITE.owner}, {SITE.city}. All rights reserved.</p>
  </div>
</footer>
```

## `src/components/FormulaList.astro`

```astro
---
import { FORMULAS } from '../lib/units';

interface Props {
  heading?: string;
}
const { heading = 'Exact conversion formulas' } = Astro.props;
---

<section aria-labelledby="formulas-heading" class="mt-12">
  <h2 id="formulas-heading" class="mb-4 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{heading}</h2>
  <ul class="grid gap-2 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
    {
      FORMULAS.map((f) => (
        <li class="num flex gap-3 text-[15px] leading-6 text-slate-800">
          <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" aria-hidden="true" />
          <code class="font-sans">{f}</code>
        </li>
      ))
    }
  </ul>
</section>
```

## `src/components/Header.astro`

```astro
---
import { NAV_LINKS, SITE } from '../config/site';

const current = Astro.url.pathname;
const isActive = (href: string) => (href === '/' ? current === '/' : current.startsWith(href));
---

<header class="border-b border-slate-200 bg-white">
  <div class="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
    <a href="/" class="flex items-center gap-2.5 self-start rounded-md sm:self-auto" aria-label={`${SITE.name} home`}>
      <svg class="h-9 w-9 shrink-0" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="7" fill="#047857"></rect>
        <path d="M7 23V9h8v6h10v8z" fill="none" stroke="#fff" stroke-width="2.2" stroke-linejoin="round"></path>
        <path d="M15 15v8" stroke="#a7f3d0" stroke-width="2.2"></path>
      </svg>
      <span class="leading-tight">
        <span class="block text-lg font-extrabold tracking-tight text-slate-900">{SITE.name}</span>
        <span class="block text-xs font-medium text-slate-600">Marla · Kanal · Plot Calculator</span>
      </span>
    </a>
    <nav aria-label="Main" class="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <ul class="flex gap-1 whitespace-nowrap">
        {
          NAV_LINKS.map((l) => (
            <li>
              <a
                href={l.href}
                class:list={[
                  'inline-flex min-h-11 items-center rounded-lg px-3 text-[15px] font-semibold transition-colors',
                  isActive(l.href) ? 'bg-brand-50 text-brand-800' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900',
                ]}
                aria-current={isActive(l.href) ? 'page' : undefined}
              >
                {l.label}
              </a>
            </li>
          ))
        }
      </ul>
    </nav>
  </div>
</header>
```

## `src/components/LandConverter.astro`

```astro
---
import StandardSelector from './StandardSelector.astro';
import {
  STANDARDS,
  UNITS,
  UNIT_ORDER,
  compareStandards,
  convertAll,
  formatNumber,
  getStandard,
  summaryTargets,
  toInputValue,
  unitHint,
  unitLabel,
  unitShort,
  type StandardId,
  type UnitId,
} from '../lib/units';

interface Props {
  /** Pre-filled value (null for an empty calculator) */
  initialValue?: number | null;
  initialUnit?: UnitId;
  initialStandard?: StandardId;
  /** Unique id when more than one converter is on a page */
  id?: string;
  heading?: string;
  /** Heading element for the card title */
  headingTag?: 'h1' | 'h2';
  /** Read/write ?v=&u=&s= query parameters so results are shareable */
  syncUrl?: boolean;
}

const {
  initialValue = 5,
  initialUnit = 'marla',
  initialStandard = '225',
  id = 'converter',
  heading = 'Land Area Converter',
  headingTag = 'h2',
  syncUrl = true,
} = Astro.props;

const HeadingTag = headingTag;
const hasValue = initialValue !== null && Number.isFinite(initialValue);
const values = hasValue ? convertAll(initialValue as number, initialUnit, initialStandard) : null;
const comparison = hasValue ? compareStandards(initialValue as number, initialUnit) : null;
const std = getStandard(initialStandard);

const presets: { label: string; value: number; unit: UnitId }[] = [
  { label: '3 Marla', value: 3, unit: 'marla' },
  { label: '5 Marla', value: 5, unit: 'marla' },
  { label: '10 Marla', value: 10, unit: 'marla' },
  { label: '1 Kanal', value: 1, unit: 'kanal' },
  { label: '1 Acre', value: 1, unit: 'acre' },
];
---

<section
  class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
  aria-labelledby={`${id}-title`}
  data-land-converter
  data-value={hasValue ? String(initialValue) : ''}
  data-unit={initialUnit}
  data-standard={initialStandard}
  data-sync-url={syncUrl ? 'true' : 'false'}
>
  <div class="mb-5 flex flex-wrap items-end justify-between gap-2">
    <div>
      <HeadingTag id={`${id}-title`} class="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{heading}</HeadingTag>
      <p class="mt-1 text-sm text-slate-600">Type in any box. Every other unit updates instantly.</p>
    </div>
  </div>

  <StandardSelector name={`${id}-standard`} selected={initialStandard} />

  <div class="mt-5">
    <p class="mb-2 text-sm font-semibold text-slate-800" id={`${id}-presets-label`}>Quick fill</p>
    <div class="flex flex-wrap gap-2" role="group" aria-labelledby={`${id}-presets-label`}>
      {
        presets.map((p) => (
          <button
            type="button"
            class="min-h-11 rounded-full border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 transition-colors hover:border-brand-600 hover:bg-brand-50 hover:text-brand-800"
            data-preset-value={p.value}
            data-preset-unit={p.unit}
          >
            {p.label}
          </button>
        ))
      }
    </div>
  </div>

  <!-- Live result summary -->
  <div class="mt-5 rounded-xl bg-brand-700 px-4 py-4 text-white sm:px-5" aria-live="polite" aria-atomic="true">
    <p class="num text-sm font-medium text-brand-100" data-headline-source>
      {hasValue ? `${formatNumber(initialValue as number)} ${unitShort(initialUnit, initialValue as number)} at ${std.label}/Marla =` : 'Enter an area to convert'}
    </p>
    <p class="num mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl" data-headline-result>
      {values ? summaryTargets(values, initialUnit) : '—'}
    </p>
  </div>

  <!-- Unit inputs -->
  <div class="mt-5 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
    {
      UNIT_ORDER.map((u) => (
        <div>
          <label for={`${id}-${u}`} class="mb-1.5 flex items-baseline justify-between gap-2">
            <span class="text-sm font-semibold text-slate-800">{UNITS[u].label}</span>
            {UNITS[u].standardDependent && (
              <span class="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-amber-900 uppercase">
                depends on standard
              </span>
            )}
          </label>
          <div class="relative">
            <input
              id={`${id}-${u}`}
              type="text"
              inputmode="decimal"
              autocomplete="off"
              autocorrect="off"
              spellcheck="false"
              enterkeyhint="done"
              data-unit={u}
              value={values ? toInputValue(values[u]) : ''}
              placeholder="0"
              aria-describedby={`${id}-${u}-hint`}
              class="num h-14 w-full rounded-xl border-2 border-slate-300 bg-white pr-20 pl-4 text-xl font-semibold text-slate-900 placeholder:text-slate-400 hover:border-slate-400 focus:border-brand-700 focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-red-600"
            />
            <span class="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm font-semibold text-slate-500">
              {UNITS[u].short}
            </span>
          </div>
          <p id={`${id}-${u}-hint`} class="num mt-1 text-xs text-slate-600" data-hint={u}>
            {unitHint(u, initialStandard)}
          </p>
        </div>
      ))
    }
  </div>

  <div class="mt-5 flex flex-wrap items-center gap-3">
    <button
      type="button"
      data-copy
      class="inline-flex min-h-12 items-center gap-2 rounded-xl bg-slate-900 px-5 text-[15px] font-semibold text-white transition-colors hover:bg-slate-700"
    >
      <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
        <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
      </svg>
      Copy Results
    </button>
    <button
      type="button"
      data-clear
      class="inline-flex min-h-12 items-center rounded-xl border-2 border-slate-300 bg-white px-5 text-[15px] font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50"
    >
      Clear
    </button>
    <p class="text-sm font-semibold text-brand-800" role="status" aria-live="polite" data-copy-status></p>
  </div>

  <!-- Comparison across all three standards -->
  <div class="mt-8">
    <h3 class="text-lg font-bold text-slate-900">Same area in all 3 Marla standards</h3>
    <p class="num mt-1 text-sm text-slate-600" data-compare-source>
      {hasValue ? `Input: ${formatNumber(initialValue as number)} ${unitLabel(initialUnit, initialValue as number)}` : 'Enter an area above to compare.'}
    </p>
    <div class="mt-3 overflow-x-auto rounded-xl border border-slate-200">
      <table class="data-table">
        <thead>
          <tr>
            <th scope="col">Unit</th>
            {
              STANDARDS.map((s) => (
                <th
                  scope="col"
                  data-col={s.id}
                  data-active={s.id === initialStandard ? '' : undefined}
                  class="text-right data-active:bg-brand-100 data-active:text-brand-900"
                >
                  <span class="num block">{s.label}</span>
                  <span class="block text-xs font-medium text-slate-600">{s.name}</span>
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            UNIT_ORDER.map((u) => (
              <tr>
                <th scope="row">
                  {UNITS[u].label}
                </th>
                {STANDARDS.map((s) => (
                  <td
                    class="text-right data-active:bg-brand-50 data-active:font-semibold"
                    data-cell={`${u}|${s.id}`}
                    data-col={s.id}
                    data-active={s.id === initialStandard ? '' : undefined}
                  >
                    {comparison ? formatNumber(comparison[s.id][u]) : '—'}
                  </td>
                ))}
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  </div>
</section>

<script>
  import {
    STANDARDS,
    UNITS,
    UNIT_ORDER,
    compareStandards,
    convertAll,
    formatNumber,
    getStandard,
    isStandardId,
    isUnitId,
    parseInput,
    summaryTargets,
    toInputValue,
    unitHint,
    unitLabel,
    unitShort,
    type StandardId,
    type UnitId,
  } from '../lib/units';

  /** Async Clipboard API (HTTPS / localhost only, which Cloudflare Pages always provides). */
  async function copyText(text: string): Promise<boolean> {
    if (!navigator.clipboard?.writeText) return false;
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }

  function setupConverter(root: HTMLElement) {
    const inputs = new Map<UnitId, HTMLInputElement>();
    root.querySelectorAll<HTMLInputElement>('input[data-unit]').forEach((el) => {
      const u = el.dataset.unit;
      if (isUnitId(u)) inputs.set(u, el);
    });
    const radios = Array.from(root.querySelectorAll<HTMLInputElement>('input[data-standard]'));
    const headlineSource = root.querySelector<HTMLElement>('[data-headline-source]');
    const headlineResult = root.querySelector<HTMLElement>('[data-headline-result]');
    const compareSource = root.querySelector<HTMLElement>('[data-compare-source]');
    const standardNote = root.querySelector<HTMLElement>('[data-standard-note]');
    const cells = Array.from(root.querySelectorAll<HTMLElement>('[data-cell]'));
    const cols = Array.from(root.querySelectorAll<HTMLElement>('[data-col]'));
    const hints = Array.from(root.querySelectorAll<HTMLElement>('[data-hint]'));
    const copyBtn = root.querySelector<HTMLButtonElement>('[data-copy]');
    const clearBtn = root.querySelector<HTMLButtonElement>('[data-clear]');
    const copyStatus = root.querySelector<HTMLElement>('[data-copy-status]');
    const syncUrl = root.dataset.syncUrl === 'true';

    let standard: StandardId = isStandardId(root.dataset.standard) ? root.dataset.standard : '225';
    let unit: UnitId = isUnitId(root.dataset.unit) ? root.dataset.unit : 'marla';
    let value: number | null = root.dataset.value ? parseInput(root.dataset.value) : null;

    if (syncUrl) {
      const params = new URLSearchParams(window.location.search);
      const s = params.get('s');
      const u = params.get('u');
      const v = params.get('v');
      if (isStandardId(s)) standard = s;
      if (isUnitId(u) && v !== null) {
        const n = parseInput(v);
        if (n !== null) {
          unit = u;
          value = n;
        }
      }
    }

    function writeUrl() {
      if (!syncUrl) return;
      const url = new URL(window.location.href);
      if (value === null) {
        url.searchParams.delete('v');
        url.searchParams.delete('u');
        url.searchParams.delete('s');
      } else {
        url.searchParams.set('v', String(value));
        url.searchParams.set('u', unit);
        url.searchParams.set('s', standard);
      }
      window.history.replaceState(null, '', url.toString());
    }

    function render(writeSource: boolean) {
      const std = getStandard(standard);

      radios.forEach((r) => (r.checked = r.value === standard));
      if (standardNote) standardNote.textContent = std.usedBy;
      cols.forEach((el) => el.toggleAttribute('data-active', el.dataset.col === standard));
      hints.forEach((el) => {
        const u = el.dataset.hint;
        if (isUnitId(u)) el.textContent = unitHint(u, standard);
      });

      if (value === null) {
        inputs.forEach((el, u) => {
          if (u !== unit || writeSource) el.value = '';
        });
        if (headlineSource) headlineSource.textContent = 'Enter an area to convert';
        if (headlineResult) headlineResult.textContent = '—';
        if (compareSource) compareSource.textContent = 'Enter an area above to compare.';
        cells.forEach((c) => (c.textContent = '—'));
        writeUrl();
        return;
      }

      const values = convertAll(value, unit, standard);
      inputs.forEach((el, u) => {
        if (u === unit && !writeSource) return;
        el.value = toInputValue(values[u]);
        el.removeAttribute('aria-invalid');
      });

      if (headlineSource) {
        headlineSource.textContent = `${formatNumber(value)} ${unitShort(unit, value)} at ${std.label}/Marla =`;
      }
      if (headlineResult) headlineResult.textContent = summaryTargets(values, unit);
      if (compareSource) compareSource.textContent = `Input: ${formatNumber(value)} ${unitLabel(unit, value)}`;

      const comparison = compareStandards(value, unit);
      cells.forEach((c) => {
        const [u, s] = (c.dataset.cell ?? '').split('|');
        if (isUnitId(u) && isStandardId(s)) c.textContent = formatNumber(comparison[s][u]);
      });
      writeUrl();
    }

    inputs.forEach((el, u) => {
      el.addEventListener('input', () => {
        const parsed = parseInput(el.value);
        const isEmpty = el.value.trim() === '';
        if (!isEmpty && parsed === null) {
          el.setAttribute('aria-invalid', 'true');
          return;
        }
        el.removeAttribute('aria-invalid');
        unit = u;
        value = parsed;
        render(false);
      });
      el.addEventListener('blur', () => {
        // Normalise "1,125" -> "1125" once the user leaves the field.
        if (u === unit && value !== null && !el.hasAttribute('aria-invalid')) el.value = toInputValue(value);
      });
    });

    radios.forEach((r) =>
      r.addEventListener('change', () => {
        if (r.checked && isStandardId(r.value)) {
          standard = r.value;
          render(false);
        }
      }),
    );

    root.querySelectorAll<HTMLButtonElement>('[data-preset-value]').forEach((btn) =>
      btn.addEventListener('click', () => {
        const v = parseInput(btn.dataset.presetValue ?? '');
        const u = btn.dataset.presetUnit;
        if (v !== null && isUnitId(u)) {
          value = v;
          unit = u;
          render(true);
        }
      }),
    );

    clearBtn?.addEventListener('click', () => {
      value = null;
      unit = 'marla';
      render(true);
      inputs.get('marla')?.focus();
    });

    copyBtn?.addEventListener('click', async () => {
      if (value === null) {
        if (copyStatus) copyStatus.textContent = 'Enter an area first.';
        return;
      }
      const std = getStandard(standard);
      const values = convertAll(value, unit, standard);
      const comparison = compareStandards(value, unit);
      const lines: string[] = [];
      lines.push(`Land area conversion: ${formatNumber(value)} ${unitLabel(unit, value)}`);
      lines.push(`Selected standard: 1 Marla = ${std.label} (${std.name})`);
      lines.push('');
      UNIT_ORDER.forEach((u) => lines.push(`${UNITS[u].label}: ${formatNumber(values[u])}`));
      lines.push('');
      lines.push('Comparison across Marla standards:');
      lines.push(['Unit', ...STANDARDS.map((s) => s.label)].join(' | '));
      UNIT_ORDER.forEach((u) =>
        lines.push([UNITS[u].label, ...STANDARDS.map((s) => formatNumber(comparison[s.id][u]))].join(' | ')),
      );
      lines.push('');
      lines.push(window.location.href);
      const ok = await copyText(lines.join('\n'));
      if (copyStatus) {
        copyStatus.textContent = ok ? 'Copied to clipboard ✓' : 'Copy failed. Select and copy manually.';
        window.setTimeout(() => {
          if (copyStatus) copyStatus.textContent = '';
        }, 2500);
      }
    });

    render(true);
  }

  document.querySelectorAll<HTMLElement>('[data-land-converter]').forEach(setupConverter);
</script>
```

## `src/components/LinkGrid.astro`

```astro
---
interface Props {
  links: { href: string; label: string; note?: string }[];
  columns?: 1 | 2;
}
const { links, columns = 2 } = Astro.props;
---

<ul class:list={['grid gap-3', columns === 2 && 'sm:grid-cols-2']}>
  {
    links.map((l) => (
      <li>
        <a
          href={l.href}
          class="flex min-h-12 items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 transition-colors hover:border-brand-600 hover:bg-brand-50"
        >
          <span>
            <span class="block font-semibold">{l.label}</span>
            {l.note && <span class="mt-0.5 block text-sm text-slate-600">{l.note}</span>}
          </span>
          <span aria-hidden="true" class="shrink-0 text-brand-700">
            →
          </span>
        </a>
      </li>
    ))
  }
</ul>
```

## `src/components/PlotCalculator.astro`

```astro
---
import StandardSelector from './StandardSelector.astro';
import {
  STANDARDS,
  calculatePlot,
  formatNumber,
  fromSqFt,
  getStandard,
  type PlotResult,
  type StandardId,
} from '../lib/units';

interface Props {
  initialWidth?: number;
  initialDepth?: number;
  initialStandard?: StandardId;
  id?: string;
  heading?: string;
  headingTag?: 'h1' | 'h2';
}

const {
  initialWidth = 25,
  initialDepth = 45,
  initialStandard = '225',
  id = 'plot',
  heading = 'Plot Dimension & Cutting Calculator',
  headingTag = 'h2',
} = Astro.props;

const HeadingTag = headingTag;
const result: PlotResult | null = calculatePlot(initialWidth, initialDepth, initialStandard);
const std = getStandard(initialStandard);

function kmsText(r: PlotResult): string {
  const { kanal, marla, sarsai, sqft } = r.kms;
  const parts = [`${kanal} Kanal`, `${marla} Marla`, `${sarsai} Sarsai`];
  if (sqft > 0) parts.push(`${formatNumber(sqft)} sq ft`);
  return parts.join(' · ');
}

function closestText(r: PlotResult): { label: string; detail: string; match: boolean } {
  const c = r.closest;
  if (!c) return { label: '—', detail: '', match: false };
  if (c.diffSqft === 0) return { label: c.category.label, detail: 'Exact standard size', match: true };
  const dir = c.diffSqft > 0 ? 'larger' : 'smaller';
  return {
    label: c.category.label,
    detail: `${formatNumber(Math.abs(c.diffSqft))} sq ft ${dir} (${formatNumber(Math.abs(c.diffPercent), 2)}%) than a standard ${c.category.label} plot`,
    match: c.isMatch,
  };
}

const closest = result ? closestText(result) : { label: '—', detail: '', match: false };

const presets = [
  { label: '25 × 45', w: 25, d: 45 },
  { label: '30 × 60', w: 30, d: 60 },
  { label: '35 × 65', w: 35, d: 65 },
  { label: '50 × 90', w: 50, d: 90 },
];

// Initial preview rectangle proportions
const maxSide = Math.max(initialWidth, initialDepth) || 1;
const previewW = `${(initialWidth / maxSide) * 100}%`;
const previewH = `${(initialDepth / maxSide) * 100}%`;

const outputs: { key: string; label: string; value: string; big?: boolean }[] = [
  { key: 'sqft', label: 'Total area', value: result ? `${formatNumber(result.sqft)} sq ft` : '—', big: true },
  { key: 'marla', label: 'Exact Marla', value: result ? `${formatNumber(result.marla)} Marla` : '—', big: true },
  { key: 'sqyd', label: 'Square yards (gaz)', value: result ? `${formatNumber(result.sqyd)} sq yd` : '—' },
  { key: 'sqm', label: 'Square meters', value: result ? `${formatNumber(result.sqm)} sq m` : '—' },
  { key: 'kanal', label: 'Kanal', value: result ? `${formatNumber(result.kanal)} Kanal` : '—' },
  { key: 'kms', label: 'Kanal – Marla – Sarsai', value: result ? kmsText(result) : '—' },
];
---

<section
  class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
  aria-labelledby={`${id}-title`}
  data-plot-calculator
  data-standard={initialStandard}
>
  <div class="mb-5">
    <HeadingTag id={`${id}-title`} class="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{heading}</HeadingTag>
    <p class="mt-1 text-sm text-slate-600">Enter frontage and depth in feet. Use decimals for inches (6 in = 0.5 ft).</p>
  </div>

  <StandardSelector name={`${id}-standard`} selected={initialStandard} />

  <div class="mt-5 grid grid-cols-2 gap-3 sm:gap-4">
    <div>
      <label for={`${id}-width`} class="mb-1.5 block text-sm font-semibold text-slate-800">Frontage (width)</label>
      <div class="relative">
        <input
          id={`${id}-width`}
          type="text"
          inputmode="decimal"
          autocomplete="off"
          enterkeyhint="next"
          data-dim="width"
          value={String(initialWidth)}
          placeholder="25"
          class="num h-14 w-full rounded-xl border-2 border-slate-300 bg-white pr-10 pl-4 text-xl font-semibold text-slate-900 placeholder:text-slate-400 hover:border-slate-400 focus:border-brand-700 focus:outline-none aria-[invalid=true]:border-red-600"
        />
        <span class="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm font-semibold text-slate-500">ft</span>
      </div>
    </div>
    <div>
      <label for={`${id}-depth`} class="mb-1.5 block text-sm font-semibold text-slate-800">Depth (length)</label>
      <div class="relative">
        <input
          id={`${id}-depth`}
          type="text"
          inputmode="decimal"
          autocomplete="off"
          enterkeyhint="done"
          data-dim="depth"
          value={String(initialDepth)}
          placeholder="45"
          class="num h-14 w-full rounded-xl border-2 border-slate-300 bg-white pr-10 pl-4 text-xl font-semibold text-slate-900 placeholder:text-slate-400 hover:border-slate-400 focus:border-brand-700 focus:outline-none aria-[invalid=true]:border-red-600"
        />
        <span class="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm font-semibold text-slate-500">ft</span>
      </div>
    </div>
  </div>

  <div class="mt-4 flex flex-wrap gap-2" role="group" aria-label="Common plot dimensions">
    {
      presets.map((p) => (
        <button
          type="button"
          class="num min-h-11 rounded-full border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 transition-colors hover:border-brand-600 hover:bg-brand-50 hover:text-brand-800"
          data-preset-w={p.w}
          data-preset-d={p.d}
        >
          {p.label} ft
        </button>
      ))
    }
  </div>

  <div class="mt-6 grid gap-5 md:grid-cols-[minmax(0,1fr)_200px]">
    <div aria-live="polite" aria-atomic="false">
      <!-- Closest standard category -->
      <div
        class="rounded-xl px-4 py-4 text-white data-[match=false]:bg-slate-800 data-[match=true]:bg-brand-700 sm:px-5"
        data-closest-box
        data-match={closest.match ? 'true' : 'false'}
      >
        <p class="text-sm font-medium opacity-90">
          Closest standard plot <span class="num" data-closest-std>({std.label}/Marla)</span>
        </p>
        <p class="num mt-1 text-3xl font-extrabold tracking-tight" data-out="closest">{closest.label}</p>
        <p class="num mt-1 text-sm opacity-90" data-out="closest-detail">{closest.detail}</p>
      </div>

      <dl class="mt-4 grid grid-cols-2 gap-3">
        {
          outputs.map((o) => (
            <div class:list={['rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 sm:px-4', o.key === 'kms' && 'col-span-2']}>
              <dt class="text-xs font-semibold tracking-wide text-slate-600 uppercase">{o.label}</dt>
              <dd class:list={['num mt-0.5 font-bold text-slate-900', o.big ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg']} data-out={o.key}>
                {o.value}
              </dd>
            </div>
          ))
        }
      </dl>
    </div>

    <!-- Scaled plot preview -->
    <figure class="flex flex-col items-center">
      <div class="flex h-48 w-48 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-4" aria-hidden="true">
        <div class="relative flex h-full w-full items-center justify-center">
          <div
            class="relative rounded-sm border-2 border-brand-700 bg-brand-100/70"
            style={`width:${previewW};height:${previewH}`}
            data-preview
          >
            <span class="num absolute -bottom-0.5 left-1/2 -translate-x-1/2 translate-y-full pt-0.5 text-[11px] font-bold whitespace-nowrap text-slate-700" data-preview-w>{formatNumber(initialWidth)} ft</span>
            <span class="num absolute top-1/2 -right-0.5 translate-x-full -translate-y-1/2 pl-1 text-[11px] font-bold whitespace-nowrap text-slate-700" data-preview-d>{formatNumber(initialDepth)} ft</span>
          </div>
        </div>
      </div>
      <figcaption class="mt-2 text-center text-xs text-slate-600">Plot shape to scale. Frontage faces the road (bottom edge).</figcaption>
    </figure>
  </div>

  <div class="mt-6">
    <h3 class="text-lg font-bold text-slate-900">Same plot in each Marla standard</h3>
    <div class="mt-3 overflow-x-auto rounded-xl border border-slate-200">
      <table class="data-table">
        <thead>
          <tr>
            <th scope="col">Standard</th>
            <th scope="col" class="text-right">Marla</th>
            <th scope="col" class="text-right">Kanal</th>
          </tr>
        </thead>
        <tbody>
          {
            STANDARDS.map((s) => (
              <tr data-row={s.id} data-active={s.id === initialStandard ? '' : undefined} class="group">
                <th scope="row" class="group-data-active:bg-brand-50">
                  <span class="num">{s.label}</span> <span class="text-xs font-medium text-slate-600">· {s.name}</span>
                </th>
                <td class="text-right group-data-active:bg-brand-50 group-data-active:font-semibold" data-std-marla={s.id}>
                  {result ? formatNumber(fromSqFt(result.sqft, 'marla', s.id)) : '—'}
                </td>
                <td class="text-right group-data-active:bg-brand-50 group-data-active:font-semibold" data-std-kanal={s.id}>
                  {result ? formatNumber(fromSqFt(result.sqft, 'kanal', s.id)) : '—'}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  </div>
</section>

<script>
  import {
    calculatePlot,
    formatNumber,
    fromSqFt,
    getStandard,
    isStandardId,
    parseInput,
    type PlotResult,
    type StandardId,
  } from '../lib/units';

  function kmsText(r: PlotResult): string {
    const { kanal, marla, sarsai, sqft } = r.kms;
    const parts = [`${kanal} Kanal`, `${marla} Marla`, `${sarsai} Sarsai`];
    if (sqft > 0) parts.push(`${formatNumber(sqft)} sq ft`);
    return parts.join(' · ');
  }

  function setInvalid(el: HTMLInputElement, invalid: boolean) {
    if (invalid) el.setAttribute('aria-invalid', 'true');
    else el.removeAttribute('aria-invalid');
  }

  function setupPlot(root: HTMLElement) {
    const widthEl = root.querySelector<HTMLInputElement>('input[data-dim="width"]');
    const depthEl = root.querySelector<HTMLInputElement>('input[data-dim="depth"]');
    if (!widthEl || !depthEl) return;
    const radios = Array.from(root.querySelectorAll<HTMLInputElement>('input[data-standard]'));
    const standardNote = root.querySelector<HTMLElement>('[data-standard-note]');
    const out = (key: string) => root.querySelector<HTMLElement>(`[data-out="${key}"]`);
    const closestBox = root.querySelector<HTMLElement>('[data-closest-box]');
    const closestStd = root.querySelector<HTMLElement>('[data-closest-std]');
    const preview = root.querySelector<HTMLElement>('[data-preview]');
    const previewW = root.querySelector<HTMLElement>('[data-preview-w]');
    const previewD = root.querySelector<HTMLElement>('[data-preview-d]');
    const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-row]'));

    let standard: StandardId = isStandardId(root.dataset.standard) ? root.dataset.standard : '225';

    function setText(key: string, text: string) {
      const el = out(key);
      if (el) el.textContent = text;
    }

    function render() {
      const std = getStandard(standard);
      radios.forEach((r) => (r.checked = r.value === standard));
      if (standardNote) standardNote.textContent = std.usedBy;
      if (closestStd) closestStd.textContent = `(${std.label}/Marla)`;
      rows.forEach((r) => r.toggleAttribute('data-active', r.dataset.row === standard));

      const wRaw = widthEl!.value;
      const dRaw = depthEl!.value;
      const w = parseInput(wRaw);
      const d = parseInput(dRaw);
      setInvalid(widthEl!, wRaw.trim() !== '' && w === null);
      setInvalid(depthEl!, dRaw.trim() !== '' && d === null);

      const result = w !== null && d !== null ? calculatePlot(w, d, standard) : null;

      if (!result || w === null || d === null) {
        ['sqft', 'marla', 'sqyd', 'sqm', 'kanal', 'kms', 'closest'].forEach((k) => setText(k, '—'));
        setText('closest-detail', 'Enter frontage and depth to see the plot category.');
        closestBox?.setAttribute('data-match', 'false');
        root.querySelectorAll<HTMLElement>('[data-std-marla],[data-std-kanal]').forEach((c) => (c.textContent = '—'));
        if (preview) {
          preview.style.width = '100%';
          preview.style.height = '100%';
        }
        if (previewW) previewW.textContent = '';
        if (previewD) previewD.textContent = '';
        return;
      }

      setText('sqft', `${formatNumber(result.sqft)} sq ft`);
      setText('marla', `${formatNumber(result.marla)} Marla`);
      setText('sqyd', `${formatNumber(result.sqyd)} sq yd`);
      setText('sqm', `${formatNumber(result.sqm)} sq m`);
      setText('kanal', `${formatNumber(result.kanal)} Kanal`);
      setText('kms', kmsText(result));

      const c = result.closest;
      if (c) {
        setText('closest', c.category.label);
        if (c.diffSqft === 0) {
          setText('closest-detail', 'Exact standard size');
        } else {
          const dir = c.diffSqft > 0 ? 'larger' : 'smaller';
          setText(
            'closest-detail',
            `${formatNumber(Math.abs(c.diffSqft))} sq ft ${dir} (${formatNumber(Math.abs(c.diffPercent), 2)}%) than a standard ${c.category.label} plot`,
          );
        }
        closestBox?.setAttribute('data-match', c.isMatch ? 'true' : 'false');
      }

      root.querySelectorAll<HTMLElement>('[data-std-marla]').forEach((cell) => {
        const s = cell.dataset.stdMarla;
        if (isStandardId(s)) cell.textContent = formatNumber(fromSqFt(result.sqft, 'marla', s));
      });
      root.querySelectorAll<HTMLElement>('[data-std-kanal]').forEach((cell) => {
        const s = cell.dataset.stdKanal;
        if (isStandardId(s)) cell.textContent = formatNumber(fromSqFt(result.sqft, 'kanal', s));
      });

      if (preview) {
        const max = Math.max(w, d);
        // Keep very thin plots visible
        preview.style.width = `${Math.max((w / max) * 100, 6)}%`;
        preview.style.height = `${Math.max((d / max) * 100, 6)}%`;
      }
      if (previewW) previewW.textContent = `${formatNumber(w)} ft`;
      if (previewD) previewD.textContent = `${formatNumber(d)} ft`;
    }

    widthEl.addEventListener('input', render);
    depthEl.addEventListener('input', render);
    radios.forEach((r) =>
      r.addEventListener('change', () => {
        if (r.checked && isStandardId(r.value)) {
          standard = r.value;
          render();
        }
      }),
    );
    root.querySelectorAll<HTMLButtonElement>('[data-preset-w]').forEach((btn) =>
      btn.addEventListener('click', () => {
        widthEl.value = btn.dataset.presetW ?? '';
        depthEl.value = btn.dataset.presetD ?? '';
        render();
      }),
    );

    render();
  }

  document.querySelectorAll<HTMLElement>('[data-plot-calculator]').forEach(setupPlot);
</script>
```

## `src/components/ReferenceTable.astro`

```astro
---
/**
 * Static (build-time) HTML reference table for crawlers and no-JS visitors.
 * Rows = values in the `from` unit, columns = `to` unit under each Marla standard.
 * If the result is identical in every standard (e.g. Kanal -> Marla, Acre -> sq ft), it shows
 * one result column plus a standard-dependent unit for each standard instead: square feet when
 * both units already depend on the Marla size, otherwise Marla.
 */
import { STANDARDS, UNITS, convert, formatNumber, unitShort, type UnitId } from '../lib/units';

interface Props {
  from: UnitId;
  to: UnitId;
  values: number[];
  highlight?: number;
  caption?: string;
}

const { from, to, values, highlight, caption } = Astro.props;

const sameAcross = values.every((v) => {
  const results = STANDARDS.map((s) => convert(v, from, to, s.id));
  return results.every((r) => r === results[0]);
});
const extraUnit: UnitId = UNITS[from].standardDependent && UNITS[to].standardDependent ? 'sqft' : 'marla';
---

<div class="overflow-x-auto rounded-xl border border-slate-200 bg-white">
  <table class="data-table">
    <caption class="px-3 py-3 text-left text-sm font-medium text-slate-600">
      {caption ?? `${UNITS[from].label} to ${UNITS[to].label} conversion table`}
    </caption>
    <thead>
      <tr>
        <th scope="col">{UNITS[from].label}</th>
        {
          sameAcross ? (
            <>
              <th scope="col" class="text-right">
                {UNITS[to].label}
                <span class="block text-xs font-medium text-slate-600">all standards</span>
              </th>
              {STANDARDS.map((s) => (
                <th scope="col" class="text-right">
                  {UNITS[extraUnit].short} <span class="num block text-xs font-medium text-slate-600">@ {s.label}</span>
                </th>
              ))}
            </>
          ) : (
            STANDARDS.map((s) => (
              <th scope="col" class="text-right">
                {UNITS[to].label}
                <span class="num block text-xs font-medium text-slate-600">
                  @ {s.label} ({s.name})
                </span>
              </th>
            ))
          )
        }
      </tr>
    </thead>
    <tbody>
      {
        values.map((v) => (
          <tr class:list={[v === highlight && 'font-semibold']}>
            <th scope="row" class:list={[v === highlight && 'bg-brand-50']}>
              {formatNumber(v)} {unitShort(from, v)}
            </th>
            {sameAcross ? (
              <>
                <td class:list={['text-right', v === highlight && 'bg-brand-50']}>{formatNumber(convert(v, from, to, '225'))}</td>
                {STANDARDS.map((s) => (
                  <td class:list={['text-right', v === highlight && 'bg-brand-50']}>{formatNumber(convert(v, from, extraUnit, s.id))}</td>
                ))}
              </>
            ) : (
              STANDARDS.map((s) => (
                <td class:list={['text-right', v === highlight && 'bg-brand-50']}>{formatNumber(convert(v, from, to, s.id))}</td>
              ))
            )}
          </tr>
        ))
      }
    </tbody>
  </table>
</div>
```

## `src/components/SidebarLinks.astro`

```astro
---
import { POPULAR_CONVERSIONS, type ConversionPage } from '../data/conversions';
import { GUIDES } from '../data/guides';

interface Props {
  /** Links to show; defaults to the popular conversions */
  links?: ConversionPage[];
  heading?: string;
}
const { links = POPULAR_CONVERSIONS, heading = 'Popular conversions' } = Astro.props;
---

<div class="space-y-6">
  <nav aria-label={heading} class="rounded-xl border border-slate-200 bg-white p-4">
    <p class="mb-2 text-sm font-bold text-slate-900">{heading}</p>
    <ul class="space-y-0.5">
      {
        links.map((c) => (
          <li>
            <a
              href={`/convert/${c.slug}/`}
              class="flex min-h-10 items-center rounded-lg px-2 text-[15px] font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-800"
            >
              {c.linkLabel}
            </a>
          </li>
        ))
      }
    </ul>
    <div class="mt-3 space-y-0.5 border-t border-slate-100 pt-3">
      <a href="/convert/" class="flex min-h-10 items-center rounded-lg px-2 text-[15px] font-semibold text-brand-700 hover:bg-brand-50">
        All conversions →
      </a>
      <a
        href="/plot-size-calculator/"
        class="flex min-h-10 items-center rounded-lg px-2 text-[15px] font-semibold text-brand-700 hover:bg-brand-50"
      >
        Plot size calculator →
      </a>
    </div>
  </nav>

  <nav aria-label="Guides" class="rounded-xl border border-slate-200 bg-white p-4">
    <p class="mb-2 text-sm font-bold text-slate-900">Land measurement guides</p>
    <ul class="space-y-0.5">
      {
        GUIDES.map((g) => (
          <li>
            <a
              href={`/guides/${g.slug}/`}
              class="flex min-h-10 items-center rounded-lg px-2 py-1.5 text-[15px] leading-snug font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-800"
            >
              {g.navLabel}
            </a>
          </li>
        ))
      }
    </ul>
  </nav>
</div>
```

## `src/components/StandardSelector.astro`

```astro
---
import { STANDARDS, type StandardId } from '../lib/units';

interface Props {
  /** Unique radio group name per calculator instance */
  name: string;
  selected: StandardId;
  legend?: string;
}
const { name, selected, legend = 'Marla standard' } = Astro.props;
---

<fieldset>
  <legend class="mb-2 text-sm font-semibold text-slate-800">{legend}</legend>
  <div class="grid grid-cols-3 gap-2">
    {
      STANDARDS.map((s) => (
        <label class="relative flex min-h-[4.25rem] cursor-pointer flex-col justify-center rounded-xl border-2 border-slate-200 bg-white px-1 py-2 text-center transition-colors hover:border-brand-300 has-checked:border-brand-700 has-checked:bg-brand-50 has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand-600 sm:px-3">
          <input
            type="radio"
            class="sr-only"
            name={name}
            value={s.id}
            data-standard={s.id}
            checked={s.id === selected}
          />
          <span class="num text-[13px] font-bold tracking-tight whitespace-nowrap text-slate-900 min-[400px]:text-[15px] sm:text-base">{s.label}</span>
          <span class="mt-0.5 text-[11px] leading-tight font-medium text-slate-600 sm:text-xs">{s.name}</span>
        </label>
      ))
    }
  </div>
  <p class="mt-2 text-xs leading-5 text-slate-600" data-standard-note>
    {STANDARDS.find((s) => s.id === selected)?.usedBy}
  </p>
</fieldset>
```

## `src/config/site.ts`

```ts
export const SITE = {
  name: 'LandNaap',
  tagline: 'Marla, Kanal & Plot Size Calculator for Pakistan',
  description:
    'Free, instant Marla, Kanal, square feet, square yards (gaz), acre and sarsai converter with 225, 250 and 272.25 sq ft Marla standards, plus a plot dimension calculator.',
  /** Production origin (no trailing slash). Used by astro.config.mjs, canonicals, JSON-LD and the sitemap. */
  url: 'https://landnaap.app',
  locale: 'en_PK',
  lang: 'en-PK',
  themeColor: '#047857',
  contactEmail: 'contact@landnaap.app',
  /** Person who operates the site (shown on About, Privacy, Terms, Contact and in the footer). */
  owner: 'Hamza Bin Maqsood',
  city: 'Islamabad, Pakistan',
  /** Courts named in the Terms of Use governing-law clause. */
  jurisdiction: 'Islamabad',
  lastUpdated: 'November 16, 2026',
} as const;

/**
 * Google AdSense.
 *
 * While `client` is empty, ads are completely OFF: no AdSense script is loaded and no ad
 * containers are rendered, so pages show no empty boxes and reserve no space.
 *
 * After approval, fill in your publisher ID and the ad-unit slot IDs from AdSense
 * (Ads > By ad unit). Each placement with a slot ID then renders a borderless container
 * with a fixed min-height (90px banner / 250px rectangle) so the ad loads with zero CLS.
 * A placement left as '' stays hidden.
 */
export const ADSENSE: {
  client: string;
  slots: Record<AdPlacement, string>;
} = {
  client: '', // e.g. 'ca-pub-1234567890123456'
  slots: {
    'header-banner': '',
    'sidebar-rectangle': '',
    'in-content-1': '',
  },
};

export type AdPlacement = 'header-banner' | 'sidebar-rectangle' | 'in-content-1';

export function adsEnabled(placement?: AdPlacement): boolean {
  if (!ADSENSE.client) return false;
  return placement ? ADSENSE.slots[placement] !== '' : true;
}

export const NAV_LINKS = [
  { href: '/', label: 'Area Converter' },
  { href: '/plot-size-calculator/', label: 'Plot Calculator' },
  { href: '/convert/', label: 'Conversions' },
  { href: '/guides/', label: 'Guides' },
  { href: '/about/', label: 'About' },
] as const;

export const FOOTER_LINKS = [
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
  { href: '/privacy-policy/', label: 'Privacy Policy' },
  { href: '/terms/', label: 'Terms of Use' },
] as const;
```

## `src/data/conversions.ts`

```ts
/**
 * Programmatic conversion pages.
 *
 * Each spec only states the value, the units, a category and a hand-written `context`
 * paragraph (where that size is used). Slug, <title>, meta description, H1, answers,
 * worked calculations, reference-table rows and internal links are all generated from the
 * shared conversion engine, so every number on every page matches the calculator exactly.
 */
import {
  SQM_PER_SQFT,
  UNITS,
  formatNumber,
  fromSqFt,
  getStandard,
  sqftPerUnit,
  toSqFt,
  type StandardId,
  type UnitId,
} from '../lib/units.ts';
import type { FaqItem } from './faqs.ts';

export type CategoryId = 'marla-sqft' | 'marla-sqyd' | 'marla-sqm' | 'kanal' | 'acre-sqft' | 'sarsai-gaz';

export interface Category {
  id: CategoryId;
  title: string;
  description: string;
}

export const CATEGORIES: readonly Category[] = [
  {
    id: 'marla-sqft',
    title: 'Marla to Square Feet',
    description: 'Residential and commercial plot sizes from 2 to 15 Marla in square feet.',
  },
  {
    id: 'marla-sqyd',
    title: 'Marla to Square Yards (Gaz)',
    description: 'Compare Punjab Marla plots with Karachi and Sindh square-yard plots.',
  },
  {
    id: 'marla-sqm',
    title: 'Marla to Square Meters',
    description: 'Metric equivalents for architects, engineers and overseas buyers.',
  },
  {
    id: 'kanal',
    title: 'Kanal Conversions',
    description: 'Kanal to square feet, Marla, square yards, square meters and acres.',
  },
  {
    id: 'acre-sqft',
    title: 'Acre & Square Feet (Reverse)',
    description: 'Acres to Kanal and Marla, and square-foot areas back to Marla.',
  },
  {
    id: 'sarsai-gaz',
    title: 'Sarsai & Gaz Conversions',
    description: 'Sarsai, single-Marla sizes and square yards back to Marla and Kanal.',
  },
];

interface ConversionSpec {
  value: number;
  from: UnitId;
  to: UnitId;
  category: CategoryId;
  /** Unique paragraph: where this size / conversion is used in practice. */
  context: string;
  defaultStandard?: StandardId;
}

export interface ConversionPage {
  slug: string;
  value: number;
  from: UnitId;
  to: UnitId;
  category: CategoryId;
  context: string;
  defaultStandard: StandardId;
  title: string;
  description: string;
  h1: string;
  linkLabel: string;
  /** Result in the target unit for each Marla standard */
  results: Record<StandardId, number>;
  /** True when the result does not depend on the Marla standard */
  sameAcross: boolean;
  tableValues: number[];
}

/** Display order for "a, b or c" answers: ascending Marla size. */
export const ANSWER_ORDER: readonly StandardId[] = ['225', '250', '272.25'];

const SPECS: ConversionSpec[] = [
  /* ---------------- Marla to Square Feet ---------------- */
  {
    value: 2,
    from: 'marla',
    to: 'sqft',
    category: 'marla-sqft',
    context:
      'Two Marla is the smallest size still traded as a building plot. It turns up in the older, dense neighbourhoods of Lahore, Rawalpindi and Gujranwala, where it is built upwards as a narrow two- or three-storey house, and as small shop plots in society commercial areas.',
  },
  {
    value: 3,
    from: 'marla',
    to: 'sqft',
    category: 'marla-sqft',
    context:
      'Three Marla plots are the backbone of affordable urban housing in Punjab. You will find them in low-cost schemes and the compact blocks of private societies around Lahore and Faisalabad, usually built as double-storey houses where the covered area matters more than the plot itself.',
  },
  {
    value: 3.5,
    from: 'marla',
    to: 'sqft',
    category: 'marla-sqft',
    context:
      '3.5 Marla is a developer-created category marketed to first-time buyers who want a little more than 3 Marla without the price of 5 Marla. Because it is not a traditional size, check whether the scheme defines its Marla as 225 or 250 sq ft before you compare price per Marla.',
  },
  {
    value: 4,
    from: 'marla',
    to: 'sqft',
    category: 'marla-sqft',
    context:
      'Four Marla is best known as a commercial plot size: DHA Lahore and many large societies sell 4 Marla commercial plots on their boulevards and markets. In smaller Punjab towns it is also a common compact house plot.',
  },
  {
    value: 5,
    from: 'marla',
    to: 'sqft',
    category: 'marla-sqft',
    context:
      'Five Marla is the most traded residential plot size in Punjab and Khyber Pakhtunkhwa. DHA Lahore and Bahria Town Lahore lay it out as 25 × 45 ft, and it is the entry-level house plot in most LDA-approved schemes.',
  },
  {
    value: 6,
    from: 'marla',
    to: 'sqft',
    category: 'marla-sqft',
    context:
      'Six Marla rarely appears in modern society master plans, but it is common in older town layouts and cooperative housing schemes. It also arises when a 12 Marla plot is divided between two owners or heirs.',
  },
  {
    value: 7,
    from: 'marla',
    to: 'sqft',
    category: 'marla-sqft',
    context:
      'Seven Marla plots are offered in designated blocks of some newer society phases, typically with a 30 ft frontage. Families choose them as a step up from 5 Marla when they want a larger ground floor without paying for 10 Marla.',
  },
  {
    value: 8,
    from: 'marla',
    to: 'sqft',
    category: 'marla-sqft',
    context:
      'Eight Marla is a standard category in both residential and commercial planning. DHA Lahore and Bahria Town Lahore sell 8 Marla plots, and on the 225 sq ft standard it matches the familiar 30 × 60 ft layout used in many schemes.',
  },
  {
    value: 10,
    from: 'marla',
    to: 'sqft',
    category: 'marla-sqft',
    context:
      'Ten Marla, or half a Kanal, is the classic family-house plot in Pakistani housing societies. DHA Lahore and Bahria Town Lahore generally cut it as 35 × 65 ft, which is slightly more than 10 Marla on the 225 sq ft standard.',
  },
  {
    value: 12,
    from: 'marla',
    to: 'sqft',
    category: 'marla-sqft',
    context:
      'Twelve Marla plots appear in older Lahore and Rawalpindi societies and in some newer schemes; DHA Multan, for example, offers a 12 Marla residential category. Buyers pick it when they want a lawn and wider frontage but not a full Kanal.',
  },
  {
    value: 15,
    from: 'marla',
    to: 'sqft',
    category: 'marla-sqft',
    context:
      'Fifteen Marla, three quarters of a Kanal, is uncommon in new master plans. It is usually found in older town layouts or where part of a 1 Kanal plot has been sold off, so the actual dimensions should always be checked on site.',
  },

  /* ---------------- Marla to Square Yards ---------------- */
  {
    value: 1,
    from: 'marla',
    to: 'sqyd',
    category: 'marla-sqyd',
    context:
      'This is the key figure for mental conversion: a society Marla is exactly 25 square yards and a revenue Marla is 30.25 square yards. Multiply any Marla size by that number to get its area in gaz.',
  },
  {
    value: 2,
    from: 'marla',
    to: 'sqyd',
    category: 'marla-sqyd',
    context:
      'Small shops, kiosks and commercial units are frequently advertised in square yards, especially by Karachi-based investors. Converting 2 Marla to gaz lets you compare those listings with Marla-based commercial plots in Punjab.',
  },
  {
    value: 3,
    from: 'marla',
    to: 'sqyd',
    category: 'marla-sqyd',
    context:
      'Developers marketing to overseas Pakistanis often quote both Marla and square yards. A 3 Marla society plot is a round 75 gaz, which helps when comparing it with the small square-yard plots sold in Sindh.',
  },
  {
    value: 4,
    from: 'marla',
    to: 'sqyd',
    category: 'marla-sqyd',
    context:
      'On the society standard a 4 Marla plot is exactly 100 square yards, a useful benchmark against the 120 gaz plots that are among the most common residential sizes in Karachi.',
  },
  {
    value: 5,
    from: 'marla',
    to: 'sqyd',
    category: 'marla-sqyd',
    context:
      'Buyers moving between Lahore and Karachi most often need this conversion. A 5 Marla society plot is 125 gaz, so it is slightly larger than Karachi’s popular 120 square-yard plot.',
  },
  {
    value: 6,
    from: 'marla',
    to: 'sqyd',
    category: 'marla-sqyd',
    context:
      'Six Marla is 150 square yards in a housing society. It sits between Karachi’s 120 and 200 gaz categories, which is handy when a family is comparing a Punjab house with one in Sindh.',
  },
  {
    value: 7,
    from: 'marla',
    to: 'sqyd',
    category: 'marla-sqyd',
    context:
      'Seven Marla equals 175 square yards on the society standard. Agents in Islamabad and Rawalpindi sometimes quote square yards alongside Marla, so this figure helps reconcile the two listing styles.',
  },
  {
    value: 8,
    from: 'marla',
    to: 'sqyd',
    category: 'marla-sqyd',
    context:
      'An 8 Marla society plot is exactly 200 square yards, the same area as a 200 gaz plot in Karachi. That makes 8 Marla one of the easiest sizes to compare across provinces.',
  },
  {
    value: 10,
    from: 'marla',
    to: 'sqyd',
    category: 'marla-sqyd',
    context:
      'Ten Marla equals 250 square yards in a housing society, a little more than Karachi’s common 240 gaz plot. On revenue land the same 10 Marla is over 300 square yards.',
  },
  {
    value: 12,
    from: 'marla',
    to: 'sqyd',
    category: 'marla-sqyd',
    context:
      'Twelve Marla is 300 square yards on the society standard. Investors use this conversion when weighing a 12 Marla plot in Punjab against 300 gaz plots in Karachi schemes.',
  },
  {
    value: 15,
    from: 'marla',
    to: 'sqyd',
    category: 'marla-sqyd',
    context:
      'Fifteen Marla works out to 375 square yards in a society, just under the 400 gaz bungalow plots found in established Karachi neighbourhoods.',
  },

  /* ---------------- Marla to Square Meters ---------------- */
  {
    value: 3,
    from: 'marla',
    to: 'sqm',
    category: 'marla-sqm',
    context:
      'Architects and structural engineers often model small houses in metric units. Converting a 3 Marla plot to square meters makes it easy to compare with apartment and townhouse sizes quoted abroad.',
  },
  {
    value: 5,
    from: 'marla',
    to: 'sqm',
    category: 'marla-sqm',
    context:
      'Overseas Pakistanis in Europe, the Gulf and North America usually think in square meters. A 5 Marla society plot is about 104.5 sq m, a size they can picture against homes where they live.',
  },
  {
    value: 7,
    from: 'marla',
    to: 'sqm',
    category: 'marla-sqm',
    context:
      'Imported design software, energy models and international building references work in metric. Converting 7 Marla to square meters avoids rounding errors when transferring a plot outline into those tools.',
  },
  {
    value: 10,
    from: 'marla',
    to: 'sqm',
    category: 'marla-sqm',
    context:
      'Development finance, valuation reports for foreign lenders and some government forms ask for land area in square meters. A 10 Marla society plot is just over 209 sq m.',
  },

  /* ---------------- Kanal ---------------- */
  {
    value: 1,
    from: 'kanal',
    to: 'sqft',
    category: 'kanal',
    context:
      'One Kanal is the benchmark premium plot in Pakistani societies. In DHA Lahore and Bahria Town Lahore it is usually 50 × 90 ft (4,500 sq ft), while the same Kanal in revenue records is 5,445 sq ft.',
  },
  {
    value: 1,
    from: 'kanal',
    to: 'marla',
    category: 'kanal',
    context:
      'The Kanal-to-Marla ratio is fixed at 20 everywhere, so this conversion never needs a standard. What changes between a society Kanal and a revenue Kanal is the size of each Marla, not the count.',
  },
  {
    value: 1,
    from: 'kanal',
    to: 'sqyd',
    category: 'kanal',
    context:
      'A society Kanal is exactly 500 square yards, the same area as the 500 gaz plots that are a staple of DHA Karachi. That one-to-one match makes Lahore and Karachi premium plots easy to compare.',
  },
  {
    value: 1,
    from: 'kanal',
    to: 'sqm',
    category: 'kanal',
    context:
      'Landscape architects, solar installers and international clients often need Kanal plots in square meters. One society Kanal is about 418 sq m, and a revenue Kanal is about 506 sq m.',
  },
  {
    value: 1,
    from: 'kanal',
    to: 'acre',
    category: 'kanal',
    context:
      'On revenue land a Kanal is exactly one eighth of an acre, which is how fard and jamabandi records divide farmland. On the society standard a Kanal is a slightly smaller fraction of an acre.',
    defaultStandard: '272.25',
  },
  {
    value: 2,
    from: 'kanal',
    to: 'sqft',
    category: 'kanal',
    context:
      'Two Kanal is the largest standard residential plot in many DHA Lahore phases. Depending on the phase it is laid out as 75 × 120 ft or 100 × 90 ft, both 9,000 sq ft on the 225 sq ft standard.',
  },
  {
    value: 2,
    from: 'kanal',
    to: 'marla',
    category: 'kanal',
    context:
      'Some listings, especially for older properties and amalgamated plots, describe a 2 Kanal house as 40 Marla. The count is the same in every standard; only the square footage differs.',
  },
  {
    value: 2,
    from: 'kanal',
    to: 'sqyd',
    category: 'kanal',
    context:
      'Two society Kanal equal exactly 1,000 square yards, the same as the 1,000 gaz bungalow plots in DHA Karachi. It is the conversion to use when comparing the top residential categories of both cities.',
  },
  {
    value: 4,
    from: 'kanal',
    to: 'acre',
    category: 'kanal',
    context:
      'Four Kanal is a typical minimum size in farmhouse schemes on the outskirts of Lahore and Islamabad. On the revenue standard it is exactly half an acre.',
    defaultStandard: '272.25',
  },
  {
    value: 8,
    from: 'kanal',
    to: 'acre',
    category: 'kanal',
    context:
      'Eight Kanal is one full acre in revenue records, so agricultural land, orchards and larger farmhouses are often sold in 8 Kanal units. The fard will show it as 8 Kanal 0 Marla.',
    defaultStandard: '272.25',
  },
  {
    value: 10,
    from: 'kanal',
    to: 'acre',
    category: 'kanal',
    context:
      'Ten Kanal parcels are common for poultry sheds, nurseries and small orchards near cities. On revenue land that is one and a quarter acres.',
    defaultStandard: '272.25',
  },

  /* ---------------- Acre & Square Feet (reverse) ---------------- */
  {
    value: 1,
    from: 'acre',
    to: 'kanal',
    category: 'acre-sqft',
    context:
      'Agricultural land in Punjab is recorded in acres, Kanal and Marla on the revenue standard, where an acre divides exactly into 8 Kanal. Developers converting farmland into society plots instead count in 225 sq ft Marla.',
    defaultStandard: '272.25',
  },
  {
    value: 1,
    from: 'acre',
    to: 'marla',
    category: 'acre-sqft',
    context:
      'Land developers estimate how many plots an acre can yield by converting it to Marla. On the revenue standard an acre is 160 Marla; on the society standard it is 193.6 Marla before roads, parks and amenities are deducted.',
    defaultStandard: '272.25',
  },
  {
    value: 1,
    from: 'acre',
    to: 'sqft',
    category: 'acre-sqft',
    context:
      'The acre is a fixed international unit of 43,560 sq ft, so its square footage never depends on the Marla standard. Only its value in Marla and Kanal changes.',
    defaultStandard: '272.25',
  },
  {
    value: 1,
    from: 'acre',
    to: 'sqyd',
    category: 'acre-sqft',
    context:
      'Large land parcels in Sindh and Balochistan are often discussed in acres while plots inside them are sold in square yards. One acre is exactly 4,840 square yards.',
    defaultStandard: '272.25',
  },
  {
    value: 2,
    from: 'acre',
    to: 'kanal',
    category: 'acre-sqft',
    context:
      'Two-acre parcels are a common size for farmhouses, small dairy farms and wedding venues on city edges. In revenue records two acres are 16 Kanal.',
    defaultStandard: '272.25',
  },
  {
    value: 5,
    from: 'acre',
    to: 'kanal',
    category: 'acre-sqft',
    context:
      'Five acres is a typical holding for small farmers in Punjab and a common unit for land purchased for warehouses or small housing schemes. On the revenue standard it is 40 Kanal.',
    defaultStandard: '272.25',
  },
  {
    value: 1000,
    from: 'sqft',
    to: 'marla',
    category: 'acre-sqft',
    context:
      'Apartments, offices and builder floors are sold by square feet. Converting 1,000 sq ft to Marla shows how a flat compares with a plot: it is under 5 Marla on every standard.',
  },
  {
    value: 1125,
    from: 'sqft',
    to: 'marla',
    category: 'acre-sqft',
    context:
      '1,125 sq ft is exactly a 25 × 45 ft plot, the standard 5 Marla cut in DHA Lahore and Bahria Town Lahore. If someone quotes 1,125 sq ft, they almost certainly mean a society 5 Marla.',
  },
  {
    value: 2250,
    from: 'sqft',
    to: 'marla',
    category: 'acre-sqft',
    context:
      '2,250 sq ft is precisely 10 Marla on the 225 sq ft standard. Building plans and approval forms record plot area in square feet, so this is the figure you will see on a 10 Marla house map.',
  },
  {
    value: 4500,
    from: 'sqft',
    to: 'marla',
    category: 'acre-sqft',
    context:
      '4,500 sq ft is a 50 × 90 ft plot, the standard society Kanal. On revenue land the same 4,500 sq ft is only about 16.5 Marla, which is why fard and society figures for the "same" Kanal differ.',
  },
  {
    value: 5445,
    from: 'sqft',
    to: 'marla',
    category: 'acre-sqft',
    context:
      '5,445 sq ft is the exact area of one revenue Kanal (20 × 272.25 sq ft). Measured with a society Marla the same land is 24.2 Marla, a difference that matters when land is bought from farmers and resold as plots.',
  },

  /* ---------------- Sarsai & Gaz ---------------- */
  {
    value: 1,
    from: 'marla',
    to: 'sarsai',
    category: 'sarsai-gaz',
    context:
      'Sarsai is the smallest unit in Punjab revenue records, used for slivers of land left over after Kanal and Marla. One Marla is always 9 Sarsai; a revenue Sarsai is one square karam of 5.5 × 5.5 ft.',
  },
  {
    value: 1,
    from: 'marla',
    to: 'sqft',
    category: 'sarsai-gaz',
    context:
      'Every land calculation in Pakistan starts here. One Marla is 225 sq ft in housing societies, 272.25 sq ft in revenue records and 250 sq ft in some developer schemes, so always confirm which one a seller means.',
  },
  {
    value: 100,
    from: 'sqyd',
    to: 'marla',
    category: 'sarsai-gaz',
    context:
      '100 square yards is a common small-plot size in Sindh and in some Islamabad and Rawalpindi listings. On the society standard it is exactly 4 Marla.',
  },
  {
    value: 120,
    from: 'sqyd',
    to: 'marla',
    category: 'sarsai-gaz',
    context:
      'The 120 gaz plot is one of the most common residential sizes in Karachi. Converted to Punjab units it is just under 5 Marla on the society standard and about 4 Marla on the revenue standard.',
  },
  {
    value: 240,
    from: 'sqyd',
    to: 'marla',
    category: 'sarsai-gaz',
    context:
      'A 240 gaz plot is a standard family-house size in Karachi. In Punjab terms it is slightly under 10 Marla on the society standard.',
  },
  {
    value: 250,
    from: 'sqyd',
    to: 'marla',
    category: 'sarsai-gaz',
    context:
      '250 square yards is exactly 10 Marla on the 225 sq ft society standard, so it maps neatly onto the half-Kanal plots of Lahore and Islamabad societies.',
  },
  {
    value: 400,
    from: 'sqyd',
    to: 'marla',
    category: 'sarsai-gaz',
    context:
      'The 400 gaz bungalow plot is a familiar size in established Karachi neighbourhoods. On the society standard it is 16 Marla, between a 12 Marla plot and a full Kanal.',
  },
  {
    value: 500,
    from: 'sqyd',
    to: 'kanal',
    category: 'sarsai-gaz',
    context:
      '500 square yards is the signature plot size of DHA Karachi and equals exactly 1 Kanal on the society standard. Measured against a revenue Kanal of 605 square yards, it is only about 0.83 Kanal.',
  },
  {
    value: 1000,
    from: 'sqyd',
    to: 'kanal',
    category: 'sarsai-gaz',
    context:
      'The 1,000 gaz plot is the top residential category in DHA Karachi. On the society standard it is exactly 2 Kanal, matching the largest plots in DHA Lahore.',
  },
];

/* ------------------------------------------------------------------ */
/* Naming                                                               */
/* ------------------------------------------------------------------ */

const SLUG_UNIT: Record<UnitId, string> = {
  marla: 'marla',
  kanal: 'kanal',
  sqft: 'sq-ft',
  sqyd: 'sq-yards',
  sqm: 'sq-meters',
  acre: 'acre',
  sarsai: 'sarsai',
};

/** Short unit name for titles and link labels. */
export function shortName(u: UnitId, n: number): string {
  const one = n === 1;
  switch (u) {
    case 'marla':
      return 'Marla';
    case 'kanal':
      return 'Kanal';
    case 'sarsai':
      return 'Sarsai';
    case 'sqft':
      return 'Sq Ft';
    case 'sqyd':
      return one ? 'Sq Yard' : 'Sq Yards';
    case 'sqm':
      return one ? 'Sq Meter' : 'Sq Meters';
    case 'acre':
      return one ? 'Acre' : 'Acres';
  }
}

/** Full target-unit name for H1 headings. */
function longName(u: UnitId): string {
  switch (u) {
    case 'sqft':
      return 'Square Feet';
    case 'sqyd':
      return 'Square Yards (Gaz)';
    case 'sqm':
      return 'Square Meters';
    case 'acre':
      return 'Acres';
    default:
      return UNITS[u].label;
  }
}

function valueSlug(v: number): string {
  return String(v).replace('.', '-');
}

const f2 = (n: number) => formatNumber(n, 2);

const TABLE_RANGES: Record<UnitId, number[]> = {
  marla: [1, 2, 3, 3.5, 4, 5, 6, 7, 8, 10, 12, 15, 20],
  kanal: [0.5, 1, 1.5, 2, 3, 4, 5, 8, 10, 16, 20],
  acre: [0.25, 0.5, 1, 2, 2.5, 5, 10, 25],
  sqft: [500, 675, 1000, 1125, 1250, 1361.25, 1500, 1800, 2250, 2722.5, 3000, 4500, 5445, 9000],
  sqyd: [50, 75, 80, 100, 120, 125, 150, 200, 240, 250, 300, 400, 500, 600, 1000],
  sqm: [50, 100, 150, 200, 250, 500, 1000],
  sarsai: [1, 3, 9, 18, 45, 90, 180],
};

function build(spec: ConversionSpec): ConversionPage {
  const { value: v, from, to } = spec;
  const results = {} as Record<StandardId, number>;
  for (const s of ANSWER_ORDER) results[s] = fromSqFt(toSqFt(v, from, s), to, s);
  const sameAcross = ANSWER_ORDER.every((s) => results[s] === results['225']);
  const bothIndependent = !UNITS[from].standardDependent && !UNITS[to].standardDependent;

  const fromShort = shortName(from, v);
  const toShort = shortName(to, 2);
  const lead = `${formatNumber(v)} ${fromShort} to ${toShort}`;

  let title: string;
  let description: string;
  if (sameAcross) {
    const r = results['225'];
    title = `${lead}: ${formatNumber(v)} ${fromShort} = ${f2(r)} ${shortName(to, r)}${bothIndependent ? '' : ' (All Standards)'}`;
    if (bothIndependent) {
      const m = ANSWER_ORDER.map((s) => f2(fromSqFt(toSqFt(v, from, s), 'marla', s)));
      description = `${formatNumber(v)} ${fromShort} = ${f2(r)} ${shortName(to, r)} exactly. In Marla that is ${m[0]} (225 sq ft), ${m[1]} (250) or ${m[2]} (272.25 revenue). Live converter & tables.`;
    } else {
      const sq = ANSWER_ORDER.map((s) => f2(toSqFt(v, from, s)));
      description = `${formatNumber(v)} ${fromShort} = ${f2(r)} ${shortName(to, r)} in every Marla standard. In square feet that is ${sq[0]}, ${sq[1]} or ${sq[2]} (225, 250 or 272.25 sq ft Marla). Live converter & tables.`;
    }
  } else {
    title = `${lead}: ${f2(results['225'])}, ${f2(results['250'])} or ${f2(results['272.25'])} ${toShort}`;
    description = `${formatNumber(v)} ${fromShort} = ${f2(results['225'])} ${toShort} in housing societies (225 sq ft Marla), ${f2(results['272.25'])} on revenue land (272.25) and ${f2(results['250'])} at 250 sq ft. Live converter & tables.`;
  }

  const sourceName = from === 'sqyd' ? `${shortName(from, v)} (Gaz)` : fromShort;
  const range = TABLE_RANGES[from].includes(v) ? TABLE_RANGES[from] : [...TABLE_RANGES[from], v].sort((a, b) => a - b);

  return {
    slug: `${valueSlug(v)}-${SLUG_UNIT[from]}-to-${SLUG_UNIT[to]}`,
    value: v,
    from,
    to,
    category: spec.category,
    context: spec.context,
    defaultStandard: spec.defaultStandard ?? '225',
    title,
    description,
    h1: `${formatNumber(v)} ${sourceName} to ${longName(to)}`,
    linkLabel: lead,
    results,
    sameAcross,
    tableValues: range,
  };
}

export const CONVERSIONS: ConversionPage[] = SPECS.map(build);

/** Shown in the footer, sidebar fallback, home page and 404. */
export const POPULAR_SLUGS: readonly string[] = [
  '5-marla-to-sq-ft',
  '10-marla-to-sq-ft',
  '1-kanal-to-sq-ft',
  '1-kanal-to-marla',
  '3-marla-to-sq-ft',
  '5-marla-to-sq-yards',
  '120-sq-yards-to-marla',
  '1-acre-to-kanal',
];

export function getConversion(slug: string): ConversionPage | undefined {
  return CONVERSIONS.find((c) => c.slug === slug);
}

export const POPULAR_CONVERSIONS: ConversionPage[] = POPULAR_SLUGS.map((s) => {
  const c = getConversion(s);
  if (!c) throw new Error(`Popular conversion not found: ${s}`);
  return c;
});

export function conversionsInCategory(id: CategoryId): ConversionPage[] {
  return CONVERSIONS.filter((c) => c.category === id);
}

/**
 * Internal links for a conversion page, in priority order:
 * 1. the next smaller and larger size of the same conversion,
 * 2. the same size converted to other units,
 * 3. the reverse conversion of the result (e.g. 5 Marla -> 1,125 sq ft -> Marla),
 * 4. two further sizes of the same conversion, then the rest of the category.
 */
export function relatedConversions(c: ConversionPage, max = 8): ConversionPage[] {
  const out: ConversionPage[] = [];
  const add = (x: ConversionPage | undefined) => {
    if (x && x.slug !== c.slug && !out.includes(x)) out.push(x);
  };
  const samePair = CONVERSIONS.filter((x) => x.from === c.from && x.to === c.to).sort((a, b) => a.value - b.value);
  const i = samePair.indexOf(c);
  add(samePair[i - 1]);
  add(samePair[i + 1]);
  CONVERSIONS.filter((x) => x.from === c.from && x.value === c.value).forEach(add);
  for (const s of ANSWER_ORDER) {
    const r = c.results[s];
    CONVERSIONS.filter((x) => x.from === c.to && Math.abs(x.value - r) < 1e-9).forEach(add);
  }
  add(samePair[i - 2]);
  add(samePair[i + 2]);
  conversionsInCategory(c.category).forEach(add);
  return out.slice(0, max);
}

/* ------------------------------------------------------------------ */
/* Formulas, worked calculations and FAQs                               */
/* ------------------------------------------------------------------ */

export function formulaText(from: UnitId, to: UnitId): string {
  switch (`${from}->${to}`) {
    case 'marla->sqft':
      return 'Square Feet = Marla × Marla size. Use 225 for housing societies, 250 for custom developer schemes or 272.25 for revenue land.';
    case 'marla->sqyd':
      return 'Square Yards = Marla × Marla size ÷ 9. One Marla is 25 sq yd at 225 sq ft, 27.78 sq yd at 250 sq ft and 30.25 sq yd at 272.25 sq ft.';
    case 'marla->sqm':
      return 'Square Meters = Marla × Marla size × 0.09290304. One Marla is 20.90 sq m at 225 sq ft, 23.23 sq m at 250 sq ft and 25.29 sq m at 272.25 sq ft.';
    case 'marla->sarsai':
      return 'Sarsai = Marla × 9. This ratio is the same in every Marla standard.';
    case 'kanal->sqft':
      return 'Square Feet = Kanal × 20 × Marla size. One Kanal is 4,500 sq ft at 225, 5,000 sq ft at 250 and 5,445 sq ft at 272.25.';
    case 'kanal->marla':
      return 'Marla = Kanal × 20. This ratio is the same in every Marla standard.';
    case 'kanal->sqyd':
      return 'Square Yards = Kanal × 20 × Marla size ÷ 9. One Kanal is 500 sq yd at 225, 555.56 sq yd at 250 and 605 sq yd at 272.25.';
    case 'kanal->sqm':
      return 'Square Meters = Kanal × 20 × Marla size × 0.09290304. One Kanal is 418.06 sq m at 225, 464.52 sq m at 250 and 505.86 sq m at 272.25.';
    case 'kanal->acre':
      return 'Acres = Kanal × 20 × Marla size ÷ 43,560. On the 272.25 revenue standard this simplifies to Acres = Kanal ÷ 8.';
    case 'acre->kanal':
      return 'Kanal = Acres × 43,560 ÷ (20 × Marla size). On the 272.25 revenue standard this simplifies to Kanal = Acres × 8.';
    case 'acre->marla':
      return 'Marla = Acres × 43,560 ÷ Marla size. On the 272.25 revenue standard this simplifies to Marla = Acres × 160.';
    case 'acre->sqft':
      return 'Square Feet = Acres × 43,560. The acre is a fixed unit, so the Marla standard does not change this result.';
    case 'acre->sqyd':
      return 'Square Yards = Acres × 4,840 (43,560 sq ft ÷ 9). The Marla standard does not change this result.';
    case 'sqft->marla':
      return 'Marla = Square Feet ÷ Marla size. Divide by 225 for housing societies, 250 for developer schemes or 272.25 for revenue land.';
    case 'sqyd->marla':
      return 'Marla = Square Yards × 9 ÷ Marla size. On the 225 standard this simplifies to Marla = Square Yards ÷ 25; on the revenue standard, ÷ 30.25.';
    case 'sqyd->kanal':
      return 'Kanal = Square Yards × 9 ÷ (20 × Marla size). On the 225 standard this simplifies to Kanal = Square Yards ÷ 500; on the revenue standard, ÷ 605.';
    default:
      return `${UNITS[to].label} = ${UNITS[from].label} converted to square feet, then divided by the size of one ${UNITS[to].label} in square feet.`;
  }
}

export interface WorkedStep {
  standard: StandardId | null;
  text: string;
}

/** Step-by-step arithmetic for each standard (collapsed to one line when standards agree). */
export function workedSteps(c: ConversionPage): WorkedStep[] {
  const stepFor = (s: StandardId): string => {
    const m = getStandard(s).sqftPerMarla;
    const sqft = toSqFt(c.value, c.from, s);
    const parts: string[] = [];
    if (c.from !== 'sqft') {
      parts.push(`${formatNumber(c.value)} ${shortName(c.from, c.value)} × ${formatNumber(sqftPerUnit(c.from, m))} sq ft = ${formatNumber(sqft)} sq ft`);
    }
    if (c.to === 'sqm') {
      parts.push(`${formatNumber(sqft)} sq ft × ${SQM_PER_SQFT} = ${formatNumber(c.results[s])} sq m`);
    } else if (c.to !== 'sqft') {
      parts.push(
        `${formatNumber(sqft)} sq ft ÷ ${formatNumber(sqftPerUnit(c.to, m))} sq ft = ${formatNumber(c.results[s])} ${shortName(c.to, c.results[s])}`,
      );
    }
    return parts.join('; then ');
  };
  const steps = ANSWER_ORDER.map((s) => ({ standard: s, text: stepFor(s) }));
  if (steps.every((x) => x.text === steps[0].text)) return [{ standard: null, text: steps[0].text }];
  return steps;
}

/** Page-specific FAQs generated from exact math, so answers always match the calculator. */
export function conversionFaqs(c: ConversionPage): FaqItem[] {
  const fromShort = shortName(c.from, c.value);
  const answer = c.sameAcross
    ? `${formatNumber(c.value)} ${fromShort} equals ${formatNumber(c.results['225'])} ${shortName(c.to, c.results['225'])} in every Marla standard.`
    : `${formatNumber(c.value)} ${fromShort} equals ${ANSWER_ORDER.map((s) => {
        const st = getStandard(s);
        return `${formatNumber(c.results[s])} ${shortName(c.to, c.results[s])} on the ${st.label} (${st.name}) standard`;
      }).join(', ')}.`;
  return [
    { q: `How much is ${formatNumber(c.value)} ${fromShort} in ${UNITS[c.to].label}?`, a: answer },
    { q: `What is the formula to convert ${UNITS[c.from].label} to ${UNITS[c.to].label}?`, a: formulaText(c.from, c.to) },
  ];
}
```

## `src/data/faqs.ts`

```ts
export interface FaqItem {
  q: string;
  /** Plain text answer. Rendered on the page AND used verbatim in FAQPage JSON-LD. */
  a: string;
}

/** Core explanation of Marla standards, shown on every tool page. */
export const STANDARD_FAQS: FaqItem[] = [
  {
    q: 'What is the difference between a 225 sq ft Marla and a 272.25 sq ft Marla?',
    a: 'Both are called "Marla", but they measure different areas. The 225 sq ft Marla (25 square yards) is used by housing societies such as DHA, Bahria Town and LDA schemes. The 272.25 sq ft Marla (30.25 square yards) is the traditional revenue or Patwari standard used in land records such as the fard, registry and intiqal, and for agricultural land. Because the revenue Marla is 21% larger, a "5 Marla" plot is 1,125 sq ft in a society but 1,361.25 sq ft in revenue records.',
  },
  {
    q: 'Why is the revenue Marla exactly 272.25 sq ft?',
    a: 'The revenue system is built on the karam, a length of 5.5 feet. One square karam (5.5 ft × 5.5 ft) is 30.25 sq ft and is called a Sarsai. Nine Sarsai make one Marla, so 9 × 30.25 = 272.25 sq ft. Twenty Marla make one Kanal (5,445 sq ft) and eight Kanal make one acre (43,560 sq ft).',
  },
  {
    q: 'Which Marla standard should I use?',
    a: 'Use the standard written on your documents. For plots in DHA, Bahria Town, LDA and most private housing societies, use 225 sq ft. For land measured by the Patwari or shown in revenue records (fard, jamabandi, registry), use 272.25 sq ft. Some private developers define a Marla as 250 sq ft, so check the allotment letter or booking form before you compare prices.',
  },
  {
    q: 'How many Marla are in one Kanal?',
    a: 'One Kanal is always 20 Marla in every standard. What changes is the size of the Marla: 1 Kanal = 4,500 sq ft at 225 sq ft per Marla, 5,000 sq ft at 250 sq ft per Marla, and 5,445 sq ft at 272.25 sq ft per Marla.',
  },
];

export const HOME_EXTRA_FAQS: FaqItem[] = [
  {
    q: 'How do I convert Marla to square feet?',
    a: 'Multiply the number of Marla by the Marla size. Square Feet = Marla × 225 for housing societies, Marla × 250 for custom developer schemes, or Marla × 272.25 for revenue land. For example, 10 Marla is 2,250 sq ft, 2,500 sq ft or 2,722.5 sq ft respectively.',
  },
  {
    q: 'What is a Sarsai?',
    a: 'A Sarsai is one ninth of a Marla. On the revenue standard it is 30.25 sq ft (one square karam). On the 225 sq ft standard it is 25 sq ft, and on the 250 sq ft standard it is about 27.78 sq ft.',
  },
  {
    q: 'Why do Karachi plots use square yards instead of Marla?',
    a: 'In Karachi and much of Sindh, plots are usually sold in square yards (gaz), for example 120, 240 or 500 square yards. One square yard is 9 sq ft, so a 120 sq yd plot is 1,080 sq ft, which is 4.8 Marla on the 225 sq ft standard.',
  },
  {
    q: 'Is my data sent to a server when I use the calculator?',
    a: 'No. All calculations run inside your browser using JavaScript. Nothing you type is uploaded or stored by this website.',
  },
];

export const PLOT_FAQS: FaqItem[] = [
  {
    q: 'How do I calculate Marla from plot dimensions?',
    a: 'Multiply the frontage (width) by the depth (length) in feet to get the area in square feet, then divide by the Marla size. For example, 25 ft × 45 ft = 1,125 sq ft, and 1,125 ÷ 225 = 5 Marla on the housing society standard.',
  },
  {
    q: 'Is a 35 × 65 plot a 10 Marla plot?',
    a: 'Yes, in housing societies a 35 ft × 65 ft plot (2,275 sq ft) is sold as a 10 Marla plot. At 225 sq ft per Marla it is actually 10.11 Marla, slightly more than the 2,250 sq ft standard. On the 272.25 revenue standard the same plot is only 8.36 Marla.',
  },
  {
    q: 'What are the dimensions of a 1 Kanal plot?',
    a: 'In housing societies a 1 Kanal plot is commonly 50 ft × 90 ft, which is 4,500 sq ft or exactly 20 Marla at 225 sq ft per Marla. On the revenue standard a Kanal is 5,445 sq ft, for example 55 ft × 99 ft.',
  },
  {
    q: 'How do I enter inches in the plot calculator?',
    a: 'Enter inches as a decimal fraction of a foot: 3 inches = 0.25 ft, 6 inches = 0.5 ft and 9 inches = 0.75 ft. For example, a frontage of 25 ft 6 in should be entered as 25.5.',
  },
];
```

## `src/data/guides.ts`

```ts
import type { FaqItem } from './faqs.ts';
import type { CategoryId } from './conversions.ts';

export interface Guide {
  slug: string;
  /** <title> */
  title: string;
  h1: string;
  /** Short label for navigation lists */
  navLabel: string;
  description: string;
  /** One-line teaser for cards and llms.txt */
  summary: string;
  datePublished: string;
  dateModified: string;
  faqs: FaqItem[];
  /** Conversion slugs linked from the guide */
  relatedConversions: string[];
  /** Conversion categories whose pages link to this guide */
  categories: CategoryId[];
}

const PUBLISHED = '2026-11-16';

export const GUIDES: Guide[] = [
  {
    slug: 'marla-size-pakistan-225-vs-272-25',
    navLabel: '225 vs 272.25 sq ft Marla',
    title: 'Marla Size in Pakistan: 225 vs 272.25 vs 250 Sq Ft',
    h1: 'Why Marla Size Differs: 225 vs 272.25 vs 250 Sq Ft',
    description:
      'Why a Marla is 225 sq ft in housing societies, 272.25 sq ft in revenue records (fard) and 250 sq ft in some schemes, with worked examples and how to check yours.',
    summary: 'The karam behind each Marla standard, where each one is used and how to avoid paying for land you do not get.',
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    categories: ['marla-sqft', 'sarsai-gaz'],
    relatedConversions: ['1-marla-to-sq-ft', '5-marla-to-sq-ft', '10-marla-to-sq-ft', '1-kanal-to-sq-ft', '5445-sq-ft-to-marla'],
    faqs: [
      {
        q: 'Is a Marla 225 or 272.25 square feet?',
        a: 'Both are in use. Housing societies such as DHA, Bahria Town and LDA-approved schemes use 225 sq ft. Revenue records maintained by the Patwari and the Punjab Land Records Authority use 272.25 sq ft. Some private developers use 250 sq ft. The correct figure is the one defined in your documents.',
      },
      {
        q: 'Where does the 272.25 sq ft Marla come from?',
        a: 'It is built from the karam, a revenue length of 5.5 ft. One square karam (Sarsai) is 30.25 sq ft and nine Sarsai make a Marla: 9 × 30.25 = 272.25 sq ft. This Marla is exactly 1/160 of an acre.',
      },
      {
        q: 'Where does the 225 sq ft Marla come from?',
        a: 'The same nine-square structure applied to a 5 ft karam gives 9 × 25 = 225 sq ft, which is exactly 25 square yards. Its round numbers made it the convenient choice for urban plot layouts in housing societies.',
      },
      {
        q: 'How much bigger is a revenue Marla than a society Marla?',
        a: 'A revenue Marla is 47.25 sq ft (21%) larger. Across a 5 Marla plot the difference is 236.25 sq ft; across a Kanal it is 945 sq ft.',
      },
    ],
  },
  {
    slug: 'dha-bahria-town-lda-plot-dimensions',
    navLabel: 'DHA, Bahria & LDA plot dimensions',
    title: 'DHA, Bahria Town & LDA Plot Dimensions (25×45 to 2 Kanal)',
    h1: 'Standard Plot Dimensions in DHA, Bahria Town and LDA Schemes',
    description:
      'Typical frontage and depth of 5, 8 and 10 Marla, 1 and 2 Kanal plots in DHA, Bahria Town and LDA schemes: 25×45, 30×60, 35×65, 50×90 ft, with exact Marla checks.',
    summary: 'Typical plot cuts (25×45, 30×60, 35×65, 50×90 ft), why some are slightly over size, and what to check before buying.',
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    categories: ['marla-sqft', 'kanal'],
    relatedConversions: ['5-marla-to-sq-ft', '8-marla-to-sq-ft', '10-marla-to-sq-ft', '1-kanal-to-sq-ft', '2-kanal-to-sq-ft', '1125-sq-ft-to-marla'],
    faqs: [
      {
        q: 'What are the dimensions of a 5 Marla plot in DHA Lahore?',
        a: 'A 5 Marla plot in DHA Lahore and Bahria Town Lahore is generally 25 × 45 ft, which is 1,125 sq ft or exactly 5 Marla at 225 sq ft per Marla.',
      },
      {
        q: 'Why is a 35 × 65 plot called 10 Marla?',
        a: '35 × 65 ft is 2,275 sq ft, which is 10.11 Marla at 225 sq ft per Marla. Societies round it to the nearest standard category, so it is sold as 10 Marla.',
      },
      {
        q: 'What size is a 2 Kanal plot in DHA Lahore?',
        a: 'Depending on the phase, 2 Kanal plots are commonly laid out as 75 × 120 ft or 100 × 90 ft. Both are 9,000 sq ft, which is exactly 40 Marla or 2 Kanal on the 225 sq ft standard.',
      },
      {
        q: 'Do corner plots have the same area?',
        a: 'Not always. Corner plots can have a truncated corner (chamfer) or extra land along the side road, so their area may differ from the standard. Check the plot map and possession letter.',
      },
    ],
  },
  {
    slug: 'karachi-sq-yards-gaz-vs-punjab-marla',
    navLabel: 'Karachi gaz to Marla & Kanal',
    title: 'Karachi Sq Yards (Gaz) to Marla & Kanal: 120 to 1000 Gaz',
    h1: 'Converting Karachi Square Yards (Gaz) to Punjab Marla and Kanal',
    description:
      'Convert 120, 240, 400, 500 and 1000 square yard Karachi plots to Marla and Kanal on the 225 and 272.25 sq ft standards, with formulas and a full table.',
    summary: 'How 120, 240, 500 and 1,000 gaz plots map onto Marla and Kanal, and the shortcuts that make it mental arithmetic.',
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    categories: ['marla-sqyd', 'sarsai-gaz'],
    relatedConversions: ['120-sq-yards-to-marla', '240-sq-yards-to-marla', '400-sq-yards-to-marla', '500-sq-yards-to-kanal', '1000-sq-yards-to-kanal', '5-marla-to-sq-yards'],
    faqs: [
      {
        q: 'How many Marla is a 120 square yard plot?',
        a: '120 square yards is 1,080 sq ft. That is 4.8 Marla on the 225 sq ft society standard, 4.32 Marla at 250 sq ft and 3.97 Marla on the 272.25 sq ft revenue standard.',
      },
      {
        q: 'Is 500 square yards equal to 1 Kanal?',
        a: 'Yes, on the 225 sq ft society standard. 500 sq yd × 9 = 4,500 sq ft = 20 Marla = 1 Kanal. On the revenue standard a Kanal is 605 sq yd, so 500 sq yd is about 0.83 Kanal.',
      },
      {
        q: 'What is the quick way to convert gaz to Marla?',
        a: 'Divide square yards by 25 for the society standard, or by 30.25 for the revenue standard. For Kanal, divide by 500 (society) or 605 (revenue).',
      },
    ],
  },
  {
    slug: 'fard-intiqal-land-units-kanal-marla-sarsai',
    navLabel: 'Fard units: Kanal, Marla, Sarsai',
    title: 'Fard & Intiqal Land Units: Kanal, Marla, Sarsai, Karam',
    h1: 'Understanding Revenue Records: How Kanal, Marla, Sarsai and Karam Work Together',
    description:
      'How Punjab revenue records (fard, jamabandi, intiqal) measure land: karam, Sarsai, Marla, Kanal and acre, how areas are written, and how to convert them.',
    summary: 'The karam-based unit chain used by the Patwari, how areas appear on a fard, and how to turn them into square feet.',
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    categories: ['kanal', 'acre-sqft', 'sarsai-gaz'],
    relatedConversions: ['1-marla-to-sarsai', '1-kanal-to-sq-ft', '1-acre-to-kanal', '1-acre-to-marla', '8-kanal-to-acre', '5445-sq-ft-to-marla'],
    faqs: [
      {
        q: 'Which Marla does a fard use?',
        a: 'Revenue records in Punjab use the 272.25 sq ft Marla, built from a 5.5 ft karam: 1 Sarsai = 30.25 sq ft, 9 Sarsai = 1 Marla, 20 Marla = 1 Kanal (5,445 sq ft) and 8 Kanal = 1 acre.',
      },
      {
        q: 'What is the difference between a fard and an intiqal?',
        a: 'A fard is an extract of the record of rights showing who owns which share of land. An intiqal (mutation) is the entry that records a change of ownership, for example after a sale, gift or inheritance.',
      },
      {
        q: 'How do I convert "2 Kanal 7 Marla 4 Sarsai" to square feet?',
        a: 'Convert everything to Sarsai first: 2 × 180 + 7 × 9 + 4 = 427 Sarsai. Multiply by 30.25: 427 × 30.25 = 12,916.75 sq ft.',
      },
    ],
  },
  {
    slug: 'covered-area-vs-plot-area-construction',
    navLabel: 'Plot area vs covered area & FAR',
    title: 'Plot Area vs Covered Area & FAR: House Construction Basics',
    h1: 'Plot Area vs Covered Area and FAR Basics for Construction Estimates',
    description:
      'The difference between plot area, ground coverage, covered area and FAR, how setbacks reduce what you can build, and how to estimate construction quantities.',
    summary: 'Why a 5 Marla plot is not 5 Marla of house: setbacks, ground coverage, FAR and how builders quote covered area.',
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    categories: ['marla-sqm', 'marla-sqft'],
    relatedConversions: ['5-marla-to-sq-ft', '10-marla-to-sq-ft', '1-kanal-to-sq-ft', '5-marla-to-sq-meters', '10-marla-to-sq-meters'],
    faqs: [
      {
        q: 'What is covered area?',
        a: 'Covered area is the total built-up floor area of a building, measured to the outside of the walls, added up for every floor (including basement and mumty if they count under your bylaws). It is the figure builders use to quote construction cost per square foot.',
      },
      {
        q: 'What is FAR?',
        a: 'Floor Area Ratio is the total covered area allowed divided by the plot area. A FAR of 1.5 on a 2,250 sq ft plot means up to 3,375 sq ft of covered area across all floors, subject to height and setback rules.',
      },
      {
        q: 'Can I build on my whole plot?',
        a: 'Usually not. Residential bylaws require open space at the front (and often at the rear and sides). The exact setbacks, coverage limits and FAR come from your development authority or society bylaws, so check them before finalising a design.',
      },
    ],
  },
  {
    slug: 'how-to-measure-irregular-plot-area',
    navLabel: 'Measuring irregular plots',
    title: "Irregular Plot Area: Heron's Formula & Triangulation Guide",
    h1: "How to Calculate the Area of an Irregular Plot (Heron's Formula and Triangulation)",
    description:
      "Measure a four-sided or irregular plot accurately: split it into triangles, apply Heron's formula, check with coordinates, and convert the result to Marla.",
    summary: "A step-by-step method for non-rectangular plots using a diagonal and Heron's formula, with a worked example.",
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    categories: ['acre-sqft'],
    relatedConversions: ['1000-sq-ft-to-marla', '2250-sq-ft-to-marla', '4500-sq-ft-to-marla', '1-marla-to-sq-ft'],
    faqs: [
      {
        q: "What is Heron's formula?",
        a: "Heron's formula gives the area of a triangle from its three sides. With sides a, b and c, first find s = (a + b + c) ÷ 2, then Area = √(s × (s − a) × (s − b) × (s − c)).",
      },
      {
        q: 'Why do I need a diagonal for a four-sided plot?',
        a: 'Four side lengths alone do not fix the shape of a quadrilateral: the same sides can enclose different areas. Measuring one diagonal splits the plot into two triangles whose areas are fully determined.',
      },
      {
        q: 'Is averaging opposite sides accurate?',
        a: 'Multiplying the average of the two widths by the average of the two lengths is exact only for rectangles. For skewed plots it always overstates the area, sometimes by several percent, so use triangulation for anything that is not square-cornered.',
      },
    ],
  },
];

export function getGuide(slug: string): Guide {
  const g = GUIDES.find((x) => x.slug === slug);
  if (!g) throw new Error(`Guide not found: ${slug}`);
  return g;
}

export function guidesForCategory(id: CategoryId): Guide[] {
  return GUIDES.filter((g) => g.categories.includes(id));
}
```

## `src/layouts/BaseLayout.astro`

```astro
---
import '../styles/global.css';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import AdSlot from '../components/AdSlot.astro';
import { ADSENSE, SITE, adsEnabled } from '../config/site';
import { serializeJsonLd } from '../lib/schema';

interface Props {
  title: string;
  description: string;
  /** JSON-LD objects injected into <head> */
  schema?: Record<string, unknown>[];
  /** Show the right-hand sidebar (tool pages). Holds a 250px ad slot once AdSense is configured. */
  sidebar?: boolean;
  noindex?: boolean;
  ogType?: 'website' | 'article';
}

const { title, description, schema = [], sidebar = false, noindex = false, ogType = 'website' } = Astro.props;

const site = Astro.site ?? new URL(SITE.url);
const canonical = new URL(Astro.url.pathname, site).href;
const ogImage = new URL('/og-image.png', site).href;
const fullTitle = title.includes(SITE.name) ? title : `${title} | ${SITE.name}`;

// AdSense loader is only emitted once a publisher ID is set in src/config/site.ts
const adsenseSrc = adsEnabled()
  ? `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE.client}`
  : null;
---

<!doctype html>
<html lang={SITE.lang} dir="ltr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{fullTitle}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow, max-snippet:-1, max-image-preview:large'} />
    <meta name="theme-color" content={SITE.themeColor} />
    <meta name="color-scheme" content="light" />
    <meta name="format-detection" content="telephone=no" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="sitemap" href="/sitemap-index.xml" />
    <link rel="alternate" type="text/markdown" href="/llms.txt" title="LLM-readable site summary" />

    <meta property="og:type" content={ogType} />
    <meta property="og:site_name" content={SITE.name} />
    <meta property="og:locale" content={SITE.locale} />
    <meta property="og:title" content={fullTitle} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={fullTitle} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={ogImage} />

    {schema.map((s) => <script type="application/ld+json" set:html={serializeJsonLd(s)} />)}

    {
      adsenseSrc ? (
        <script is:inline async src={adsenseSrc} crossorigin="anonymous" />
      ) : (
        <Fragment set:html="<!-- Google AdSense loader: added automatically once ADSENSE.client is set in src/config/site.ts -->" />
      )
    }
    <slot name="head" />
  </head>
  <body class="flex min-h-screen flex-col">
    <a
      href="#main"
      class="sr-only z-50 rounded-md bg-brand-700 px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >Skip to content</a
    >
    <Header />

    {
      adsEnabled('header-banner') ? (
        <div class="mx-auto w-full max-w-6xl px-4 pt-4">
          <AdSlot variant="banner" name="header-banner" />
        </div>
      ) : (
        <AdSlot variant="banner" name="header-banner" />
      )
    }

    <div
      class:list={[
        'mx-auto w-full max-w-6xl flex-1 px-4 pt-6',
        sidebar && 'lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-8',
      ]}
    >
      <main id="main" class="min-w-0">
        <slot />
      </main>
      {
        sidebar && (
          <aside class="mt-10 lg:mt-0" aria-label="Sidebar">
            <div class="space-y-6 lg:sticky lg:top-4">
              <AdSlot variant="rectangle" name="sidebar-rectangle" />
              <slot name="sidebar" />
            </div>
          </aside>
        )
      }
    </div>

    <Footer />
  </body>
</html>
```

## `src/layouts/GuideLayout.astro`

```astro
---
/**
 * Long-form guide layout.
 * Renders the guide body once at build time to derive the table of contents (from <h2 id>),
 * the word count and the reading time, then injects Article + FAQPage + BreadcrumbList JSON-LD.
 */
import BaseLayout from './BaseLayout.astro';
import Breadcrumbs from '../components/Breadcrumbs.astro';
import Faq from '../components/Faq.astro';
import LinkGrid from '../components/LinkGrid.astro';
import SidebarLinks from '../components/SidebarLinks.astro';
import AdSlot from '../components/AdSlot.astro';
import { SITE } from '../config/site';
import { GUIDES, type Guide } from '../data/guides';
import { getConversion } from '../data/conversions';
import { articleSchema, breadcrumbSchema, faqPageSchema } from '../lib/schema';

interface Props {
  guide: Guide;
}

const { guide } = Astro.props;
const site = Astro.site ?? new URL(SITE.url);
const url = new URL(`/guides/${guide.slug}/`, site).href;

const body = await Astro.slots.render('default');
const plain = body.replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ');
const wordCount = plain.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
const minutes = Math.max(1, Math.round(wordCount / 200));
const toc = [...body.matchAll(/<h2[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => ({
  id: m[1],
  text: m[2].replace(/<[^>]+>/g, '').trim(),
}));

const fmtDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

const related = guide.relatedConversions.map((slug) => {
  const c = getConversion(slug);
  if (!c) throw new Error(`Guide ${guide.slug} links to unknown conversion ${slug}`);
  return c;
});
const otherGuides = GUIDES.filter((g) => g.slug !== guide.slug);

const schema = [
  articleSchema({
    headline: guide.h1,
    description: guide.description,
    url,
    datePublished: guide.datePublished,
    dateModified: guide.dateModified,
    wordCount,
    siteUrl: site.href,
  }),
  faqPageSchema(guide.faqs),
  breadcrumbSchema([
    { name: 'Home', url: new URL('/', site).href },
    { name: 'Guides', url: new URL('/guides/', site).href },
    { name: guide.navLabel, url },
  ]),
];
---

<BaseLayout title={guide.title} description={guide.description} schema={schema} sidebar ogType="article">
  <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Guides', href: '/guides/' }, { name: guide.navLabel }]} />

  <article>
    <header>
      <h1 class="text-3xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-4xl">{guide.h1}</h1>
      <p class="mt-3 text-sm text-slate-600">
        By <a href="/about/" class="font-semibold text-slate-800 hover:underline">{SITE.owner}</a>
        · <time datetime={guide.dateModified}>Updated {fmtDate(guide.dateModified)}</time>
        · {minutes} min read
      </p>
      <p class="mt-4 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">{guide.description}</p>
    </header>

    {
      toc.length > 1 && (
        <nav aria-label="On this page" class="mt-6 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
          <p class="text-sm font-bold text-slate-900">On this page</p>
          <ol class="mt-2 list-decimal space-y-1 pl-5 text-[15px] text-slate-700 marker:text-slate-400">
            {toc.map((t) => (
              <li>
                <a href={`#${t.id}`} class="hover:text-brand-700 hover:underline">
                  {t.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )
    }

    <div class="prose-content mt-2 max-w-3xl" data-guide-body set:html={body} />

    <AdSlot variant="rectangle" name="in-content-1" class="mt-8" />

    <section class="mt-10" aria-labelledby="tools-heading">
      <h2 id="tools-heading" class="mb-4 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Convert it yourself</h2>
      <LinkGrid links={related.map((c) => ({ href: `/convert/${c.slug}/`, label: c.h1 }))} />
      <p class="mt-3 text-sm text-slate-600">
        Or open the <a href="/" class="font-semibold text-brand-700 underline">land area converter</a> and the
        <a href="/plot-size-calculator/" class="font-semibold text-brand-700 underline">plot size calculator</a>.
      </p>
    </section>

    <Faq items={guide.faqs} heading="Questions about this guide" id="guide-faq" />

    <section class="mt-12" aria-labelledby="more-guides-heading">
      <h2 id="more-guides-heading" class="mb-4 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">More guides</h2>
      <LinkGrid links={otherGuides.map((g) => ({ href: `/guides/${g.slug}/`, label: g.h1, note: g.summary }))} />
    </section>

    <p class="mt-8 text-sm text-slate-600">
      This guide is general information, not legal or engineering advice. Confirm measurements and rules with your society,
      development authority, the revenue department or a licensed professional.
    </p>
  </article>

  <SidebarLinks slot="sidebar" links={related} heading="Conversions in this guide" />
</BaseLayout>
```

## `src/lib/schema.ts`

```ts
import { SITE } from '../config/site';
import { FORMULAS } from './units';
import type { FaqItem } from '../data/faqs';

type JsonLd = Record<string, unknown>;

export function softwareApplicationSchema(opts: {
  name: string;
  url: string;
  description: string;
  extraFeatures?: string[];
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: opts.name,
    url: opts.url,
    description: opts.description,
    applicationCategory: 'UtilitiesApplication',
    applicationSubCategory: 'Land Area Calculator',
    operatingSystem: 'Any (web browser)',
    browserRequirements: 'Requires JavaScript for live calculation. Static reference tables work without JavaScript.',
    inLanguage: SITE.lang,
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'PKR',
    },
    featureList: [...(opts.extraFeatures ?? []), ...FORMULAS],
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
    },
  };
}

export function faqPageSchema(items: FaqItem[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function websiteSchema(url: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url,
    description: SITE.description,
    inLanguage: SITE.lang,
  };
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  wordCount: number;
  siteUrl: string;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    url: opts.url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': opts.url },
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    inLanguage: SITE.lang,
    wordCount: opts.wordCount,
    image: new URL('/og-image.png', opts.siteUrl).href,
    author: {
      '@type': 'Person',
      name: SITE.owner,
      url: new URL('/about/', opts.siteUrl).href,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: opts.siteUrl,
      logo: { '@type': 'ImageObject', url: new URL('/og-image.png', opts.siteUrl).href },
    },
  };
}

/** Serialises JSON-LD safely for inline <script> injection. */
export function serializeJsonLd(data: JsonLd): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
```

## `src/lib/units.ts`

```ts
/**
 * Land area conversion engine (shared by build-time pages and client-side calculators).
 *
 * Exact definitions used:
 *   1 Marla  = S sq ft, where S is the selected standard (225, 250 or 272.25)
 *   1 Kanal  = 20 Marla
 *   1 Sarsai = 1/9 Marla
 *   1 sq yd  = 9 sq ft
 *   1 sq ft  = 0.09290304 sq m (exact, international foot)
 *   1 Acre   = 43,560 sq ft
 */

export type UnitId = 'marla' | 'kanal' | 'sqft' | 'sqyd' | 'sqm' | 'acre' | 'sarsai';
export type StandardId = '225' | '250' | '272.25';

export interface MarlaStandard {
  id: StandardId;
  sqftPerMarla: number;
  label: string;
  name: string;
  usedBy: string;
}

export interface UnitDef {
  id: UnitId;
  label: string;
  short: string;
  /** true if the unit's size depends on the Marla standard */
  standardDependent: boolean;
}

export const SQM_PER_SQFT = 0.09290304;
export const SQFT_PER_SQYD = 9;
export const SQFT_PER_ACRE = 43560;
export const MARLA_PER_KANAL = 20;
export const SARSAI_PER_MARLA = 9;

export const STANDARDS: readonly MarlaStandard[] = [
  {
    id: '225',
    sqftPerMarla: 225,
    label: '225 sq ft',
    name: 'Housing Society',
    usedBy: 'DHA, Bahria Town, LDA & most housing societies',
  },
  {
    id: '272.25',
    sqftPerMarla: 272.25,
    label: '272.25 sq ft',
    name: 'Revenue / Patwari',
    usedBy: 'Revenue records (fard, registry, intiqal) & agricultural land',
  },
  {
    id: '250',
    sqftPerMarla: 250,
    label: '250 sq ft',
    name: 'Custom Developer',
    usedBy: 'Some private developer schemes',
  },
] as const;

export const DEFAULT_STANDARD: StandardId = '225';

export const UNIT_ORDER: readonly UnitId[] = ['marla', 'kanal', 'sqft', 'sqyd', 'sqm', 'acre', 'sarsai'];

export const UNITS: Record<UnitId, UnitDef> = {
  marla: { id: 'marla', label: 'Marla', short: 'Marla', standardDependent: true },
  kanal: { id: 'kanal', label: 'Kanal', short: 'Kanal', standardDependent: true },
  sqft: { id: 'sqft', label: 'Square Feet', short: 'sq ft', standardDependent: false },
  sqyd: { id: 'sqyd', label: 'Square Yards (Gaz)', short: 'sq yd', standardDependent: false },
  sqm: { id: 'sqm', label: 'Square Meters', short: 'sq m', standardDependent: false },
  acre: { id: 'acre', label: 'Acres', short: 'Acre', standardDependent: false },
  sarsai: { id: 'sarsai', label: 'Sarsai', short: 'Sarsai', standardDependent: true },
};

export function isUnitId(v: unknown): v is UnitId {
  return typeof v === 'string' && (UNIT_ORDER as readonly string[]).includes(v);
}

export function isStandardId(v: unknown): v is StandardId {
  return typeof v === 'string' && STANDARDS.some((s) => s.id === v);
}

export function getStandard(id: StandardId): MarlaStandard {
  const s = STANDARDS.find((x) => x.id === id);
  if (!s) throw new Error(`Unknown Marla standard: ${id}`);
  return s;
}

/** Square feet contained in ONE of the given unit, under a given Marla size. */
export function sqftPerUnit(unit: UnitId, sqftPerMarla: number): number {
  switch (unit) {
    case 'marla':
      return sqftPerMarla;
    case 'kanal':
      return sqftPerMarla * MARLA_PER_KANAL;
    case 'sarsai':
      return sqftPerMarla / SARSAI_PER_MARLA;
    case 'sqft':
      return 1;
    case 'sqyd':
      return SQFT_PER_SQYD;
    case 'sqm':
      return 1 / SQM_PER_SQFT;
    case 'acre':
      return SQFT_PER_ACRE;
  }
}

/** Removes binary floating-point noise (e.g. 0.30000000000000004 -> 0.3). */
export function clean(n: number): number {
  if (!Number.isFinite(n)) return n;
  return Number.parseFloat(n.toPrecision(12));
}

export function toSqFt(value: number, unit: UnitId, standard: StandardId): number {
  if (unit === 'sqm') return clean(value / SQM_PER_SQFT);
  return clean(value * sqftPerUnit(unit, getStandard(standard).sqftPerMarla));
}

export function fromSqFt(sqft: number, unit: UnitId, standard: StandardId): number {
  if (unit === 'sqm') return clean(sqft * SQM_PER_SQFT);
  return clean(sqft / sqftPerUnit(unit, getStandard(standard).sqftPerMarla));
}

export function convert(value: number, from: UnitId, to: UnitId, standard: StandardId): number {
  if (from === to) return value;
  return fromSqFt(toSqFt(value, from, standard), to, standard);
}

export type UnitValues = Record<UnitId, number>;

export function convertAll(value: number, from: UnitId, standard: StandardId): UnitValues {
  const sqft = toSqFt(value, from, standard);
  const out = {} as UnitValues;
  for (const u of UNIT_ORDER) out[u] = u === from ? value : fromSqFt(sqft, u, standard);
  return out;
}

/** Same input (value + unit) evaluated under every Marla standard. */
export function compareStandards(value: number, from: UnitId): Record<StandardId, UnitValues> {
  const out = {} as Record<StandardId, UnitValues>;
  for (const s of STANDARDS) out[s.id] = convertAll(value, from, s.id);
  return out;
}

export interface KmsBreakdown {
  kanal: number;
  marla: number;
  sarsai: number;
  sqft: number;
}

/** Splits an area into Kanal – Marla – Sarsai – remaining sq ft (revenue-style notation). */
export function breakdownKms(totalSqft: number, standard: StandardId): KmsBreakdown {
  const m = getStandard(standard).sqftPerMarla;
  const sarsaiSize = m / SARSAI_PER_MARLA;
  // Round to 1e-9 Sarsai to avoid 8.999999 artefacts.
  const totalSarsai = Math.round((totalSqft / sarsaiSize) * 1e9) / 1e9;
  const sarsaiPerKanal = SARSAI_PER_MARLA * MARLA_PER_KANAL;
  const kanal = Math.floor(totalSarsai / sarsaiPerKanal);
  let rem = totalSarsai - kanal * sarsaiPerKanal;
  const marla = Math.floor(rem / SARSAI_PER_MARLA);
  rem -= marla * SARSAI_PER_MARLA;
  const sarsai = Math.floor(rem);
  rem -= sarsai;
  return { kanal, marla, sarsai, sqft: clean(rem * sarsaiSize) };
}

export interface PlotCategory {
  marla: number;
  label: string;
}

/** Plot sizes commonly sold / allotted in Pakistan, expressed in Marla. */
export const PLOT_CATEGORIES_MARLA: readonly number[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 30, 40, 60, 80, 160,
];

export function plotCategoryLabel(marla: number): string {
  if (marla < MARLA_PER_KANAL) return `${marla} Marla`;
  const kanal = marla / MARLA_PER_KANAL;
  return `${formatNumber(kanal)} Kanal`;
}

export interface ClosestCategory {
  category: PlotCategory;
  /** Area difference vs. the category, in sq ft (positive = plot is larger). */
  diffSqft: number;
  diffPercent: number;
  /** Within ±2.5% of the standard size */
  isMatch: boolean;
}

export function closestPlotCategory(totalSqft: number, standard: StandardId): ClosestCategory | null {
  if (!(totalSqft > 0)) return null;
  const m = getStandard(standard).sqftPerMarla;
  const marlas = totalSqft / m;
  let best = PLOT_CATEGORIES_MARLA[0];
  for (const c of PLOT_CATEGORIES_MARLA) {
    if (Math.abs(c - marlas) < Math.abs(best - marlas)) best = c;
  }
  const catSqft = best * m;
  const diffSqft = clean(totalSqft - catSqft);
  const diffPercent = clean((diffSqft / catSqft) * 100);
  return {
    category: { marla: best, label: plotCategoryLabel(best) },
    diffSqft,
    diffPercent,
    isMatch: Math.abs(diffPercent) <= 2.5,
  };
}

export interface PlotResult {
  sqft: number;
  sqyd: number;
  sqm: number;
  marla: number;
  kanal: number;
  kms: KmsBreakdown;
  closest: ClosestCategory | null;
}

export function calculatePlot(widthFt: number, depthFt: number, standard: StandardId): PlotResult | null {
  if (!(widthFt > 0) || !(depthFt > 0)) return null;
  const sqft = clean(widthFt * depthFt);
  return {
    sqft,
    sqyd: fromSqFt(sqft, 'sqyd', standard),
    sqm: fromSqFt(sqft, 'sqm', standard),
    marla: fromSqFt(sqft, 'marla', standard),
    kanal: fromSqFt(sqft, 'kanal', standard),
    kms: breakdownKms(sqft, standard),
    closest: closestPlotCategory(sqft, standard),
  };
}

/* ------------------------------------------------------------------ */
/* Formatting & parsing                                                 */
/* ------------------------------------------------------------------ */

function decimalsFor(n: number): number {
  const a = Math.abs(n);
  if (a === 0) return 0;
  if (a >= 100) return 2;
  if (a >= 1) return 4;
  return 6;
}

const fmtCache = new Map<string, Intl.NumberFormat>();
function nf(maxDp: number, grouping: boolean): Intl.NumberFormat {
  const key = `${maxDp}-${grouping}`;
  let f = fmtCache.get(key);
  if (!f) {
    f = new Intl.NumberFormat('en-US', { maximumFractionDigits: maxDp, useGrouping: grouping });
    fmtCache.set(key, f);
  }
  return f;
}

/** Human-readable number with thousands separators, e.g. 1,361.25 */
export function formatNumber(n: number, maxDp?: number): string {
  if (!Number.isFinite(n)) return '—';
  return nf(maxDp ?? decimalsFor(n), true).format(n);
}

/** Plain number for writing back into an <input> (no grouping), e.g. 1361.25 */
export function toInputValue(n: number): string {
  if (!Number.isFinite(n)) return '';
  return nf(decimalsFor(n), false).format(n);
}

/** Parses user input. Accepts "1,125", " 5.5 ", ".5". Returns null if empty/invalid/negative. */
export function parseInput(raw: string): number | null {
  const s = raw.replace(/[,\s]/g, '');
  if (s === '' || s === '.') return null;
  if (!/^\d*\.?\d*$/.test(s)) return null;
  const n = Number.parseFloat(s);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

/** Full unit label with correct singular/plural, e.g. "1 Acre" vs "2 Acres". */
export function unitLabel(unit: UnitId, n: number): string {
  if (n !== 1) return UNITS[unit].label;
  switch (unit) {
    case 'acre':
      return 'Acre';
    case 'sqft':
      return 'Square Foot';
    case 'sqyd':
      return 'Square Yard (Gaz)';
    case 'sqm':
      return 'Square Meter';
    default:
      return UNITS[unit].label;
  }
}

/** Short unit with correct plural for acres, e.g. "0.5 Acres", "1 Acre". */
export function unitShort(unit: UnitId, n: number): string {
  if (unit === 'acre') return n === 1 ? 'Acre' : 'Acres';
  return UNITS[unit].short;
}

/** "5 Marla", "1 Kanal", "1,125 sq ft" */
export function formatWithUnit(n: number, unit: UnitId): string {
  return `${formatNumber(n)} ${UNITS[unit].short}`;
}

/** Helper line shown under each converter input. */
export function unitHint(unit: UnitId, standard: StandardId): string {
  const m = getStandard(standard).sqftPerMarla;
  switch (unit) {
    case 'marla':
      return `1 Marla = ${formatNumber(m)} sq ft`;
    case 'kanal':
      return `1 Kanal = 20 Marla = ${formatNumber(m * MARLA_PER_KANAL)} sq ft`;
    case 'sqft':
      return '1 sq ft = 0.092903 sq m';
    case 'sqyd':
      return '1 sq yd (gaz) = 9 sq ft';
    case 'sqm':
      return '1 sq m = 10.7639 sq ft';
    case 'acre':
      return `1 Acre = 43,560 sq ft = ${formatNumber(SQFT_PER_ACRE / (m * MARLA_PER_KANAL))} Kanal`;
    case 'sarsai':
      return `1 Sarsai = 1/9 Marla = ${formatNumber(m / SARSAI_PER_MARLA)} sq ft`;
  }
}

/** One-line result summary, e.g. "1,125 sq ft · 125 sq yd · 0.25 Kanal". */
export function summaryTargets(values: UnitValues, source: UnitId): string {
  const preferred: UnitId[] = ['sqft', 'marla', 'sqyd', 'kanal', 'sqm'];
  return preferred
    .filter((u) => u !== source)
    .slice(0, 3)
    .map((u) => formatWithUnit(values[u], u))
    .join(' · ');
}

/** Human readable formulas (used in UI, JSON-LD and llms.txt). */
export const FORMULAS: readonly string[] = [
  'Square Feet = Marla × Marla size (225, 250 or 272.25 sq ft)',
  'Marla = Square Feet ÷ Marla size',
  '1 Kanal = 20 Marla (4,500 sq ft at 225; 5,000 sq ft at 250; 5,445 sq ft at 272.25)',
  '1 Sarsai = 1/9 Marla (25 sq ft at 225; 27.78 sq ft at 250; 30.25 sq ft at 272.25)',
  'Square Yards (Gaz) = Square Feet ÷ 9',
  'Square Meters = Square Feet × 0.09290304',
  'Acres = Square Feet ÷ 43,560 (1 Acre = 8 Kanal = 160 Marla on the 272.25 revenue standard)',
  'Plot Area (sq ft) = Frontage (ft) × Depth (ft); Marla = Plot Area ÷ Marla size',
];
```

## `src/pages/404.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { POPULAR_CONVERSIONS } from '../data/conversions';
---

<BaseLayout title="Page not found" description="The page you were looking for does not exist." noindex>
  <div class="mx-auto max-w-2xl py-10 text-center">
    <p class="text-sm font-bold tracking-widest text-brand-700 uppercase">404</p>
    <h1 class="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Page not found</h1>
    <p class="mt-3 text-slate-700">The page may have moved. Try one of our calculators instead.</p>
    <div class="mt-6 flex flex-wrap justify-center gap-3">
      <a href="/" class="inline-flex min-h-12 items-center rounded-xl bg-brand-700 px-5 font-semibold text-white hover:bg-brand-800">Land area converter</a>
      <a href="/plot-size-calculator/" class="inline-flex min-h-12 items-center rounded-xl border-2 border-slate-300 bg-white px-5 font-semibold text-slate-800 hover:bg-slate-50">Plot calculator</a>
    </div>
    <ul class="mt-8 flex flex-wrap justify-center gap-2">
      {
        POPULAR_CONVERSIONS.map((c) => (
          <li>
            <a href={`/convert/${c.slug}/`} class="inline-flex min-h-10 items-center rounded-full border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 hover:border-brand-600 hover:text-brand-800">
              {c.linkLabel}
            </a>
          </li>
        ))
      }
    </ul>
  </div>
</BaseLayout>
```

## `src/pages/about.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Breadcrumbs from '../components/Breadcrumbs.astro';
import { SITE } from '../config/site';
---

<BaseLayout
  title={`About ${SITE.name}`}
  description={`${SITE.name} builds free, fast and private land area calculators for Pakistan, covering Marla, Kanal, square feet, square yards and acres.`}
>
  <div class="mx-auto max-w-3xl">
    <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'About' }]} />
    <article class="prose-content rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
      <h1 class="mb-4 text-3xl font-extrabold tracking-tight text-slate-900">About {SITE.name}</h1>
      <p>
        {SITE.name} ("naap" means measurement in Urdu) is a free set of land measurement tools for buyers, sellers, agents,
        overseas Pakistanis and anyone dealing with property in Pakistan and South Asia.
      </p>
      <p>
        {SITE.name} is an independent project operated by <strong>{SITE.owner}</strong> from {SITE.city}. It is not affiliated
        with any housing society, development authority or government department.
      </p>

      <h2>Why we built it</h2>
      <p>
        Land in Pakistan is measured in several overlapping systems. Housing societies use a 225 sq ft Marla, revenue records use
        a 272.25 sq ft Marla, some developers use 250 sq ft, and Karachi sells plots in square yards. The same "5 Marla" can mean
        a difference of more than 230 square feet. We wanted a calculator that makes the standard explicit and shows every
        version side by side.
      </p>

      <h2>What you can do here</h2>
      <ul>
        <li>Convert between Marla, Kanal, square feet, square yards (gaz), square meters, acres and Sarsai.</li>
        <li>Switch between the 225, 250 and 272.25 sq ft Marla standards and compare all three at once.</li>
        <li>Calculate plot area from frontage and depth and find the nearest standard plot size.</li>
        <li>Use ready-made reference pages for the most searched conversions.</li>
      </ul>

      <h2>How the calculators work</h2>
      <p>
        Every calculation runs in your browser using exact definitions: 1 Kanal = 20 Marla, 1 Sarsai = 1/9 Marla, 1 square yard
        = 9 sq ft, 1 sq ft = 0.09290304 sq m and 1 acre = 43,560 sq ft. Nothing you enter is sent to a server. The site is a
        static website served from a global content delivery network, so it loads quickly even on slow mobile connections.
      </p>

      <h2>Accuracy and limitations</h2>
      <p>
        We test the formulas against known values, but local practice varies between schemes and districts. Results are for
        guidance only and are not a legal survey. Before buying, selling or registering land, confirm the area with your housing
        society, the revenue department or a licensed surveyor.
      </p>

      <h2>Advertising</h2>
      <p>
        {SITE.name} is free to use and may be supported by advertising, including Google AdSense. Advertising never changes
        calculation results. See our <a href="/privacy-policy/">Privacy Policy</a> for details on cookies.
      </p>

      <h2>Get in touch</h2>
      <p>
        Found an error or want a new conversion added? Email <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a> or use the <a href="/contact/">contact page</a>.
      </p>
    </article>
  </div>
</BaseLayout>
```

## `src/pages/contact.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Breadcrumbs from '../components/Breadcrumbs.astro';
import { SITE } from '../config/site';

const inputClass =
  'w-full rounded-xl border-2 border-slate-300 bg-white px-4 text-base text-slate-900 placeholder:text-slate-400 hover:border-slate-400 focus:border-brand-700 focus:outline-none';
---

<BaseLayout title="Contact Us" description={`Contact ${SITE.name} to report an error, suggest a conversion or ask about advertising.`}>
  <div class="mx-auto max-w-3xl">
    <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Contact' }]} />
    <article class="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
      <h1 class="text-3xl font-extrabold tracking-tight text-slate-900">Contact Us</h1>
      <p class="mt-3 leading-7 text-slate-700">
        Spotted a wrong figure, want another conversion page, or have a business enquiry? Email us at
        <a href={`mailto:${SITE.contactEmail}`} class="font-semibold text-brand-700 underline">{SITE.contactEmail}</a>
        or use the form below.
      </p>

      <dl class="mt-6 grid gap-4 sm:grid-cols-3">
        <div class="rounded-xl bg-slate-50 p-4">
          <dt class="text-xs font-semibold tracking-wide text-slate-600 uppercase">Email</dt>
          <dd class="mt-1 font-semibold break-all text-slate-900">{SITE.contactEmail}</dd>
        </div>
        <div class="rounded-xl bg-slate-50 p-4">
          <dt class="text-xs font-semibold tracking-wide text-slate-600 uppercase">Operated by</dt>
          <dd class="mt-1 font-semibold text-slate-900">{SITE.owner}</dd>
        </div>
        <div class="rounded-xl bg-slate-50 p-4">
          <dt class="text-xs font-semibold tracking-wide text-slate-600 uppercase">Location</dt>
          <dd class="mt-1 font-semibold text-slate-900">{SITE.city}</dd>
        </div>
      </dl>

      <form class="mt-8 space-y-5" data-contact-form data-email={SITE.contactEmail} novalidate>
        <div>
          <label for="c-name" class="mb-1.5 block text-sm font-semibold text-slate-800">Your name</label>
          <input id="c-name" name="name" type="text" autocomplete="name" required class:list={[inputClass, 'h-12']} />
        </div>
        <div>
          <label for="c-topic" class="mb-1.5 block text-sm font-semibold text-slate-800">Topic</label>
          <select id="c-topic" name="topic" class:list={[inputClass, 'h-12']}>
            <option>Report a calculation error</option>
            <option>Suggest a new conversion</option>
            <option>Advertising / business enquiry</option>
            <option>Privacy request</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label for="c-message" class="mb-1.5 block text-sm font-semibold text-slate-800">Message</label>
          <textarea id="c-message" name="message" rows="6" required class:list={[inputClass, 'py-3']}></textarea>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            class="inline-flex min-h-12 items-center rounded-xl bg-brand-700 px-6 text-[15px] font-semibold text-white hover:bg-brand-800"
          >
            Open in email app
          </button>
          <p class="text-sm text-slate-600" role="status" aria-live="polite" data-contact-status>
            Opens your email app with the message ready to send. Nothing is stored on this website.
          </p>
        </div>
      </form>
    </article>
  </div>
</BaseLayout>

<script>
  const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
  if (form) {
    const status = form.querySelector<HTMLElement>('[data-contact-status]');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = String(data.get('name') ?? '').trim();
      const topic = String(data.get('topic') ?? '').trim();
      const message = String(data.get('message') ?? '').trim();
      if (!name || !message) {
        if (status) status.textContent = 'Please enter your name and a message.';
        (form.querySelector<HTMLInputElement>(name ? '#c-message' : '#c-name'))?.focus();
        return;
      }
      const email = form.dataset.email ?? '';
      const subject = encodeURIComponent(`[${topic}] from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name}\nSent from ${window.location.origin}`);
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      if (status) status.textContent = 'Your email app should open now. If not, email us directly at the address above.';
    });
  }
</script>
```

## `src/pages/convert/[slug].astro`

```astro
---
import type { GetStaticPaths } from 'astro';
import BaseLayout from '../../layouts/BaseLayout.astro';
import LandConverter from '../../components/LandConverter.astro';
import AdSlot from '../../components/AdSlot.astro';
import Breadcrumbs from '../../components/Breadcrumbs.astro';
import Faq from '../../components/Faq.astro';
import ReferenceTable from '../../components/ReferenceTable.astro';
import BreakdownTable from '../../components/BreakdownTable.astro';
import SidebarLinks from '../../components/SidebarLinks.astro';
import LinkGrid from '../../components/LinkGrid.astro';
import { SITE } from '../../config/site';
import {
  ANSWER_ORDER,
  CATEGORIES,
  CONVERSIONS,
  conversionFaqs,
  formulaText,
  relatedConversions,
  shortName,
  workedSteps,
  type ConversionPage,
} from '../../data/conversions';
import { STANDARD_FAQS } from '../../data/faqs';
import { guidesForCategory } from '../../data/guides';
import { breadcrumbSchema, faqPageSchema, softwareApplicationSchema } from '../../lib/schema';
import { UNITS, formatNumber, getStandard, unitLabel } from '../../lib/units';

export const getStaticPaths = (() => {
  return CONVERSIONS.map((c) => ({ params: { slug: c.slug }, props: { conversion: c } }));
}) satisfies GetStaticPaths;

interface Props {
  conversion: ConversionPage;
}

const { conversion: c } = Astro.props;
const site = Astro.site ?? new URL(SITE.url);
const url = new URL(`/convert/${c.slug}/`, site).href;

const fromU = UNITS[c.from];
const toU = UNITS[c.to];
const defaultStd = getStandard(c.defaultStandard);
const primary = c.results[c.defaultStandard];
const answers = ANSWER_ORDER.map((id) => ({ std: getStandard(id), result: c.results[id] }));
const steps = workedSteps(c);
const category = CATEGORIES.find((x) => x.id === c.category);

const faqs = [...conversionFaqs(c), ...STANDARD_FAQS];
const related = relatedConversions(c, 8);
const guides = guidesForCategory(c.category);

const schema = [
  softwareApplicationSchema({
    name: `${c.h1} Converter`,
    url,
    description: c.description,
    extraFeatures: [
      `${formatNumber(c.value)} ${shortName(c.from, c.value)} = ${answers
        .map((a) => `${formatNumber(a.result)} ${shortName(c.to, a.result)} (${a.std.label} standard)`)
        .join('; ')}`,
      formulaText(c.from, c.to),
    ],
  }),
  faqPageSchema(faqs),
  breadcrumbSchema([
    { name: 'Home', url: new URL('/', site).href },
    { name: 'Conversions', url: new URL('/convert/', site).href },
    { name: c.h1, url },
  ]),
];
---

<BaseLayout title={c.title} description={c.description} schema={schema} sidebar>
  <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Conversions', href: '/convert/' }, { name: c.h1 }]} />

  <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{c.h1}</h1>
  <p class="mt-3 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">{c.context}</p>

  <!-- Quick answer (static, crawlable) -->
  <section class="mt-6 rounded-2xl border-2 border-brand-700 bg-brand-50 p-4 sm:p-5" aria-labelledby="answer-heading">
    <h2 id="answer-heading" class="text-sm font-bold tracking-wide text-brand-800 uppercase">Quick answer</h2>
    <p class="num mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl">
      {formatNumber(c.value)}
      {shortName(c.from, c.value)} = {formatNumber(primary)}
      {shortName(c.to, primary)}
    </p>
    <p class="mt-1 text-sm text-slate-700">
      {c.sameAcross ? 'Same in every Marla standard.' : `On the ${defaultStd.label} (${defaultStd.name}) standard.`}
    </p>
    {
      !c.sameAcross && (
        <ul class="mt-4 grid gap-2 sm:grid-cols-3">
          {answers.map((a) => (
            <li class:list={['rounded-xl border bg-white px-3 py-2.5', a.std.id === c.defaultStandard ? 'border-brand-700' : 'border-brand-200']}>
              <span class="num block text-lg font-bold text-slate-900">
                {formatNumber(a.result)} {shortName(c.to, a.result)}
              </span>
              <span class="num block text-xs font-medium text-slate-600">
                {a.std.label} · {a.std.name}
              </span>
            </li>
          ))}
        </ul>
      )
    }
  </section>

  <div class="mt-6">
    <LandConverter
      id="slug-converter"
      heading={`${fromU.label} to ${toU.label} Converter`}
      initialValue={c.value}
      initialUnit={c.from}
      initialStandard={c.defaultStandard}
    />
  </div>

  <AdSlot variant="rectangle" name="in-content-1" class="mt-8" />

  <section class="prose-content mt-4" aria-labelledby="how-heading">
    <h2 id="how-heading">How to convert {fromU.label} to {toU.label}</h2>
    <p><strong>Formula:</strong> {formulaText(c.from, c.to)}</p>
    <h3>Worked calculation</h3>
    <ul>
      {
        steps.map((s) => (
          <li class="num">
            {s.standard ? <strong>{getStandard(s.standard).label}: </strong> : <strong>All standards: </strong>}
            {s.text}
          </li>
        ))
      }
    </ul>
  </section>

  <section class="mt-8" aria-labelledby="related-heading">
    <h2 id="related-heading" class="mb-4 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Nearby sizes & related conversions</h2>
    <LinkGrid links={related.map((r) => ({ href: `/convert/${r.slug}/`, label: r.h1 }))} />
    {
      category && (
        <p class="mt-3 text-sm text-slate-600">
          Browse all <a href="/convert/" class="font-semibold text-brand-700 underline">{category.title}</a> and other
          conversions, or use the <a href="/plot-size-calculator/" class="font-semibold text-brand-700 underline">plot size calculator</a> if
          you have dimensions.
        </p>
      )
    }
  </section>

  <section class="mt-10" aria-labelledby="table-heading">
    <h2 id="table-heading" class="mb-4 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
      {fromU.label} to {toU.label} reference table
    </h2>
    <ReferenceTable from={c.from} to={c.to} values={c.tableValues} highlight={c.value} />
  </section>

  <section class="mt-10" aria-labelledby="breakdown-heading">
    <h2 id="breakdown-heading" class="mb-4 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
      {formatNumber(c.value)}
      {unitLabel(c.from, c.value)} in all units
    </h2>
    <BreakdownTable value={c.value} unit={c.from} />
  </section>

  <Faq items={faqs} heading={`${c.h1}: FAQ`} />

  {
    guides.length > 0 && (
      <section class="mt-12" aria-labelledby="guides-heading">
        <h2 id="guides-heading" class="mb-4 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Related guides
        </h2>
        <LinkGrid links={guides.map((g) => ({ href: `/guides/${g.slug}/`, label: g.h1, note: g.summary }))} />
      </section>
    )
  }

  <p class="mt-8 text-sm text-slate-600">
    Results by {SITE.name} are for guidance. Confirm areas with your society, the revenue department or a licensed surveyor.
  </p>

  <SidebarLinks slot="sidebar" links={related.slice(0, 6)} heading="Nearby conversions" />
</BaseLayout>
```

## `src/pages/convert/index.astro`

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Breadcrumbs from '../../components/Breadcrumbs.astro';
import SidebarLinks from '../../components/SidebarLinks.astro';
import { SITE } from '../../config/site';
import { ANSWER_ORDER, CATEGORIES, CONVERSIONS, conversionsInCategory, shortName } from '../../data/conversions';
import { formatNumber, getStandard } from '../../lib/units';
import { breadcrumbSchema } from '../../lib/schema';

const title = `All ${CONVERSIONS.length} Land Conversions: Marla, Kanal, Sq Ft, Gaz & Acre`;
const description =
  'Every LandNaap conversion page: Marla to sq ft, sq yards and sq meters, Kanal and acre conversions, Sarsai and Karachi gaz to Marla, on the 225, 250 and 272.25 standards.';
const site = Astro.site ?? new URL(SITE.url);

const schema = [
  breadcrumbSchema([
    { name: 'Home', url: new URL('/', site).href },
    { name: 'Conversions', url: new URL('/convert/', site).href },
  ]),
];
---

<BaseLayout title={title} description={description} schema={schema} sidebar>
  <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Conversions' }]} />
  <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Land Area Conversions</h1>
  <p class="mt-3 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
    {CONVERSIONS.length} ready-made conversions. Each page opens the converter pre-filled and shows exact results for the 225,
    250 and 272.25 sq ft Marla standards.
  </p>

  <nav aria-label="Conversion groups" class="mt-5 flex flex-wrap gap-2">
    {
      CATEGORIES.map((cat) => (
        <a
          href={`#${cat.id}`}
          class="inline-flex min-h-10 items-center rounded-full border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 hover:border-brand-600 hover:bg-brand-50"
        >
          {cat.title}
        </a>
      ))
    }
  </nav>

  {
    CATEGORIES.map((cat) => (
      <section id={cat.id} class="mt-10 scroll-mt-4" aria-labelledby={`${cat.id}-heading`}>
        <h2 id={`${cat.id}-heading`} class="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          {cat.title}
        </h2>
        <p class="mt-1 mb-4 text-sm text-slate-600">{cat.description}</p>
        <div class="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table class="data-table">
            <thead>
              <tr>
                <th scope="col">Conversion</th>
                {ANSWER_ORDER.map((id) => (
                  <th scope="col" class="text-right">
                    <span class="num block">{getStandard(id).label}</span>
                    <span class="block text-xs font-medium text-slate-600">{getStandard(id).name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {conversionsInCategory(cat.id).map((c) => (
                <tr>
                  <th scope="row">
                    <a
                      href={`/convert/${c.slug}/`}
                      class="font-semibold text-brand-700 underline decoration-brand-300 underline-offset-2 hover:decoration-brand-700"
                    >
                      {c.linkLabel}
                    </a>
                  </th>
                  {ANSWER_ORDER.map((id) => (
                    <td class="text-right">
                      {formatNumber(c.results[id])} {shortName(c.to, c.results[id])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    ))
  }

  <p class="mt-8 leading-7 text-slate-700">
    Looking for a different value? The <a href="/" class="font-semibold text-brand-700 underline">land area converter</a> handles
    any amount in any unit, and the <a href="/plot-size-calculator/" class="font-semibold text-brand-700 underline">plot size calculator</a>
    works from frontage and depth. For background, read the <a href="/guides/" class="font-semibold text-brand-700 underline">land measurement guides</a>.
  </p>

  <SidebarLinks slot="sidebar" />
</BaseLayout>
```

## `src/pages/guides/covered-area-vs-plot-area-construction.astro`

```astro
---
import GuideLayout from '../../layouts/GuideLayout.astro';
import { getGuide } from '../../data/guides';

const guide = getGuide('covered-area-vs-plot-area-construction');
---

<GuideLayout guide={guide}>
  <h2 id="why-it-matters">Plot size is not house size</h2>
  <p>
    A 10 Marla plot does not give you 10 Marla of house. Building bylaws require open space around the building, limit how
    much of the plot the ground floor may cover, and cap the total floor area across all storeys. Construction contractors,
    meanwhile, price their work on <strong>covered area</strong>, not plot area. Understanding the difference is the first
    step in any realistic budget.
  </p>

  <h2 id="definitions">The five terms you need</h2>
  <ul>
    <li>
      <strong>Plot area:</strong> the land you own, from boundary to boundary. For a 35 × 65 ft plot, 2,275 sq ft.
    </li>
    <li>
      <strong>Setbacks:</strong> mandatory open strips at the front, rear and sometimes the sides, where you may not build
      (apart from permitted items such as boundary walls).
    </li>
    <li>
      <strong>Ground coverage:</strong> the footprint of the building on the ground floor, often expressed as a percentage of
      plot area.
    </li>
    <li>
      <strong>Covered area:</strong> the total built-up floor area of all floors, measured to the outside of external walls.
      Basements, stair towers (mumty) and porches may or may not count, depending on the bylaws.
    </li>
    <li>
      <strong>FAR (Floor Area Ratio):</strong> total covered area divided by plot area. A FAR of 1.5 on a 2,000 sq ft plot
      allows up to 3,000 sq ft of covered area, if height and setback rules also permit it.
    </li>
  </ul>

  <h2 id="example">Worked example: a 10 Marla house</h2>
  <p>
    Take a 35 × 65 ft society plot (2,275 sq ft). The figures below are <em>illustrative assumptions</em> to show the
    method. Your own society or development authority sets the actual values by plot size.
  </p>
  <ol>
    <li>
      <strong>Apply setbacks.</strong> Assume a 10 ft front setback and a 5 ft rear setback, with no side setbacks. The
      buildable depth is 65 − 10 − 5 = 50 ft, so the maximum footprint is 35 × 50 = <strong>1,750 sq ft</strong>.
    </li>
    <li>
      <strong>Ground floor.</strong> Building the full footprint gives 1,750 sq ft of covered area. Ground coverage is
      1,750 ÷ 2,275 = 77% of the plot.
    </li>
    <li>
      <strong>First floor.</strong> Some societies cap the first floor at a percentage of the ground floor on larger plots.
      Assuming a 75% cap: 1,750 × 0.75 = <strong>1,312.5 sq ft</strong>.
    </li>
    <li>
      <strong>Total covered area:</strong> 1,750 + 1,312.5 = <strong>3,062.5 sq ft</strong>, before any stair tower or
      basement.
    </li>
    <li><strong>Resulting FAR:</strong> 3,062.5 ÷ 2,275 = about 1.35.</li>
  </ol>
  <p>
    So a "10 Marla house" in this scenario has roughly 3,060 sq ft of covered area, a third more than the plot itself, while
    the ground-floor footprint is about three quarters of it.
  </p>

  <h2 id="estimates">Turning covered area into a construction estimate</h2>
  <p>
    Contractors usually quote a rate per square foot of covered area, either for the grey structure alone or for the
    complete house including finishing. The basic estimate is simple:
  </p>
  <p><strong>Construction cost = covered area × rate per sq ft</strong></p>
  <p>Using 3,062.5 sq ft with a quoted rate R, the estimate is 3,062.5 × R. A few things refine it:</p>
  <ul>
    <li>
      <strong>Separate grey structure and finishing.</strong> Finishing quality varies far more than structure, so quote and
      compare them separately.
    </li>
    <li>
      <strong>Price items outside covered area separately.</strong> Boundary walls, gates, external paving, the porch roof
      and an underground water tank are often outside the per-foot rate.
    </li>
    <li>
      <strong>Check what is counted.</strong> Agree in writing whether the stair tower, basement and balconies are included
      in the covered area the contractor bills.
    </li>
    <li>
      <strong>Usable area is smaller.</strong> Covered area includes wall thickness, so room-by-room (carpet) area is
      noticeably less. Use it when planning furniture, not when budgeting construction.
    </li>
  </ul>
  <p>
    Construction rates move with steel, cement and labour prices, so get current written quotes rather than relying on any
    published average.
  </p>

  <h2 id="metric">Converting for drawings and engineers</h2>
  <p>
    Architects and structural engineers often work in metric. Multiply square feet by 0.09290304 to get square meters: the
    2,275 sq ft plot is 211.35 sq m, and the 3,062.5 sq ft covered area is 284.52 sq m. The
    <a href="/convert/10-marla-to-sq-meters/">10 Marla to square meters</a> page has the exact figures for each Marla
    standard.
  </p>

  <h2 id="checklist">Checklist before you finalise a design</h2>
  <ol>
    <li>Get the current building and zoning bylaws for your exact plot category from the society or authority.</li>
    <li>Note front, rear and side setbacks, the ground coverage limit, the maximum number of storeys and the height cap.</li>
    <li>Check the rules on basements, stair towers, car porches, projections and parking.</li>
    <li>Ask your architect for a covered-area schedule floor by floor, and check it against the FAR limit.</li>
    <li>Submit drawings for approval before construction starts. Building without an approved plan risks fines or demolition.</li>
  </ol>
  <p>
    Start with the right plot area. If you are unsure of yours, measure frontage and depth and use the
    <a href="/plot-size-calculator/">plot size calculator</a>.
  </p>
</GuideLayout>
```

## `src/pages/guides/dha-bahria-town-lda-plot-dimensions.astro`

```astro
---
import GuideLayout from '../../layouts/GuideLayout.astro';
import { getGuide } from '../../data/guides';

const guide = getGuide('dha-bahria-town-lda-plot-dimensions');
---

<GuideLayout guide={guide}>
  <h2 id="standard-cuts">Typical dimensions by plot size</h2>
  <p>
    Large housing societies in Punjab plan their blocks around a few standard plot categories, each with a usual frontage
    (width facing the road) and depth. All of them use the 225 sq ft Marla. The table shows the dimensions most commonly
    used in DHA Lahore and Bahria Town Lahore, and the exact Marla each one produces.
  </p>
  <div class="mb-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
    <table class="data-table">
      <thead>
        <tr>
          <th scope="col">Category</th>
          <th scope="col">Typical dimensions</th>
          <th scope="col" class="text-right">Area</th>
          <th scope="col" class="text-right">Exact Marla (225)</th>
        </tr>
      </thead>
      <tbody>
        <tr><th scope="row">5 Marla</th><td>25 × 45 ft</td><td class="text-right">1,125 sq ft</td><td class="text-right">5.00</td></tr>
        <tr><th scope="row">8 Marla</th><td>30 × 60 ft</td><td class="text-right">1,800 sq ft</td><td class="text-right">8.00</td></tr>
        <tr><th scope="row">10 Marla</th><td>35 × 65 ft (or 35 × 64 ft)</td><td class="text-right">2,275 sq ft</td><td class="text-right">10.11</td></tr>
        <tr><th scope="row">1 Kanal</th><td>50 × 90 ft</td><td class="text-right">4,500 sq ft</td><td class="text-right">20.00</td></tr>
        <tr><th scope="row">2 Kanal</th><td>75 × 120 ft or 100 × 90 ft</td><td class="text-right">9,000 sq ft</td><td class="text-right">40.00</td></tr>
      </tbody>
    </table>
  </div>
  <p>
    These are typical cuts, not guarantees. Dimensions vary between phases, blocks and schemes, and the plot map attached to
    your allotment is the only figure that counts for your plot.
  </p>

  <h2 id="ten-marla">Why 10 Marla is 35 × 65 and not exactly 2,250 sq ft</h2>
  <p>
    Exactly 10 Marla on the society standard is 2,250 sq ft. Planners also want a frontage that suits a family house and
    whole-foot dimensions that are easy to stake out on site. Exact options exist: 30 × 75 ft is too narrow for its depth,
    and 45 × 50 ft is too shallow for a front lawn and a rear yard.
  </p>
  <p>
    35 × 65 ft gives a comfortable proportion at 2,275 sq ft, about 10.11 Marla. Some phases use 35 × 64 ft (2,240 sq ft,
    9.96 Marla) instead. In both cases the plot is sold under the 10 Marla category, and the 25 sq ft difference is
    absorbed in the layout. The category is a label; the allotted area is on the plot map.
  </p>

  <h2 id="two-kanal">Two Kanal and larger</h2>
  <p>
    Two Kanal is the largest standard residential category in many DHA Lahore phases. Older phases tend to use deep plots of
    75 × 120 ft; others use wider 100 × 90 ft plots. Both are 9,000 sq ft. Some phases also have 4 Kanal residential plots.
    Wider frontage costs more per foot of road, which is one reason layouts differ between phases.
  </p>

  <h2 id="other-sizes">7, 12 Marla and commercial plots</h2>
  <p>
    Categories such as 7 Marla and 12 Marla exist in some phases and schemes, but their cuts vary much more than the core
    sizes. A 7 Marla plot is often around 30 ft wide, and a 12 Marla plot is usually wider than a 10 Marla. Always measure
    rather than assume.
  </p>
  <p>
    Commercial plots follow their own categories. In DHA Lahore, 2, 4 and 8 Marla and 1 Kanal commercial plots are common.
    Their dimensions depend on the market or boulevard they front, and they come with separate rules on height and use.
  </p>

  <h2 id="lda-schemes">LDA-approved private schemes</h2>
  <p>
    The Lahore Development Authority approves the layout plans of private housing schemes in its area. Approved schemes
    generally use the 225 sq ft Marla, and many reuse the familiar 25 × 45 ft cut for 5 Marla. Each scheme's approved layout
    plan is the authority on plot sizes, so check it rather than relying on a brochure. LDA also publishes information on
    which schemes are approved, which is worth checking before you pay for a file.
  </p>

  <h2 id="corner-plots">Corner, park-facing and "extra land" plots</h2>
  <p>
    Corner plots are often not a clean rectangle. The corner may be cut back (chamfered) for road visibility, which reduces
    the area, or the plot may include extra land along the side road, which increases it. Societies usually charge a premium
    for corners and park-facing locations, and any extra land is often billed separately per Marla.
  </p>
  <p>
    For an irregular corner plot, frontage × depth will not give the right area. Use the triangulation method in our guide on
    <a href="/guides/how-to-measure-irregular-plot-area/">measuring irregular plots</a>.
  </p>

  <h2 id="before-buying">What to check before you buy</h2>
  <ol>
    <li>Get the plot map or possession letter and note the stated dimensions and area in square feet.</li>
    <li>Measure frontage and depth on site, from boundary pillar to boundary pillar, keeping the tape straight and level.</li>
    <li>
      Enter both into the <a href="/plot-size-calculator/">plot size calculator</a> and compare the exact Marla with the
      category you are paying for.
    </li>
    <li>For corners, record both side lengths and a diagonal, and check how any extra land is priced.</li>
    <li>Read the society's building bylaws for your category before designing, because setbacks differ by plot size.</li>
  </ol>
</GuideLayout>
```

## `src/pages/guides/fard-intiqal-land-units-kanal-marla-sarsai.astro`

```astro
---
import GuideLayout from '../../layouts/GuideLayout.astro';
import { getGuide } from '../../data/guides';

const guide = getGuide('fard-intiqal-land-units-kanal-marla-sarsai');
---

<GuideLayout guide={guide}>
  <h2 id="unit-chain">The unit chain: karam to acre</h2>
  <p>
    Land in Punjab's revenue records is measured with a single, internally consistent chain of units. It starts with the
    <strong>karam</strong>, a measuring length of 5.5 ft (66 inches), and every larger unit is a whole multiple of the one
    before it.
  </p>
  <div class="mb-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
    <table class="data-table">
      <thead>
        <tr>
          <th scope="col">Unit</th>
          <th scope="col">Definition</th>
          <th scope="col" class="text-right">Square feet</th>
          <th scope="col" class="text-right">Square yards</th>
        </tr>
      </thead>
      <tbody>
        <tr><th scope="row">Sarsai</th><td>1 karam × 1 karam</td><td class="text-right">30.25</td><td class="text-right">3.36</td></tr>
        <tr><th scope="row">Marla</th><td>9 Sarsai</td><td class="text-right">272.25</td><td class="text-right">30.25</td></tr>
        <tr><th scope="row">Kanal</th><td>20 Marla</td><td class="text-right">5,445</td><td class="text-right">605</td></tr>
        <tr><th scope="row">Acre</th><td>8 Kanal (36 × 40 karam)</td><td class="text-right">43,560</td><td class="text-right">4,840</td></tr>
      </tbody>
    </table>
  </div>
  <p>
    Two numbers are worth remembering: a Kanal is 180 Sarsai, and an acre is 1,440 Sarsai (160 Marla). With those you can
    move between any of the units with simple multiplication. Note that the revenue system always uses the 272.25 sq ft
    Marla, even in districts where nearby housing societies sell plots in 225 sq ft Marla.
  </p>

  <h2 id="documents">The documents and terms you will meet</h2>
  <ul>
    <li>
      <strong>Fard (fard malkiat):</strong> an extract from the record of rights showing the owners of a holding and their
      shares. You need a current fard for almost any land transaction.
    </li>
    <li>
      <strong>Jamabandi:</strong> the record of rights itself, prepared and updated periodically for each revenue estate
      (mauza). It lists owners, cultivators, shares and areas.
    </li>
    <li>
      <strong>Intiqal (mutation):</strong> the entry that records a change in ownership, for example after a sale, gift or
      inheritance. Until the intiqal is sanctioned, the revenue record still shows the previous owner.
    </li>
    <li><strong>Khewat:</strong> the ownership account number grouping owners who share a holding.</li>
    <li><strong>Khatauni:</strong> the cultivation account within a khewat, showing who cultivates the land.</li>
    <li><strong>Khasra:</strong> the field number, identifying a specific parcel on the village map.</li>
    <li><strong>Shajra (aks shajra):</strong> the village map showing khasra numbers and field boundaries.</li>
  </ul>
  <p>
    In Punjab, computerised fards are issued through the Punjab Land Records Authority's Arazi Record Centres and online
    services, which has made records easier to obtain and check than in the hand-written era.
  </p>

  <h2 id="notation">How area is written</h2>
  <p>
    Revenue records state area in Kanal and Marla, and Sarsai where needed. You will see it written in full, such as "4 Kanal
    12 Marla 3 Sarsai", or compactly as <strong>4-12-3</strong> in the same order. Larger holdings may be expressed in acres
    plus Kanal and Marla.
  </p>
  <p>
    Ownership is often recorded as a share (hissa) of a khewat rather than a separate parcel. If three siblings jointly own
    24 Kanal 6 Marla in equal shares, each one's share is a third of 486 Marla, which is 162 Marla or
    <strong>8 Kanal 2 Marla</strong>. A share is an entitlement on paper; it does not show which part of the land is yours
    until the land is partitioned.
  </p>

  <h2 id="convert">Converting a fard area to square feet</h2>
  <p>The reliable method is to convert everything to Sarsai first, then multiply by 30.25.</p>
  <ol>
    <li>Take an area of 2 Kanal 7 Marla 4 Sarsai.</li>
    <li>Kanal to Sarsai: 2 × 180 = 360.</li>
    <li>Marla to Sarsai: 7 × 9 = 63.</li>
    <li>Total: 360 + 63 + 4 = 427 Sarsai.</li>
    <li>Square feet: 427 × 30.25 = <strong>12,916.75 sq ft</strong>.</li>
  </ol>
  <p>
    If you want to know how many society plots that land could become, divide by 225: 12,916.75 ÷ 225 = 57.41 society Marla,
    before any land is set aside for roads and amenities.
  </p>

  <h2 id="why-different">Why fard figures and society figures disagree</h2>
  <p>
    A developer buys farmland by the revenue Kanal and sells plots by the society Marla. The same acre that is 160 Marla in
    the fard is 193.6 Marla when measured at 225 sq ft. Neither figure is wrong; they use different units. Trouble starts only
    when someone compares a fard area with a society plot size without converting.
  </p>

  <h2 id="tips">Practical tips</h2>
  <ul>
    <li>Get a fresh fard before paying anything. Ownership and shares can change with each intiqal.</li>
    <li>Match the khasra numbers on the fard with the shajra to confirm you are looking at the right land.</li>
    <li>
      Shares are not boundaries. For a specific parcel, ask for official demarcation (nishandehi) by revenue staff before you
      build or fence.
    </li>
    <li>
      Convert carefully. Use the <a href="/convert/1-marla-to-sarsai/">Marla to Sarsai</a> and
      <a href="/convert/1-acre-to-kanal/">acre to Kanal</a> pages, or set the
      <a href="/">land area converter</a> to the 272.25 standard.
    </li>
  </ul>
</GuideLayout>
```

## `src/pages/guides/how-to-measure-irregular-plot-area.astro`

```astro
---
import GuideLayout from '../../layouts/GuideLayout.astro';
import { getGuide } from '../../data/guides';

const guide = getGuide('how-to-measure-irregular-plot-area');
---

<GuideLayout guide={guide}>
  <h2 id="problem">Why frontage × depth is not enough</h2>
  <p>
    Frontage × depth is exact only for a rectangle. Many plots are not rectangles: corner plots with a cut corner, plots on
    curved roads, inherited agricultural parcels and older town plots often have four unequal sides and angles that are not
    90°.
  </p>
  <p>
    Measuring the four sides alone does not fix the area either. Take a plot with two 30 ft sides and two 60 ft sides. If
    the corners are square, it is a 30 × 60 ft rectangle of 1,800 sq ft. If it is skewed so that one diagonal measures 75 ft
    instead of the rectangle's 67.08 ft, the same four sides enclose only <strong>1,709.85 sq ft</strong>, about 90 sq ft
    less. The sides did not change; the angles did.
  </p>

  <h2 id="method">The method: split the plot into triangles</h2>
  <p>
    A triangle is the one shape whose area is fixed by its three sides. Any plot with straight boundaries can be divided into
    triangles by drawing diagonals between corners. A four-sided plot needs one diagonal and becomes two triangles. A
    five-sided plot needs two diagonals and becomes three triangles, and so on. What you need to measure:
  </p>
  <ul>
    <li>all four sides, corner to corner (boundary pillar to boundary pillar);</li>
    <li>one diagonal, which splits the plot into two triangles;</li>
    <li>ideally the second diagonal as well, to check your work.</li>
  </ul>

  <h2 id="heron">Heron's formula</h2>
  <p>For a triangle with sides a, b and c:</p>
  <ol>
    <li>Find the semi-perimeter: <strong>s = (a + b + c) ÷ 2</strong>.</li>
    <li>Calculate <strong>Area = √( s × (s − a) × (s − b) × (s − c) )</strong>.</li>
  </ol>
  <p>
    If any bracket comes out zero or negative, the three lengths cannot form a triangle, which almost always means a
    measurement or recording error.
  </p>

  <h2 id="example">Worked example</h2>
  <p>A four-sided plot ABCD was measured as follows:</p>
  <div class="mb-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
    <table class="data-table">
      <thead>
        <tr><th scope="col">Measurement</th><th scope="col" class="text-right">Length</th></tr>
      </thead>
      <tbody>
        <tr><th scope="row">AB (front)</th><td class="text-right">32 ft</td></tr>
        <tr><th scope="row">BC (right side)</th><td class="text-right">61 ft</td></tr>
        <tr><th scope="row">CD (rear)</th><td class="text-right">28 ft</td></tr>
        <tr><th scope="row">DA (left side)</th><td class="text-right">58 ft</td></tr>
        <tr><th scope="row">AC (diagonal)</th><td class="text-right">68 ft</td></tr>
      </tbody>
    </table>
  </div>
  <p><strong>Triangle ABC</strong> (sides 32, 61, 68):</p>
  <ul>
    <li>s = (32 + 61 + 68) ÷ 2 = 80.5</li>
    <li>Area = √(80.5 × 48.5 × 19.5 × 12.5) = √951,660.9 ≈ 975.53 sq ft</li>
  </ul>
  <p><strong>Triangle ACD</strong> (sides 68, 28, 58):</p>
  <ul>
    <li>s = (68 + 28 + 58) ÷ 2 = 77</li>
    <li>Area = √(77 × 9 × 49 × 19) = √645,183 ≈ 803.23 sq ft</li>
  </ul>
  <p>
    <strong>Total plot area</strong> = 975.53 + 803.23 = <strong>1,778.76 sq ft</strong>. That is 7.91 Marla on the 225 sq
    ft society standard or 6.53 Marla on the 272.25 sq ft revenue standard.
  </p>

  <h2 id="shortcut">The averaging shortcut, and its limits</h2>
  <p>
    A common shortcut multiplies the average width by the average length. Here: ((32 + 28) ÷ 2) × ((61 + 58) ÷ 2) = 30 ×
    59.5 = 1,785 sq ft. For this nearly rectangular plot the shortcut is only 0.35% high.
  </p>
  <p>
    The shortcut ignores angles, though, and it never underestimates. For the skewed 30 × 60 plot in the first section it
    gives 1,800 sq ft against a true 1,709.85 sq ft, an overstatement of more than 5%. On a plot sold by the Marla, that
    difference is real money. Use triangulation whenever the corners are visibly not square.
  </p>

  <h2 id="check">Check your answer</h2>
  <ul>
    <li>
      <strong>Second diagonal.</strong> Measure BD as well and recompute using triangles ABD and BCD. The two totals should
      agree closely. In this example BD works out to about 65.1 ft.
    </li>
    <li>
      <strong>Coordinates.</strong> If a surveyor gives you corner coordinates, the shoelace formula gives the area directly
      and should match your triangle total.
    </li>
    <li>
      <strong>Sense check.</strong> The true area should be a little below the averaging shortcut, never above it.
    </li>
  </ul>

  <h2 id="tips">Measuring tips</h2>
  <ul>
    <li>Measure between boundary pillars or agreed corner points, not to the face of a wall that may be off the boundary.</li>
    <li>Keep the tape taut and level. On sloping ground, measure in short horizontal steps.</li>
    <li>Convert inches to decimal feet before calculating: 6 in = 0.5 ft and 3 in = 0.25 ft.</li>
    <li>Sketch the plot and label every corner and length as you go, so diagonals are not mixed up.</li>
    <li>For legal purposes, such as disputes, partition or registration, rely on an official demarcation or a licensed surveyor.</li>
  </ul>
  <p>
    Once you have the total in square feet, convert it with the <a href="/">land area converter</a>, or check a
    rectangular part of the plot with the <a href="/plot-size-calculator/">plot size calculator</a>.
  </p>
</GuideLayout>
```

## `src/pages/guides/index.astro`

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Breadcrumbs from '../../components/Breadcrumbs.astro';
import SidebarLinks from '../../components/SidebarLinks.astro';
import { SITE } from '../../config/site';
import { GUIDES } from '../../data/guides';
import { breadcrumbSchema } from '../../lib/schema';

const title = 'Land Measurement Guides for Pakistan: Marla, Kanal, Gaz & Fard';
const description =
  'Practical guides to Pakistani land measurement: 225 vs 272.25 sq ft Marla, DHA and Bahria plot dimensions, Karachi gaz, fard units, covered area and irregular plots.';
const site = Astro.site ?? new URL(SITE.url);

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url: new URL('/guides/', site).href,
    inLanguage: SITE.lang,
    hasPart: GUIDES.map((g) => ({
      '@type': 'Article',
      headline: g.h1,
      url: new URL(`/guides/${g.slug}/`, site).href,
    })),
  },
  breadcrumbSchema([
    { name: 'Home', url: new URL('/', site).href },
    { name: 'Guides', url: new URL('/guides/', site).href },
  ]),
];
---

<BaseLayout title={title} description={description} schema={schema} sidebar>
  <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Guides' }]} />
  <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Land Measurement Guides</h1>
  <p class="mt-3 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
    Clear, factual references on how land is measured in Pakistan, written to sit alongside the calculators. Every example
    uses the same exact formulas as the {SITE.name} tools.
  </p>

  <ol class="mt-8 space-y-4">
    {
      GUIDES.map((g, i) => (
        <li>
          <a
            href={`/guides/${g.slug}/`}
            class="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-colors hover:border-brand-600 hover:bg-brand-50 sm:p-5"
          >
            <span
              class="num flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-700 text-base font-bold text-white"
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <span>
              <span class="block text-lg leading-snug font-bold text-slate-900 group-hover:text-brand-800">{g.h1}</span>
              <span class="mt-1 block leading-6 text-slate-700">{g.summary}</span>
            </span>
          </a>
        </li>
      ))
    }
  </ol>

  <p class="mt-8 text-sm leading-6 text-slate-600">
    Need a number rather than an explanation? Use the <a href="/" class="font-semibold text-brand-700 underline">land area converter</a>,
    the <a href="/plot-size-calculator/" class="font-semibold text-brand-700 underline">plot size calculator</a> or browse
    <a href="/convert/" class="font-semibold text-brand-700 underline">all conversions</a>.
  </p>

  <SidebarLinks slot="sidebar" />
</BaseLayout>
```

## `src/pages/guides/karachi-sq-yards-gaz-vs-punjab-marla.astro`

```astro
---
import GuideLayout from '../../layouts/GuideLayout.astro';
import { getGuide } from '../../data/guides';
import { formatNumber, fromSqFt } from '../../lib/units';

const guide = getGuide('karachi-sq-yards-gaz-vs-punjab-marla');
const sizes = [80, 120, 200, 240, 400, 500, 600, 1000, 2000];
const rows = sizes.map((g) => {
  const sqft = g * 9;
  return {
    g,
    sqft,
    m225: fromSqFt(sqft, 'marla', '225'),
    m272: fromSqFt(sqft, 'marla', '272.25'),
    k225: fromSqFt(sqft, 'kanal', '225'),
  };
});
---

<GuideLayout guide={guide}>
  <h2 id="two-systems">Two systems, one country</h2>
  <p>
    In Karachi and across urban Sindh, residential plots are measured and sold in <strong>square yards</strong>, usually
    called gaz or simply "yards". A "120 yard house" means a house on a 120 square yard plot. In Punjab, Islamabad and Khyber
    Pakhtunkhwa, the same plot would be described in Marla and Kanal. Families relocating between cities, overseas buyers and
    investors comparing markets constantly need to translate between the two.
  </p>
  <p>
    The bridge is the square foot. One square yard is 3 ft × 3 ft = <strong>9 sq ft</strong>. Convert gaz to square feet,
    then divide by the Marla size you need.
  </p>

  <h2 id="shortcuts">The shortcuts worth memorising</h2>
  <p>Because a society Marla is exactly 25 square yards, most conversions become simple division:</p>
  <ul>
    <li><strong>Society Marla</strong> = square yards ÷ 25</li>
    <li><strong>Society Kanal</strong> = square yards ÷ 500</li>
    <li><strong>Revenue Marla</strong> = square yards ÷ 30.25</li>
    <li><strong>Revenue Kanal</strong> = square yards ÷ 605</li>
  </ul>
  <p>
    Going the other way, multiply Marla by 25 (society) or 30.25 (revenue) to get square yards. On the 250 sq ft developer
    standard a Marla is about 27.78 square yards.
  </p>

  <h2 id="table">Common Karachi plot sizes in Marla and Kanal</h2>
  <p>
    The sizes below are the ones most often seen in Karachi listings, from small 80 and 120 yard plots up to the 500 and
    1,000 yard bungalow plots associated with DHA Karachi.
  </p>
  <div class="mb-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
    <table class="data-table">
      <thead>
        <tr>
          <th scope="col">Square yards</th>
          <th scope="col" class="text-right">Square feet</th>
          <th scope="col" class="text-right">Marla (225)</th>
          <th scope="col" class="text-right">Marla (272.25)</th>
          <th scope="col" class="text-right">Kanal (225)</th>
        </tr>
      </thead>
      <tbody>
        {
          rows.map((r) => (
            <tr>
              <th scope="row">{formatNumber(r.g)} gaz</th>
              <td class="text-right">{formatNumber(r.sqft)}</td>
              <td class="text-right">{formatNumber(r.m225, 2)}</td>
              <td class="text-right">{formatNumber(r.m272, 2)}</td>
              <td class="text-right">{formatNumber(r.k225, 2)}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>

  <h2 id="matches">Where the two systems line up</h2>
  <p>A few sizes match almost perfectly on the society standard, which makes cross-city comparison easy:</p>
  <ul>
    <li><strong>500 gaz = 1 Kanal.</strong> A DHA Karachi 500 yard plot has the same area as a 50 × 90 ft Kanal in Lahore.</li>
    <li><strong>1,000 gaz = 2 Kanal.</strong> The top residential categories in both cities are the same size.</li>
    <li><strong>200 gaz = 8 Marla.</strong> Both are 1,800 sq ft, for example a 30 × 60 ft plot.</li>
    <li><strong>120 gaz ≈ 5 Marla.</strong> At 1,080 sq ft, the Karachi plot is 45 sq ft smaller than a 1,125 sq ft society 5 Marla.</li>
    <li><strong>240 gaz ≈ 10 Marla.</strong> At 2,160 sq ft, it is 90 sq ft short of a 2,250 sq ft society 10 Marla.</li>
  </ul>
  <p>
    On the revenue standard nothing lines up neatly. A revenue Kanal is 605 square yards, so a 500 yard plot is only about
    0.83 of it.
  </p>

  <h2 id="example">Worked example: comparing two family homes</h2>
  <p>
    A family is choosing between a house on a 240 yard plot in Karachi and a 10 Marla house in a Lahore society.
  </p>
  <ol>
    <li>Karachi plot: 240 × 9 = 2,160 sq ft.</li>
    <li>Lahore plot: if it is a 35 × 65 ft cut, 2,275 sq ft; at exactly 10 Marla, 2,250 sq ft.</li>
    <li>Difference: 90 to 115 sq ft in favour of Lahore, about 4–5%.</li>
  </ol>
  <p>
    To compare prices fairly, divide each asking price by its square footage. The result is a price per square foot that is
    directly comparable regardless of which unit the listing used.
  </p>

  <h2 id="pitfalls">Pitfalls to watch for</h2>
  <ul>
    <li>
      <strong>"Yards" means square yards.</strong> In Karachi listings, "120 yards" always refers to area, never a length.
    </li>
    <li>
      <strong>Flats are quoted in square feet.</strong> Apartment sizes are usually given as covered area in square feet,
      which is not comparable with a plot area in yards or Marla.
    </li>
    <li>
      <strong>Check the Marla standard on the Punjab side.</strong> If the Punjab property is on revenue land, a "10 Marla"
      plot is 2,722.5 sq ft, more than 300 square yards.
    </li>
    <li>
      <strong>Rounding.</strong> Listings often round 4.8 Marla up to "5 Marla". Convert the exact figure before you
      negotiate.
    </li>
  </ul>
  <p>
    For any size not in the table, use the <a href="/">land area converter</a>: type the square yards and read off Marla
    and Kanal on all three standards at once.
  </p>
</GuideLayout>
```

## `src/pages/guides/marla-size-pakistan-225-vs-272-25.astro`

```astro
---
import GuideLayout from '../../layouts/GuideLayout.astro';
import { getGuide } from '../../data/guides';

const guide = getGuide('marla-size-pakistan-225-vs-272-25');
---

<GuideLayout guide={guide}>
  <h2 id="short-answer">The short answer</h2>
  <p>
    "Marla" is one word for three different areas. Which one applies depends on who measured the land and which document you
    are reading. Before you compare prices, sign anything or plan a house, find out which standard your plot uses.
  </p>
  <div class="mb-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
    <table class="data-table">
      <thead>
        <tr>
          <th scope="col">Standard</th>
          <th scope="col" class="text-right">1 Marla</th>
          <th scope="col" class="text-right">1 Kanal</th>
          <th scope="col">Typically used by</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Society</th>
          <td class="text-right">225 sq ft (25 sq yd)</td>
          <td class="text-right">4,500 sq ft</td>
          <td>DHA, Bahria Town, LDA-approved and most private housing societies</td>
        </tr>
        <tr>
          <th scope="row">Revenue</th>
          <td class="text-right">272.25 sq ft (30.25 sq yd)</td>
          <td class="text-right">5,445 sq ft</td>
          <td>Patwari records: fard, jamabandi, intiqal, registry; agricultural land</td>
        </tr>
        <tr>
          <th scope="row">Developer</th>
          <td class="text-right">250 sq ft (27.78 sq yd)</td>
          <td class="text-right">5,000 sq ft</td>
          <td>Some private schemes that define their own unit</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2 id="revenue-marla">Where 272.25 sq ft comes from: the karam</h2>
  <p>
    The revenue system in Punjab is built on the <strong>karam</strong>, a measuring length of 5.5 feet (66 inches). A square
    with 1-karam sides is called a <strong>Sarsai</strong>: 5.5 × 5.5 = 30.25 sq ft. Nine Sarsai make a Marla, and twenty
    Marla make a Kanal:
  </p>
  <ul>
    <li>1 Sarsai = 30.25 sq ft</li>
    <li>1 Marla = 9 Sarsai = 272.25 sq ft</li>
    <li>1 Kanal = 20 Marla = 5,445 sq ft</li>
    <li>1 Acre = 8 Kanal = 160 Marla = 43,560 sq ft</li>
  </ul>
  <p>
    The chain closes neatly at the acre. An acre is traditionally reckoned as a field 36 karam by 40 karam, which is 1,440
    Sarsai. That is why the revenue Marla is exactly one 160th of an acre, and why this standard is the one the revenue
    department still uses for land records and farmland. A revenue Marla also equals one square rod (16.5 ft × 16.5 ft), the
    old English surveying unit.
  </p>

  <h2 id="society-marla">Where 225 sq ft comes from</h2>
  <p>
    Apply the same nine-Sarsai structure to a 5 ft karam and you get 5 × 5 × 9 = <strong>225 sq ft</strong>. This "small
    Marla" has a practical advantage for urban planning: it is exactly 25 square yards, so every plot size works out to round
    numbers. Five Marla is 125 sq yd, ten Marla is 250 sq yd and a Kanal is 500 sq yd or 4,500 sq ft.
  </p>
  <p>
    Those round numbers suit rectangular plot layouts. A 25 × 45 ft plot is exactly 5 Marla, 30 × 60 ft is exactly 8 Marla
    and 50 × 90 ft is exactly 1 Kanal. Housing societies such as DHA and Bahria Town, and most private schemes in urban
    Punjab, sell plots on this basis.
  </p>

  <h2 id="developer-marla">The 250 sq ft Marla</h2>
  <p>
    Some private developers define a Marla as 250 sq ft, giving a 5,000 sq ft Kanal. It is less common than the other two,
    but it appears often enough that you should never assume. If a booking form, brochure or allotment letter states the
    area in square feet, divide that figure by the number of Marla to see which definition the scheme is using.
  </p>

  <h2 id="what-it-costs">What the difference means in practice</h2>
  <p>
    The revenue Marla is 47.25 sq ft, or 21%, larger than the society Marla. On a single 5 Marla plot that is 236.25 sq ft,
    roughly the size of a bedroom. On a Kanal it is 945 sq ft.
  </p>
  <p>
    It matters most when comparing prices. Suppose two 5 Marla plots are each offered for Rs 50 lakh. On the society
    standard that is about Rs 4,444 per sq ft; on the revenue standard it is about Rs 3,673 per sq ft. The second plot is
    noticeably cheaper per foot even though the headline price and the "5 Marla" label are identical.
  </p>
  <p>
    The same gap explains part of the economics of land development. Farmland is bought in revenue Kanal of 5,445 sq ft.
    The same Kanal, measured in society Marla, is 24.2 Marla before any land is given up for roads, parks and other
    amenities.
  </p>

  <h2 id="check-yours">How to check which Marla your plot uses</h2>
  <ul>
    <li>
      <strong>Society plots:</strong> the allotment letter, possession letter or plot map usually states the dimensions or
      the area in square feet. Divide the square feet by the Marla count.
    </li>
    <li>
      <strong>Revenue land:</strong> the fard and intiqal state the area in Kanal, Marla and sometimes Sarsai. These figures
      are on the 272.25 sq ft standard.
    </li>
    <li>
      <strong>Building plans:</strong> approved drawings record plot area in square feet, which removes any ambiguity.
    </li>
    <li>
      <strong>Measure it:</strong> frontage × depth gives the area in square feet. Our
      <a href="/plot-size-calculator/">plot size calculator</a> converts it into Marla on all three standards at once.
    </li>
  </ul>
  <p>
    When a seller or agent quotes a size, ask for it in square feet as well. Square feet mean the same thing everywhere, so
    the question settles which Marla they mean before any money changes hands.
  </p>
</GuideLayout>
```

## `src/pages/index.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import LandConverter from '../components/LandConverter.astro';
import AdSlot from '../components/AdSlot.astro';
import Faq from '../components/Faq.astro';
import FormulaList from '../components/FormulaList.astro';
import SidebarLinks from '../components/SidebarLinks.astro';
import ReferenceTable from '../components/ReferenceTable.astro';
import { SITE } from '../config/site';
import { CONVERSIONS, POPULAR_CONVERSIONS } from '../data/conversions';
import { GUIDES } from '../data/guides';
import LinkGrid from '../components/LinkGrid.astro';
import { HOME_EXTRA_FAQS, STANDARD_FAQS } from '../data/faqs';
import { faqPageSchema, softwareApplicationSchema, websiteSchema } from '../lib/schema';

const title = 'Marla to Sq Ft, Kanal & Acre Calculator (225 / 272.25)';
const description =
  'Convert Marla, Kanal, sq ft, square yards (gaz), sq meters, acres and Sarsai instantly. Switch between 225, 250 and 272.25 sq ft Marla standards. Free & private.';

const faqs = [...STANDARD_FAQS, ...HOME_EXTRA_FAQS];
const site = Astro.site ?? new URL(SITE.url);
const url = new URL('/', site).href;

const schema = [
  websiteSchema(url),
  softwareApplicationSchema({
    name: `${SITE.name} Land Area Converter`,
    url,
    description,
    extraFeatures: [
      'Live bidirectional conversion between Marla, Kanal, Square Feet, Square Yards, Square Meters, Acres and Sarsai',
      'Three Marla standards: 225 sq ft (housing societies), 272.25 sq ft (revenue / Patwari), 250 sq ft (custom developer schemes)',
      'Side-by-side comparison of the same area across all Marla standards',
    ],
  }),
  faqPageSchema(faqs),
];
---

<BaseLayout title={title} description={description} schema={schema} sidebar>
  <div class="mb-6">
    <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Marla, Kanal & Square Feet Converter</h1>
    <p class="mt-3 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
      Instantly convert land area between Marla, Kanal, square feet, square yards (gaz), square meters, acres and Sarsai.
      Choose the <strong>225 sq ft</strong> society Marla, the <strong>272.25 sq ft</strong> revenue Marla or a
      <strong>250 sq ft</strong> developer Marla.
    </p>
  </div>

  <LandConverter id="home-converter" initialValue={5} initialUnit="marla" initialStandard="225" />

  <AdSlot variant="rectangle" name="in-content-1" class="mt-8" />

  <section class="prose-content mt-4" aria-labelledby="standards-heading">
    <h2 id="standards-heading">Which Marla is the right one?</h2>
    <p>
      Pakistan uses more than one definition of a Marla, and mixing them up is one of the most common mistakes when comparing
      plot prices. A plot advertised as "5 Marla" in a housing society is 1,125 sq ft, while 5 Marla in revenue records is
      1,361.25 sq ft.
    </p>
    <ul>
      <li>
        <strong>225 sq ft (25 sq yd):</strong> DHA, Bahria Town, LDA-approved schemes and most private housing societies.
      </li>
      <li>
        <strong>272.25 sq ft (30.25 sq yd):</strong> the revenue or Patwari standard, used in the fard, registry, intiqal and for
        agricultural land. 9 Sarsai = 1 Marla, 20 Marla = 1 Kanal, 8 Kanal = 1 acre.
      </li>
      <li>
        <strong>250 sq ft:</strong> used by some private developers. Always confirm the definition in your booking documents.
      </li>
    </ul>
    <p>
      Need the area of a plot from its dimensions instead? Use the <a href="/plot-size-calculator/">plot size calculator</a> to
      turn frontage and depth into square feet, Marla and the nearest standard plot size.
    </p>
  </section>

  <section class="mt-10" aria-labelledby="marla-table-heading">
    <h2 id="marla-table-heading" class="mb-4 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
      Marla to square feet table
    </h2>
    <ReferenceTable from="marla" to="sqft" values={[1, 2, 3, 4, 5, 7, 8, 10, 12, 15, 20]} />
  </section>

  <section class="mt-10" aria-labelledby="popular-heading">
    <h2 id="popular-heading" class="mb-4 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Popular conversions</h2>
    <LinkGrid links={POPULAR_CONVERSIONS.map((c) => ({ href: `/convert/${c.slug}/`, label: c.h1 }))} />
    <p class="mt-3 text-sm text-slate-600">
      <a href="/convert/" class="font-semibold text-brand-700 underline">See all {CONVERSIONS.length} conversions</a>, grouped
      by Marla, Kanal, acre, square yards and square meters.
    </p>
  </section>

  <section class="mt-10" aria-labelledby="guides-heading">
    <h2 id="guides-heading" class="mb-4 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Land measurement guides</h2>
    <LinkGrid links={GUIDES.map((g) => ({ href: `/guides/${g.slug}/`, label: g.h1, note: g.summary }))} />
  </section>

  <FormulaList />
  <Faq items={faqs} />

  <SidebarLinks slot="sidebar" />
</BaseLayout>
```

## `src/pages/plot-size-calculator.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import PlotCalculator from '../components/PlotCalculator.astro';
import AdSlot from '../components/AdSlot.astro';
import Faq from '../components/Faq.astro';
import Breadcrumbs from '../components/Breadcrumbs.astro';
import SidebarLinks from '../components/SidebarLinks.astro';
import FormulaList from '../components/FormulaList.astro';
import { SITE } from '../config/site';
import { PLOT_FAQS, STANDARD_FAQS } from '../data/faqs';
import { breadcrumbSchema, faqPageSchema, softwareApplicationSchema } from '../lib/schema';
import { formatNumber, getStandard } from '../lib/units';

const title = 'Plot Size Calculator: Feet to Marla & Kanal (25×45, 35×65)';
const description =
  'Enter plot frontage and depth in feet to get sq ft, square yards, exact Marla, Kanal and the closest standard plot size (5 Marla, 10 Marla, 1 Kanal). 225, 250 or 272.25.';

const faqs = [...PLOT_FAQS, ...STANDARD_FAQS];
const site = Astro.site ?? new URL(SITE.url);
const url = new URL('/plot-size-calculator/', site).href;

/** Example dimensions that produce standard sizes (exact arithmetic). */
const examples = [
  { size: '5 Marla', society: [25, 45], revenue: [27.5, 49.5] },
  { size: '7 Marla', society: [30, 52.5], revenue: [33, 57.75] },
  { size: '8 Marla', society: [30, 60], revenue: [33, 66] },
  { size: '10 Marla', society: [35, 65], revenue: [45, 60.5] },
  { size: '1 Kanal', society: [50, 90], revenue: [55, 99] },
  { size: '2 Kanal', society: [75, 120], revenue: [99, 110] },
];
const s225 = getStandard('225').sqftPerMarla;
const s272 = getStandard('272.25').sqftPerMarla;

const schema = [
  softwareApplicationSchema({
    name: `${SITE.name} Plot Dimension & Cutting Calculator`,
    url,
    description,
    extraFeatures: [
      'Calculates plot area from frontage and depth in feet',
      'Outputs total square feet, square yards, square meters, exact Marla, Kanal and Kanal–Marla–Sarsai breakdown',
      'Identifies the closest standard plot category (e.g. 5 Marla, 10 Marla, 1 Kanal)',
    ],
  }),
  faqPageSchema(faqs),
  breadcrumbSchema([
    { name: 'Home', url: new URL('/', site).href },
    { name: 'Plot Size Calculator', url },
  ]),
];
---

<BaseLayout title={title} description={description} schema={schema} sidebar>
  <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Plot Size Calculator' }]} />
  <div class="mb-6">
    <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Plot Size Calculator</h1>
    <p class="mt-3 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
      Turn plot dimensions into square feet, square yards, exact Marla and Kanal, and see which standard plot size it matches.
      For example, 25 × 45 ft is 5 Marla and 50 × 90 ft is 1 Kanal on the 225 sq ft society standard.
    </p>
  </div>

  <PlotCalculator id="plot-calc" initialWidth={25} initialDepth={45} initialStandard="225" />

  <AdSlot variant="rectangle" name="in-content-1" class="mt-8" />

  <section class="mt-10" aria-labelledby="dims-heading">
    <h2 id="dims-heading" class="mb-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
      Standard plot sizes and example dimensions
    </h2>
    <p class="mb-4 leading-7 text-slate-700">
      Society dimensions are the layouts commonly used by housing schemes on the 225 sq ft Marla. Revenue examples are exact
      multiples of the 5.5 ft karam on the 272.25 sq ft Marla. Actual plots vary by scheme, so measure your own plot.
    </p>
    <div class="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table class="data-table">
        <thead>
          <tr>
            <th scope="col">Plot size</th>
            <th scope="col">Society (225) example</th>
            <th scope="col" class="text-right">Area</th>
            <th scope="col">Revenue (272.25) example</th>
            <th scope="col" class="text-right">Area</th>
          </tr>
        </thead>
        <tbody>
          {
            examples.map((e) => {
              const a1 = e.society[0] * e.society[1];
              const a2 = e.revenue[0] * e.revenue[1];
              return (
                <tr>
                  <th scope="row">
                    {e.size}
                  </th>
                  <td>
                    {formatNumber(e.society[0])} × {formatNumber(e.society[1])} ft
                  </td>
                  <td class="text-right">
                    {formatNumber(a1)} sq ft
                    <span class="block text-xs text-slate-600">{formatNumber(a1 / s225)} Marla</span>
                  </td>
                  <td>
                    {formatNumber(e.revenue[0])} × {formatNumber(e.revenue[1])} ft
                  </td>
                  <td class="text-right">
                    {formatNumber(a2)} sq ft
                    <span class="block text-xs text-slate-600">{formatNumber(a2 / s272)} Marla</span>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  </section>

  <section class="prose-content mt-4" aria-labelledby="how-heading">
    <h2 id="how-heading">How plot cutting is calculated</h2>
    <ol>
      <li>Multiply frontage by depth: <strong>Area (sq ft) = Frontage × Depth</strong>.</li>
      <li>Divide by the Marla size of your scheme: <strong>Marla = Area ÷ 225</strong> (or 250, or 272.25).</li>
      <li>Divide Marla by 20 to get Kanal. Any remainder is shown as Marla, Sarsai (1/9 Marla) and leftover square feet.</li>
      <li>The closest standard category is the nearest common plot size. Within ±2.5% it is treated as a match.</li>
    </ol>
    <p>
      Corner plots, irregular shapes and plots with a chamfer need a survey. This calculator assumes a rectangular plot. To
      convert an area you already know, use the <a href="/">land area converter</a>.
    </p>
  </section>

  <FormulaList />
  <Faq items={faqs} />

  <SidebarLinks slot="sidebar" />
</BaseLayout>
```

## `src/pages/privacy-policy.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Breadcrumbs from '../components/Breadcrumbs.astro';
import { SITE } from '../config/site';
const site = Astro.site ?? new URL(SITE.url);
const domain = site.hostname;
---

<BaseLayout
  title="Privacy Policy"
  description={`How ${SITE.name} handles your data, cookies and third-party advertising, including Google AdSense.`}
>
  <div class="mx-auto max-w-3xl">
    <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Privacy Policy' }]} />
    <article class="prose-content rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
      <h1 class="mb-2 text-3xl font-extrabold tracking-tight text-slate-900">Privacy Policy</h1>
      <p class="text-sm text-slate-500">Last updated: {SITE.lastUpdated}</p>

      <p>
        This Privacy Policy explains how {SITE.name}, operated by {SITE.owner} ({SITE.city}) ("we", "us", "our"), collects,
        uses and protects information when you visit {domain} (the "Site"). By using the Site you agree to this policy.
        Contact: <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
      </p>

      <h2>1. Information you enter into the calculators</h2>
      <p>
        All calculations happen locally in your web browser. The values you type into the land area converter or plot calculator
        are <strong>not</strong> sent to us or stored on our servers. If you use the "Copy Results" button, the text is copied
        to your own device's clipboard only. Your current inputs may appear in the page address (URL) so you can bookmark or
        share a result; this URL stays on your device unless you share it.
      </p>

      <h2>2. Information collected automatically</h2>
      <p>
        Our hosting and content delivery provider (Cloudflare) processes standard technical data needed to deliver and secure
        the Site, such as IP address, browser type, requested page, referring page and time of request. This data is used for
        security, abuse prevention and aggregate traffic statistics, and is handled under Cloudflare's own privacy policy.
      </p>
      <p>
        We do not use Google Analytics or any other third-party analytics service, and we do not set tracking cookies of our
        own.
      </p>

      <h2>3. Cookies and advertising</h2>
      <p>
        The Site may display advertisements served by Google AdSense. When advertising is active, the following applies:
      </p>
      <ul>
        <li>
          Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other
          websites.
        </li>
        <li>
          Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to this Site
          and/or other sites on the Internet.
        </li>
        <li>
          You may opt out of personalised advertising by visiting
          <a href="https://adssettings.google.com" rel="noopener nofollow" target="_blank">Google Ads Settings</a>. You can also
          opt out of some third-party vendors' use of cookies for personalised advertising at
          <a href="https://www.aboutads.info/choices/" rel="noopener nofollow" target="_blank">www.aboutads.info</a>.
        </li>
        <li>
          For more information, see
          <a href="https://policies.google.com/technologies/partner-sites" rel="noopener nofollow" target="_blank"
            >How Google uses information from sites or apps that use its services</a
          >.
        </li>
      </ul>
      <p>
        Where required by law (for example for visitors in the European Economic Area, the United Kingdom or Switzerland), we
        will ask for your consent through a certified consent management platform before personalised ads or non-essential
        cookies are used. You can block or delete cookies in your browser settings at any time; the calculators will continue
        to work.
      </p>

      <h2>4. Contact messages</h2>
      <p>
        If you email us, we receive your email address and the contents of your message. We use this only to reply to you and
        keep it no longer than necessary for that purpose. We do not sell or rent personal information.
      </p>

      <h2>5. Children's privacy</h2>
      <p>
        The Site is intended for a general audience and is not directed to children under 13. We do not knowingly collect
        personal information from children.
      </p>

      <h2>6. Your rights</h2>
      <p>
        Depending on where you live, you may have the right to access, correct or delete personal information we hold about you,
        or to object to its processing. To make a request, contact us using the details below.
      </p>

      <h2>7. External links</h2>
      <p>
        The Site may link to other websites. We are not responsible for the privacy practices of those sites and encourage you
        to read their policies.
      </p>

      <h2>8. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. Changes take effect when posted on this page with a new "Last updated"
        date.
      </p>

      <h2>9. Contact</h2>
      <p>
        Questions about this policy can be sent to <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a> or through
        our <a href="/contact/">contact page</a>.
      </p>
    </article>
  </div>
</BaseLayout>
```

## `src/pages/terms.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Breadcrumbs from '../components/Breadcrumbs.astro';
import { SITE } from '../config/site';
---

<BaseLayout title="Terms of Use" description={`Terms and conditions for using the ${SITE.name} land area and plot size calculators.`}>
  <div class="mx-auto max-w-3xl">
    <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Terms of Use' }]} />
    <article class="prose-content rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
      <h1 class="mb-2 text-3xl font-extrabold tracking-tight text-slate-900">Terms of Use</h1>
      <p class="text-sm text-slate-500">Last updated: {SITE.lastUpdated}</p>

      <p>
        These Terms of Use ("Terms") govern your use of the {SITE.name} website and calculators (the "Site"), operated by
        {SITE.owner}, {SITE.city} ("we", "us"). By accessing or
        using the Site you agree to these Terms. If you do not agree, please do not use the Site.
      </p>

      <h2>1. Information only, not professional advice</h2>
      <p>
        The calculators, tables and articles on the Site are provided for general information. They are not a land survey, legal
        opinion, valuation or financial advice. Measurement standards differ between housing societies, development authorities
        and revenue districts. You must verify any area, dimension or conversion with the relevant society, the revenue
        department (Patwari / tehsildar), a licensed surveyor or a qualified lawyer before relying on it for any transaction.
      </p>

      <h2>2. No warranty</h2>
      <p>
        The Site is provided "as is" and "as available" without warranties of any kind, express or implied, including accuracy,
        completeness, fitness for a particular purpose and non-infringement. We do not guarantee that the Site will be
        uninterrupted or error-free.
      </p>

      <h2>3. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {SITE.name} and its operator, {SITE.owner}, shall not be liable for any direct, indirect,
        incidental, consequential or special damages, including financial loss, arising from your use of, or inability to use,
        the Site or from reliance on any result it produces.
      </p>

      <h2>4. Acceptable use</h2>
      <ul>
        <li>Do not attempt to disrupt, overload or gain unauthorised access to the Site or its infrastructure.</li>
        <li>Do not use automated means to scrape the Site in a way that degrades service for others.</li>
        <li>Do not reproduce the Site's design or content in a way that suggests it is your own or endorsed by us.</li>
      </ul>

      <h2>5. Intellectual property</h2>
      <p>
        The Site's design, text and code are owned by {SITE.owner} unless otherwise stated. You may share links to any page and
        quote short excerpts with attribution. Mathematical formulas and unit definitions are not claimed as our property.
      </p>

      <h2>6. Advertising and third-party links</h2>
      <p>
        The Site may display third-party advertisements and links. We do not endorse and are not responsible for third-party
        products, services or websites. Your dealings with advertisers are solely between you and them.
      </p>

      <h2>7. Privacy</h2>
      <p>Your use of the Site is also governed by our <a href="/privacy-policy/">Privacy Policy</a>.</p>

      <h2>8. Changes</h2>
      <p>
        We may modify these Terms at any time by posting a revised version on this page. Continued use of the Site after changes
        are posted means you accept the revised Terms.
      </p>

      <h2>9. Governing law</h2>
      <p>
        These Terms are governed by the laws of the Islamic Republic of Pakistan. Any dispute shall be subject to the exclusive
        jurisdiction of the courts at {SITE.jurisdiction}, Pakistan.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions about these Terms: <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
      </p>
    </article>
  </div>
</BaseLayout>
```

## `src/styles/global.css`

```css
@import "tailwindcss";

@theme {
  --font-sans: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;

  --color-brand-50: #ecfdf5;
  --color-brand-100: #d1fae5;
  --color-brand-200: #a7f3d0;
  --color-brand-300: #6ee7b7;
  --color-brand-500: #10b981;
  --color-brand-600: #059669;
  --color-brand-700: #047857;
  --color-brand-800: #065f46;
  --color-brand-900: #064e3b;
}

@layer base {
  html {
    color-scheme: light;
    -webkit-text-size-adjust: 100%;
    text-rendering: optimizeLegibility;
  }

  body {
    @apply bg-slate-50 text-slate-900 antialiased;
  }

  /* Visible, high-contrast keyboard focus everywhere */
  :focus-visible {
    @apply outline-3 outline-offset-2 outline-brand-600;
  }

  /* Tabular figures for every numeric surface */
  input,
  table,
  output,
  .num {
    font-variant-numeric: tabular-nums;
  }
}

@layer components {
  .prose-content h2 {
    @apply mt-10 mb-3 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl;
  }
  .prose-content h3 {
    @apply mt-6 mb-2 text-lg font-semibold text-slate-900;
  }
  .prose-content p {
    @apply mb-4 leading-7 text-slate-700;
  }
  .prose-content ul {
    @apply mb-4 list-disc space-y-1.5 pl-6 text-slate-700;
  }
  .prose-content ol {
    @apply mb-4 list-decimal space-y-1.5 pl-6 text-slate-700;
  }
  .prose-content a {
    @apply font-medium text-brand-700 underline decoration-brand-300 underline-offset-2 hover:decoration-brand-700;
  }
  .prose-content strong {
    @apply font-semibold text-slate-900;
  }

  .data-table {
    @apply w-full border-collapse text-left text-sm sm:text-base;
  }
  .data-table thead th {
    @apply border-b-2 border-slate-200 bg-slate-100 px-3 py-2.5 font-semibold whitespace-nowrap text-slate-800;
  }
  .data-table tbody th {
    @apply border-b border-slate-200 px-3 py-2.5 text-left font-semibold whitespace-nowrap text-slate-900;
  }
  .data-table td {
    @apply border-b border-slate-200 px-3 py-2.5 whitespace-nowrap text-slate-800;
  }
  .data-table tbody tr:nth-child(even) > * {
    @apply bg-slate-50;
  }
}
```

## `tests/pages.test.ts`

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { SITE } from '../src/config/site.ts';
import { CONVERSIONS, POPULAR_SLUGS, getConversion, relatedConversions } from '../src/data/conversions.ts';
import { GUIDES } from '../src/data/guides.ts';

/** Slugs explicitly required by the content brief. */
const REQUIRED_SLUGS = [
  '2-marla-to-sq-ft', '3-marla-to-sq-ft', '3-5-marla-to-sq-ft', '4-marla-to-sq-ft', '5-marla-to-sq-ft',
  '6-marla-to-sq-ft', '7-marla-to-sq-ft', '8-marla-to-sq-ft', '10-marla-to-sq-ft', '12-marla-to-sq-ft',
  '15-marla-to-sq-ft',
  '3-marla-to-sq-yards', '5-marla-to-sq-yards', '7-marla-to-sq-yards', '10-marla-to-sq-yards', '15-marla-to-sq-yards',
  '5-marla-to-sq-meters', '10-marla-to-sq-meters',
  '1-kanal-to-sq-ft', '1-kanal-to-marla', '1-kanal-to-sq-yards', '1-kanal-to-sq-meters', '2-kanal-to-sq-ft',
  '2-kanal-to-marla', '4-kanal-to-acre', '8-kanal-to-acre',
  '1-acre-to-kanal', '1-acre-to-marla', '1-acre-to-sq-ft', '1000-sq-ft-to-marla', '1125-sq-ft-to-marla',
  '2250-sq-ft-to-marla', '4500-sq-ft-to-marla', '5445-sq-ft-to-marla',
  '1-marla-to-sarsai', '1-marla-to-sq-ft', '100-sq-yards-to-marla', '120-sq-yards-to-marla', '250-sq-yards-to-marla',
  '500-sq-yards-to-kanal',
];

const REQUIRED_GUIDES = [
  'marla-size-pakistan-225-vs-272-25',
  'dha-bahria-town-lda-plot-dimensions',
  'karachi-sq-yards-gaz-vs-punjab-marla',
  'fard-intiqal-land-units-kanal-marla-sarsai',
  'covered-area-vs-plot-area-construction',
  'how-to-measure-irregular-plot-area',
];

/** Home, plot calculator, /convert/, /guides/, about, privacy, terms, contact */
const STATIC_PAGES = 8;

test('every required conversion slug is generated', () => {
  for (const s of REQUIRED_SLUGS) assert.ok(getConversion(s), `missing ${s}`);
});

test('every required guide exists', () => {
  for (const s of REQUIRED_GUIDES) assert.ok(GUIDES.some((g) => g.slug === s), `missing guide ${s}`);
});

test('site has 70+ indexable pages', () => {
  const total = CONVERSIONS.length + GUIDES.length + STATIC_PAGES;
  assert.ok(total >= 70, `only ${total} pages`);
});

test('slugs, titles, descriptions and context paragraphs are unique', () => {
  for (const key of ['slug', 'title', 'description', 'context', 'h1'] as const) {
    const values = CONVERSIONS.map((c) => c[key]);
    assert.equal(new Set(values).size, values.length, `duplicate ${key}`);
  }
  assert.equal(new Set(GUIDES.map((g) => g.title)).size, GUIDES.length);
});

test('meta descriptions stay within 165 characters', () => {
  for (const c of CONVERSIONS) assert.ok(c.description.length <= 165, `${c.slug}: ${c.description.length}`);
  for (const g of GUIDES) assert.ok(g.description.length <= 165, `${g.slug}: ${g.description.length}`);
});

test('related links resolve, exclude self and include adjacent sizes', () => {
  for (const c of CONVERSIONS) {
    const rel = relatedConversions(c);
    assert.ok(rel.length >= 4, `${c.slug} has only ${rel.length} links`);
    assert.ok(!rel.includes(c), `${c.slug} links to itself`);
  }
  const five = relatedConversions(getConversion('5-marla-to-sq-ft')!).map((x) => x.slug);
  for (const s of ['4-marla-to-sq-ft', '6-marla-to-sq-ft', '5-marla-to-sq-yards', '7-marla-to-sq-ft']) {
    assert.ok(five.includes(s), `5 Marla page should link to ${s}`);
  }
});

test('every conversion page is reachable from another conversion page', () => {
  const linked = new Set(CONVERSIONS.flatMap((c) => relatedConversions(c).map((r) => r.slug)));
  for (const c of CONVERSIONS) assert.ok(linked.has(c.slug), `${c.slug} has no inbound related link`);
});

test('guide and popular references point at real conversions', () => {
  for (const s of POPULAR_SLUGS) assert.ok(getConversion(s), s);
  for (const g of GUIDES) for (const s of g.relatedConversions) assert.ok(getConversion(s), `${g.slug} -> ${s}`);
});

test('llms.txt lists every conversion and guide URL', () => {
  const txt = readFileSync(new URL('../public/llms.txt', import.meta.url), 'utf8');
  for (const c of CONVERSIONS) assert.ok(txt.includes(`${SITE.url}/convert/${c.slug}/`), `llms.txt missing ${c.slug}`);
  for (const g of GUIDES) assert.ok(txt.includes(`${SITE.url}/guides/${g.slug}/`), `llms.txt missing ${g.slug}`);
  assert.ok(txt.includes(`${SITE.url}/guides/`));
});
```

## `tests/units.test.ts`

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  convert,
  toSqFt,
  fromSqFt,
  breakdownKms,
  calculatePlot,
  closestPlotCategory,
  parseInput,
  formatNumber,
  toInputValue,
} from '../src/lib/units.ts';

test('Marla to square feet across standards', () => {
  assert.equal(toSqFt(5, 'marla', '225'), 1125);
  assert.equal(toSqFt(5, 'marla', '250'), 1250);
  assert.equal(toSqFt(5, 'marla', '272.25'), 1361.25);
  assert.equal(toSqFt(10, 'marla', '272.25'), 2722.5);
});

test('Kanal, Sarsai and Acre relationships', () => {
  assert.equal(convert(1, 'kanal', 'marla', '225'), 20);
  assert.equal(convert(1, 'kanal', 'marla', '272.25'), 20);
  assert.equal(toSqFt(1, 'kanal', '272.25'), 5445);
  assert.equal(convert(1, 'acre', 'kanal', '272.25'), 8);
  assert.equal(convert(1, 'acre', 'marla', '272.25'), 160);
  assert.equal(convert(1, 'acre', 'kanal', '225'), 9.68);
  assert.equal(convert(1, 'acre', 'kanal', '250'), 8.712);
  assert.equal(toSqFt(1, 'sarsai', '272.25'), 30.25);
  assert.equal(convert(1, 'marla', 'sarsai', '225'), 9);
});

test('Square yards and square meters', () => {
  assert.equal(convert(5, 'marla', 'sqyd', '225'), 125);
  assert.equal(convert(5, 'marla', 'sqyd', '272.25'), 151.25);
  assert.equal(fromSqFt(1000, 'sqm', '225'), 92.90304);
  assert.equal(toSqFt(92.90304, 'sqm', '225'), 1000);
  assert.equal(convert(1, 'acre', 'sqyd', '225'), 4840);
});

test('Round trips are stable', () => {
  for (const std of ['225', '250', '272.25'] as const) {
    for (const v of [0.5, 1, 3, 7.25, 123.456]) {
      const back = convert(convert(v, 'marla', 'sqm', std), 'sqm', 'marla', std);
      assert.ok(Math.abs(back - v) < 1e-9, `${std} ${v} -> ${back}`);
    }
  }
});

test('Kanal-Marla-Sarsai breakdown', () => {
  assert.deepEqual(breakdownKms(5445, '272.25'), { kanal: 1, marla: 0, sarsai: 0, sqft: 0 });
  assert.deepEqual(breakdownKms(2275, '225'), { kanal: 0, marla: 10, sarsai: 1, sqft: 0 });
  assert.deepEqual(breakdownKms(4510, '225'), { kanal: 1, marla: 0, sarsai: 0, sqft: 10 });
});

test('Plot calculator examples from the brief', () => {
  const a = calculatePlot(25, 45, '225');
  assert.ok(a);
  assert.equal(a.sqft, 1125);
  assert.equal(a.marla, 5);
  assert.equal(a.closest?.category.label, '5 Marla');
  assert.equal(a.closest?.isMatch, true);

  const b = calculatePlot(35, 65, '225');
  assert.equal(b?.closest?.category.label, '10 Marla');

  const c = calculatePlot(50, 90, '225');
  assert.equal(c?.closest?.category.label, '1 Kanal');
  assert.equal(c?.sqyd, 500);

  assert.equal(calculatePlot(0, 45, '225'), null);
  assert.equal(closestPlotCategory(0, '225'), null);
});

test('Input parsing and formatting', () => {
  assert.equal(parseInput('1,125'), 1125);
  assert.equal(parseInput(' 5.5 '), 5.5);
  assert.equal(parseInput('.5'), 0.5);
  assert.equal(parseInput(''), null);
  assert.equal(parseInput('abc'), null);
  assert.equal(parseInput('-3'), null);
  assert.equal(parseInput('1.2.3'), null);
  assert.equal(formatNumber(1361.25), '1,361.25');
  assert.equal(formatNumber(0.0258264463), '0.025826');
  assert.equal(toInputValue(2722.5), '2722.5');
  assert.equal(toInputValue(104.5159), '104.52');
});
```
