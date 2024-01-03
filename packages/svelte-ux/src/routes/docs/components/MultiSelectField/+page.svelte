<script lang="ts">
  import { mdiPlus } from '@mdi/js';

  import Button from '$lib/components/Button.svelte';
  import Drawer from '$lib/components/Drawer.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import MultiSelectField from '$lib/components/MultiSelectField.svelte';
  import MultiSelectOption from '$lib/components/MultiSelectOption.svelte';
  import ToggleButton from '$lib/components/ToggleButton.svelte';
  import { slide } from 'svelte/transition';

  const options = [
    { name: 'One', value: 1 },
    { name: 'Two', value: 2 },
    { name: 'Three', value: 3 },
    { name: 'Four', value: 4 },
  ];

  const manyOptions = Array.from({ length: 100 }).map((_, i) => ({
    name: `${i + 1}`,
    value: i + 1,
  }));

  let value = [3];
</script>

<h1>Examples</h1>

<h2>basic</h2>

<Preview>
  <MultiSelectField {options} {value} on:change={(e) => (value = e.detail.value)} />
</Preview>

<h2>label</h2>

<Preview>
  <MultiSelectField label="Numbers" {options} {value} on:change={(e) => (value = e.detail.value)} />
</Preview>

<h2>disabled</h2>

<Preview>
  <MultiSelectField {options} {value} on:change={(e) => (value = e.detail.value)} disabled />
</Preview>

<h2>max selected</h2>

<Preview>
  <MultiSelectField {options} {value} max={2} on:change={(e) => (value = e.detail.value)} />
</Preview>

<h2>max selected with warning</h2>

<Preview>
  <MultiSelectField {options} {value} max={2} on:change={(e) => (value = e.detail.value)}>
    <svelte:fragment slot="beforeOptions" let:selection>
      {#if selection.isMaxSelected()}
        <div
          class="bg-red-50 border-red-500 text-red-600 border text-sm font-semibold p-2 rounded mb-1"
          transition:slide
        >
          Maximum selection reached
        </div>
      {/if}
    </svelte:fragment>
  </MultiSelectField>
</Preview>

<h2>many options</h2>

<Preview>
  <MultiSelectField
    options={manyOptions}
    {value}
    on:change={(e) => (value = e.detail.value)}
    classes={{ menu: 'max-h-[360px]' }}
    menuProps={{ autoPlacement: true }}
  />
</Preview>

<h2>formatSelected</h2>

<Preview>
  <MultiSelectField
    {options}
    {value}
    formatSelected={({ options }) => options.map((o) => o.name).join(', ') || 'None'}
    on:change={(e) => (value = e.detail.value)}
  />
</Preview>

<h2>actions slot</h2>

<Preview>
  <MultiSelectField {options} {value} on:change={(e) => (value = e.detail.value)}>
    <div slot="actions">
      <Button color="primary" icon={mdiPlus}>Add item</Button>
    </div>
  </MultiSelectField>
</Preview>

<h2>actions slot with max warning</h2>

<Preview>
  <MultiSelectField {options} {value} on:change={(e) => (value = e.detail.value)} max={2}>
    <div slot="actions" let:selection class="flex items-center">
      {#if selection.isMaxSelected()}
        <div class="text-sm text-red-500">Maximum selection reached</div>
      {/if}
    </div>
  </MultiSelectField>
</Preview>

<h2>within Drawer</h2>

<Preview>
  <ToggleButton let:on={open}>
    Open Drawer
    <Drawer slot="toggle" let:toggleOff {open} on:close={toggleOff} class="w-[400px]">
      <div class="p-4">
        <MultiSelectField {options} {value} on:change={(e) => (value = e.detail.value)} />
      </div>
      <div slot="actions">
        <Button on:click={toggleOff}>Close</Button>
      </div>
    </Drawer>
  </ToggleButton>
</Preview>

<h2>option slot</h2>

<Preview>
  <MultiSelectField {options} {value} on:change={(e) => (value = e.detail.value)}>
    <MultiSelectOption
      slot="option"
      let:option
      let:label
      let:value
      let:checked
      let:indeterminate
      let:onChange
      {checked}
      {indeterminate}
      on:change={onChange}
    >
      <span class="uppercase text-red-500">{label}</span>
    </MultiSelectOption>
  </MultiSelectField>
</Preview>
