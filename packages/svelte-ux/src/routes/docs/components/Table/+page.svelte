<script lang="ts">
  import { mdiDotsVertical } from '@mdi/js';

  import {
    Button,
    Menu,
    MenuItem,
    Paginate,
    Pagination,
    Table,
    Toggle,
    TweenedValue,
  } from 'svelte-ux';
  import { tableOrderStore, tableCell, type ColumnDef } from '@layerstack/svelte-table';
  import { randomInteger, type FormatNumberStyle } from '@layerstack/utils';

  import Preview from '$lib/components/Preview.svelte';

  const order = tableOrderStore({ initialBy: 'calories', initialDirection: 'desc' });

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

  // Workaround to make Typescript happy
  function columnFormatAsNumberFormat(format: ColumnDef['format']) {
    return format as FormatNumberStyle;
  }
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

<h2>Pagination</h2>

<Preview>
  <Paginate {data} perPage={5} let:pageData let:pagination>
    <Table
      data={pageData}
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
    data={[...data].sort($order.handler)}
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
        orderBy: false,
      },
      {
        name: 'protein',
        align: 'right',
        format: 'integer',
      },
    ]}
    {order}
  />
</Preview>

<h2>Order + Pagination</h2>

<Preview>
  <Paginate data={data.sort($order.handler)} perPage={5} let:pageData let:pagination>
    <Table
      data={pageData}
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
      {order}
      on:headerClick={(e) => {
        //Switch back to page 1 when sorting
        pagination.setPage(1);
      }}
    />
    <Pagination
      {pagination}
      perPageOptions={[5, 10, 25, 100]}
      show={['perPage', 'pagination', 'prevPage', 'nextPage']}
      classes={{ root: 'border-t py-1 mt-2', perPage: 'flex-1 text-right', pagination: 'px-8' }}
    />
  </Paginate>
</Preview>

<h2>Data background</h2>

<Preview>
  <Button
    on:click={() => (randomData = randomDataGen())}
    variant="outline"
    color="primary"
    class="mb-1"
  >
    Randomize
  </Button>
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
          inset: [1, 2],
          tweened: { duration: 300 },
        },
        classes: {
          td: 'from-primary/5 to-primary/10',
        },
      },
      {
        name: 'fat',
        align: 'right',
        format: 'integer',
        dataBackground: {
          inset: [1, 2],
          tweened: { duration: 300 },
        },
        classes: {
          td: 'from-secondary/5 to-secondary/10',
        },
      },
      {
        name: 'carbs',
        align: 'right',
        format: 'integer',
        dataBackground: {
          inset: [1, 2],
          tweened: { duration: 300 },
        },
        classes: {
          td: 'from-success/5 to-success/10',
        },
      },
      {
        name: 'protein',
        align: 'right',
        format: 'integer',
        dataBackground: {
          inset: [1, 2],
          tweened: { duration: 300 },
        },
        classes: {
          td: 'from-danger/5 to-danger/10',
        },
      },
    ]}
  />
</Preview>

<h2>Formatting with HTML</h2>

<Preview>
  <Table
    {data}
    columns={[
      {
        name: 'name',
        align: 'left',
        // @ts-expect-error
        format: (value) => {
          // TODO: Docs currently do not support backticks (template literals)
          return (
            '<a href="https://www.google.com/search?q=' +
            value +
            '" class="underline" target="_blank">' +
            value +
            '</a>'
          );
        },
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

<h2>Customize markup</h2>

<Preview>
  <Button
    on:click={() => (randomData = randomDataGen())}
    variant="outline"
    color="primary"
    class="mb-1"
  >
    Randomize
  </Button>
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
          inset: [1, 2],
          tweened: { duration: 300 },
        },
        classes: {
          td: 'from-primary/5 to-primary/10',
        },
      },
      {
        name: 'fat',
        align: 'right',
        format: 'integer',
        dataBackground: {
          inset: [1, 2],
          tweened: { duration: 300 },
        },
        classes: {
          td: 'from-secondary/5 to-secondary/10',
        },
      },
      {
        name: 'carbs',
        align: 'right',
        format: 'integer',
        dataBackground: {
          inset: [1, 2],
          tweened: { duration: 300 },
        },
        classes: {
          td: 'from-success/5 to-success/10',
        },
      },
      {
        name: 'protein',
        align: 'right',
        format: 'integer',
        dataBackground: {
          inset: [1, 2],
          tweened: { duration: 300 },
        },
        classes: {
          td: 'from-danger/5 to-danger/10',
        },
      },
    ]}
  >
    <tbody slot="data" let:columns let:data let:getCellValue>
      {#each data ?? [] as rowData, rowIndex}
        <tr class="tabular-nums">
          {#each columns as column (column.name)}
            {@const value = getCellValue(column, rowData, rowIndex)}

            <td use:tableCell={{ column, rowData, rowIndex, tableData: data }}>
              {#if column.name === 'name'}
                {value}
              {:else}
                <TweenedValue
                  {value}
                  format={columnFormatAsNumberFormat(column.format)}
                  options={typeof column.dataBackground === 'object'
                    ? column.dataBackground.tweened
                    : undefined}
                />
              {/if}
            </td>{/each}
        </tr>
      {/each}
    </tbody>
  </Table>
</Preview>

<h2>Row actions</h2>

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
      {
        name: 'actions',
        header: '',
        align: 'right',
      },
    ]}
  >
    <tbody slot="data" let:columns let:data let:getCellValue let:getCellContent>
      {#each data ?? [] as rowData, rowIndex}
        <tr class="tabular-nums">
          {#each columns as column (column.name)}
            {@const value = getCellValue(column, rowData, rowIndex)}
            {@const content = getCellContent(column, rowData, rowIndex)}

            <td use:tableCell={{ column, rowData, rowIndex, tableData: data }}>
              {#if column.name === 'actions'}
                <Toggle let:on={open} let:toggle let:toggleOff>
                  <Button icon={mdiDotsVertical} iconOnly size="sm" on:click={toggle}>
                    <Menu {open} on:close={toggleOff} placement="bottom-end">
                      <MenuItem>Edit</MenuItem>
                      <MenuItem class="text-danger">Delete</MenuItem>
                    </Menu>
                  </Button>
                </Toggle>
              {:else}
                {content}
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </Table>
</Preview>
