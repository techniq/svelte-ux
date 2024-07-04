import { greatest, rollup } from 'd3-array';

import { propAccessor } from './object.js';
import type { PropAccessorArg } from './object.js';
import { entries, fromEntries } from '../types/typeHelpers.js';

// Helper until Array.flat is more mainstream - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
// See also: https://lodash.com/docs/4.17.11#flatten
// https://stackoverflow.com/a/55345130/191902
export function flatten<T>(items: T[][]): T[] {
  return items.reduce((prev, next) => prev.concat(next), []);
}

/**
 * Combine values using reducer.  Returns null if all values null (unlike d3.sum)
 */
export function combine(
  values: (number | null)[],
  func: (total: number | null, operand: number | null) => number
) {
  if (values.every((x) => x == null)) {
    return null;
  }

  return values.reduce(func);
}

/**
 * Sum values but maintain null if all values null (unlike d3.sum)
 */
export function sum(items: (object | null)[], prop?: PropAccessorArg) {
  const getProp = propAccessor(prop);
  const values = items.map((x) => getProp(x as any));

  return combine(values, (total, operand) => (total || 0) + (operand || 0));
}

/**
 * Sum array of objects by property
 */
export function sumObjects(items: (object | null)[], prop?: PropAccessorArg) {
  const getProp = propAccessor(prop);

  const result = rollup(
    items.flatMap((x) => entries(x ?? {})),
    (values) =>
      sum(values, (d) => {
        const value = Number(getProp(d[1]));
        return Number.isFinite(value) ? value : 0;
      }),
    (d) => d[0]
  );

  return items.every(Array.isArray) ? Array.from(result.values()) : fromEntries(result);
}

/**
 * Subtract each value from previous but maintain null if all values null (unlike d3.sum)
 */
export function subtract(items: (object | null)[], prop?: PropAccessorArg) {
  const getProp = propAccessor(prop);
  const values = items.map((x) => getProp(x as any));

  return combine(values, (total, operand) => (total || 0) - (operand || 0));
}

/**
 * Average values but maintain null if all values null (unlike d3.mean)
 */
export function average(items: (object | null)[], prop?: PropAccessorArg) {
  const total = sum(items, prop);
  return total !== null ? total / items.length : null;
}

/**
 * Moving average.
 *   @see https://observablehq.com/@d3/moving-average
 *   @see https://mathworld.wolfram.com/MovingAverage.html
 */
export function movingAverage(
  items: (object | null)[],
  windowSize: number,
  prop?: PropAccessorArg
) {
  const getProp = propAccessor(prop);
  let sum = 0;

  const means = items.map((item, i) => {
    const value = getProp(item as any);
    sum += value ?? 0;

    if (i >= windowSize - 1) {
      const mean = sum / windowSize;

      // Remove oldest item in window for next iteration
      const oldestValue = getProp(items[i - windowSize + 1] as any);
      sum -= oldestValue ?? 0;

      return mean;
    } else {
      // Not enough values available in window yet
      return null;
    }
  });

  return means;
}

/**
 * Return the unique set of values (remove duplicates)
 */
export function unique(values: any[]) {
  return Array.from(new Set(values));
}

/**
 * Join values up to a maximum with `separator`, then truncate with total
 */
export function joinValues(values: string[] = [], max: number = 3, separator = ', ') {
  const total = values.length;

  if (total <= max) {
    return values.join(separator);
  } else {
    if (max === 0) {
      if (values.length === 1) {
        return values[0];
      } else {
        return `(${total} total)`;
      }
    } else {
      return `${values.slice(0, max).join(separator)}, ... (${total} total)`;
    }
  }
}

/**
 * Recursively transverse nested arrays by path
 */
export function nestedFindByPath(
  arr: any[],
  path: string[],
  props?: {
    key?: PropAccessorArg;
    values?: PropAccessorArg;
  },
  depth = 0
): any {
  const getKeyProp = propAccessor(props?.key ?? 'key');
  const getValuesProp = propAccessor(props?.values ?? 'values');

  const item = arr.find((x) => getKeyProp(x) === path[depth]);
  if (depth === path.length - 1) {
    return item;
  } else {
    const children = getValuesProp(item);
    if (children) {
      return nestedFindByPath(getValuesProp(item), path, props, depth + 1);
    }
  }
}

/**
 * Recursively transverse nested arrays looking for item
 */
export function nestedFindByPredicate(
  arr: any[],
  predicate: (item: any, index: number) => boolean,
  childrenProp?: PropAccessorArg
): any | undefined {
  const getChildrenProp = propAccessor(childrenProp ?? 'children');

  let match = arr.find(predicate);
  if (match) {
    return match;
  } else {
    for (var item of arr) {
      const children = getChildrenProp(item);
      if (children) {
        match = nestedFindByPredicate(getChildrenProp(item), predicate, childrenProp);
        if (match) {
          return match;
        }
      }
    }
  }

  return undefined;
}

export type TreeNode = { id: string; name: string; level: number; children: TreeNode[] };

/**
 * Given a flat array of objects with a `level` property, build a nested object with `children`
 */
export function buildTree<T extends Omit<TreeNode, 'children'>>(arr: T[]): TreeNode[] {
  var levels = [{}] as Array<T & { children?: any[] }>;
  arr.forEach((o) => {
    levels.length = o.level;
    levels[o.level - 1].children = levels[o.level - 1].children || [];
    levels[o.level - 1].children?.push(o);
    levels[o.level] = o;
  });
  return levels[0].children ?? [];
}

/**
 * Transverse array tree in depth-first order and execute callback for each item
 */
export function walk<T>(arr: T[], children: Function, callback: Function) {
  arr.forEach((item) => {
    callback(item);

    if (children(item)) {
      walk(children(item), children, callback);
    }
  });
}

/**
 * Build flatten array in depth-first order (using `walk`)
 */
export function flattenTree<T>(arr: T[], children: Function) {
  const flatArray: T[] = [];
  walk(arr, children, (item: any) => flatArray.push(item));

  return flatArray;
}

export function chunk(array: any[], size: number) {
  return array.reduce((acc, item, index) => {
    const bucket = Math.floor(index / size);

    if (!acc[bucket]) {
      acc[bucket] = [];
    }
    acc[bucket].push(item);

    return acc;
  }, []);
}

/**
 * Get evenly spaced samples from array
 * see: https://observablehq.com/@mbostock/evenly-spaced-sampling
 * see also: https://observablehq.com/@jonhelfman/uniform-sampling-variants
 */
export function samples(array: any[], size: number) {
  if (!((size = Math.floor(size)) > 0)) return []; // return nothing
  const n = array.length;
  if (!(n > size)) return [...array]; // return everything
  if (size === 1) return [array[n >> 1]]; // return the midpoint
  return Array.from({ length: size }, (_, i) => array[Math.round((i / (size - 1)) * (n - 1))]);
}

/**
 * Adds item at `index` and returns array
 * Note: mutates, wrap with immer `produce(array, draft => addItem(draft))` for immutable
 */
export function addItem(array: any[], item: any, index: number) {
  array.splice(index, 0, item);
  return array;
}

/**
 * Move item `from` index `to` index and returns array
 * Note: mutates, wrap with immer `produce(array, draft => moveItem(draft))` for immutable
 */
export function moveItem(array: any[], from: number, to: number) {
  var item = array[from];
  array.splice(from, 1);
  array.splice(to, 0, item);
  return array;
}

/**
 * Remove item at `index` returns array (not removed item)
 * Note: mutates, wrap with immer `produce(array, draft => removeItem(draft))` for immutable
 */
export function removeItem(array: any[], index: number) {
  array.splice(index, 1);
  return array;
}

/**
 * Get the greatest absolute value in an array of numbers
 */
export function greatestAbs(array: number[]) {
  return greatest(array, (a, b) => Math.abs(a) - Math.abs(b));
}
