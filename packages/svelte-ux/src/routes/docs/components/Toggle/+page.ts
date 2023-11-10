import api from '$lib/components/Toggle.svelte?raw&sveld';
import source from '$lib/components/Toggle.svelte?raw';
import pageSource from './+page.md?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      related: [
        'components/Dialog',
        'components/Drawer',
        'components/Menu',
        'components/ToggleButton',
      ],
    },
  };
}
