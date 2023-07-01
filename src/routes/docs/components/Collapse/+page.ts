import api from '$lib/components/Collapse.svelte?raw&sveld';
import source from '$lib/components/Collapse.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      related: ['components/ExpansionPanel', 'components/ToggleButton'],
    },
  };
}
