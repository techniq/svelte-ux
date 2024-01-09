import type { Settings } from '../components/settings';
import { defaultLocale, createLocaleSettings, type LocaleSettings } from './locale';

export type FormatNumberStyle =
  | 'decimal' // from Intl.NumberFormat options.style NumberFormatOptions
  | 'currency' // from Intl.NumberFormat options.style NumberFormatOptions
  | 'percent' // from Intl.NumberFormat options.style NumberFormatOptions
  | 'unit' // from Intl.NumberFormat options.style NumberFormatOptions
  | 'none'
  | 'integer'
  | 'percentRound'
  | 'metric'
  | 'default';

export type FormatNumberOptions = Intl.NumberFormatOptions & {
  fractionDigits?: number;
  suffix?: string;
  /**
   * If number is >= 2, then this extraSuffix will be appended
   * @default 's'
   */
  suffixExtraIfMany?: string;
};

function getFormatNumber(settings: LocaleSettings, style: FormatNumberStyle | undefined) {
  const { numbers } = settings.formats;
  const styleSettings = style ? numbers[style] : {};
  return {
    ...numbers.defaults,
    ...styleSettings,
  };
}

export function formatNumber(
  number: number | null | undefined,
  style?: FormatNumberStyle,
  options?: FormatNumberOptions
) {
  return formatNumberWithLocale(defaultLocale, number, style, options);
}

// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
export function formatNumberWithLocale(
  settings: LocaleSettings,
  number: number | null | undefined,
  style?: FormatNumberStyle,
  options: FormatNumberOptions = {}
) {
  if (number == null) {
    return '';
  }

  if (style === 'none') {
    return `${number}`;
  }

  const defaults = getFormatNumber(settings, style);

  const formatter = Intl.NumberFormat(settings.locale, {
    // Let's always starts with all defaults
    ...defaults,

    ...(style !== 'default' && {
      style,
    }),

    // If currency is specified, then style must be currency
    ...(options.currency != null && {
      style: 'currency',
    }),

    // Let's shorten min / max with fractionDigits
    ...{
      minimumFractionDigits: options.fractionDigits ?? defaults.fractionDigits,
      maximumFractionDigits: options.fractionDigits ?? defaults.fractionDigits,
    },

    // now we bring in user specified options
    ...options,

    // Let's overwrite for style=percentRound
    ...(style === 'percentRound' && {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }),

    // Let's overwrite for style=metric
    ...(style === 'metric' && {
      style: 'decimal',
      notation: 'compact',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }),

    // Let's overwrite for style=integer
    ...(style === 'integer' && {
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
