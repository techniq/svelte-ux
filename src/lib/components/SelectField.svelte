<script lang="ts">
  import { createEventDispatcher, type ComponentProps, type ComponentEvents } from 'svelte';
  import type { Placement } from '@floating-ui/dom';

  import { mdiChevronDown, mdiClose } from '@mdi/js';

  import Logger from '../utils/logger';
  import { selectOnFocus } from '../actions/input';
  import { cls } from '../utils/styles';

  import Button from './Button.svelte';
  import ProgressCircle from './ProgressCircle.svelte';
  import Menu from './Menu.svelte';
  import MenuItem from './MenuItem.svelte';
  import TextField from './TextField.svelte';
  import { getComponentTheme } from './theme';

  const dispatch = createEventDispatcher<{
    change: { value: any; option: any };
    inputChange: string;
  }>();

  const logger = new Logger('SelectField');

  export let options: any[] = [];
  export let optionText = (option: any) => (option?.name as string) ?? '';
  export let optionValue = (option: any) => option?.value ?? null;

  export let label = '';
  export let placeholder = '';
  export let loading: boolean = false;
  export let disabled: boolean = false;
  export let readonly: boolean = false;
  export let icon: string | null = null;
  export let clearable = true;
  export let base = false;
  export let rounded = false;
  export let dense = false;
  export let clearSearchOnOpen = true;

  export let classes: {
    root?: string;
    field?: string;
    options?: string;
    option?: string;
    selected?: string;
    group?: string;
    empty?: string;
  } = {};
  const theme = getComponentTheme('SelectField');

  // Menu props
  export let placement: Placement = 'bottom-start';
  export let autoPlacement = true;
  export let matchWidth = true;
  export let resize = true;
  export let disableTransition = false;
  export let menuProps: ComponentProps<Menu> | undefined = undefined;

  $: filteredOptions = options ?? [];
  let searchText = '';
  $: logger.debug({ searchText });

  export let value: any = undefined;
  let prevValue = undefined;
  export let selected = undefined;
  let prevSelected = undefined;

  function updateSelected(selected, value, options) {
    logger.debug('updateSelected', {
      value,
      prevValue,
      selected,
      prevSelected,
      options,
      loading,
    });

    if (loading === true) {
      // wait to apply any changes (initially could be loading selected option)
    } else {
      if (selected !== undefined && optionValue(selected) !== optionValue(prevSelected)) {
        logger.info('selected changed', {
          value,
          prevValue,
          selected,
          prevSelected,
          options,
        });

        // Capture for next change
        prevValue = optionValue(selected);
        prevSelected = selectOption(selected);
      } else if (/*value !== undefined &&*/ value !== prevValue) {
        // Removed `value !== undefined` to clear searchText when value is set to undefined.  Might be a breaking change
        logger.info('value changed', {
          value,
          prevValue,
          selected,
          prevSelected,
          options,
        });

        // Capture for next change
        prevValue = value;
        prevSelected = selectValue(value);
      } else {
        logger.info('neither selected or value changed (options only)');
        // Reselect value if menu is not open and options possibly changed (which could result in new display text for the select value)
        if (!open && prevValue !== undefined) {
          selectValue(prevValue);
        }
      }
    }
  }
  // Reactively call anytime `selected`, `value`, or `options` change
  $: updateSelected(selected, value, options);

  export let search = async (text: string) => {
    logger.debug('search', { text, open });

    if (text === '') {
      // Reset options
      filteredOptions = options;
    } else {
      const words = text?.toLowerCase().split(' ') ?? [];
      filteredOptions = options.filter((option) => {
        const _optionText = optionText(option).toLowerCase();
        return words.every((word) => _optionText.includes(word));
      });
    }
  };

  // Elements
  let inputEl: HTMLInputElement | null = null;
  let menuOptionsEl: HTMLDivElement;

  // UI state
  export let open = false;
  let highlightIndex = 0;

  $: if (open === false) {
    // Restore text if cleared but selection remains
    if (selected) {
      searchText = optionText(selected);
    }
  }

  $: if (open) {
    // Capture current highlighted item (attempt to restore after searching)
    const prevHighlightedOption = filteredOptions[highlightIndex];

    // Do not search if menu is not open / closing on selection
    search(searchText);

    // TODO: Find a way for scrollIntoView to still highlight after the menu height transition finishes
    const selectedIndex = filteredOptions.findIndex((o) => optionValue(o) === value);
    if (highlightIndex === -1) {
      // Highlight selected if none currently
      highlightIndex = selectedIndex === -1 ? 0 : selectedIndex;
    } else {
      // Attempt to re-highlight previously highlighted item after search
      const prevHighlightedOptionIndex = filteredOptions.findIndex(
        (o) => o === prevHighlightedOption
      );

      if (prevHighlightedOptionIndex !== -1) {
        // Maintain previously highlight index after filter update (option still available)
        highlightIndex = prevHighlightedOptionIndex;
      } else {
        // Highlight first item
        highlightIndex = 0;
      }
    }
  }

  function onChange(e: ComponentEvents<TextField>['change']) {
    logger.debug('onChange');

    searchText = e.detail.inputValue as string;
    dispatch('inputChange', searchText);
    show();
  }

  function onFocus() {
    logger.debug('onFocus');
    show();
  }

  function onBlur(e: FocusEvent) {
    logger.debug('onBlur', { target: e.target, relatedTarget: e.relatedTarget, menuOptionsEl });

    // Hide if focus not moved to menu (option clicked)
    if (
      e.relatedTarget instanceof HTMLElement &&
      !menuOptionsEl?.contains(e.relatedTarget) && // TODO: Oddly Safari does not set `relatedTarget` to the clicked on menu option (like Chrome and Firefox) but instead appears to take `tabindex` into consideration.  Currently resolves to `.options` after setting `tabindex="-1"
      e.relatedTarget !== menuOptionsEl?.offsetParent && // click on scroll bar
      !e.relatedTarget.closest('menu > [slot=actions]') // click on action item
    ) {
      hide('blur');
    } else {
      logger.debug('ignoring blur');
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
        if (highlightIndex < filteredOptions.length - 1) {
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
          highlightIndex = filteredOptions.length - 1;
        }
        break;

      case 'Escape':
        if (open) {
          inputEl?.focus();
          hide('escape');
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

    if (!disabled && !readonly) {
      if (open === false && clearSearchOnOpen) {
        searchText = ''; // Show all options on open
      }
      open = true;
      inputEl?.focus();
    }
  }

  function hide(reason = '') {
    logger.debug('hide', { reason });
    open = false;
    highlightIndex = -1;
  }

  function selectHighlighted() {
    logger.debug('selectHighlighted');

    return selectIndex(highlightIndex);
  }

  /**
   * Select option by index
   */
  function selectIndex(index: number) {
    logger.debug('selectIndex', { index });

    const option = filteredOptions[index];
    // Only select by index if valid option found (ex. ignore pressing enter if all filtered)
    if (option) {
      return selectOption(option);
    }
  }

  /**
   * Select option by value
   */
  function selectValue(value: any) {
    logger.debug('selectValue', { value, options, filteredOptions });

    const option = options?.find((option) => optionValue(option) === value);
    return selectOption(option);
  }

  /**
   * Select option by object
   */
  function selectOption(option: any) {
    logger.info('selectOption', { option });

    const previousValue = value;

    value = optionValue(option);
    selected = option;
    searchText = optionText(option);

    if (value != previousValue) {
      dispatch('change', { option, value });
    }

    hide('selectOption');

    return option;
  }

  function clear() {
    logger.info('clear');
    selectOption(null);
    filteredOptions = options;
    //inputEl?.focus();
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class={cls('SelectField', theme.root, classes.root, $$props.class)} on:click={onClick}>
  <TextField
    {label}
    {placeholder}
    {base}
    {rounded}
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
    class={cls('h-full', theme.field, classes.field)}
    {...$$restProps}
  >
    <slot slot="prepend" name="prepend" />

    <span slot="append" class="flex items-center">
      <slot name="append" />

      {#if loading}
        <span class="inline-block w-[29px] h-[28px] text-center">
          <ProgressCircle size={16} width={2} class="text-black/50" />
        </span>
      {:else if readonly}
        <!-- Do not show chevron or clear buttons -->
      {:else if value && clearable}
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

  <!-- Improve initial open display, still needs work when switching from No options found (options.length === 0) -->
  {#if options?.length > 0 || loading !== true}
    <Menu
      {placement}
      {autoPlacement}
      {matchWidth}
      {resize}
      {disableTransition}
      moveFocus={false}
      bind:open
      on:close={() => hide('menu on:close')}
      {...menuProps}
    >
      <div
        tabindex="-1"
        class={cls('options group p-1 focus:outline-none', theme.options, classes.options)}
        class:opacity-50={loading}
        bind:this={menuOptionsEl}
        on:click|stopPropagation={(e) => {
          logger.debug('options container clicked');

          if (e.target instanceof HTMLElement) {
            // Find slot parent of click target option, fallback to `e.target` if slot is not overridden
            // Use `.options > ` in case slot is nested (ex. GraphQLSelect with slot)
            const slotEl = e.target.closest('.options > [slot=option]') ?? e.target;
            // Find the index of the clicked on element (ignoring group headers)
            const optionIndex = slotEl
              ? [...menuOptionsEl.children]
                  .filter((el) => !el.classList.contains('group-header'))
                  .indexOf(slotEl)
              : -1;
            logger.debug({ slotEl, optionIndex });
            // ignore clicks on group options
            if (optionIndex !== -1) {
              selectIndex(optionIndex);
            }
          }
        }}
      >
        {#each filteredOptions ?? [] as option, index (optionValue(option))}
          {@const previousOption = filteredOptions[index - 1]}
          {#if option.group && option.group !== previousOption?.group}
            <div
              class={cls(
                'group-header text-xs leading-8 tracking-widest text-black/50 px-2',
                theme.group,
                classes.group
              )}
            >
              {option.group}
            </div>
          {/if}

          <slot name="option" {option} {index} {selected} {value} {highlightIndex}>
            <MenuItem
              class={cls(
                index === highlightIndex && '[:not(.group:hover)>&]:bg-black/5',
                option === selected && (classes.selected || 'font-semibold'),
                option.group ? 'px-4' : 'px-2',
                theme.option,
                classes.option
              )}
              scrollIntoView={index === highlightIndex}
            >
              {optionText(option)}
            </MenuItem>
          </slot>
        {:else}
          <slot name="empty" {loading} {searchText}>
            <div class={cls('p-3 text-black/50 italic text-sm', theme.empty, classes.empty)}>
              {loading ? 'Loading...' : 'No options found'}
            </div>
          </slot>
        {/each}
      </div>
      <slot name="actions" {hide} />
    </Menu>
  {/if}
</div>
