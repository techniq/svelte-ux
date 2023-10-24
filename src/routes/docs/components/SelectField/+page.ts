import api from '$lib/components/SelectField.svelte?raw&sveld';
import source from '$lib/components/SelectField.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      features: [
        'Asynchronous loading of options',
        'Grouped options',
        'Field actions, Menu actions, and per-option actions',
        'Smart placement of menu (with granular control and overflow handling)',
      ],
      related: [
        'components/TextField',
        'components/Menu',
        'components/MenuItem',
        'components/MenuButton',
        'components/MenuField',
      ],
    },
  };
}
