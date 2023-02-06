import { isFunction } from 'lodash-es';

import { formatDate, PeriodType } from './date';
import { formatNumberAsStyle } from './number';
import type { FormatNumberStyle } from './number';

export type FormatType = FormatNumberStyle | PeriodType | ((value: any, ...extraArgs) => any);

/**
 * Generic format which can handle Dates, Numbers, or custom format function
 */
export function format(value: any, format?: FormatType, ...extraFuncArgs) {
  let formattedValue = value ?? ''; // Do not render `null`

  if (isFunction(format)) {
    formattedValue = format(value, ...extraFuncArgs);
  } else if (format in PeriodType) {
    formattedValue = formatDate(value, format as PeriodType);
  } else if (typeof value === 'number') {
    formattedValue = formatNumberAsStyle(value, format as FormatNumberStyle);
  }

  return formattedValue ?? ''; // return empty string so Svelte doesn't render `null` string;
}
