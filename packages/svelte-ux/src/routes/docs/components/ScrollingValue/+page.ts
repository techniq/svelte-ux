import api from '$lib/components/ScrollingValue.svelte?raw&sveld';
import source from '$lib/components/ScrollingValue.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      related: ['components/NumberStepper', 'components/SpringValue', 'components/TweenedValue'],
    },
  };
}
