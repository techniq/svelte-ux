import { DayOfWeek } from './date_types.js';

export function getWeekStartsOnFromIntl(locales?: string): DayOfWeek {
  if (!locales) {
    return DayOfWeek.Sunday;
  }

  const locale = new Intl.Locale(locales);
  // @ts-expect-error
  const weekInfo = locale.weekInfo ?? locale.getWeekInfo?.();
  return (weekInfo?.firstDay ?? 0) % 7; // (in Intl, sunday is 7 not 0, so we need to mod 7)
}
