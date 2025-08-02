<script lang="ts">
  import { Button, Overflow, Tooltip } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';

  let overflowItems = 1;
  const text = 'This is really long text used to demonstrate overflow.';
</script>

<h1>Examples</h1>

<h2>Default</h2>

<Preview>
  <Button variant="outline" on:click={() => (overflowItems += 1)}>+ item</Button>
  <Button variant="outline" on:click={() => (overflowItems -= overflowItems > 1 ? 1 : 0)}
    >- item</Button
  >
  <Overflow class="w-1/2 h-[200px] overflow-hidden" let:overflowX let:overflowY>
    <div>overflowX: {overflowX}</div>
    <div>overflowY: {overflowY}</div>
    <div class="whitespace-nowrap border rounded-lg bg-surface-100">
      {#each { length: overflowItems } as _}
        <div>Resize the window to see text truncate and watch values</div>
      {/each}
    </div>
  </Overflow>
</Preview>

<h2>Conditional tooltip</h2>

<Preview>
  <Overflow class="w-1/2 truncate border" let:overflowX>
    <Tooltip title={text} enabled={overflowX > 0}>{text}</Tooltip>
  </Overflow>
</Preview>

<!-- TODO: white up scroll buttons -->
<!-- <h2>Paginate controls</h2>

<Preview>
  <Overflow class="bg-gray-50 border p-2 relative" let:overflowX>
    <Button icon={icons.chevronLeft} class="absolute top-1/2 left-0 -translate-y-1/2" size="sm" />
    <div class="flex gap-3 overflow-auto scrollbar-none">
      {#each { length: 20 } as _}
        <div class="border rounded-lg px-4 bg-surface-100">Item</div>
      {/each}
    </div>
    <Button icon={icons.chevronRight} class="absolute top-1/2 right-0 -translate-y-1/2" size="sm" />
  </Overflow>
</Preview> -->
