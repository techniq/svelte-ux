---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script>
  import { mdiContentCopy, mdiContentCut, mdiContentPaste, mdiMagnify, mdiRefresh } from '@mdi/js';

  import api from '$lib/components/MenuField.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Button from '$lib/components/Button.svelte';
  import MenuField from '$lib/components/MenuField.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import TextField from '$lib/components/TextField.svelte';

  const options = [
    { label: 'Cut', value: 'cut' },
    { label: 'Copy', value: 'copy' },
    { label: 'Paste', value: 'paste' },
  ];

  const optionsWithIcons = [
    { label: 'Cut', value: 'cut', icon: mdiContentCut},
    { label: 'Copy', value: 'copy', icon: mdiContentCopy },
    { label: 'Paste', value: 'paste', icon: mdiContentPaste },
  ]
</script>

# Examples

## Basic

<Preview>
  <MenuField {options} />
</Preview>

## Label

<Preview>
  <MenuField label="View" {options} />
</Preview>

## Value

<Preview>
  <MenuField {options} value="settings" />
</Preview>

## Icon

<Preview>
  <MenuField {options} icon={mdiMagnify} />
</Preview>

## Option icons

<Preview>
  <MenuField options={optionsWithIcons} />
</Preview>

## menuProps

<Preview>
  <MenuField {options} menuProps={{ placement: 'top-start' }} />
</Preview>

## options slot

<Preview>
  <MenuField {options} let:options let:setValue>
    <menu>
      {#each options as option}
        <li
          class="cursor-pointer p-2 text-sm hover:bg-black/5"
          on:click={() => setValue(option.value)}
        >
          {option.label}
        </li>
      {/each}
    </menu>
  </MenuField>
</Preview>

## explicitClose

<Preview>
  <MenuField {options} menuProps={{ explicitClose: true }} let:options let:setValue let:close>
    <div class="p-2">
      <TextField icon={mdiMagnify} placeholder="Search" />
    </div>
    <menu>
      {#each options as option}
        <li
          class="cursor-pointer p-2 text-sm hover:bg-black/5"
          on:click={() => {
            setValue(option.value);
            close();
          }}
        >
          {option.label}
        </li>
      {/each}
    </menu>
  </MenuField>
</Preview>

## append slot

<Preview>
  <MenuField {options}>
    <div slot="append">
      <Button icon={mdiRefresh} class="p-2 text-black/50" />
    </div>
  </MenuField>
</Preview>

# API

<ApiDocs {api} />
