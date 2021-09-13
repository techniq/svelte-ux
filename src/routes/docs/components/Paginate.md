<script lang="ts">
	import ListItem from '../components/ListItem.svelte';
	import Pagination from '../components/Pagination.svelte';
	import Paginate from '../components/Paginate.svelte';
	import Preview from '../components/Preview.svelte';

	const items = Array(100).fill().map((x, i) => ({ name: `Item: ${i + 1}`}))
</script>

## Usage

```svelte
<script lang="ts">
	import { Paginate } from 'svelte-ux';
</script>

<Paginate {items} let:pagination let pageItems>
	{#each pageItems as child}
		<!-- render item -->
	{/each}
</Paginate>
```

## Default

<Preview>
	<Paginate {items} let:pagination let:pageItems >
		{#each pageItems as child}
			<ListItem title={child.name} />
		{/each}
		{#if pageItems.length > 0}
			<Pagination {pagination} />
		{/if}
	</Paginate>
</Preview>

## Per page

<Preview>
	<Paginate {items} perPage={5} let:pagination let:pageItems >
		{#each pageItems as child}
			<ListItem title={child.name} />
		{/each}
		{#if pageItems.length > 0}
			<Pagination {pagination} />
		{/if}
	</Paginate>
</Preview>
