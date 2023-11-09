import source from '$lib/actions/multi.ts?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      description:
        'Helper action to handle multiple actions as a single action.  Useful for adding actions for custom components',
      related: ['components/Button', 'components/Input', 'components/TextField'],
    },
  };
}
