import { writable } from 'svelte/store';

/**
 * Store to wrap `Map` to simplify syncing state (set, delete, clear) with Svelte
 */
export default function mapStore<TKey, TValue>(
  initialValues?: ConstructorParameters<typeof Map<TKey, TValue>>[0]
) {
  const store = writable<Map<TKey, TValue>>(new Map<TKey, TValue>(initialValues));

  return {
    subscribe: store.subscribe,

    set(key: TKey, value: TValue) {
      store.update((map) => {
        map.set(key, value);
        return map;
      });
    },

    delete(key: TKey) {
      store.update((map) => {
        map.delete(key);
        return map;
      });
    },

    clear() {
      store.update((map) => {
        map.clear();
        return map;
      });
    },
  };
}
