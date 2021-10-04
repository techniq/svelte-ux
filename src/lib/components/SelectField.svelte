<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { mdiChevronDown, mdiClose } from '@mdi/js';

  import Logger from '../utils/logger';
  import { selectOnFocus } from '../actions/input';
  import { scrollIntoView } from '../actions/scroll';

  import Button from './Button.svelte';
  import CircularProgress from './CircularProgress.svelte';
  import Menu from './Menu.svelte';
  import type { PopoverOrigin, PopoverPlacement } from './Popover.svelte';
  import TextField from './TextField.svelte';

  const dispatch = createEventDispatcher<{
    change: { value: any; item: any };
    inputChange: string;
  }>();

  const logger = new Logger({ level: 'WARN' });

  export let items: any[] = [];
  export let itemText = (item: any) => (item?.name as string) ?? '';
  export let itemValue = (item: any) => item?.value ?? null;

  export let label = '';
  export let placeholder = '';
  export let loading: boolean = false;
  export let disabled: boolean = false;
  export let icon: string | null = null;
  export let base = false;
  export let rounded = false;
  export let filled = false;
  export let dense = false;

  // Menu props
  export let placement: PopoverPlacement = 'bottom';
  export let anchorOrigin: PopoverOrigin = undefined;
  export let popoverOrigin: PopoverOrigin = undefined;
  export let matchWidth: boolean = true;
  export let maxViewportHeight = true; // Makes sense for SelectField to default to true (resize instead of reposition) compared to underlying Menu/Popover
  export let disableTransition = placement.startsWith('top'); // TODO: Remove default if can be handled differently

  $: filteredItems = items ?? [];
  let searchText = '';

  export let value: any = undefined;
  let prevValue = undefined;
  export let selected = undefined;
  let prevSelected = undefined;

  $: updateSelected(selected, value, items);
  function updateSelected(selected, value, items) {
    logger.debug('updateSelected', {
      value,
      prevValue,
      selected,
      prevSelected,
      items,
      loading,
    });

    if (loading === true) {
      // wait to apply any changes (initially could be loading selected item)
    } else {
      if (selected !== undefined && itemValue(selected) !== itemValue(prevSelected)) {
        logger.info('selected changed', {
          value,
          prevValue,
          selected,
          prevSelected,
          items,
        });

        // Capture for next change
        prevValue = itemValue(selected);
        prevSelected = selectItem(selected);
      } else if (/*value !== undefined &&*/ value !== prevValue) {
        // Removed `value !== undefined` to clear searchText when value is set to undefined.  Might be a breaking change
        logger.info('value changed', {
          value,
          prevValue,
          selected,
          prevSelected,
          items,
        });

        // Capture for next change
        prevValue = value;
        prevSelected = selectValue(value);
      }
    }
  }

  export let search = async (text: string) => {
    logger.debug('search', text);

    if (text === '') {
      // Reset items
      filteredItems = items;
    } else {
      const words = text.toLowerCase().split(' ');
      filteredItems = items.filter((item) => {
        const _itemText = itemText(item).toLowerCase();
        return words.every((word) => _itemText.includes(word));
      });
    }
  };

  // UI state
  export let open = false;
  let highlightIndex = 0;

  $: if (open === false) {
    // Restore text if cleared but selection remains
    if (selected) {
      searchText = itemText(selected);
    }
  }

  // Elements
  let inputEl: HTMLInputElement | null = null;
  let menuItemsEl: HTMLDivElement;

  $: {
    search(searchText);
    highlightIndex = 0;
  }

  function onChange(e: TextField['$$events_def']['change']) {
    logger.debug('onChange');

    searchText = e.detail.inputValue as string;
    dispatch('inputChange', searchText);
    show();
  }

  function onFocus() {
    logger.debug('onFocus');

    open = true;
  }

  function onBlur(e: FocusEvent) {
    logger.debug('onBlur');

    // Hide if focus not moved to menu (item click)
    if (e.relatedTarget instanceof Node && !e.relatedTarget.contains(menuItemsEl)) {
      hide();
    }
  }

  function onKeyDown(e: KeyboardEvent) {
    logger.debug('onKeyDown', { key: e.key });

    // e.preventDefault();

    switch (e.key) {
      case 'Tab':
        if (e.shiftKey) {
          // ShiftTab
        }
        break;

      case 'ArrowDown':
        show();
        if (highlightIndex < filteredItems.length - 1) {
          highlightIndex++;
        } else {
          // wrap to top
          highlightIndex = 0;
        }
        break;

      case 'ArrowUp':
        show();
        if (highlightIndex > 0) {
          highlightIndex--;
        } else {
          // wrap to bottom
          highlightIndex = filteredItems.length - 1;
        }
        break;

      case 'Escape':
        if (open) {
          inputEl?.focus();
          hide();
        }
        break;
    }
  }

  function onKeyPress(e: KeyboardEvent) {
    logger.debug('onKeyPress');

    if (e.key === 'Enter') {
      e.preventDefault();
      selectHighlighted();
    }
  }

  function onClick() {
    logger.debug('onClick');

    show();
  }

  function show() {
    logger.debug('show');

    open = true;
    inputEl?.focus();
  }

  function hide() {
    logger.debug('hide');

    open = false;
    highlightIndex = 0;
  }

  function selectHighlighted() {
    logger.debug('selectHighlighted');

    selectIndex(highlightIndex);
  }

  /**
   * Select item by index
   */
  function selectIndex(index: number) {
    logger.debug('selectIndex', { index });

    const item = filteredItems[index];
    return selectItem(item);
  }

  /**
   * Select item by value
   */
  function selectValue(value: any) {
    logger.debug('selectValue', { value, items, filteredItems });

    const item = items?.find((item) => itemValue(item) === value);
    return selectItem(item);
  }

  /**
   * Select item by object
   */
  function selectItem(item: any) {
    logger.info('selectItem', { item });

    const previousValue = value;

    value = itemValue(item);
    selected = item;
    searchText = itemText(item);
    dispatch('change', { item, value: itemValue(item) });

    // Only hide if value changed (do not hide if opening initially and loading list)
    if (value != previousValue) {
      hide();
    }

    return item;
  }

  function clear() {
    selectItem(null);
    filteredItems = items;
    //inputEl?.focus();
  }
</script>

<div class={$$props.class} on:click={onClick}>
  <TextField
    {label}
    {placeholder}
    {base}
    {rounded}
    {filled}
    {icon}
    {dense}
    {disabled}
    bind:inputEl
    bind:value={searchText}
    on:change={onChange}
    on:focus={onFocus}
    on:blur={onBlur}
    on:keydown={onKeyDown}
    on:keypress={onKeyPress}
    actions={(node) => [selectOnFocus(node)]}
    class="h-full"
    {...$$restProps}
  >
    <span slot="append">
      {#if loading}
        <CircularProgress size={16} width={2} class="text-gray-500" />
      {/if}

      {#if value}
        <Button
          icon={mdiClose}
          class="text-black/50 p-1"
          on:click={(e) => {
            e.stopPropagation();
            clear();
          }}
        />
      {:else}
        <Button
          icon={mdiChevronDown}
          class="text-black/50 p-1 transform {open ? 'rotate-180' : ''}"
          tabindex="-1"
        />
      {/if}
    </span>
  </TextField>

  <!-- Improve initial open display, still needs work when switching from No items found (items.length === 0) -->
  {#if items?.length > 0 || loading !== true}
    <Menu
      {placement}
      {anchorOrigin}
      {popoverOrigin}
      {matchWidth}
      {maxViewportHeight}
      {disableTransition}
      bind:open
      on:close={() => (open = false)}
    >
      <div
        class="items focus:outline-none"
        class:opacity-50={loading}
        bind:this={menuItemsEl}
        on:click|stopPropagation={(e) => {
          if (e.target instanceof HTMLElement) {
            // Find slot parent of click target item, fallback to `e.target` if slot is not overridden
            // Use `.items > ` in case slot is nested (ex. GraphQLSelect with slot)
            const slotEl = e.target.closest('.items > [slot=item]') ?? e.target;
            const itemIndex = slotEl ? Array.from(menuItemsEl.children).indexOf(slotEl) : -1;
            selectIndex(itemIndex);
          }
        }}
      >
        {#each filteredItems ?? [] as item, index}
          <slot name="item" {item} {index} {highlightIndex}>
            <div
              class="p-2 bg-opacity-5 hover:bg-black/5 cursor-pointer"
              class:bg-black={index === highlightIndex}
              use:scrollIntoView={{
                condition: index === highlightIndex,
                initial: false,
              }}
            >
              {itemText(item)}
            </div>
          </slot>
        {:else}
          <div class="p-3 text-black/50 italic">
            {loading ? 'Loading...' : 'No items found'}
          </div>
        {/each}
      </div>
    </Menu>
  {/if}
</div>
