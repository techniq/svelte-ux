<script lang="ts">
  import { slide } from 'svelte/transition';
  import { mdiPlus } from '@mdi/js';

  import { Button, Drawer, MultiSelectField, MultiSelectOption, ToggleButton } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';

  const options = [
    { label: 'One', value: 1 },
    { label: 'Two', value: 2 },
    { label: 'Three', value: 3 },
    { label: 'Four', value: 4 },
  ];

  const manyOptions = Array.from({ length: 100 }).map((_, i) => ({
    label: `${i + 1}`,
    value: i + 1,
  }));

  let value: number[] | undefined = [3];
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
          class="bg-danger/5 border-danger text-danger-600 border text-sm font-semibold p-2 rounded mb-1"
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
    classes={{
      multiSelectMenu: {
        menu: 'max-h-[360px]',
      },
    }}
    menuProps={{ autoPlacement: true }}
  />
</Preview>

<h2>formatSelected</h2>

<Preview>
  <MultiSelectField
    {options}
    {value}
    formatSelected={({ options }) => options.map((o) => o.label).join(', ') || 'None'}
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
        <div class="text-sm text-danger">Maximum selection reached</div>
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
      <span class="uppercase text-danger">{label}</span>
    </MultiSelectOption>
  </MultiSelectField>
</Preview>
