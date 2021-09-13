<script lang="ts">
	import Pagination from '../components/Pagination.svelte';
	import Preview from '../components/Preview.svelte';

	import paginationStore from '../stores/paginationStore';

	const pagination = paginationStore();
	pagination.setTotal(100);
</script>

## Usage

```svelte
<script lang="ts">
	import { Pagination, paginationStore } from 'svelte-ux';

	const pagination = paginationStore();
	pagination.setTotal(100);
</script>

<Pagination {pagination} />
```

## Default

<Preview>
	<Pagination {pagination} />
</Preview>
