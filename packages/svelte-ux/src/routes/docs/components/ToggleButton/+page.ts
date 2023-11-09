import api from '$lib/components/ToggleButton.svelte?raw&sveld';
import source from '$lib/components/ToggleButton.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      description:
        'Simplifies using Button/Toggle, and helps coordinate unmounting of toggled content (i.e. delays unmount to allow children to transition (ex. Drawer/Dialog))',
    },
  };
}
