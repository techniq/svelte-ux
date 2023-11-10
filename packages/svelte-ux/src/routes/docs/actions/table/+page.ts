import source from '$lib/actions/table.ts?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      description:
        'Apply ColumnDef to a table cell <td>.  Includes order by, dataBackground, and sticky support',
      related: ['components/Table', 'actions/dataBackground'],
    },
  };
}
