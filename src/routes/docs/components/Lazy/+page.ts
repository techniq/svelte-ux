import source from '$lib/components/Lazy.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      description:
        'Waits to render a component until visible. Requires placeholder size (min-height)',
      related: ['actions/observer'],
    },
  };
}
