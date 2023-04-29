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

# Usage

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

### Foo

## Disabled

<Preview>
  <Button disabled>Click me</Button>
</Preview>

## Loading

<Preview>
  <Button loading >
    Click me
  </Button>
  <Button variant="outlined" color="accent" loading>
    Click me
  </Button>
  <Button variant="filled" color="accent" loading>
    Click me
  </Button>
  <Button variant="filledOutlined" color="accent" loading>
    Click me
  </Button>
</Preview>

## Variants

<Preview>
  <div class="grid gap-2">
    <div>
      <Button>default</Button>
      <Button color="blue">default</Button>
      <Button color="red">default</Button>
      <Button color="green">default</Button>
    </div>
    <div>
      <Button variant="outlined">outlined</Button>
      <Button variant="outlined" color="blue">outlined</Button>
      <Button variant="outlined" color="red">outlined</Button>
      <Button variant="outlined" color="green">outlined</Button>
    </div>
    <div>
      <Button variant="filled">filled</Button>
      <Button variant="filled" color="blue">filled</Button>
      <Button variant="filled" color="red">filled</Button>
      <Button variant="filled" color="green">filled</Button>
    </div>
    <div>
      <Button variant="filledOutlined">filledOutlined</Button>
      <Button variant="filledOutlined" color="blue">filledOutlined</Button>
      <Button variant="filledOutlined" color="red">filledOutlined</Button>
      <Button variant="filledOutlined" color="green">filledOutlined</Button>
    </div>
  </div>
</Preview>

## `none` variant

<Preview>
  <Button variant="none">Click me</Button>
</Preview>

## Size

<Preview>
  {#each ['sm', 'md', 'lg'] as size}
    <div class="[&:not(:first-child)]:mt-4">{size}</div>
    <div class="grid gap-2 ml-3">
      <div>
        <Button {size}>default</Button>
        <Button color="blue" {size}>default</Button>
        <Button color="red" {size}>default</Button>
        <Button color="green" {size}>default</Button>
      </div>
      <div>
        <Button variant="outlined" {size}>outlined</Button>
        <Button variant="outlined" {size} color="blue">outlined</Button>
        <Button variant="outlined" {size} color="red">outlined</Button>
        <Button variant="outlined" {size} color="green">outlined</Button>
      </div>
      <div>
        <Button variant="filled" {size}>filled</Button>
        <Button variant="filled" {size} color="blue">filled</Button>
        <Button variant="filled" {size} color="red">filled</Button>
        <Button variant="filled" {size} color="green">filled</Button>
      </div>
      <div>
        <Button variant="filledOutlined" {size}>filledOutlined</Button>
        <Button variant="filledOutlined" {size} color="blue">filledOutlined</Button>
        <Button variant="filledOutlined" {size} color="red">filledOutlined</Button>
        <Button variant="filledOutlined" {size} color="green">filledOutlined</Button>
      </div>
    </div>
  {/each}
</Preview>

## Rounded

<Preview>
  <div class="grid gap-2">
    <div>
      <Button>default</Button>
      <Button rounded>rounded</Button>
      <Button rounded="full">full</Button>
      <Button rounded={false}>false</Button>
    </div>
    <div>
      <Button variant="outlined" color="accent">default</Button>
      <Button variant="outlined" color="accent" rounded>rounded</Button>
      <Button variant="outlined" color="accent" rounded="full">full</Button>
      <Button variant="outlined" color="accent" rounded={false}>false</Button>
    </div>
    <div>
      <Button variant="filled" color="accent">default</Button>
      <Button variant="filled" color="accent" rounded>rounded</Button>
      <Button variant="filled" color="accent" rounded="full">full</Button>
      <Button variant="filled" color="accent" rounded={false}>false</Button>
    </div>
    <div>
      <Button variant="filledOutlined" color="accent">default</Button>
      <Button variant="filledOutlined" color="accent" rounded>rounded</Button>
      <Button variant="filledOutlined" color="accent" rounded="full">full</Button>
      <Button variant="filledOutlined" color="accent" rounded={false}>false</Button>
    </div>
  </div>
</Preview>

## Uppercase

<Preview>
  <Button class="uppercase">text</Button>
  <Button class="uppercase" variant="outlined" color="accent">outlined</Button>
  <Button class="uppercase" variant="filled" color="accent">filled</Button>
  <Button class="uppercase" variant="filledOutlined" color="accent">filledOutlined</Button>
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

## Icon-only size

<Preview>
  <Button icon={mdiMenu} size="sm" />
  <Button icon={mdiMenu} size="md" />
  <Button icon={mdiMenu} size="lg" />
</Preview>

## Icon-only button with custom padding

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

## Icon-only button variants and color

<Preview>
  <div>
    <Button icon={mdiMenu} />
    <Button icon={mdiMenu} color="accent" />
  </div>
  <div>
    <Button icon={mdiMenu} variant="outlined" />
    <Button icon={mdiMenu} variant="outlined" color="accent" />
  </div>
  <div>
    <Button icon={mdiMenu} variant="filled" />
    <Button icon={mdiMenu} variant="filled" color="accent" />
  </div>
  <div>
    <Button icon={mdiMenu} variant="filledOutlined" />
    <Button icon={mdiMenu} variant="filledOutlined" color="accent" />
  </div>
</Preview>

# API

<ApiDocs {api} />
