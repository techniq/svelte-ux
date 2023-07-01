import api from '$lib/components/Table.svelte?raw&sveld';
import source from '$lib/components/Table.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      related: ['actions/table'],
    },
  };
}
