import api from '$lib/components/Input.svelte?raw&sveld';
import source from '$lib/components/Input.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      description: 'input with mask support',
    },
  };
}
