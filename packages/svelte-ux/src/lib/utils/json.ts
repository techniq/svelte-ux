import { parseISO } from 'date-fns';

/**
 *  JSON.stringify() with custom handling for `Map` and `Set`.  To be used with `parse()`
 */
export function stringify(value: any): string {
  return JSON.stringify(value, replacer);
}

export function replacer(key: string, value: any) {
  if (value instanceof Map) {
    return {
      _type: 'Map',
      value: Array.from(value.entries()),
    };
  } else if (value instanceof Set) {
    return {
      _type: 'Set',
      value: Array.from(value.values()),
    };
  } else {
    return value;
  }
}

/**
 * JSON.parse() with support for restoring `Date`, `Map`, and `Set` instances. `Map` and `Set` require using accompanying `stringify()`
 */
export function parse<T = any>(value: string): T {
  let result;
  try {
    result = JSON.parse(value, reviver);
  } catch (e) {
    result = value;
  }

  return result;
}

/**
 * Convert date strings to Date instances
 */
export function reviver(key: string, value: any) {
  if (typeof value === 'string' && DATE_FORMAT.test(value)) {
    return parseISO(value);
  } else if (typeof value === 'object' && value !== null) {
    if (value._type === 'Map') {
      return new Map(value.value);
    } else if (value._type === 'Set') {
      return new Set(value.value);
    }
  }

  return value;
}

// UTC (yyyy-mm-ddThh:mm:ssZ) or Offset (yyyy-mm-ddThh:mm:ss-ZZ:ZZ) or Date-only (yyyy-mm-dd)
// '1982-03-30'
// '1982-03-30T11:25:59Z'
// '1982-03-30T11:25:59-04:00'
// '1982-03-30T11:25:59.123Z'
// '1982-03-30T11:25:59.1234567Z'
const DATE_FORMAT = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(.\d+|)(Z|(-|\+)\d{2}:\d{2}))?$/;
