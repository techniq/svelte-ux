<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { tableCell } from '../actions/table';
  import type { ColumnDef } from '../types/table';
  import { cls } from '../utils/styles';

  import {
    getCellValue,
    getCellContent,
    getCellHeader,
    getHeaders,
    getRowColumns,
  } from '../utils/table';

  import TableOrderIcon from './TableOrderIcon.svelte';
  import { getComponentTheme } from './theme';

  const dispatch = createEventDispatcher();

  export let columns: ColumnDef[] = [];
  export let data: any[] | null = [];
  export let orderBy: string | undefined = undefined;
  export let orderDirection: 'asc' | 'desc' | undefined = undefined;

  export let classes: {
    container?: string;
    wrapper?: string;
    table?: string;
    thead?: string;
    tbody?: string;
    tr?: string;
    th?: string;
    td?: string;
  } = {};
  // TODO: Figure out circular reference error
  // const theme = getComponentTheme('Table');
  const theme: typeof classes = {};

  export let styles: {
    container?: string;
    wrapper?: string;
    table?: string;
    thead?: string;
    tbody?: string;
    tr?: string;
    th?: string;
    td?: string;
  } = {};

  $: order = { by: orderBy, direction: orderDirection };

  $: headers = getHeaders(columns).map((headerRow) => {
    return headerRow.map((column) => {
      return {
        ...column,
        classes: {
          th: cls(theme.th, classes.th, column.classes?.th),
          td: cls(theme.td, classes.td, column.classes?.td),
        },
      };
    });
  });
  $: rowColumns = getRowColumns(columns).map((column) => {
    return {
      ...column,
      classes: {
        th: cls(theme.th, classes.th, column.classes?.th),
        td: cls(theme.td, classes.td, column.classes?.td),
      },
    };
  });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class={cls('Table', 'table-container', theme.container, classes.container, $$props.class)}
  style={styles.container}
>
  <div class={cls('table-wrapper', theme.wrapper, classes.wrapper)} style={styles.wrapper}>
    <table class={cls('w-full', theme.table, classes.table)} style={styles.table}>
      <slot name="headers" {headers} {getCellHeader}>
        <thead class={cls(theme.thead, classes.thead)} style={styles.thead}>
          {#each headers ?? [] as headerRow}
            <tr class={cls(theme.tr, classes.tr)} style={styles.tr}>
              {#each headerRow ?? [] as column}
                <th
                  use:tableCell={{ column }}
                  class="column-{column.name}"
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

      <slot name="data" {data} columns={rowColumns} {getCellValue} {getCellContent}>
        <tbody class={cls(theme.tbody, classes.tbody)} style={styles.tbody}>
          {#each data ?? [] as rowData, rowIndex}
            <tr class={cls(theme.tr, classes.tr)} style={styles.tr}>
              {#each rowColumns ?? [] as column}
                <td
                  use:tableCell={{ column, rowData, rowIndex, tableData: data }}
                  class="column-{column.name}"
                  style={styles.td}
                  on:click={(e) => dispatch('cellClick', { column, rowData })}
                >
                  {#if column.html}
                    {@html getCellContent(column, rowData, rowIndex)}
                  {:else}
                    {getCellContent(column, rowData, rowIndex)}
                  {/if}
                </td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </slot>
    </table>
  </div>
</div>
