import source from '$lib/components/ResponsiveMenu.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      description: 'Dynamically switch between menu and bottom drawer based on viewport width',
    },
  };
}
