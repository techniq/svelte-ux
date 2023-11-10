import api from '$lib/components/MenuButton.svelte?raw&sveld';
import source from '$lib/components/MenuButton.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      related: [
        'components/Menu',
        'components/MenuItem',
        'components/MenuField',
        'components/SelectField',
      ],
    },
  };
}
