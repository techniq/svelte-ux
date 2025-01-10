<script lang="ts">
  import { Button, ProgressCircle, Overlay, Toggle } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';
</script>

<h1>Examples</h1>

<h2>Loading overlay</h2>

<Preview>
  <div class="relative">
    <Overlay center>
      <ProgressCircle />
    </Overlay>
    <div>Some content</div>
    <div>Some content</div>
    <div>Some content</div>
    <div>Some content</div>
  </div>
</Preview>

<h2>Change color</h2>

<Preview>
  <div class="relative">
    <Overlay center class="bg-surface-content/10">
      <ProgressCircle />
    </Overlay>
    <div>Some content</div>
    <div>Some content</div>
    <div>Some content</div>
    <div>Some content</div>
  </div>
</Preview>

<h2>Prompt</h2>

<Preview>
  <Toggle  >
    {#snippet children({ on: show, toggle })}
        <div class="relative">
        {#if show}
          <Overlay center>
            <Button onclick={toggle} class="border">Close Overlay</Button>
          </Overlay>
        {/if}
        <div>Some content</div>
        <div>Some content</div>
        <div>Some content</div>
        <div>Some content</div>
        <Button onclick={toggle} class="border mt-4">Show Overlay</Button>
      </div>
          {/snippet}
    </Toggle>
</Preview>
