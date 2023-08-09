import api from '$lib/components/RangeSlider.svelte?raw&sveld';
import source from '$lib/components/RangeSlider.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      status: 'beta',
    },
  };
}
