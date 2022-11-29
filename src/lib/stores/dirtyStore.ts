import { derived } from 'svelte/store';
import type { Stores } from '$lib/types';

function dirtyStore<T extends Stores>(store: T) {
  let dirty = false;
  return derived(store, ($store) => {
    if (dirty) {
      // Subsequent updates
      return true;
    } else {
      // First update
      dirty = true;
      return false;
    }
  });
}

export default dirtyStore;
