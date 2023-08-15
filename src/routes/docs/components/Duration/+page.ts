import api from '$lib/components/Duration.svelte?raw&sveld';
import source from '$lib/components/Duration.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      related: ['stores/timerStore'],
    },
  };
}
