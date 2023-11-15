import { describe, it, expect } from 'vitest';

import { clamp, formatNumber, formatNumberAsStyle, round } from './number';

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

  it('formats number with default fraction digits', () => {
    const actual = formatNumber(1234.5678);
    expect(actual).equal('1,234.57');
  });

  it('formats number with specified fraction digits', () => {
    const actual = formatNumber(1234.5678, { fractionDigits: 3 });
    expect(actual).equal('1,234.568');
  });

  it('formats number with currency USD', () => {
    const actual = formatNumber(1234.5678, { currency: 'USD' });
    expect(actual).equal('$1,234.57');
  });

  it('formats number with currency GBP', () => {
    const actual = formatNumber(1234.5678, { currency: 'GBP' });
    expect(actual).equal('£1,234.57');
  });

  it('formats number with currency EUR', () => {
    const actual = formatNumber(1234.5678, { locales: 'fr', currency: 'EUR' });
    expect(actual).toMatchInlineSnapshot('"1 234,57 €"');
  });
});

describe('formatNumberAsStyle()', () => {
  it('returns empty string for null', () => {
    const actual = formatNumberAsStyle(null);
    expect(actual).equal('');
  });

  it('returns empty string for undefined', () => {
    const actual = formatNumberAsStyle(undefined);
    expect(actual).equal('');
  });

  it('returns value as string for style "none"', () => {
    const actual = formatNumberAsStyle(1234.5678, 'none');
    expect(actual).equal('1234.5678');
  });

  it('returns value with currency symbol for style "currency"', () => {
    const actual = formatNumberAsStyle(1234.5678, 'currency');
    expect(actual).toString().startsWith('$');
  });

  it('returns value with percent symbol for style "percent"', () => {
    const actual = formatNumberAsStyle(0.1234, 'percent');
    expect(actual).toString().endsWith('%');
  });

  it('returns value with percent symbol and no decimal for style "percentRound"', () => {
    const actual = formatNumberAsStyle(0.1234, 'percentRound');
    expect(actual).toString().endsWith('%');
    expect(actual).not.toContain('.');
  });

  it('returns value with no decimal for style "integer"', () => {
    const actual = formatNumberAsStyle(1234.5678, 'integer');
    expect(actual).equal('1235');
  });

  it('returns value with metric suffix for style "metric"', () => {
    const actual = formatNumberAsStyle(1000, 'metric');
    expect(actual).equal('1k');
  });

  it('returns value with significant digits', () => {
    const actual = formatNumberAsStyle(1234.5678, 'decimal', { significantDigits: 2 });
    expect(actual).equal('1.2k');
  });

  it('returns value with precision for style "decimal"', () => {
    const actual = formatNumberAsStyle(1234.5678);
    expect(actual).equal('1,234.57');
  });

  it('returns value with currency symbol for style "currency" EUR fr', () => {
    const actual = formatNumberAsStyle(1234.5678, 'currency', {
      format: {
        decimal: ',',
        thousands: ' ',
        grouping: [3],
        currency: ['', ' €'],
      },
    });
    expect(actual).toBe('1 234,57 €');
  });
});
