import api from '$lib/components/ThemeSelect.svelte?raw&sveld';
import source from '$lib/components/ThemeSelect.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      description:
        'Supports selecting a theme when more than one light and/or dark themes are defined',
      related: ['components/ThemeSwitch', '/customization'],
    },
  };
}
