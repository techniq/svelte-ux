---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script lang="ts">
  import { mdiMenu, mdiTrashCan } from '@mdi/js';

  import api from '$lib/components/Button.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Button from '$lib/components/Button.svelte';
  import Dialog from '$lib/components/Dialog.svelte';
  import Drawer from '$lib/components/Drawer.svelte';
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

# API

<ApiDocs {api} />
