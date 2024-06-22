import type { DateRange } from './dateRange.js';

export type SelectedDate = Date | Date[] | DateRange | null | undefined;

export type DisabledDate = ((date: Date) => boolean) | Date | Date[] | { from: Date; to: Date };

export type Period = {
  start: Date;
  end: Date;
  periodTypeId: PeriodType;
};

export enum PeriodType {
  Custom = 1,

  Day = 10,
  DayTime = 11,
  TimeOnly = 15,

  Week = 20, // will be replaced by WeekSun, WeekMon, etc depending on locale `weekStartsOn`
  WeekSun = 21,
  WeekMon = 22,
  WeekTue = 23,
  WeekWed = 24,
  WeekThu = 25,
  WeekFri = 26,
  WeekSat = 27,

  Month = 30,
  MonthYear = 31,
  Quarter = 40,
  CalendarYear = 50,
  FiscalYearOctober = 60,

  BiWeek1 = 70, // will be replaced by BiWeek1Sun, BiWeek1Mon, etc depending on locale `weekStartsOn`
  BiWeek1Sun = 71,
  BiWeek1Mon = 72,
  BiWeek1Tue = 73,
  BiWeek1Wed = 74,
  BiWeek1Thu = 75,
  BiWeek1Fri = 76,
  BiWeek1Sat = 77,

  BiWeek2 = 80, // will be replaced by BiWeek2Sun, BiWeek2Mon, etc depending on locale `weekStartsOn`
  BiWeek2Sun = 81,
  BiWeek2Mon = 82,
  BiWeek2Tue = 83,
  BiWeek2Wed = 84,
  BiWeek2Thu = 85,
  BiWeek2Fri = 86,
  BiWeek2Sat = 87,
}

export enum DayOfWeek {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export enum DateToken {
  /** `1982, 1986, 2024` */
  Year_numeric = 'yyy',
  /** `82, 86, 24` */
  Year_2Digit = 'yy',

  /** `January, February, ..., December` */
  Month_long = 'MMMM',
  /** `Jan, Feb, ..., Dec` */
  Month_short = 'MMM',
  /** `01, 02, ..., 12` */
  Month_2Digit = 'MM',
  /** `1, 2, ..., 12` */
  Month_numeric = 'M',

  /** `1, 2, ..., 11, 12` */
  Hour_numeric = 'h',
  /** `01, 02, ..., 11, 12` */
  Hour_2Digit = 'hh',
  /** You should probably not use this. Force with AM/PM (and the good locale), not specifying this will automatically take the good local */
  Hour_wAMPM = 'a',
  /** You should probably not use this. Force without AM/PM (and the good locale), not specifying this will automatically take the good local */
  Hour_woAMPM = 'aaaaaa',

  /** `0, 1, ..., 59` */
  Minute_numeric = 'm',
  /** `00, 01, ..., 59` */
  Minute_2Digit = 'mm',

  /** `0, 1, ..., 59` */
  Second_numeric = 's',
  /** `00, 01, ..., 59` */
  Second_2Digit = 'ss',

  /** `000, 001, ..., 999` */
  MiliSecond_3 = 'SSS',

  /** Minimize digit: `1, 2, 11, ...` */
  DayOfMonth_numeric = 'd',
  /** `01, 02, 11, ...` */
  DayOfMonth_2Digit = 'dd',
  /** `1st, 2nd, 11th, ...` You can have your local ordinal by passing `ordinalSuffixes` in options / settings */
  DayOfMonth_withOrdinal = 'do',

  /** `M, T, W, T, F, S, S` */
  DayOfWeek_narrow = 'eeeee',
  /** `Monday, Tuesday, ..., Sunday` */
  DayOfWeek_long = 'eeee',
  /** `Mon, Tue, Wed, ..., Sun` */
  DayOfWeek_short = 'eee',
}

export type OrdinalSuffixes = {
  one?: string;
  two?: string;
  few?: string;
  other?: string;
  zero?: string;
  many?: string;
};
export type DateFormatVariant = 'short' | 'default' | 'long';
export type DateFormatVariantPreset = {
  short?: CustomIntlDateTimeFormatOptions;
  default?: CustomIntlDateTimeFormatOptions;
  long?: CustomIntlDateTimeFormatOptions;
};
export type CustomIntlDateTimeFormatOptions =
  | string
  | string[]
  | (Intl.DateTimeFormatOptions & { withOrdinal?: boolean });

export type FormatDateOptions = {
  weekStartsOn?: DayOfWeek;
  variant?: DateFormatVariant | 'custom';
  custom?: CustomIntlDateTimeFormatOptions;
};

export interface FormatDateLocaleOptions {
  weekStartsOn?: DayOfWeek;
  baseParsing?: string;
  presets?: {
    day?: DateFormatVariantPreset;
    dayTime?: DateFormatVariantPreset;
    timeOnly?: DateFormatVariantPreset;
    week?: DateFormatVariantPreset;
    month?: DateFormatVariantPreset;
    monthsYear?: DateFormatVariantPreset;
    year?: DateFormatVariantPreset;
  };
  ordinalSuffixes?: OrdinalSuffixes;
}

export type FormatDateLocalePresets = Required<FormatDateLocaleOptions>;
