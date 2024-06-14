<script lang="ts">
  import { Lazy, ListItem } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';

  const items = Array(100)
    .fill(null)
    .map((x, i) => ({ name: `Item: ${i + 1}` }));
</script>

<h1>Examples</h1>

<h2>Default</h2>

<Preview>
  <div class="h-[400px] p-1 overflow-auto">
    {#each items as item}
      <Lazy height="40px" class="group">
        <ListItem title={item.name} list="group" />
      </Lazy>
    {/each}
  </div>
</Preview>

<h2>Unmount</h2>

<Preview>
  <div class="h-[400px] p-1 overflow-auto">
    {#each items as item}
      <Lazy height="40px" class="group" unmount>
        <ListItem title={item.name} list="group" />
      </Lazy>
    {/each}
  </div>
</Preview>
