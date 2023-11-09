import api from '$lib/components/SpringValue.svelte?raw&sveld';
import source from '$lib/components/SpringValue.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      related: ['components/TweenedValue', 'components/ScrollingValue'],
    },
  };
}
