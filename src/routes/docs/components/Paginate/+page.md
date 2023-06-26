<script lang="ts">
	import api from '$lib/components/Paginate.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

	import ListItem from '$lib/components/ListItem.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import Paginate from '$lib/components/Paginate.svelte';
	import Preview from '$lib/components/Preview.svelte';

	const items = Array(100).fill().map((x, i) => ({ name: `Item: ${i + 1}`}))
</script>

<h1>Usage</h1>

```svelte
<script lang="ts">
  import { Paginate, Pagination } from 'svelte-ux';
</script>

<Paginate {items} let:pageItems let:pagination>
  {#each pageItems as child}
    <!-- render item -->
  {/each}
  <Pagination {pagination} />
</Paginate>
```

<h1>Examples</h1>

<h2>Default</h2>

<Preview>
	<Paginate {items} let:pageItems let:pagination>
		{#each pageItems as child}
			<ListItem title={child.name} />
		{/each}
		{#if pageItems.length > 0}
			<Pagination {pagination} />
		{/if}
	</Paginate>
</Preview>

<h2>Per page</h2>

<Preview>
	<Paginate {items} perPage={5} let:pageItems let:pagination>
		{#each pageItems as child}
			<ListItem title={child.name} />
		{/each}
		{#if pageItems.length > 0}
			<Pagination {pagination} />
		{/if}
	</Paginate>
</Preview>

<h1>API</h1>

<ApiDocs {api} />
