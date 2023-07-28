import api from '$lib/components/CopyButton.svelte?raw&sveld';
import source from '$lib/components/CopyButton.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      description: 'Button to copy value to clipboard',
      related: ['components/Button'],
    },
  };
}
