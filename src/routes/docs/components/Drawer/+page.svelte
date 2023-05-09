<script>
  import api from '$lib/components/Drawer.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Button from '$lib/components/Button.svelte';
  import Dialog from '$lib/components/Dialog.svelte';
  import Drawer from '$lib/components/Drawer.svelte';
  import MenuField from '$lib/components/MenuField.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import TextField from '$lib/components/TextField.svelte';
  import Toggle from '$lib/components/Toggle.svelte';

  let leftOpen = false;
  let rightOpen = false;
  let topOpen = false;
  let bottomOpen = false;
</script>

<h1>Examples</h1>

<h2>Location</h2>

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

<h2>Persistent</h2>

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

<h2>Loading</h2>

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

<h2>With autofocus TextField</h2>

<Preview>
  <Toggle let:on={open} let:toggle let:toggleOff>
    <Drawer {open} on:close={toggleOff} right class="w-[400px]">
      <div class="p-2">
        <TextField autofocus />
      </div>
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

<h2>Dialog within Drawer</h2>

<Preview>
  <Toggle let:on={open} let:toggle let:toggleOff>
    <Drawer {open} on:close={toggleOff} right class="w-[400px]">
      <div class="p-2">
        <Toggle let:on={open} let:toggle>
          <Button on:click={toggle}>Show Dialog</Button>
          <Dialog {open} on:close={toggle}>
            <div slot="title">Are you sure you want to do that?</div>
            <div slot="actions">
              <Button variant="fill" color="blue">Close</Button>
            </div>
          </Dialog>
        </Toggle>
      </div>
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

<h2>MenuField within Drawer</h2>

<Preview>
  <Toggle let:on={open} let:toggle let:toggleOff>
    <Drawer {open} on:close={toggleOff} right class="w-[400px]">
      <div class="p-2">
        <MenuField
          options={[
            { label: 'Cut', value: 'cut' },
            { label: 'Copy', value: 'copy' },
            { label: 'Paste', value: 'paste' },
          ]}
        />
      </div>
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

<h1>API</h1>

<ApiDocs {api} />
