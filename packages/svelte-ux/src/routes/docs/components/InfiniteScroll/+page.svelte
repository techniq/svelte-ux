<script lang="ts">
  import { InfiniteScroll, ListItem } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';

  const items = Array(100)
    .fill(null)
    .map((x, i) => ({ name: `Item: ${i + 1}` }));
</script>

<h1>Examples</h1>

<h2>Default</h2>

<Preview>
  <div class="h-[400px] p-1 overflow-auto">
    <InfiniteScroll {items}>
      {#snippet children({ visibleItems })}
        {#each visibleItems as item}
          <ListItem title={item.name} />
        {/each}
      {/snippet}
    </InfiniteScroll>
  </div>
</Preview>

<h2>Per page</h2>

<Preview>
  <div class="h-[400px] p-1 overflow-auto">
    <InfiniteScroll {items} perPage={5}>
      {#snippet children({ visibleItems })}
        {#each visibleItems as item}
          <ListItem title={item.name} />
        {/each}
      {/snippet}
    </InfiniteScroll>
  </div>
</Preview>

<h2>Viewport root (no overflown parent/ancestor)</h2>

<Preview>
  <InfiniteScroll {items}>
    {#snippet children({ visibleItems })}
      {#each visibleItems as item}
        <ListItem title={item.name} />
      {/each}
    {/snippet}
  </InfiniteScroll>
</Preview>
