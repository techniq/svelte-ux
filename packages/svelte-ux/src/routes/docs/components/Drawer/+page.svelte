<script lang="ts">
  import { Button, Dialog, Drawer, MenuField, Switch, TextField, Toggle } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';

  let leftOpen = false;
  let rightOpen = false;
  let topOpen = false;
  let bottomOpen = false;

  let isChanged = false;
</script>

<h1>Examples</h1>

<h2>Location</h2>

<Preview>
  <Drawer bind:open={topOpen} placement="top" class="h-64">
    <h1>Contents</h1>
    <div slot="actions">
      <Button on:click={() => (topOpen = false)}>Close</Button>
    </div>
  </Drawer>
  <Button on:click={() => (topOpen = true)}>Top</Button>

  <Drawer bind:open={bottomOpen} placement="bottom" class="h-64">
    <h1>Contents</h1>
    <div slot="actions">
      <Button on:click={() => (bottomOpen = false)}>Close</Button>
    </div>
  </Drawer>
  <Button on:click={() => (bottomOpen = true)}>Bottom</Button>

  <Drawer bind:open={leftOpen} placement="left" class="w-[400px]">
    <h1>Contents</h1>
    <div slot="actions">
      <Button on:click={() => (leftOpen = false)}>Close</Button>
    </div>
  </Drawer>
  <Button on:click={() => (leftOpen = true)}>Left</Button>

  <Drawer bind:open={rightOpen} placement="right" class="w-[400px]">
    <h1>Contents</h1>
    <div slot="actions">
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
      <div slot="actions">
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
      <div slot="actions">
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
      <div slot="actions">
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
        <Toggle let:on={open} let:toggle let:toggleOff>
          <Button on:click={toggle}>Show Dialog</Button>
          <Dialog {open} on:close={toggleOff}>
            <div slot="title">Are you sure you want to do that?</div>
            <div slot="actions">
              <Button variant="fill" color="primary">Close</Button>
            </div>
          </Dialog>
        </Toggle>
      </div>
      <div slot="actions">
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
      <div slot="actions">
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
        persistent={isChanged}
        on:close={closeDrawer}
        on:closeAttempt={openConfirmation}
        class="w-[400px]"
      >
        <div class="p-4">
          <div class="grid grid-cols-[1fr,auto] items-center">
            Changed
            <Switch bind:checked={isChanged} />
          </div>
        </div>
        <div slot="actions">
          <Button on:click={isChanged ? openConfirmation : closeDrawer}>Close</Button>
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
              isChanged = false;
            }}
            variant="fill"
            color="danger"
          >
            Yes, lose changes
          </Button>
          <Button>Cancel</Button>
        </div>
      </Dialog>
    </Toggle>
  </Toggle>
</Preview>

<h2>Custom portal target</h2>

<Preview>
  <div id="portal"></div>

  <Toggle let:on={open} let:toggle let:toggleOff>
    <Drawer
      {open}
      on:close={toggleOff}
      placement="bottom"
      class="h-64"
      portal={{ target: '#portal' }}
    >
      <h1>Contents</h1>
      <div slot="actions">
        <Button on:click={toggleOff}>Close</Button>
      </div>
    </Drawer>
    <Button on:click={toggle}>Click me</Button>
  </Toggle>
</Preview>
