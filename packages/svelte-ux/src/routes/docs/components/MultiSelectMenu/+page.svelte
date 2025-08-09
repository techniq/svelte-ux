<script lang="ts">
  import {
    Button,
    MultiSelectMenu,
    MultiSelectOption,
    ToggleButton,
    ToggleGroup,
    ToggleOption,
    getSettings,
  } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';

  const { icons } = getSettings();

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
  let msmSelectedStr: 'any' | 'even' | 'odds' = 'any';
  $: msmOptionsFiltered =
    msmSelectedStr === 'even'
      ? options.filter((o) => typeof o.value === 'number' && o.value % 2 === 0)
      : msmSelectedStr === 'odds'
        ? options.filter((o) => typeof o.value === 'number' && o.value % 2 !== 0)
        : options;
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
        on:change={(e) => {
          // @ts-expect-error
          value = e.detail.value;
        }}
        {open}
        on:close={toggleOff}
      />
    </ToggleButton>
  </span>
</Preview>

<h2>options variants</h2>

<Preview>
  <div class="inline-grid gap-3">
    <ToggleButton let:on={open} let:toggleOff transition={false}>
      {value.length} selected
      <MultiSelectMenu
        {options}
        {value}
        optionProps={{ variant: 'checkbox' }}
        on:change={(e) => {
          // @ts-expect-error
          value = e.detail.value;
        }}
        {open}
        on:close={toggleOff}
      />
    </ToggleButton>

    <ToggleButton let:on={open} let:toggleOff transition={false}>
      {value.length} selected
      <MultiSelectMenu
        {options}
        {value}
        optionProps={{ variant: 'checkmark' }}
        on:change={(e) => {
          // @ts-expect-error
          value = e.detail.value;
        }}
        {open}
        on:close={toggleOff}
      />
    </ToggleButton>

    <ToggleButton let:on={open} let:toggleOff transition={false}>
      {value.length} selected
      <MultiSelectMenu
        {options}
        {value}
        optionProps={{ variant: 'fill' }}
        on:change={(e) => {
          // @ts-expect-error
          value = e.detail.value;
        }}
        {open}
        on:close={toggleOff}
      />
    </ToggleButton>
  </div>
</Preview>
<h2>search</h2>

<Preview>
  <span>
    <ToggleButton let:on={open} let:toggleOff transition={false}>
      {value.length} selected
      <MultiSelectMenu
        {options}
        {value}
        on:change={(e) => {
          // @ts-expect-error
          value = e.detail.value;
        }}
        {open}
        on:close={toggleOff}
        search
        placeholder="Pick a number"
      />
    </ToggleButton>
  </span>
</Preview>

<h2>maintainOrder</h2>

<Preview>
  <span>
    <ToggleButton let:on={open} let:toggleOff transition={false}>
      {value.length} selected
      <MultiSelectMenu
        {options}
        {value}
        on:change={(e) => {
          // @ts-expect-error
          value = e.detail.value;
        }}
        {open}
        on:close={toggleOff}
        maintainOrder
        placeholder="Pick a number"
      />
    </ToggleButton>
  </span>
</Preview>

<h2>maintainOrder w/ search</h2>

<Preview>
  <span>
    <ToggleButton let:on={open} let:toggleOff transition={false}>
      {value.length} selected
      <MultiSelectMenu
        {options}
        {value}
        on:change={(e) => {
          // @ts-expect-error
          value = e.detail.value;
        }}
        {open}
        on:close={toggleOff}
        search
        maintainOrder
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
        on:change={(e) => {
          // @ts-expect-error
          value = e.detail.value;
        }}
        {open}
        on:close={toggleOff}
        classes={{ menu: 'max-h-[360px] w-[360px]' }}
      />
    </ToggleButton>
  </span>
</Preview>

<h2>many options w/ search</h2>

<Preview>
  <span>
    <ToggleButton let:on={open} let:toggleOff transition={false}>
      {value.length} selected
      <MultiSelectMenu
        options={manyOptions}
        {value}
        on:change={(e) => {
          // @ts-expect-error
          value = e.detail.value;
        }}
        {open}
        on:close={toggleOff}
        classes={{ menu: 'max-h-[360px] w-[360px]' }}
        search
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
        on:change={(e) => {
          // @ts-expect-error
          value = e.detail.value;
        }}
        {open}
        on:close={toggleOff}
        classes={{ menu: 'max-h-[360px] w-[360px]' }}
        search
        infiniteScroll
      />
    </ToggleButton>
  </span>
</Preview>

<h2>Immediately apply changes (no actions) w/ maintainOrder</h2>
<Preview>
  <span>
    <ToggleButton let:on={open} let:toggleOff transition={false}>
      {value.length} selected
      <MultiSelectMenu
        {options}
        {value}
        mode="immediate"
        maintainOrder
        on:change={(e) => {
          // @ts-expect-error
          value = e.detail.value;
        }}
        {open}
        on:close={toggleOff}
      />
    </ToggleButton>
  </span>
</Preview>

<h2>Immediately apply changes (with custom action) w/ maintainOrder</h2>
<Preview>
  <span>
    <ToggleButton let:on={open} let:toggleOff transition={false}>
      {value.length} selected
      <MultiSelectMenu
        {options}
        {value}
        mode="immediate"
        maintainOrder
        on:change={(e) => {
          // @ts-expect-error
          value = e.detail.value;
        }}
        {open}
        on:close={toggleOff}
      >
        <div slot="actions">
          <Button color="primary" icon={icons.plus}>Add item</Button>
        </div>
      </MultiSelectMenu>
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
        on:change={(e) => {
          // @ts-expect-error
          value = e.detail.value;
        }}
        {open}
        on:close={toggleOff}
        classes={{ menu: 'w-[360px]' }}
        search
      >
        <div slot="actions">
          <Button color="primary" icon={icons.plus}>Add item</Button>
        </div>
      </MultiSelectMenu>
    </ToggleButton>
  </span>
</Preview>

<h2>beforeOptions slot</h2>

<Preview>
  <span>
    <ToggleButton let:on={open} let:toggleOff transition={false}>
      {value.length} selected
      <MultiSelectMenu
        options={msmOptionsFiltered}
        {value}
        on:change={(e) => {
          // @ts-expect-error
          value = e.detail.value;
        }}
        {open}
        on:close={toggleOff}
        classes={{ menu: 'w-[360px]' }}
        search
      >
        <svelte:fragment slot="beforeOptions">
          <div class="p-2 border-b">
            <ToggleGroup
              bind:value={msmSelectedStr}
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
      </MultiSelectMenu>
    </ToggleButton>
  </span>
</Preview>

<h2>afterOptions slot</h2>

<Preview>
  <span>
    <ToggleButton let:on={open} let:toggleOff transition={false}>
      {value.length} selected
      <MultiSelectMenu
        options={msmOptionsFiltered}
        {value}
        on:change={(e) => {
          // @ts-expect-error
          value = e.detail.value;
        }}
        {open}
        on:close={toggleOff}
        classes={{ menu: 'w-[360px]' }}
        search
      >
        <svelte:fragment slot="afterOptions">
          <div class="p-2 border-t">
            <ToggleGroup
              bind:value={msmSelectedStr}
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
        on:change={(e) => {
          // @ts-expect-error
          value = e.detail.value;
        }}
        {open}
        on:close={toggleOff}
        classes={{ menu: 'w-[360px]' }}
        search
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
          <span class="uppercase text-danger">{label}</span>
        </MultiSelectOption>
      </MultiSelectMenu>
    </ToggleButton>
  </span>
</Preview>

<h2>option slot with custom search</h2>

<Preview>
  <div class="mb-4 text-surface-content text-sm">
    Options can be searched by their values ({options.map((o) => o.value).join(', ')})
  </div>
  <span>
    <ToggleButton let:on={open} let:toggleOff transition={false}>
      {value.length} selected
      <MultiSelectMenu
        {options}
        {value}
        on:change={(e) => {
          // @ts-expect-error
          value = e.detail.value;
        }}
        {open}
        on:close={toggleOff}
        classes={{ menu: 'w-[360px]' }}
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
      </MultiSelectMenu>
    </ToggleButton>
  </span>
</Preview>
