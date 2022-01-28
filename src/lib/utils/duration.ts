import { parseISO } from 'date-fns';

export type Duration = {
  milliseconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  years: number;
};

export enum DurationUnits {
  Year,
  Day,
  Hour,
  Minute,
  Second,
  Millisecond,
}
// export enum DurationUnits {
//   Millisecond = 1,
//   Second = 1000 * Millisecond,
//   Minute = 60 * Second,
//   Hour = 60 * Minute,
//   Day = 24 * Hour,
//   Year = 365 * Day,
// }

export function getDuration(start: Date | string, end?: Date | string | null): Duration | null {
  const startDate = typeof start === 'string' ? parseISO(start) : start;
  const endDate = typeof end === 'string' ? parseISO(end) : end;

  const difference = Number(endDate || new Date()) - Number(startDate);
  const durationInMs = Math.abs(difference);
  const sign = Math.sign(difference);

  if (!Number.isFinite(durationInMs)) {
    return null;
  }

  var milliseconds = durationInMs;
  var seconds = 0;
  var minutes = 0;
  var hours = 0;
  var days = 0;
  var years = 0;

  if (milliseconds >= 1000) {
    seconds = (durationInMs - (durationInMs % 1000)) / 1000;
    milliseconds = milliseconds - seconds * 1000;
  }

  if (seconds >= 60) {
    minutes = (seconds - (seconds % 60)) / 60;
    seconds = seconds - minutes * 60;
  }

  if (minutes >= 60) {
    hours = (minutes - (minutes % 60)) / 60;
    minutes = minutes - hours * 60;
  }

  if (hours >= 24) {
    days = (hours - (hours % 24)) / 24;
    hours = hours - days * 24;
  }

  if (days >= 365) {
    years = (days - (days % 365)) / 365;
    days = days - years * 365;
  }

  return {
    milliseconds,
    seconds,
    minutes,
    hours,
    days,
    years,
  };
}

// See also: https://stackoverflow.com/questions/19700283/how-to-convert-time-milliseconds-to-hours-min-sec-format-in-javascript/33909506
export function humanizeDuration(config: {
  start: Date;
  end?: Date | null;
  minUnits?: DurationUnits;
  totalUnits?: number;
  variant?: 'short' | 'long';
}) {
  const { start, end, minUnits, totalUnits = 99, variant = 'short' } = config;

  const duration = getDuration(start, end);

  if (duration === null) {
    return 'unknown';
  }

  var sentenceArr = [];
  var unitNames =
    variant === 'short'
      ? ['y', 'd', 'h', 'm', 's', 'ms']
      : ['years', 'days', 'hours', 'minutes', 'seconds', 'milliseconds'];
  var unitNums = [
    duration.years,
    duration.days,
    duration.hours,
    duration.minutes,
    duration.seconds,
    duration.milliseconds,
  ].filter((x, i) => i <= (minUnits || 99));

  // Combine unit numbers and names
  for (var i in unitNums) {
    if (sentenceArr.length >= totalUnits) {
      break;
    }

    const unitNum = unitNums[i];
    let unitName = unitNames[i];

    // Hide `0` values unless last unit (and none shown before)
    if (unitNum !== 0 || (sentenceArr.length === 0 && Number(i) === unitNums.length - 1)) {
      switch (variant) {
        case 'short':
          sentenceArr.push(unitNum + unitName);
          break;

        case 'long':
          if (unitNum === 1) {
            // Trim off plural `s`
            unitName = unitName.slice(0, -1);
          }
          sentenceArr.push(unitNum + ' ' + unitName);
          break;
      }
    }
  }

  const sentence = sentenceArr.join(variant === 'long' ? ' and ' : ' ');
  return sentence;
}
