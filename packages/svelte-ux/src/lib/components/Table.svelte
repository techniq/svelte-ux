<script lang="ts" generics="TData">
  import { tableCell } from '../actions/table.js';
  import type { ColumnDef } from '../types/table.js';
  import { cls } from '../utils/styles.js';

  import { getCellValue, getCellHeader, getHeaders, getRowColumns } from '../utils/table.js';

  import TableOrderIcon from './TableOrderIcon.svelte';
  import { getSettings } from './settings.js';
  import tableOrderStore from '../stores/tableOrderStore.js';
  import type { Snippet } from 'svelte';

  // TODO: Figure out circular reference error
  // const settingsClasses = getComponentClasses('Table');
  const settingsClasses: typeof classes = {};

  const { format } = getSettings();

  interface Props {
    columns?: ColumnDef<TData>[];
    tableData?: TData[] | null;
    order?: ReturnType<typeof tableOrderStore>;
    classes?: {
      container?: string;
      wrapper?: string;
      table?: string;
      thead?: string;
      tbody?: string;
      tr?: string;
      th?: string;
      td?: string;
    };
    styles?: {
      container?: string;
      wrapper?: string;
      table?: string;
      thead?: string;
      tbody?: string;
      tr?: string;
      th?: string;
      td?: string;
    };
    class?: string;
    onHeaderClick?: (column: ColumnDef<TData>) => void;
    onCellClick?: ({ column, rowData }: { column: ColumnDef<TData>; rowData: TData }) => void;
    headers?: Snippet<[{ headers: typeof headers; getCellHeader: (column: ColumnDef) => string }]>;
    data?: Snippet<
      [
        {
          data: TData[] | null;
          columns: typeof rowColumns;
          getCellValue: typeof getCellValue;
          getCellContent: typeof getCellContent;
        },
      ]
    >;
    children?: Snippet;
  }

  let {
    columns = [],
    tableData = [],
    order,
    classes = {},
    styles = {},
    class: className,
    onHeaderClick,
    onCellClick,
    headers: headersRender,
    data,
    children,
  }: Props = $props();

  let headers = $derived(
    getHeaders(columns).map((headerRow) => {
      return headerRow.map((column) => {
        return {
          ...column,
          classes: {
            th: cls(settingsClasses.th, classes.th, column.classes?.th),
            td: cls(settingsClasses.td, classes.td, column.classes?.td),
          },
        };
      });
    })
  );

  let rowColumns = $derived(
    getRowColumns(columns).map((column) => {
      return {
        ...column,
        classes: {
          th: cls(settingsClasses.th, classes.th, column.classes?.th),
          td: cls(settingsClasses.td, classes.td, column.classes?.td),
        },
      };
    })
  );

  let getCellContent = $derived((column: ColumnDef<TData>, rowData: TData, rowIndex: number) => {
    let value = getCellValue(column, rowData, rowIndex);
    if (column.format) {
      if (typeof column.format === 'function') {
        return column.format(value, rowData, rowIndex);
      } else {
        // @ts-expect-error
        return $format(value, column.format);
      }
    } else {
      return value;
    }
  });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
  class={cls('Table', 'table-container', settingsClasses.container, classes.container, className)}
  style={styles.container}
>
  <div
    class={cls('table-wrapper', settingsClasses.wrapper, classes.wrapper)}
    style={styles.wrapper}
  >
    <table class={cls('w-full', settingsClasses.table, classes.table)} style={styles.table}>
      {#if headersRender}
        {@render headersRender({ headers, getCellHeader })}
      {:else}
        <thead class={cls(settingsClasses.thead, classes.thead)} style={styles.thead}>
          {#each headers ?? [] as headerRow}
            <tr class={cls(settingsClasses.tr, classes.tr)} style={styles.tr}>
              {#each headerRow ?? [] as column}
                <th
                  use:tableCell={{ column, order }}
                  class="column-{column.name}"
                  class:whitespace-nowrap={order}
                  style={styles.th}
                  onclick={() => onHeaderClick?.(column)}
                >
                  {getCellHeader(column)}
                  {#if order}
                    <TableOrderIcon {order} {column} />
                  {/if}
                </th>
              {/each}
            </tr>
          {/each}
        </thead>
      {/if}

      {@render children?.()}

      {#if data}
        {@render data({ data: tableData, columns: rowColumns, getCellValue, getCellContent })}
      {:else}
        <tbody class={cls(settingsClasses.tbody, classes.tbody)} style={styles.tbody}>
          {#each tableData ?? [] as rowData, rowIndex}
            <tr class={cls(settingsClasses.tr, classes.tr)} style={styles.tr}>
              {#each rowColumns ?? [] as column}
                <td
                  use:tableCell={{ column, rowData, rowIndex, tableData }}
                  class="column-{column.name}"
                  style={styles.td}
                  onclick={() => onCellClick?.({ column, rowData })}
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
      {/if}
    </table>
  </div>
</div>
