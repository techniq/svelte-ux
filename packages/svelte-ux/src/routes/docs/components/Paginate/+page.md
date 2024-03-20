<script lang="ts">


	import ListItem from '$lib/components/ListItem.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import Paginate from '$lib/components/Paginate.svelte';
	import Preview from '$lib/components/Preview.svelte';

	const data = Array(100).fill(null).map((x, i) => ({ name: `Item: ${i + 1}`}))
</script>

<h1>Usage</h1>

```svelte
<script lang="ts">
  import { Paginate, Pagination } from 'svelte-ux';
</script>

<Paginate {data} let:pageData let:pagination>
  {#each pageData as d}
    <!-- render item -->
  {/each}
  <Pagination {pagination} />
</Paginate>
```

<h1>Examples</h1>

<h2>Default</h2>

<Preview>
	<Paginate {data} let:pageData let:pagination>
		{#each pageData as d}
			<ListItem title={d.name} />
		{/each}
		{#if pageData.length > 0}
			<Pagination {pagination} />
		{/if}
	</Paginate>
</Preview>

<h2>Per page</h2>

<Preview>
	<Paginate {data} perPage={5} let:pageData let:pagination>
		{#each pageData as d}
			<ListItem title={d.name} />
		{/each}
		{#if pageData.length > 0}
			<Pagination {pagination} />
		{/if}
	</Paginate>
</Preview>
