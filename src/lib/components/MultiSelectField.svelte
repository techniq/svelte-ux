<script lang="ts">
  import { ComponentProps } from 'svelte';
  import { get } from 'lodash-es';
  import type { Placement } from '@floating-ui/dom';

  import { mdiChevronDown, mdiClose, mdiMagnify } from '@mdi/js';

  import Button from './Button.svelte';
  import MultiSelectMenu from './MultiSelectMenu.svelte';
  import TextField from './TextField.svelte';

  import { cls } from '../utils/styles';
  import Logger from '../utils/logger';
  import { selectOnFocus } from '../actions/input';
  import CircularProgress from './CircularProgress.svelte';

  type Option = $$Generic;

  // MultiSelectMenu props
  export let options: Option[];
  export let value: string[] = [];
  export let indeterminateSelected: string[] = [];
  export let placement: Placement = 'bottom-start';
  export let infiniteScroll = false;
  export let labelProp = 'name';
  export let valueProp = 'value';

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
  export let filled = false;
  export let dense = false;

  export let formatSelected: (ctx: { value: string[]; options: Option[] }) => string = ({
    value,
  }) => `${value.length} selected`;

  export let classes: {
    root?: string;
    menu?: string;
    field?: string;
    actions?: string;
  } = {};

  // Elements
  let inputEl: HTMLInputElement | null = null;
  let menuOptionsEl: HTMLDivElement;
  let multiSelectMenu: MultiSelectMenu<Option>;

  export let menuProps: ComponentProps<MultiSelectMenu<Option>> = undefined;

  const logger = new Logger('MultiSelectField');

  let open = false;

  let searchText = '';
  $: if (!open) {
    const selectedOptions = options.filter((o) => value.includes(get(o, valueProp)));
    searchText = formatSelected({ value, options: selectedOptions });
  }

  function show() {
    logger.debug('show');

    if (!disabled) {
      searchText = '';
      open = true;
    }
  }

  function hide() {
    logger.debug('hide');
    open = false;
  }

  function onChange(e: TextField['$$events_def']['change']) {
    logger.debug('onChange');

    searchText = e.detail.inputValue as string;
    // dispatch('inputChange', searchText);
    show();
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

    console.log({ menuOptionsEl });

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

  function clear() {
    logger.info('clear');
    multiSelectMenu.clear();
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class={cls(classes.root, $$props.class)} on:click={onClick}>
  <!-- TODO: Setup blur without jank on open or issues when clicking within menu -->
  <!-- on:blur={onBlur} -->
  <TextField
    {label}
    {placeholder}
    {base}
    {rounded}
    {filled}
    {icon}
    {dense}
    {disabled}
    value={searchText}
    bind:inputEl
    on:focus={onFocus}
    on:change={onChange}
    actions={(node) => [selectOnFocus(node)]}
    class={cls(classes.field, 'h-full')}
    {...$$restProps}
  >
    <slot slot="prepend" name="prepend" />

    <span slot="append" class="flex items-center">
      <slot name="append" />

      {#if loading}
        <span class="inline-block w-[29px] h-[28px] text-center">
          <CircularProgress size={16} width={2} class="text-black/50" />
        </span>
        <!-- {:else if readonly} -->
        <!-- Do not show chevron or clear buttons -->
      {:else if value.length && clearable}
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

  <MultiSelectMenu
    {options}
    {value}
    {indeterminateSelected}
    {placement}
    {infiniteScroll}
    {labelProp}
    {valueProp}
    {searchText}
    {classes}
    matchWidth
    bind:open
    on:close={hide}
    on:change
    bind:menuOptionsEl
    bind:this={multiSelectMenu}
    {...menuProps}
  >
    <slot name="actions" slot="actions">
      <div />
    </slot>
  </MultiSelectMenu>
</div>
