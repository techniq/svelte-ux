<script lang="ts" generics="TValue">
  import { type ComponentProps, createEventDispatcher } from 'svelte';
  import { flip } from 'svelte/animate';
  import { partition } from 'lodash-es';

  import { mdiMagnify } from '@mdi/js';

  import { dirtyStore, selectionStore, uniqueStore } from '@layerstack/svelte-stores';
  import { cls } from '@layerstack/tailwind';

  import Button from './Button.svelte';
  import InfiniteScroll from './InfiniteScroll.svelte';
  import MultiSelectOption from './MultiSelectOption.svelte';
  import TextField from './TextField.svelte';

  import type { MenuOption } from '../types/index.js';
  import { getComponentClasses } from './theme.js';

  export let options: MenuOption<TValue>[];
  export let value: TValue[] = [];
  export let indeterminateSelected: typeof value = [];
  export let duration = 200;
  export let inlineSearch = false;
  export let autoFocusSearch = false;
  export let placeholder = 'Search items';
  export let optionProps: Partial<ComponentProps<MultiSelectOption>> | undefined = undefined;

  /** Wrap options in `InfiniteScroll` to amortize rendering of a large number of options */
  export let infiniteScroll = false;

  /** Maximum number of options that can be selected  */
  export let max: number | undefined = undefined;

  /** When enabled, will not separate selected from unselected options */
  export let maintainOrder = false;

  /** Determine if changes should be applied immediately or via actions */
  export let mode: 'actions' | 'immediate' = 'actions';

  export let cancelButtonProps: ComponentProps<Button> | undefined = undefined;
  export let applyButtonProps: ComponentProps<Button> | undefined = undefined;

  export let classes: {
    root?: string;
    search?: string;
    options?: string;
    actions?: string;
  } = {};
  const settingsClasses = getComponentClasses('MultiSelect');

  const dispatch = createEventDispatcher<{
    change: {
      value: typeof value;
      selection: typeof $selection;
      indeterminate: typeof $indeterminateStore;
      original: { selected: MenuOption<TValue>[]; unselected: MenuOption<TValue>[] };
    };
    cancel: null;
  }>();

  export let onApply = async (ctx: {
    value: typeof value;
    selection: typeof $selection;
    indeterminate: typeof $indeterminateStore;
    original: { selected: MenuOption<TValue>[]; unselected: MenuOption<TValue>[] };
  }) => {
    // no-op by default
  };

  async function applyChange() {
    applying = true;
    const changeContext = {
      value: $selection.selected as TValue[],
      selection: $selection,
      indeterminate: $indeterminateStore,
      original: { selected: selectedOptions, unselected: unselectedOptions },
    };
    await onApply(changeContext);
    applying = false;
    onChange();
  }

  $: if (mode === 'immediate' && $selection) {
    applyChange();
  }

  export let searchText = '';
  let applying = false;

  // Partition options based on if they initially selected, which will be displayed at the top
  $: [selectedOptions, unselectedOptions] = partition(options, (x) => value.includes(x.value));

  // Filter by search text
  function applyFilter(option: MenuOption<TValue>, searchText: string) {
    if (searchText) {
      return option.label.toLowerCase().includes(searchText.toLowerCase());
    } else {
      // show all if no search set
      return true;
    }
  }
  $: filteredOptions = options.filter((x) => applyFilter(x, searchText));
  $: filteredSelectedOptions = selectedOptions.filter((x) => applyFilter(x, searchText));
  $: filteredUnselectedOptions = unselectedOptions.filter((x) => applyFilter(x, searchText));

  $: selection = selectionStore({
    initial: selectedOptions.map((x) => x.value),
    max,
  });

  $: isSelectionDirty = dirtyStore(selection);
  $: indeterminateStore = uniqueStore(indeterminateSelected);

  function onChange() {
    const changeContext = {
      value: $selection.selected as TValue[],
      selection: $selection,
      indeterminate: $indeterminateStore,
      original: { selected: selectedOptions, unselected: unselectedOptions },
    };
    dispatch('change', changeContext);
    searchText = '';
    // Store will be recreated when `selectedOptions` is updated, but just in case
    // `setTimeout` is used to delay the disabling the Apply button 1 event loop, otherwise if `type="submit" will not react the `<form on:submit>` - https://svelte.dev/repl/0875574693e14fa9a4348075b1788d0a?version=3.58.0
    setTimeout(() => {
      isSelectionDirty.reset();
    });
  }

  export function clear() {
    $selection.clear();
    onChange();
  }
</script>

{#if inlineSearch}
  <div
    class={cls(
      'search',
      'border-b border-surface-content/10 pb-2',
      settingsClasses.search,
      classes.search
    )}
  >
    <TextField
      {placeholder}
      iconRight={mdiMagnify}
      bind:value={searchText}
      autofocus={{ delay: 100, disabled: !autoFocusSearch }}
    />
  </div>
{/if}

<div
  class={cls(
    'options',
    'overflow-auto py-1',
    settingsClasses.options,
    classes.options,
    settingsClasses.root,
    classes.root,
    $$restProps.class
  )}
  role="listbox"
  aria-multiselectable="true"
>
  <slot name="beforeOptions" selection={$selection} />

  <!-- all options or initially selected options based on `maintainOrder` -->
  <InfiniteScroll
    items={maintainOrder ? filteredOptions : filteredSelectedOptions}
    disabled={!infiniteScroll}
    let:visibleItems
  >
    {#each visibleItems as option (option.value)}
      {@const label = option.label}
      {@const value = option.value}
      {@const checked = $selection.isSelected(value)}
      {@const indeterminate = $indeterminateStore.has(value)}
      {@const disabled = $selection.isDisabled(value)}
      {@const onChange = () => {
        // TODO: Try to figure out how to keep underling Checkbox controlled so state goes `indeterminate` => `checked` => `unchecked`
        // If partial/indeterminate, transition to fully selected, then deselect/select as usual
        // if ($indeterminateStore.has(value)) {
        //   indeterminateStore.delete(value);
        // } else {
        //   $selection.toggleSelected(value);
        // }

        // Clear indeterminate status and toggle `unchecked` (and will proceed to toggle `checked` => `unchecked` => etc)
        indeterminateStore.delete(value);
        $selection.toggleSelected(value);
      }}
      <div animate:flip={{ duration }}>
        <slot
          name="option"
          {option}
          {label}
          {value}
          {checked}
          {indeterminate}
          {disabled}
          {onChange}
        >
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
      </div>
    {:else}
      {#if maintainOrder && !filteredOptions.length}
        <div class="text-surface-content/50 text-xs py-2 px-4 mb-1">
          There are no matching items.
        </div>
      {/if}
    {/each}
  </InfiniteScroll>

  {#if !maintainOrder}
    {#if filteredSelectedOptions.length && filteredUnselectedOptions.length}
      <!-- separator between selected and deselected -->
      <div class="border-b my-1 border-surface-content/10"></div>
    {/if}

    <!-- initially unselected options -->
    <InfiniteScroll items={filteredUnselectedOptions} disabled={!infiniteScroll} let:visibleItems>
      {#each visibleItems as option (option.value)}
        {@const label = option.label}
        {@const value = option.value}
        {@const checked = $selection.isSelected(value)}
        {@const indeterminate = $indeterminateStore.has(value)}
        {@const disabled = $selection.isDisabled(value)}
        {@const onChange = () => {
          // TODO: Try to figure out how to keep underling Checkbox controlled so state goes `indeterminate` => `checked` => `unchecked`
          // If partial/indeterminate, transition to fully selected, then deselect/select as usual
          // if ($indeterminateStore.has(value)) {
          //   indeterminateStore.delete(value);
          // } else {
          //   $selection.toggleSelected(value);
          // }

          // Clear indeterminate status and toggle `unchecked` (and will proceed to toggle `checked` => `unchecked` => etc)
          indeterminateStore.delete(value);
          $selection.toggleSelected(value);
        }}
        <div animate:flip={{ duration }}>
          <slot
            name="option"
            {option}
            {label}
            {value}
            {checked}
            {indeterminate}
            {disabled}
            {onChange}
          >
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
        </div>
      {:else}
        {#if !filteredSelectedOptions.length}
          <div class="text-surface-content/50 text-xs py-2 px-4 mb-1">
            There are no matching items.
          </div>
        {/if}
      {/each}
    </InfiniteScroll>
  {/if}

  <slot name="afterOptions" selection={$selection} />
</div>

<div
  class={cls(
    'actions',
    'flex items-center justify-end',
    '[&:not(:has(>:first-child))]:hidden border-t border-surface-content/10 pt-2',
    settingsClasses.actions,
    classes.actions
  )}
>
  <slot name="actions" selection={$selection} {searchText} />

  {#if mode === 'actions'}
    <div>
      <Button
        class="px-6"
        disabled={applying}
        on:click={() => {
          $selection.reset();
          dispatch('cancel');
        }}
        {...cancelButtonProps}
      >
        Cancel
      </Button>

      <Button
        variant="fill"
        color="primary"
        class="px-6"
        loading={applying}
        disabled={!$isSelectionDirty || applying}
        on:click={() => applyChange()}
        {...applyButtonProps}
      >
        Apply
      </Button>
    </div>
  {/if}
</div>
