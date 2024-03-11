import api from '$lib/components/ThemeSwitch.svelte?raw&sveld';
import source from '$lib/components/ThemeSwitch.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      description: 'Toggle between `light` and `dark` themes',
      related: ['components/ThemeSelect', 'components/Switch', '/customization'],
    },
  };
}
