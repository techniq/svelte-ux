import source from '$lib/actions/spotlight.ts?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      related: ['components/Shine'],
    },
  };
}
