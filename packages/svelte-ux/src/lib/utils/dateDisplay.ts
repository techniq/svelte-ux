import { format as format_fns } from 'date-fns';
import { formatDate, utcToLocalDate, PeriodType, type FormatDateOptions } from './date';

export type DateDisplayOptions = {
  periodType?: PeriodType | null;
  variant?: FormatDateOptions['variant'];
  format?: string;
  utc?: boolean;
};

export function dateDisplay(
  value: Date | string | number | null | undefined,
  options?: DateDisplayOptions
) {
  let date = value != null ? (value instanceof Date ? value : new Date(value)) : null;

  // Offset for UTC
  if (options?.utc) {
    date = utcToLocalDate(date);
  }

  let formattedDate = '';
  if (date) {
    if (options?.format) {
      formattedDate = format_fns(date, options?.format);
    } else if (options?.periodType) {
      formattedDate = formatDate(date, {
        periodType: options?.periodType,
        variant: options?.variant,
      });
    } else {
      formattedDate = date.toLocaleString();
    }
  }

  return formattedDate;
}
