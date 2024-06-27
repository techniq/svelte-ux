import { rollup } from 'd3-array';
import { get, isFunction } from 'lodash-es';

export default function <T = any>(
  data: T[],
  reduce: (values: T[]) => any,
  keys: (((d: any) => any) | string | null)[] = [],
  emptyKey = 'Unknown'
) {
  // TODO: Fix object[] type if needed
  // if (keys.length === 0) {
  //   return data;
  // }

  const keyFuncs = keys.map((key) => {
    if (isFunction(key)) {
      return key;
    } else if (typeof key === 'string') {
      return (d: any) => get(d, key) || emptyKey;
    } else {
      return () => 'Overall';
    }
  });

  return rollup(data, reduce, ...keyFuncs);
}
