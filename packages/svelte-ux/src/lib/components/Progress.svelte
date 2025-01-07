<script lang="ts">
  import type { HTMLProgressAttributes } from 'svelte/elements';
  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';

  interface Props {
    value: number | null;
    max?: number;
  }

  let {
    value = $bindable(),
    max,
    class: className,
    ...restProps
  }: Props & Omit<HTMLProgressAttributes, keyof Props> = $props();

  const settingsClasses = getComponentClasses('Progress');
</script>

<progress
  {value}
  {max}
  {...restProps}
  class={cls(
    'Progress',
    'h-2 w-full',

    // bar color
    '[--color:theme(colors.primary)]',
    '[&::-webkit-progress-value]:bg-[--color]',
    '[&::-moz-progress-bar]:bg-[--color]',

    // track color
    '[--track-color:theme(colors.surface-200)]',
    '[&::-webkit-progress-bar]:bg-[--track-color]',
    'bg-[--track-color]',

    // rounded
    '[&::-webkit-progress-value]:rounded-full',
    '[&::-moz-progress-bar]:rounded-full',
    '[&::-webkit-progress-bar]:rounded-full',
    'rounded-full',

    settingsClasses.root,
    className
  )}
>
</progress>
