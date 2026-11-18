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
