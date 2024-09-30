<script lang="ts">
	import { Button, Pagination } from 'svelte-ux';
	import { paginationStore } from '@layerstack/svelte-stores';

	import Preview from '$lib/components/Preview.svelte';

	const pagination = paginationStore();
	pagination.setTotal(100);
</script>

<h1>Usage</h1>

```svelte
<script lang="ts">
  import { Pagination, paginationStore } from 'svelte-ux';

  const pagination = paginationStore();
  pagination.setTotal(100);
</script>

<Pagination {pagination} />
```

<h1>Examples</h1>

<h2>Default</h2>

<Preview>
	<Pagination {pagination} />
</Preview>

<h2>First/Last page</h2>

<Preview>
	<Pagination {pagination} show={['firstPage', 'prevPage', 'pagination', 'nextPage', 'lastPage']} />
</Preview>

<h2>Center pagination</h2>

<Preview>
	<Pagination {pagination} show={['firstPage', 'prevPage', 'pagination', 'nextPage', 'lastPage']} classes={{ pagination: 'flex-1 text-center' }} />
</Preview>

<h2>format</h2>

<Preview>
	<Pagination {pagination} show={['firstPage', 'prevPage', 'pagination', 'nextPage', 'lastPage']} classes={{ pagination: 'flex-1 text-center' }} format={pagination => 'Page ' + pagination.page + ' of ' + pagination.totalPages} />
</Preview>

<h2>Pagination slot</h2>

<Preview>
	<Pagination {pagination} show={['firstPage', 'prevPage', 'pagination', 'nextPage', 'lastPage']}>
		<div slot="pagination" class="text-sm flex-1 text-center" let:pagination>
			Page {pagination.page} of {pagination.totalPages}
		</div>
	</Pagination>
</Preview>

<h2>Table pagination</h2>

<Preview>
	<Pagination {pagination} show={['perPage', 'pagination', 'prevPage', 'nextPage']} classes={{ perPage: 'flex-1 text-right', pagination: 'px-8' }} />
</Preview>

<h2>Table pagination with actions slot</h2>

<Preview>
	<Pagination {pagination} show={['actions', 'perPage', 'pagination', 'prevPage', 'nextPage']} classes={{ perPage: 'flex-1 text-right', pagination: 'px-8' }}>
		<div slot="actions">
			<Button variant="fill" color="primary">Click me</Button>
		</div>
	</Pagination>
</Preview>
