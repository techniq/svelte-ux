import source from '$lib/components/State.svelte?raw';
import pageSource from './+page.md?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
    },
  };
}
