import api from '$lib/components/SelectField.svelte?raw&sveld';
import source from '$lib/components/SelectField.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
    },
  };
}
