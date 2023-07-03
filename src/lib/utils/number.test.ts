import { describe, it, expect } from 'vitest';

import { clamp, randomInteger, round } from './number';

describe('clamp()', () => {
  it('no change', () => {
    const original = 15;
    const actual = clamp(original, 10, 20);
    expect(actual).equal(15);
  });

  it('clamp min', () => {
    const original = 5;
    const actual = clamp(original, 10, 20);
    expect(actual).equal(10);
  });

  it('clamp max', () => {
    const original = 25;
    const actual = clamp(original, 10, 20);
    expect(actual).equal(20);
  });
});

describe('round()', () => {
  it('round to 0 digits (down)', () => {
    const original = 123.456;
    const actual = round(original, 0);
    expect(actual).equal(123);
  });

  it('round to 0 digits (up)', () => {
    const original = 123.56;
    const actual = round(original, 0);
    expect(actual).equal(124);
  });

  it('round to 1 digit', () => {
    const original = 123.456;
    const actual = round(original, 1);
    expect(actual).equal(123.5);
  });

  it('round to 2 digits', () => {
    const original = 123.456;
    const actual = round(original, 2);
    expect(actual).equal(123.46);
  });
});

describe('randomInteger()', () => {
  it('basic', () => {
    const actual = randomInteger(10, 50);
    expect(actual).greaterThanOrEqual(10).lessThanOrEqual(50);
  });
});
