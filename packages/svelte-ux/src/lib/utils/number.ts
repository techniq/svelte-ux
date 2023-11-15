import { format as d3Format, formatDefaultLocale, type FormatLocaleDefinition } from 'd3-format';

// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
export function formatNumber(
  number: number | null | undefined,
  options: Intl.NumberFormatOptions & {
    fractionDigits?: number;
    locales?: string | string[] | undefined;
  } = {}
) {
  if (number == null) {
    return '';
  }

  const formatter = Intl.NumberFormat(options.locales ?? undefined, {
    ...(options.currency != null && {
      style: 'currency',
    }),
    ...{
      minimumFractionDigits: options.fractionDigits != null ? options.fractionDigits : 2,
      maximumFractionDigits: options.fractionDigits != null ? options.fractionDigits : 2,
    },
    ...options,
  });
  const value = formatter.format(number);

  return value;
}

export type FormatNumberStyle =
  | 'integer'
  | 'decimal'
  | 'currency'
  | 'percent'
  | 'percentRound'
  | 'metric'
  | 'none'
  | undefined;

export function formatNumberAsStyle(
  value: number | null | undefined,
  style: FormatNumberStyle = 'decimal',
  options: {
    precision?: number;
    significantDigits?: number; // Used for summary, ie, 1,001.34 with significantDigits=1 will be 1K
    format?: FormatLocaleDefinition;
  } = {}
) {
  const { precision = 2, significantDigits } = options;

  if (value == null) {
    return '';
  }

  if (style === 'none') {
    return `${value}`;
  }

  var formula = '';

  if (style === 'currency') {
    formula += '$'; // needed even if it will be euro later. It's just to say "Its currency"
  }

  // TODO: Format `G` as `B`, etc.  See: https://github.com/d3/d3/issues/2241 and https://github.com/d3/d3-format/pull/96

  if (style === 'percent') {
    formula += `.${precision}%`;
  } else if (style === 'percentRound') {
    formula += `.0%`;
  } else if (style === 'integer') {
    formula += `d`;
  } else if (style === 'metric') {
    formula += '~s';
  } else if (significantDigits === 0) {
    formula += '~s';
  } else if (significantDigits) {
    formula += `,.${significantDigits}s`;
  } else {
    formula += `,.${precision}f`;
  }

  const defaultFormat = formatDefaultLocale({
    decimal: '.',
    thousands: ',',
    grouping: [3],
    currency: ['$', ''],
    ...options?.format,
  });

  return defaultFormat.format(formula)(value);
}

/**
 * Clamps value within min and max
 */
export function clamp(value: number, min: number, max: number) {
  return value < min ? min : value > max ? max : value;
}

/**
 * Return the number of decimal positions (ex. 123.45 => 2, 123 => 0)
 */
export function decimalCount(value: number) {
  return value?.toString().split('.')[1]?.length ?? 0;
}

/**
 * Round to the number of decimals (ex. round(123.45, 1) => 123.5)
 */
export function round(value: number, decimals: number) {
  return Number(value.toFixed(decimals));
}

/**
 * Get random number between min and max (inclusive).  See also d3.randomInt()
 */
export function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Remainder (n % m) with support for negative numbers
 * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder#description
 */
export function modulo(n: number, m: number) {
  return ((n % m) + m) % m;
}
