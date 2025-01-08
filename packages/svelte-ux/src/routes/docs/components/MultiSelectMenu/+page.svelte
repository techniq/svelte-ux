<script lang="ts">
  import { mdiPlus } from '@mdi/js';

  import { Button, MultiSelectMenu, MultiSelectOption, ToggleButton } from 'svelte-ux';
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
  <span>
    <ToggleButton transition={false}>
      {#snippet children({ on: open, toggleOff })}
        {value.length} selected
        <MultiSelectMenu
          {options}
          {value}
          onChange={({ value: _value }) => {
            value = _value;
          }}
          {open}
          onClose={toggleOff}
        />
      {/snippet}
    </ToggleButton>
  </span>
</Preview>

<h2>options variants</h2>

<Preview>
  <div class="inline-grid gap-3">
    <ToggleButton transition={false}>
      {#snippet children({ on: open, toggleOff })}
        {value.length} selected
        <MultiSelectMenu
          {options}
          {value}
          optionProps={{ variant: 'checkbox' }}
          onChange={({ value: _value }) => {
            value = _value;
          }}
          {open}
          onClose={toggleOff}
        />
      {/snippet}
    </ToggleButton>

    <ToggleButton transition={false}>
      {#snippet children({ on: open, toggleOff })}
        {value.length} selected
        <MultiSelectMenu
          {options}
          {value}
          optionProps={{ variant: 'checkmark' }}
          onChange={({ value: _value }) => {
            value = _value;
          }}
          {open}
          onClose={toggleOff}
        />
      {/snippet}
    </ToggleButton>

    <ToggleButton transition={false}>
      {#snippet children({ on: open, toggleOff })}
        {value.length} selected
        <MultiSelectMenu
          {options}
          {value}
          optionProps={{ variant: 'fill' }}
          onChange={({ value: _value }) => {
            value = _value;
          }}
          {open}
          onClose={toggleOff}
        />
      {/snippet}
    </ToggleButton>
  </div>
</Preview>

<h2>inlineSearch</h2>

<Preview>
  <span>
    <ToggleButton transition={false}>
      {#snippet children({ on: open, toggleOff })}
        {value.length} selected
        <MultiSelectMenu
          {options}
          {value}
          onChange={({ value: _value }) => {
            value = _value;
          }}
          {open}
          onClose={toggleOff}
          inlineSearch
          placeholder="Pick a number"
        />
      {/snippet}
    </ToggleButton>
  </span>
</Preview>

<h2>maintainOrder</h2>

<Preview>
  <span>
    <ToggleButton transition={false}>
      {#snippet children({ on: open, toggleOff })}
        {value.length} selected
        <MultiSelectMenu
          {options}
          {value}
          onChange={({ value: _value }) => {
            value = _value;
          }}
          {open}
          onClose={toggleOff}
          maintainOrder
          placeholder="Pick a number"
        />
      {/snippet}
    </ToggleButton>
  </span>
</Preview>

<h2>maintainOrder w/ inlineSearch</h2>

<Preview>
  <span>
    <ToggleButton transition={false}>
      {#snippet children({ on: open, toggleOff })}
        {value.length} selected
        <MultiSelectMenu
          {options}
          {value}
          onChange={({ value: _value }) => {
            value = _value;
          }}
          {open}
          onClose={toggleOff}
          inlineSearch
          maintainOrder
          placeholder="Pick a number"
        />
      {/snippet}
    </ToggleButton>
  </span>
</Preview>

<h2>many options</h2>

<Preview>
  <span>
    <ToggleButton transition={false}>
      {#snippet children({ on: open, toggleOff })}
        {value.length} selected
        <MultiSelectMenu
          options={manyOptions}
          {value}
          onChange={({ value: _value }) => {
            value = _value;
          }}
          {open}
          onClose={toggleOff}
          classes={{ menu: 'max-h-[360px] w-[360px]' }}
        />
      {/snippet}
    </ToggleButton>
  </span>
</Preview>

<h2>many options w/ inlineSearch</h2>

<Preview>
  <span>
    <ToggleButton transition={false}>
      {#snippet children({ on: open, toggleOff })}
        {value.length} selected
        <MultiSelectMenu
          options={manyOptions}
          {value}
          onChange={({ value: _value }) => {
            value = _value;
          }}
          {open}
          onClose={toggleOff}
          classes={{ menu: 'max-h-[360px] w-[360px]' }}
          inlineSearch
        />
      {/snippet}
    </ToggleButton>
  </span>
</Preview>

<h2>many options w/ infiniteScroll</h2>

<Preview>
  <span>
    <ToggleButton transition={false}>
      {#snippet children({ on: open, toggleOff })}
        {value.length} selected
        <MultiSelectMenu
          options={manyOptions}
          {value}
          onChange={({ value: _value }) => {
            value = _value;
          }}
          {open}
          onClose={toggleOff}
          classes={{ menu: 'max-h-[360px] w-[360px]' }}
          inlineSearch
          infiniteScroll
        />
      {/snippet}
    </ToggleButton>
  </span>
</Preview>

<h2>Immediately apply changes (no actions) w/ maintainOrder</h2>
<Preview>
  <span>
    <ToggleButton transition={false}>
      {#snippet children({ on: open, toggleOff })}
        {value.length} selected
        <MultiSelectMenu
          {options}
          {value}
          mode="immediate"
          maintainOrder
          onChange={({ value: _value }) => {
            value = _value;
          }}
          {open}
          onClose={toggleOff}
        />
      {/snippet}
    </ToggleButton>
  </span>
</Preview>

<h2>Immediately apply changes (with custom action) w/ maintainOrder</h2>
<Preview>
  <span>
    <ToggleButton transition={false}>
      {#snippet children({ on: open, toggleOff })}
        {value.length} selected
        <MultiSelectMenu
          {options}
          {value}
          mode="immediate"
          maintainOrder
          onChange={({ value: _value }) => {
            value = _value;
          }}
          {open}
          onClose={toggleOff}
        >
          {#snippet actions()}
            <div>
              <Button color="primary" icon={mdiPlus}>Add item</Button>
            </div>
          {/snippet}
        </MultiSelectMenu>
      {/snippet}
    </ToggleButton>
  </span>
</Preview>

<h2>actions slot</h2>

<Preview>
  <span>
    <ToggleButton transition={false}>
      {#snippet children({ on: open, toggleOff })}
        {value.length} selected
        <MultiSelectMenu
          {options}
          {value}
          onChange={({ value: _value }) => {
            value = _value;
          }}
          {open}
          onClose={toggleOff}
          classes={{ menu: 'w-[360px]' }}
          inlineSearch
        >
          {#snippet actions()}
            <div>
              <Button color="primary" icon={mdiPlus}>Add item</Button>
            </div>
          {/snippet}
        </MultiSelectMenu>
      {/snippet}
    </ToggleButton>
  </span>
</Preview>

<h2>option slot</h2>

<Preview>
  <span>
    <ToggleButton transition={false}>
      {#snippet children({ on: open, toggleOff })}
        {value.length} selected
        <MultiSelectMenu
          {options}
          {value}
          onChange={({ value: _value }) => {
            value = _value;
          }}
          {open}
          onClose={toggleOff}
          classes={{ menu: 'w-[360px]' }}
          inlineSearch
        >
          {#snippet option({ option, label, value, checked, indeterminate, onChange })}
            <MultiSelectOption
              {checked}
              {indeterminate}
              {onChange}
              classes={{
                root: 'py-1',
              }}
            >
              <span class="uppercase text-danger">{label}</span>
            </MultiSelectOption>
          {/snippet}
        </MultiSelectMenu>
      {/snippet}
    </ToggleButton>
  </span>
</Preview>
