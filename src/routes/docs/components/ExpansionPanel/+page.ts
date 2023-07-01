import api from '$lib/components/ExpansionPanel.svelte?raw&sveld';
import source from '$lib/components/ExpansionPanel.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      related: ['components/Collapse'],
    },
  };
}
