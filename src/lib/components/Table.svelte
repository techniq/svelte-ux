<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { tableCell } from '../actions/table';
  import type { ColumnDef } from '../types/table';
  import { cls } from '../utils/styles';

  import { getCellContent, getCellHeader, getHeaders, getRowColumns } from '../utils/table';

  import TableOrderIcon from './TableOrderIcon.svelte';

  const dispatch = createEventDispatcher();

  export let columns: ColumnDef[] = [];
  export let data: any[] | null = [];
  export let orderBy: string | undefined = undefined;
  export let orderDirection: 'asc' | 'desc' | undefined = undefined;

  export let classes: {
    container?: string;
    wrapper?: string;
    table?: string;
    th?: string;
    td?: string;
  } = {};
  export let styles: {
    container?: string;
    wrapper?: string;
    table?: string;
    th?: string;
    td?: string;
  } = {};

  $: order = { by: orderBy, direction: orderDirection };

  $: headers = getHeaders(columns);
  $: rowColumns = getRowColumns(columns);
</script>

<div class={cls('table-container"', classes.container, $$props.class)} style={styles.container}>
  <div class={cls('table-wrapper"', classes.wrapper)} style={styles.wrapper}>
    <table class={cls('w-full', classes.table)} style={styles.table}>
      <slot name="headers" {headers}>
        <thead>
          {#each headers ?? [] as headerRow}
            <tr>
              {#each headerRow ?? [] as column}
                <th
                  use:tableCell={{ column }}
                  class="column-{column.name} {classes.th}"
                  class:whitespace-nowrap={orderBy}
                  style={styles.th}
                  on:click={(e) => dispatch('headerClick', { column })}
                >
                  {getCellHeader(column)}
                  <TableOrderIcon {order} {column} />
                </th>
              {/each}
            </tr>
          {/each}
        </thead>
      </slot>

      <slot />

      <slot name="data" {data} columns={rowColumns}>
        <tbody>
          {#each data ?? [] as rowData, rowIndex}
            <tr>
              {#each rowColumns ?? [] as column}
                <td
                  use:tableCell={{ column, rowData, rowIndex }}
                  class="column-{column.name} {classes.td}"
                  style={styles.td}
                  on:click={(e) => dispatch('cellClick', { column, rowData })}
                >
                  {getCellContent(column, rowData, rowIndex)}
                </td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </slot>
    </table>
  </div>
</div>
