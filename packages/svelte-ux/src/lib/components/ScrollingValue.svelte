<script lang="ts">
  import type { Snippet } from 'svelte';
  import { spring } from 'svelte/motion';
  import { cls } from '../utils/styles.js';
  import { modulo } from '../utils/number.js';
  import { getComponentClasses } from './theme.js';

  interface Props {
    value?: number;
    single?: boolean;
    format?: (value: number) => string | number;
    axis?: 'x' | 'y';
    classes?: {
      root?: string;
      value?: string;
    };
    class?: string;
    children?: Snippet<[{ value: number }]>;
  }

  let {
    value = 0,
    single = false,
    format = (value) => value,
    axis = 'y',
    classes = {},
    class: className,
    children,
  }: Props = $props();
  const settingsClasses = getComponentClasses('ScrollingValue');

  const displayValue = spring();
  // 	const displayValue = tweened(value, { duration: 1000, easing: bounceOut });
  $effect(() => {
    $displayValue = value;
  });

  let offset = $derived(modulo($displayValue, 1));

  let nextDisplayValue = $derived(Math.floor(single && $displayValue >= 9 ? 0 : $displayValue + 1));
  let currentDisplayValue = $derived(Math.floor($displayValue));
</script>

<div
  class={cls(
    'ScrollingValue',
    'inline-grid overflow-hidden',
    settingsClasses.root,
    classes.root,
    className
  )}
>
  <div
    class={cls('col-span-full row-span-full', settingsClasses.value, classes.value)}
    style:transform={axis === 'x'
      ? `translateX(${100 + 100 * -offset}%)`
      : `translateY(${-100 + 100 * offset}%)`}
  >
    {#if children}
      {@render children({ value: nextDisplayValue })}
    {:else}
      {format(nextDisplayValue)}
    {/if}
  </div>
  <div
    class={cls('col-span-full row-span-full', settingsClasses.value, classes.value)}
    style:transform={axis === 'x'
      ? `translateX(${100 * -offset}%)`
      : `translateY(${100 * offset}%)`}
  >
    {#if children}
      {@render children({ value: currentDisplayValue })}
    {:else}
      {format(currentDisplayValue)}
    {/if}
  </div>
</div>
