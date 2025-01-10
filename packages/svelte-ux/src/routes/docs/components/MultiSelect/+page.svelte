<script lang="ts">
  import { mdiCheck, mdiDotsVertical, mdiPlus } from '@mdi/js';

  import {
    Button,
    Drawer,
    Form,
    Icon,
    MultiSelect,
    MultiSelectOption,
    ToggleButton,
  } from 'svelte-ux';
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

  let value = $state([3]);
</script>

<h1>Examples</h1>

<h2>basic</h2>

<Preview>
  {value.length} selected
  <MultiSelect {options} {value} onChange={({ value: _value }) => (value = _value)} />
</Preview>

<h2>options variant: checkmark</h2>

<Preview>
  {value.length} selected
  <MultiSelect
    {options}
    {value}
    optionProps={{ variant: 'checkmark' }}
    onChange={({ value: _value }) => (value = _value)}
  />
</Preview>

<h2>options variant: fill</h2>

<Preview>
  {value.length} selected
  <MultiSelect
    {options}
    {value}
    optionProps={{ variant: 'fill' }}
    onChange={({ value: _value }) => (value = _value)}
  />
</Preview>

<h2>inlineSearch</h2>

<Preview>
  {value.length} selected
  <MultiSelect {options} {value} onChange={({ value: _value }) => (value = _value)} inlineSearch />
</Preview>

<h2>maintainOrder</h2>

<Preview>
  {value.length} selected
  <MultiSelect {options} {value} maintainOrder onChange={({ value: _value }) => (value = _value)} />
</Preview>

<h2>Immediately apply changes (no actions) w/ maintainOrder</h2>

<Preview>
  {value.length} selected
  <MultiSelect
    {options}
    {value}
    maintainOrder
    mode="immediate"
    onChange={({ value: _value }) => (value = _value)}
  />
</Preview>

<h2>Immediately apply changes (with custom action) w/ maintainOrder</h2>

<Preview>
  {value.length} selected
  <MultiSelect
    {options}
    {value}
    maintainOrder
    mode="immediate"
    onChange={({ value: _value }) => (value = _value)}
  >
    {#snippet actions()}
      <div>
        <Button color="primary" icon={mdiPlus}>Add item</Button>
      </div>
    {/snippet}
  </MultiSelect>
</Preview>

<h2>max selected</h2>

<Preview>
  {value.length} selected
  <MultiSelect {options} {value} max={2} onChange={({ value: _value }) => (value = _value)} />
</Preview>

<h2>max selected with warning</h2>

<Preview>
  {value.length} selected
  <MultiSelect {options} {value} max={2} onChange={({ value: _value }) => (value = _value)}>
    {#snippet actions({ selection })}
      {#if selection.isMaxSelected()}
        <div class="text-danger-600 text-sm font-semibold px-2">Maximum selection reached</div>
      {/if}
    {/snippet}
  </MultiSelect>
</Preview>

<h2>many options</h2>

<Preview>
  {value.length} selected
  <div class="flex flex-col max-h-[360px] overflow-auto">
    <MultiSelect options={manyOptions} {value} onChange={({ value: _value }) => (value = _value)} />
  </div>
</Preview>

<h2>many options w/ inlineSearch</h2>

<Preview>
  {value.length} selected
  <div class="flex flex-col max-h-[360px] overflow-auto">
    <MultiSelect
      options={manyOptions}
      {value}
      onChange={({ value: _value }) => (value = _value)}
      inlineSearch
    />
  </div>
</Preview>

<h2>many options w/ infiniteScroll</h2>

<Preview>
  {value.length} selected
  <div class="flex flex-col max-h-[360px] overflow-auto">
    <MultiSelect
      options={manyOptions}
      {value}
      onChange={({ value: _value }) => (value = _value)}
      inlineSearch
      infiniteScroll
    />
  </div>
</Preview>

<h2>actions slot</h2>

<Preview>
  {value.length} selected
  <div class="flex flex-col max-h-[360px] overflow-auto">
    <MultiSelect {options} {value} onChange={({ value: _value }) => (value = _value)} inlineSearch>
      {#snippet actions()}
        <div>
          <Button color="primary" icon={mdiPlus}>Add item</Button>
        </div>
      {/snippet}
    </MultiSelect>
  </div>
</Preview>

<h2>actions slot with max warning</h2>

<Preview>
  {value.length} selected
  <div class="flex flex-col max-h-[360px] overflow-auto">
    <MultiSelect {options} {value} onChange={({ value: _value }) => (value = _value)} inlineSearch max={2}>
      {#snippet actions({ selection })}
        <div class="flex items-center">
          {#if selection.isMaxSelected()}
            <div class="text-sm text-danger">Maximum selection reached</div>
          {/if}
        </div>
      {/snippet}
    </MultiSelect>
  </div>
</Preview>

<h2>option slot with MultiSelectOption custom actions</h2>

<Preview>
  {value.length} selected
  <div class="flex flex-col max-h-[360px] overflow-auto">
    <MultiSelect {options} {value} onChange={({ value: _value }) => (value = _value)} inlineSearch>
      {#snippet option({ option, label, value, checked, indeterminate, onChange })}
        <MultiSelectOption {checked} {indeterminate} {onChange}>
          <div class="uppercase">{label}</div>
          <div class="text-xs text-surface-content/50">value: {value}</div>

          {#snippet actions()}
            <div class="flex items-center">
              <ToggleButton icon={mdiDotsVertical} iconOnly class="text-surface-content/50">
                {#snippet toggle({ on: open, toggleOff })}
                  <Drawer {open} onClose={toggleOff} class="w-[400px]">
                    <h1>Edit: {label}</h1>
                    <div
                      class="fixed bottom-0 w-full flex justify-center bg-surface-content/5 border-t p-1"
                    >
                      <Button onclick={toggleOff}>Close</Button>
                    </div>
                  </Drawer>
                {/snippet}
              </ToggleButton>
            </div>
          {/snippet}
        </MultiSelectOption>
      {/snippet}
    </MultiSelect>
  </div>
</Preview>

<h2>option slot with custom markup</h2>

<Preview>
  {value.length} selected
  <div class="flex flex-col max-h-[360px] overflow-auto">
    <MultiSelect {options} {value} onChange={({ value: _value }) => (value = _value)}>
      {#snippet option({ option, label, value, checked, indeterminate, onChange })}
        <button
          class="px-2 py-1 text-surface-content flex gap-1 w-full"
          role="option"
          aria-selected={checked}
          onclick={onChange}
        >
          <Icon data={checked ? mdiCheck : ''} />
          <div>{label}</div>
        </button>
      {/snippet}
    </MultiSelect>
  </div>
</Preview>

<h2>Form integration</h2>

<Preview>
  <Form initial={{ value }} onChange={({ value: _value }) => (value = _value)}>
    {#snippet children({ draft, state })}
      {state.value.length} selected
      <MultiSelect
        {options}
        value={draft.value}
        onChange={({ value: _value }) => (draft.value = _value)}
        cancelButtonProps={{ type: 'reset' }}
        applyButtonProps={{ type: 'submit' }}
      />
    {/snippet}
  </Form>
</Preview>
