import { parseISO } from 'date-fns';

// UTC (yyyy-mm-ddThh:mm:ssZ) or Offset (yyyy-mm-ddThh:mm:ss-ZZ:ZZ) or Date-only (yyyy-mm-dd)
// '1982-03-30'
// '1982-03-30T11:25:59Z'
// '1982-03-30T11:25:59-04:00'
// '1982-03-30T11:25:59.123Z'
// '1982-03-30T11:25:59.1234567Z'
const DATE_FORMAT = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(.\d{3,7}|)(Z|(-|\+)\d{2}:\d{2}))?$/;

export function encode(value: any): string {
  // if (isPlainObject(value) || Array.isArray(value)) {
  //   return JSON.stringify(value)
  // } else if (['boolean', 'number', 'string'].includes(typeof value))
  //   return value.toString();
  // }
  return JSON.stringify(value);
}

export function decode(value: string): any {
  // let number;
  // if (value === 'true') {
  //   return true;
  // } else if (value === 'false') {
  //   return false;
  // } else if (value === 'NaN') {
  //   return NaN;
  // } else if (!isNaN((number = +value))) {
  //   return number;
  // } else if (DATETIME_FORMAT.test(value)) {
  //   return new Date(value);
  // } else if (value.startsWith('{') || value.startsWith('[')) {
  //   // Object or Array
  //   return JSON.parse(value, reviver);
  // } else {
  //   // Leave as string
  //   return value;
  // }
  let result;
  try {
    result = JSON.parse(value, reviver);
  } catch (e) {
    // Keep as string (ex. "foo")
    result = value;
  }

  return result;
}

/**
 * Convert date strings to Date instances
 */
export function reviver(key: string, value: string) {
  if (typeof value === 'string' && DATE_FORMAT.test(value)) {
    return parseISO(value);
  }

  return value;
}
