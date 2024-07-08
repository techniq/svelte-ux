import { derived, get, type Readable } from 'svelte/store';

function debounceStore<T extends Readable<any>>(original: T, timeout = 300) {
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
