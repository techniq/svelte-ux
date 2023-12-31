import { isFunction } from 'lodash-es';

import { formatDate, PeriodType, type FormatDateOptions } from './date';
import { formatNumber } from './number';
import type { FormatNumberOptions, FormatNumberStyle } from './number';

export type FormatType =
  | FormatNumberStyle
  | PeriodType
  | ((value: any, ...extraArgs: any[]) => any);

/**
 * Generic format which can handle Dates, Numbers, or custom format function
 */
export function format(
  value: null | undefined,
  format?: FormatNumberStyle,
  extraFuncArgs?: FormatNumberOptions
): string;
export function format(
  value: number,
  format?: FormatNumberStyle,
  extraFuncArgs?: FormatNumberOptions
): string;
export function format(
  value: string | Date,
  format?: PeriodType,
  extraFuncArgs?: FormatDateOptions
): string;
export function format(value: any, format?: FormatType, ...extraFuncArgs: any[]): any {
  let formattedValue = value ?? ''; // Do not render `null`

  if (format) {
    if (isFunction(format)) {
      formattedValue = format(value, ...extraFuncArgs);
    } else if (format in PeriodType) {
      formattedValue = formatDate(
        value,
        format as PeriodType,
        extraFuncArgs.length > 0 ? extraFuncArgs[0] : undefined
      );
    } else if (typeof value === 'number') {
      formattedValue = formatNumber(value, {
        style: format,
        ...extraFuncArgs[0],
      });
    }
  }

  return formattedValue ?? ''; // return empty string so Svelte doesn't render `null` string;
}
