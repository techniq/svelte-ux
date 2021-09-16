import { format as dateFormat } from 'date-fns';
import { formatDate, utcToLocalDate, PeriodType } from './date';

type DateDisplayOptions = {
  periodType?: PeriodType | null;
  variant?: Parameters<typeof formatDate>[2];
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
      formattedDate = dateFormat(date, options?.format);
    } else if (options?.periodType) {
      formattedDate = formatDate(date, options?.periodType, options?.variant);
    } else {
      formattedDate = date.toLocaleString();
    }
  }

  return formattedDate;
}
