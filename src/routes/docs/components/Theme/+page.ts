import source from '$lib/components/Theme.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      description: 'Create theme context as component.  Typically `createTheme()` is used directly',
    },
  };
}
