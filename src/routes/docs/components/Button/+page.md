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
  import Preview from '$lib/components/Preview.svelte';
  import SectionDivider from '$lib/components/SectionDivider.svelte';
  import Tooltip from '$lib/components/Tooltip.svelte';
</script>

## Usage

```js
import { Button } from 'svelte-ux';
```

# Examples

## Default

<Preview>
  <Button>Click me</Button>
</Preview>

## Link

<Preview>
  <Button href="https://www.google.com" target="_blank">Open Google</Button>
</Preview>

## Disabled

<Preview>
  <Button disabled>Click me</Button>
</Preview>

## Loading

<Preview>
  <Button loading >
    Click me
  </Button>
  <Button variant="outlined" color="blue" loading>
    Click me
  </Button>
  <Button variant="filled" color="blue" loading>
    Click me
  </Button>
</Preview>

## Variants

<Preview>
  <div class="grid gap-2">
    <div>
      <Button>Text</Button>
      <Button color="blue">Text</Button>
      <Button color="red">Text</Button>
      <Button color="green">Text</Button>
    </div>
    <div>
      <Button variant="outlined">Outlined</Button>
      <Button variant="outlined" color="blue">Outlined</Button>
      <Button variant="outlined" color="red">Outlined</Button>
      <Button variant="outlined" color="green">Outlined</Button>
    </div>
    <div>
      <Button variant="filled">Filled</Button>
      <Button variant="filled" color="blue">Filled</Button>
      <Button variant="filled" color="red">Filled</Button>
      <Button variant="filled" color="green">Filled</Button>
    </div>
  </div>
</Preview>

## `none` variant

<Preview>
  <Button variant="none">Click me</Button>
</Preview>

## Tooltip

<Preview>
  <Tooltip title="Really, do it!" placement="right" offset={2}>
    <Button>Click me</Button>
  </Tooltip>
</Preview>

## Tooltip (disabled)

<Preview>
  <Tooltip title="Really, do it!" placement="right" offset={2}>
    <Button disabled>Click me</Button>
  </Tooltip>
</Preview>

<SectionDivider class="mt-12">Icon</SectionDivider>

## Icon-only button

<Preview>
  <Button icon={mdiMenu} />
</Preview>

## Icon-only button with padding

<Preview>
  <Button icon={mdiMenu} class="p-2" />
</Preview>

## Icon with text

<Preview>
  <Button icon={mdiTrashCan} color="red">Delete</Button>
</Preview>

## Icon via url

<Preview>
  <Button icon="https://api.iconify.design/mdi:account.svg" class="p-2" />
</Preview>

## Icon via SVG string

<Preview>
  <Button icon={'<svg width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4Z"/></svg>'} class="p-2" />
</Preview>

# API

<ApiDocs {api} />
