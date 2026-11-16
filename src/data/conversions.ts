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
