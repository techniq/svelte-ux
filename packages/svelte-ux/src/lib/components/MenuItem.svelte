<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import Button from './Button.svelte';
  import { cls } from '@layerstack/tailwind';
  import {
    scrollIntoView as scrollIntoViewAction,
    type ScrollIntoViewOptions,
  } from '@layerstack/svelte-actions';

  import { setButtonGroup } from './ButtonGroup.svelte';
  import { getComponentClasses } from './theme.js';
  import { settings, getSettings } from './settings.js';

  type ButtonProps = ComponentProps<Button>;

  export let icon: ButtonProps['icon'] = undefined;
  export let scrollIntoView: ScrollIntoViewOptions | boolean = false;
  export let disabled = false;
  export let selected = false;

  let className: string | undefined = undefined;
  export { className as class };

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
  settings({ ...getSettings(), components: {} });

  // Needs variable to restore reactivity.
  $: actions = (node: HTMLElement) => [scrollIntoViewAction(node, scrollOptions)];
</script>

<Button
  variant="none"
  {icon}
  {classes}
  fullWidth
  {actions}
  {disabled}
  {...$$restProps}
  class={cls(
    'MenuItem',
    'text-left items-center p-2 hover:bg-surface-content/5 rounded-sm duration-75',
    selected && classes?.selected,
    settingsClasses.root,
    classes?.root,
    className
  )}
  on:click
  on:mouseover
  on:mouseout
>
  <slot />
</Button>
