import { describe, it, expect } from 'vitest';

import { format } from './format.js';
import { PeriodType } from './date_types.js';
import { testDate } from './date.test.js';
import { parseISO } from 'date-fns';

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

  // Default format based on value type
  it('format based on value type (integer)', () => {
    const actual = format(1234);
    expect(actual).equal('1,234');
  });
  it('format based on value type (decimal)', () => {
    const actual = format(1234.5678);
    expect(actual).equal('1,234.57');
  });
  it('format based on value type (date string)', () => {
    const actual = format(testDate);
    expect(actual).equal('11/21/2023');
  });
  it('format based on value type (date)', () => {
    const actual = format(parseISO(testDate));
    expect(actual).equal('11/21/2023');
  });
  it('format based on value type (string)', () => {
    const actual = format('hello');
    expect(actual).equal('hello');
  });
});
