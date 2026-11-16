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
