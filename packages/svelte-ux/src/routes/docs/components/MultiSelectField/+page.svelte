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

  let value: number[] | undefined = $state([3]);
</script>

<h1>Examples</h1>

<h2>basic</h2>

<Preview>
  <MultiSelectField {options} {value} onChange={(_value) => (value = _value)} />
</Preview>

<h2>label</h2>

<Preview>
  <MultiSelectField label="Numbers" {options} {value} onChange={(_value) => (value = _value)} />
</Preview>

<h2>options variants</h2>

<Preview>
  <div class="grid gap-3">
    <MultiSelectField
      label="checkbox (default)"
      {options}
      {value}
      optionProps={{ variant: 'checkbox' }}
      onChange={(_value) => (value = _value)}
    />
    <MultiSelectField
      label="checkmark"
      {options}
      {value}
      optionProps={{ variant: 'checkmark' }}
      onChange={(_value) => (value = _value)}
    />
    <MultiSelectField
      label="fill"
      {options}
      {value}
      optionProps={{ variant: 'fill' }}
      onChange={(_value) => (value = _value)}
    />
  </div>
</Preview>

<h2>disabled</h2>

<Preview>
  <MultiSelectField {options} {value} onChange={(_value) => (value = _value)} disabled />
</Preview>

<h2>maintainOrder</h2>

<Preview>
  <MultiSelectField {options} {value} onChange={(_value) => (value = _value)} maintainOrder />
</Preview>

<h2>max selected</h2>

<Preview>
  <MultiSelectField {options} {value} max={2} onChange={(_value) => (value = _value)} />
</Preview>

<h2>max selected with warning</h2>

<Preview>
  <MultiSelectField {options} {value} max={2} onChange={(_value) => (value = _value)}>
    {#snippet beforeOptions({ selection })}
      {#if selection.isMaxSelected()}
        <div
          class="bg-danger/5 border-danger text-danger-600 border text-sm font-semibold p-2 rounded mb-1"
          transition:slide
        >
          Maximum selection reached
        </div>
      {/if}
    {/snippet}
  </MultiSelectField>
</Preview>

<h2>many options</h2>

<Preview>
  <MultiSelectField
    options={manyOptions}
    {value}
    onChange={(_value) => (value = _value)}
    classes={{
      multiSelectMenu: {
        menu: 'max-h-[360px]',
      },
    }}
    menuProps={{ autoPlacement: true }}
  />
</Preview>

<h2>Immediately apply changes (no actions) w/ maintainOrder</h2>

<Preview>
  <MultiSelectField
    {options}
    {value}
    onChange={(_value) => (value = _value)}
    mode="immediate"
    maintainOrder
  />
</Preview>

<h2>Immediately apply changes (with custom action) w/ maintainOrder</h2>

<Preview>
  <MultiSelectField
    {options}
    {value}
    onChange={(_value) => (value = _value)}
    mode="immediate"
    maintainOrder
  >
    {#snippet actions()}
      <div>
        <Button color="primary" icon={mdiPlus}>Add item</Button>
      </div>
    {/snippet}
  </MultiSelectField>
</Preview>

<h2>formatSelected</h2>

<Preview>
  <MultiSelectField
    {options}
    {value}
    formatSelected={({ options }) => options.map((o) => o.label).join(', ') || 'None'}
    onChange={(_value) => (value = _value)}
  />
</Preview>

<h2>actions slot</h2>

<Preview>
  <MultiSelectField {options} {value} onChange={(_value) => (value = _value)}>
    {#snippet actions()}
      <div>
        <Button color="primary" icon={mdiPlus}>Add item</Button>
      </div>
    {/snippet}
  </MultiSelectField>
</Preview>

<h2>actions slot with max warning</h2>

<Preview>
  <MultiSelectField {options} {value} onChange={(_value) => (value = _value)} max={2}>
    {#snippet actions({ selection })}
      <div class="flex items-center">
        {#if selection.isMaxSelected()}
          <div class="text-sm text-danger">Maximum selection reached</div>
        {/if}
      </div>
    {/snippet}
  </MultiSelectField>
</Preview>

<h2>within Drawer</h2>

<Preview>
  <ToggleButton>
    {#snippet children()}
      Open Drawer
    {/snippet}
    {#snippet toggle({ on: open, toggleOff })}
      <Drawer {open} onClose={toggleOff} class="w-[400px]">
        <div class="p-4">
          <MultiSelectField {options} {value} onChange={(_value) => (value = _value)} />
        </div>
        {#snippet actions()}
          <div>
            <Button onclick={toggleOff}>Close</Button>
          </div>
        {/snippet}
      </Drawer>
    {/snippet}
  </ToggleButton>
</Preview>

<h2>option slot</h2>

<Preview>
  <MultiSelectField {options} {value} onChange={(_value) => (value = _value)}>
    {#snippet option({ option, label, value, checked, indeterminate, onChange })}
      <MultiSelectOption {checked} {indeterminate} {onChange}>
        <span class="uppercase text-danger">{label}</span>
      </MultiSelectOption>
    {/snippet}
  </MultiSelectField>
</Preview>
