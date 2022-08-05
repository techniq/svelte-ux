---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script>
  import api from '$lib/components/Drawer.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Button from '$lib/components/Button.svelte';
  import Drawer from '$lib/components/Drawer.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import Toggle from '$lib/components/Toggle.svelte';

  let leftOpen = false;
  let rightOpen = false;
  let topOpen = false;
  let bottomOpen = false;
</script>

# Examples

## Location

<Preview>
  <Drawer bind:open={leftOpen} class="w-[400px]">
    <h1>Contents</h1>
    <div
      class="fixed bottom-0 w-full flex justify-center bg-gray-500/25
    p-1 border-t border-gray-400"
    >
      <Button on:click={() => (leftOpen = false)}>Close</Button>
    </div>
  </Drawer>
  <Button on:click={() => (leftOpen = true)}>Left</Button>
  <Drawer bind:open={rightOpen} right class="w-[400px]">
    <h1>Contents</h1>
    <div
      class="fixed bottom-0 w-full flex justify-center bg-gray-500/25
    p-1 border-t border-gray-400"
    >
      <Button on:click={() => (rightOpen = false)}>Close</Button>
    </div>
  </Drawer>
  <Button on:click={() => (rightOpen = true)}>Right</Button>
  <Drawer bind:open={topOpen} top class="h-64">
    <h1>Contents</h1>
    <div
      class="fixed bottom-0 w-full flex justify-center bg-gray-500/25
    p-1 border-t border-gray-400"
    >
      <Button on:click={() => (topOpen = false)}>Close</Button>
    </div>
  </Drawer>
  <Button on:click={() => (topOpen = true)}>Top</Button>
  <Drawer bind:open={bottomOpen} bottom class="h-64">
    <h1>Contents</h1>
    <div
      class="fixed bottom-0 w-full flex justify-center bg-gray-500/25
    p-1 border-t border-gray-400"
    >
      <Button on:click={() => (bottomOpen = false)}>Close</Button>
    </div>
  </Drawer>
  <Button on:click={() => (bottomOpen = true)}>Bottom</Button>
</Preview>

## Persistent

<Preview>
  <Toggle let:on={open} let:toggle let:toggleOff>
    <Drawer {open} on:close={toggleOff} right persistent class="w-[400px]">
      <h1>Contents</h1>
      <div
        class="fixed bottom-0 w-full flex justify-center bg-gray-500/25
    p-1 border-t border-gray-400"
      >
        <Button on:click={toggleOff}>Close</Button>
      </div>
    </Drawer>
    <Button on:click={toggle}>Click me</Button>
  </Toggle>
</Preview>

## Loading

<Preview>
  <Toggle let:on={open} let:toggle let:toggleOff>
    <Drawer {open} on:close={toggleOff} right class="w-[400px]" loading>
      <h1>Contents</h1>
      <div
        class="fixed bottom-0 w-full flex justify-center bg-gray-500/25
    p-1 border-t border-gray-400"
      >
        <Button on:click={toggleOff}>Close</Button>
      </div>
    </Drawer>
    <Button on:click={toggle}>Click me</Button>
  </Toggle>
</Preview>

# API

<ApiDocs {api} />
