import {
  format,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfQuarter,
  endOfQuarter,
  startOfYear,
  endOfYear,
  min,
  max,
  addMonths,
  addDays,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInQuarters,
  differenceInYears,
  addWeeks,
  addQuarters,
  addYears,
  isSameDay,
  isSameWeek,
  isSameMonth,
  isSameQuarter,
  isSameYear,
  parseISO,
  formatISO,
} from 'date-fns';

import { hasKeyOf } from '../types/typeGuards';
import { chunk } from './array';
import type { DateRange } from './dateRange';

export type SelectedDate = Date | Date[] | DateRange | null;

export type Period = {
  start: Date;
  end: Date;
  periodTypeId: PeriodType;
};

export enum PeriodType {
  Day = 10,

  WeekSun = 20,
  WeekMon = 21,
  WeekTue = 22,
  WeekWed = 23,
  WeekThu = 24,
  WeekFri = 25,
  WeekSat = 26,

  Month = 30,
  Quarter = 40,
  CalendarYear = 50,
  FiscalYearOctober = 60,

  BiWeek1Sun = 70,
  BiWeek1Mon = 71,
  BiWeek1Tue = 72,
  BiWeek1Wed = 73,
  BiWeek1Thu = 74,
  BiWeek1Fri = 75,
  BiWeek1Sat = 76,

  BiWeek2Sun = 80,
  BiWeek2Mon = 81,
  BiWeek2Tue = 82,
  BiWeek2Wed = 83,
  BiWeek2Thu = 84,
  BiWeek2Fri = 85,
  BiWeek2Sat = 86,
}

export enum DayOfWeek {
  SUN,
  MON,
  TUE,
  WED,
  THU,
  FRI,
  SAT,
}

export function getPeriodTypeName(periodType: PeriodType) {
  switch (periodType) {
    case PeriodType.Day:
      return 'Day';

    case PeriodType.WeekSun:
      return 'Week (Sun)';
    case PeriodType.WeekMon:
      return 'Week (Mon)';
    case PeriodType.WeekTue:
      return 'Week (Tue)';
    case PeriodType.WeekWed:
      return 'Week (Wed)';
    case PeriodType.WeekThu:
      return 'Week (Thu)';
    case PeriodType.WeekFri:
      return 'Week (Fri)';
    case PeriodType.WeekSat:
      return 'Week (Sat)';

    case PeriodType.Month:
      return 'Month';
    case PeriodType.Quarter:
      return 'Quarter';
    case PeriodType.CalendarYear:
      return 'Calendar Year';
    case PeriodType.FiscalYearOctober:
      return 'Fiscal Year (Oct)';

    case PeriodType.BiWeek1Sun:
      return 'Bi-Week (Sun)';
    case PeriodType.BiWeek1Mon:
      return 'Bi-Week (Mon)';
    case PeriodType.BiWeek1Tue:
      return 'Bi-Week (Tue)';
    case PeriodType.BiWeek1Wed:
      return 'Bi-Week (Wed)';
    case PeriodType.BiWeek1Thu:
      return 'Bi-Week (Thu)';
    case PeriodType.BiWeek1Fri:
      return 'Bi-Week (Fri)';
    case PeriodType.BiWeek1Sat:
      return 'Bi-Week (Sat)';

    case PeriodType.BiWeek2Sun:
      return 'Bi-Week 2 (Sun)';
    case PeriodType.BiWeek2Mon:
      return 'Bi-Week 2 (Mon)';
    case PeriodType.BiWeek2Tue:
      return 'Bi-Week 2 (Tue)';
    case PeriodType.BiWeek2Wed:
      return 'Bi-Week 2 (Wed)';
    case PeriodType.BiWeek2Thu:
      return 'Bi-Week 2 (Thu)';
    case PeriodType.BiWeek2Fri:
      return 'Bi-Week 2 (Fri)';
    case PeriodType.BiWeek2Sat:
      return 'Bi-Week 2 (Sat)';

    default:
      return 'Unknown';
  }
}

export function getPeriodTypeCode(periodType: PeriodType) {
  switch (periodType) {
    case PeriodType.Day:
      return 'DAY';

    case PeriodType.WeekSun:
      return 'WEEK-SUN';
    case PeriodType.WeekMon:
      return 'WEEK-MON';
    case PeriodType.WeekTue:
      return 'WEEK-TUE';
    case PeriodType.WeekWed:
      return 'WEEK-WED';
    case PeriodType.WeekThu:
      return 'WEEK-THU';
    case PeriodType.WeekFri:
      return 'WEEK-FRI';
    case PeriodType.WeekSat:
      return 'WEEK-SAT';

    case PeriodType.Month:
      return 'MTH';
    case PeriodType.Quarter:
      return 'QTR';
    case PeriodType.CalendarYear:
      return 'CY';
    case PeriodType.FiscalYearOctober:
      return 'FY-OCT';

    case PeriodType.BiWeek1Sun:
      return 'BIWEEK1-SUN';
    case PeriodType.BiWeek1Mon:
      return 'BIWEEK1-MON';
    case PeriodType.BiWeek1Tue:
      return 'BIWEEK1-TUE';
    case PeriodType.BiWeek1Wed:
      return 'BIWEEK1-WED';
    case PeriodType.BiWeek1Thu:
      return 'BIWEEK1-THU';
    case PeriodType.BiWeek1Fri:
      return 'BIWEEK1-FRI';
    case PeriodType.BiWeek1Sat:
      return 'BIWEEK1-SAT';

    case PeriodType.BiWeek2Sun:
      return 'BIWEEK2-SUN';
    case PeriodType.BiWeek2Mon:
      return 'BIWEEK2-MON';
    case PeriodType.BiWeek2Tue:
      return 'BIWEEK2-TUE';
    case PeriodType.BiWeek2Wed:
      return 'BIWEEK2-WED';
    case PeriodType.BiWeek2Thu:
      return 'BIWEEK2-THU';
    case PeriodType.BiWeek2Fri:
      return 'BIWEEK2-FRI';
    case PeriodType.BiWeek2Sat:
      return 'BIWEEK2-SAT';

    default:
      return 'UNK';
  }
}

export function getPeriodTypeByCode(code: string) {
  switch (code) {
    case 'DAY':
      return PeriodType.Day;

    case 'WEEK-SUN':
      return PeriodType.WeekSun;
    case 'WEEK-MON':
      return PeriodType.WeekMon;
    case 'WEEK-TUE':
      return PeriodType.WeekTue;
    case 'WEEK-WED':
      return PeriodType.WeekWed;
    case 'WEEK-THU':
      return PeriodType.WeekThu;
    case 'WEEK-FRI':
      return PeriodType.WeekFri;
    case 'WEEK-SAT':
      return PeriodType.WeekSat;

    case 'MTH':
      return PeriodType.Month;
    case 'QTR':
      return PeriodType.Quarter;
    case 'CY':
      return PeriodType.CalendarYear;
    case 'FY-OCT':
      return PeriodType.FiscalYearOctober;

    case 'BIWEEK1-SUN':
      return PeriodType.BiWeek1Sun;
    case 'BIWEEK1-MON':
      return PeriodType.BiWeek1Mon;
    case 'BIWEEK1-TUE':
      return PeriodType.BiWeek1Tue;
    case 'BIWEEK1-WED':
      return PeriodType.BiWeek1Wed;
    case 'BIWEEK1-THU':
      return PeriodType.BiWeek1Thu;
    case 'BIWEEK1-FRI':
      return PeriodType.BiWeek1Fri;
    case 'BIWEEK1-SAT':
      return PeriodType.BiWeek1Sat;

    default:
      return null;
  }
}

export function getDayOfWeek(periodType: PeriodType) {
  const periodTypeCode = getPeriodTypeCode(periodType);
  const matches = periodTypeCode.match(/\-(SUN|MON|TUE|WED|THU|FRI|SAT)/);
  if (matches) {
    return DayOfWeek[matches[1] as keyof typeof DayOfWeek];
  } else {
    return null;
  }
}

export function replaceDayOfWeek(periodType: PeriodType, dayOfWeek: DayOfWeek) {
  const periodTypeCode = getPeriodTypeCode(periodType);
  const dayOfWeekName = DayOfWeek[dayOfWeek];
  // Replace everything after `-` with new dayOfWeek
  const newPeriodTypeCode = periodTypeCode.replace(/\-(.*)/, `-${dayOfWeekName}`);
  return getPeriodTypeByCode(newPeriodTypeCode);
}

export function hasDayOfWeek(periodType: PeriodType) {
  const periodTypeCode = getPeriodTypeCode(periodType);
  return /\-(SUN|MON|TUE|WED|THU|FRI|SAT)/.test(periodTypeCode);
}

export function getMonths(year = new Date().getFullYear()) {
  return Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));
}

export function getMonthDaysByWeek(
  dateInTheMonth: Date,
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined = undefined
): Date[][] {
  const startOfFirstWeek = startOfWeek(startOfMonth(dateInTheMonth), { weekStartsOn });
  const endOfLastWeek = endOfWeek(endOfMonth(dateInTheMonth), { weekStartsOn });

  const list = [];

  let valueToAdd = startOfFirstWeek;
  while (valueToAdd <= endOfLastWeek) {
    list.push(valueToAdd);
    valueToAdd = addDays(valueToAdd, 1);
  }

  return chunk(list, 7) as Date[][];
}

export function getMinSelectedDate(date: SelectedDate | null | undefined) {
  if (date instanceof Date) {
    return date;
  } else if (date instanceof Array) {
    return min(date);
  } else if (hasKeyOf<{ from: Date }>(date, 'from')) {
    return date.from;
  } else {
    return null;
  }
}

export function getMaxSelectedDate(date: SelectedDate | null | undefined) {
  if (date instanceof Date) {
    return date;
  } else if (date instanceof Array) {
    return max(date);
  } else if (hasKeyOf<{ from: Date }>(date, 'to')) {
    return date.to;
  } else {
    return null;
  }
}

/*
 * Fiscal Year
 */

export function getFiscalYear(date: Date | null = new Date(), options?: { startMonth?: number }) {
  if (date === null) {
    // null explicitly passed in (default value overridden)
    return NaN;
  }

  const startMonth = (options && options.startMonth) || 10;
  return date.getMonth() >= startMonth - 1 ? date.getFullYear() + 1 : date.getFullYear();
}

export function getFiscalYearRange(
  date = new Date(),
  options?: { startMonth?: number; numberOfMonths?: number }
) {
  const fiscalYear = getFiscalYear(date, options);
  const startMonth = (options && options.startMonth) || 10;
  const numberOfMonths = (options && options.numberOfMonths) || 12;

  const startDate = new Date((fiscalYear || 0) - 1, startMonth - 1, 1);
  const endDate = endOfMonth(addMonths(startDate, numberOfMonths - 1));

  return { startDate, endDate };
}

export function startOfFiscalYear(date: Date, options?: Parameters<typeof getFiscalYearRange>[1]) {
  return getFiscalYearRange(date, options).startDate;
}

export function endOfFiscalYear(date: Date, options?: Parameters<typeof getFiscalYearRange>[1]) {
  return getFiscalYearRange(date, options).endDate;
}

export function isSameFiscalYear(dateLeft: Date, dateRight: Date) {
  return getFiscalYear(dateLeft) === getFiscalYear(dateRight);
}

/*
 * Bi-Weekly
 */

const biweekBaseDates = [new Date('1799-12-22T00:00'), new Date('1799-12-15T00:00')];

export function startOfBiWeek(date: Date, week: number, startOfWeek: DayOfWeek) {
  var weekBaseDate = biweekBaseDates[week - 1];
  var baseDate = addDays(weekBaseDate, startOfWeek);
  var periodsSince = Math.floor(differenceInDays(date, baseDate) / 14);
  return addDays(baseDate, periodsSince * 14);
}

export function endOfBiWeek(date: Date, week: number, startOfWeek: DayOfWeek) {
  return addDays(startOfBiWeek(date, week, startOfWeek), 13);
}

export function getDateFuncsByPeriodType(periodType: PeriodType | null | undefined) {
  switch (periodType) {
    case PeriodType.Day:
      return {
        start: startOfDay,
        end: endOfDay,
        add: addDays,
        difference: differenceInDays,
        isSame: isSameDay,
      };

    case PeriodType.WeekSun:
      return {
        start: startOfWeek,
        end: endOfWeek,
        add: addWeeks,
        difference: differenceInWeeks,
        isSame: isSameWeek,
      };
    case PeriodType.WeekMon:
      return {
        start: (date: Date) => startOfWeek(date, { weekStartsOn: 1 }),
        end: (date: Date) => endOfWeek(date, { weekStartsOn: 1 }),
        add: addWeeks,
        difference: differenceInWeeks,
        isSame: (dateLeft: Date, dateRight: Date) =>
          isSameWeek(dateLeft, dateRight, { weekStartsOn: 1 }),
      };
    case PeriodType.WeekTue:
      return {
        start: (date: Date) => startOfWeek(date, { weekStartsOn: 2 }),
        end: (date: Date) => endOfWeek(date, { weekStartsOn: 2 }),
        add: addWeeks,
        difference: differenceInWeeks,
        isSame: (dateLeft: Date, dateRight: Date) =>
          isSameWeek(dateLeft, dateRight, { weekStartsOn: 2 }),
      };
    case PeriodType.WeekWed:
      return {
        start: (date: Date) => startOfWeek(date, { weekStartsOn: 3 }),
        end: (date: Date) => endOfWeek(date, { weekStartsOn: 3 }),
        add: addWeeks,
        difference: differenceInWeeks,
        isSame: (dateLeft: Date, dateRight: Date) =>
          isSameWeek(dateLeft, dateRight, { weekStartsOn: 3 }),
      };
    case PeriodType.WeekThu:
      return {
        start: (date: Date) => startOfWeek(date, { weekStartsOn: 4 }),
        end: (date: Date) => endOfWeek(date, { weekStartsOn: 4 }),
        add: addWeeks,
        difference: differenceInWeeks,
        isSame: (dateLeft: Date, dateRight: Date) =>
          isSameWeek(dateLeft, dateRight, { weekStartsOn: 4 }),
      };
    case PeriodType.WeekFri:
      return {
        start: (date: Date) => startOfWeek(date, { weekStartsOn: 5 }),
        end: (date: Date) => endOfWeek(date, { weekStartsOn: 5 }),
        add: addWeeks,
        difference: differenceInWeeks,
        isSame: (dateLeft: Date, dateRight: Date) =>
          isSameWeek(dateLeft, dateRight, { weekStartsOn: 5 }),
      };
    case PeriodType.WeekSat:
      return {
        start: (date: Date) => startOfWeek(date, { weekStartsOn: 6 }),
        end: (date: Date) => endOfWeek(date, { weekStartsOn: 6 }),
        add: addWeeks,
        difference: differenceInWeeks,
        isSame: (dateLeft: Date, dateRight: Date) =>
          isSameWeek(dateLeft, dateRight, { weekStartsOn: 6 }),
      };

    case PeriodType.Month:
      return {
        start: startOfMonth,
        end: endOfMonth,
        add: addMonths,
        difference: differenceInMonths,
        isSame: isSameMonth,
      };
    case PeriodType.Quarter:
      return {
        start: startOfQuarter,
        end: endOfQuarter,
        add: addQuarters,
        difference: differenceInQuarters,
        isSame: isSameQuarter,
      };
    case PeriodType.CalendarYear:
      return {
        start: startOfYear,
        end: endOfYear,
        add: addYears,
        difference: differenceInYears,
        isSame: isSameYear,
      };
    case PeriodType.FiscalYearOctober:
      return {
        start: startOfFiscalYear,
        end: endOfFiscalYear,
        add: addYears,
        difference: differenceInYears,
        isSame: isSameFiscalYear,
      };

    // BiWeek 1
    case PeriodType.BiWeek1Sun:
    case PeriodType.BiWeek1Mon:
    case PeriodType.BiWeek1Tue:
    case PeriodType.BiWeek1Wed:
    case PeriodType.BiWeek1Thu:
    case PeriodType.BiWeek1Fri:
    case PeriodType.BiWeek1Sat:
    // BiWeek 2
    case PeriodType.BiWeek2Sun:
    case PeriodType.BiWeek2Mon:
    case PeriodType.BiWeek2Tue:
    case PeriodType.BiWeek2Wed:
    case PeriodType.BiWeek2Thu:
    case PeriodType.BiWeek2Fri:
    case PeriodType.BiWeek2Sat: {
      const week = getPeriodTypeCode(periodType).startsWith('BIWEEK1') ? 1 : 2;
      const dayOfWeek = getDayOfWeek(periodType)!;
      return {
        start: (date: Date) => startOfBiWeek(date, week, dayOfWeek),
        end: (date: Date) => endOfBiWeek(date, week, dayOfWeek),
        add: (date: Date, amount: number) => addWeeks(date, amount * 2),
        difference: (dateLeft: Date, dateRight: Date) => {
          return differenceInWeeks(dateLeft, dateRight) / 2;
        },
        isSame: (dateLeft: Date, dateRight: Date) => {
          return isSameDay(
            startOfBiWeek(dateLeft, week, dayOfWeek),
            startOfBiWeek(dateRight, week, dayOfWeek)
          );
        },
      };
    }

    default:
      // Default to end of day if periodType == null, etc
      return {
        start: startOfDay,
        end: endOfDay,
        add: addDays,
        difference: differenceInDays,
        isSame: isSameDay,
      };
  }
}

export function formatISODate(
  date: Date | string | null | undefined,
  representation: 'complete' | 'date' | 'time' = 'complete'
) {
  if (date == null) {
    return '';
  }

  if (typeof date === 'string') {
    date = parseISO(date);
  }

  return formatISO(date, { representation });
}

function range(
  date: Date,
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined,
  variant: 'short' | 'long',
  formats: { short: string; long: string },
  biWeek: undefined | 1 | 2 = undefined // undefined means that it's not a bi-week
) {
  const start =
    biWeek === undefined
      ? startOfWeek(date, { weekStartsOn })
      : startOfBiWeek(date, biWeek, weekStartsOn ?? 0);
  const end =
    biWeek === undefined
      ? endOfWeek(date, { weekStartsOn })
      : endOfBiWeek(date, biWeek, weekStartsOn ?? 0);

  const formatToUse = variant === 'short' ? formats.short : formats.long;

  return format(start, formatToUse) + ' - ' + format(end, formatToUse);
}

export function formatDate(
  date: Date | string | null | undefined,
  periodType?: PeriodType | null | undefined,
  variant?: 'short' | 'long' // TODO: Support x-long, etc (maybe call it sm, md, lg, xl, etc)
): string {
  variant = variant ?? 'long';

  if (typeof date === 'string') {
    date = parseISO(date);
  }

  // Handle 'Invalid Date'
  // @ts-ignore - Date is a number (see: https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript)
  if (date == null || isNaN(date)) {
    return '';
  }

  const formatsDay: { short: string; long: string } = { short: 'M/d', long: 'MMM d, yyyy' };
  const formatsWeek: { short: string; long: string } = { short: 'M/d', long: 'M/d/yyyy' };
  const formatsMonth: { short: string; long: string } = { short: 'MMM yyyy', long: 'MMMM yyyy' };
  const formatsYear: { short: string; long: string } = { short: 'yy', long: 'yyyy' };

  switch (periodType) {
    case PeriodType.Day:
      return variant === 'short' ? format(date, formatsDay.short) : format(date, formatsDay.long);

    case PeriodType.WeekSun:
      return range(date, 0, variant, formatsWeek);
    case PeriodType.WeekMon:
      return range(date, 1, variant, formatsWeek);
    case PeriodType.WeekTue:
      return range(date, 2, variant, formatsWeek);
    case PeriodType.WeekWed:
      return range(date, 3, variant, formatsWeek);
    case PeriodType.WeekThu:
      return range(date, 4, variant, formatsWeek);
    case PeriodType.WeekFri:
      return range(date, 5, variant, formatsWeek);
    case PeriodType.WeekSat:
      return range(date, 6, variant, formatsWeek);

    case PeriodType.Month:
      return variant === 'short'
        ? format(date, formatsMonth.short)
        : format(date, formatsMonth.long);

    case PeriodType.Quarter:
      return variant === 'short'
        ? format(startOfQuarter(date), 'MMM') +
            ' - ' +
            format(endOfQuarter(date), formatsMonth.short)
        : format(startOfQuarter(date), 'MMMM') +
            ' - ' +
            format(endOfQuarter(date), formatsMonth.long);

    case PeriodType.CalendarYear:
      return variant === 'short' ? format(date, formatsYear.short) : format(date, formatsYear.long);

    case PeriodType.FiscalYearOctober:
      return variant === 'short' ? `${getFiscalYear(date)}`.substring(2) : `${getFiscalYear(date)}`;

    case PeriodType.BiWeek1Sun:
      return range(date, 0, variant, formatsWeek, 1);
    case PeriodType.BiWeek1Mon:
      return range(date, 1, variant, formatsWeek, 1);
    case PeriodType.BiWeek1Tue:
      return range(date, 2, variant, formatsWeek, 1);
    case PeriodType.BiWeek1Wed:
      return range(date, 3, variant, formatsWeek, 1);
    case PeriodType.BiWeek1Thu:
      return range(date, 4, variant, formatsWeek, 1);
    case PeriodType.BiWeek1Fri:
      return range(date, 5, variant, formatsWeek, 1);
    case PeriodType.BiWeek1Sat:
      return range(date, 6, variant, formatsWeek, 1);

    case PeriodType.BiWeek2Sun:
      return range(date, 0, variant, formatsWeek, 2);
    case PeriodType.BiWeek2Mon:
      return range(date, 1, variant, formatsWeek, 2);
    case PeriodType.BiWeek2Tue:
      return range(date, 2, variant, formatsWeek, 2);
    case PeriodType.BiWeek2Wed:
      return range(date, 3, variant, formatsWeek, 2);
    case PeriodType.BiWeek2Thu:
      return range(date, 4, variant, formatsWeek, 2);
    case PeriodType.BiWeek2Fri:
      return range(date, 5, variant, formatsWeek, 2);
    case PeriodType.BiWeek2Sat:
      return range(date, 6, variant, formatsWeek, 2);

    default:
      return formatISO(date);
  }
}

/**
 * Return new Date using UTC date/time as local date/time
 */
export function utcToLocalDate(date: Date | string | null | undefined) {
  date = date instanceof Date ? date : typeof date === 'string' ? new Date(date) : new Date();

  // https://github.com/date-fns/date-fns/issues/376#issuecomment-454163253
  // return new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
  const d = new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
  d.setUTCFullYear(date.getUTCFullYear());
  return d;
}

/**
 * Return new Date using local date/time as UTC date/time
 */
export function localToUtcDate(date: Date | string | null | undefined) {
  date = date instanceof Date ? date : typeof date === 'string' ? new Date(date) : new Date();

  // return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);

  const d = new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    )
  );
  return d;
}

/**
 * Generate a random Date between `from` and `to` (exclusive)
 */
export function randomDate(from: Date, to: Date) {
  const fromTime = from.getTime();
  const toTime = to.getTime();
  return new Date(fromTime + Math.random() * (toTime - fromTime));
}
