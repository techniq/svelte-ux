<script lang="ts" generics="TValue">
  import { type ComponentProps, type Snippet } from 'svelte';
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

  const { classes: settingsClasses, defaults } = getComponentSettings('SelectField');

  const logger = new Logger('SelectField');

  let searchText = $state('');

  let prevValue: TValue | null | undefined = undefined;
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

  // Elements
  let inputEl = $state<HTMLInputElement | null>(null);
  let menuOptionsEl = $state() as HTMLDivElement;
  let selectFieldEl = $state() as HTMLDivElement;

  function nextOptionIndex(currentIndex: number) {
    // Find next non-disabled option
    let nextIndex = filteredOptions.findIndex((o, i) => i > currentIndex && !o.disabled);

    if (nextIndex === -1) {
      // Find first non-disabled (wrap to top)
      nextIndex = filteredOptions.findIndex((o, i) => !o.disabled);
    }

    return nextIndex;
  }

  function prevOptionIndex(currentIndex: number) {
    // Find prev non-disabled option
    let prevIndex = filteredOptions.findLastIndex((o, i) => i < currentIndex && !o.disabled);

    if (prevIndex === -1) {
      // Find first non-disabled (wrap to top)
      prevIndex = filteredOptions.findLastIndex((o, i) => !o.disabled);
    }

    return prevIndex;
  }

  interface Props {
    options?: MenuOption<TValue>[];
    name?: string;
    label?: string;
    placeholder?: string;
    labelPlacement?: any;
    loading?: boolean;
    required?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    icon?: IconInput;
    inlineOptions?: boolean;
    toggleIcon?: IconInput;
    closeIcon?: IconInput;
    activeOptionIcon?: boolean;
    clearable?: boolean;
    base?: boolean;
    rounded?: boolean;
    dense?: boolean;
    clearSearchOnOpen?: boolean;
    autofocus?: ComponentProps<typeof TextField>['autofocus'];
    fieldActions?: ComponentProps<typeof TextField>['actions'];
    /** If true, show left/right buttons to step through options */
    stepper?: boolean;
    scrollIntoView?: Partial<ScrollIntoViewOptions>;
    classes?: {
      root?: string;
      field?: string | ComponentProps<typeof TextField>['classes'];
      options?: string;
      option?: string;
      selected?: string;
      group?: string;
      empty?: string;
    };
    // Menu props
    placement?: Placement;
    autoPlacement?: boolean;
    matchWidth?: boolean;
    resize?: boolean;
    disableTransition?: boolean;
    menuProps?: ComponentProps<typeof Menu>;
    value?: TValue | null;
    selected?: MenuOption<TValue> | null;
    search?: (text: string) => Promise<void>;
    // UI state
    open?: boolean;
    class?: string;
    onChange?: ({
      value,
      option,
    }: {
      value?: TValue | null;
      option?: MenuOption<TValue> | null;
    }) => void;
    onInputChange?: (value: string) => void;
    prepend?: Snippet;
    append?: Snippet;
    option?: Snippet<
      [
        {
          option: any;
          index: number;
          selected?: MenuOption<TValue> | null;
          value?: TValue | null;
          highlightIndex: number;
        },
      ]
    >;
    empty?: Snippet<[{ loading: boolean }]>;
    actions?: Snippet<[{ hide: (reason?: string) => void }]>;
  }

  let {
    options = [],
    name = '',
    label = '',
    placeholder = '',
    labelPlacement = defaults.labelPlacement,
    loading = false,
    required = false,
    disabled = false,
    readonly = false,
    icon = $bindable(),
    inlineOptions = false,
    toggleIcon = !inlineOptions ? mdiChevronDown : null,
    closeIcon = mdiClose,
    activeOptionIcon = false,
    clearable = true,
    base = false,
    rounded = false,
    dense = false,
    clearSearchOnOpen = true,
    autofocus,
    fieldActions = autofocus
      ? (node) => [
          autoFocus(node, typeof autofocus === 'object' ? autofocus : undefined),
          selectOnFocus(node),
        ]
      : undefined,
    stepper = false,
    scrollIntoView = {},
    classes = {},
    placement = 'bottom-start',
    autoPlacement = true,
    matchWidth = true,
    resize = true,
    disableTransition = false,
    menuProps,
    value = $bindable(),
    selected = $bindable(),
    search = async (text: string) => {
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
    },
    open = $bindable(false),
    class: className,
    onChange: _onChange,
    onInputChange,
    prepend: prependRender,
    append: appendRender,
    option: optionRender,
    empty: emptyRender,
    actions,
    ...restProps
  }: Props & Omit<ComponentProps<typeof TextField>, keyof Props> = $props();
  let originalIcon = icon;
  let highlightIndex = $state(-1);

  const onChange: ComponentProps<typeof TextField>['onChange'] = ({ inputValue }) => {
    logger.debug('onChange');

    searchText = inputValue as string;
    onInputChange?.(searchText);
    show();
  };

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

    switch (e.key) {
      case 'Tab':
        if (e.shiftKey) {
          // ShiftTab
        }
        break;

      case 'ArrowDown':
        if (open) {
          highlightIndex = nextOptionIndex(highlightIndex);
        }
        show();
        break;

      case 'ArrowUp':
        if (open) {
          highlightIndex = prevOptionIndex(highlightIndex);
        }
        show();
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
      _onChange?.({ option, value });
    }

    hide('selectOption');

    return option;
  }

  function clear() {
    logger.info('clear');
    selectOption(null);
    filteredOptions = options;
  }

  let filteredOptions = $state.raw() as MenuOption<TValue>[];
  $effect(() => {
    filteredOptions = options ?? [];
  });
  $effect(() => {
    if (open === false) {
      // Restore text if cleared but selection remains
      if (selected) {
        searchText = selected.label;
      }
    }
  });
  $effect(() => {
    logger.debug({ searchText });
  });
  // Reactively call anytime `selected`, `value`, or `options` change
  $effect(() => {
    updateSelected(selected, value, options);
  });
  $effect(() => {
    if (open) {
      // Capture current highlighted item (attempt to restore after searching)
      const prevHighlightedOption = filteredOptions[highlightIndex];

      // Do not search if menu is not open / closing on selection
      search(searchText).then(() => {
        // TODO: Find a way for scrollIntoView to still highlight after the menu height transition finishes
        const selectedIndex = filteredOptions.findIndex((o) => o.value === value);
        if (highlightIndex === -1) {
          // Highlight selected if none currently
          highlightIndex = selectedIndex === -1 ? nextOptionIndex(-1) : selectedIndex;
        } else {
          // Attempt to re-highlight previously highlighted option after search
          const prevHighlightedOptionIndex = filteredOptions.findIndex(
            (o) => o === prevHighlightedOption
          );

          if (prevHighlightedOptionIndex !== -1) {
            // Maintain previously highlight index after filter update (option still available)
            highlightIndex = prevHighlightedOptionIndex;
          } else {
            // Highlight first option
            highlightIndex = nextOptionIndex(-1);
          }
        }
      });
    }
  });
  let previous = $derived(() => {
    const index = options.findIndex((o) => o.value === value);
    if (index === 0 || index === -1) {
      // If first item, or no selected value yet, return last item
      return options[options.length - 1].value;
    } else {
      // Previous item
      return options[index - 1].value;
    }
  });
  let next = $derived(() => {
    const index = options.findIndex((x) => x.value === value);
    if (index === options.length - 1) {
      // First value
      return options[0].value;
    } else {
      // Next value
      return options[index + 1].value;
    }
  });
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
  aria-haspopup={!inlineOptions ? 'listbox' : undefined}
  class={cls(
    'SelectField block w-full cursor-default text-left',
    settingsClasses.root,
    classes.root,
    className
  )}
  bind:this={selectFieldEl}
  onclick={onClick}
  tabindex="-1"
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
    {onChange}
    onfocus={onFocus}
    onblur={onBlur}
    onkeydown={onKeyDown}
    onkeypress={onKeyPress}
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
    {...restProps}
  >
    {#snippet prepend()}
      <span class="flex items-center">
        <input type="hidden" {name} {value} />

        {#if stepper}
          <Button
            icon={mdiChevronLeft}
            onclick={(e) => {
              e.stopPropagation();
              logger.debug('step left clicked');
              selectValue(previous());
            }}
            class="mr-2"
            size="sm"
          />
        {/if}
        {@render prependRender?.()}
      </span>
    {/snippet}

    {#snippet append()}
      <span class="flex items-center">
        {@render appendRender?.()}

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
            onclick={(e) => {
              e.stopPropagation();
              logger.debug('closeIcon clicked');
              clear();
            }}
          />
        {:else if toggleIcon}
          <Button
            icon={toggleIcon}
            class="text-surface-content/50 p-1 transform {open ? 'rotate-180' : ''}"
            tabindex={-1}
            onclick={(e) => {
              e.stopPropagation();
              logger.debug('toggleIcon clicked');
              open ? hide() : show();
            }}
          />
        {/if}

        {#if stepper}
          <Button
            icon={mdiChevronRight}
            onclick={(e) => {
              e.stopPropagation();
              logger.debug('step right clicked');
              selectValue(next());
            }}
            class="mr-2"
            size="sm"
          />
        {/if}
      </span>
    {/snippet}
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
        onClose={() => hide('menu onClose')}
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
          {#snippet option({ option, index })}
            {#if optionRender}
              {@render optionRender({
                option,
                index,
                selected,
                value,
                highlightIndex,
              })}
            {:else}
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
                disabled={option.disabled}
              >
                {option.label}
              </MenuItem>
            {/if}
          {/snippet}

          {#snippet empty({ loading })}
            {#if emptyRender}
              {@render emptyRender({ loading })}
            {:else}
              <div
                class={cls(
                  'p-3 text-surface-content/5/50 italic text-sm',
                  settingsClasses.empty,
                  classes.empty
                )}
              >
                {loading ? 'Loading...' : 'No options found'}
              </div>
            {/if}
          {/snippet}
        </SelectListOptions>

        {@render actions?.({ hide })}
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
        {#snippet option({ option, index })}
          {#if optionRender}
            {@render optionRender({ option, index, selected, value, highlightIndex })}
          {:else}
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
              disabled={option.disabled}
            >
              {option.label}
            </MenuItem>
          {/if}
        {/snippet}

        {#snippet empty({ loading })}
          {#if emptyRender}
            {@render emptyRender({ loading })}
          {:else}
            <div
              class={cls(
                'p-3 text-surface-content/5/50 italic text-sm',
                settingsClasses.empty,
                classes.empty
              )}
            >
              {loading ? 'Loading...' : 'No options found'}
            </div>
          {/if}
        {/snippet}
      </SelectListOptions>
    {/if}
  {/if}
</div>
