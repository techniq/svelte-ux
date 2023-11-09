<script lang="ts">
  import InfiniteScroll from '$lib/components/InfiniteScroll.svelte';
  import ListItem from '$lib/components/ListItem.svelte';
  import Preview from '$lib/components/Preview.svelte';

  const items = Array(100)
    .fill()
    .map((x, i) => ({ name: `Item: ${i + 1}` }));
</script>

<h1>Examples</h1>

<h2>Default</h2>

<Preview>
  <div class="h-[400px] p-1 overflow-auto">
    <InfiniteScroll {items} let:visibleItems>
      {#each visibleItems as item}
        <ListItem title={item.name} />
      {/each}
    </InfiniteScroll>
  </div>
</Preview>

<h2>Per page</h2>

<Preview>
  <div class="h-[400px] p-1 overflow-auto">
    <InfiniteScroll {items} perPage={5} let:visibleItems>
      {#each visibleItems as item}
        <ListItem title={item.name} />
      {/each}
    </InfiniteScroll>
  </div>
</Preview>
