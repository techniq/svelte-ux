<script lang="ts">
  import { Button, Pagination, paginationStore as _paginationStore } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';

  const paginationStore = _paginationStore();
  paginationStore.setTotal(100);
</script>

<h1>Usage</h1>

```svelte
<script lang="ts">
  import { Pagination, paginationStore } from 'svelte-ux';

  const pagination = paginationStore();
  pagination.setTotal(100);
</script>

<Pagination {paginationStore} />
```

<h1>Examples</h1>

<h2>Default</h2>

<Preview>
  <Pagination {paginationStore} />
</Preview>

<h2>First/Last page</h2>

<Preview>
  <Pagination
    {paginationStore}
    show={['firstPage', 'prevPage', 'pagination', 'nextPage', 'lastPage']}
  />
</Preview>

<h2>Center pagination</h2>

<Preview>
  <Pagination
    {paginationStore}
    show={['firstPage', 'prevPage', 'pagination', 'nextPage', 'lastPage']}
    classes={{ pagination: 'flex-1 text-center' }}
  />
</Preview>

<h2>format</h2>

<Preview>
  <Pagination
    {paginationStore}
    show={['firstPage', 'prevPage', 'pagination', 'nextPage', 'lastPage']}
    classes={{ pagination: 'flex-1 text-center' }}
    format={(pagination) => 'Page ' + pagination.page + ' of ' + pagination.totalPages}
  />
</Preview>

<h2>Pagination slot</h2>

<Preview>
  <Pagination
    {paginationStore}
    show={['firstPage', 'prevPage', 'pagination', 'nextPage', 'lastPage']}
  >
    {#snippet pagination({ pagination })}
      <div class="text-sm flex-1 text-center">
        Page {pagination.page} of {pagination.totalPages}
      </div>
    {/snippet}
  </Pagination>
</Preview>

<h2>Table pagination</h2>

<Preview>
  <Pagination
    {paginationStore}
    show={['perPage', 'pagination', 'prevPage', 'nextPage']}
    classes={{ perPage: 'flex-1 text-right', pagination: 'px-8' }}
  />
</Preview>

<h2>Table pagination with actions slot</h2>

<Preview>
  <Pagination
    {paginationStore}
    show={['actions', 'perPage', 'pagination', 'prevPage', 'nextPage']}
    classes={{ perPage: 'flex-1 text-right', pagination: 'px-8' }}
  >
    {#snippet actions()}
      <div>
        <Button variant="fill" color="primary">Click me</Button>
      </div>
    {/snippet}
  </Pagination>
</Preview>
