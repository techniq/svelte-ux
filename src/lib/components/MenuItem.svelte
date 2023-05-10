<script lang="ts">
  import Button from './Button.svelte';
  import type { ComponentProps } from '../types';
  import { cls } from '../utils/styles';
  import { scrollIntoView as scrollIntoViewAction } from '../actions/scroll';
  import { setContext } from 'svelte';

  type ButtonProps = ComponentProps<Button>;

  export let icon: ButtonProps['icon'] = undefined;
  export let classes: ButtonProps['classes'] = {
    root: 'text-sm gap-3',
    icon: 'text-black/50',
  };
  export let scrollIntoView = false;
  export let disabled = false;

  // Clear ButtonGroup if set
  setContext('ButtonGroup', null);
</script>

<Button
  variant="none"
  {icon}
  {classes}
  fullWidth
  actions={(node) => [scrollIntoViewAction(node, { condition: scrollIntoView })]}
  {disabled}
  {...$$restProps}
  class={cls('text-left p-2 hover:bg-black/5', classes?.root, $$props.class)}
  on:click
>
  <slot />
</Button>
