import source from '$lib/stores/localStore.ts?raw';
import pageSource from './+page.md?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      description: 'Read and write to localStorage with expiration support',
    },
  };
}
