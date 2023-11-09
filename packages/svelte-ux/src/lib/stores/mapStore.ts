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

    update(key: TKey, updater: (current: TValue | undefined) => TValue) {
      store.update((map) => {
        const current = map.get(key);
        map.set(key, updater(current));
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

    /**
     * Force a reactive update in case of internal changes to entries
     */
    refresh() {
      store.update((map) => {
        return map;
      });
    },
  };
}
