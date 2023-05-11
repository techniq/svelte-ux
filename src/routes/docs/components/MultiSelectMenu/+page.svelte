<script>
  import { mdiPlus } from '@mdi/js';

  import api from '$lib/components/MultiSelectMenu.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Button from '$lib/components/Button.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import MultiSelectMenu from '$lib/components/MultiSelectMenu.svelte';
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
  <span>
    <ToggleButton let:on={open} let:toggleOff transition={false}>
      {value.length} selected
      <MultiSelectMenu
        {options}
        {value}
        on:change={(e) => (value = e.detail.value)}
        {open}
        on:close={toggleOff}
      />
    </ToggleButton>
  </span>
</Preview>

<h2>inlineSearch</h2>

<Preview>
  <span>
    <ToggleButton let:on={open} let:toggleOff transition={false}>
      {value.length} selected
      <MultiSelectMenu
        {options}
        {value}
        on:change={(e) => (value = e.detail.value)}
        {open}
        on:close={toggleOff}
        inlineSearch
        placeholder="Pick a number"
      />
    </ToggleButton>
  </span>
</Preview>

<h2>many options</h2>

<Preview>
  <span>
    <ToggleButton let:on={open} let:toggleOff transition={false}>
      {value.length} selected
      <MultiSelectMenu
        options={manyOptions}
        {value}
        on:change={(e) => (value = e.detail.value)}
        {open}
        on:close={toggleOff}
        classes={{ menu: 'max-h-[360px] w-[360px]' }}
      />
    </ToggleButton>
  </span>
</Preview>

<h2>many options w/ inlineSearch</h2>

<Preview>
  <span>
    <ToggleButton let:on={open} let:toggleOff transition={false}>
      {value.length} selected
      <MultiSelectMenu
        options={manyOptions}
        {value}
        on:change={(e) => (value = e.detail.value)}
        {open}
        on:close={toggleOff}
        classes={{ menu: 'max-h-[360px] w-[360px]' }}
        inlineSearch
      />
    </ToggleButton>
  </span>
</Preview>

<h2>many options w/ infiniteScroll</h2>

<Preview>
  <span>
    <ToggleButton let:on={open} let:toggleOff transition={false}>
      {value.length} selected
      <MultiSelectMenu
        options={manyOptions}
        {value}
        on:change={(e) => (value = e.detail.value)}
        {open}
        on:close={toggleOff}
        classes={{ menu: 'max-h-[360px] w-[360px]' }}
        inlineSearch
        infiniteScroll
      />
    </ToggleButton>
  </span>
</Preview>

<h2>actions slot</h2>

<Preview>
  <span>
    <ToggleButton let:on={open} let:toggleOff transition={false}>
      {value.length} selected
      <MultiSelectMenu
        {options}
        {value}
        on:change={(e) => (value = e.detail.value)}
        {open}
        on:close={toggleOff}
        classes={{ menu: 'w-[360px]' }}
        inlineSearch
      >
        <div slot="actions">
          <Button color="accent" icon={mdiPlus}>Add item</Button>
        </div>
      </MultiSelectMenu>
    </ToggleButton>
  </span>
</Preview>

<h2>option slot</h2>

<Preview>
  <span>
    <ToggleButton let:on={open} let:toggleOff transition={false}>
      {value.length} selected
      <MultiSelectMenu
        {options}
        {value}
        on:change={(e) => (value = e.detail.value)}
        {open}
        on:close={toggleOff}
        classes={{ menu: 'w-[360px]' }}
        inlineSearch
      >
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
          classes={{
            root: 'py-1',
          }}
        >
          <span class="uppercase text-red-500">{label}</span>
        </MultiSelectOption>
      </MultiSelectMenu>
    </ToggleButton>
  </span>
</Preview>

<h1>API</h1>

<ApiDocs {api} />
