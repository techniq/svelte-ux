<script lang="ts">
  import { mdiArrowRight } from '@mdi/js';

  import api from '$lib/components/Breadcrumb.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
  import Button from '$lib/components/Button.svelte';
  import DividerDot from '$lib/components/DividerDot.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Preview from '$lib/components/Preview.svelte';

  let items = ['First', 'Second', 'Third'];

  let labeledItems = [
    { label: 'First', value: 'One' },
    { label: 'Second', value: 'Two' },
    { label: 'Third', value: 'Three' },
  ];
</script>

# Examples

## Basic

<Preview>
  <Breadcrumb {items} />
</Preview>

## With gap

<Preview>
  <Breadcrumb {items} class="gap-1" />
</Preview>

## Custom divider

### with prop

<Preview>
  <Breadcrumb {items} divider="\" class="gap-2" />
</Preview>

## Custom divider

### with slot Icon

<Preview>
  <Breadcrumb {items} class="gap-2">
    <Icon slot="divider" path={mdiArrowRight} class="text-black/25" />
  </Breadcrumb>
</Preview>

## Custom item

### with markup

<Preview>
  <Breadcrumb items={labeledItems} class="gap-2">
    <span slot="item" let:item>
      <div class="text-black/50 text-xs uppercase">{item.label}</div>
      <div>{item.value}</div>
    </span>
  </Breadcrumb>
</Preview>

## Custom item

### with Button

<Preview>
  <Breadcrumb items={labeledItems}>
    <Button slot="item" let:item>
      <div>
        <div class="text-black/50 text-xs uppercase">{item.label}</div>
        <div>{item.value}</div>
      </div>
    </Button>
  </Breadcrumb>
</Preview>

## Custom item and divider

<Preview>
  <Breadcrumb items={labeledItems} class="gap-2">
    <span slot="item" let:item>
      <span class="text-black/50 text-sm font-extrabold">{item.label}:</span>
      <span class="text-black/50 text-sm">{item.value}</span>
    </span>
    <DividerDot slot="divider" class="text-black/50" />
  </Breadcrumb>
</Preview>

## Many items

<Preview>
  <Breadcrumb items={Array.from({ length: 20 }).map((_, i) => 'Item ' + (++i))} />
</Preview>

## Null items (not displayed)

<Preview>
  <Breadcrumb items={Array.from({ length: 10 }).map((_, i) => i % 2 ? null : 'Item ' + (++i))} />
</Preview>

## Color

### inherit

<Preview>
  <div class="bg-black text-white p-2 rounded">
    <Breadcrumb {items} />
  </div>
</Preview>

## Color

### text class

<Preview>
  <Breadcrumb {items} class="text-blue-500" />
</Preview>

## Truncate long text

<Preview>
  <div class="w-[300px] border">
    <Breadcrumb items={['Example', 'of', 'really really really long text']} class="flex-nowrap">
      <span slot="item" class="last:truncate" let:item title={item}>{item}</span>
    </Breadcrumb>
  </div>
</Preview>

# API

<ApiDocs {api} />
