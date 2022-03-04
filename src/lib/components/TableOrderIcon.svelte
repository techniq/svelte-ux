<script lang="ts">
  import type { Readable } from 'svelte/store';
  import { mdiArrowUp } from '@mdi/js';

  import type { TableOrderState } from '../stores/tableOrderStore';
  import type { ColumnDef } from '../types/table';
  import Icon from '../components/Icon.svelte';

  export let order: TableOrderState | Readable<TableOrderState>;
  export let column: ColumnDef;

  $: _order = 'subscribe' in order ? $order : order;
</script>

{#if _order.by && (_order.by === column.name || _order.by === column.orderBy)}
  <div
    class="inline-block transition duration-100 transform"
    class:rotate-180={_order.direction === 'desc'}
  >
    <Icon path={mdiArrowUp} />
  </div>
{/if}
