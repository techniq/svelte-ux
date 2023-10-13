<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Paginate from '$lib/components/Paginate.svelte';
  import Pagination from '$lib/components/Pagination.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import Table from '$lib/components/Table.svelte';

  import paginationStore from '$lib/stores/paginationStore';
  import tableOrderStore from '$lib/stores/tableOrderStore';

  import { tableCell } from '$lib/actions/table';

  import { randomInteger } from '$lib/utils/number';
  import TweenedValue from '$lib/components/TweenedValue.svelte';

  const pagination = paginationStore();
  const order = tableOrderStore({ initialBy: 'name' });

  const data = [
    { id: 1, name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
    { id: 2, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9 },
    { id: 3, name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
    { id: 4, name: 'Frozen yogurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
    { id: 5, name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
    { id: 6, name: 'Honeycomb', calories: 408, fat: 3.2, carbs: 87, protein: 6.5 },
    { id: 7, name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
    { id: 8, name: 'Jelly Bean', calories: 375, fat: 0.0, carbs: 94, protein: 0.0 },
    { id: 9, name: 'KitKat', calories: 518, fat: 26.0, carbs: 65, protein: 7.0 },
    { id: 10, name: 'Lollipop', calories: 392, fat: 0.2, carbs: 98, protein: 0.0 },
    { id: 11, name: 'Marshmallow', calories: 318, fat: 0.0, carbs: 81, protein: 2.0 },
    { id: 12, name: 'Nougat', calories: 360, fat: 19.0, carbs: 9, protein: 37.0 },
    { id: 13, name: 'Oreo', calories: 437, fat: 18.0, carbs: 63, protein: 4.0 },
  ];

  function randomDataGen() {
    return data.map((d) => {
      return {
        ...d,
        calories: randomInteger(300, 900),
        fat: randomInteger(2, 30),
        carbs: randomInteger(5, 100),
        protein: randomInteger(0, 50),
      };
    });
  }
  let randomData = randomDataGen();

  $: sortedData = [...data].sort($order.handler);
</script>

<h1>Examples</h1>

<h2>Basic</h2>

<Preview>
  <Table
    {data}
    columns={[
      {
        name: 'name',
        align: 'left',
      },
      {
        name: 'calories',
        align: 'right',
        format: 'integer',
      },
      {
        name: 'fat',
        align: 'right',
        format: 'integer',
      },
      {
        name: 'carbs',
        align: 'right',
        format: 'integer',
      },
      {
        name: 'protein',
        align: 'right',
        format: 'integer',
      },
    ]}
  />
</Preview>

<h2>Basic</h2>

<Preview>
  <Table
    {data}
    columns={[
      {
        name: 'name',
        align: 'left',
        format: (value) =>
          '<a href="https://www.google.com/search?q=' +
          value +
          '" class="underline" target="_blank">' +
          value +
          '</a>',
        html: true,
      },
      {
        name: 'calories',
        align: 'right',
        format: 'integer',
      },
      {
        name: 'fat',
        align: 'right',
        format: 'integer',
      },
      {
        name: 'carbs',
        align: 'right',
        format: 'integer',
      },
      {
        name: 'protein',
        align: 'right',
        format: 'integer',
      },
    ]}
  />
</Preview>

<h2>Pagination</h2>

<Preview>
  <Paginate items={data} perPage={5} let:pageItems let:pagination>
    <Table
      data={pageItems}
      columns={[
        {
          name: 'name',
          align: 'left',
        },
        {
          name: 'calories',
          align: 'right',
          format: 'integer',
        },
        {
          name: 'fat',
          align: 'right',
          format: 'integer',
        },
        {
          name: 'carbs',
          align: 'right',
          format: 'integer',
        },
        {
          name: 'protein',
          align: 'right',
          format: 'integer',
        },
      ]}
    />
    <Pagination
      {pagination}
      perPageOptions={[5, 10, 25, 100]}
      show={['perPage', 'pagination', 'prevPage', 'nextPage']}
      classes={{ root: 'border-t py-1 mt-2', perPage: 'flex-1 text-right', pagination: 'px-8' }}
    />
  </Paginate>
</Preview>

<h2>Order</h2>

<Preview>
  <Table
    data={sortedData}
    columns={[
      {
        name: 'name',
        align: 'left',
      },
      {
        name: 'calories',
        align: 'right',
        format: 'integer',
      },
      {
        name: 'fat',
        align: 'right',
        format: 'integer',
      },
      {
        name: 'carbs',
        align: 'right',
        format: 'integer',
      },
      {
        name: 'protein',
        align: 'right',
        format: 'integer',
      },
    ]}
    orderBy={$order.by}
    orderDirection={$order.direction}
    on:headerClick={(e) => {
      if (e.detail.column.orderBy !== false) {
        order.onHeaderClick(e.detail.column);
      }
    }}
  />
</Preview>

<h2>Data background</h2>

<Preview>
  <Button
    on:click={() => (randomData = randomDataGen())}
    class="text-accent-500 border border-accent-500 bg-white mb-1">Randomize</Button
  >
  <Table
    data={randomData}
    columns={[
      {
        name: 'name',
        align: 'left',
      },
      {
        name: 'calories',
        align: 'right',
        format: 'integer',
        dataBackground: {
          color: 'var(--color-blue-100)',
          inset: [1, 2],
          tweened: { duration: 300 },
        },
      },
      {
        name: 'fat',
        align: 'right',
        format: 'integer',
        dataBackground: {
          color: 'var(--color-purple-100)',
          inset: [1, 2],
          tweened: { duration: 300 },
        },
      },
      {
        name: 'carbs',
        align: 'right',
        format: 'integer',
        dataBackground: {
          color: 'var(--color-orange-100)',
          inset: [1, 2],
          tweened: { duration: 300 },
        },
      },
      {
        name: 'protein',
        align: 'right',
        format: 'integer',
        dataBackground: {
          color: 'var(--color-red-100)',
          inset: [1, 2],
          tweened: { duration: 300 },
        },
      },
    ]}
  />
</Preview>

<h2>Customize markup</h2>

<Preview>
  <Button
    on:click={() => (randomData = randomDataGen())}
    class="text-accent-500 border border-accent-500 bg-white mb-1">Randomize</Button
  >
  <Table
    data={randomData}
    columns={[
      {
        name: 'name',
        align: 'left',
      },
      {
        name: 'calories',
        align: 'right',
        format: 'integer',
        dataBackground: {
          color: 'var(--color-blue-100)',
          inset: [1, 2],
          tweened: { duration: 300 },
        },
      },
      {
        name: 'fat',
        align: 'right',
        format: 'integer',
        dataBackground: {
          color: 'var(--color-purple-100)',
          inset: [1, 2],
          tweened: { duration: 300 },
        },
      },
      {
        name: 'carbs',
        align: 'right',
        format: 'integer',
        dataBackground: {
          color: 'var(--color-orange-100)',
          inset: [1, 2],
          tweened: { duration: 300 },
        },
      },
      {
        name: 'protein',
        align: 'right',
        format: 'integer',
        dataBackground: {
          color: 'var(--color-red-100)',
          inset: [1, 2],
          tweened: { duration: 300 },
        },
      },
    ]}
  >
    <tbody slot="data" let:columns let:data let:getCellValue>
      {#each data ?? [] as rowData, rowIndex}
        <tr class="tabular-nums">
          {#each columns as column (column.name)}
            {@const value = getCellValue(column, rowData, rowIndex)}

            {#if column.name === 'name'}
              <td use:tableCell={{ column, rowData, rowIndex, tableData: data }}>
                {value}
              </td>
            {:else}
              <td use:tableCell={{ column, rowData, rowIndex, tableData: data }}>
                <TweenedValue
                  {value}
                  format={column.format}
                  options={column.dataBackground?.tweened}
                />
              </td>
            {/if}
          {/each}
        </tr>
      {/each}
    </tbody>
  </Table>
</Preview>
