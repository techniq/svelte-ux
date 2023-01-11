---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script lang="ts">
	import Preview from '$lib/components/Preview.svelte';

	import Button from '$lib/components/Button.svelte';
	import CircularProgress from '$lib/components/CircularProgress.svelte';
	import Overlay from '$lib/components/Overlay.svelte';
	import Toggle from '$lib/components/Toggle.svelte';
</script>

# Examples

## Loading overlay

<Preview>
  <div class="relative">
    <Overlay center>
      <CircularProgress />
    </Overlay>
    <div>Some content</div>
    <div>Some content</div>
    <div>Some content</div>
    <div>Some content</div>
  </div>
</Preview>

## Change color

<Preview>
  <div class="relative">
    <Overlay center class="bg-black/10">
      <CircularProgress />
    </Overlay>
    <div>Some content</div>
    <div>Some content</div>
    <div>Some content</div>
    <div>Some content</div>
  </div>
</Preview>

## Prompt

<Preview>
  <Toggle let:on={show} let:toggle>
    <div class="relative">
      {#if show}
        <Overlay center>
          <Button on:click={toggle} class="border">Close Overlay</Button>
        </Overlay>
      {/if}
      <div>Some content</div>
      <div>Some content</div>
      <div>Some content</div>
      <div>Some content</div>
      <Button on:click={toggle} class="border mt-4">Show Overlay</Button>
    </div>
  </Toggle>
</Preview>
