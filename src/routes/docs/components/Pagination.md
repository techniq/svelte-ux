---
component: $component
filename: $filename
---

<script lang="ts">
	import Pagination from '$lib/components/Pagination.svelte';
	import Preview from '$lib/components/Preview.svelte';

	import paginationStore from '$lib/stores/paginationStore';

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
