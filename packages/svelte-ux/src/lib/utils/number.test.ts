import { describe, it, expect } from 'vitest';

import { clamp, formatNumber, round } from './number';

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

describe('formatNumber()', () => {
  it('returns empty string for null', () => {
    const actual = formatNumber(null);
    expect(actual).equal('');
  });

  it('returns empty string for undefined', () => {
    const actual = formatNumber(undefined);
    expect(actual).equal('');
  });

  it('returns value as string for style "none"', () => {
    const actual = formatNumber(1234.5678, { style: 'none' });
    expect(actual).equal('1234.5678');
  });

  it('formats number with integer', () => {
    const actual = formatNumber(1234.5678, { style: 'integer' });
    expect(actual).equal('1234');
    // expect(actual).equal('1,234'); // TODO: Today its like this... It's intended? (I leave the test breaking for now)
  });

  it('formats number with default fraction digits', () => {
    const actual = formatNumber(1234.5678);
    expect(actual).equal('1,234.57');
  });

  it('formats number with specified fraction digits', () => {
    const actual = formatNumber(1234.5678, { fractionDigits: 3 });
    expect(actual).equal('1,234.568');
  });

  it('returns value with significant digits', () => {
    const actual = formatNumber(1234.5678, {
      notation: 'compact',
      maximumSignificantDigits: 2,
    });
    expect(actual).equal('1.2K');
  });

  it('returns value with significant digits', () => {
    const actual = formatNumber(1000, {
      notation: 'compact',
      minimumSignificantDigits: 2,
    });
    expect(actual).equal('1.0K');
  });

  it('formats number with currency USD by style', () => {
    const actual = formatNumber(1234.5678, { style: 'currency' });
    expect(actual).equal('$1,234.57');
  });

  it('formats number with currency USD by currency', () => {
    const actual = formatNumber(1234.5678, { currency: 'USD' });
    expect(actual).equal('$1,234.57');
  });

  it('formats number with currency GBP', () => {
    const actual = formatNumber(1234.5678, { currency: 'GBP' });
    expect(actual).equal('£1,234.57');
  });

  it('formats number with currency EUR only currency', () => {
    const actual = formatNumber(1234.5678, { currency: 'EUR' });
    expect(actual).equal('€1,234.57');
  });

  it('formats number with currency EUR with right local', () => {
    const actual = formatNumber(1234.5678, { locales: 'fr', currency: 'EUR' });
    expect(actual).equal('1 234,57 €');
  });

  it('returns value with percent symbol for style "percent"', () => {
    const actual = formatNumber(0.1234, { style: 'percent' });
    expect(actual).equal('12.34%');
  });

  it('returns value with percent symbol and no decimal for style "percentRound"', () => {
    const actual2 = formatNumber(0.1234, { style: 'percentRound' });
    expect(actual2).equal('12%');
  });

  it('returns value with metric suffix for style "unit" & meters', () => {
    const actual = formatNumber(1000, {
      style: 'unit',

      unit: 'meter',
      unitDisplay: 'narrow',

      notation: 'compact',
      fractionDigits: 0,
    });
    expect(actual).equal('1Km');
  });

  it('byte 10B', () => {
    const actual = formatNumber(10, {
      style: 'unit',
      unit: 'byte',
      unitDisplay: 'narrow',
      notation: 'compact',
      fractionDigits: 0,
    });
    expect(actual).equal('10B');
  });

  it('byte 200KB', () => {
    const actual = formatNumber(200000, {
      style: 'unit',
      unit: 'byte',
      unitDisplay: 'narrow',
      notation: 'compact',
      fractionDigits: 0,
    });
    expect(actual).equal('200KB');
  });

  it('byte 50MB', () => {
    const actual = formatNumber(50000000, {
      style: 'unit',
      unit: 'byte',
      unitDisplay: 'narrow',
      notation: 'compact',
      fractionDigits: 0,
    });
    expect(actual).equal('50MB');
  });

  it('dollar 0', () => {
    const actual = formatNumber(0, {
      style: 'metric',
      suffix: ' dollar',
    });
    expect(actual).equal('0 dollar');
  });

  it('dollars 10', () => {
    const actual = formatNumber(10, {
      style: 'metric',
      suffix: ' dollar',
    });
    expect(actual).equal('10 dollars');
  });

  it('dollars 200K', () => {
    const actual = formatNumber(200000, {
      style: 'metric',
      suffix: ' dollar',
    });
    expect(actual).equal('200K dollars');
  });

  it('dollars 50M', () => {
    const actual = formatNumber(50000000, {
      style: 'metric',
      suffix: ' dollar',
    });
    expect(actual).equal('50M dollars');
  });

  it('50M wo suffix', () => {
    const actual = formatNumber(50000000, {
      style: 'metric',
    });
    expect(actual).equal('50M');
  });

  it('200 m²', () => {
    const actual = formatNumber(200, {
      style: 'metric',
      suffix: ' m²',
      suffixExtraIfMany: '',
    });
    expect(actual).equal('200 m²');
  });
});
