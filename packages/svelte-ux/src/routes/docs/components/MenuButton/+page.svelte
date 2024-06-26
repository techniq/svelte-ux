<script lang="ts">
  import {
    mdiContentCopy,
    mdiContentCut,
    mdiContentPaste,
    mdiMagnify,
    mdiChevronDown,
  } from '@mdi/js';

  import { Icon, MenuButton, MenuItem, TextField } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';

  const options = [
    { label: 'Cut', value: 'cut' },
    { label: 'Copy', value: 'copy' },
    { label: 'Paste', value: 'paste' },
  ];

  const optionsWithIcons = [
    { label: 'Cut', value: 'cut', icon: mdiContentCut },
    { label: 'Copy', value: 'copy', icon: mdiContentCopy },
    { label: 'Paste', value: 'paste', icon: mdiContentPaste },
  ];
</script>

<h1>Examples</h1>

<h2>Basic</h2>

<Preview>
  <MenuButton {options} />
</Preview>

<h2>Label</h2>

<Preview>
  <MenuButton label="View" {options} />
</Preview>

<h2>Value</h2>

<Preview>
  <MenuButton {options} value="copy" />
</Preview>

<h2>Icon</h2>

<Preview>
  <MenuButton {options} icon={mdiMagnify} />
</Preview>

<h2>Option icons</h2>

<Preview>
  <MenuButton options={optionsWithIcons} />
</Preview>

<h2>Option icons with selected icon</h2>

<Preview>
  <MenuButton options={optionsWithIcons}>
    <svelte:fragment slot="selection" let:value>
      {#if value}
        <Icon data={value?.icon ?? mdiChevronDown} /> {value.label}
      {:else}
        No selection
      {/if}
    </svelte:fragment>
  </MenuButton>
</Preview>

<h2>Icon only</h2>

<Preview>
  <MenuButton options={optionsWithIcons} menuIcon={null}>
    <svelte:fragment slot="selection" let:value>
      <Icon data={value?.icon ?? mdiChevronDown} />
    </svelte:fragment>
  </MenuButton>
</Preview>

<h2>Variant</h2>

<Preview>
  <MenuButton {options} variant="fill" color="primary" />
</Preview>

<h2>Size</h2>

<Preview>
  <MenuButton {options} size="sm" />
</Preview>

<h2>menuProps (placement)</h2>

<Preview>
  <MenuButton {options} menuProps={{ placement: 'top-start' }} />
</Preview>

<h2>menuProps (matchWidth)</h2>

<Preview>
  <MenuButton {options} menuProps={{ matchWidth: true }} />
</Preview>

<h2>menuProps (explicitClose)</h2>

<Preview>
  <MenuButton
    {options}
    menuProps={{ placement: 'bottom-start', explicitClose: true }}
    let:options
    let:setValue
    let:close
  >
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

<h2>options slot</h2>

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
