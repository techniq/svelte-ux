import { describe, it, expect } from 'vitest';
import { PeriodType, formatDate, getMonthDaysByWeek, localToUtcDate, utcToLocalDate } from './date';

const DATE = '2023-11-21'; // "good" default date as the day (21) is bigger than 12 (number of months). And november is a good month1 (because why not?)

describe('formatDate()', () => {
  it('should return empty string for null or undefined date', () => {
    expect(formatDate(null)).equal('');
    expect(formatDate(undefined)).equal('');
  });

  it('should return empty string for invalid date', () => {
    expect(formatDate('invalid date')).equal('');
  });

  it('should format date for PeriodType.Day', () => {
    const date = new Date(2023, 10, 21);
    expect(formatDate(date, { periodType: PeriodType.Day, variant: 'short' })).equal('11/21');
    expect(formatDate(date, { periodType: PeriodType.Day, variant: 'long' })).equal('Nov 21, 2023');
  });

  it('should format date string', () => {
    expect(formatDate(DATE, { periodType: PeriodType.Day, variant: 'short' })).equal('11/21');
    expect(formatDate(DATE, { periodType: PeriodType.Day, variant: 'long' })).equal('Nov 21, 2023');
  });

  it('should format date for PeriodType.Week', () => {
    expect(formatDate(DATE, { periodType: PeriodType.WeekSun, variant: 'short' })).equal(
      '11/19 - 11/25'
    );
    expect(formatDate(DATE, { periodType: PeriodType.WeekSun, variant: 'long' })).equal(
      '11/19/2023 - 11/25/2023'
    );
    expect(formatDate(DATE, { periodType: PeriodType.WeekMon, variant: 'long' })).equal(
      '11/20/2023 - 11/26/2023'
    );
  });

  it('should format date for PeriodType.Month', () => {
    expect(formatDate(DATE, { periodType: PeriodType.Month, variant: 'short' })).equal('Nov 23');
    expect(formatDate(DATE, { periodType: PeriodType.Month, variant: 'long' })).equal(
      'November 2023'
    );
  });

  it('should format date for PeriodType.Quarter', () => {
    expect(formatDate(DATE, { periodType: PeriodType.Quarter, variant: 'short' })).equal(
      'Oct - Dec 23'
    );
    expect(formatDate(DATE, { periodType: PeriodType.Quarter, variant: 'long' })).equal(
      'October - December 2023'
    );
  });

  it('should format date for PeriodType.CalendarYear', () => {
    expect(formatDate(DATE, { periodType: PeriodType.CalendarYear, variant: 'short' })).equal('23');
    expect(formatDate(DATE, { periodType: PeriodType.CalendarYear, variant: 'long' })).equal(
      '2023'
    );
  });

  it('should format date for PeriodType.FiscalYearOctober', () => {
    expect(
      formatDate(DATE, {
        periodType: PeriodType.FiscalYearOctober,
        variant: 'short',
      })
    ).equal('24');
    expect(
      formatDate(DATE, {
        periodType: PeriodType.FiscalYearOctober,
        variant: 'long',
      })
    ).equal('2024');
  });

  it('should format date for PeriodType.BiWeek1Sun', () => {
    expect(formatDate(DATE, { periodType: PeriodType.BiWeek1Sun, variant: 'short' })).equal(
      '11/12 - 11/25'
    );
    expect(formatDate(DATE, { periodType: PeriodType.BiWeek1Sun, variant: 'long' })).equal(
      '11/12/2023 - 11/25/2023'
    );
  });

  it('should format date for PeriodType.undefined', () => {
    expect(formatDate(DATE, { variant: 'short' })).equal('2023-11-21T00:00:00-04:00');
    expect(formatDate(DATE, { variant: 'long' })).equal('2023-11-21T00:00:00-04:00');
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
