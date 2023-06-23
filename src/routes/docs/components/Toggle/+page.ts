import source from '$lib/components/Toggle.svelte?raw';
import pageSource from './+page.md?raw';

export async function load() {
  return {
    meta: {
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
