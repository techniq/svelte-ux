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

  // console.log({ value, formula, result: d3Format(formula)(value) });

  return d3Format(formula)(value);
}
