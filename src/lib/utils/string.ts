/**
 * Check if str only contians upper case letters
 */
export function isUpperCase(str: string) {
  return /^[A-Z]*$/.test(str);
}

/**
 * Generates a unique Id, with prefix if provided
 */
let idCounter = 0;
export function uniqueId(prefix = '') {
  var id = ++idCounter;
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
