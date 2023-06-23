import source from '$lib/components/ListItem.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      description:
        'A list item that provides a standard layout and works best with multiple instances in the same parent element.',
    },
  };
}
