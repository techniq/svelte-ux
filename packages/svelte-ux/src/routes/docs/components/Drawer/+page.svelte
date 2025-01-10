<script lang="ts">
  import { Button, Dialog, Drawer, MenuField, Switch, TextField, Toggle } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';

  let leftOpen = $state(false);
  let rightOpen = $state(false);
  let topOpen = $state(false);
  let bottomOpen = $state(false);

  let isChanged = $state(false);
</script>

<h1>Examples</h1>

<h2>Location</h2>

<Preview>
  <Drawer bind:open={topOpen} placement="top" class="h-64">
    <h1>Contents</h1>
    {#snippet actions()}
      <div>
        <Button onclick={() => (topOpen = false)}>Close</Button>
      </div>
    {/snippet}
  </Drawer>
  <Button onclick={() => (topOpen = true)}>Top</Button>

  <Drawer bind:open={bottomOpen} placement="bottom" class="h-64">
    <h1>Contents</h1>
    {#snippet actions()}
      <div>
        <Button onclick={() => (bottomOpen = false)}>Close</Button>
      </div>
    {/snippet}
  </Drawer>
  <Button onclick={() => (bottomOpen = true)}>Bottom</Button>

  <Drawer bind:open={leftOpen} placement="left" class="w-[400px]">
    <h1>Contents</h1>
    {#snippet actions()}
      <div>
        <Button onclick={() => (leftOpen = false)}>Close</Button>
      </div>
    {/snippet}
  </Drawer>
  <Button onclick={() => (leftOpen = true)}>Left</Button>

  <Drawer bind:open={rightOpen} placement="right" class="w-[400px]">
    <h1>Contents</h1>
    {#snippet actions()}
      <div>
        <Button onclick={() => (rightOpen = false)}>Close</Button>
      </div>
    {/snippet}
  </Drawer>
  <Button onclick={() => (rightOpen = true)}>Right</Button>
</Preview>

<h2>Persistent</h2>

<Preview>
  <Toggle>
    {#snippet children({ on: open, toggle, toggleOff })}
      <Drawer {open} onClose={toggleOff} persistent class="w-[400px]">
        <h1>Contents</h1>
        {#snippet actions()}
          <div>
            <Button onclick={toggleOff}>Close</Button>
          </div>
        {/snippet}
      </Drawer>
      <Button onclick={toggle}>Click me</Button>
    {/snippet}
  </Toggle>
</Preview>

<h2>Loading</h2>

<Preview>
  <Toggle>
    {#snippet children({ on: open, toggle, toggleOff })}
      <Drawer {open} onClose={toggleOff} class="w-[400px]" loading>
        <h1>Contents</h1>
        {#snippet actions()}
          <div>
            <Button onclick={toggleOff}>Close</Button>
          </div>
        {/snippet}
      </Drawer>
      <Button onclick={toggle}>Click me</Button>
    {/snippet}
  </Toggle>
</Preview>

<h2>With autofocus TextField</h2>

<Preview>
  <Toggle>
    {#snippet children({ on: open, toggle, toggleOff })}
      <Drawer {open} onClose={toggleOff} class="w-[400px]">
        <div class="p-2">
          <TextField autofocus />
        </div>
        {#snippet actions()}
          <div>
            <Button onclick={toggleOff}>Close</Button>
          </div>
        {/snippet}
      </Drawer>
      <Button onclick={toggle}>Click me</Button>
    {/snippet}
  </Toggle>
</Preview>

<h2>Dialog within Drawer</h2>

<Preview>
  <Toggle>
    {#snippet children({ on: open, toggle, toggleOff })}
      <Drawer {open} onClose={toggleOff} class="w-[400px]">
        <div class="p-2">
          <Toggle>
            {#snippet children({ on: open, toggle, toggleOff })}
              <Button onclick={toggle}>Show Dialog</Button>
              <Dialog {open} onClose={toggleOff}>
                {#snippet title()}
                  <div>Are you sure you want to do that?</div>
                {/snippet}
                {#snippet actions()}
                  <div>
                    <Button variant="fill" color="primary">Close</Button>
                  </div>
                {/snippet}
              </Dialog>
            {/snippet}
          </Toggle>
        </div>
        {#snippet actions()}
          <div>
            <Button onclick={toggleOff}>Close</Button>
          </div>
        {/snippet}
      </Drawer>
      <Button onclick={toggle}>Click me</Button>
    {/snippet}
  </Toggle>
</Preview>

<h2>MenuField within Drawer</h2>

<Preview>
  <Toggle>
    {#snippet children({ on: open, toggle, toggleOff })}
      <Drawer {open} onClose={toggleOff} class="w-[400px]">
        <div class="p-2">
          <MenuField
            options={[
              { label: 'Cut', value: 'cut' },
              { label: 'Copy', value: 'copy' },
              { label: 'Paste', value: 'paste' },
            ]}
          />
        </div>
        {#snippet actions()}
          <div>
            <Button onclick={toggleOff}>Close</Button>
          </div>
        {/snippet}
      </Drawer>
      <Button onclick={toggle}>Click me</Button>
    {/snippet}
  </Toggle>
</Preview>

<h2>Prompt if changed</h2>

<Preview>
  <Toggle>
    {#snippet children({
      on: showConfirmation,
      toggleOn: openConfirmation,
      toggleOff: closeConfirmation,
    })}
      <Toggle>
        {#snippet children({ on: showDrawer, toggleOn: openDrawer, toggleOff: closeDrawer })}
          <Drawer
            open={showDrawer}
            persistent={isChanged}
            onClose={closeDrawer}
            onCloseAttempt={openConfirmation}
            class="w-[400px]"
          >
            <div class="p-4">
              <div class="grid grid-cols-[1fr,auto] items-center">
                Changed
                <Switch bind:checked={isChanged} />
              </div>
            </div>
            {#snippet actions()}
              <div>
                <Button onclick={isChanged ? openConfirmation : closeDrawer}>Close</Button>
              </div>
            {/snippet}
          </Drawer>
          <Button onclick={openDrawer}>Click me</Button>

          <Dialog open={showConfirmation} onClose={closeConfirmation}>
            {#snippet title()}
              <div>Are you sure?</div>
            {/snippet}
            <div class="px-6 py-3">You will lose any unsaved changes</div>
            {#snippet actions()}
              <div>
                <Button
                  onclick={() => {
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
            {/snippet}
          </Dialog>
        {/snippet}
      </Toggle>
    {/snippet}
  </Toggle>
</Preview>

<h2>Custom portal target</h2>

<Preview>
  <div id="portal"></div>

  <Toggle>
    {#snippet children({ on: open, toggle, toggleOff })}
      <Drawer
        {open}
        onClose={toggleOff}
        placement="bottom"
        class="h-64"
        portal={{ target: '#portal' }}
      >
        <h1>Contents</h1>
        {#snippet actions()}
          <div>
            <Button onclick={toggleOff}>Close</Button>
          </div>
        {/snippet}
      </Drawer>
      <Button onclick={toggle}>Click me</Button>
    {/snippet}
  </Toggle>
</Preview>
