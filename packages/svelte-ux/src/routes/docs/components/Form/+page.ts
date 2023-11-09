import api from '$lib/components/Form.svelte?raw&sveld';
import source from '$lib/components/Form.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      related: ['stores/formStore'],
    },
  };
}
