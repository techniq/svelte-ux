<script lang="ts">
  import Button from './Button.svelte';
  import type { ComponentProps } from '../types';
  import { cls } from '../utils/styles';
  import {
    scrollIntoView as scrollIntoViewAction,
    type ScrollIntoViewOptions,
  } from '../actions/scroll';
  import { setButtonGroup } from './ButtonGroup.svelte';
  import { getComponentClasses } from './theme';
  import { settings, getSettings } from './settings';

  type ButtonProps = ComponentProps<Button>;

  export let icon: ButtonProps['icon'] = undefined;
  export let scrollIntoView: ScrollIntoViewOptions | boolean = false;
  export let disabled = false;
  export let selected = false;

  export let classes: ButtonProps['classes'] & { selected?: string } = {
    root: 'text-sm gap-3',
    icon: 'text-surface-content/50',
    selected: 'font-semibold [:not(.group:hover)>&]:bg-surface-content/5',
  };
  const settingsClasses = getComponentClasses('MenuItem');

  let scrollOptions: ScrollIntoViewOptions;
  $: scrollOptions =
    typeof scrollIntoView === 'boolean'
      ? ({ condition: scrollIntoView } as ScrollIntoViewOptions)
      : scrollIntoView;

  // Clear ButtonGroup if set
  setButtonGroup(undefined);

  // Clear theme to not expose to Button
  settings({ ...getSettings(), classes: {} });
</script>

<Button
  variant="none"
  {icon}
  {classes}
  fullWidth
  actions={(node) => [scrollIntoViewAction(node, scrollOptions)]}
  {disabled}
  {...$$restProps}
  class={cls(
    'MenuItem',
    'text-left items-center p-2 hover:bg-surface-content/5 rounded duration-75',
    selected && classes?.selected,
    settingsClasses.root,
    classes?.root,
    $$props.class
  )}
  on:click
  on:mouseover
  on:mouseout
>
  <slot />
</Button>
