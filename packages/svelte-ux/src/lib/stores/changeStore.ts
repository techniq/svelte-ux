import { derived } from 'svelte/store';
import type { Stores, StoresValues } from '../types/typeHelpers.js';

function changeStore<T extends Stores>(
  store: T,
  onChange?: ({
    previous,
    current,
  }: {
    previous: StoresValues<T> | undefined;
    current: StoresValues<T>;
  }) => any
) {
  let previous: StoresValues<T> | undefined = undefined;
  return derived(store, ($store) => {
    const value = { previous, current: $store };
    if (previous === undefined) {
      // First update
    } else if (onChange) {
      onChange(value);
    }

    previous = $store;
    return value;
  });
}

export default changeStore;
