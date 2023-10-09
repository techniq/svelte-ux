import source from '$lib/stores/promiseStore.ts?raw';
import pageSource from './+page.md?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      description: 'Wraps a Promise as a store.  Useful for SvelteKit streamed data handling',
    },
  };
}
