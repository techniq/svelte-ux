import { writable } from 'svelte/store';

/**
 * Store to manage unique values using `Set` with improves ergonomics and better control of updates
 */
export default function uniqueStore<T = string | number>(initialValues?: T[]) {
  const store = writable<Set<T>>(new Set(initialValues ?? []));

  return {
    ...store,

    add(value: T) {
      store.update((set) => {
        set.add(value);
        return set;
      });
    },
    addEach(values: T[]) {
      store.update((set) => {
        values.forEach((value) => set.add(value));
        return set;
      });
    },

    delete(value: T) {
      store.update((set) => {
        set.delete(value);
        return set;
      });
    },

    toggle(value: T) {
      store.update((set) => {
        if (set.has(value)) {
          set.delete(value);
        } else {
          set.add(value);
        }
        return set;
      });
    },
  };
}
