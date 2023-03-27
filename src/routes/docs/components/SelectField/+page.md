---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script>
  import { mdiMagnify, mdiPlus, mdiPencil } from '@mdi/js';

  import api from '$lib/components/SelectField.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Button from '$lib/components/Button.svelte';
  import Dialog from '$lib/components/Dialog.svelte';
  import Drawer from '$lib/components/Drawer.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import MenuItem from '$lib/components/MenuItem.svelte';
  import Stack from '$lib/components/Stack.svelte';
  import SelectField from '$lib/components/SelectField.svelte';
  import TextField from '$lib/components/TextField.svelte';
  import Toggle from '$lib/components/Toggle.svelte';


  import { delay } from '$lib/utils/promise';
  import { cls } from '$lib/utils/styles';

  const items = [
    { name: 'One', value: 1 },
    { name: 'Two', value: 2 },
    { name: 'Three', value: 3 },
    { name: 'Four', value: 4 },
  ];
  const itemsWithGroup = [
    { name: 'One', value: 1, group: "First" },
    { name: 'Two', value: 2, group: "First" },
    { name: 'Three', value: 3, group: "Second" },
    { name: 'Four', value: 4, group: "Second" },
    { name: 'Five', value: 5, group: "Second" },
    { name: 'Six', value: 6, group: "Third" },
    { name: 'Seven', value: 7, group: "Third" },
  ];

  const manyItems = Array.from({ length: 100 }).map((_, i) => ({ name: i + 1, value: i + 1 }))

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

## clearSearchOnFocus

<Preview>
  <SelectField {items} bind:value clearSearchOnFocus />
</Preview>

## clearable=false

<Preview>
  <SelectField {items} bind:value clearSearchOnFocus clearable={false} />
</Preview>

## Grouped options

<Preview>
  <SelectField items={itemsWithGroup} on:change={(e) => console.log('on:change', e.detail)} />
</Preview>

## Many options

<Preview>
  <SelectField items={manyItems} />
</Preview>

## Loading

<Preview>
  <SelectField {items} loading />
</Preview>

## Disabled

<Preview>
  <SelectField {items} disabled />
</Preview>

## Readonly

<Preview>
  <SelectField {items} value={1} readonly />
</Preview>

## Item Slot

<Preview>
  <SelectField {items} on:change={(e) => console.log('on:change', e.detail)}>
    <div slot="item" let:item let:index let:selected let:highlightIndex>
      <MenuItem
        class={cls(
          index === highlightIndex && 'bg-black/5',
          item === selected && 'font-semibold',
          item.group ? 'px-4' : 'px-2',
        )}
        scrollIntoView={index === highlightIndex}
      >
        <div>
          <div>{item.name}</div>
          <div class="text-sm text-black/50">{item.value}</div>
        </div>
      </MenuItem>
    </div>
  </SelectField>
</Preview>

## Item with action

<Preview>
  <SelectField {items} on:change={(e) => console.log('on:change', e.detail)}>
    <div slot="item" let:item let:index let:selected let:highlightIndex>
      <MenuItem
        class={cls(
          index === highlightIndex && 'bg-black/5',
          item === selected && 'font-semibold',
          item.group ? 'px-4' : 'px-2',
        )}
        scrollIntoView={index === highlightIndex}
      >
        <div class="grid grid-cols-[1fr,auto] items-center w-full">
          <div>
            <div>{item.name}</div>
            <div class="text-sm text-black/50">{item.value}</div>
          </div>
          <Toggle let:on={open} let:toggle let:toggleOff>
            <Button
              icon={mdiPencil}
              class="-m-1 p-1 text-xs text-gray-400 z-[9999]"
              on:click={toggle}
            />
            <Drawer {open} on:close={toggleOff} right class="w-[400px]">
              <div class="p-4">
                Editing item: {item.name}
              </div>
              <div class="fixed bottom-0 w-full flex justify-center bg-gray-500/25 p-1 border-t border-gray-400">
                <Button on:click={toggleOff}>Close</Button>
              </div>
            </Drawer>
          </Toggle>
        </div>
      </MenuItem>
    </div>
  </SelectField>
</Preview>

## Prepend slot

<Preview>
  <Toggle let:on={open} let:toggle>
    <SelectField {items}>
      <div slot="prepend" on:click|stopPropagation class="flex items-center">
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
    placement="top-start"
  />
</Preview>

## Custom selected class

<Preview>
  <SelectField {items} bind:value clearSearchOnFocus classes={{ selected: 'bg-accent-500 text-white' }} />
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
    <ToggleGroup contained class="w-full" selected="active">
      <div class="options w-full border">
        <ToggleOption value="active">Active</ToggleOption>
        <ToggleOption value="inaction">Inactive</ToggleOption>
        <ToggleOption value="all">All</ToggleOption>
      </div>
    </ToggleGroup>
  </div>
</SelectField>
</Preview>

<div class="h-96" /> -->

# API

<ApiDocs {api} />
