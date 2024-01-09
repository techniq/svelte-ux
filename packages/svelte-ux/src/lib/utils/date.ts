import {
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
import {
  PeriodType,
  DayOfWeek,
  DateToken,
  type SelectedDate,
  type CustomIntlDateTimeFormatOptions,
  type FormatDateOptions,
  type DateFormatVariantPreset,
} from './date_types';
import { defaultLocale, type LocaleSettings } from './locale';

export * from './date_types';

export function getDayOfWeekName(weekStartsOn: DayOfWeek, locales: string) {
  // Create a date object for a specific day (0 = Sunday, 1 = Monday, etc.)
  // And "7 of Jan 2024" is a Sunday
  const date = new Date(2024, 0, 7 + weekStartsOn);
  const formatter = new Intl.DateTimeFormat(locales, { weekday: 'short' });
  return formatter.format(date);
}

export function getPeriodTypeName(periodType: PeriodType) {
  return getPeriodTypeNameWithLocale(defaultLocale, periodType);
}

export function getPeriodTypeNameWithLocale(settings: LocaleSettings, periodType: PeriodType) {
  const {
    locale: locale,
    dictionary: { Date: dico },
  } = settings;

  switch (periodType) {
    case PeriodType.Day:
      return dico?.Day;

    case PeriodType.WeekSun:
      return `${dico.Week} (${getDayOfWeekName(DayOfWeek.Sunday, locale)})`;
    case PeriodType.WeekMon:
      return `${dico.Week} (${getDayOfWeekName(1, locale)})`;
    case PeriodType.WeekTue:
      return `${dico.Week} (${getDayOfWeekName(2, locale)})`;
    case PeriodType.WeekWed:
      return `${dico.Week} (${getDayOfWeekName(3, locale)})`;
    case PeriodType.WeekThu:
      return `${dico.Week} (${getDayOfWeekName(4, locale)})`;
    case PeriodType.WeekFri:
      return `${dico.Week} (${getDayOfWeekName(5, locale)})`;
    case PeriodType.WeekSat:
      return `${dico.Week} (${getDayOfWeekName(6, locale)})`;

    case PeriodType.Month:
      return dico.Month;
    case PeriodType.MonthYear:
      return dico.Month;
    case PeriodType.Quarter:
      return dico.Quarter;
    case PeriodType.CalendarYear:
      return dico.CalendarYear;
    case PeriodType.FiscalYearOctober:
      return dico.FiscalYearOct;

    case PeriodType.BiWeek1Sun:
      return `${dico.BiWeek} (${getDayOfWeekName(0, locale)})`;
    case PeriodType.BiWeek1Mon:
      return `${dico.BiWeek} (${getDayOfWeekName(1, locale)})`;
    case PeriodType.BiWeek1Tue:
      return `${dico.BiWeek} (${getDayOfWeekName(2, locale)})`;
    case PeriodType.BiWeek1Wed:
      return `${dico.BiWeek} (${getDayOfWeekName(3, locale)})`;
    case PeriodType.BiWeek1Thu:
      return `${dico.BiWeek} (${getDayOfWeekName(4, locale)})`;
    case PeriodType.BiWeek1Fri:
      return `${dico.BiWeek} (${getDayOfWeekName(5, locale)})`;
    case PeriodType.BiWeek1Sat:
      return `${dico.BiWeek} (${getDayOfWeekName(6, locale)})`;

    case PeriodType.BiWeek2Sun:
      return `${dico.BiWeek} 2 (${getDayOfWeekName(0, locale)})`;
    case PeriodType.BiWeek2Mon:
      return `${dico.BiWeek} 2 (${getDayOfWeekName(1, locale)})`;
    case PeriodType.BiWeek2Tue:
      return `${dico.BiWeek} 2 (${getDayOfWeekName(2, locale)})`;
    case PeriodType.BiWeek2Wed:
      return `${dico.BiWeek} 2 (${getDayOfWeekName(3, locale)})`;
    case PeriodType.BiWeek2Thu:
      return `${dico.BiWeek} 2 (${getDayOfWeekName(4, locale)})`;
    case PeriodType.BiWeek2Fri:
      return `${dico.BiWeek} 2 (${getDayOfWeekName(5, locale)})`;
    case PeriodType.BiWeek2Sat:
      return `${dico.BiWeek} 2 (${getDayOfWeekName(6, locale)})`;

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
  weekStartsOn: DayOfWeek = DayOfWeek.Sunday
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

export function formatIntl(
  settings: LocaleSettings,
  dt: Date,
  tokens_or_intlOptions: CustomIntlDateTimeFormatOptions
) {
  const {
    locale,
    formats: {
      dates: { ordinalSuffixes: suffixes },
    },
  } = settings;

  function formatIntlOrdinal(formatter: Intl.DateTimeFormat, with_ordinal = false) {
    if (with_ordinal) {
      const rules = new Intl.PluralRules(locale, { type: 'ordinal' });

      const splited = formatter.formatToParts(dt);
      return splited
        .map((c) => {
          if (c.type === 'day') {
            const ordinal = rules.select(parseInt(c.value, 10));
            const suffix = suffixes[ordinal];
            return `${c.value}${suffix}`;
          }
          return c.value;
        })
        .join('');
    }

    return formatter.format(dt);
  }

  if (typeof tokens_or_intlOptions !== 'string' && !Array.isArray(tokens_or_intlOptions)) {
    return formatIntlOrdinal(
      new Intl.DateTimeFormat(locale, tokens_or_intlOptions),
      tokens_or_intlOptions.withOrdinal
    );
  }

  const tokens = Array.isArray(tokens_or_intlOptions)
    ? tokens_or_intlOptions.join('')
    : tokens_or_intlOptions;

  // Order of includes check is important! (longest first)
  const formatter = new Intl.DateTimeFormat(locale, {
    year: tokens.includes(DateToken.Year_numeric)
      ? 'numeric'
      : tokens.includes(DateToken.Year_2Digit)
        ? '2-digit'
        : undefined,

    month: tokens.includes(DateToken.Month_long)
      ? 'long'
      : tokens.includes(DateToken.Month_short)
        ? 'short'
        : tokens.includes(DateToken.Month_2Digit)
          ? '2-digit'
          : tokens.includes(DateToken.Month_numeric)
            ? 'numeric'
            : undefined,

    day: tokens.includes(DateToken.DayOfMonth_2Digit)
      ? '2-digit'
      : tokens.includes(DateToken.DayOfMonth_numeric)
        ? 'numeric'
        : undefined,

    hour: tokens.includes(DateToken.Hour_2Digit)
      ? '2-digit'
      : tokens.includes(DateToken.Hour_numeric)
        ? 'numeric'
        : undefined,
    hour12: tokens.includes(DateToken.Hour_woAMPM)
      ? false
      : tokens.includes(DateToken.Hour_wAMPM)
        ? true
        : undefined,

    minute: tokens.includes(DateToken.Minute_2Digit)
      ? '2-digit'
      : tokens.includes(DateToken.Minute_numeric)
        ? 'numeric'
        : undefined,

    second: tokens.includes(DateToken.Second_2Digit)
      ? '2-digit'
      : tokens.includes(DateToken.Second_numeric)
        ? 'numeric'
        : undefined,

    fractionalSecondDigits: tokens.includes(DateToken.MiliSecond_3) ? 3 : undefined,

    weekday: tokens.includes(DateToken.DayOfWeek_narrow)
      ? 'narrow'
      : tokens.includes(DateToken.DayOfWeek_long)
        ? 'long'
        : tokens.includes(DateToken.DayOfWeek_short)
          ? 'short'
          : undefined,
  });

  return formatIntlOrdinal(formatter, tokens.includes(DateToken.DayOfMonth_withOrdinal));
}

function range(
  settings: LocaleSettings,
  date: Date,
  weekStartsOn: DayOfWeek,
  formatToUse: CustomIntlDateTimeFormatOptions,
  biWeek: undefined | 1 | 2 = undefined // undefined means that it's not a bi-week
) {
  const start =
    biWeek === undefined
      ? startOfWeek(date, { weekStartsOn })
      : startOfBiWeek(date, biWeek, weekStartsOn);
  const end =
    biWeek === undefined
      ? endOfWeek(date, { weekStartsOn })
      : endOfBiWeek(date, biWeek, weekStartsOn);

  return formatIntl(settings, start, formatToUse) + ' - ' + formatIntl(settings, end, formatToUse);
}

export function formatDate(
  date: Date | string | null | undefined,
  periodType: PeriodType,
  options: FormatDateOptions = {}
): string {
  return formatDateWithLocale(defaultLocale, date, periodType, options);
}

export function formatDateWithLocale(
  settings: LocaleSettings,
  date: Date | string | null | undefined,
  periodType: PeriodType,
  options: FormatDateOptions = {}
): string {
  if (typeof date === 'string') {
    date = parseISO(date);
  }

  // Handle 'Invalid Date'
  // @ts-ignore - Date is a number (see: https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript)
  if (date == null || isNaN(date)) {
    return '';
  }

  const weekStartsOn = options.weekStartsOn ?? settings.formats.dates.weekStartsOn;

  const { day, dayTime, timeOnly, week, month, monthsYear, year } = settings.formats.dates.presets;

  if (periodType === PeriodType.Week) {
    periodType = [
      PeriodType.WeekSun,
      PeriodType.WeekMon,
      PeriodType.WeekTue,
      PeriodType.WeekWed,
      PeriodType.WeekThu,
      PeriodType.WeekFri,
      PeriodType.WeekSat,
    ][weekStartsOn];
  } else if (periodType === PeriodType.BiWeek1) {
    periodType = [
      PeriodType.BiWeek1Sun,
      PeriodType.BiWeek1Mon,
      PeriodType.BiWeek1Tue,
      PeriodType.BiWeek1Wed,
      PeriodType.BiWeek1Thu,
      PeriodType.BiWeek1Fri,
      PeriodType.BiWeek1Sat,
    ][weekStartsOn];
  } else if (periodType === PeriodType.BiWeek2) {
    periodType = [
      PeriodType.BiWeek2Sun,
      PeriodType.BiWeek2Mon,
      PeriodType.BiWeek2Tue,
      PeriodType.BiWeek2Wed,
      PeriodType.BiWeek2Thu,
      PeriodType.BiWeek2Fri,
      PeriodType.BiWeek2Sat,
    ][weekStartsOn];
  }

  /** Resolve a preset given the chosen variant */
  function rv(preset: DateFormatVariantPreset) {
    if (options.variant === 'custom') {
      return options.custom ?? preset.default;
    } else if (options.custom && !options.variant) {
      return options.custom;
    }

    return preset[options.variant ?? 'default'];
  }

  switch (periodType) {
    case PeriodType.Custom:
      return formatIntl(settings, date, options.custom!);

    case PeriodType.Day:
      return formatIntl(settings, date, rv(day!)!);

    case PeriodType.DayTime:
      return formatIntl(settings, date, rv(dayTime!)!);

    case PeriodType.TimeOnly:
      return formatIntl(settings, date, rv(timeOnly!)!);

    case PeriodType.WeekSun:
      return range(settings, date, 0, rv(week!)!);
    case PeriodType.WeekMon:
      return range(settings, date, 1, rv(week!)!);
    case PeriodType.WeekTue:
      return range(settings, date, 2, rv(week!)!);
    case PeriodType.WeekWed:
      return range(settings, date, 3, rv(week!)!);
    case PeriodType.WeekThu:
      return range(settings, date, 4, rv(week!)!);
    case PeriodType.WeekFri:
      return range(settings, date, 5, rv(week!)!);
    case PeriodType.WeekSat:
      return range(settings, date, 6, rv(week!)!);

    case PeriodType.Month:
      return formatIntl(settings, date, rv(month!)!);

    case PeriodType.MonthYear:
      return formatIntl(settings, date, rv(monthsYear!)!);

    case PeriodType.Quarter:
      return [
        formatIntl(settings, startOfQuarter(date), rv(month!)!),
        formatIntl(settings, endOfQuarter(date), rv(monthsYear!)!),
      ].join(' - ');

    case PeriodType.CalendarYear:
      return formatIntl(settings, date, rv(year!)!);

    case PeriodType.FiscalYearOctober:
      const fDate = new Date(getFiscalYear(date), 0, 1);
      return formatIntl(settings, fDate, rv(year!)!);

    case PeriodType.BiWeek1Sun:
      return range(settings, date, 0, rv(week!)!, 1);
    case PeriodType.BiWeek1Mon:
      return range(settings, date, 1, rv(week!)!, 1);
    case PeriodType.BiWeek1Tue:
      return range(settings, date, 2, rv(week!)!, 1);
    case PeriodType.BiWeek1Wed:
      return range(settings, date, 3, rv(week!)!, 1);
    case PeriodType.BiWeek1Thu:
      return range(settings, date, 4, rv(week!)!, 1);
    case PeriodType.BiWeek1Fri:
      return range(settings, date, 5, rv(week!)!, 1);
    case PeriodType.BiWeek1Sat:
      return range(settings, date, 6, rv(week!)!, 1);

    case PeriodType.BiWeek2Sun:
      return range(settings, date, 0, rv(week!)!, 2);
    case PeriodType.BiWeek2Mon:
      return range(settings, date, 1, rv(week!)!, 2);
    case PeriodType.BiWeek2Tue:
      return range(settings, date, 2, rv(week!)!, 2);
    case PeriodType.BiWeek2Wed:
      return range(settings, date, 3, rv(week!)!, 2);
    case PeriodType.BiWeek2Thu:
      return range(settings, date, 4, rv(week!)!, 2);
    case PeriodType.BiWeek2Fri:
      return range(settings, date, 5, rv(week!)!, 2);
    case PeriodType.BiWeek2Sat:
      return range(settings, date, 6, rv(week!)!, 2);

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
