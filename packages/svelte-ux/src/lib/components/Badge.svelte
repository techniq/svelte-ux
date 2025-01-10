<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';

  interface Props {
    value?: number | Snippet;
    small?: boolean;
    circle?: boolean;
    dot?: boolean;
    class?: string;
    placement?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    children?: Snippet;
  }

  let {
    value,
    small = false,
    circle = false,
    dot = false,
    class: className,
    placement = 'top-right',
    children,
  }: Props = $props();

  let valueIsSnippet = $derived(typeof value === 'function');

  const settingsClasses = getComponentClasses('Badge');
</script>

<div class="inline-grid grid-stack">
  {@render children?.()}
  <div
    class={cls(
      'Badge',
      'rounded-full flex items-center justify-center transform transition-transform',

      !valueIsSnippet && 'bg-primary text-primary-content',

      {
        'self-start': placement.startsWith('top'),
        'self-end': placement.startsWith('bottom'),
        'justify-self-start': placement.endsWith('left'),
        'justify-self-end': placement.endsWith('right'),
      },

      dot
        ? {
            'h-2 w-2': small,
            'h-3 w-3': !small,
          }
        : {
            'h-4 w-4 text-[0.6rem]': small,
            'h-5 w-5 text-xs': !small,
          },

      dot
        ? {
            'translate-y-[40%]': small && placement.startsWith('top'),
            'translate-y-[-40%]': small && placement.startsWith('bottom'),
            'translate-x-[40%]': small && placement.endsWith('left'),
            'translate-x-[-40%]': small && placement.endsWith('right'),
            'translate-y-[10%]': !small && placement.startsWith('top'),
            'translate-y-[-10%]': !small && placement.startsWith('bottom'),
            'translate-x-[10%]': !small && placement.endsWith('left'),
            'translate-x-[-10%]': !small && placement.endsWith('right'),
          }
        : circle
          ? {
              'translate-y-[-10%]': small && placement.startsWith('top'),
              'translate-y-[10%]': small && placement.startsWith('bottom'),
              'translate-x-[-10%]': small && placement.endsWith('left'),
              'translate-x-[10%]': small && placement.endsWith('right'),
              'translate-y-[-20%]': !small && placement.startsWith('top'),
              'translate-y-[20%]': !small && placement.startsWith('bottom'),
              'translate-x-[-20%]': !small && placement.endsWith('left'),
              'translate-x-[20%]': !small && placement.endsWith('right'),
            }
          : {
              '-translate-y-1/3': placement.startsWith('top'),
              'translate-y-1/3': placement.startsWith('bottom'),
              '-translate-x-1/3': placement.endsWith('left'),
              'translate-x-1/3': placement.endsWith('right'),
            },

      {
        'scale-0': (value ?? 0) === 0,
        'scale-100': (value ?? 0) !== 0,
      },
      settingsClasses.root,
      className
    )}
  >
    {#if valueIsSnippet}
      {/* @ts-ignore */ null}
      {@render value()}
    {:else if !dot}
      {value || ''}
    {/if}
  </div>
</div>
