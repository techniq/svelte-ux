import source from '$lib/stores/tableOrderStore.ts?raw';
import pageSource from './+page.md?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      description:
        'Manage table column sorting selection and direction.  Compliments Table component',
      related: ['actions/table', 'components/Table'],
    },
  };
}
