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
    `variant-${variant}`, // used for per-variant group overrides in `style`
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
  .variant-outline :global(.button:not(:first-child)),
  .variant-outline :global(:not(:first-child) .button),
  .variant-fill-outline :global(.button:not(:first-child)),
  .variant-fill-outline :global(:not(:first-child) .button) {
    @apply ml-[-1px];
  }

  /* Add gap between buttons (text, filled) */
  .variant-text :global(.button:not(:first-child)),
  .variant-text :global(:not(:first-child) .button),
  .variant-fill :global(.button:not(:first-child)),
  .variant-fill :global(:not(:first-child) .button),
  .variant-fill-light :global(.button:not(:first-child)),
  .variant-fill-light :global(:not(:first-child) .button) {
    @apply ml-px;
  }
</style>
