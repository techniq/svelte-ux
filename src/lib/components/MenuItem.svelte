<script lang="ts">
  import Button from './Button.svelte';
  import type { ComponentProps } from '../types';
  import { cls } from '../utils/styles';
  import { scrollIntoView as scrollIntoViewAction } from '../actions/scroll';
  import { setButtonGroup } from './ButtonGroup.svelte';
  import { createTheme, getComponentTheme } from './theme';

  type ButtonProps = ComponentProps<Button>;

  export let icon: ButtonProps['icon'] = undefined;
  export let scrollIntoView = false;
  export let disabled = false;

  export let classes: ButtonProps['classes'] = {
    root: 'text-sm gap-3',
    icon: 'text-black/50',
  };
  const theme = getComponentTheme('MenuItem');

  // Clear ButtonGroup if set
  setButtonGroup(undefined);

  // Clear theme to not expose to Button
  createTheme({});
</script>

<Button
  variant="none"
  {icon}
  {classes}
  fullWidth
  actions={(node) => [scrollIntoViewAction(node, { condition: scrollIntoView })]}
  {disabled}
  {...$$restProps}
  class={cls(
    'MenuItem',
    'text-left items-center p-2 hover:bg-black/5 duration-75',
    theme.root,
    classes?.root,
    $$props.class
  )}
  on:click
>
  <slot />
</Button>
