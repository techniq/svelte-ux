<script lang="ts">
  import { mdiContentCopy, mdiContentCut, mdiContentPaste, mdiMagnify, mdiRefresh } from '@mdi/js';

  import { Button, MenuField, MenuItem, TextField } from 'svelte-ux';
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

  const optionsWithGroup = [
    { label: 'One', value: 1, group: 'First' },
    { label: 'Two', value: 2, group: 'First' },
    { label: 'Three', value: 3, group: 'Second' },
    { label: 'Four', value: 4, group: 'Second' },
    { label: 'Five', value: 5, group: 'Second' },
    { label: 'Six', value: 6, group: 'Third' },
    { label: 'Seven', value: 7, group: 'Third' },
  ];
</script>

<h1>Examples</h1>

<h2>basic</h2>

<Preview>
  <MenuField {options} />
</Preview>

<h2>label</h2>

<Preview>
  <MenuField label="View" {options} />
</Preview>

<h2>value</h2>

<Preview>
  <MenuField {options} value="copy" />
</Preview>

<h2>empty selection</h2>

<Preview>
  <MenuField options={[{ label: 'Please make a selection', value: null }, ...options]} />
</Preview>

<h2>icon</h2>

<Preview>
  <MenuField {options} icon={mdiMagnify} />
</Preview>

<h2>option icons</h2>

<Preview>
  <MenuField options={optionsWithIcons} />
</Preview>

<h2>grouped options</h2>

<Preview>
  <MenuField options={optionsWithGroup} />
</Preview>

<h2>menuProps</h2>

<Preview>
  <MenuField {options} menuProps={{ placement: 'top-start' }} />
</Preview>

<h2>explicitClose</h2>

<Preview>
  <MenuField {options} menuProps={{ explicitClose: true }}   >
    {#snippet children({ options, setValue, close })}
        <div class="p-2">
        <TextField icon={mdiMagnify} placeholder="Search" />
      </div>
      <menu>
        {#each options as option}
          <MenuItem
            onclick={() => {
              setValue(option.value);
              close();
            }}
          >
            {option.label}
          </MenuItem>
        {/each}
      </menu>
          {/snippet}
    </MenuField>
</Preview>

<h2>options slot</h2>

<Preview>
  <MenuField {options}  >
    {#snippet children({ options, setValue })}
        <menu>
        {#each options as option}
          <MenuItem onclick={() => setValue(option.value)}>
            {option.label}
          </MenuItem>
        {/each}
      </menu>
          {/snippet}
    </MenuField>
</Preview>

<h2>append slot</h2>

<Preview>
  <MenuField {options}>
    {#snippet append()}
        <div >
        <Button icon={mdiRefresh} class="p-2 text-surface-content/50" />
      </div>
      {/snippet}
  </MenuField>
</Preview>

<h2>stepper</h2>

<Preview>
  <MenuField {options} stepper classes={{ menuIcon: 'hidden' }} />
</Preview>

<h2>style</h2>

<Preview>
  <MenuField
    {options}
    classes={{ container: 'bg-primary/10 rounded-full border-0 text-primary' }}
  />
</Preview>
