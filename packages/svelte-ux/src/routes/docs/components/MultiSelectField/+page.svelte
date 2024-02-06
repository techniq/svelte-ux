<script lang="ts">
  import { mdiPlus } from '@mdi/js';

  import Button from '$lib/components/Button.svelte';
  import Drawer from '$lib/components/Drawer.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import MultiSelectField from '$lib/components/MultiSelectField.svelte';
  import MultiSelectOption from '$lib/components/MultiSelectOption.svelte';
  import ToggleButton from '$lib/components/ToggleButton.svelte';

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
      <Button color="accent" icon={mdiPlus}>Add item</Button>
    </div>
  </MultiSelectField>
</Preview>

<h2>within Drawer</h2>

<Preview>
  <ToggleButton let:on={open} let:toggle let:toggleOff>
    Open Drawer
    <Drawer slot="toggle" {open} on:close={toggleOff} class="w-[400px]">
      <div class="p-4">
        <MultiSelectField {options} {value} on:change={(e) => (value = e.detail.value)} />
      </div>
      <div
        class="fixed bottom-0 w-full flex justify-center bg-gray-500/25
      p-1 border-t border-gray-400"
      >
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
