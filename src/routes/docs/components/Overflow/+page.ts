import source from '$lib/components/Overflow.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      related: ['actions/layout'],
    },
  };
}
