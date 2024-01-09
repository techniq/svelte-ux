import { DayOfWeek } from './date_types';

export function getWeekStartsOnFromIntl(locales?: string): DayOfWeek {
  if (!locales) {
    return DayOfWeek.Sunday;
  }

  const info = new Intl.Locale(locales);
  // @ts-ignore
  return (info.weekInfo.firstDay ?? 0) % 7; // (in Intl, sunday is 7 not 0, so we need to mod 7)
}
