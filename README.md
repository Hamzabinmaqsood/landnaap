# LandNaap — Marla, Kanal & Plot Size Calculator

A static, zero-backend Astro + Tailwind CSS site for Pakistani / South Asian land measurement, built for Cloudflare Pages.

- **Land Area Converter**: live, bidirectional Marla ⇄ Kanal ⇄ sq ft ⇄ sq yd (gaz) ⇄ sq m ⇄ acre ⇄ Sarsai, with 225 / 272.25 / 250 sq ft Marla standards, a three-standard comparison table, Copy Results and shareable URLs (`/?v=5&u=marla&s=225`).
- **Plot Dimension & Cutting Calculator**: frontage × depth gives sq ft, sq yd, sq m, exact Marla, Kanal, a Kanal–Marla–Sarsai breakdown and the closest standard plot size.
- **Programmatic SEO**: 8 pre-rendered `/convert/[slug]/` pages, each with a unique title, description and canonical URL, a static reference table, an FAQ, and `SoftwareApplication` + `FAQPage` + `BreadcrumbList` JSON-LD.
- **AI search (GEO)**: `public/llms.txt`, AI-crawler-friendly `robots.txt`, formulas in JSON-LD and visible HTML.
- **AdSense-ready**: placements render nothing until configured, then use fixed `min-h-[90px]` / `min-h-[250px]` wrappers (zero CLS). Includes About, Privacy Policy, Terms and Contact pages.

## Quick start

```bash
# Requires Node.js 22.23.4+ (see .nvmrc)
npm install
npm run dev        # http://localhost:4321
npm test           # unit tests for the conversion engine
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
