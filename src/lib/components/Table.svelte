<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { tableCell } from '../actions/table';
  import { dataBackground } from '../actions/dataBackground';
  import type { ColumnDef } from '../types/table';
  import { cls } from '../utils/styles';

  import {
    getCellContent,
    getCellHeader,
    getCellValue,
    getHeaders,
    getRowColumns,
  } from '../utils/table';

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
    thead?: string;
    tbody?: string;
    tr?: string;
    th?: string;
    td?: string;
  } = {};
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
        class: {
          header: cls(classes.th, column.class?.header),
          data: cls(classes.td, column.class?.data),
        },
      };
    });
  });
  $: rowColumns = getRowColumns(columns).map((column) => {
    return {
      ...column,
      class: {
        header: cls(classes.th, column.class?.header),
        data: cls(classes.td, column.class?.data),
      },
    };
  });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class={cls('table-container"', classes.container, $$props.class)} style={styles.container}>
  <div class={cls('table-wrapper"', classes.wrapper)} style={styles.wrapper}>
    <table class={cls('w-full', classes.table)} style={styles.table}>
      <slot name="headers" {headers}>
        <thead class={cls(classes.thead)} style={styles.thead}>
          {#each headers ?? [] as headerRow}
            <tr class={cls(classes.tr)} style={styles.tr}>
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

      <slot name="data" {data} columns={rowColumns}>
        <tbody class={cls(classes.tbody)} style={styles.tbody}>
          {#each data ?? [] as rowData, rowIndex}
            <tr class={cls(classes.tr)} style={styles.tr}>
              {#each rowColumns ?? [] as column}
                {@const cellValue = getCellValue(column, rowData, rowIndex)}
                <td
                  use:tableCell={{ column, rowData, rowIndex }}
                  use:dataBackground={{
                    value: cellValue,
                    enabled: column.dataBackground != null,
                    ...column.dataBackground?.({ column, cellValue, rowData }),
                  }}
                  class="column-{column.name}"
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
