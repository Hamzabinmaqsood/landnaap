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
