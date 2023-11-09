import { writable } from 'svelte/store';

export type PromiseStoreData<T> = {
  loading: boolean;
  data?: T;
  error?: Error;
  aborted?: boolean;
};

const WAITING = Symbol();

/**
 * Wraps a Promise as a store.  Useful for SvelteKit streamed data handling
 */
export function promiseStore<T>(initialValue?: Promise<T> | null) {
  let currentPromise: Promise<T> | null = null;

  let store = writable<PromiseStoreData<T>>({
    loading: false,
    aborted: false,
  });

  let result = {
    subscribe: store.subscribe,

    async setPromise(promise: Promise<T> | undefined) {
      if (!promise) {
        currentPromise = null;
        store.set({
          data: undefined,
          loading: false,
          aborted: false,
        });
        return;
      }

      // If promise is already resolved, update immediately
      const resolved = await Promise.race([promise, Promise.resolve(WAITING)]);
      if (resolved === WAITING) {
        store.update((s) => ({ ...s, loading: true }));
      }

      if (promise !== currentPromise) {
        currentPromise = promise;
        try {
          const data = await promise;
          if (currentPromise === promise) {
            store.set({ data, loading: false, aborted: false });
          }
        } catch (err) {
          if (currentPromise === promise) {
            const error = err as Error;
            store.set({ error, aborted: error.name === 'AbortError', loading: false });
          }
        }
      }
    },
  };

  if (initialValue) {
    result.setPromise(initialValue);
  }

  return result;
}
