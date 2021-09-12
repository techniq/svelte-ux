const DATETIME_FORMAT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/; // yyyy-mm-ddThh:mm:ssZ

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
  if (typeof value === 'string' && DATETIME_FORMAT.test(value)) {
    return new Date(value);
  }

  return value;
}
