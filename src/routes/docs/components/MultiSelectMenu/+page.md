---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script>
  import { mdiMagnify, mdiPlus, mdiPencil } from '@mdi/js';

  import api from '$lib/components/MultiSelectMenu.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Button from '$lib/components/Button.svelte';
  import Dialog from '$lib/components/Dialog.svelte';
  import Drawer from '$lib/components/Drawer.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import MenuItem from '$lib/components/MenuItem.svelte';
  import Stack from '$lib/components/Stack.svelte';
  import MultiSelectMenu from '$lib/components/MultiSelectMenu.svelte';
  import TextField from '$lib/components/TextField.svelte';
  import Toggle from '$lib/components/Toggle.svelte';
  import ToggleButton from '$lib/components/ToggleButton.svelte';


  import { delay } from '$lib/utils/promise';
  import { cls } from '$lib/utils/styles';

  const options = [
    { name: 'One', value: 1 },
    { name: 'Two', value: 2 },
    { name: 'Three', value: 3 },
    { name: 'Four', value: 4 },
  ];

  const manyOptions = Array.from({ length: 100 }).map((_, i) => ({ name: `${i + 1}`, value: i + 1 }))

  let value = [3];
</script>

# Examples

## basic

<Preview>
  <span>
    <ToggleButton let:on={open} let:toggleOff transition={false}>
      {value.length} selected
      <MultiSelectMenu
        {options}
        {value}
        on:change={(e) => value = e.detail.value}
        {open}
        on:close={toggleOff}
      />
    </ToggleButton>
  </span>
</Preview>

## inlineSearch

<Preview>
  <span>
    <ToggleButton let:on={open} let:toggleOff transition={false}>
      {value.length} selected
      <MultiSelectMenu
        {options}
        {value}
        on:change={(e) => value = e.detail.value}
        {open}
        on:close={toggleOff}
        inlineSearch
      />
    </ToggleButton>
  </span>
</Preview>

## many options

<Preview>
  <span>
    <ToggleButton let:on={open} let:toggleOff transition={false}>
      {value.length} selected
      <MultiSelectMenu
        options={manyOptions}
        {value}
        on:change={(e) => value = e.detail.value}
        {open}
        on:close={toggleOff}
        classes={{ menu: 'max-h-[360px] w-[360px]' }}
      />
    </ToggleButton>
  </span>
</Preview>

## many options w/ inlineSearch

<Preview>
  <span>
    <ToggleButton let:on={open} let:toggleOff transition={false}>
      {value.length} selected
      <MultiSelectMenu
        options={manyOptions}
        {value}
        on:change={(e) => value = e.detail.value}
        {open}
        on:close={toggleOff}
        classes={{ menu: 'max-h-[360px] w-[360px]' }}
        inlineSearch
      />
    </ToggleButton>
  </span>
</Preview>

## many options w/ infiniteScroll

<Preview>
  <span>
    <ToggleButton let:on={open} let:toggleOff transition={false}>
      {value.length} selected
      <MultiSelectMenu
        options={manyOptions}
        {value}
        on:change={(e) => value = e.detail.value}
        {open}
        on:close={toggleOff}
        classes={{ menu: 'max-h-[360px] w-[360px]' }}
        inlineSearch
        infiniteScroll
      />
    </ToggleButton>
  </span>
</Preview>

## actions slot

<Preview>
  <span>
    <ToggleButton let:on={open} let:toggleOff transition={false}>
      {value.length} selected
      <MultiSelectMenu
        {options}
        {value}
        on:change={(e) => value = e.detail.value}
        {open}
        on:close={toggleOff}
        classes={{ menu: 'w-[360px]' }}
        inlineSearch
      >
        <div slot="actions">
          <Button color="accent" icon={mdiPlus}>Add item</Button>
        </div>
      </MultiSelectMenu>
    </ToggleButton>
  </span>
</Preview>

# API

<ApiDocs {api} />
