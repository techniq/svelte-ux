---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script>
  import { mdiContentCopy, mdiContentCut, mdiContentPaste, mdiMagnify, mdiRefresh } from '@mdi/js';

  import api from '$lib/components/MenuButton.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Button from '$lib/components/Button.svelte';
  import MenuButton from '$lib/components/MenuButton.svelte';
  import MenuItem from '$lib/components/MenuItem.svelte';
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
  <MenuButton {options} />
</Preview>

## Label

<Preview>
  <MenuButton label="View" {options} />
</Preview>

## Value

<Preview>
  <MenuButton {options} value="copy" />
</Preview>

## Icon

<Preview>
  <MenuButton {options} icon={mdiMagnify} />
</Preview>

## Variant

<Preview>
  <MenuButton {options} variant="filled" color="blue" />
</Preview>

## Size

<Preview>
  <MenuButton {options} size="sm" />
</Preview>

## Option icons

<Preview>
  <MenuButton options={optionsWithIcons} />
</Preview>

## menuProps (placement)

<Preview>
  <MenuButton {options} menuProps={{ placement: 'top-start' }} />
</Preview>

## menuProps (matchWidth)

<Preview>
  <MenuButton {options} menuProps={{ matchWidth: true }} />
</Preview>

## menuProps (explicitClose)

<Preview>
  <MenuButton {options} menuProps={{ placement: 'bottom-start', explicitClose: true }} let:options let:setValue let:close>
    <div class="p-2">
      <TextField icon={mdiMagnify} placeholder="Search" />
    </div>
    <menu>
      {#each options as option}
        <MenuItem
          on:click={() => {
            setValue(option.value);
            close();
          }}
        >
          {option.label}
        </MenuItem>
      {/each}
    </menu>
  </MenuButton>
</Preview>

## options slot

<Preview>
  <MenuButton {options} let:options let:setValue>
    <menu class="w-24">
      {#each options as option}
        <MenuItem on:click={() => setValue(option.value)}>
          {option.label}
        </MenuItem>
      {/each}
    </menu>
  </MenuButton>
</Preview>

# API

<ApiDocs {api} />
