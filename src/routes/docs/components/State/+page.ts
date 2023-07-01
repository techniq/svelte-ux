import api from '$lib/components/State.svelte?raw&sveld';
import source from '$lib/components/State.svelte?raw';
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
