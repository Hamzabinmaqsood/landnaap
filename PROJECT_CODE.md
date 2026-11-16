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
npm test           # conversion engine unit tests
npm run build      # astro check + static build into ./dist
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
src/components/AdSlot.astro
src/components/Breadcrumbs.astro
src/components/BreakdownTable.astro
src/components/Faq.astro
src/components/Footer.astro
src/components/FormulaList.astro
src/components/Header.astro
src/components/LandConverter.astro
src/components/PlotCalculator.astro
src/components/ReferenceTable.astro
src/components/SidebarLinks.astro
src/components/StandardSelector.astro
src/config/site.ts
src/data/conversions.ts
src/data/faqs.ts
src/layouts/BaseLayout.astro
src/lib/schema.ts
src/lib/units.ts
src/pages/404.astro
src/pages/about.astro
src/pages/contact.astro
src/pages/convert/[slug].astro
src/pages/convert/index.astro
src/pages/index.astro
src/pages/plot-size-calculator.astro
src/pages/privacy-policy.astro
src/pages/terms.astro
src/styles/global.css
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
- **Programmatic SEO**: 8 pre-rendered `/convert/[slug]/` pages, each with a unique title, description and canonical URL, a static reference table, an FAQ, and `SoftwareApplication` + `FAQPage` + `BreadcrumbList` JSON-LD.
- **AI search (GEO)**: `public/llms.txt`, AI-crawler-friendly `robots.txt`, formulas in JSON-LD and visible HTML.
- **AdSense-ready**: fixed-height `min-h-[90px]` banner and `min-h-[250px]` rectangle slots (zero CLS), plus About, Privacy Policy, Terms and Contact pages.

## Quick start

```bash
# Requires Node.js 22.23.4+ (see .nvmrc)
npm install
npm run dev        # http://localhost:4321
npm test           # unit tests for the conversion engine
npm run build      # astro check + static build to ./dist
npm run preview    # serve ./dist locally
```

## Before you deploy

Replace the placeholder domain `https://www.example.com` in these three files:

1. `astro.config.mjs` (`SITE_URL`): used for canonical URLs, Open Graph, JSON-LD and the sitemap
2. `public/robots.txt` (the `Sitemap:` line)
3. `public/llms.txt` (all links)

Then set your contact email, owner name and city in `src/config/site.ts`.

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

1. Paste the AdSense loader `<script>` where the `GOOGLE ADSENSE (site-wide loader)` comment sits in `src/layouts/BaseLayout.astro`.
2. Paste each `<ins class="adsbygoogle">` unit inside its slot in `src/components/AdSlot.astro` (or per placement name). Every slot's HTML comment shows the exact snippet.
3. Uncomment and fill the line in `public/ads.txt` with your publisher ID.
4. EEA/UK traffic: enable a Google-certified CMP (for example AdSense's built-in "Privacy & messaging") before serving personalised ads.

## Adding a conversion page

Add an entry to `CONVERSIONS` in `src/data/conversions.ts`. The route, quick answer, pre-filled calculator, reference table, FAQ, JSON-LD, sitemap entry and internal links are all generated from it. Add the URL to `public/llms.txt` as well.

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
│   ├── components/           # calculators, tables, ad slots, layout parts
│   ├── config/site.ts        # brand, contact, nav
│   ├── data/                 # conversion pages + FAQ content
│   ├── layouts/BaseLayout.astro
│   ├── lib/units.ts          # conversion engine (shared by build + browser)
│   ├── lib/schema.ts         # JSON-LD builders
│   ├── pages/                # routes (incl. convert/[slug].astro)
│   └── styles/global.css
└── tests/units.test.ts
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

// IMPORTANT: set this to your production domain before deploying.
// It is used for canonical URLs, Open Graph tags, JSON-LD and the sitemap.
// Also update the same domain in public/robots.txt and public/llms.txt.
const SITE_URL = 'https://www.example.com';

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
    "test": "node --experimental-strip-types --test tests/units.test.ts",
    "astro": "astro"
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
# ads.txt — authorised digital sellers
# After Google AdSense approval, replace the line below with the exact line shown in
# your AdSense account (Sites > ads.txt), then remove the leading "#".
# google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

## `public/favicon.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#047857"/><path d="M7 23V9h8v6h10v8z" fill="none" stroke="#fff" stroke-width="2.2" stroke-linejoin="round"/><path d="M15 15v8" stroke="#a7f3d0" stroke-width="2.2"/></svg>
```

## `public/llms.txt`

```text
# LandNaap: Marla, Kanal & Plot Size Calculator (Pakistan)

> Free, client-side land area calculators for Pakistan and South Asia. Converts Marla, Kanal, square feet, square yards (gaz), square meters, acres and Sarsai using three Marla standards (225, 250 and 272.25 sq ft), and calculates plot area and standard plot size from frontage × depth.

All calculations run in the browser. Every tool page also contains static HTML reference tables and FAQPage / SoftwareApplication JSON-LD with the same formulas.

Base URL: https://www.example.com

## Marla standards

| Standard | 1 Marla | 1 Kanal (20 Marla) | 1 Sarsai (1/9 Marla) | Used by |
|---|---|---|---|---|
| Housing Society | 225 sq ft (25 sq yd) | 4,500 sq ft | 25 sq ft | DHA, Bahria Town, LDA, most housing societies |
| Revenue / Patwari | 272.25 sq ft (30.25 sq yd) | 5,445 sq ft | 30.25 sq ft (1 square karam, 5.5 ft × 5.5 ft) | Revenue records (fard, jamabandi, registry, intiqal), agricultural land |
| Custom Developer | 250 sq ft (27.78 sq yd) | 5,000 sq ft | 27.78 sq ft | Some private developer schemes |

The word "Marla" is ambiguous: always state which standard is used. On the revenue standard, 1 Acre = 8 Kanal = 160 Marla.

## Exact formulas

- Square Feet = Marla × S, where S = 225, 250 or 272.25
- Marla = Square Feet ÷ S
- Kanal = Marla ÷ 20 (identical in every standard)
- Sarsai = Marla × 9
- Square Yards (Gaz) = Square Feet ÷ 9
- Square Meters = Square Feet × 0.09290304
- Acres = Square Feet ÷ 43,560
- Plot Area (sq ft) = Frontage (ft) × Depth (ft); Marla = Plot Area ÷ S
- Closest standard plot = nearest of 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16 Marla or 1, 1.5, 2, 3, 4, 8 Kanal; within ±2.5% counts as a match

## Key values

| Area | 225 sq ft Marla | 250 sq ft Marla | 272.25 sq ft Marla |
|---|---|---|---|
| 3 Marla | 675 sq ft | 750 sq ft | 816.75 sq ft |
| 5 Marla | 1,125 sq ft (125 sq yd) | 1,250 sq ft (138.89 sq yd) | 1,361.25 sq ft (151.25 sq yd) |
| 7 Marla | 1,575 sq ft | 1,750 sq ft | 1,905.75 sq ft |
| 10 Marla | 2,250 sq ft | 2,500 sq ft | 2,722.5 sq ft |
| 1 Kanal | 4,500 sq ft (20 Marla) | 5,000 sq ft (20 Marla) | 5,445 sq ft (20 Marla) |
| 1 Acre (43,560 sq ft) | 9.68 Kanal / 193.6 Marla | 8.712 Kanal / 174.24 Marla | 8 Kanal / 160 Marla |

Common society plot dimensions (225 sq ft Marla): 25 × 45 ft = 5 Marla; 30 × 60 ft = 8 Marla; 35 × 65 ft = 2,275 sq ft ≈ 10.11 Marla (sold as 10 Marla); 50 × 90 ft = 1 Kanal.

## Tools

- [Land Area Converter](https://www.example.com/): live bidirectional conversion between Marla, Kanal, sq ft, sq yd, sq m, acres and Sarsai, with a side-by-side comparison of all three Marla standards. Shareable URLs: `/?v=5&u=marla&s=225` (u = marla | kanal | sqft | sqyd | sqm | acre | sarsai; s = 225 | 250 | 272.25).
- [Plot Size Calculator](https://www.example.com/plot-size-calculator/): frontage × depth in feet → sq ft, sq yd, sq m, exact Marla, Kanal, Kanal–Marla–Sarsai breakdown and closest standard plot category.

## Conversion pages

- [3 Marla to Sq Ft](https://www.example.com/convert/3-marla-to-sq-ft/)
- [5 Marla to Sq Ft](https://www.example.com/convert/5-marla-to-sq-ft/)
- [7 Marla to Sq Ft](https://www.example.com/convert/7-marla-to-sq-ft/)
- [10 Marla to Sq Ft](https://www.example.com/convert/10-marla-to-sq-ft/)
- [1 Kanal to Sq Ft](https://www.example.com/convert/1-kanal-to-sq-ft/)
- [1 Kanal to Marla](https://www.example.com/convert/1-kanal-to-marla/)
- [5 Marla to Square Yards](https://www.example.com/convert/5-marla-to-sq-yards/)
- [1 Acre to Kanal](https://www.example.com/convert/1-acre-to-kanal/)
- [All conversions](https://www.example.com/convert/)

## Optional

- [About](https://www.example.com/about/)
- [Privacy Policy](https://www.example.com/privacy-policy/)
- [Terms of Use](https://www.example.com/terms/)
- [Contact](https://www.example.com/contact/)
- [Sitemap](https://www.example.com/sitemap-index.xml)
```

## `public/robots.txt`

```text
# robots.txt for LandNaap
# Replace https://www.example.com with your production domain.

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

Sitemap: https://www.example.com/sitemap-index.xml
```

## `src/components/AdSlot.astro`

```astro
---
/**
 * Fixed-height AdSense placeholder.
 *
 * The container reserves its final height *before* any ad loads, so inserting an
 * <ins class="adsbygoogle"> unit later causes zero Cumulative Layout Shift (CLS).
 *
 * variant="banner"    -> min-h-[90px]   (leaderboard / responsive horizontal)
 * variant="rectangle" -> min-h-[250px]  (300x250 sidebar or in-content)
 */
interface Props {
  variant: 'banner' | 'rectangle';
  /** Identifier for this placement, e.g. "header-banner" or "sidebar-1" */
  name: string;
  class?: string;
}

const { variant, name, class: className = '' } = Astro.props;

const sizeClass = variant === 'banner' ? 'min-h-[90px]' : 'min-h-[250px]';
const label = variant === 'banner' ? 'Header banner (responsive, 90px reserved)' : 'Rectangle 300x250 (250px reserved)';

const openComment = `<!-- ===== GOOGLE ADSENSE SLOT: ${name} | ${label} =====
  To activate, paste your ad unit INSIDE the div below, for example:
  <ins class="adsbygoogle" style="display:block;min-height:${variant === 'banner' ? '90' : '250'}px"
       data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" data-ad-slot="YYYYYYYYYY"
       data-ad-format="${variant === 'banner' ? 'horizontal' : 'rectangle'}" data-full-width-responsive="true"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
  Keep the min-height class on the wrapper so the layout never shifts. -->`;
const closeComment = `<!-- ===== END ADSENSE SLOT: ${name} ===== -->`;
---

<Fragment set:html={openComment} />
<div
  class:list={[
    'ad-slot relative flex w-full items-center justify-center overflow-hidden rounded-lg border border-dashed border-slate-300 bg-slate-100/70',
    sizeClass,
    className,
  ]}
  data-ad-placement={name}
  data-ad-variant={variant}
>
  <span class="pointer-events-none text-[11px] font-medium tracking-widest text-slate-400 uppercase select-none">Advertisement</span>
</div>
<Fragment set:html={closeComment} />
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
import { STANDARDS, UNITS, UNIT_ORDER, compareStandards, formatNumber, type UnitId } from '../lib/units';

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
      {formatNumber(value)} {UNITS[unit].label} in every unit and Marla standard
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
import { CONVERSIONS } from '../data/conversions';

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
          CONVERSIONS.map((c) => (
            <li>
              <a href={`/convert/${c.slug}/`} class="text-slate-600 hover:text-brand-700 hover:underline">
                {c.linkLabel}
              </a>
            </li>
          ))
        }
      </ul>
    </nav>
    <nav aria-label="Site information">
      <p class="text-sm font-bold text-slate-900">Tools & info</p>
      <ul class="mt-3 space-y-1.5 text-sm">
        <li><a href="/" class="text-slate-600 hover:text-brand-700 hover:underline">Land Area Converter</a></li>
        <li><a href="/plot-size-calculator/" class="text-slate-600 hover:text-brand-700 hover:underline">Plot Size Calculator</a></li>
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
    <p class="mx-auto max-w-6xl px-4 py-4 text-xs text-slate-500">© {year} {SITE.name}. All rights reserved.</p>
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
      {hasValue ? `${formatNumber(initialValue as number)} ${UNITS[initialUnit].short} at ${std.label}/Marla =` : 'Enter an area to convert'}
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
      {hasValue ? `Input: ${formatNumber(initialValue as number)} ${UNITS[initialUnit].label}` : 'Enter an area above to compare.'}
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
    type StandardId,
    type UnitId,
  } from '../lib/units';

  async function copyText(text: string): Promise<boolean> {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      /* fall through to legacy path */
    }
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-1000px';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch {
      ok = false;
    }
    document.body.removeChild(ta);
    return ok;
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
        headlineSource.textContent = `${formatNumber(value)} ${UNITS[unit].short} at ${std.label}/Marla =`;
      }
      if (headlineResult) headlineResult.textContent = summaryTargets(values, unit);
      if (compareSource) compareSource.textContent = `Input: ${formatNumber(value)} ${UNITS[unit].label}`;

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
      lines.push(`Land area conversion: ${formatNumber(value)} ${UNITS[unit].label}`);
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
 * If the result is identical in every standard (e.g. Kanal -> Marla), it shows one
 * result column plus the square-foot size in each standard instead.
 */
import { STANDARDS, UNITS, convert, formatNumber, toSqFt, type UnitId } from '../lib/units';

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
                  sq ft <span class="num block text-xs font-medium text-slate-600">@ {s.label}</span>
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
              {formatNumber(v)} {UNITS[from].short}
            </th>
            {sameAcross ? (
              <>
                <td class:list={['text-right', v === highlight && 'bg-brand-50']}>{formatNumber(convert(v, from, to, '225'))}</td>
                {STANDARDS.map((s) => (
                  <td class:list={['text-right', v === highlight && 'bg-brand-50']}>{formatNumber(toSqFt(v, from, s.id))}</td>
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
import { CONVERSIONS } from '../data/conversions';

interface Props {
  exclude?: string;
}
const { exclude } = Astro.props;
const links = CONVERSIONS.filter((c) => c.slug !== exclude);
---

<nav aria-label="Popular conversions" class="rounded-xl border border-slate-200 bg-white p-4">
  <p class="mb-2 text-sm font-bold text-slate-900">Popular conversions</p>
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
  <div class="mt-3 border-t border-slate-100 pt-3">
    <a
      href="/plot-size-calculator/"
      class="flex min-h-10 items-center rounded-lg px-2 text-[15px] font-semibold text-brand-700 hover:bg-brand-50"
    >
      Plot size calculator →
    </a>
  </div>
</nav>
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
        <label class="relative flex min-h-[4.25rem] cursor-pointer flex-col justify-center rounded-xl border-2 border-slate-200 bg-white px-2 py-2 text-center transition-colors hover:border-brand-300 has-checked:border-brand-700 has-checked:bg-brand-50 has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand-600 sm:px-3">
          <input
            type="radio"
            class="sr-only"
            name={name}
            value={s.id}
            data-standard={s.id}
            checked={s.id === selected}
          />
          <span class="num text-[15px] font-bold text-slate-900 sm:text-base">{s.label}</span>
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
  locale: 'en_PK',
  lang: 'en-PK',
  themeColor: '#047857',
  contactEmail: 'contact@example.com',
  /** Organisation / owner shown on legal pages. Replace with your own details. */
  owner: 'LandNaap',
  city: 'Lahore, Punjab, Pakistan',
  lastUpdated: 'November 14, 2026',
} as const;

export const NAV_LINKS = [
  { href: '/', label: 'Area Converter' },
  { href: '/plot-size-calculator/', label: 'Plot Calculator' },
  { href: '/convert/', label: 'Conversions' },
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
import {
  STANDARDS,
  UNITS,
  convert,
  formatNumber,
  type StandardId,
  type UnitId,
} from '../lib/units';
import type { FaqItem } from './faqs';

export interface ConversionPage {
  slug: string;
  value: number;
  from: UnitId;
  to: UnitId;
  defaultStandard: StandardId;
  /** <title> (keep under ~60 characters) */
  title: string;
  /** <meta name="description"> (keep under ~160 characters) */
  description: string;
  h1: string;
  /** Short label used in link lists */
  linkLabel: string;
  intro: string;
  /** Page-specific explanatory paragraphs */
  notes: string[];
  /** Values (in the `from` unit) for the static reference table */
  tableValues: number[];
}

const MARLA_RANGE = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 15, 16, 20];
const KANAL_RANGE = [0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 8, 10, 16, 20];
const ACRE_RANGE = [0.25, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 10, 12.5, 25];

export const CONVERSIONS: ConversionPage[] = [
  {
    slug: '3-marla-to-sq-ft',
    value: 3,
    from: 'marla',
    to: 'sqft',
    defaultStandard: '225',
    title: '3 Marla to Sq Ft: 675, 750 or 816.75 Square Feet',
    description:
      '3 Marla = 675 sq ft (society, 225), 750 sq ft (250) or 816.75 sq ft (revenue, 272.25). Instant 3 Marla converter with square yards, meters and Kanal.',
    h1: '3 Marla to Square Feet',
    linkLabel: '3 Marla to sq ft',
    intro:
      'A 3 Marla plot is the smallest common residential size in Pakistani housing schemes and is popular for compact double-storey houses. Its area in square feet depends on which Marla standard the scheme uses.',
    notes: [
      'In most housing societies a 3 Marla plot measures 675 sq ft, which is 75 square yards. Developers using a 250 sq ft Marla sell the same "3 Marla" as 750 sq ft.',
      'If the land is recorded by the Patwari on the revenue standard, 3 Marla equals 816.75 sq ft (90.75 square yards), about 21% larger than a society 3 Marla plot.',
    ],
    tableValues: MARLA_RANGE,
  },
  {
    slug: '5-marla-to-sq-ft',
    value: 5,
    from: 'marla',
    to: 'sqft',
    defaultStandard: '225',
    title: '5 Marla to Sq Ft: 1,125, 1,250 or 1,361.25 Square Feet',
    description:
      '5 Marla = 1,125 sq ft in DHA/Bahria (225), 1,250 sq ft (250) or 1,361.25 sq ft on revenue land (272.25). Live 5 Marla to sq ft converter with tables.',
    h1: '5 Marla to Square Feet',
    linkLabel: '5 Marla to sq ft',
    intro:
      'Five Marla is the most traded plot size in Pakistan. In DHA, Bahria Town and LDA schemes it is usually laid out as 25 ft × 45 ft, but the exact square footage depends on the Marla standard.',
    notes: [
      'On the 225 sq ft society standard, 5 Marla = 1,125 sq ft = 125 square yards. That is exactly a 25 × 45 ft plot.',
      'On the 272.25 sq ft revenue standard, 5 Marla = 1,361.25 sq ft, for example 27.5 ft × 49.5 ft. Comparing a society 5 Marla with a revenue 5 Marla without converting first can hide a 236.25 sq ft difference.',
    ],
    tableValues: MARLA_RANGE,
  },
  {
    slug: '7-marla-to-sq-ft',
    value: 7,
    from: 'marla',
    to: 'sqft',
    defaultStandard: '225',
    title: '7 Marla to Sq Ft: 1,575, 1,750 or 1,905.75 Square Feet',
    description:
      '7 Marla = 1,575 sq ft (225 standard), 1,750 sq ft (250) or 1,905.75 sq ft (272.25 revenue). Convert 7 Marla to sq ft, square yards, Kanal and acres instantly.',
    h1: '7 Marla to Square Feet',
    linkLabel: '7 Marla to sq ft',
    intro:
      'A 7 Marla plot sits between the popular 5 and 10 Marla sizes and is common in newer blocks of housing societies, often laid out around 30 ft frontage.',
    notes: [
      'At 225 sq ft per Marla, 7 Marla = 1,575 sq ft (175 square yards), for example 30 ft × 52.5 ft.',
      'At 272.25 sq ft per Marla, 7 Marla = 1,905.75 sq ft. At 250 sq ft per Marla it is 1,750 sq ft.',
    ],
    tableValues: MARLA_RANGE,
  },
  {
    slug: '10-marla-to-sq-ft',
    value: 10,
    from: 'marla',
    to: 'sqft',
    defaultStandard: '225',
    title: '10 Marla to Sq Ft: 2,250, 2,500 or 2,722.5 Square Feet',
    description:
      '10 Marla = 2,250 sq ft (225, societies), 2,500 sq ft (250) or 2,722.5 sq ft (272.25 revenue). See why 35×65 plots are sold as 10 Marla. Instant converter.',
    h1: '10 Marla to Square Feet',
    linkLabel: '10 Marla to sq ft',
    intro:
      'Ten Marla is half a Kanal and a standard family-house size. In housing societies it is commonly marketed as a 35 ft × 65 ft plot.',
    notes: [
      'At 225 sq ft per Marla, 10 Marla = 2,250 sq ft (250 square yards). A 35 × 65 ft plot is 2,275 sq ft, about 10.11 Marla, which is why it is sold as 10 Marla.',
      'At 272.25 sq ft per Marla, 10 Marla = 2,722.5 sq ft (302.5 square yards), for example 45 ft × 60.5 ft.',
    ],
    tableValues: MARLA_RANGE,
  },
  {
    slug: '1-kanal-to-sq-ft',
    value: 1,
    from: 'kanal',
    to: 'sqft',
    defaultStandard: '225',
    title: '1 Kanal to Sq Ft: 4,500, 5,000 or 5,445 Square Feet',
    description:
      '1 Kanal = 4,500 sq ft (225 standard, DHA/Bahria), 5,000 sq ft (250) or 5,445 sq ft (272.25 revenue). Convert Kanal to square feet, yards and meters.',
    h1: '1 Kanal to Square Feet',
    linkLabel: '1 Kanal to sq ft',
    intro:
      'One Kanal is 20 Marla. Because the size of a Marla differs between housing societies and revenue records, the square footage of a Kanal differs too.',
    notes: [
      'A society 1 Kanal plot is 4,500 sq ft (500 square yards), typically 50 ft × 90 ft.',
      'A revenue Kanal is 5,445 sq ft (605 square yards), which is 1/8 of an acre. On the 250 sq ft developer standard, 1 Kanal is 5,000 sq ft.',
    ],
    tableValues: KANAL_RANGE,
  },
  {
    slug: '1-kanal-to-marla',
    value: 1,
    from: 'kanal',
    to: 'marla',
    defaultStandard: '225',
    title: '1 Kanal to Marla: 1 Kanal = 20 Marla (All Standards)',
    description:
      '1 Kanal = 20 Marla in every standard. See what that means in sq ft: 4,500 (225), 5,000 (250) or 5,445 (272.25). Kanal to Marla converter and table.',
    h1: '1 Kanal to Marla',
    linkLabel: '1 Kanal to Marla',
    intro:
      'The Kanal-to-Marla ratio never changes: 1 Kanal is always 20 Marla, and half a Kanal is 10 Marla. Only the size of each Marla changes between standards.',
    notes: [
      'So 2 Kanal = 40 Marla and 4 Kanal = 80 Marla, whatever standard is used. When converting Kanal to Marla, you do not need to choose a standard.',
      'You do need the standard when converting to square feet: 20 Marla is 4,500 sq ft in a housing society, 5,000 sq ft on a 250 sq ft scheme and 5,445 sq ft on revenue land.',
    ],
    tableValues: KANAL_RANGE,
  },
  {
    slug: '5-marla-to-sq-yards',
    value: 5,
    from: 'marla',
    to: 'sqyd',
    defaultStandard: '225',
    title: '5 Marla to Square Yards (Gaz): 125, 138.89 or 151.25',
    description:
      '5 Marla = 125 sq yd (225 standard), 138.89 sq yd (250) or 151.25 sq yd (272.25 revenue). Convert Marla to gaz for Karachi-style plot comparisons.',
    h1: '5 Marla to Square Yards (Gaz)',
    linkLabel: '5 Marla to sq yards',
    intro:
      'Square yards (gaz) are used for plots in Karachi and across Sindh, while Punjab and KP use Marla. Converting 5 Marla to square yards lets you compare plots between the two systems.',
    notes: [
      'One square yard is 9 sq ft, so square yards = Marla × Marla size ÷ 9. On the society standard a Marla is exactly 25 square yards, which makes 5 Marla = 125 sq yd.',
      'On the revenue standard a Marla is 30.25 square yards, so 5 Marla = 151.25 sq yd. A Karachi 120 sq yd plot is therefore slightly smaller than a 5 Marla society plot.',
    ],
    tableValues: MARLA_RANGE,
  },
  {
    slug: '1-acre-to-kanal',
    value: 1,
    from: 'acre',
    to: 'kanal',
    defaultStandard: '272.25',
    title: '1 Acre to Kanal: 8 Kanal (Revenue) or 9.68 Kanal (225)',
    description:
      '1 Acre = 8 Kanal = 160 Marla on the 272.25 revenue standard, 9.68 Kanal at 225 sq ft and 8.712 Kanal at 250 sq ft. Acre to Kanal converter and table.',
    h1: '1 Acre to Kanal',
    linkLabel: '1 Acre to Kanal',
    intro:
      'An acre is a fixed 43,560 sq ft. Agricultural land in Punjab is recorded in acres, Kanal and Marla on the revenue standard, where an acre divides evenly into 8 Kanal.',
    notes: [
      'On the 272.25 sq ft revenue standard, 1 Acre = 8 Kanal = 160 Marla = 1,440 Sarsai. This is the figure used in fard and jamabandi records.',
      'If the same acre is divided into society-standard plots (225 sq ft Marla), it holds 9.68 Kanal or 193.6 Marla before roads and amenities are deducted.',
    ],
    tableValues: ACRE_RANGE,
  },
];

export function getConversion(slug: string): ConversionPage | undefined {
  return CONVERSIONS.find((c) => c.slug === slug);
}

/** Page-specific FAQs generated from exact math, so answers always match the calculator. */
export function conversionFaqs(c: ConversionPage): FaqItem[] {
  const fromLabel = UNITS[c.from].label;
  const toLabel = UNITS[c.to].label;
  const perStd = STANDARDS.map(
    (s) => `${formatNumber(convert(c.value, c.from, c.to, s.id))} ${UNITS[c.to].short} on the ${s.label} (${s.name}) standard`,
  );
  const fromShort = UNITS[c.from].short;
  return [
    {
      q: `How much is ${formatNumber(c.value)} ${fromShort} in ${toLabel}?`,
      a: `${formatNumber(c.value)} ${fromShort} equals ${perStd.join(', ')}.`,
    },
    {
      q: `What is the formula to convert ${fromLabel} to ${toLabel}?`,
      a: formulaText(c.from, c.to),
    },
  ];
}

export function formulaText(from: UnitId, to: UnitId): string {
  const pair = `${from}->${to}`;
  switch (pair) {
    case 'marla->sqft':
      return 'Square Feet = Marla × Marla size. Use 225 for housing societies, 250 for custom developer schemes or 272.25 for revenue land.';
    case 'marla->sqyd':
      return 'Square Yards = Marla × Marla size ÷ 9. One Marla is 25 sq yd at 225 sq ft, 27.78 sq yd at 250 sq ft and 30.25 sq yd at 272.25 sq ft.';
    case 'kanal->sqft':
      return 'Square Feet = Kanal × 20 × Marla size. One Kanal is 4,500 sq ft at 225, 5,000 sq ft at 250 and 5,445 sq ft at 272.25.';
    case 'kanal->marla':
      return 'Marla = Kanal × 20. This ratio is the same in every Marla standard.';
    case 'acre->kanal':
      return 'Kanal = Acres × 43,560 ÷ (20 × Marla size). On the 272.25 revenue standard this simplifies to Kanal = Acres × 8.';
    default:
      return `${UNITS[to].label} = ${UNITS[from].label} converted to square feet, then divided by the size of one ${UNITS[to].label} in square feet.`;
  }
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

## `src/layouts/BaseLayout.astro`

```astro
---
import '../styles/global.css';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import AdSlot from '../components/AdSlot.astro';
import { SITE } from '../config/site';
import { serializeJsonLd } from '../lib/schema';

interface Props {
  title: string;
  description: string;
  /** JSON-LD objects injected into <head> */
  schema?: Record<string, unknown>[];
  /** Show the right-hand sidebar with a 250px ad slot (tool pages) */
  sidebar?: boolean;
  noindex?: boolean;
  ogType?: 'website' | 'article';
}

const { title, description, schema = [], sidebar = false, noindex = false, ogType = 'website' } = Astro.props;

const site = Astro.site ?? new URL('https://www.example.com');
const canonical = new URL(Astro.url.pathname, site).href;
const ogImage = new URL('/og-image.png', site).href;
const fullTitle = title.includes(SITE.name) ? title : `${title} | ${SITE.name}`;

const adsenseHeadComment = `<!-- ===== GOOGLE ADSENSE (site-wide loader) =====
  After AdSense approval, paste the loader here, e.g.:
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
  ===== END ADSENSE LOADER ===== -->`;
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

    <Fragment set:html={adsenseHeadComment} />
    <slot name="head" />
  </head>
  <body class="flex min-h-screen flex-col">
    <a
      href="#main"
      class="sr-only z-50 rounded-md bg-brand-700 px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >Skip to content</a
    >
    <Header />

    <div class="mx-auto w-full max-w-6xl px-4 pt-4">
      <AdSlot variant="banner" name="header-banner" />
    </div>

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
import { CONVERSIONS } from '../data/conversions';
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
        CONVERSIONS.map((c) => (
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
        Found an error or want a new conversion added? Visit the <a href="/contact/">contact page</a>. We read every message.
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
        or use the form below. We usually reply within 2–3 working days.
      </p>

      <dl class="mt-6 grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl bg-slate-50 p-4">
          <dt class="text-xs font-semibold tracking-wide text-slate-600 uppercase">Email</dt>
          <dd class="mt-1 font-semibold text-slate-900">{SITE.contactEmail}</dd>
        </div>
        <div class="rounded-xl bg-slate-50 p-4">
          <dt class="text-xs font-semibold tracking-wide text-slate-600 uppercase">Based in</dt>
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
import { SITE } from '../../config/site';
import { CONVERSIONS, conversionFaqs, formulaText, type ConversionPage } from '../../data/conversions';
import { STANDARD_FAQS } from '../../data/faqs';
import { breadcrumbSchema, faqPageSchema, softwareApplicationSchema } from '../../lib/schema';
import { STANDARDS, UNITS, convert, formatNumber, getStandard } from '../../lib/units';

export const getStaticPaths = (() => {
  return CONVERSIONS.map((c) => ({ params: { slug: c.slug }, props: { conversion: c } }));
}) satisfies GetStaticPaths;

interface Props {
  conversion: ConversionPage;
}

const { conversion: c } = Astro.props;
const site = Astro.site ?? new URL('https://www.example.com');
const url = new URL(`/convert/${c.slug}/`, site).href;

const fromU = UNITS[c.from];
const toU = UNITS[c.to];
const defaultStd = getStandard(c.defaultStandard);
const primary = convert(c.value, c.from, c.to, c.defaultStandard);
const answers = STANDARDS.map((s) => ({ std: s, result: convert(c.value, c.from, c.to, s.id) }));
const allSame = answers.every((a) => a.result === answers[0].result);

const faqs = [...conversionFaqs(c), ...STANDARD_FAQS];
const related = CONVERSIONS.filter((x) => x.slug !== c.slug);

const schema = [
  softwareApplicationSchema({
    name: `${c.h1} Converter`,
    url,
    description: c.description,
    extraFeatures: [
      `${formatNumber(c.value)} ${fromU.short} = ${answers
        .map((a) => `${formatNumber(a.result)} ${toU.short} (${a.std.label} standard)`)
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
  <p class="mt-3 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">{c.intro}</p>

  <!-- Quick answer (static, crawlable) -->
  <section class="mt-6 rounded-2xl border-2 border-brand-700 bg-brand-50 p-4 sm:p-5" aria-labelledby="answer-heading">
    <h2 id="answer-heading" class="text-sm font-bold tracking-wide text-brand-800 uppercase">Quick answer</h2>
    <p class="num mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl">
      {formatNumber(c.value)}
      {fromU.short} = {formatNumber(primary)}
      {toU.short}
    </p>
    <p class="mt-1 text-sm text-slate-700">
      {allSame ? 'Same in every Marla standard.' : `On the ${defaultStd.label} (${defaultStd.name}) standard.`}
    </p>
    {
      !allSame && (
        <ul class="mt-4 grid gap-2 sm:grid-cols-3">
          {answers.map((a) => (
            <li class="rounded-xl border border-brand-200 bg-white px-3 py-2.5">
              <span class="num block text-lg font-bold text-slate-900">
                {formatNumber(a.result)} {toU.short}
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

  <div class="mt-8">
    <AdSlot variant="rectangle" name="in-content-1" />
  </div>

  <section class="prose-content mt-4" aria-labelledby="how-heading">
    <h2 id="how-heading">How to convert {fromU.label} to {toU.label}</h2>
    <p><strong>Formula:</strong> {formulaText(c.from, c.to)}</p>
    {c.notes.map((n) => <p>{n}</p>)}
  </section>

  <section class="mt-8" aria-labelledby="table-heading">
    <h2 id="table-heading" class="mb-4 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
      {fromU.label} to {toU.label} reference table
    </h2>
    <ReferenceTable from={c.from} to={c.to} values={c.tableValues} highlight={c.value} />
  </section>

  <section class="mt-10" aria-labelledby="breakdown-heading">
    <h2 id="breakdown-heading" class="mb-4 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
      {formatNumber(c.value)}
      {fromU.label} in all units
    </h2>
    <BreakdownTable value={c.value} unit={c.from} />
  </section>

  <Faq items={faqs} heading={`${c.h1}: FAQ`} />

  <section class="mt-12" aria-labelledby="related-heading">
    <h2 id="related-heading" class="mb-4 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Related conversions</h2>
    <ul class="grid gap-3 sm:grid-cols-2">
      {
        related.map((r) => (
          <li>
            <a
              href={`/convert/${r.slug}/`}
              class="flex min-h-12 items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-semibold text-slate-900 hover:border-brand-600 hover:bg-brand-50"
            >
              {r.h1}
              <span aria-hidden="true" class="text-brand-700">
                →
              </span>
            </a>
          </li>
        ))
      }
    </ul>
    <p class="mt-4 text-sm text-slate-600">
      Have plot dimensions instead? Try the <a href="/plot-size-calculator/" class="font-semibold text-brand-700 underline">plot size calculator</a>.
      Results by {SITE.name} are for guidance; confirm with official records.
    </p>
  </section>

  <SidebarLinks slot="sidebar" exclude={c.slug} />
</BaseLayout>
```

## `src/pages/convert/index.astro`

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Breadcrumbs from '../../components/Breadcrumbs.astro';
import SidebarLinks from '../../components/SidebarLinks.astro';
import { CONVERSIONS } from '../../data/conversions';
import { STANDARDS, UNITS, convert, formatNumber } from '../../lib/units';
import { breadcrumbSchema } from '../../lib/schema';

const title = 'Land Area Conversions: Marla, Kanal, Sq Ft, Gaz & Acre';
const description =
  'Ready-made land conversions for Pakistan: 3, 5, 7 and 10 Marla to sq ft, 1 Kanal to sq ft and Marla, 5 Marla to square yards and 1 Acre to Kanal.';
const site = Astro.site ?? new URL('https://www.example.com');

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
    Each page opens the converter pre-filled and shows exact results for the 225, 250 and 272.25 sq ft Marla standards.
  </p>

  <div class="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
    <table class="data-table">
      <thead>
        <tr>
          <th scope="col">Conversion</th>
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
          CONVERSIONS.map((c) => (
            <tr>
              <th scope="row">
                <a href={`/convert/${c.slug}/`} class="font-semibold text-brand-700 underline decoration-brand-300 underline-offset-2 hover:decoration-brand-700">
                  {c.h1}
                </a>
              </th>
              {STANDARDS.map((s) => (
                <td class="text-right">
                  {formatNumber(convert(c.value, c.from, c.to, s.id))} {UNITS[c.to].short}
                </td>
              ))}
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>

  <p class="mt-6 leading-7 text-slate-700">
    Looking for a different value? The <a href="/" class="font-semibold text-brand-700 underline">land area converter</a> handles
    any amount in any unit, and the <a href="/plot-size-calculator/" class="font-semibold text-brand-700 underline">plot size calculator</a>
    works from frontage and depth.
  </p>

  <SidebarLinks slot="sidebar" />
</BaseLayout>
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
import { CONVERSIONS } from '../data/conversions';
import { HOME_EXTRA_FAQS, STANDARD_FAQS } from '../data/faqs';
import { faqPageSchema, softwareApplicationSchema, websiteSchema } from '../lib/schema';

const title = 'Marla to Sq Ft, Kanal & Acre Calculator (225 / 272.25)';
const description =
  'Convert Marla, Kanal, sq ft, square yards (gaz), sq meters, acres and Sarsai instantly. Switch between 225, 250 and 272.25 sq ft Marla standards. Free & private.';

const faqs = [...STANDARD_FAQS, ...HOME_EXTRA_FAQS];
const site = Astro.site ?? new URL('https://www.example.com');
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

  <div class="mt-8">
    <AdSlot variant="rectangle" name="in-content-1" />
  </div>

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
    <ul class="grid gap-3 sm:grid-cols-2">
      {
        CONVERSIONS.map((c) => (
          <li>
            <a
              href={`/convert/${c.slug}/`}
              class="flex min-h-14 items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-900 transition-colors hover:border-brand-600 hover:bg-brand-50"
            >
              <span>{c.h1}</span>
              <span aria-hidden="true" class="text-brand-700">
                →
              </span>
            </a>
          </li>
        ))
      }
    </ul>
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
const site = Astro.site ?? new URL('https://www.example.com');
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

  <div class="mt-8">
    <AdSlot variant="rectangle" name="in-content-1" />
  </div>

  <section class="mt-6" aria-labelledby="dims-heading">
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
const site = Astro.site ?? new URL('https://www.example.com');
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
        This Privacy Policy explains how {SITE.name} ("we", "us", "our") collects, uses and protects information when you visit
        {domain} (the "Site"). By using the Site you agree to this policy.
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

      <h2>3. Cookies and advertising</h2>
      <p>We may display advertisements served by Google AdSense and other third-party advertising partners.</p>
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
        These Terms of Use ("Terms") govern your use of the {SITE.name} website and calculators (the "Site"). By accessing or
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
        To the fullest extent permitted by law, {SITE.name} and its operators shall not be liable for any direct, indirect,
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
        The Site's design, text and code are owned by {SITE.name} unless otherwise stated. You may share links to any page and
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
        jurisdiction of the courts at {SITE.city.split(',')[0]}.
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
