import {
  formatDate,
  PeriodType,
  type FormatDateOptions,
  formatDateWithLocale,
  getPeriodTypeName,
  getPeriodTypeNameWithLocale,
  getDayOfWeekName,
  DayOfWeek,
} from './date';
import { formatNumberWithLocale } from './number';
import type { FormatNumberOptions, FormatNumberStyle } from './number';
import { knownLocales, type LocaleSettings } from './locale';

export type FormatType = FormatNumberStyle | PeriodType;

/**
 * Generic format which can handle Dates, Numbers, or custom format function
 */
export function format(value: null | undefined, format?: FormatNumberStyle | PeriodType): string;
export function format(
  value: number,
  format?: FormatNumberStyle,
  options?: FormatNumberOptions
): string;
export function format(
  value: string | Date,
  format?: PeriodType,
  options?: FormatDateOptions
): string;
export function format(
  value: any,
  format?: FormatType,
  options?: FormatNumberOptions | FormatDateOptions
): any {
  return formatWithLocale(knownLocales.en, value, format, options);
}

export function formatWithLocale(
  settings: LocaleSettings,
  value: any,
  format?: FormatType,
  options?: FormatNumberOptions | FormatDateOptions
) {
  let formattedValue: string | undefined;

  if (format) {
    if (format in PeriodType) {
      formattedValue = formatDateWithLocale(
        settings,
        value,
        format as PeriodType,
        options as FormatDateOptions
      );
    } else if (typeof value === 'number') {
      formattedValue = formatNumberWithLocale(
        settings,
        value,
        format as FormatNumberStyle,
        options as FormatNumberOptions
      );
    }
  }

  return formattedValue ?? ''; // return empty string so Svelte doesn't render `null` string;
}

export interface FormatFunctions {
  /** Format an arbitrary value */
  (
    value: any,
    style: FormatNumberStyle | PeriodType,
    options?: FormatNumberOptions | FormatDateOptions
  ): string;
  number: (value: number, style: FormatNumberStyle, options?: FormatNumberOptions) => string;
  date: (value: Date | string, period: PeriodType, options?: FormatDateOptions) => string;
  getPeriodTypeName: (period: PeriodType) => string;
  getDayOfWeekName: (day: DayOfWeek) => string;
  settings: LocaleSettings;
}

export function buildFormatters(settings: LocaleSettings): FormatFunctions {
  const mainFormat = (
    value: any,
    style: FormatNumberStyle | PeriodType,
    options?: FormatNumberOptions | FormatDateOptions
  ) => formatWithLocale(settings, value, style, options);

  mainFormat.settings = settings;

  mainFormat.number = (value: number, style: FormatNumberStyle, format?: FormatNumberOptions) =>
    formatNumberWithLocale(settings, value, style, format);
  mainFormat.date = (value: Date | string, period: PeriodType, options?: FormatDateOptions) =>
    formatDateWithLocale(settings, value, period, options);

  mainFormat.getDayOfWeekName = (day: DayOfWeek) => getDayOfWeekName(day, settings.locale);
  mainFormat.getPeriodTypeName = (period: PeriodType) =>
    getPeriodTypeNameWithLocale(settings, period);

  return mainFormat;
}
