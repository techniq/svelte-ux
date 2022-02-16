import { get, camelCase, mergeWith } from 'lodash-es';

export function isLiteralObject(obj: any) {
  return obj && typeof obj === 'object' && obj.constructor === Object;
}

export function camelCaseKeys(obj: any) {
  return Object.keys(obj).reduce((acc, key) => ((acc[camelCase(key)] = obj[key]), acc), {} as any);
}

// https://codereview.stackexchange.com/questions/73714/find-a-nested-property-in-an-object
// https://github.com/dominik791/obj-traverse
export function nestedFindByPredicate(
  obj: any,
  predicate: (item: any) => boolean,
  childrenProp?: PropAccessorArg
): any | undefined {
  const getChildrenProp = propAccessor(childrenProp ?? 'children');

  if (predicate(obj)) {
    return obj;
  } else {
    const children = getChildrenProp(obj);
    if (children) {
      for (let o of children) {
        const match = nestedFindByPredicate(o, predicate, childrenProp);
        if (match) {
          return match;
        }
      }
    }
  }
}

export type PropAccessorArg = Parameters<typeof propAccessor>[0];
export function propAccessor(prop?: string | ((x: any) => any) | null) {
  return typeof prop === 'function'
    ? prop
    : typeof prop === 'string'
    ? (d: { [key: string]: any }) => get(d, prop)
    : (x: any) => x;
}

/**
 * Produce a unique Id for an object (helpful for debugging)
 * See: https://stackoverflow.com/a/35306050/191902
 */
var objIdMap = new WeakMap(),
  objectCount = 0;
export function objectId(object: any) {
  if (!objIdMap.has(object)) objIdMap.set(object, ++objectCount);
  return objIdMap.get(object);
}

export function distinctKeys(...objs: object[]) {
  const keys: string[] = [...new Set(flatten(objs.map((x: object) => Object.keys(x))))];
  return keys;
}

// Copied from `array.ts` to remove circular dependency
function flatten<T>(items: T[][]): T[] {
  return items.reduce((prev, next) => prev.concat(next), []);
}

/**
 * Recursive merge objects
 * @param object The destination object
 * @param source  The source object
 * @returns
 */
export function merge<TObject, TSource>(object: TObject, source: TSource) {
  return mergeWith(object, source, (objValue, srcValue) => {
    if (Array.isArray(srcValue)) {
      // Overwrite instead of merging by index with objValue (like standard lodash `merge` does)
      return srcValue;
    }
  });
}

export type Expiry = Date | { [prop: string]: Date | { [prop: string]: Date } };

/**
 * Remove properties from object based on expiration
 */
export function expireObject<TObject>(object, expiry: Expiry): Partial<TObject> | null {
  const now = new Date();

  if (expiry instanceof Date && expiry < now) {
    // Expired
    return null;
  } else if (typeof expiry === 'object') {
    for (let [prop, propExpiry] of Object.entries(expiry)) {
      if (propExpiry instanceof Date) {
        // Check if expired
        if (propExpiry < now) {
          if (prop === '$default') {
            // Delete all properties which do not have explicit expiry to check
            for (let [objProp, value] of Object.entries(object)) {
              if (!(objProp in expiry)) {
                delete object[objProp];
              }
            }

            // Remove expired `$default` property
            delete object[prop];
          } else {
            // Remove expired property
            delete object[prop];
          }
        } else {
          // Keep value
        }
      } else {
        // Check each property in object
        expireObject(object[prop], propExpiry);

        // Remove property if empty object (all properties removed)
        if (isLiteralObject(object[prop]) && Object.keys(object[prop]).length === 0) {
          delete object[prop];
        }
      }
    }
  }

  return isLiteralObject(object) && Object.keys(object).length === 0 ? null : object;
}

/**
 * Remove properties from an object.  See also lodash `_.omit()`
 */
export function omit<T extends object = {}>(obj: T, keys: string[]): Partial<T> {
  if (keys.length === 0) {
    return obj;
  } else {
    return Object.fromEntries(
      Object.entries(obj).filter(([key, value]) => !keys.includes(key))
    ) as Partial<T>;
  }
}

/**
 * Pick properties from an object.  See also lodash `_.pick()`
 */
export function pick<T extends object = {}>(obj: T, keys: string[]): Partial<T> {
  if (keys.length === 0) {
    return obj;
  } else {
    return Object.fromEntries(
      keys.filter((key) => key in obj).map((key) => [key, obj[key]])
    ) as Partial<T>;
  }
}
