import { format as d3Format } from 'd3-format';

// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
export function formatNumber(
  number: number | null | undefined,
  options: Intl.NumberFormatOptions & { fractionDigits?: number } = {}
) {
  if (number == null) {
    return '';
  }

  const formatter = Intl.NumberFormat(undefined, {
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
  precision = 2, // Used for decimals, defaults to 2
  significantDigits?: number // Used for summary, ie, 1,001.34 with significantDigits=1 will be 1K
) {
  if (value == null) {
    return '';
  }

  if (style === 'none') {
    return `${value}`;
  }

  var formula = '';

  if (style === 'currency') {
    formula += '$';
  }

  // All numbers are formatted with commas
  formula += ',';

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
    formula += `.${significantDigits}s`;
  } else {
    formula += `.${precision}f`;
  }

  return d3Format(formula)(value);
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
 * Get random number between min and max (inclusive)
 */
export function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
