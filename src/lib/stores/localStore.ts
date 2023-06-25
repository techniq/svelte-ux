import { writable } from 'svelte/store';
import { isFunction } from 'lodash-es';

import { parse, stringify } from '../utils/json';
import { expireObject } from '../utils/object';
import type { Expiry } from '../utils/object';
import { browser } from '../utils/env';

// https://stackoverflow.com/questions/56488202/how-to-persist-svelte-store
// https://github.com/joshnuss/svelte-local-storage-store/blob/master/src/index.js
// https://github.com/andsala/svelte-persistent-store/blob/master/src/generator.ts
// https://github.com/sbcs-chh/app-finance/blob/develop/Finance.Web/ClientApp/src/hooks/LocalStorage.tsx
// https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_stores#implementing_our_custom_todos_store

type LocalStoreOptions<Value> = {
  expiry?: Expiry | ((previousExpiry: Expiry | undefined | null) => Expiry);
  override?: Value;
};

function localStore<Value>(key: string, initialValue: Value, options?: LocalStoreOptions<Value>) {
  let value = initialValue;
  let previousExpiry: Expiry | null = null;

  if (options?.override != null) {
    value = options?.override;
  } else {
    const storedValue = browser ? localStorage.getItem(key) : null;
    if (storedValue !== null) {
      const decodedValue = parse(storedValue);
      if (options?.expiry) {
        // TODO: if object returned, merge with initialValue (sub-properties)?
        value = expireObject<Value>(decodedValue.value, decodedValue.expiry) ?? initialValue;

        previousExpiry = decodedValue.expiry;
      } else {
        value = decodedValue;
      }
    }
  }

  const store = writable<Value>(value);

  if (browser) {
    store.subscribe((val) => {
      if (options?.expiry) {
        // Remove all expired expiry
        const prunedPreviousExpiry = previousExpiry
          ? expireObject(previousExpiry, previousExpiry)
          : previousExpiry;

        const expiry = isFunction(options?.expiry)
          ? options?.expiry(prunedPreviousExpiry) // Update expiry on write
          : options?.expiry;
        previousExpiry = expiry;

        localStorage.setItem(key, stringify({ value: val, expiry }));
      } else {
        localStorage.setItem(key, stringify(val));
      }
    });
  }

  return store;
}

export default localStore;
