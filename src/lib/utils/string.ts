/**
 * Check if str only contians upper case letters
 */
export function isUpperCase(str: string) {
  return /^[A-Z]*$/.test(str);
}
