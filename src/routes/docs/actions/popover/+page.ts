import source from '$lib/actions/popover.ts?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      description: 'Svelte action for floating-ui with simplier setup, especially for middlware',
      related: ['components/Popover'],
    },
  };
}
