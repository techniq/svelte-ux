import api from '$lib/components/ProgressCircle.svelte?raw&sveld';
import source from '$lib/components/ProgressCircle.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      related: ['components/Progress'],
    },
  };
}
