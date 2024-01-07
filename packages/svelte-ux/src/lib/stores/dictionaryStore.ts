import { writable } from 'svelte/store';

import type { DictionaryMessages, DictionaryMessagesOptions } from '$lib/utils/dictionary';
import { buildDictionary, type SettingsInput } from '$lib/components/settings';
import type { Readable } from 'svelte/motion';

export interface DictionaryStore extends Readable<DictionaryMessages> {
  settings: (options: DictionaryMessagesOptions) => void;
}

export function createDictionaryStore(settings: SettingsInput) {
  let store = writable(buildDictionary(settings)({}));

  return {
    subscribe: store.subscribe,

    settings: (options: DictionaryMessagesOptions) => {
      store.set(buildDictionary(settings)(options));
    },
  };
}
