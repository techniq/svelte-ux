import source from '$lib/stores/debounceStore.ts?raw';
import pageSource from './+page.md?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      description: 'Delay store update until some time has passed since the last update',
    },
  };
}
