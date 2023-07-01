import api from '$lib/components/Tilt.svelte?raw&sveld';
import source from '$lib/components/Tilt.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
    },
  };
}
