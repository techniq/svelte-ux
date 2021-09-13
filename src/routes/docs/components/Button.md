<script lang="ts">
  import { mdiMenu, mdiTrashCan } from '@mdi/js';

  import Button from '$lib/components/Button.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import SectionDivider from '$lib/components/SectionDivider.svelte';
</script>

## Usage

```js
import { Button } from 'svelte-ux';
```

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
  <Button class="border border-current text-blue-500 hover:bg-blue-50"> Click me</Button>
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
