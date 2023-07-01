import api from '$lib/components/ListItem.svelte?raw&sveld';
import source from '$lib/components/ListItem.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      description:
        'A list item that provides a standard layout and works best with multiple instances in the same parent element.',
    },
  };
}
