import api from '$lib/components/NumberStepper.svelte?raw&sveld';
import source from '$lib/components/NumberStepper.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      related: ['components/ScrollingValue'],
    },
  };
}
