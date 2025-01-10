<script lang="ts" generics="TValue">
  import type { ComponentProps, Snippet } from 'svelte';
  import type { Placement } from '@floating-ui/dom';

  import Menu from './Menu.svelte';
  import MultiSelect from './MultiSelect.svelte';
  import MultiSelectOption from './MultiSelectOption.svelte';

  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';

  type MultiSelectProps = ComponentProps<typeof MultiSelect<TValue>>;

  const settingsClasses = getComponentClasses('MultiSelectMenu');

  interface Props {
    options: MultiSelectProps['options'];
    value?: MultiSelectProps['value'];
    mode?: MultiSelectProps['mode'];
    maintainOrder?: MultiSelectProps['maintainOrder'];
    indeterminateSelected?: typeof value;
    open?: boolean;
    duration?: number;
    placement?: Placement;
    autoPlacement?: boolean;
    inlineSearch?: boolean;
    autoFocusSearch?: boolean;
    placeholder?: string;
    infiniteScroll?: boolean;
    searchText?: string;
    /** Maximum number of options that can be selected  */
    max?: number;
    optionProps?: Partial<ComponentProps<typeof MultiSelectOption>>;
    classes?: {
      root?: string;
      menu?: string;
      multiSelect?: MultiSelectProps['classes'];
    };
    menuItemsEl?: HTMLMenuElement;
    // Passthrough onApply event
    onApply?: MultiSelectProps['onApply'];
    onChange?: MultiSelectProps['onChange'];
    onCancel?: MultiSelectProps['onCancel'];
    beforeOptions?: MultiSelectProps["beforeOptions"];
    afterOptions?: MultiSelectProps["afterOptions"];
    option?: MultiSelectProps["option"];
    actions?: MultiSelectProps["actions"];
  }

  let {
    options,
    value,
    mode,
    maintainOrder,
    indeterminateSelected = [],
    open = $bindable(false),
    duration = 200,
    placement = 'bottom-start',
    autoPlacement = true,
    inlineSearch = false,
    autoFocusSearch = inlineSearch,
    placeholder,
    infiniteScroll = false,
    searchText = '',
    max,
    optionProps,
    classes = {},
    class: className,
    menuItemsEl = $bindable(),
    onApply,
    onCancel,
    onChange,
    beforeOptions: beforeOptionsRender,
    afterOptions: afterOptionsRender,
    option: optionRender,
    actions: actionsRender,
    ...restProps
  }: Props & Omit<ComponentProps<typeof Menu>, keyof Props> = $props();
</script>

<Menu
  bind:open
  explicitClose
  {placement}
  {autoPlacement}
  {...restProps}
  classes={{
    root: cls('MultiSelectMenu', settingsClasses.root, classes.root, className),
    menu: cls('flex flex-col', settingsClasses.menu, classes.menu),
  }}
  bind:menuItemsEl
>
  {#snippet children({ close })}
    <MultiSelect
      {options}
      {value}
      {mode}
      {maintainOrder}
      {indeterminateSelected}
      {max}
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
      onCancel={() => {
        mode !== 'immediate' && close();
        onCancel?.();
      }}
      onChange={(value) => {
        mode !== 'immediate' && close();
        onChange?.(value);
      }}
    >
      {#snippet beforeOptions({ selection })}
        {@render beforeOptionsRender?.({ selection })}
      {/snippet}
      {#snippet afterOptions({ selection })}
        {@render afterOptionsRender?.({ selection })}
      {/snippet}

      {#snippet option({ option, label, value, checked, indeterminate, disabled, onChange })}
        {#if optionRender}
          {@render optionRender({
            option,
            label,
            value,
            checked,
            indeterminate,
            disabled,
            onChange,
          })}
        {:else}
          <MultiSelectOption {checked} {indeterminate} {disabled} {...optionProps} {onChange}>
            {label}
          </MultiSelectOption>
        {/if}
      {/snippet}

      {#snippet actions({ selection, searchText })}
        {@render actionsRender?.({ selection, searchText })}
      {/snippet}
    </MultiSelect>
  {/snippet}
</Menu>
