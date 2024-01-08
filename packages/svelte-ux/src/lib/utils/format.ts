import { isFunction } from 'lodash-es';

import { formatDate, PeriodType, type FormatDateOptions } from './date';
import { formatNumberWithLocale } from './number';
import type { FormatNumberOptions, FormatNumberStyle } from './number';
import type { LocaleSettings } from './locale';

export type FormatType =
  | FormatNumberStyle
  | PeriodType
  | ((value: any, ...extraArgs: any[]) => any);

/**
 * Generic format which can handle Dates, Numbers, or custom format function
 */
export function format(
  settings: LocaleSettings,
  value: null | undefined,
  format?: FormatNumberStyle | PeriodType
): string;
export function format(settings: LocaleSettings, value: number, format?: FormatNumberStyle): string;
export function format(
  settings: LocaleSettings,
  value: string | Date,
  format?: PeriodType,
  extraFuncArgs?: FormatDateOptions
): string;
export function format(
  settings: LocaleSettings,
  value: any,
  format?: FormatType,
  ...extraFuncArgs: any[]
): any {
  let formattedValue = value ?? ''; // Do not render `null`

  if (format) {
    if (isFunction(format)) {
      formattedValue = format(value, ...extraFuncArgs);
    } else if (format in PeriodType) {
      formattedValue = formatDate(
        settings,
        value,
        format as PeriodType,
        extraFuncArgs.length > 0 ? extraFuncArgs[0] : undefined
      );
    } else if (typeof value === 'number') {
      formattedValue = formatNumberWithLocale(settings, value, {
        style: format,
        ...extraFuncArgs[0],
      });
    }
  }

  return formattedValue ?? ''; // return empty string so Svelte doesn't render `null` string;
}

export interface FormatFunctions {
  /** Format an arbitrary value */
  (value: any, style: FormatNumberOptions | PeriodType): string;
  number: (value: number, style?: FormatNumberOptions) => string;
  date: (value: Date | string | number, period?: PeriodType) => string;
  settings: LocaleSettings;
}

export function buildFormatters(settings: LocaleSettings): FormatFunctions {
  const mainFormat = (value: any, style: FormatNumberStyle | PeriodType) =>
    format(settings, value, style);

  mainFormat.settings = settings;

  mainFormat.number = (value: number, format?: FormatNumberOptions) =>
    formatNumberWithLocale(settings, value, format);
  mainFormat.date = (value: Date | string, period?: PeriodType) =>
    formatDate(settings, value, period);

  return mainFormat;
}
