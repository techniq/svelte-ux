import { derived } from 'svelte/store';
import type { Stores } from '$lib/types';

function changeStore<T extends Stores>(
  store: T,
  onChange?: ({ previous, current }: { previous: T; current: T }) => any
) {
  let previous = null;
  return derived(store, ($store) => {
    const value = { previous, current: $store };
    if (previous == null) {
      // First update
    } else if (onChange) {
      onChange(value);
    }

    previous = $store;
    return value;
  });
}

export default changeStore;
