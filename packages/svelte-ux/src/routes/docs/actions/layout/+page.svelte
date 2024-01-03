<script lang="ts">
  import Preview from '$lib/components/Preview.svelte';
  import Button from '$lib/components/Button.svelte';
  import Code from '$lib/components/Code.svelte';
  import Blockquote from '$docs/Blockquote.svelte';

  import { remainingViewportHeight, remainingViewportWidth, overflow } from '$lib/actions/layout';

  let overflowX = 0;
  let overflowY = 0;
  let overflowItems = 1;
</script>

<h1>Usage</h1>

<Code
  source={`import { remainingViewportHeight, remainingViewportWidth, overflow } from 'svelte-ux';`}
  language="javascript"
/>

<h2>
  remainingViewportHeight <small
    >Set `height` or `max-height` to viewport height excluding node's current viewport top</small
  >
</h2>

<Blockquote>TODO</Blockquote>

<h2>
  remainingViewportWidth <small
    >Set `width` or `max-width` to viewport width excluding node's current viewport left</small
  >
</h2>

<Blockquote>TODO</Blockquote>

<h2>
  overflow <small
    >Watch for overflow changes (x or y) and dispatch `overflow` event with amount</small
  >
</h2>

<Preview>
  <div class="mb-2">
    <Button on:click={() => (overflowItems += 1)} variant="fill" color="primary">+ item</Button>
    <Button
      on:click={() => (overflowItems -= overflowItems > 1 ? 1 : 0)}
      variant="fill"
      color="primary">- item</Button
    >
  </div>
  <div
    class="w-1/2 h-[100px] border rounded-lg bg-surface-100 whitespace-nowrap truncate p-4 resize overflow-auto"
    use:overflow
    on:overflow={(e) => {
      overflowX = e.detail.overflowX;
      overflowY = e.detail.overflowY;
    }}
  >
    {#each { length: overflowItems } as _}
      <div>Resize the window to see text truncate and watch values</div>
    {/each}
  </div>
  <div>overflowX: {overflowX}</div>
  <div>overflowY: {overflowY}</div>
</Preview>
