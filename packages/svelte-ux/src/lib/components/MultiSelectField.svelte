<script lang="ts" generics="TValue">
  import { getComponentSettings } from './settings.js';

  import { createEventDispatcher, type ComponentProps, type ComponentEvents } from 'svelte';
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

  type MultiSelectMenuProps = ComponentProps<MultiSelectMenu<TValue>>;

  // MultiSelectMenu props
  export let options: MultiSelectMenuProps['options'];
  export let value: MultiSelectMenuProps['value'];
  export let indeterminateSelected: typeof value = [];
  /** Maximum number of options that can be selected  */
  export let max: number | undefined = undefined;
  export let placement: Placement = 'bottom-start';
  export let infiniteScroll = false;

  // TextField props
  export let label = '';
  export let placeholder = '';
  export let loading: boolean = false;
  export let disabled: boolean = false;
  // export let readonly: boolean = false;
  export let icon: string | null = null;
  export let clearable = true;
  export let base = false;
  export let rounded = false;
  export let dense = false;

  export let formatSelected: (ctx: { value: typeof value; options: typeof options }) => string = ({
    value,
  }) => `${value?.length} selected`;

  export let classes: {
    root?: string;
    multiSelectMenu?: MultiSelectMenuProps['classes'];
    field?: string | ComponentProps<TextField>['classes'];
    actions?: string;
  } = {};

  const dispatch = createEventDispatcher<{ change: { value: typeof value } }>();

  // Elements
  let inputEl: HTMLInputElement | undefined;
  let menuOptionsEl: HTMLDivElement | undefined;

  export let menuProps: Omit<MultiSelectMenuProps, 'options'> | undefined = undefined;

  const logger = new Logger('MultiSelectField');

  let open = false;

  let searchText = '';
  $: if (!open) {
    const selectedOptions = options.filter((o) => value?.includes(o.value));
    searchText = formatSelected({ value, options: selectedOptions });
  }

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

  function onSearchChange(e: ComponentEvents<TextField>['change']) {
    logger.debug('onChange');

    searchText = e.detail.inputValue as string;
    // dispatch('inputChange', searchText);
  }

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

  function onSelectChange(e: ComponentEvents<MultiSelectMenu<TValue>>['change']) {
    logger.info('onSelectChange', e);
    // @ts-expect-error
    value = e.detail.selection.selected;
    // TODO: Also dispatch `indeterminate: e.detail.indeterminate`?
    dispatch('change', { value });
  }

  function clear() {
    logger.info('clear');
    value = [];
    dispatch('change', { value });
  }

  $: restProps = { ...defaults, ...$$restProps };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class={cls(disabled && 'pointer-events-none', settingsClasses.root, classes.root, $$props.class)}
  on:click={onClick}
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
    on:focus={onFocus}
    on:change={onSearchChange}
    classes={clsMerge(
      { root: 'h-full' },
      normalizeClasses(settingsClasses.field),
      normalizeClasses(classes.field)
    )}
    {...restProps}
  >
    <slot slot="prepend" name="prepend" />

    <span slot="append" class="flex items-center">
      <slot name="append" />

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
          on:click={(e) => {
            e.stopPropagation();
            clear();
            hide();
          }}
        />
      {:else}
        <Button
          icon={mdiChevronDown}
          class="text-surface-content/50 p-1 transform {open ? 'rotate-180' : ''}"
          tabindex="-1"
          on:click={(e) => {
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
  </TextField>

  <MultiSelectMenu
    {options}
    {value}
    {indeterminateSelected}
    {max}
    {placement}
    {infiniteScroll}
    {searchText}
    classes={{ ...settingsClasses.multiSelectMenu, ...classes.multiSelectMenu }}
    matchWidth
    bind:open
    on:change={onSelectChange}
    on:close={hide}
    bind:menuOptionsEl
    {...menuProps}
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
        <MultiSelectOption {checked} {indeterminate} {disabled} on:change={onChange}>
          {label}
        </MultiSelectOption>
      </slot>
    </svelte:fragment>

    <slot name="actions" slot="actions" let:selection {selection}>
      <div></div>
    </slot>
  </MultiSelectMenu>
</div>
