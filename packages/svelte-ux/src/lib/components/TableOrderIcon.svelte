<script lang="ts">
  import type { tableOrderStore, ColumnDef } from '@layerstack/svelte-table';
  import { cls } from '@layerstack/tailwind';

  import { getSettings } from './settings.js';

  export let order: ReturnType<typeof tableOrderStore>;
  export let column: ColumnDef;

  const { icons } = getSettings();
</script>

{#if $order.by && ($order.by === column.value || $order.by === column.name || $order.by === column.orderBy)}
  <span class="TableOrderIcon">
    <icons.arrowUp
      class={cls(
        'inline-block size-4 transition duration-100 transform',
        $order.direction === 'desc' && 'rotate-180'
      )}
    />
  </span>
{/if}
