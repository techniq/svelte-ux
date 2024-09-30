<script lang="ts">
  import { mdiArrowUp } from '@mdi/js';

  import type tableOrderStore from '../stores/tableOrderStore.js';
  import type { ColumnDef } from '../types/table.js';
  import Icon from '../components/Icon.svelte';
  import { cls } from '@layerstack/tailwind';

  export let order: ReturnType<typeof tableOrderStore>;
  export let column: ColumnDef;
</script>

{#if $order.by && ($order.by === column.value || $order.by === column.name || $order.by === column.orderBy)}
  <span class="TableOrderIcon">
    <Icon
      data={mdiArrowUp}
      size="1rem"
      class={cls('transition duration-100 transform', $order.direction === 'desc' && 'rotate-180')}
    />
  </span>
{/if}
