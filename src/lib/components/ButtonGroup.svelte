<script lang="ts">
  import { type ComponentProps, setContext } from 'svelte';
  import { cls } from '../utils/styles';
  import type Button from './Button.svelte';

  export let variant: ComponentProps<Button>['variant'];
  export let color: ComponentProps<Button>['color'] | undefined = undefined;
  export let rounded: ComponentProps<Button>['rounded'] | undefined = undefined;
  export let disabled: boolean = false;

  $: _class = cls(
    'ButtonGroup',
    'inline-flex',
    `variant-${variant}`, // used for per-variant group overrides in `style`
    disabled && 'opacity-50 pointer-events-none',

    /* Remove left/right rounding if button is not first/last, or if is a child of an element that is first/last (ex. wrapped in span for menu/tooltip/etc) */
    '[&_.button:not(:first-child)]:rounded-l-none',
    '[&_.button:not(:last-child)]:rounded-r-none',
    '[&_:not(:first-child)_.button]:rounded-l-none',
    '[&_:not(:last-child)_.button]:rounded-r-none',

    /* Overlap borders to allow selection styling per button.  Should be used with z-index */
    '[&.variant-outline_.button:not(:first-child)]:-ml-px',
    '[&.variant-outline_:not(:first-child)_.button]:-ml-px',
    '[&.variant-fill-outline_.button:not(:first-child)]:-ml-px',
    '[&.variant-fill-outline_:not(:first-child)_.button]:-ml-px',

    /* Add gap between buttons (text, filled) */
    '[&.variant-text_.button:not(:first-child)]:ml-px',
    '[&.variant-text_:not(:first-child)_.button]:ml-px',
    '[&.variant-fill_.button:not(:first-child)]:ml-px',
    '[&.variant-fill_:not(:first-child)_.button]:ml-px',
    '[&.variant-fill-light_.button:not(:first-child)]:ml-px',
    '[&.variant-fill-light_:not(:first-child)_.button]:ml-px',

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
