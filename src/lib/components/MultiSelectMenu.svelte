<script lang="ts">
  import type { Placement } from '@floating-ui/dom';

  import Menu from './Menu.svelte';

  import { cls } from '$lib/utils/styles';
  import MultiSelect from './MultiSelect.svelte';

  type Option = $$Generic;

  export let options: Option[];
  export let value: string[] = [];
  export let indeterminateSelected: string[] = [];
  export let open = false;
  export let duration = 200;
  export let placement: Placement = 'bottom-start';
  export let inlineSearch = false;
  export let infiniteScroll = false;

  export let labelProp = 'name';
  export let valueProp = 'value';

  export let classes: {
    root?: string;
    menu?: string;
  } = {};

  export let menuItemsEl: HTMLMenuElement;
</script>

<Menu
  bind:open
  on:close
  explicitClose
  {placement}
  let:close
  {...$$restProps}
  classes={{
    root: cls(classes.root, $$restProps.class),
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
    {infiniteScroll}
    {labelProp}
    {valueProp}
    on:cancel={() => close()}
    on:cancel
    on:change={() => close()}
    on:change
  >
    <slot name="actions" slot="actions" />
  </MultiSelect>
</Menu>
