import source from '$lib/actions/portal.ts?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      description: 'Render component outside current DOM hierarchy',
      related: ['components/Dialog', 'components/Drawer', 'components/Backdrop'],
    },
  };
}
