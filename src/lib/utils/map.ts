/**
 * Get the value at path of Map.  Useful for nested maps (d3-array group, etc).
 * Similar to lodash get() but for Map instead of Object
 */
export function get<K, V>(map: Map<K, V>, path: string[]) {
  let key = null;
  let value = map;
  while ((key = path.shift())) {
    value = value.get(key);
  }

  return value;
}
