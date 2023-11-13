import source from '$lib/utils/string.ts?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      description: 'String utilities',
    },
  };
}
