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
    ToggleGroup,
    ToggleOption,
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

  // Filters (Any/Evens/Odds) for demos below
  let msSelectedStr: 'any' | 'even' | 'odds' = 'any';
  $: msOptionsFiltered =
    msSelectedStr === 'even'
      ? options.filter((o) => typeof o.value === 'number' && o.value % 2 === 0)
      : msSelectedStr === 'odds'
        ? options.filter((o) => typeof o.value === 'number' && o.value % 2 !== 0)
        : options;
</script>

<h1>Examples</h1>

<h2>basic</h2>

<Preview>
  {value.length} selected
  <MultiSelect {options} {value} on:change={(e) => (value = e.detail.value)} />
</Preview>

<h2>options variant: checkmark</h2>

<Preview>
  {value.length} selected
  <MultiSelect
    {options}
    {value}
    optionProps={{ variant: 'checkmark' }}
    on:change={(e) => (value = e.detail.value)}
  />
</Preview>

<h2>options variant: fill</h2>

<Preview>
  {value.length} selected
  <MultiSelect
    {options}
    {value}
    optionProps={{ variant: 'fill' }}
    on:change={(e) => (value = e.detail.value)}
  />
</Preview>

<h2>search</h2>

<Preview>
  {value.length} selected
  <MultiSelect {options} {value} on:change={(e) => (value = e.detail.value)} search />
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

<h2>many options w/ search</h2>

<Preview>
  {value.length} selected
  <div class="flex flex-col max-h-[360px] overflow-auto">
    <MultiSelect options={manyOptions} {value} on:change={(e) => (value = e.detail.value)} search />
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
      search
      infiniteScroll
    />
  </div>
</Preview>

<h2>actions slot</h2>

<Preview>
  {value.length} selected
  <div class="flex flex-col max-h-[360px] overflow-auto">
    <MultiSelect {options} {value} on:change={(e) => (value = e.detail.value)} search>
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
    <MultiSelect {options} {value} on:change={(e) => (value = e.detail.value)} search max={2}>
      <div slot="actions" let:selection class="flex items-center">
        {#if selection.isMaxSelected()}
          <div class="text-sm text-danger">Maximum selection reached</div>
        {/if}
      </div>
    </MultiSelect>
  </div>
</Preview>

<h2>beforeOptions slot</h2>

<Preview>
  {value.length} selected
  <div class="flex flex-col max-h-[360px] overflow-auto">
    <MultiSelect
      options={msOptionsFiltered}
      {value}
      on:change={(e) => (value = e.detail.value)}
      search
    >
      <svelte:fragment slot="beforeOptions" let:selection>
        <div class="p-2 border-b">
          <ToggleGroup
            bind:value={msSelectedStr}
            classes={{ options: 'justify-start h-10' }}
            rounded="full"
            inset
          >
            <ToggleOption value="any">Any</ToggleOption>
            <ToggleOption value="even">Evens</ToggleOption>
            <ToggleOption value="odds">Odds</ToggleOption>
          </ToggleGroup>
        </div>
      </svelte:fragment>
    </MultiSelect>
  </div>
</Preview>

<h2>afterOptions slot</h2>

<Preview>
  {value.length} selected
  <div class="flex flex-col max-h-[360px] overflow-auto">
    <MultiSelect
      options={msOptionsFiltered}
      {value}
      on:change={(e) => (value = e.detail.value)}
      search
    >
      <svelte:fragment slot="afterOptions" let:selection>
        <div class="p-2 border-t">
          <ToggleGroup
            bind:value={msSelectedStr}
            classes={{ options: 'justify-start h-10' }}
            rounded="full"
            inset
          >
            <ToggleOption value="any">Any</ToggleOption>
            <ToggleOption value="even">Evens</ToggleOption>
            <ToggleOption value="odds">Odds</ToggleOption>
          </ToggleGroup>
        </div>
      </svelte:fragment>
    </MultiSelect>
  </div>
</Preview>

<h2>option slot with MultiSelectOption custom actions</h2>

<Preview>
  {value.length} selected
  <div class="flex flex-col max-h-[360px] overflow-auto">
    <MultiSelect {options} {value} on:change={(e) => (value = e.detail.value)} search>
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
          aria-selected={checked}
          on:click={onChange}
        >
          <Icon data={checked ? mdiCheck : ''} />
          <div>{label}</div>
        </button>
      </svelte:fragment>
    </MultiSelect>
  </div>
</Preview>

<h2>option slot with custom search</h2>

<Preview>
  <div class="mb-4 text-surface-content text-sm">
    Options can be searched by their values ({options.map((o) => o.value).join(', ')})
  </div>
  {value.length} selected
  <MultiSelect
    {options}
    {value}
    on:change={(e) => (value = e.detail.value)}
    search={async (text, options) => {
      text = text?.trim();
      if (!text || options.length === 0) {
        return options;
      } else {
        const words = text?.toLowerCase().split(' ') ?? [];
        return options.filter((option) => {
          const searchableText = [option.label, option.value].join(' ').toLowerCase();
          return words.every((word) => searchableText.includes(word));
        });
      }
    }}
  >
    <MultiSelectOption
      slot="option"
      let:label
      let:value
      let:checked
      let:indeterminate
      let:disabled
      let:onChange
      {checked}
      {indeterminate}
      {disabled}
      on:change={onChange}
      classes={{
        container: 'flex items-center gap-1',
      }}
    >
      <span
        class="grid place-items-center size-6 text-xs rounded-full bg-surface-content/15 text-surface-content/75"
      >
        {value}
      </span>
      {label}
    </MultiSelectOption>
  </MultiSelect>
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
