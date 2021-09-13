<script lang="ts">
  import { mdiArrowRight } from '@mdi/js';

  import Breadcrumb from '../components/Breadcrumb.svelte';
  import Button from '../components/Button.svelte';
  import DividerDot from '../components/DividerDot.svelte';
  import Icon from '../components/Icon.svelte';
  import Preview from '../components/Preview.svelte';

  let items = ['First', 'Second', 'Third'];

  let labeledItems = [
    { label: 'First', value: 'One' },
    { label: 'Second', value: 'Two' },
    { label: 'Third', value: 'Three' },
  ];
</script>

## Basic

<Preview>
  <Breadcrumb {items} />
</Preview>

## Custom divider w/ prop

<Preview>
  <Breadcrumb {items} divider="\" />
</Preview>

## Custom divider w/ slot Icon

<Preview>
  <Breadcrumb {items}>
    <span slot="divider">
      <Icon path={mdiArrowRight} class="text-black/25" />
    </span>
  </Breadcrumb>
</Preview>

## Custom item w/ slot

<Preview>
  <Breadcrumb items={labeledItems}>
    <span slot="item" let:item>
      <div class="text-black/50 text-xs uppercase">{item.label}</div>
      <div>{item.value}</div>
    </span>
  </Breadcrumb>
</Preview>

## Custom item w/ button

<Preview>
  <Breadcrumb items={labeledItems}>
    <span slot="item" let:item>
      <Button>
        <div class="text-black/50 text-xs uppercase">{item.label}</div>
        <div>{item.value}</div>
      </Button>
    </span>
  </Breadcrumb>
</Preview>

## Custom item and divider

<Preview>
  <Breadcrumb items={labeledItems}>
    <span slot="item" let:item>
      <span class="text-black/50 text-sm font-extrabold">{item.label}:</span>
      <span class="text-black/50 text-sm">{item.value}</span>
    </span>
    <span slot="divider">
      <DividerDot class="text-black/50" />
    </span>
  </Breadcrumb>
</Preview>

## Color w/ inherit

<Preview isDark class="text-white">
  <Breadcrumb {items} />
</Preview>

## Color w/ prop

<Preview isDark>
  <Breadcrumb {items} class="text-blue-500" />
</Preview>
