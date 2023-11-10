import api from '$lib/components/AppLayout.svelte?raw&sveld';
import source from '$lib/components/AppLayout.svelte?raw';
import pageSource from './+page.md?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
    },
  };
}
