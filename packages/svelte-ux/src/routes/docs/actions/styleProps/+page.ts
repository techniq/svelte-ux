import source from '$lib/actions/styleProps.ts?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      description: 'Reactively set style properties using a single object.',
    },
  };
}
