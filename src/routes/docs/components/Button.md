---
component: $component
filename: $filename
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

## Color

<Preview>
  <Button class="text-blue-500 hover:bg-blue-50">Click me</Button>
</Preview>

## Color (red)

<Preview>
  <Button class="text-red-500 hover:bg-red-50">Click me</Button>
</Preview>

## Disabled

<Preview>
  <Button disabled>Click me</Button>
</Preview>

## Outlined

<Preview>
  <Button class="border">Click me</Button>
</Preview>

## Outlined w/ color

<Preview>
  <Button class="border border-current text-blue-500 hover:bg-blue-50">
    Click me
  </Button>
</Preview>

## Link

<Preview>
  <Button href="https://www.google.com" target="_blank">Open Google</Button>
</Preview>

## Base

<Preview>
  <Button base>Click me</Button>
</Preview>

<SectionDivider class="mt-12">Icon</SectionDivider>

## Menu

<Preview>
  <Button icon={mdiMenu} />
</Preview>

## Menu with padding

<Preview>
  <Button icon={mdiMenu} class="p-2" />
</Preview>

## Icon with text

<Preview>
  <Button icon={mdiTrashCan} class="text-red-500">Delete</Button>
</Preview>

## Loading

<Preview>
  <Button class="border border-current text-blue-500 hover:bg-blue-50" loading>
    Click me
  </Button>
  <Button loading >
    Click me
  </Button>
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

# API

<ApiDocs {api} />
