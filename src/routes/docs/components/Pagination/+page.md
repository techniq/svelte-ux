<script lang="ts">
	import api from '$lib/components/Pagination.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

	import Button from '$lib/components/Button.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import Preview from '$lib/components/Preview.svelte';

	import paginationStore from '$lib/stores/paginationStore';

	const pagination = paginationStore();
	pagination.setTotal(100);
</script>

# Usage

```svelte
<script lang="ts">
  import { Pagination, paginationStore } from 'svelte-ux';

  const pagination = paginationStore();
  pagination.setTotal(100);
</script>

<Pagination {pagination} />
```

# Examples

## Default

<Preview>
	<Pagination {pagination} />
</Preview>

## First/Last page

<Preview>
	<Pagination {pagination} show={['firstPage', 'prevPage', 'pagination', 'nextPage', 'lastPage']} />
</Preview>

## Center pagination

<Preview>
	<Pagination {pagination} show={['firstPage', 'prevPage', 'pagination', 'nextPage', 'lastPage']} classes={{ pagination: 'flex-1 text-center' }} />
</Preview>

## Pagination slot

<Preview>
	<Pagination {pagination} show={['firstPage', 'prevPage', 'pagination', 'nextPage', 'lastPage']}>
		<div slot="pagination" class="text-sm flex-1 text-center" let:pagination>
			{pagination.from.toLocaleString()} - {pagination.to.toLocaleString()}
		</div>
	</Pagination>
</Preview>

## Table pagination

<Preview>
	<Pagination {pagination} show={['perPage', 'pagination', 'prevPage', 'nextPage']} classes={{ perPage: 'flex-1 text-right', pagination: 'px-8' }} />
</Preview>

## Table pagination with actions slot

<Preview>
	<Pagination {pagination} show={['actions', 'perPage', 'pagination', 'prevPage', 'nextPage']} classes={{ perPage: 'flex-1 text-right', pagination: 'px-8' }}>
		<div slot="actions">
			<Button variant="filled" color="blue">Click me</Button>
		</div>
	</Pagination>
</Preview>

# API

<ApiDocs {api} />
