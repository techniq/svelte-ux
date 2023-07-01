import api from '$lib/components/ResponsiveMenu.svelte?raw&sveld';
import source from '$lib/components/ResponsiveMenu.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      description: 'Dynamically switch between menu and bottom drawer based on viewport width',
    },
  };
}
