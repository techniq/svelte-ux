import { startOfDay, isLeapYear, isAfter, isBefore, subYears } from 'date-fns';

import { getDateFuncsByPeriodType, updatePeriodTypeWithWeekStartsOn } from './date.js';
import { PeriodType } from './date_types.js';
import type { LocaleSettings } from './locale.js';

export type DateRange = {
  from: Date | null;
  to: Date | null;
  periodType?: PeriodType | null;
};

function formatMsg(
  settings: LocaleSettings,
  type:
    | 'PeriodDay'
    | 'PeriodWeek'
    | 'PeriodBiWeek'
    | 'PeriodMonth'
    | 'PeriodQuarter'
    | 'PeriodYear'
    | 'PeriodFiscalYear',
  lastX: number
) {
  return lastX === 0
    ? settings.dictionary.Date[type].Current
    : lastX === 1
      ? settings.dictionary.Date[type].Last
      : settings.dictionary.Date[type].LastX.replace('{0}', lastX.toString());
}

export function getDateRangePresets(
  settings: LocaleSettings,
  periodType: PeriodType
): { label: string; value: DateRange }[] {
  let now = new Date();
  const today = startOfDay(now);

  if (settings) {
    periodType =
      updatePeriodTypeWithWeekStartsOn(settings.formats.dates.weekStartsOn, periodType) ??
      periodType;
  }

  const { start, end, add } = getDateFuncsByPeriodType(settings, periodType);

  switch (periodType) {
    case PeriodType.Day: {
      const last = start(add(today, -1));

      return [0, 1, 3, 7, 14, 30].map((lastX) => {
        return {
          label: formatMsg(settings, 'PeriodDay', lastX),
          value: {
            from: add(last, -lastX + 1),
            to: lastX === 0 ? end(today) : end(last),
            periodType,
          },
        };
      });
    }

    case PeriodType.WeekSun:
    case PeriodType.WeekMon:
    case PeriodType.WeekTue:
    case PeriodType.WeekWed:
    case PeriodType.WeekThu:
    case PeriodType.WeekFri:
    case PeriodType.WeekSat: {
      const last = start(add(today, -1));

      return [0, 1, 2, 4, 6].map((lastX) => {
        return {
          label: formatMsg(settings, 'PeriodWeek', lastX),
          value: {
            from: add(last, -lastX + 1),
            to: lastX === 0 ? end(today) : end(last),
            periodType,
          },
        };
      });
    }

    case PeriodType.BiWeek1Sun:
    case PeriodType.BiWeek1Mon:
    case PeriodType.BiWeek1Tue:
    case PeriodType.BiWeek1Wed:
    case PeriodType.BiWeek1Thu:
    case PeriodType.BiWeek1Fri:
    case PeriodType.BiWeek1Sat:
    case PeriodType.BiWeek2Sun:
    case PeriodType.BiWeek2Mon:
    case PeriodType.BiWeek2Tue:
    case PeriodType.BiWeek2Wed:
    case PeriodType.BiWeek2Thu:
    case PeriodType.BiWeek2Fri:
    case PeriodType.BiWeek2Sat: {
      const last = start(add(today, -1));

      return [0, 1, 2, 4, 6].map((lastX) => {
        return {
          label: formatMsg(settings, 'PeriodBiWeek', lastX),
          value: {
            from: add(last, -lastX + 1),
            to: lastX === 0 ? end(today) : end(last),
            periodType,
          },
        };
      });
    }

    case PeriodType.Month: {
      const last = start(add(today, -1));

      return [0, 1, 2, 3, 6, 12].map((lastX) => {
        return {
          label: formatMsg(settings, 'PeriodMonth', lastX),
          value: {
            from: add(last, -lastX + 1),
            to: lastX === 0 ? end(today) : end(last),
            periodType,
          },
        };
      });
    }

    case PeriodType.Quarter: {
      const last = start(add(today, -1));

      return [0, 1, -1, 4, 12].map((lastX) => {
        // Special thing
        if (lastX === -1) {
          return {
            label: settings.dictionary.Date.PeriodQuarterSameLastyear,
            value: {
              from: start(add(today, -4)),
              to: end(add(today, -4)),
              periodType,
            },
          };
        }

        return {
          label: formatMsg(settings, 'PeriodQuarter', lastX),
          value: {
            from: add(last, -lastX + 1),
            to: lastX === 0 ? end(today) : end(last),
            periodType,
          },
        };
      });
    }

    case PeriodType.CalendarYear: {
      const last = start(add(today, -1));

      return [0, 1, 3, 5].map((lastX) => {
        return {
          label: formatMsg(settings, 'PeriodYear', lastX),
          value: {
            from: add(last, -lastX + 1),
            to: lastX === 0 ? end(today) : end(last),
            periodType,
          },
        };
      });
    }

    case PeriodType.FiscalYearOctober: {
      const last = start(add(today, -1));

      return [0, 1, 3, 5].map((lastX) => {
        return {
          label: formatMsg(settings, 'PeriodFiscalYear', lastX),
          value: {
            from: add(last, -lastX + 1),
            to: lastX === 0 ? end(today) : end(last),
            periodType,
          },
        };
      });
    }

    default: {
      return [];
    }
  }
}

export function getPreviousYearPeriodOffset(
  periodType: PeriodType,
  options?: {
    referenceDate?: Date;
    alignDayOfWeek?: boolean;
  }
) {
  switch (periodType) {
    case PeriodType.Day:
      // If year of reference date is a leap year and is on/after 2/29
      // or
      // if year before reference date is a leap year and is before 2/29
      const adjustForLeapYear = options?.referenceDate
        ? (isLeapYear(options?.referenceDate) &&
            isAfter(
              options?.referenceDate,
              new Date(options?.referenceDate.getFullYear(), /*Feb*/ 1, 28)
            )) ||
          (isLeapYear(subYears(options?.referenceDate, 1)) &&
            isBefore(
              options?.referenceDate,
              new Date(options?.referenceDate.getFullYear(), /*Feb*/ 1, 29)
            ))
        : false;

      return options?.alignDayOfWeek
        ? -364 // Align day of week is always 364 days (52 *7).
        : adjustForLeapYear
          ? -366
          : -365;

    case PeriodType.WeekSun:
    case PeriodType.WeekMon:
    case PeriodType.WeekTue:
    case PeriodType.WeekWed:
    case PeriodType.WeekThu:
    case PeriodType.WeekFri:
    case PeriodType.WeekSat:
      return -52;

    case PeriodType.BiWeek1Sun:
    case PeriodType.BiWeek1Mon:
    case PeriodType.BiWeek1Tue:
    case PeriodType.BiWeek1Wed:
    case PeriodType.BiWeek1Thu:
    case PeriodType.BiWeek1Fri:
    case PeriodType.BiWeek1Sat:
    case PeriodType.BiWeek2Sun:
    case PeriodType.BiWeek2Mon:
    case PeriodType.BiWeek2Tue:
    case PeriodType.BiWeek2Wed:
    case PeriodType.BiWeek2Thu:
    case PeriodType.BiWeek2Fri:
    case PeriodType.BiWeek2Sat:
      return -26;

    case PeriodType.Month:
      return -12;

    case PeriodType.Quarter:
      return -4;

    case PeriodType.CalendarYear:
    case PeriodType.FiscalYearOctober:
      return -1;
  }
}

export type PeriodComparison = 'prevPeriod' | 'prevYear' | 'fiftyTwoWeeksAgo';

export function getPeriodComparisonOffset(
  settings: LocaleSettings,
  view: PeriodComparison,
  period: DateRange | undefined
) {
  if (period == null || period.from == null || period.to == null || period.periodType == null) {
    throw new Error('Period must be defined to calculate offset');
  }

  switch (view) {
    case 'prevPeriod':
      const dateFuncs = getDateFuncsByPeriodType(settings, period.periodType);
      return dateFuncs.difference(period.from, period.to) - 1; // Difference counts full days, need additoinal offset

    case 'prevYear':
      return getPreviousYearPeriodOffset(period.periodType, {
        referenceDate: period.from,
      });

    case 'fiftyTwoWeeksAgo':
      return getPreviousYearPeriodOffset(period.periodType, {
        alignDayOfWeek: true,
      });

    default:
      throw new Error('Unhandled period offset: ' + view);
  }
}
