import { derived, get, type Stores } from 'svelte/store';

function debounceStore<T extends Stores>(original: T, timeout = 300) {
  return derived(
    original,
    ($original, set) => {
      const timer = setTimeout(() => set($original), timeout);

      return () => {
        clearTimeout(timer);
      };
    },
    // @ts-expect-error
    get(original)
  );
}

export default debounceStore;
