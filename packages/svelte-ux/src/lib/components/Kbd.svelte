<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cls } from '../utils/styles.js';

  interface Props {
    // keys
    control?: boolean;
    option?: boolean;
    shift?: boolean;
    command?: boolean;
    variant?: 'filled' | 'none';
    class?: string;
    children?: Snippet;
  }

  let {
    control = false,
    option = false,
    shift = false,
    command = false,
    variant = 'filled',
    class: className,
    children,
  }: Props = $props();
</script>

<kbd
  class={cls(
    'font-sans inline-flex gap-1',
    variant === 'filled' &&
      'border border-b-2 text-surface-content bg-surface-200 rounded py-1 px-1',
    className
  )}
>
  {#if control}
    <abbr title="Control" class="no-underline">⌃</abbr>
  {/if}

  {#if option}
    <abbr title="Option" class="no-underline">⌥</abbr>
  {/if}

  {#if shift}
    <abbr title="Shift" class="no-underline">⇧</abbr>
  {/if}

  {#if command}
    <abbr title="Command" class="no-underline">⌘</abbr>
  {/if}

  {@render children?.()}
</kbd>
