<script>
  import { mdiMagnify, mdiPlus, mdiPencil } from '@mdi/js';

  import api from '$lib/components/MultiSelect.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Button from '$lib/components/Button.svelte';
  import Dialog from '$lib/components/Dialog.svelte';
  import Drawer from '$lib/components/Drawer.svelte';
  import Form from '$lib/components/Form.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import MenuItem from '$lib/components/MenuItem.svelte';
  import Stack from '$lib/components/Stack.svelte';
  import MultiSelect from '$lib/components/MultiSelect.svelte';
  import TextField from '$lib/components/TextField.svelte';
  import Toggle from '$lib/components/Toggle.svelte';
  import ToggleButton from '$lib/components/ToggleButton.svelte';


  import { delay } from '$lib/utils/promise';
  import { cls } from '$lib/utils/styles';

  const options = [
    { name: 'One', value: 1 },
    { name: 'Two', value: 2 },
    { name: 'Three', value: 3 },
    { name: 'Four', value: 4 },
  ];

  const manyOptions = Array.from({ length: 100 }).map((_, i) => ({ name: `${i + 1}`, value: i + 1 }))

  let value = [3];
</script>

<h1>Examples</h1>

<h2>basic</h2>

<Preview>
  {value.length} selected
  <MultiSelect
    {options}
    {value}
    on:change={(e) => value = e.detail.value}
  />
</Preview>

<h2>inlineSearch</h2>

<Preview>
  {value.length} selected
  <MultiSelect
    {options}
    {value}
    on:change={(e) => value = e.detail.value}
    inlineSearch
  />
</Preview>

<h2>many options</h2>

<Preview>
  {value.length} selected
  <div class="flex flex-col max-h-[360px] overflow-auto">
    <MultiSelect
      options={manyOptions}
      {value}
      on:change={(e) => value = e.detail.value}
    />
  </div>
</Preview>

<h2>many options w/ inlineSearch</h2>

<Preview>
  {value.length} selected
  <div class="flex flex-col max-h-[360px] overflow-auto">
    <MultiSelect
      options={manyOptions}
      {value}
      on:change={(e) => value = e.detail.value}
      classes={{ menu: 'max-h-[360px] w-[360px]' }}
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
      on:change={(e) => value = e.detail.value}
      classes={{ menu: 'max-h-[360px] w-[360px]' }}
      inlineSearch
      infiniteScroll
    />
  </div>
</Preview>

<h2>actions slot</h2>

<Preview>
  {value.length} selected
  <div class="flex flex-col max-h-[360px] overflow-auto">
    <MultiSelect
      {options}
      {value}
      on:change={(e) => value = e.detail.value}
      classes={{ menu: 'w-[360px]' }}
      inlineSearch
    >
      <div slot="actions">
        <Button color="accent" icon={mdiPlus}>Add item</Button>
      </div>
    </MultiSelect>
  </div>
</Preview>

<h2>Form integration</h2>

<Preview>
  <Form
    initial={{ value }}
    on:change={(e) => (value = e.detail.value)}
    let:draft
    let:state
  >
    {state.value.length} selected
    <MultiSelect
      {options}
      value={draft.value}
      {draft}
      on:change={(e) => draft.value = e.detail.value}
      cancelButtonProps={{ type: 'reset' }}
      applyButtonProps={{ type: 'submit' }}
    />
  </Form>
</Preview>

<h1>API</h1>

<ApiDocs {api} />
