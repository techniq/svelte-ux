<script lang="ts">
  import { mdiPlus } from '@mdi/js';

  import Button from '$lib/components/Button.svelte';
  import Form from '$lib/components/Form.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import MultiSelect from '$lib/components/MultiSelect.svelte';
  import MultiSelectOption from '$lib/components/MultiSelectOption.svelte';
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
  {value.length} selected
  <MultiSelect {options} {value} on:change={(e) => (value = e.detail.value)} />
</Preview>

<h2>inlineSearch</h2>

<Preview>
  {value.length} selected
  <MultiSelect {options} {value} on:change={(e) => (value = e.detail.value)} inlineSearch />
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
          <div class="text-sm text-red-500">Maximum selection reached</div>
        {/if}
      </div>
    </MultiSelect>
  </div>
</Preview>

<h2>option slot</h2>

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
        <span class="uppercase text-red-500">{label}</span>
      </MultiSelectOption>
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
