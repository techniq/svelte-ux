import source from '$lib/components/ProgressCircle.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      related: ['components/Progress'],
    },
  };
}
