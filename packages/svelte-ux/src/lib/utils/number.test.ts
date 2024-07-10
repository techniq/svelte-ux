import { describe, it, expect } from 'vitest';

import { clamp, formatNumber, formatNumberWithLocale, round, step } from './number.js';
import { createLocaleSettings } from './locale.js';

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

describe('step()', () => {
  it('integer (step up)', () => {
    const actual = step(2, 1);
    expect(actual).equal(3);
  });

  it('integer (step down)', () => {
    const actual = step(2, -1);
    expect(actual).equal(1);
  });

  it('decimal (step up)', () => {
    const actual = step(0.2, 0.1);
    expect(actual).equal(0.3);
  });

  it('decimal (step down)', () => {
    const actual = step(0.2, -0.1);
    expect(actual).equal(0.1);
  });

  it('decimal with integer step (step up)', () => {
    const actual = step(0.2, 1);
    expect(actual).equal(1);
  });

  it('decimal with integer step (step down)', () => {
    const actual = step(0.2, -1);
    expect(actual).equal(-1);
  });

  it('integer with decimal step (step up)', () => {
    const actual = step(2, 0.1);
    expect(actual).equal(2.1);
  });

  it('integer with decimal step (step down)', () => {
    const actual = step(2, -0.1);
    expect(actual).equal(1.9);
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
    const actual = formatNumber(1234.5678, 'none');
    expect(actual).equal('1234.5678');
  });

  it('formats number with integer default', () => {
    const actual = formatNumber(1234.5678, 'integer');
    expect(actual).equal('1,235');
  });

  it('formats number with integer fr', () => {
    const actual = formatNumberWithLocale(
      createLocaleSettings({ locale: 'fr' }),
      1234.5678,
      'integer'
    );
    expect(actual).equal('1 235');
  });

  it('formats number with default fraction digits', () => {
    const actual = formatNumber(1234.5678);
    expect(actual).equal('1,234.57');
  });

  it('formats number with specified fraction digits', () => {
    const actual = formatNumber(1234.5678, 'decimal', { fractionDigits: 3 });
    expect(actual).equal('1,234.568');
  });

  it('returns value with significant digits', () => {
    const actual = formatNumber(1234.5678, 'default', {
      notation: 'compact',
      maximumSignificantDigits: 2,
    });
    expect(actual).equal('1.2K');
  });

  it('returns value with significant digits', () => {
    const actual = formatNumber(1000, 'default', {
      notation: 'compact',
      minimumSignificantDigits: 2,
    });
    expect(actual).equal('1.0K');
  });

  it('formats number with currency USD by style', () => {
    const actual = formatNumber(1234.5678, 'currency');
    expect(actual).equal('$1,234.57');
  });

  it('formats number with currency USD by currency', () => {
    const actual = formatNumber(1234.5678, 'currency', { currency: 'USD' });
    expect(actual).equal('$1,234.57');
  });

  it('formats number with currency GBP', () => {
    const actual = formatNumber(1234.5678, 'currency', { currency: 'GBP' });
    expect(actual).equal('£1,234.57');
  });

  it('formats number with currency EUR only currency', () => {
    const actual = formatNumber(1234.5678, 'currency', { currency: 'EUR' });
    expect(actual).equal('€1,234.57');
  });

  it('formats number with currency EUR with right local', () => {
    const actual = formatNumberWithLocale(
      createLocaleSettings({ locale: 'fr' }),
      1234.5678,
      'currency',
      {
        currency: 'EUR',
      }
    );
    expect(actual).equal('1 234,57 €');
  });

  it('formats number with currencyRound', () => {
    const actual = formatNumber(1234.5678, 'currencyRound');
    expect(actual).equal('$1,235');
  });

  it('returns value with percent symbol for style "percent"', () => {
    const actual = formatNumber(0.1234, 'percent');
    expect(actual).equal('12.34%');
  });

  it('returns value with percent symbol and no decimal for style "percentRound"', () => {
    const actual2 = formatNumber(0.1234, 'percentRound');
    expect(actual2).equal('12%');
  });

  it('returns value with metric suffix for style "unit" & meters', () => {
    const actual = formatNumber(1000, 'unit', {
      unit: 'meter',
      unitDisplay: 'narrow',

      notation: 'compact',
      fractionDigits: 0,
    });
    expect(actual).equal('1Km');
  });

  it('byte 10B', () => {
    const actual = formatNumber(10, 'unit', {
      unit: 'byte',
      unitDisplay: 'narrow',
      notation: 'compact',
      fractionDigits: 0,
    });
    expect(actual).equal('10B');
  });

  it('byte 200KB', () => {
    const actual = formatNumber(200000, 'unit', {
      unit: 'byte',
      unitDisplay: 'narrow',
      notation: 'compact',
      fractionDigits: 0,
    });
    expect(actual).equal('200KB');
  });

  it('byte 50MB', () => {
    const actual = formatNumber(50000000, 'unit', {
      unit: 'byte',
      unitDisplay: 'narrow',
      notation: 'compact',
      fractionDigits: 0,
    });
    expect(actual).equal('50MB');
  });

  it('dollar 0', () => {
    const actual = formatNumber(0, 'metric', {
      suffix: ' dollar',
    });
    expect(actual).equal('0 dollar');
  });

  it('dollars 10', () => {
    const actual = formatNumber(10, 'metric', {
      suffix: ' dollar',
    });
    expect(actual).equal('10 dollars');
  });

  it('dollars 200K', () => {
    const actual = formatNumber(200000, 'metric', {
      suffix: ' dollar',
    });
    expect(actual).equal('200K dollars');
  });

  it('dollars 50M', () => {
    const actual = formatNumber(50000000, 'metric', {
      suffix: ' dollar',
    });
    expect(actual).equal('50M dollars');
  });

  it('50M wo suffix', () => {
    const actual = formatNumber(50000000, 'metric');
    expect(actual).equal('50M');
  });

  it('200 m²', () => {
    const actual = formatNumber(200, 'metric', {
      suffix: ' m²',
      suffixExtraIfMany: '',
    });
    expect(actual).equal('200 m²');
  });
});
