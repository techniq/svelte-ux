<script lang="ts">
  import { mdiArrowUp } from '@mdi/js';

  import type { tableOrderStore, ColumnDef } from '@layerstack/svelte-table';
  import { cls } from '@layerstack/tailwind';

  import Icon from '../components/Icon.svelte';

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
