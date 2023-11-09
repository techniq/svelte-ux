import api from '$lib/components/Grid.svelte?raw&sveld';
import source from '$lib/components/Grid.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      description: 'Use tailwind classes instead',
      status: 'deprecated',
    },
  };
}
