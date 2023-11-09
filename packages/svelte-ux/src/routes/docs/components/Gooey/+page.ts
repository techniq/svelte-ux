import api from '$lib/components/Gooey.svelte?raw&sveld';
import source from '$lib/components/Gooey.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      related: ['components/Shine'],
    },
  };
}
