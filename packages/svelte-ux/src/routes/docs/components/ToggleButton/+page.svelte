<script lang="ts">
  import { slide } from 'svelte/transition';
  import { mdiChevronDown } from '@mdi/js';

  import { Button, ButtonGroup, Dialog, Drawer, Menu, MenuItem, ToggleButton } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';
</script>

<h1>Examples</h1>

<h2>Dialog</h2>

<Preview>
  <ToggleButton let:on={open}>
    Open Dialog
    <Dialog slot="toggle" {open} on:close={toggleOff} let:toggle let:toggleOff>
      <div slot="title">Are you sure you want to do that?</div>
      <div slot="actions">
        <Button variant="fill" color="primary">Close</Button>
      </div>
    </Dialog>
  </ToggleButton>
</Preview>

<h2>Drawer</h2>

<Preview>
  <ToggleButton>
    Open Drawer
    <Drawer slot="toggle" let:on={open} {open} on:close={toggleOff} class="w-[400px]" let:toggleOff>
      <h1>Contents</h1>
      <div class="fixed bottom-0 w-full flex justify-center bg-surface-content/5 border-t p-1">
        <Button on:click={toggleOff}>Close</Button>
      </div>
    </Drawer>
  </ToggleButton>
</Preview>

<h2>slide transition</h2>

<Preview>
  <ToggleButton size="sm" transition={slide} let:on={showDetails}>
    {showDetails ? 'show less' : 'show more'}...
    <div slot="toggle" class="mt-2 border-t">
      {#each { length: 10 } as _, i}
        <div>{i}</div>
      {/each}
    </div>
  </ToggleButton>
</Preview>

<h2>slide transition (button after)</h2>

<Preview>
  <ToggleButton size="sm" transition={slide} let:on={showDetails} buttonPlacement="after">
    {showDetails ? 'show less' : 'show more'}...
    <div slot="toggle" class="mt-2 border-b">
      {#each { length: 10 } as _, i}
        <div>{i}</div>
      {/each}
    </div>
  </ToggleButton>
</Preview>

<h2>on by default</h2>

<Preview>
  <ToggleButton on size="sm" transition={slide} let:on={showDetails}>
    {showDetails ? 'show less' : 'show more'}...
    <div slot="toggle" class="mt-2 border-t border-b">
      {#each { length: 10 } as _, i}
        <div>{i}</div>
      {/each}
    </div>
  </ToggleButton>
</Preview>

<h2>ButtonGroup</h2>

<Preview>
  <ButtonGroup variant="outline">
    <Button>Click me</Button>
    <ToggleButton
      let:on={open}
      let:toggleOff
      icon={mdiChevronDown}
      iconOnly
      rounded
      class="px-1"
      transition={false}
    >
      <Menu {open} on:close={toggleOff} placement="bottom-start">
        <MenuItem>One</MenuItem>
        <MenuItem>Two</MenuItem>
        <MenuItem>Three</MenuItem>
      </Menu>
    </ToggleButton>
  </ButtonGroup>
</Preview>
