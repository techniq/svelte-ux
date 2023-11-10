import api from '$lib/components/MenuField.svelte?raw&sveld';
import source from '$lib/components/MenuField.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      related: [
        'components/Field',
        'components/Menu',
        'components/MenuItem',
        'components/MenuButton',
        'components/SelectField',
      ],
    },
  };
}
