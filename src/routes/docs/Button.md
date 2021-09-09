<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import SectionDivider from '$lib/components/SectionDivider.svelte';

  const mdiMenu = 'M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z'
  const mdiTrashCan = 'M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z'
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
