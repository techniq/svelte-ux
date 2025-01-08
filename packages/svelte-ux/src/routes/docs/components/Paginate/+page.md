<script lang="ts">
  import { ListItem, Pagination, Paginate } from 'svelte-ux';

  import Preview from '$lib/components/Preview.svelte';

  const data = Array(100)
    .fill(null)
    .map((x, i) => ({ name: `Item: ${i + 1}` }));
</script>

<h1>Usage</h1>

```svelte
<script lang="ts">
  import { Paginate, Pagination } from 'svelte-ux';
</script>

<Paginate {data}>
  {#snippet children({ pageData, pagination })}
    {#each pageData as d}
      <!-- render item -->
    {/each}
    <Pagination paginationStore={pagination} />
  {/snippet}
</Paginate>
```

<h1>Examples</h1>

<h2>Default</h2>

<Preview>
  <Paginate {data}>
    {#snippet children({ pageData, pagination })}
      {#each pageData as d}
        <ListItem title={d.name} />
      {/each}
      {#if pageData.length > 0}
        <Pagination paginationStore={pagination} />
      {/if}
    {/snippet}
  </Paginate>
</Preview>

<h2>Per page</h2>

<Preview>
  <Paginate {data} perPage={5}>
    {#snippet children({ pageData, pagination })}
      {#each pageData as d}
        <ListItem title={d.name} />
      {/each}
      {#if pageData.length > 0}
        <Pagination paginationStore={pagination} />
      {/if}
    {/snippet}
  </Paginate>
</Preview>
