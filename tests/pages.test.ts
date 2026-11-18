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
