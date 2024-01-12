import { describe, it, expect } from 'vitest';

import { format, formatWithLocale } from './format';
import { defaultLocale, createLocaleSettings } from './locale';
import { PeriodType } from './date_types';
import { testDate } from './date.test';

describe('format()', () => {
  it('returns empty string for null', () => {
    const actual = format(null);
    expect(actual).equal('');
  });

  it('returns empty string for undefined', () => {
    const actual = format(undefined);
    expect(actual).equal('');
  });

  it('returns value as string for style "none"', () => {
    const actual = format(1234.5678, 'none');
    expect(actual).equal('1234.5678');
  });

  // See `number.test.ts` for more number tests
  it('formats number with number format (integer)', () => {
    const actual = format(1234.5678, 'integer');
    expect(actual).equal('1,235');
  });

  // See `date.test.ts` for more date tests
  it('formats date with PeriodType format (date)', () => {
    const actual = format(testDate, PeriodType.Day);
    expect(actual).equal('11/21/2023');
  });

  it('formats number with custom function', () => {
    const actual = format(1234.5678, (value) => Math.round(value).toString());
    expect(actual).equal('1235');
  });
});
