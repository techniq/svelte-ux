<script lang="ts">
  import { type ComponentProps, setContext } from 'svelte';
  import { cls } from '../utils/styles';
  import type Button from './Button.svelte';

  export let variant: ComponentProps<Button>['variant'];
  export let color: ComponentProps<Button>['color'] | undefined = undefined;
  export let rounded: ComponentProps<Button>['rounded'] | undefined = undefined;
  export let disabled: boolean = false;

  $: _class = cls(
    // 'button-group', // TODO: Re-add once no longer conflict in another project
    'inline-flex',
    variant, // used for per-variant group overrides in `style`
    disabled && 'opacity-50 pointer-events-none',
    $$props.class
  );

  setContext('ButtonGroup', {
    variant,
    color,
    rounded,
  });
</script>

<div role="group" class={_class} on:keydown on:keyup on:keypress on:click>
  <slot />
</div>

<style lang="postcss">
  /* Sets if button is first/last, or if child of element that is first/last (ex. wrapped in span for menu/tooltip/etc) */
  [role='group'] :global(.button:not(:first-child)),
  [role='group'] :global(:not(:first-child) .button) {
    @apply rounded-l-none;
  }
  [role='group'] :global(.button:not(:last-child)),
  [role='group'] :global(:not(:last-child) .button) {
    @apply rounded-r-none;
  }

  /* Overlap borders to allow selection styling per button.  Should be used with z-index */
  .outlined :global(.button:not(:first-child)),
  .outlined :global(:not(:first-child) .button) {
    @apply ml-[-1px];
  }

  /* Add gap between buttons (text, filled) */
  .text :global(.button:not(:first-child)),
  .text :global(:not(:first-child) .button),
  .filled :global(.button:not(:first-child)),
  .filled :global(:not(:first-child) .button) {
    @apply ml-px;
  }
</style>
