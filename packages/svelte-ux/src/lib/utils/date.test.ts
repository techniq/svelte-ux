import { describe, it, expect } from 'vitest';
import {
  PeriodType,
  formatDate,
  getMonthDaysByWeek,
  localToUtcDate,
  utcToLocalDate,
  getPeriodTypeName,
} from './date';

const DATE = '2023-11-21'; // "good" default date as the day (21) is bigger than 12 (number of months). And november is a good month1 (because why not?)

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
      ['short', undefined, '11/21'],
      ['short', 'fr', '21/11'],
      ['long', undefined, 'Nov 21, 2023'],
      ['long', 'fr', '21 nov. 2023'],
    ] as const;

    for (const c of combi) {
      const [variant, locales, expected] = c;
      it(c.toString(), () => {
        expect(formatDate(localDate, { periodType: PeriodType.Day, variant, locales })).equal(
          expected
        );
      });
    }
  });

  describe('should format date string', () => {
    const combi = [
      ['short', undefined, '11/21'],
      ['short', 'fr', '21/11'],
      ['long', undefined, 'Nov 21, 2023'],
      ['long', 'fr', '21 nov. 2023'],
    ] as const;

    // QUESTION 'dd/MM/yyyy' Would be the good default in french, is it another variant? :(

    for (const c of combi) {
      const [variant, locales, expected] = c;
      it(c.toString(), () => {
        expect(formatDate(DATE, { periodType: PeriodType.Day, variant, locales })).equal(expected);
      });
    }
  });

  describe('should format date for PeriodType.Week', () => {
    const combi = [
      [PeriodType.WeekSun, 'short', undefined, '11/19 - 11/25'],
      [PeriodType.WeekSun, 'short', 'fr', '19/11 - 25/11'],
      [PeriodType.WeekSun, 'long', undefined, '11/19/2023 - 11/25/2023'],
      [PeriodType.WeekSun, 'long', 'fr', '19/11/2023 - 25/11/2023'],
      [PeriodType.WeekMon, 'long', undefined, '11/20/2023 - 11/26/2023'],
      [PeriodType.WeekMon, 'long', 'fr', '20/11/2023 - 26/11/2023'],
    ] as const;

    for (const c of combi) {
      const [periodType, variant, locales, expected] = c;
      it(c.toString(), () => {
        expect(formatDate(DATE, { periodType, variant, locales })).equal(expected);
      });
    }
  });

  describe('should format date for PeriodType.Month', () => {
    const combi = [
      ['short', undefined, 'Nov 23'],
      ['short', 'fr', 'nov. 23'],
      ['long', undefined, 'November 2023'],
      ['long', 'fr', 'novembre 2023'],
    ] as const;

    for (const c of combi) {
      const [variant, locales, expected] = c;
      it(c.toString(), () => {
        expect(formatDate(DATE, { periodType: PeriodType.Month, variant, locales })).equal(
          expected
        );
      });
    }
  });

  describe('should format date for PeriodType.Quarter', () => {
    const combi = [
      ['short', undefined, 'Oct - Dec 23'],
      ['short', 'fr', 'oct. - déc. 23'],
      ['long', undefined, 'October - December 2023'],
      ['long', 'fr', 'octobre - décembre 2023'],
    ] as const;

    for (const c of combi) {
      const [variant, locales, expected] = c;
      it(c.toString(), () => {
        expect(formatDate(DATE, { periodType: PeriodType.Quarter, variant, locales })).equal(
          expected
        );
      });
    }
  });

  describe('should format date for PeriodType.CalendarYear', () => {
    const combi = [
      ['short', undefined, '23'],
      ['short', 'fr', '23'],
      ['long', undefined, '2023'],
      ['long', 'fr', '2023'],
    ] as const;

    for (const c of combi) {
      const [variant, locales, expected] = c;
      it(c.toString(), () => {
        expect(formatDate(DATE, { periodType: PeriodType.CalendarYear, variant, locales })).equal(
          expected
        );
      });
    }
  });

  describe('should format date for PeriodType.FiscalYearOctober', () => {
    const combi = [
      ['short', undefined, '24'],
      ['short', 'fr', '24'],
      ['long', undefined, '2024'],
      ['long', 'fr', '2024'],
    ] as const;

    for (const c of combi) {
      const [variant, locales, expected] = c;
      it(c.toString(), () => {
        expect(
          formatDate(DATE, { periodType: PeriodType.FiscalYearOctober, variant, locales })
        ).equal(expected);
      });
    }
  });

  describe('should format date for PeriodType.BiWeek1Sun', () => {
    const combi = [
      ['short', undefined, '11/12 - 11/25'],
      ['short', 'fr', '12/11 - 25/11'],
      ['long', undefined, '11/12/2023 - 11/25/2023'],
      ['long', 'fr', '12/11/2023 - 25/11/2023'],
    ] as const;

    for (const c of combi) {
      const [variant, locales, expected] = c;
      it(c.toString(), () => {
        expect(formatDate(DATE, { periodType: PeriodType.BiWeek1Sun, variant, locales })).equal(
          expected
        );
      });
    }
  });

  describe('should format date for PeriodType.undefined', () => {
    const expected = '2023-11-21T00:00:00-04:00';
    const combi = [
      ['short', undefined],
      ['short', 'fr'],
      ['long', undefined],
      ['long', 'fr'],
    ] as const;

    for (const c of combi) {
      const [variant, locales] = c;
      it(c.toString(), () => {
        expect(formatDate(DATE, { variant, locales })).equal(expected);
      });
    }
  });
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

describe('getPeriodTypeName()', () => {
  const combi = [
    [PeriodType.Day, undefined, 'Day'],
    [PeriodType.Day, { dico: { Day: 'Jour' } }, 'Jour'],
    [PeriodType.WeekSun, undefined, 'Week (Sun)'],
    [PeriodType.WeekSun, { dico: { Week: 'Semaine' }, locales: 'fr' }, 'Semaine (dim.)'],
    [PeriodType.WeekWed, undefined, 'Week (Wed)'],
    [PeriodType.WeekWed, { dico: { Week: 'Semaine' }, locales: 'fr' }, 'Semaine (mer.)'],
    [PeriodType.Month, undefined, 'Month'],
    [PeriodType.Month, { dico: { Month: 'Mois' } }, 'Mois'],
    [PeriodType.BiWeek2Sat, undefined, 'Bi-Week 2 (Sat)'],
    [PeriodType.BiWeek2Sat, { dico: { BiWeek: '2 sem.' }, locales: 'fr' }, '2 sem. 2 (sam.)'],
  ] as const;

  for (const c of combi) {
    const [periodType, o, expected] = c;
    it(c.toString(), () => {
      expect(getPeriodTypeName(periodType, o)).equal(expected);
    });
  }
});
