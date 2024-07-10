import { parseISO } from 'date-fns';
import { isStringDate } from './date.js';

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
  if (typeof value === 'string' && isStringDate(value)) {
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
