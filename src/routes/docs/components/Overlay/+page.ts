import api from '$lib/components/Overlay.svelte?raw&sveld';
import source from '$lib/components/Overlay.svelte?raw';
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
