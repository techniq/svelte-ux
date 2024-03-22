import { derived, get } from 'svelte/store';
import type { Stores } from '../types/typeHelpers.js';

function debounceStore<T extends Stores>(original: T, timeout = 300) {
  return derived(
    original,
    ($original, set) => {
      const timer = setTimeout(() => set($original), timeout);

      return () => {
        clearTimeout(timer);
      };
    },
    get(original)
  );
}

export default debounceStore;
