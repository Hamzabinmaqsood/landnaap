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
