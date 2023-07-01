import api from '$lib/components/AppBar.svelte?raw&sveld';
import source from '$lib/components/AppBar.svelte?raw';
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
