<script>
  import Button from '../components/Button.svelte';
  import Drawer from '../components/Drawer.svelte';
  import Preview from '../components/Preview.svelte';
  import Toggle from '../components/Toggle.svelte';

  let leftOpen = false;
  let rightOpen = false;
  let topOpen = false;
  let bottomOpen = false;
</script>

## Location

<Preview>
  <Drawer bind:open={leftOpen} class="w-100">
    <h1>Contents</h1>
    <div
      class="fixed bottom-0 w-full flex justify-center bg-gray-500/25
    p-1 border-t border-gray-400"
    >
      <Button on:click={() => (leftOpen = false)}>Close</Button>
    </div>
  </Drawer>
  <Button on:click={() => (leftOpen = true)}>Left</Button>
  <Drawer bind:open={rightOpen} right class="w-100">
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

## Click away

<Preview>
  <Toggle let:on={open} let:toggle let:toggleOff>
    <Drawer {open} on:close={toggleOff} right clickAway class="w-100">
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
