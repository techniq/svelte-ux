import source from '$lib/components/ToggleGroup.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      related: ['components/Switch', 'components/Tabs'],
    },
  };
}
