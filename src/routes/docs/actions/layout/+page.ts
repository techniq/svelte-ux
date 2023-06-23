import source from '$lib/actions/layout.ts?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      related: ['components/Overflow'],
    },
  };
}
