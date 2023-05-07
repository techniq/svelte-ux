<script>
  import { mdiContentCopy, mdiContentCut, mdiContentPaste, mdiMagnify, mdiRefresh } from '@mdi/js';

  import api from '$lib/components/MenuField.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Button from '$lib/components/Button.svelte';
  import MenuField from '$lib/components/MenuField.svelte';
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

<h1>Examples</h1>

<h2>Basic</h2>

<Preview>
  <MenuField {options} />
</Preview>

<h2>Label</h2>

<Preview>
  <MenuField label="View" {options} />
</Preview>

<h2>Value</h2>

<Preview>
  <MenuField {options} value="copy" />
</Preview>

<h2>Icon</h2>

<Preview>
  <MenuField {options} icon={mdiMagnify} />
</Preview>

<h2>Option icons</h2>

<Preview>
  <MenuField options={optionsWithIcons} />
</Preview>

<h2>menuProps</h2>

<Preview>
  <MenuField {options} menuProps={{ placement: 'top-start' }} />
</Preview>

<h2>explicitClose</h2>

<Preview>
  <MenuField {options} menuProps={{ explicitClose: true }} let:options let:setValue let:close>
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
  </MenuField>
</Preview>

<h2>options slot</h2>

<Preview>
  <MenuField {options} let:options let:setValue>
    <menu>
      {#each options as option}
        <MenuItem on:click={() => setValue(option.value)}>
          {option.label}
        </MenuItem>
      {/each}
    </menu>
  </MenuField>
</Preview>

<h2>append slot</h2>

<Preview>
  <MenuField {options}>
    <div slot="append">
      <Button icon={mdiRefresh} class="p-2 text-black/50" />
    </div>
  </MenuField>
</Preview>

<h2>Style</h2>

<Preview>
  <MenuField {options} classes={{ container: 'bg-blue-50 rounded-full border-0 text-blue-500' }} />
</Preview>

<h1>API</h1>

<ApiDocs {api} />
