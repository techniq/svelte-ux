/**
 * Get the value at path of Map.  Useful for nested maps (d3-array group, etc).
 * Similar to lodash get() but for Map instead of Object
 */
export function get<K, V>(map: Map<K, V>, path: K[]) {
  let key: K | undefined = undefined;
  let value: Map<K, V> | V | undefined = map;
  const currentPath = [...path]; // Copy since .shift() mutates original array
  while ((key = currentPath.shift())) {
    if (value instanceof Map && value.has(key)) {
      value = value.get(key);
    } else {
      return undefined;
    }
  }

  return value;
}
