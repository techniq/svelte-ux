import source from '$lib/stores/debounceStore.ts?raw';
import pageSource from './+page.md?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      description: 'Debounce store updates',
    },
  };
}
