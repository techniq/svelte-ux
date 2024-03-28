<script lang="ts">
  import { getComponentClasses } from './theme.js';

  import type { Placement } from '@floating-ui/dom';

  import Menu from './Menu.svelte';

  import { cls } from '../utils/styles.js';
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
  export let autoFocusSearch = inlineSearch;
  export let placeholder: string | undefined = undefined;
  export let infiniteScroll = false;
  export let searchText = '';
  /** Maximum number of options that can be selected  */
  export let max: number | undefined = undefined;

  export let labelProp = 'name';
  export let valueProp = 'value';

  export let classes: {
    root?: string;
    menu?: string;
  } = {};
  const settingsClasses = getComponentClasses('MultiSelectMenu');

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
    root: cls('MultiSelectMenu', settingsClasses.root, classes.root, $$restProps.class),
    menu: cls('flex flex-col p-2', settingsClasses.menu, classes.menu),
  }}
  bind:menuItemsEl
>
  <MultiSelect
    {options}
    {value}
    {indeterminateSelected}
    {max}
    {open}
    {duration}
    {inlineSearch}
    {autoFocusSearch}
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
    <slot name="beforeOptions" slot="beforeOptions" let:selection {selection} />
    <slot name="afterOptions" slot="afterOptions" let:selection {selection} />

    <!-- TODO: If only `<slot name="option" slot="option" />` just worked  -->
    <svelte:fragment
      slot="option"
      let:option
      let:label
      let:value
      let:checked
      let:indeterminate
      let:disabled
      let:onChange
    >
      <slot name="option" {option} {label} {value} {checked} {indeterminate} {disabled} {onChange}>
        <MultiSelectOption {checked} {indeterminate} {disabled} on:change={onChange}>
          {label}
        </MultiSelectOption>
      </slot>
    </svelte:fragment>

    <slot name="actions" slot="actions" let:selection {selection}>
      <div />
    </slot>
  </MultiSelect>
</Menu>
