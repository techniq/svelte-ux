<script lang="ts" generics="TValue">
  import { getComponentSettings } from './settings.js';

  import { type ComponentProps, type Snippet } from 'svelte';
  import type { Placement } from '@floating-ui/dom';

  import { mdiChevronDown, mdiClose } from '@mdi/js';

  import Button from './Button.svelte';
  import MultiSelectMenu from './MultiSelectMenu.svelte';
  import MultiSelectOption from './MultiSelectOption.svelte';
  import TextField from './TextField.svelte';

  import { cls, clsMerge, normalizeClasses } from '../utils/styles.js';
  import { Logger } from '../utils/logger.js';
  import ProgressCircle from './ProgressCircle.svelte';

  const { classes: settingsClasses, defaults } = getComponentSettings('MultiSelectField');

  type MultiSelectMenuProps = ComponentProps<typeof MultiSelectMenu<TValue>>;

  // Elements
  let inputEl = $state<HTMLInputElement>();
  let menuOptionsEl = $state<HTMLDivElement>();

  interface Props {
    // MultiSelectMenu props
    options: MultiSelectMenuProps['options'];
    value: MultiSelectMenuProps['value'];
    mode?: MultiSelectMenuProps['mode'];
    maintainOrder?: MultiSelectMenuProps['maintainOrder'];
    indeterminateSelected?: typeof value;
    /** Maximum number of options that can be selected  */
    max?: number;
    placement?: Placement;
    infiniteScroll?: boolean;
    optionProps?: Partial<ComponentProps<typeof MultiSelectOption>>;
    // TextField props
    label?: string;
    placeholder?: string;
    loading?: boolean;
    disabled?: boolean;
    // export let readonly: boolean = false;
    icon?: string | null;
    clearable?: boolean;
    base?: boolean;
    rounded?: boolean;
    dense?: boolean;
    formatSelected?: (ctx: { value: typeof value; options: typeof options }) => string;
    classes?: {
      root?: string;
      multiSelectMenu?: MultiSelectMenuProps['classes'];
      field?: string | ComponentProps<typeof TextField>['classes'];
      actions?: string;
    };
    menuProps?: Omit<MultiSelectMenuProps, 'options'>;
    // Passthrough onApply event
    onApply?: MultiSelectMenuProps['onApply'];
    onChange?: (value: MultiSelectMenuProps['value']) => void;
    prepend?: Snippet;
    append?: Snippet;
    beforeOptions?: Snippet<[any]>;
    afterOptions?: Snippet<[any]>;
    option?: Snippet<[any]>;
    actions?: Snippet<[any]>;
  }

  let {
    options,
    value = $bindable(),
    mode,
    maintainOrder,
    indeterminateSelected = [],
    max,
    placement = 'bottom-start',
    infiniteScroll = false,
    optionProps,
    label = '',
    placeholder = '',
    loading = false,
    disabled = false,
    icon,
    clearable = true,
    base = false,
    rounded = false,
    dense = false,
    formatSelected = ({ value }) => `${value?.length} selected`,
    classes = {},
    class: className,
    menuProps,
    onApply,
    onChange,
    prepend: prependRender,
    append: appendRender,
    beforeOptions: beforeOptionsRender,
    afterOptions: afterOptionsRender,
    option: optionRender,
    actions: actionsRender,
    ...rest
  }: Props & Omit<ComponentProps<typeof TextField>, keyof Props> = $props();

  const logger = new Logger('MultiSelectField');

  let open = $state(false);

  let searchText = $state('');

  $effect(() => {
    if (!open) {
      const selectedOptions = options.filter((o) => value?.includes(o.value));
      searchText = formatSelected({ value, options: selectedOptions });
    }
  });

  function show() {
    logger.debug('show');

    inputEl?.focus();

    if (!open) {
      searchText = '';
      open = true;
    }
  }

  function hide() {
    logger.debug('hide');
    open = false;
  }

  const onSearchChange: ComponentProps<typeof TextField>['onChange'] = ({ inputValue }) => {
    logger.debug('onSearchChange');
    searchText = inputValue as string;
    // dispatch('inputChange', searchText);
  };

  function onClick() {
    logger.debug('onClick');
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
      e.relatedTarget instanceof Node &&
      !menuOptionsEl?.contains(e.relatedTarget) && // TODO: Oddly Safari does not set `relatedTarget` to the clicked on menu option (like Chrome and Firefox) but instead appears to take `tabindex` into consideration.  Currently resolves to `.options` after setting `tabindex="-1"
      e.relatedTarget !== menuOptionsEl?.offsetParent // click on scroll bar
    ) {
      hide();
    } else {
      logger.debug('ignoring blur');
    }
  }

  const onSelectChange: ComponentProps<typeof MultiSelectMenu>["onChange"] = (v) => {
    logger.info('onSelectChange', v);
    // @ts-expect-error
    value = v.selection.selected;
    // TODO: Also dispatch `indeterminate: e.detail.indeterminate`?
    onChange?.(value);
  }

  function clear() {
    logger.info('clear');
    value = [];
    onChange?.(value);
  }

  let restProps = $derived({ ...defaults, ...rest });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class={cls(disabled && 'pointer-events-none', settingsClasses.root, classes.root, className)}
  onclick={onClick}
>
  <!-- TODO: Setup blur without jank on open or issues when clicking within menu -->
  <!-- on:blur={onBlur} -->
  <TextField
    {label}
    {placeholder}
    {base}
    {rounded}
    {icon}
    {dense}
    {disabled}
    value={searchText}
    bind:inputEl
    onfocus={onFocus}
    onChange={onSearchChange}
    classes={clsMerge(
      { root: 'h-full' },
      normalizeClasses(settingsClasses.field),
      normalizeClasses(classes.field)
    )}
    {...restProps}
  >
    {#snippet prepend()}
      {@render prependRender?.()}
    {/snippet}

    {#snippet append()}
      <span class="flex items-center">
        {@render appendRender?.()}

        {#if loading}
          <span class="inline-block w-[29px] h-[28px] text-center">
            <ProgressCircle size={16} width={2} class="text-surface-content/50" />
          </span>
          <!-- {:else if readonly} -->
          <!-- Do not show chevron or clear buttons -->
        {:else if value?.length && clearable}
          <Button
            icon={mdiClose}
            class="text-surface-content/50 p-1"
            onclick={(e) => {
              e.stopPropagation();
              clear();
              hide();
            }}
          />
        {:else}
          <Button
            icon={mdiChevronDown}
            class="text-surface-content/50 p-1 transform {open ? 'rotate-180' : ''}"
            tabindex={-1}
            onclick={(e) => {
              e.stopPropagation();
              if (open) {
                hide();
              } else {
                show();
              }
            }}
          />
        {/if}
      </span>
    {/snippet}
  </TextField>

  <MultiSelectMenu
    {options}
    {value}
    {mode}
    {maintainOrder}
    {indeterminateSelected}
    {max}
    {placement}
    {infiniteScroll}
    {searchText}
    {onApply}
    classes={{ ...settingsClasses.multiSelectMenu, ...classes.multiSelectMenu }}
    matchWidth
    bind:open
    onChange={onSelectChange}
    onClose={hide}
    {...menuProps}
  >
    {#snippet beforeOptions({ selection })}
      {@render beforeOptionsRender?.({ selection })}
    {/snippet}
    {#snippet afterOptions({ selection })}
      {@render afterOptionsRender?.({ selection })}
    {/snippet}

    <!-- TODO: If only `<slot name="option" slot="option" />` just worked  -->
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

    {#snippet actions({ selection })}
      {@render actionsRender?.({ selection })}
    {/snippet}
  </MultiSelectMenu>
</div>
