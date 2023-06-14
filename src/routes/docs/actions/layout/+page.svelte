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
  code={`import { remainingViewportHeight, remainingViewportWidth, overflow } from 'svelte-ux';`}
  language="javascript"
/>

<h2>remainingViewportHeight</h2>

<Blockquote>TODO</Blockquote>

<h2>remainingViewportWidth</h2>

<Blockquote>TODO</Blockquote>

<h2>overflow</h2>

<Preview>
  <div class="mb-2">
    <Button on:click={() => (overflowItems += 1)} variant="fill" color="blue">+ item</Button>
    <Button
      on:click={() => (overflowItems -= overflowItems > 1 ? 1 : 0)}
      variant="fill"
      color="blue">- item</Button
    >
  </div>
  <div
    class="w-1/2 h-[100px] border border-black/20 rounded-lg bg-white whitespace-nowrap truncate p-4 resize overflow-auto"
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
