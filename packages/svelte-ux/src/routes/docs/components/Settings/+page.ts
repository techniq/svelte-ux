import api from '$lib/components/Settings.svelte?raw&sveld';
import source from '$lib/components/Settings.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      description:
        'Create settings context as a component.  Useful to scope theme, numbers, ... within a component tree, although typically `settings()` is used directly',
      related: ['/customization'],
    },
  };
}
