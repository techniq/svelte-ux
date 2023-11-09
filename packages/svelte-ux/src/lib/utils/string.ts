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
