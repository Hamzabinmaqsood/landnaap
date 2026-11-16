import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  convert,
  toSqFt,
  fromSqFt,
  breakdownKms,
  calculatePlot,
  closestPlotCategory,
  parseInput,
  formatNumber,
  toInputValue,
} from '../src/lib/units.ts';

test('Marla to square feet across standards', () => {
  assert.equal(toSqFt(5, 'marla', '225'), 1125);
  assert.equal(toSqFt(5, 'marla', '250'), 1250);
  assert.equal(toSqFt(5, 'marla', '272.25'), 1361.25);
  assert.equal(toSqFt(10, 'marla', '272.25'), 2722.5);
});

test('Kanal, Sarsai and Acre relationships', () => {
  assert.equal(convert(1, 'kanal', 'marla', '225'), 20);
  assert.equal(convert(1, 'kanal', 'marla', '272.25'), 20);
  assert.equal(toSqFt(1, 'kanal', '272.25'), 5445);
  assert.equal(convert(1, 'acre', 'kanal', '272.25'), 8);
  assert.equal(convert(1, 'acre', 'marla', '272.25'), 160);
  assert.equal(convert(1, 'acre', 'kanal', '225'), 9.68);
  assert.equal(convert(1, 'acre', 'kanal', '250'), 8.712);
  assert.equal(toSqFt(1, 'sarsai', '272.25'), 30.25);
  assert.equal(convert(1, 'marla', 'sarsai', '225'), 9);
});

test('Square yards and square meters', () => {
  assert.equal(convert(5, 'marla', 'sqyd', '225'), 125);
  assert.equal(convert(5, 'marla', 'sqyd', '272.25'), 151.25);
  assert.equal(fromSqFt(1000, 'sqm', '225'), 92.90304);
  assert.equal(toSqFt(92.90304, 'sqm', '225'), 1000);
  assert.equal(convert(1, 'acre', 'sqyd', '225'), 4840);
});

test('Round trips are stable', () => {
  for (const std of ['225', '250', '272.25'] as const) {
    for (const v of [0.5, 1, 3, 7.25, 123.456]) {
      const back = convert(convert(v, 'marla', 'sqm', std), 'sqm', 'marla', std);
      assert.ok(Math.abs(back - v) < 1e-9, `${std} ${v} -> ${back}`);
    }
  }
});

test('Kanal-Marla-Sarsai breakdown', () => {
  assert.deepEqual(breakdownKms(5445, '272.25'), { kanal: 1, marla: 0, sarsai: 0, sqft: 0 });
  assert.deepEqual(breakdownKms(2275, '225'), { kanal: 0, marla: 10, sarsai: 1, sqft: 0 });
  assert.deepEqual(breakdownKms(4510, '225'), { kanal: 1, marla: 0, sarsai: 0, sqft: 10 });
});

test('Plot calculator examples from the brief', () => {
  const a = calculatePlot(25, 45, '225');
  assert.ok(a);
  assert.equal(a.sqft, 1125);
  assert.equal(a.marla, 5);
  assert.equal(a.closest?.category.label, '5 Marla');
  assert.equal(a.closest?.isMatch, true);

  const b = calculatePlot(35, 65, '225');
  assert.equal(b?.closest?.category.label, '10 Marla');

  const c = calculatePlot(50, 90, '225');
  assert.equal(c?.closest?.category.label, '1 Kanal');
  assert.equal(c?.sqyd, 500);

  assert.equal(calculatePlot(0, 45, '225'), null);
  assert.equal(closestPlotCategory(0, '225'), null);
});

test('Input parsing and formatting', () => {
  assert.equal(parseInput('1,125'), 1125);
  assert.equal(parseInput(' 5.5 '), 5.5);
  assert.equal(parseInput('.5'), 0.5);
  assert.equal(parseInput(''), null);
  assert.equal(parseInput('abc'), null);
  assert.equal(parseInput('-3'), null);
  assert.equal(parseInput('1.2.3'), null);
  assert.equal(formatNumber(1361.25), '1,361.25');
  assert.equal(formatNumber(0.0258264463), '0.025826');
  assert.equal(toInputValue(2722.5), '2722.5');
  assert.equal(toInputValue(104.5159), '104.52');
});
