<script lang="ts">
  import { cls } from '@layerstack/tailwind';

  // keys
  export let control = false;
  export let option = false;
  export let shift = false;
  export let command = false;

  export let variant: 'filled' | 'none' = 'filled';

  let className: string | undefined = undefined;
  export { className as class };
</script>

<kbd
  class={cls(
    'font-sans inline-flex gap-1',
    variant === 'filled' &&
      'border border-b-2 text-surface-content bg-surface-200 rounded-sm py-1 px-1',
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

  <slot />
</kbd>
