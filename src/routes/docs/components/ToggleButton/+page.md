---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script lang="ts">
  import { slide } from 'svelte/transition';
  import { mdiMenu, mdiTrashCan, mdiChevronDown } from '@mdi/js';

  import api from '$lib/components/Button.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Button from '$lib/components/Button.svelte';
  import ButtonGroup from '$lib/components/ButtonGroup.svelte';
  import Dialog from '$lib/components/Dialog.svelte';
  import Drawer from '$lib/components/Drawer.svelte';
  import Menu from '$lib/components/Menu.svelte';
  import MenuItem from '$lib/components/MenuItem.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import SectionDivider from '$lib/components/SectionDivider.svelte';
  import Toggle from '$lib/components/Toggle.svelte';
  import ToggleButton from '$lib/components/ToggleButton.svelte';
  import Tooltip from '$lib/components/Tooltip.svelte';
</script>

## Usage

```js
import { ToggleButton } from 'svelte-ux';
```

# Examples

## Dialog

<Preview>
  <ToggleButton let:on={open} let:toggle>
    Open Dialog
    <Dialog slot="toggle" {open} on:close={toggle}>
      <div slot="title">Are you sure you want to do that?</div>
      <div slot="actions">
        <Button variant="filled" color="blue">
          Close
        </Button>
      </div>
    </Dialog>
  </ToggleButton>
</Preview>

## Drawer

<Preview>
  <ToggleButton let:on={open} let:toggle let:toggleOff>
    Open Drawer
    <Drawer slot="toggle" {open} on:close={toggleOff} right class="w-[400px]">
      <h1>Contents</h1>
      <div
        class="fixed bottom-0 w-full flex justify-center bg-gray-500/25
      p-1 border-t border-gray-400"
      >
        <Button on:click={toggleOff}>Close</Button>
      </div>
    </Drawer>
  </ToggleButton>
</Preview>

## slide transition

<Preview>
  <ToggleButton size="sm" transition={slide} let:on={showDetails}>
    {showDetails ? 'show less' : 'show more'}...
    <div slot="toggle" class="mt-2 border-t border-b border-gray-100">
      {#each { length: 10 } as _, i}
        <div>{i}</div>
      {/each}
    </div>
  </ToggleButton>
</Preview>

## on by default

<Preview>
  <ToggleButton on size="sm" transition={slide} let:on={showDetails}>
    {showDetails ? 'show less' : 'show more'}...
    <div slot="toggle" class="mt-2 border-t border-b border-gray-100">
      {#each { length: 10 } as _, i}
        <div>{i}</div>
      {/each}
    </div>
  </ToggleButton>
</Preview>

## ButtonGroup

<Preview>
  <ButtonGroup variant="outlined">
    <Button>Click me</Button>
    <ToggleButton let:on={open} let:toggleOff icon={mdiChevronDown} iconOnly rounded class="px-1" transition={false}>
      <Menu {open} on:close={toggleOff} placement="bottom-start">
        <MenuItem>One</MenuItem>
        <MenuItem>Two</MenuItem>
        <MenuItem>Three</MenuItem>
      </Menu>
    </ToggleButton>
  </ButtonGroup>
</Preview>

# API

<ApiDocs {api} />
