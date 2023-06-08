<script lang="ts">
  import type { Placement } from '@floating-ui/dom';

  import Menu from './Menu.svelte';

  import { cls } from '$lib/utils/styles';
  import MultiSelect from './MultiSelect.svelte';
  import MultiSelectOption from './MultiSelectOption.svelte';

  type Option = $$Generic;

  export let options: Option[];
  export let value: string[] = [];
  export let indeterminateSelected: string[] = [];
  export let open = false;
  export let duration = 200;
  export let placement: Placement = 'bottom-start';
  export let autoPlacement = true;
  export let inlineSearch = false;
  export let placeholder: string | undefined = undefined;
  export let infiniteScroll = false;
  export let searchText = '';

  export let labelProp = 'name';
  export let valueProp = 'value';

  export let classes: {
    root?: string;
    menu?: string;
  } = {};

  export let menuItemsEl: HTMLMenuElement | undefined = undefined;
</script>

<Menu
  bind:open
  on:close
  explicitClose
  {placement}
  {autoPlacement}
  let:close
  {...$$restProps}
  classes={{
    root: cls('MultiSelectMenu', classes.root, $$restProps.class),
    menu: cls('flex flex-col', classes.menu),
  }}
  bind:menuItemsEl
>
  <MultiSelect
    {options}
    {value}
    {indeterminateSelected}
    {open}
    {duration}
    {inlineSearch}
    {placeholder}
    {infiniteScroll}
    {labelProp}
    {valueProp}
    {searchText}
    on:cancel={() => close()}
    on:cancel
    on:change={() => close()}
    on:change
  >
    <!-- TODO: If only `<slot name="option" slot="option" />` just worked  -->
    <svelte:fragment
      slot="option"
      let:option
      let:label
      let:value
      let:checked
      let:indeterminate
      let:onChange
    >
      <slot name="option" {option} {label} {value} {checked} {indeterminate} {onChange}>
        <MultiSelectOption {checked} {indeterminate} on:change={onChange}>
          {label}
        </MultiSelectOption>
      </slot>
    </svelte:fragment>

    <slot name="actions" slot="actions" />
  </MultiSelect>
</Menu>
