<script lang="ts" generics="TValue">
  import { createEventDispatcher, type ComponentProps, type ComponentEvents } from 'svelte';
  import type { Placement } from '@floating-ui/dom';

  import { mdiChevronDown, mdiChevronLeft, mdiChevronRight, mdiClose } from '@mdi/js';

  import { Logger } from '../utils/logger.js';
  import { autoFocus, selectOnFocus } from '../actions/input.js';
  import { cls, clsMerge, normalizeClasses } from '../utils/styles.js';

  import Button from './Button.svelte';
  import ProgressCircle from './ProgressCircle.svelte';
  import Menu from './Menu.svelte';
  import MenuItem from './MenuItem.svelte';
  import SelectListOptions from './_SelectListOptions.svelte';
  import TextField from './TextField.svelte';
  import { getComponentSettings } from './settings.js';
  import type { IconInput } from '../utils/icons.js';
  import type { MenuOption } from '../types/index.js';
  import type { ScrollIntoViewOptions } from '../actions/scroll.js';

  const dispatch = createEventDispatcher<{
    change: { value: typeof value; option: typeof selected };
    inputChange: string;
  }>();
  const { classes: settingsClasses, defaults } = getComponentSettings('SelectField');

  const logger = new Logger('SelectField');

  export let options: MenuOption<TValue>[] = [];

  export let name = '';
  export let label = '';
  export let placeholder = '';
  export let labelPlacement = defaults.labelPlacement;
  export let loading: boolean = false;
  export let required = false;
  export let disabled: boolean = false;
  export let readonly: boolean = false;
  export let icon: IconInput = undefined;
  export let inlineOptions = false;
  export let toggleIcon: IconInput = !inlineOptions ? mdiChevronDown : null;
  export let closeIcon: IconInput = mdiClose;
  export let activeOptionIcon: boolean = false;
  export let clearable = true;
  export let base = false;
  export let rounded = false;
  export let dense = false;
  export let clearSearchOnOpen = true;
  export let autofocus: ComponentProps<TextField>['autofocus'] = undefined;
  export let fieldActions: ComponentProps<TextField>['actions'] = autofocus
    ? (node) => [
        autoFocus(node, typeof autofocus === 'object' ? autofocus : undefined),
        selectOnFocus(node),
      ]
    : undefined;

  /** If true, show left/right buttons to step through options */
  export let stepper = false;

  let originalIcon = icon;

  export let scrollIntoView: Partial<ScrollIntoViewOptions> = {};

  export let classes: {
    root?: string;
    field?: string | ComponentProps<TextField>['classes'];
    options?: string;
    option?: string;
    selected?: string;
    group?: string;
    empty?: string;
  } = {};

  let fieldClasses: ComponentProps<TextField>['classes'];
  $: fieldClasses = typeof classes.field === 'string' ? { root: classes.field } : classes.field;

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

  export let value: TValue | null | undefined = undefined;
  let prevValue: TValue | null | undefined = undefined;
  export let selected: MenuOption<TValue> | null | undefined = undefined;
  let prevSelected: MenuOption<TValue> | null | undefined = undefined;

  function updateSelected(
    selected: MenuOption<TValue> | null | undefined,
    value: TValue | null | undefined,
    options: MenuOption<TValue>[]
  ) {
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
      if (selected !== undefined && selected?.value !== prevSelected?.value) {
        logger.info('selected changed', {
          value,
          prevValue,
          selected,
          prevSelected,
          options,
        });

        // Capture for next change
        prevValue = selected?.value;
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
        return words.every((word) => option.label.toLowerCase().includes(word));
      });
    }
  };

  // Elements
  let inputEl: HTMLInputElement | null = null;
  let menuOptionsEl: HTMLDivElement;
  let selectFieldEl: HTMLButtonElement;

  // UI state
  export let open = false;
  let highlightIndex = 0;

  $: if (open === false) {
    // Restore text if cleared but selection remains
    if (selected) {
      searchText = selected.label;
    }
  }

  $: if (open) {
    // Capture current highlighted item (attempt to restore after searching)
    const prevHighlightedOption = filteredOptions[highlightIndex];

    // Do not search if menu is not open / closing on selection
    search(searchText).then(() => {
      // TODO: Find a way for scrollIntoView to still highlight after the menu height transition finishes
      const selectedIndex = filteredOptions.findIndex((o) => o.value === value);
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
    });
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

  function onBlur(e: FocusEvent | CustomEvent<any>) {
    const fe = e as FocusEvent;
    logger.debug('onBlur', { target: e.target, relatedTarget: fe?.relatedTarget, menuOptionsEl });

    // Hide if focus not moved to menu (option clicked)
    if (
      fe.relatedTarget instanceof HTMLElement &&
      !menuOptionsEl?.contains(fe.relatedTarget) && // TODO: Oddly Safari does not set `relatedTarget` to the clicked on menu option (like Chrome and Firefox) but instead appears to take `tabindex` into consideration.  Currently resolves to `.options` after setting `tabindex="-1"
      fe.relatedTarget !== menuOptionsEl?.offsetParent && // click on scroll bar
      !fe.relatedTarget.closest('menu > [slot=actions]') && // click on action item
      !selectFieldEl?.contains(fe.relatedTarget) && // click within <SelectField> (ex. toggleIcon)
      fe.relatedTarget !== selectFieldEl // click on SelectField itself
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
  function selectValue(value: TValue | null | undefined) {
    logger.debug('selectValue', { value, options, filteredOptions });

    const option = options?.find((option) => option.value === value) ?? null;
    return selectOption(option);
  }

  /**
   * Select option by object
   */
  function selectOption(option: MenuOption<TValue> | null) {
    logger.info('selectOption', { option });

    const previousValue = value;

    value = option?.value;
    selected = option;
    searchText = option?.label ?? '';

    if (activeOptionIcon) {
      if (!selected?.icon) {
        icon = originalIcon;
      } else {
        icon = selected.icon;
      }
    }

    if (value != previousValue) {
      dispatch('change', { option, value });
    }

    hide('selectOption');

    return option;
  }

  $: previous = () => {
    const index = options.findIndex((o) => o.value === value);
    if (index === 0 || index === -1) {
      // If first item, or no selected value yet, return last item
      return options[options.length - 1].value;
    } else {
      // Previous item
      return options[index - 1].value;
    }
  };

  $: next = () => {
    const index = options.findIndex((x) => x.value === value);
    if (index === options.length - 1) {
      // First value
      return options[0].value;
    } else {
      // Next value
      return options[index + 1].value;
    }
  };

  function clear() {
    logger.info('clear');
    selectOption(null);
    filteredOptions = options;
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<button
  type="button"
  aria-haspopup={!inlineOptions ? 'listbox' : undefined}
  class={cls(
    'SelectField block w-full cursor-default text-left',
    settingsClasses.root,
    classes.root,
    $$props.class
  )}
  bind:this={selectFieldEl}
  on:click={onClick}
>
  <TextField
    {label}
    {labelPlacement}
    {placeholder}
    {base}
    {rounded}
    {icon}
    {dense}
    {required}
    {disabled}
    bind:inputEl
    bind:value={searchText}
    on:change={onChange}
    on:focus={onFocus}
    on:blur={onBlur}
    on:keydown={onKeyDown}
    on:keypress={onKeyPress}
    actions={fieldActions}
    classes={clsMerge(
      {
        root: 'h-full',
        container: inlineOptions
          ? 'border-none shadow-none hover:shadow-none group-focus-within:shadow-none'
          : undefined,
      },
      normalizeClasses(settingsClasses.field),
      normalizeClasses(classes.field)
    )}
    role="combobox"
    aria-expanded={open ? 'true' : 'false'}
    aria-autocomplete={!inlineOptions ? 'list' : undefined}
    {...$$restProps}
  >
    <span slot="prepend" class="flex items-center">
      <input type="hidden" {name} {value} />

      {#if stepper}
        <Button
          icon={mdiChevronLeft}
          on:click={(e) => {
            e.stopPropagation();
            logger.debug('step left clicked');
            selectValue(previous());
          }}
          class="mr-2"
          size="sm"
        />
      {/if}
      <slot name="prepend" />
    </span>

    <span slot="append" class="flex items-center">
      <slot name="append" />

      {#if loading}
        <span class="inline-block w-[29px] h-[28px] text-center">
          <ProgressCircle size={16} width={2} class="text-surface-content/50" />
        </span>
      {:else if readonly}
        <!-- Do not show chevron or clear buttons -->
      {:else if value && clearable}
        <Button
          icon={closeIcon}
          class="text-surface-content/50 p-1"
          on:click={(e) => {
            e.stopPropagation();
            logger.debug('closeIcon clicked');
            clear();
          }}
        />
      {:else if toggleIcon}
        <Button
          icon={toggleIcon}
          class="text-surface-content/50 p-1 transform {open ? 'rotate-180' : ''}"
          tabindex="-1"
          on:click={(e) => {
            e.stopPropagation();
            logger.debug('toggleIcon clicked');
            open ? hide() : show();
          }}
        />
      {/if}

      {#if stepper}
        <Button
          icon={mdiChevronRight}
          on:click={(e) => {
            e.stopPropagation();
            logger.debug('step right clicked');
            selectValue(next());
          }}
          class="mr-2"
          size="sm"
        />
      {/if}
    </span>
  </TextField>

  <!-- Improve initial open display, still needs work when switching from No options found (options.length === 0) -->
  {#if options?.length > 0 || loading !== true}
    {#if !inlineOptions}
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
        <!-- TODO: Rework into hierarchy of snippets in v2.0 -->
        <SelectListOptions
          bind:menuOptionsEl
          {open}
          {loading}
          {searchText}
          {filteredOptions}
          classes={{
            ...classes,
            root: cls(classes.options, inlineOptions ? 'border-t mt-1 px-1' : ''),
          }}
          {selectIndex}
          {onKeyPress}
          {onKeyDown}
        >
          <svelte:fragment slot="option" let:option let:index>
            <slot name="option" {option} {index} {selected} {value} {highlightIndex}>
              <MenuItem
                icon={option.icon}
                class={cls(
                  index === highlightIndex && '[:not(.group:hover)>&]:bg-surface-content/5',
                  option === selected && (classes.selected || 'font-semibold'),
                  option.group ? 'px-4' : 'px-2',
                  settingsClasses.option,
                  classes.option
                )}
                scrollIntoView={{
                  condition: index === highlightIndex,
                  onlyIfNeeded: inlineOptions,
                  ...scrollIntoView,
                }}
                role="option"
                aria-selected={option === selected ? 'true' : 'false'}
                aria-disabled={option?.disabled ? 'true' : 'false'}
              >
                {option.label}
              </MenuItem>
            </slot>
          </svelte:fragment>

          <slot name="empty" slot="empty" let:loading>
            <div
              class={cls(
                'p-3 text-surface-content/5/50 italic text-sm',
                settingsClasses.empty,
                classes.empty
              )}
            >
              {loading ? 'Loading...' : 'No options found'}
            </div>
          </slot>
        </SelectListOptions>

        <slot name="actions" {hide} />
      </Menu>
    {:else}
      <!-- TODO: Rework into hierarchy of snippets in v2.0. -->
      <!-- This code must be identical to the above block -->
      <SelectListOptions
        bind:menuOptionsEl
        {open}
        {loading}
        {searchText}
        {filteredOptions}
        classes={{
          ...classes,
          root: cls(classes.options, inlineOptions ? 'border-t mt-1 px-1' : ''),
        }}
        {selectIndex}
        {onKeyPress}
        {onKeyDown}
      >
        <svelte:fragment slot="option" let:option let:index>
          <slot name="option" {option} {index} {selected} {value} {highlightIndex}>
            <MenuItem
              icon={option.icon}
              class={cls(
                index === highlightIndex && '[:not(.group:hover)>&]:bg-surface-content/5',
                option === selected && (classes.selected || 'font-semibold'),
                option.group ? 'px-4' : 'px-2',
                settingsClasses.option,
                classes.option
              )}
              scrollIntoView={{
                condition: index === highlightIndex,
                onlyIfNeeded: inlineOptions,
                ...scrollIntoView,
              }}
              role="option"
              aria-selected={option === selected ? 'true' : 'false'}
              aria-disabled={option?.disabled ? 'true' : 'false'}
            >
              {option.label}
            </MenuItem>
          </slot>
        </svelte:fragment>

        <slot name="empty" slot="empty" let:loading>
          <div
            class={cls(
              'p-3 text-surface-content/5/50 italic text-sm',
              settingsClasses.empty,
              classes.empty
            )}
          >
            {loading ? 'Loading...' : 'No options found'}
          </div>
        </slot>
      </SelectListOptions>
    {/if}
  {/if}
</button>
