<script lang="ts" generics="TValue">
  import type { ComponentProps } from 'svelte';
  import type { Placement } from '@floating-ui/dom';

  import Menu from './Menu.svelte';
  import MultiSelect from './MultiSelect.svelte';
  import MultiSelectOption from './MultiSelectOption.svelte';

  import { cls } from '@layerstack/tailwind';
  import { getComponentClasses } from './theme.js';

  type MultiSelectProps = ComponentProps<MultiSelect<TValue>>;

  export let options: MultiSelectProps['options'];
  export let value: MultiSelectProps['value'];
  export let mode: MultiSelectProps['mode'] | undefined = undefined;
  export let maintainOrder: MultiSelectProps['maintainOrder'] | undefined = undefined;
  export let indeterminateSelected: typeof value = [];
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
  export let optionProps: Partial<ComponentProps<MultiSelectOption>> | undefined = undefined;

  export let classes: {
    root?: string;
    menu?: string;
    multiSelect?: MultiSelectProps['classes'];
  } = {};
  const settingsClasses = getComponentClasses('MultiSelectMenu');

  export let menuItemsEl: HTMLMenuElement | undefined = undefined;

  // Passthrough onApply event
  export let onApply: MultiSelectProps['onApply'] | undefined = undefined;
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
    menu: cls('flex flex-col', settingsClasses.menu, classes.menu),
  }}
  bind:menuItemsEl
>
  <MultiSelect
    {options}
    {value}
    {mode}
    {maintainOrder}
    {indeterminateSelected}
    {max}
    {open}
    {duration}
    {inlineSearch}
    {autoFocusSearch}
    {placeholder}
    {infiniteScroll}
    {searchText}
    {onApply}
    classes={{
      search: 'p-2',
      options: 'px-2',
      actions: 'p-2',
      ...settingsClasses.multiSelect,
      ...classes.multiSelect,
    }}
    on:cancel={() => mode !== 'immediate' && close()}
    on:cancel
    on:change={() => mode !== 'immediate' && close()}
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
        <MultiSelectOption
          {checked}
          {indeterminate}
          {disabled}
          {...optionProps}
          on:change={onChange}
        >
          {label}
        </MultiSelectOption>
      </slot>
    </svelte:fragment>

    <slot name="actions" slot="actions" let:selection {selection} />
  </MultiSelect>
</Menu>
