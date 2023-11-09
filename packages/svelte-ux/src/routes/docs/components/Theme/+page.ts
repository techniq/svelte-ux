import api from '$lib/components/Theme.svelte?raw&sveld';
import source from '$lib/components/Theme.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      description:
        'Create theme context as a component.  Useful to scope theme within a component tree, although typically `createTheme()` is used directly',
      related: ['/customization'],
    },
  };
}
