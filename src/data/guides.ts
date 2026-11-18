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
