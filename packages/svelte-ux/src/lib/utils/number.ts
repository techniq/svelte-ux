import { format as d3Format, formatDefaultLocale, type FormatLocaleDefinition } from 'd3-format';

export type FormatNumberStyle =
  | 'decimal' // from Intl.NumberFormat options.style NumberFormatOptions
  | 'currency' // from Intl.NumberFormat options.style NumberFormatOptions
  | 'percent' // from Intl.NumberFormat options.style NumberFormatOptions
  | 'unit' // from Intl.NumberFormat options.style NumberFormatOptions
  | 'none'
  | 'integer'
  | 'percentRound'
  | 'metric';

export type FormatNumberOptions = Intl.NumberFormatOptions & {
  style?: FormatNumberStyle;
  locales?: string | undefined;
  fractionDigits?: number;
};

// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
export function formatNumber(
  number: number | null | undefined,
  options: FormatNumberOptions & {
    suffix?: string;
    /**
     * If number is >= 2, then this extraSuffix will be appended
     * @default 's'
     */
    suffixExtraIfMany?: string;
  } = {}
) {
  if (number == null) {
    return '';
  }

  if (options.style === 'none') {
    return `${number}`;
  }

  // todo set defaults in a context or something
  const defaults: FormatNumberOptions = {
    locales: 'en',
    currency: 'USD',
    fractionDigits: 2,
    currencyDisplay: 'symbol',
  };

  const formatter = Intl.NumberFormat(options.locales ?? defaults.locales ?? undefined, {
    // Let's always starts with all defaults
    ...defaults,

    // If currency is specified, then style must be currency
    ...(options.currency != null && {
      style: 'currency',
    }),

    // Let's shorten min / max with fractionDigits
    ...{
      minimumFractionDigits:
        options.fractionDigits != null ? options.fractionDigits : defaults.fractionDigits,
      maximumFractionDigits:
        options.fractionDigits != null ? options.fractionDigits : defaults.fractionDigits,
    },

    // now we bring in user specified options
    ...options,

    // Let's overwrite for style=percentRound
    ...(options.style === 'percentRound' && {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }),

    // Let's overwrite for style=metric
    ...(options.style === 'metric' && {
      style: 'decimal',
      notation: 'compact',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }),

    // Let's overwrite for style=metric
    ...(options.style === 'integer' && {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }),
  });
  const value = formatter.format(number);

  let suffix = options.suffix ?? '';
  if (suffix && Math.abs(number) >= 2 && options.suffixExtraIfMany !== '') {
    suffix += options.suffixExtraIfMany ?? 's';
  }

  return `${value}${suffix}`;
}

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
