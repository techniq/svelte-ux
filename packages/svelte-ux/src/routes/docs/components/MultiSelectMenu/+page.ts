import api from '$lib/components/MultiSelectMenu.svelte?raw&sveld';
import source from '$lib/components/MultiSelectMenu.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      related: ['components/Menu', 'components/MultiSelect', 'components/MultiSelectField'],
    },
  };
}
