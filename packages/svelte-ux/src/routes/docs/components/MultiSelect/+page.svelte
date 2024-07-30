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

  let value = [3];
</script>

<h1>Examples</h1>

<h2>basic</h2>

<Preview>
  {value.length} selected
  <MultiSelect {options} {value} on:change={(e) => (value = e.detail.value)} />
</Preview>

<h2>inlineSearch</h2>

<Preview>
  {value.length} selected
  <MultiSelect {options} {value} on:change={(e) => (value = e.detail.value)} inlineSearch />
</Preview>

<h2>maintainOrder</h2>

<Preview>
  {value.length} selected
  <MultiSelect {options} {value} maintainOrder on:change={(e) => (value = e.detail.value)} />
</Preview>

<h2>Immediately apply changes (no actions) w/ maintainOrder</h2>

<Preview>
  {value.length} selected
  <MultiSelect
    {options}
    {value}
    maintainOrder
    mode="immediate"
    on:change={(e) => (value = e.detail.value)}
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
    on:change={(e) => (value = e.detail.value)}
  >
    <div slot="actions">
      <Button color="primary" icon={mdiPlus}>Add item</Button>
    </div>
  </MultiSelect>
</Preview>

<h2>max selected</h2>

<Preview>
  {value.length} selected
  <MultiSelect {options} {value} max={2} on:change={(e) => (value = e.detail.value)} />
</Preview>

<h2>max selected with warning</h2>

<Preview>
  {value.length} selected
  <MultiSelect {options} {value} max={2} on:change={(e) => (value = e.detail.value)}>
    <svelte:fragment slot="actions" let:selection>
      {#if selection.isMaxSelected()}
        <div class="text-danger-600 text-sm font-semibold px-2">Maximum selection reached</div>
      {/if}
    </svelte:fragment>
  </MultiSelect>
</Preview>

<h2>many options</h2>

<Preview>
  {value.length} selected
  <div class="flex flex-col max-h-[360px] overflow-auto">
    <MultiSelect options={manyOptions} {value} on:change={(e) => (value = e.detail.value)} />
  </div>
</Preview>

<h2>many options w/ inlineSearch</h2>

<Preview>
  {value.length} selected
  <div class="flex flex-col max-h-[360px] overflow-auto">
    <MultiSelect
      options={manyOptions}
      {value}
      on:change={(e) => (value = e.detail.value)}
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
      on:change={(e) => (value = e.detail.value)}
      inlineSearch
      infiniteScroll
    />
  </div>
</Preview>

<h2>actions slot</h2>

<Preview>
  {value.length} selected
  <div class="flex flex-col max-h-[360px] overflow-auto">
    <MultiSelect {options} {value} on:change={(e) => (value = e.detail.value)} inlineSearch>
      <div slot="actions">
        <Button color="primary" icon={mdiPlus}>Add item</Button>
      </div>
    </MultiSelect>
  </div>
</Preview>

<h2>actions slot with max warning</h2>

<Preview>
  {value.length} selected
  <div class="flex flex-col max-h-[360px] overflow-auto">
    <MultiSelect {options} {value} on:change={(e) => (value = e.detail.value)} inlineSearch max={2}>
      <div slot="actions" let:selection class="flex items-center">
        {#if selection.isMaxSelected()}
          <div class="text-sm text-danger">Maximum selection reached</div>
        {/if}
      </div>
    </MultiSelect>
  </div>
</Preview>

<h2>option slot with MultiSelectOption custom actions</h2>

<Preview>
  {value.length} selected
  <div class="flex flex-col max-h-[360px] overflow-auto">
    <MultiSelect {options} {value} on:change={(e) => (value = e.detail.value)} inlineSearch>
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
        <div class="uppercase">{label}</div>
        <div class="text-xs text-surface-content/50">value: {value}</div>

        <div slot="actions" class="flex items-center">
          <ToggleButton icon={mdiDotsVertical} iconOnly class="text-surface-content/50">
            <Drawer
              slot="toggle"
              let:on={open}
              {open}
              on:close={toggleOff}
              class="w-[400px]"
              let:toggleOff
            >
              <h1>Edit: {label}</h1>
              <div
                class="fixed bottom-0 w-full flex justify-center bg-surface-content/5 border-t p-1"
              >
                <Button on:click={toggleOff}>Close</Button>
              </div>
            </Drawer>
          </ToggleButton>
        </div>
      </MultiSelectOption>
    </MultiSelect>
  </div>
</Preview>

<h2>option slot with custom markup</h2>

<Preview>
  {value.length} selected
  <div class="flex flex-col max-h-[360px] overflow-auto">
    <MultiSelect {options} {value} on:change={(e) => (value = e.detail.value)}>
      <svelte:fragment
        slot="option"
        let:option
        let:label
        let:value
        let:checked
        let:indeterminate
        let:onChange
      >
        <button
          class="px-2 py-1 text-surface-content flex gap-1 w-full"
          role="option"
          on:click={onChange}
        >
          <Icon data={checked ? mdiCheck : ''} />
          <div>{label}</div>
        </button>
      </svelte:fragment>
    </MultiSelect>
  </div>
</Preview>

<h2>Form integration</h2>

<Preview>
  <Form initial={{ value }} on:change={(e) => (value = e.detail.value)} let:draft let:state>
    {state.value.length} selected
    <MultiSelect
      {options}
      value={draft.value}
      {draft}
      on:change={(e) => (draft.value = e.detail.value)}
      cancelButtonProps={{ type: 'reset' }}
      applyButtonProps={{ type: 'submit' }}
    />
  </Form>
</Preview>
