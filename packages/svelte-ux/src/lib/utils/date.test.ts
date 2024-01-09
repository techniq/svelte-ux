import { describe, it, expect } from 'vitest';
import {
  PeriodType,
  formatDate,
  getMonthDaysByWeek,
  localToUtcDate,
  utcToLocalDate,
  DayOfWeek,
  formatIntl,
  type CustomIntlDateTimeFormatOptions,
  type FormatDateOptions,
  DateToken,
  formatDateWithLocale,
} from './date';
import { getSettings } from '$lib/components';
import { format, formatWithLocale } from '.';
import { createLocaleSettings, defaultLocale } from './locale';

const DATE = '2023-11-21'; // "good" default date as the day (21) is bigger than 12 (number of months). And november is a good month1 (because why not?)
const dt_2M_2d = new Date(2023, 10, 21);
const dt_2M_1d = new Date(2023, 10, 7);
const dt_1M_1d = new Date(2023, 2, 7);

const dt_1M_1d_time_pm = new Date(2023, 2, 7, 14, 2, 3, 4);
const dt_1M_1d_time_am = new Date(2023, 2, 7, 1, 2, 3, 4);

const fr = createLocaleSettings({
  locale: 'fr',
  formats: {
    dates: {
      ordinalSuffixes: {
        one: 'er',
        two: '',
        few: '',
        other: '',
      },
    },
  },
});

describe('formatDate()', () => {
  it('should return empty string for null or undefined date', () => {
    expect(formatDate(null)).equal('');
    expect(formatDate(undefined)).equal('');
  });

  it('should return empty string for invalid date', () => {
    expect(formatDate('invalid date')).equal('');
  });

  describe('should format date for PeriodType.Day', () => {
    const localDate = new Date(2023, 10, 21);
    const combi = [
      ['short', defaultLocale, '11/21'],
      ['short', fr, '21/11'],
      ['long', defaultLocale, 'Nov 21, 2023'],
      ['long', fr, '21 nov. 2023'],
    ] as const;

    for (const c of combi) {
      const [variant, locales, expected] = c;
      it(c.toString(), () => {
        expect(formatDateWithLocale(locales, localDate, PeriodType.Day, { variant })).equal(
          expected
        );
      });
    }
  });

  describe('should format date string for PeriodType.Day', () => {
    const combi = [
      ['short', defaultLocale, '11/21'],
      ['short', fr, '21/11'],
      ['long', defaultLocale, 'Nov 21, 2023'],
      ['long', fr, '21 nov. 2023'],
    ] as const;

    for (const c of combi) {
      const [variant, locales, expected] = c;
      it(c.toString(), () => {
        expect(formatDateWithLocale(locales, DATE, PeriodType.Day, { variant })).equal(expected);
      });
    }
  });

  describe('should format date string for DayTime, TimeOnly', () => {
    const combi: [Date, PeriodType, FormatDateOptions, string[]][] = [
      [
        dt_1M_1d_time_pm,
        PeriodType.DayTime,
        { variant: 'short' },
        ['3/7/2023, 2:02 PM', '07/03/2023 14:02'],
      ],
      [
        dt_1M_1d_time_pm,
        PeriodType.DayTime,
        { variant: 'default' },
        ['3/7/2023, 02:02 PM', '07/03/2023 14:02'],
      ],
      [
        dt_1M_1d_time_pm,
        PeriodType.DayTime,
        { variant: 'long' },
        ['3/7/2023, 02:02:03 PM', '07/03/2023 14:02:03'],
      ],
      [dt_1M_1d_time_pm, PeriodType.TimeOnly, { variant: 'short' }, ['2:02 PM', '14:02']],
      [dt_1M_1d_time_pm, PeriodType.TimeOnly, { variant: 'default' }, ['02:02:03 PM', '14:02:03']],
      [
        dt_1M_1d_time_pm,
        PeriodType.TimeOnly,
        { variant: 'long' },
        ['02:02:03.004 PM', '14:02:03,004'],
      ],
    ];

    for (const c of combi) {
      const [date, periodType, options, [expected_default, expected_fr]] = c;
      it(c.toString(), () => {
        expect(formatWithLocale(defaultLocale, date, periodType, options)).equal(expected_default);
      });

      it(c.toString() + 'fr', () => {
        expect(formatWithLocale(fr, date, periodType, options)).equal(expected_fr);
      });
    }
  });

  describe('should format date for PeriodType.WeekSun / Mon', () => {
    const combi = [
      [PeriodType.WeekSun, 'short', defaultLocale, '11/19 - 11/25'],
      [PeriodType.WeekSun, 'short', fr, '19/11 - 25/11'],
      [PeriodType.WeekSun, 'long', defaultLocale, '11/19/2023 - 11/25/2023'],
      [PeriodType.WeekSun, 'long', fr, '19/11/2023 - 25/11/2023'],
      [PeriodType.WeekMon, 'long', defaultLocale, '11/20/2023 - 11/26/2023'],
      [PeriodType.WeekMon, 'long', fr, '20/11/2023 - 26/11/2023'],
    ] as const;

    for (const c of combi) {
      const [periodType, variant, locales, expected] = c;
      it(c.toString(), () => {
        expect(formatDateWithLocale(locales, DATE, periodType, { variant, locales })).equal(
          expected
        );
      });
    }
  });

  describe('should format date for PeriodType.Week', () => {
    const combi = [
      [PeriodType.Week, 'short', defaultLocale, DayOfWeek.Sunday, '11/19 - 11/25'],
      [PeriodType.Week, 'short', fr, DayOfWeek.Sunday, '19/11 - 25/11'],
      [PeriodType.Week, 'long', defaultLocale, DayOfWeek.Sunday, '11/19/2023 - 11/25/2023'],
      [PeriodType.Week, 'long', fr, DayOfWeek.Sunday, '19/11/2023 - 25/11/2023'],

      [PeriodType.Week, 'short', defaultLocale, DayOfWeek.Monday, '11/20 - 11/26'],
      [PeriodType.Week, 'short', fr, DayOfWeek.Monday, '20/11 - 26/11'],
      [PeriodType.Week, 'long', defaultLocale, DayOfWeek.Monday, '11/20/2023 - 11/26/2023'],
      [PeriodType.Week, 'long', fr, DayOfWeek.Monday, '20/11/2023 - 26/11/2023'],
    ] as const;

    for (const c of combi) {
      const [periodType, variant, locales, weekStartsOn, expected] = c;
      it(c.toString(), () => {
        expect(formatDateWithLocale(locales, DATE, periodType, { variant, weekStartsOn })).equal(
          expected
        );
      });
    }
  });

  describe('should format date for PeriodType.Month', () => {
    const combi = [
      ['short', defaultLocale, 'Nov'],
      ['short', fr, 'nov.'],
      ['long', defaultLocale, 'November'],
      ['long', fr, 'novembre'],
    ] as const;

    for (const c of combi) {
      const [variant, locales, expected] = c;
      it(c.toString(), () => {
        expect(formatDateWithLocale(locales, DATE, PeriodType.Month, { variant })).equal(expected);
      });
    }
  });

  describe('should format date for PeriodType.MonthYear', () => {
    const combi = [
      ['short', defaultLocale, 'Nov 23'],
      ['short', fr, 'nov. 23'],
      ['long', defaultLocale, 'November 2023'],
      ['long', fr, 'novembre 2023'],
    ] as const;

    for (const c of combi) {
      const [variant, locales, expected] = c;
      it(c.toString(), () => {
        expect(formatDateWithLocale(locales, DATE, PeriodType.MonthYear, { variant })).equal(
          expected
        );
      });
    }
  });

  describe('should format date for PeriodType.Quarter', () => {
    const combi = [
      ['short', defaultLocale, 'Oct - Dec 23'],
      ['short', fr, 'oct. - déc. 23'],
      ['long', defaultLocale, 'October - December 2023'],
      ['long', fr, 'octobre - décembre 2023'],
    ] as const;

    for (const c of combi) {
      const [variant, locales, expected] = c;
      it(c.toString(), () => {
        expect(formatDateWithLocale(locales, DATE, PeriodType.Quarter, { variant })).equal(
          expected
        );
      });
    }
  });

  describe('should format date for PeriodType.CalendarYear', () => {
    const combi = [
      ['short', defaultLocale, '23'],
      ['short', fr, '23'],
      ['long', defaultLocale, '2023'],
      ['long', fr, '2023'],
    ] as const;

    for (const c of combi) {
      const [variant, locales, expected] = c;
      it(c.toString(), () => {
        expect(formatDateWithLocale(locales, DATE, PeriodType.CalendarYear, { variant })).equal(
          expected
        );
      });
    }
  });

  describe('should format date for PeriodType.FiscalYearOctober', () => {
    const combi = [
      ['short', defaultLocale, '24'],
      ['short', fr, '24'],
      ['long', defaultLocale, '2024'],
      ['long', fr, '2024'],
    ] as const;

    for (const c of combi) {
      const [variant, locales, expected] = c;
      it(c.toString(), () => {
        expect(
          formatDateWithLocale(locales, DATE, PeriodType.FiscalYearOctober, { variant })
        ).equal(expected);
      });
    }
  });

  describe('should format date for PeriodType.BiWeek1Sun', () => {
    const combi = [
      ['short', defaultLocale, '11/12 - 11/25'],
      ['short', fr, '12/11 - 25/11'],
      ['long', defaultLocale, '11/12/2023 - 11/25/2023'],
      ['long', fr, '12/11/2023 - 25/11/2023'],
    ] as const;

    for (const c of combi) {
      const [variant, locales, expected] = c;
      it(c.toString(), () => {
        expect(formatDateWithLocale(locales, DATE, PeriodType.BiWeek1Sun, { variant })).equal(
          expected
        );
      });
    }
  });

  describe('should format date for PeriodType.undefined', () => {
    const expected = '2023-11-21T00:00:00-04:00';
    const combi = [
      ['short', defaultLocale],
      ['short', fr],
      ['long', defaultLocale],
      ['long', fr],
    ] as const;

    for (const c of combi) {
      const [variant, locales] = c;
      it(c.toString(), () => {
        expect(formatDateWithLocale(locales, DATE, undefined, { variant })).equal(expected);
      });
    }
  });
});

describe('formatIntl() tokens', () => {
  const combi: [Date, CustomIntlDateTimeFormatOptions, string[]][] = [
    [dt_1M_1d, 'MM/dd/yyyy', ['03/07/2023', '07/03/2023']],
    [dt_2M_2d, 'M/d/yyyy', ['11/21/2023', '21/11/2023']],
    [dt_2M_1d, 'M/d/yyyy', ['11/7/2023', '07/11/2023']],
    [dt_2M_1d, 'M/dd/yyyy', ['11/07/2023', '07/11/2023']],
    [dt_1M_1d, 'M/d/yyyy', ['3/7/2023', '07/03/2023']],
    [dt_1M_1d, 'MM/d/yyyy', ['03/7/2023', '7/03/2023']],
    [dt_2M_2d, 'M/d', ['11/21', '21/11']],
    [dt_2M_2d, 'MMM d, yyyy', ['Nov 21, 2023', '21 nov. 2023']],
    [dt_2M_1d, 'MMM d, yyyy', ['Nov 7, 2023', '7 nov. 2023']],
    [dt_2M_1d, 'MMM do, yyyy', ['Nov 7th, 2023', '7 nov. 2023']],
    [dt_2M_2d, 'MMM', ['Nov', 'nov.']],
    [dt_2M_2d, 'MMMM', ['November', 'novembre']],
    [dt_2M_2d, 'MMM yy', ['Nov 23', 'nov. 23']],
    [dt_2M_2d, 'MMMM yyyy', ['November 2023', 'novembre 2023']],
    [dt_2M_2d, 'yy', ['23', '23']],
    [dt_2M_2d, 'yyyy', ['2023', '2023']],
    [dt_2M_2d, { dateStyle: 'full' }, ['Tuesday, November 21, 2023', 'mardi 21 novembre 2023']],
    [dt_2M_2d, { dateStyle: 'long' }, ['November 21, 2023', '21 novembre 2023']],
    [dt_2M_2d, { dateStyle: 'medium' }, ['Nov 21, 2023', '21 nov. 2023']],
    [dt_2M_2d, { dateStyle: 'medium', withOrdinal: true }, ['Nov 21st, 2023', '21 nov. 2023']],
    [dt_2M_2d, { dateStyle: 'short' }, ['11/21/23', '21/11/2023']],
    [dt_1M_1d, { dateStyle: 'short' }, ['3/7/23', '07/03/2023']],

    // time
    [dt_1M_1d_time_pm, [DateToken.Hour_numeric, DateToken.Minute_numeric], ['2:02 PM', '14:02']],
    [dt_1M_1d_time_am, [DateToken.Hour_numeric, DateToken.Minute_numeric], ['1:02 AM', '01:02']],
    [
      dt_1M_1d_time_am,
      [DateToken.Hour_numeric, DateToken.Minute_numeric, DateToken.Hour_wAMPM],
      ['1:02 AM', '1:02 AM'],
    ],
    [
      dt_1M_1d_time_am,
      [DateToken.Hour_2Digit, DateToken.Minute_2Digit, DateToken.Hour_woAMPM],
      ['01:02', '01:02'],
    ],
    [
      dt_1M_1d_time_am,
      [DateToken.Hour_numeric, DateToken.Minute_numeric, DateToken.Second_numeric],
      ['1:02:03 AM', '01:02:03'],
    ],
    [
      dt_1M_1d_time_am,
      [
        DateToken.Hour_numeric,
        DateToken.Minute_numeric,
        DateToken.Second_numeric,
        DateToken.MiliSecond_3,
      ],
      ['1:02:03.004 AM', '01:02:03,004'],
    ],
  ];

  for (const c of combi) {
    const [date, tokens, [expected_default, expected_fr]] = c;
    it(c.toString(), () => {
      expect(formatIntl(defaultLocale, date, tokens)).equal(expected_default);
    });

    it(c.toString() + 'fr', () => {
      expect(formatIntl(fr, date, tokens)).equal(expected_fr);
    });
  }
});

describe('utcToLocalDate()', () => {
  it('in with offset -00 => local', () => {
    const utcDate = '2023-11-21T00:00:00-00:00';
    const localDate = utcToLocalDate(utcDate);
    expect(localDate.toISOString()).equal('2023-11-21T04:00:00.000Z');
  });

  it('in without offset, the utc is already +4, to local: another +4', () => {
    const utcDate = '2023-11-21T00:00:00';
    const localDate = utcToLocalDate(utcDate);
    expect(localDate.toISOString()).equal('2023-11-21T08:00:00.000Z');
  });
});

describe('localToUtcDate()', () => {
  it('in with offset -04 => UTC', () => {
    const localDate = '2023-11-21T00:00:00-04:00';
    const utcDate = localToUtcDate(localDate);
    expect(utcDate.toISOString()).equal('2023-11-21T00:00:00.000Z');
  });

  it('in with offset -00 => UTC', () => {
    const localDate = '2023-11-21T04:00:00-00:00';
    const utcDate = localToUtcDate(localDate);
    expect(utcDate.toISOString()).equal('2023-11-21T00:00:00.000Z');
  });

  it('in without offset == UTC', () => {
    const localDate = '2023-11-21T04:00:00';
    const utcDate = localToUtcDate(localDate);
    expect(utcDate.toISOString()).equal('2023-11-21T04:00:00.000Z');
  });
});

describe('getMonthDaysByWeek()', () => {
  it('default starting Week: Sunday', () => {
    const dates = getMonthDaysByWeek(new Date(DATE));
    expect(dates).toMatchInlineSnapshot(`
      [
        [
          2023-10-29T04:00:00.000Z,
          2023-10-30T04:00:00.000Z,
          2023-10-31T04:00:00.000Z,
          2023-11-01T04:00:00.000Z,
          2023-11-02T04:00:00.000Z,
          2023-11-03T04:00:00.000Z,
          2023-11-04T04:00:00.000Z,
        ],
        [
          2023-11-05T04:00:00.000Z,
          2023-11-06T04:00:00.000Z,
          2023-11-07T04:00:00.000Z,
          2023-11-08T04:00:00.000Z,
          2023-11-09T04:00:00.000Z,
          2023-11-10T04:00:00.000Z,
          2023-11-11T04:00:00.000Z,
        ],
        [
          2023-11-12T04:00:00.000Z,
          2023-11-13T04:00:00.000Z,
          2023-11-14T04:00:00.000Z,
          2023-11-15T04:00:00.000Z,
          2023-11-16T04:00:00.000Z,
          2023-11-17T04:00:00.000Z,
          2023-11-18T04:00:00.000Z,
        ],
        [
          2023-11-19T04:00:00.000Z,
          2023-11-20T04:00:00.000Z,
          2023-11-21T04:00:00.000Z,
          2023-11-22T04:00:00.000Z,
          2023-11-23T04:00:00.000Z,
          2023-11-24T04:00:00.000Z,
          2023-11-25T04:00:00.000Z,
        ],
        [
          2023-11-26T04:00:00.000Z,
          2023-11-27T04:00:00.000Z,
          2023-11-28T04:00:00.000Z,
          2023-11-29T04:00:00.000Z,
          2023-11-30T04:00:00.000Z,
          2023-12-01T04:00:00.000Z,
          2023-12-02T04:00:00.000Z,
        ],
      ]
    `);
  });

  it('Starting Week: Monday', () => {
    const dates = getMonthDaysByWeek(new Date(DATE), 1);
    expect(dates).toMatchInlineSnapshot(`
      [
        [
          2023-10-30T04:00:00.000Z,
          2023-10-31T04:00:00.000Z,
          2023-11-01T04:00:00.000Z,
          2023-11-02T04:00:00.000Z,
          2023-11-03T04:00:00.000Z,
          2023-11-04T04:00:00.000Z,
          2023-11-05T04:00:00.000Z,
        ],
        [
          2023-11-06T04:00:00.000Z,
          2023-11-07T04:00:00.000Z,
          2023-11-08T04:00:00.000Z,
          2023-11-09T04:00:00.000Z,
          2023-11-10T04:00:00.000Z,
          2023-11-11T04:00:00.000Z,
          2023-11-12T04:00:00.000Z,
        ],
        [
          2023-11-13T04:00:00.000Z,
          2023-11-14T04:00:00.000Z,
          2023-11-15T04:00:00.000Z,
          2023-11-16T04:00:00.000Z,
          2023-11-17T04:00:00.000Z,
          2023-11-18T04:00:00.000Z,
          2023-11-19T04:00:00.000Z,
        ],
        [
          2023-11-20T04:00:00.000Z,
          2023-11-21T04:00:00.000Z,
          2023-11-22T04:00:00.000Z,
          2023-11-23T04:00:00.000Z,
          2023-11-24T04:00:00.000Z,
          2023-11-25T04:00:00.000Z,
          2023-11-26T04:00:00.000Z,
        ],
        [
          2023-11-27T04:00:00.000Z,
          2023-11-28T04:00:00.000Z,
          2023-11-29T04:00:00.000Z,
          2023-11-30T04:00:00.000Z,
          2023-12-01T04:00:00.000Z,
          2023-12-02T04:00:00.000Z,
          2023-12-03T04:00:00.000Z,
        ],
      ]
    `);
  });
});
