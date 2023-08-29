import source from '$lib/stores/mapStore.ts?raw';
import pageSource from './+page.md?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      description: 'Store to wrap `Map` to simplify syncing state (set, delete, clear) with Svelte',
      related: ['stores/uniqueStore'],
    },
  };
}
