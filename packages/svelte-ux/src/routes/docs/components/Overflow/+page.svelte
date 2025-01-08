<script lang="ts">
  import { Button, Overflow, Tooltip } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';

  let overflowItems = $state(1);
  const text = 'This is really long text used to demonstrate overflow.';
</script>

<h1>Examples</h1>

<h2>Default</h2>

<Preview>
  <Button variant="outline" onclick={() => (overflowItems += 1)}>+ item</Button>
  <Button variant="outline" onclick={() => (overflowItems -= overflowItems > 1 ? 1 : 0)}
    >- item</Button
  >
  <Overflow class="w-1/2 h-[200px] overflow-hidden">
    {#snippet children({ overflowX, overflowY })}
      <div>overflowX: {overflowX}</div>
      <div>overflowY: {overflowY}</div>
      <div class="whitespace-nowrap border rounded-lg bg-surface-100">
        {#each { length: overflowItems } as _}
          <div>Resize the window to see text truncate and watch values</div>
        {/each}
      </div>
    {/snippet}
  </Overflow>
</Preview>

<h2>Conditional tooltip</h2>

<Preview>
  <Overflow class="w-1/2 truncate border">
    {#snippet children({ overflowX })}
      <Tooltip title={text} enabled={overflowX > 0}>{text}</Tooltip>
    {/snippet}
  </Overflow>
</Preview>

<!-- TODO: white up scroll buttons -->
<!-- <h2>Paginate controls</h2>

<Preview>
  <Overflow class="bg-gray-50 border p-2 relative">
    {#snippet children({ overflowX })}
      <Button icon={mdiChevronLeft} class="absolute top-1/2 left-0 -translate-y-1/2" size="sm" />
      <div class="flex gap-3 overflow-auto scrollbar-none">
        {#each { length: 20 } as _}
          <div class="border rounded-lg px-4 bg-surface-100">Item</div>
        {/each}
      </div>
      <Button icon={mdiChevronRight} class="absolute top-1/2 right-0 -translate-y-1/2" size="sm" />
    {/snippet}
  </Overflow>
</Preview> -->
