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
