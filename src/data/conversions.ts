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
