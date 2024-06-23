import { get, camelCase, mergeWith } from 'lodash-es';
import { entries, fromEntries, keys } from '../types/typeHelpers.js';

export function isLiteralObject(obj: any): obj is object {
  return obj && typeof obj === 'object' && obj.constructor === Object;
}

export function isEmptyObject(obj: any) {
  return isLiteralObject(obj) && keys(obj).length === 0;
}

export function camelCaseKeys(obj: any) {
  return keys(obj).reduce(
    (acc, key) => ((acc[camelCase(key ? String(key) : undefined)] = obj[key]), acc),
    {} as any
  );
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
  return [...new Set(flatten(objs.map((x: object) => keys(x as Record<string, any>))))];
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
export function expireObject<TObject>(object: TObject, expiry: Expiry): Partial<TObject> | null {
  const now = new Date();

  if (expiry instanceof Date || typeof object !== 'object' || object == null) {
    // Expired
    if (expiry < now) {
      return null;
    }
    // Not expired
    return object;
  }

  // LoopIterate over the properties in `object`
  for (let [prop, propExpiry] of entries(expiry)) {
    if (propExpiry instanceof Date) {
      // Check if expired
      if (propExpiry < now) {
        if (prop === '$default') {
          // Delete all properties which do not have explicit expiry to check
          for (let objProp of keys(object) as Array<keyof TObject>) {
            if (!(objProp in expiry)) {
              delete object[objProp];
            }
          }

          // Remove expired `$default` property
          // @ts-expect-error it's fine if the property doesn't exist in object
          delete object[prop];
        } else {
          // Remove expired property
          // @ts-expect-error it's fine if the property doesn't exist in object
          delete object[prop];
        }
      } else {
        // Keep value
      }
    } else {
      // Check expiry for each property in object.  Skip if prop not in object (expiry only)
      const value = object[prop as keyof TObject];
      if (value && typeof value === 'object') {
        expireObject(value, propExpiry);

        // Remove property if empty object (all properties removed)
        if (isEmptyObject(value)) {
          delete object[prop as keyof TObject];
        }
      }
    }
  }

  return isEmptyObject(object) ? null : object;
}

/**
 * Remove properties from an object.  See also lodash `_.omit()`
 */
export function omit<T extends object = {}>(obj: T, keys: (keyof T)[]): Partial<T> {
  if (keys.length === 0) {
    return obj;
  } else {
    return fromEntries(
      entries(obj).filter(([key]: [keyof T, T[keyof T]]) => !keys.includes(key))
    ) as Partial<T>;
  }
}

/**
 * Remove `null` or `undefined` properties from an object
 */
export function omitNil<T extends object = {}>(obj: T): Partial<T> {
  if (keys.length === 0) {
    return obj;
  } else {
    return fromEntries(
      entries(obj).filter(([key, value]: [keyof T, T[keyof T]]) => value != null)
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
    return fromEntries(
      keys.filter((key) => key in obj).map((key) => [key, obj[key as keyof T]])
    ) as Partial<T>;
  }
}

/**
 * Create new object with keys and values swapped.  Last value's key is used if duplicated
 */
export function keysByValues<T extends object>(obj: T): Record<string, keyof T> {
  return fromEntries(entries(obj).map(([key, value]) => [String(value), key]));
}
