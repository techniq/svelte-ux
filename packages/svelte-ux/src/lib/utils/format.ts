import {
  formatDateWithLocale,
  getPeriodTypeNameWithLocale,
  getDayOfWeekName,
  isStringDate,
} from './date.js';
import { formatNumberWithLocale } from './number.js';
import type { FormatNumberOptions, FormatNumberStyle } from './number.js';
import { defaultLocale, type LocaleSettings } from './locale.js';
import { PeriodType, type FormatDateOptions, DayOfWeek } from './date_types.js';

export type FormatType = FormatNumberStyle | PeriodType | CustomFormatter;
export type CustomFormatter = (value: any) => string;
// re-export for convenience
export type { FormatNumberStyle, PeriodType };

/**
 * Generic format which can handle Dates, Numbers, or custom format function
 */
export function format(value: null | undefined, format?: FormatType): string;
export function format(
  value: number,
  format?: FormatNumberStyle | CustomFormatter,
  options?: FormatNumberOptions
): string;
export function format(
  value: string | Date,
  format?: PeriodType | CustomFormatter,
  options?: FormatDateOptions
): string;
export function format(
  value: any,
  format?: FormatType,
  options?: FormatNumberOptions | FormatDateOptions
): any {
  return formatWithLocale(defaultLocale, value, format, options);
}

export function formatWithLocale(
  settings: LocaleSettings,
  value: any,
  format?: FormatType,
  options?: FormatNumberOptions | FormatDateOptions
) {
  if (typeof format === 'function') {
    return format(value);
  } else if (value instanceof Date || isStringDate(value) || (format && format in PeriodType)) {
    return formatDateWithLocale(
      settings,
      value,
      (format ?? PeriodType.Day) as PeriodType,
      options as FormatDateOptions
    );
  } else if (typeof value === 'number') {
    return formatNumberWithLocale(
      settings,
      value,
      format as FormatNumberStyle,
      options as FormatNumberOptions
    );
  } else if (typeof value === 'string') {
    // Keep original value if already string
    return value;
  } else if (value == null) {
    return '';
  } else {
    // Provide some reasonable fallback for objects/etc (maybe use stringify() instead)
    return `${value}`;
  }
}

export type FormatFunction = ((
  value: number | null | undefined,
  style: FormatNumberStyle,
  options?: FormatNumberOptions
) => string) &
  ((
    value: Date | string | null | undefined,
    period: PeriodType,
    options?: FormatDateOptions
  ) => string);

export interface FormatFunctionProperties {
  getPeriodTypeName: (period: PeriodType) => string;
  getDayOfWeekName: (day: DayOfWeek) => string;
  settings: LocaleSettings;
}

export type FormatFunctions = FormatFunction & FormatFunctionProperties;

export function buildFormatters(settings: LocaleSettings): FormatFunctions {
  const mainFormat = (
    value: any,
    style: FormatNumberStyle | PeriodType,
    options?: FormatNumberOptions | FormatDateOptions
  ) => formatWithLocale(settings, value, style, options);

  mainFormat.settings = settings;

  mainFormat.getDayOfWeekName = (day: DayOfWeek) => getDayOfWeekName(day, settings.locale);
  mainFormat.getPeriodTypeName = (period: PeriodType) =>
    getPeriodTypeNameWithLocale(settings, period);

  return mainFormat;
}
