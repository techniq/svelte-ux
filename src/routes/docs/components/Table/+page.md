---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script>
  import { max } from 'd3-array';
  import api from '$lib/components/Table.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Button from '$lib/components/Button.svelte';
  import Paginate from '$lib/components/Paginate.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import Table from '$lib/components/Table.svelte';
  import TablePagination from '$lib/components/TablePagination.svelte';

  import paginationStore from '$lib/stores/paginationStore';
  import tableOrderStore from '$lib/stores/tableOrderStore';

  import { randomInteger } from '$lib/utils/number';
  import { createPropertySortFunc } from '$lib/utils/sort';

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
    { id: 13, name: 'Oreo', calories: 437, fat: 18.0, carbs: 63, protein: 4.0 }
  ];

  function randomDataGen() {
    return data.map(d => {
      return {
        ...d,
        calories: randomInteger(300, 900),
        fat: randomInteger(2, 30),
        carbs: randomInteger(5, 100),
        protein: randomInteger(0, 50),
      }
    });
  }
  let randomData = randomDataGen();

  $: sortFunc = createPropertySortFunc($order.by, $order.direction);
  $: sortedData = [...data].sort(sortFunc);
</script>

# Examples

## Basic

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

## Pagination

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
    <TablePagination {pagination} />
  </Paginate>
</Preview>

## Order

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

## Data background

<Preview>
  <Button on:click={() => randomData = randomDataGen()} class="text-blue-500 border border-blue-500 bg-white mb-1">Randomize</Button>
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
          tweened: { duration: 300 }
        }
      },
      {
        name: 'fat',
        align: 'right',
        format: 'integer',
        dataBackground: {
          color: 'var(--color-purple-100)',
          inset: [1, 2],
          tweened: { duration: 300 }
        }
      },
      {
        name: 'carbs',
        align: 'right',
        format: 'integer',
        dataBackground: {
          color: 'var(--color-orange-100)',
          inset: [1, 2],
          tweened: { duration: 300 }
        }
      },
      {
        name: 'protein',
        align: 'right',
        format: 'integer',
        dataBackground: {
          color: 'var(--color-red-100)',
          inset: [1, 2],
          tweened: { duration: 300 }
        }
      },
    ]}
  />
</Preview>

# API

<ApiDocs {api} />
