<script>
  import api from '$lib/components/Drawer.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Button from '$lib/components/Button.svelte';
  import Dialog from '$lib/components/Dialog.svelte';
  import Drawer from '$lib/components/Drawer.svelte';
  import MenuField from '$lib/components/MenuField.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import Switch from '$lib/components/Switch.svelte';
  import TextField from '$lib/components/TextField.svelte';
  import Toggle from '$lib/components/Toggle.svelte';

  let leftOpen = false;
  let rightOpen = false;
  let topOpen = false;
  let bottomOpen = false;

  let isDirty = false;
</script>

<h1>Examples</h1>

<h2>Location</h2>

<Preview>
  <Drawer bind:open={topOpen} placement="top" class="h-64">
    <h1>Contents</h1>
    <div
      class="fixed bottom-0 w-full flex justify-center bg-gray-500/25
    p-1 border-t border-gray-400"
    >
      <Button on:click={() => (topOpen = false)}>Close</Button>
    </div>
  </Drawer>
  <Button on:click={() => (topOpen = true)}>Top</Button>

  <Drawer bind:open={bottomOpen} placement="bottom" class="h-64">
    <h1>Contents</h1>
    <div
      class="fixed bottom-0 w-full flex justify-center bg-gray-500/25
    p-1 border-t border-gray-400"
    >
      <Button on:click={() => (bottomOpen = false)}>Close</Button>
    </div>
  </Drawer>
  <Button on:click={() => (bottomOpen = true)}>Bottom</Button>

  <Drawer bind:open={leftOpen} placement="left" class="w-[400px]">
    <h1>Contents</h1>
    <div
      class="fixed bottom-0 w-full flex justify-center bg-gray-500/25
    p-1 border-t border-gray-400"
    >
      <Button on:click={() => (leftOpen = false)}>Close</Button>
    </div>
  </Drawer>
  <Button on:click={() => (leftOpen = true)}>Left</Button>

  <Drawer bind:open={rightOpen} placement="right" class="w-[400px]">
    <h1>Contents</h1>
    <div
      class="fixed bottom-0 w-full flex justify-center bg-gray-500/25
    p-1 border-t border-gray-400"
    >
      <Button on:click={() => (rightOpen = false)}>Close</Button>
    </div>
  </Drawer>
  <Button on:click={() => (rightOpen = true)}>Right</Button>
</Preview>

<h2>Persistent</h2>

<Preview>
  <Toggle let:on={open} let:toggle let:toggleOff>
    <Drawer {open} on:close={toggleOff} persistent class="w-[400px]">
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
    <Drawer {open} on:close={toggleOff} class="w-[400px]" loading>
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
    <Drawer {open} on:close={toggleOff} class="w-[400px]">
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
    <Drawer {open} on:close={toggleOff} class="w-[400px]">
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
    <Drawer {open} on:close={toggleOff} class="w-[400px]">
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

<h2>Prompt if changed</h2>

<Preview>
  <Toggle
    let:on={showConfirmation}
    let:toggleOn={openConfirmation}
    let:toggleOff={closeConfirmation}
  >
    <Toggle let:on={showDrawer} let:toggleOn={openDrawer} let:toggleOff={closeDrawer}>
      <Drawer
        open={showDrawer}
        on:close-attempt={isDirty ? openConfirmation : closeDrawer}
        persistent={isDirty}
        class="w-[400px]"
      >
        <div class="p-4">
          <div class="grid grid-cols-[1fr,auto] items-center">
            Changed
            <Switch bind:checked={isDirty} />
          </div>
        </div>
        <div
          class="fixed bottom-0 w-full flex justify-center bg-gray-500/25
    p-1 border-t border-gray-400"
        >
          <Button on:click={isDirty ? openConfirmation : closeDrawer}>Close</Button>
        </div>
      </Drawer>
      <Button on:click={openDrawer}>Click me</Button>

      <Dialog open={showConfirmation} on:close={closeConfirmation}>
        <div slot="title">Are you sure?</div>
        <div class="px-6 py-3">You will lose any unsaved changes</div>
        <div slot="actions">
          <Button
            on:click={() => {
              closeConfirmation();
              closeDrawer();
              isDirty = false;
            }}
            variant="fill"
            color="red"
          >
            Yes, lose changes
          </Button>
          <Button>Cancel</Button>
        </div>
      </Dialog>
    </Toggle>
  </Toggle>
</Preview>

<h1>API</h1>

<ApiDocs {api} />
