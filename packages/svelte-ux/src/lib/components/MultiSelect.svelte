<script lang="ts" generics="TValue">
  import { getComponentClasses } from './theme.js';

  import { type ComponentProps, type Snippet } from 'svelte';
  import { flip } from 'svelte/animate';
  import { get } from 'svelte/store';
  import { partition, isEqual } from 'lodash-es';

  import { mdiMagnify } from '@mdi/js';

  import Button from './Button.svelte';
  import InfiniteScroll from './InfiniteScroll.svelte';
  import MultiSelectOption from './MultiSelectOption.svelte';
  import TextField from './TextField.svelte';

  import type { MenuOption } from '../types/index.js';
  import dirtyStore from '../stores/dirtyStore.js';
  import selectionStore from '../stores/selectionStore.js';
  import uniqueStore from '../stores/uniqueStore.js';
  import { cls } from '../utils/styles.js';
  import changeStore from '../stores/changeStore.js';

  const settingsClasses = getComponentClasses('MultiSelect');

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

  interface Props {
    options: MenuOption<TValue>[];
    value?: TValue[];
    indeterminateSelected?: typeof value;
    duration?: number;
    inlineSearch?: boolean;
    autoFocusSearch?: boolean;
    placeholder?: string;
    optionProps?: Partial<ComponentProps<typeof MultiSelectOption>>;
    /** Wrap options in `InfiniteScroll` to amortize rendering of a large number of options */
    infiniteScroll?: boolean;
    /** Maximum number of options that can be selected  */
    max?: number;
    /** When enabled, will not separate selected from unselected options */
    maintainOrder?: boolean;
    /** Determine if changes should be applied immediately or via actions */
    mode?: 'actions' | 'immediate';
    cancelButtonProps?: ComponentProps<typeof Button>;
    applyButtonProps?: ComponentProps<typeof Button>;
    classes?: {
      root?: string;
      search?: string;
      options?: string;
      actions?: string;
    };
    class?: string;
    onApply?: any;
    searchText?: string;
    onCancel?: () => void;
    onChange?: ({
      value,
      selection,
      indeterminate,
      original,
    }: {
      value: TValue[];
      selection: typeof $selection;
      indeterminate: typeof $indeterminateStore;
      original: { selected: MenuOption<TValue>[]; unselected: MenuOption<TValue>[] };
    }) => void;
    beforeOptions?: Snippet<[{ selection: typeof $selection }]>;
    option?: Snippet<
      [
        {
          option: MenuOption<TValue>;
          label: string;
          value: TValue;
          checked: boolean;
          indeterminate: boolean;
          disabled: boolean;
          onChange: () => void;
        },
      ]
    >;
    afterOptions?: Snippet<[{ selection: typeof $selection }]>;
    actions?: Snippet<[{ selection: typeof $selection; searchText: string }]>;
  }

  let {
    options,
    value = [],
    indeterminateSelected = [],
    duration = 200,
    inlineSearch = false,
    autoFocusSearch = false,
    placeholder = 'Search items',
    optionProps,
    infiniteScroll = false,
    max,
    maintainOrder = false,
    mode = 'actions',
    cancelButtonProps,
    applyButtonProps,
    classes = {},
    class: className,
    onApply = async (ctx: {
      value: typeof value;
      selection: typeof $selection;
      indeterminate: typeof $indeterminateStore;
      original: { selected: MenuOption<TValue>[]; unselected: MenuOption<TValue>[] };
    }) => {
      // no-op by default
    },
    searchText = $bindable(''),
    onCancel,
    onChange: _onChange,
    beforeOptions,
    option,
    afterOptions,
    actions,
  }: Props = $props();
  let applying = $state(false);

  // Partition options based on if they initially selected, which will be displayed at the top
  let [selectedOptions, unselectedOptions] = $derived(
    partition(options, (o) => value.includes(o.value))
  );

  // Filter by search text
  function applyFilter(option: MenuOption<TValue>, searchText: string) {
    if (searchText) {
      return option.label.toLowerCase().includes(searchText.toLowerCase());
    } else {
      // show all if no search set
      return true;
    }
  }
  let filteredOptions = $derived(options.filter((x) => applyFilter(x, searchText)));
  let filteredSelectedOptions = $derived(selectedOptions.filter((x) => applyFilter(x, searchText)));
  let filteredUnselectedOptions = $derived(
    unselectedOptions.filter((x) => applyFilter(x, searchText))
  );

  const selection = selectionStore({ max });
  // Only "subscribe" to value changes (not `$selection`) to fix correct `value` / topological ordering.  Should be simplified with Svelte 5
  $effect(() => {
    get(selection).setSelected(value);
  });

  // Immediately apply only if changed
  const changed = changeStore(selection);
  $effect(() => {
    if (mode === 'immediate' && !isEqual($selection.selected, $changed.previous?.selected)) {
      applyChange();
    }
  });

  let isSelectionDirty = $derived(dirtyStore(selection));
  let indeterminateStore = $derived(uniqueStore(indeterminateSelected));

  function onChange() {
    const changeContext = {
      value: $selection.selected as TValue[],
      selection: $selection,
      indeterminate: $indeterminateStore,
      original: { selected: selectedOptions, unselected: unselectedOptions },
    };
    _onChange?.(changeContext);
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
    className
  )}
  role="listbox"
  aria-multiselectable="true"
>
  {@render beforeOptions?.({ selection: $selection })}

  <!-- all options or initially selected options based on `maintainOrder` -->
  <InfiniteScroll
    items={maintainOrder ? filteredOptions : filteredSelectedOptions}
    disabled={!infiniteScroll}
  >
    {#snippet children({ visibleItems })}
      {#each visibleItems as visibleItem (visibleItem.value)}
        {@const label = visibleItem.label}
        {@const value = visibleItem.value}
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
          {#if option}
            {@render option({
              option: visibleItem,
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
        </div>
      {:else}
        {#if maintainOrder && !filteredOptions.length}
          <div class="text-surface-content/50 text-xs py-2 px-4 mb-1">
            There are no matching items.
          </div>
        {/if}
      {/each}
    {/snippet}
  </InfiniteScroll>

  {#if !maintainOrder}
    {#if filteredSelectedOptions.length && filteredUnselectedOptions.length}
      <!-- separator between selected and deselected -->
      <div class="border-b my-1 border-surface-content/10"></div>
    {/if}

    <!-- initially unselected options -->
    <InfiniteScroll items={filteredUnselectedOptions} disabled={!infiniteScroll}>
      {#snippet children({ visibleItems })}
        {#each visibleItems as visibleItem (visibleItem.value)}
          {@const label = visibleItem.label}
          {@const value = visibleItem.value}
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
            {#if option}
              {@render option({
                option: visibleItem,
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
          </div>
        {:else}
          {#if !filteredSelectedOptions.length}
            <div class="text-surface-content/50 text-xs py-2 px-4 mb-1">
              There are no matching items.
            </div>
          {/if}
        {/each}
      {/snippet}
    </InfiniteScroll>
  {/if}

  {@render afterOptions?.({ selection: $selection })}
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
  {@render actions?.({ selection: $selection, searchText })}

  {#if mode === 'actions'}
    <div>
      <Button
        class="px-6"
        disabled={applying}
        onclick={() => {
          $selection.reset();
          onCancel?.();
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
        onclick={() => applyChange()}
        {...applyButtonProps}
      >
        Apply
      </Button>
    </div>
  {/if}
</div>
