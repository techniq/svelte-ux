import { isFunction } from 'lodash-es';

import { formatDate, PeriodType } from './date';
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
  value: number | null,
  format?: FormatNumberStyle,
  extraFuncArgs?: FormatNumberOptions
): string;
export function format(
  value: string | Date | null | undefined,
  format?: PeriodType,
  ...extraFuncArgs: any[]
): string;
export function format(value: any, format?: FormatType, ...extraFuncArgs: any[]): any {
  let formattedValue = value ?? ''; // Do not render `null`

  if (format) {
    if (isFunction(format)) {
      formattedValue = format(value, ...extraFuncArgs);
    } else if (format in PeriodType) {
      formattedValue = formatDate(value, format as PeriodType, ...extraFuncArgs);
    } else if (typeof value === 'number') {
      formattedValue = formatNumber(value, {
        style: format,
        ...extraFuncArgs[0],
      });
    }
  }

  return formattedValue ?? ''; // return empty string so Svelte doesn't render `null` string;
}
