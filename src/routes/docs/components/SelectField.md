---
component: $component
filename: $filename
---

<script>
  import { mdiMagnify, mdiPlus } from '@mdi/js';

  import api from '$lib/components/SelectField.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Button from '$lib/components/Button.svelte';
  import Dialog from '$lib/components/Dialog.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import Stack from '$lib/components/Stack.svelte';
  import SelectField from '$lib/components/SelectField.svelte';
  import Tab from '$lib/components/Tab.svelte';
  import Tabs from '$lib/components/Tabs.svelte';
  import TextField from '$lib/components/TextField.svelte';
  import Toggle from '$lib/components/Toggle.svelte';

  import { scrollIntoView } from '$lib/actions/scroll';

  import { delay } from '$lib/utils/promise';

  const items = [
    { name: 'One', value: 1 },
    { name: 'Two', value: 2 },
    { name: 'Three', value: 3 },
    { name: 'Four', value: 4 },
  ];
  let value = 3;
</script>

# Examples

## Basic

<Preview>
  <SelectField {items} on:change={(e) => console.log('on:change', e.detail)} />
</Preview>

## bind:value

<Preview>
  <SelectField {items} bind:value />
  <Button on:click={() => (value = 1)}>Pick 1</Button>
  <Button on:click={() => (value = 2)}>Pick 2</Button>
  <Button on:click={() => (value = 3)}>Pick 3</Button>
  <Button on:click={() => (value = 4)}>Pick 4</Button>
</Preview>

## Loading

<Preview>
  <SelectField {items} loading />
</Preview>

## Disabled

<Preview>
  <SelectField {items} disabled />
</Preview>

## Item Slot

<Preview>
  <SelectField {items} on:change={(e) => console.log('on:change', e.detail)}>
    <div slot="item" let:item let:index let:highlightIndex>
      <div
        class="p-2 bg-opacity-5 hover:bg-black/5 cursor-pointer"
        class:bg-black={index === highlightIndex}
        use:scrollIntoView={{
          condition: index === highlightIndex,
          initial: false,
        }}
      >
        <div>{item.name}</div>
        <div class="text-sm text-black/50">{item.value}</div>
      </div>
    </div>
  </SelectField>
</Preview>

## Prepend slot

<Preview>
  <Toggle let:on={open} let:toggle>
    <SelectField {items}>
      <div slot="prepend" on:click|stopPropagation>
        <select
          class="appearance-none bg-black/5 border rounded-full mr-2 px-4"
          style="text-align-last: center;"
        >
          <!-- <option /> -->
          <option>{'='}</option>
          <option>{'!='}</option>
          <option>{'>'}</option>
          <option>{'>='}</option>
          <option>{'<'}</option>
          <option>{'<='}</option>
        </select>
      </div>
    </SelectField>
  </Toggle>
</Preview>

## Append slot (actions)

<Preview>
  <Toggle let:on={open} let:toggle>
    <SelectField {items}>
      <span slot="append" on:click|stopPropagation>
        <Button icon={mdiPlus} class="text-black/50 p-2" on:click={toggle} />
      </span>
    </SelectField>
    <Dialog {open} on:close={toggle}>
      <div slot="title">Create new item</div>
      <div class="px-6 py-3 w-96">
        <TextField label="Name" autofocus />
      </div>
      <div slot="actions">
        <Button
          on:click={() => console.log('Adding item...')}
          class="text-blue-500"
        >
          Add item
        </Button>
        <Button>Cancel</Button>
      </div>
    </Dialog>
  </Toggle>
</Preview>

## Icon

<Preview>
  <SelectField {items} icon={mdiMagnify} />
</Preview>

## Rounded

<Preview>
  <SelectField {items} rounded />
</Preview>

## Rounded with icon

<Preview>
  <SelectField {items} icon={mdiMagnify} rounded />
</Preview>

## Rounded with append slot and icon

<Preview>
  <SelectField {items} icon={mdiMagnify} rounded>
    <span slot="prepend" on:click|stopPropagation>
      <select
        class="appearance-none bg-black/5 border rounded-full mr-2 px-4"
        style="text-align-last: center;"
      >
        <!-- <option /> -->
        <option>{'='}</option>
        <option>{'!='}</option>
        <option>{'>'}</option>
        <option>{'>='}</option>
        <option>{'<'}</option>
        <option>{'<='}</option>
      </select>
    </span>
  </SelectField>
</Preview>

## Search

<Preview>
  <SelectField
    {items}
    on:change={(e) => console.log('on:change', e.detail)}
    search={async () => {
      console.log('search override...');
      await delay(1000);
      console.log('search override done');
    }}
  />
</Preview>

## Placement

<Preview>
  <SelectField
    {items}
    on:change={(e) => console.log('on:change', e.detail)}
    placement="top"
  />
</Preview>

<!-- ## Menu actions
<Preview>
<SelectField
  {items}
  on:change={(e) => {
    console.log('on:change', e.detail);
  }}
>
  <div slot="actions" class="p-2">
    <Tabs contained class="w-full" selected="active">
      <div class="tabList w-full border">
        <Tab value="active">Active</Tab>
        <Tab value="inaction">Inactive</Tab>
        <Tab value="all">All</Tab>
      </div>
    </Tabs>
  </div>
</SelectField>
</Preview>

<div class="h-96" /> -->

# API

<ApiDocs {api} />
