---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script lang="ts">
	import api from '$lib/components/Pagination.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

	import Pagination from '$lib/components/Pagination.svelte';
	import Preview from '$lib/components/Preview.svelte';

	import paginationStore from '$lib/stores/paginationStore';

	const pagination = paginationStore();
	pagination.setTotal(100);
</script>

# Examples

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

# API

<ApiDocs {api} />
