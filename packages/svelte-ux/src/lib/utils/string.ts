import { entries } from '../types/typeHelpers.js';

/**
 * Check if str only contians upper case letters
 */
export function isUpperCase(str: string) {
  return /^[A-Z]*$/.test(str);
}

/**
 * Returns string with the first letter of each word converted to uppercase (and remainder as lowercase)
 */
export function toTitleCase(str: string, ignore = ['a', 'an', 'is', 'the']) {
  return str
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      if (index > 0 && ignore.includes(word)) {
        return word;
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
    })
    .join(' ');
}

/**
 * Generates a unique Id, with prefix if provided
 */
const idMap = new Map<string, number>();
export function uniqueId(prefix = '') {
  let id = (idMap.get(prefix) ?? 0) + 1;
  idMap.set(prefix, id);
  return prefix + id;
}

/**
 * Truncate text with option to keep a number of characters on end.  Inserts ellipsis between parts
 */
export function truncate(text: string, totalChars: number, endChars: number = 0) {
  endChars = Math.min(endChars, totalChars);

  const start = text.slice(0, totalChars - endChars);
  const end = endChars > 0 ? text.slice(-endChars) : '';

  if (start.length + end.length < text.length) {
    return start + '…' + end;
  } else {
    return text;
  }
}

/** Get the roman numeral for the given value */
export function romanize(value: number) {
  const lookup = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };

  let result = '';

  for (let [numeral, numeralValue] of entries(lookup)) {
    while (value >= numeralValue) {
      result += numeral;
      value -= numeralValue;
    }
  }

  return result;
}
