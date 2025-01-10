<script lang="ts">
  import { slide } from 'svelte/transition';
  import { mdiChevronDown } from '@mdi/js';

  import { Button, ButtonGroup, Dialog, Drawer, Menu, MenuItem, ToggleButton } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';
</script>

<h1>Examples</h1>

<h2>Dialog</h2>

<Preview>
  <ToggleButton>
    {#snippet children()}
      Open Dialog
    {/snippet}
    {#snippet toggle({ on: open, toggleOff })}
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
  </ToggleButton>
</Preview>

<h2>Drawer</h2>

<Preview>
  <ToggleButton>
    Open Drawer
    {#snippet toggle({ on: open, toggleOff })}
      <Drawer {open} onClose={toggleOff} class="w-[400px]">
        <h1>Contents</h1>
        <div class="fixed bottom-0 w-full flex justify-center bg-surface-content/5 border-t p-1">
          <Button onclick={toggleOff}>Close</Button>
        </div>
      </Drawer>
    {/snippet}
  </ToggleButton>
</Preview>

<h2>slide transition</h2>

<Preview>
  <ToggleButton size="sm" transition={slide}>
    {#snippet children({ on: showDetails })}
      {showDetails ? 'show less' : 'show more'}...
    {/snippet}
    {#snippet toggle()}
      <div class="mt-2 border-t">
        {#each { length: 10 } as _, i}
          <div>{i}</div>
        {/each}
      </div>
    {/snippet}
  </ToggleButton>
</Preview>

<h2>slide transition (button after)</h2>

<Preview>
  <ToggleButton size="sm" transition={slide} buttonPlacement="after">
    {#snippet children({ on: showDetails })}
      {showDetails ? 'show less' : 'show more'}...
    {/snippet}
    {#snippet toggle()}
      <div class="mt-2 border-b">
        {#each { length: 10 } as _, i}
          <div>{i}</div>
        {/each}
      </div>
    {/snippet}
  </ToggleButton>
</Preview>

<h2>on by default</h2>

<Preview>
  <ToggleButton on size="sm" transition={slide}>
    {#snippet children({ on: showDetails })}
      {showDetails ? 'show less' : 'show more'}...
    {/snippet}
    {#snippet toggle()}
      <div class="mt-2 border-t border-b">
        {#each { length: 10 } as _, i}
          <div>{i}</div>
        {/each}
      </div>
    {/snippet}
  </ToggleButton>
</Preview>

<h2>ButtonGroup</h2>

<Preview>
  <ButtonGroup variant="outline">
    <Button>Click me</Button>
    <ToggleButton icon={mdiChevronDown} iconOnly rounded class="px-1" transition={false}>
      {#snippet children({ on: open, toggleOff })}
        <Menu {open} onClose={toggleOff} placement="bottom-start">
          <MenuItem>One</MenuItem>
          <MenuItem>Two</MenuItem>
          <MenuItem>Three</MenuItem>
        </Menu>
      {/snippet}
    </ToggleButton>
  </ButtonGroup>
</Preview>
