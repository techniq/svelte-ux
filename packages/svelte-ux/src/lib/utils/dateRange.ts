import { startOfDay, isLeapYear, isAfter, isBefore, subYears } from 'date-fns';

import { getDateFuncsByPeriodType, PeriodType } from './date';

export type DateRange = {
  from: Date | null;
  to: Date | null;
  periodType?: PeriodType | null;
};

export const dayPresets = getDateRangePresets(PeriodType.Day);
export const biWeekSun1Presets = getDateRangePresets(PeriodType.BiWeek1Sun);
export const biWeekMon1Presets = getDateRangePresets(PeriodType.BiWeek1Mon);
export const monthPresets = getDateRangePresets(PeriodType.Month);
export const quarterPresets = getDateRangePresets(PeriodType.Quarter);
export const fiscalYearPresets = getDateRangePresets(PeriodType.FiscalYearOctober);

const now = new Date();

export function getDateRangePresets(periodType: PeriodType): { label: string; value: DateRange }[] {
  let now = new Date();
  const today = startOfDay(now);
  const { start, end, add } = getDateFuncsByPeriodType(periodType);

  switch (periodType) {
    case PeriodType.Day: {
      const yesterday = start(add(today, -1));

      return [
        {
          label: 'Today', // Current Day
          value: {
            from: today,
            to: end(today),
            periodType,
          },
        },
        {
          label: 'Yesterday', // Last Day
          value: {
            from: yesterday,
            to: end(yesterday),
            periodType,
          },
        },
        {
          label: 'Last 3 days',
          value: {
            from: add(yesterday, -2),
            to: end(yesterday),
            periodType,
          },
        },
        {
          label: 'Last 7 days',
          value: {
            from: add(yesterday, -6),
            to: end(yesterday),
            periodType,
          },
        },
        {
          label: 'Last 14 days',
          value: {
            from: add(yesterday, -13),
            to: end(yesterday),
            periodType,
          },
        },
        {
          label: 'Last 30 days',
          value: {
            from: add(yesterday, -29),
            to: end(yesterday),
            periodType,
          },
        },
        // {
        //   label: 'Last 60 days',
        //   value: {
        //     from: add(yesterday, -59),
        //     to: end(yesterday),
        //     periodType,
        //   },
        // },
        // {
        //   label: 'Last 90 days',
        //   value: {
        //     from: add(yesterday, -89),
        //     to: end(yesterday),
        //     periodType,
        //   },
        // },
      ];
    }

    case PeriodType.WeekSun:
    case PeriodType.WeekMon:
    case PeriodType.WeekTue:
    case PeriodType.WeekWed:
    case PeriodType.WeekThu:
    case PeriodType.WeekFri:
    case PeriodType.WeekSat: {
      const lastWeek = start(add(today, -1));

      return [
        {
          label: 'Current week', // Week to Date
          value: {
            from: start(today),
            to: end(today),
            periodType,
          },
        },
        {
          label: 'Last week', // Week to Date
          value: {
            from: lastWeek,
            to: end(lastWeek),
            periodType,
          },
        },
        {
          label: 'Last 2 weeks',
          value: {
            from: start(add(lastWeek, -1)),
            to: end(lastWeek),
            periodType,
          },
        },
        {
          label: 'Last 4 weeks',
          value: {
            from: start(add(lastWeek, -3)),
            to: end(lastWeek),
            periodType,
          },
        },
        {
          label: 'Last 6 weeks',
          value: {
            from: start(add(lastWeek, -5)),
            to: end(lastWeek),
            periodType,
          },
        },
      ];
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
      const lastBiWeek = start(add(today, -1));

      return [
        {
          label: 'Current bi-week',
          value: {
            from: start(today),
            to: end(today),
            periodType,
          },
        },
        {
          label: 'Last bi-week',
          value: {
            from: lastBiWeek,
            to: end(lastBiWeek),
            periodType,
          },
        },
        {
          label: 'Last 2 bi-weeks',
          value: {
            from: start(add(lastBiWeek, -1)),
            to: end(lastBiWeek),
            periodType,
          },
        },
        {
          label: 'Last 4 bi-weeks',
          value: {
            from: start(add(lastBiWeek, -3)),
            to: end(lastBiWeek),
            periodType,
          },
        },
        {
          label: 'Last 6 bi-weeks',
          value: {
            from: start(add(lastBiWeek, -5)),
            to: end(lastBiWeek),
            periodType,
          },
        },
      ];
    }

    case PeriodType.Month: {
      const lastMonth = start(add(today, -1));

      return [
        {
          label: 'Current month', // Month to Date
          value: {
            from: start(today),
            to: end(today),
            periodType,
          },
        },
        {
          label: 'Last month',
          value: {
            from: lastMonth,
            to: end(lastMonth),
            periodType,
          },
        },
        {
          label: 'Last 3 months',
          value: {
            from: start(add(lastMonth, -2)),
            to: end(lastMonth),
            periodType,
          },
        },
        {
          label: 'Last 6 months',
          value: {
            from: start(add(lastMonth, -5)),
            to: end(lastMonth),
            periodType,
          },
        },
        {
          label: 'Last 12 months',
          value: {
            from: start(add(lastMonth, -11)),
            to: end(lastMonth),
            periodType,
          },
        },
      ];
    }

    case PeriodType.Quarter: {
      const lastQuarter = start(add(today, -1));

      return [
        {
          label: 'Current quarter', // Quarter to Date
          value: {
            from: start(today),
            to: end(today),
            periodType,
          },
        },
        {
          label: 'Last quarter',
          value: {
            from: lastQuarter,
            to: end(lastQuarter),
            periodType,
          },
        },
        {
          label: 'Same quarter, last year',
          value: {
            from: start(add(today, -4)),
            to: end(add(today, -4)),
            periodType,
          },
        },
        {
          label: 'Last 4 quarters',
          value: {
            from: start(add(lastQuarter, -3)),
            to: end(lastQuarter),
            periodType,
          },
        },
        {
          label: 'Last 3 years',
          value: {
            from: start(add(lastQuarter, -11)),
            to: end(lastQuarter),
            periodType,
          },
        },
      ];
    }

    case PeriodType.CalendarYear: {
      const lastYear = start(add(today, -1));

      return [
        {
          label: 'Current year', // Year to Date
          value: {
            from: start(today),
            to: end(today),
            periodType,
          },
        },
        {
          label: 'Last year',
          value: {
            from: lastYear,
            to: end(lastYear),
            periodType,
          },
        },
        {
          label: 'Last 3 years',
          value: {
            from: start(add(lastYear, -2)),
            to: end(lastYear),
            periodType,
          },
        },
        {
          label: 'Last 5 years',
          value: {
            from: start(add(lastYear, -4)),
            to: end(lastYear),
            periodType,
          },
        },
      ];
    }

    case PeriodType.FiscalYearOctober: {
      const lastFiscalYear = start(add(today, -1));

      return [
        {
          label: 'Current fiscal year', // Fiscal Year to Date
          value: {
            from: start(today),
            to: end(today),
            periodType,
          },
        },
        {
          label: 'Last fiscal year',
          value: {
            from: lastFiscalYear,
            to: end(lastFiscalYear),
            periodType,
          },
        },
        {
          label: 'Last 3 years',
          value: {
            from: start(add(lastFiscalYear, -2)),
            to: end(lastFiscalYear),
            periodType,
          },
        },
        {
          label: 'Last 5 years',
          value: {
            from: start(add(lastFiscalYear, -4)),
            to: end(lastFiscalYear),
            periodType,
          },
        },
      ];
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

export function getPeriodComparisonOffset(view: PeriodComparison, period: DateRange | undefined) {
  if (period == null || period.from == null || period.to == null || period.periodType == null) {
    throw new Error('Period must be defined to calculate offset');
  }

  switch (view) {
    case 'prevPeriod':
      const dateFuncs = getDateFuncsByPeriodType(period.periodType);
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
