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
