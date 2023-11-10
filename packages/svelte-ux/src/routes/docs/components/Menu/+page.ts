import api from '$lib/components/Menu.svelte?raw&sveld';
import source from '$lib/components/Menu.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      related: [
        'components/MenuItem',
        'components/MenuButton',
        'components/MenuField',
        'components/SelectField',
        'components/ResponsiveMenu',
      ],
    },
  };
}
