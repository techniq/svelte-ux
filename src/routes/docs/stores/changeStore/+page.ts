import source from '$lib/stores/changeStore.ts?raw';
import pageSource from './+page.md?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      description:
        'Track previous value.  Calls onChange callback only after first change (not initial value)',
    },
  };
}
