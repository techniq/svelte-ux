<script lang="ts">
  import Button from './Button.svelte';
  import Toggle from './Toggle.svelte';

  import { fade } from 'svelte/transition';
  import type { TransitionParams } from '../types/typeHelpers.js';
  import { getComponentSettings } from './settings.js';
  import type { ComponentProps } from 'svelte';

  const { defaults } = getComponentSettings('ToggleButton');

  interface Props {
    on?: boolean;
    transition?: typeof fade | false;
    transitionParams?: TransitionParams;
    buttonPlacement?: 'before' | 'after';
    children?: ComponentProps<typeof Toggle>['children'];
    toggle?: ComponentProps<typeof Toggle>['children'];
  }

  let {
    on = $bindable(false),
    transition = fade,
    transitionParams = {},
    buttonPlacement = 'before',
    children: childrenRender,
    toggle: toggleRender,
    ...rest
  }: Props & Omit<ComponentProps<typeof Button>, keyof Props> = $props();

  let restProps = $derived({ ...defaults, ...rest });
</script>

<Toggle bind:on>
  {#snippet children({ toggle, toggleOn, toggleOff })}
    {#if buttonPlacement === 'before'}
      <Button
        {...restProps}
        onclick={(e) => {
          toggle();
          restProps['onclick']?.(e);
        }}
      >
        {@render childrenRender?.({ on, toggle, toggleOn, toggleOff })}
      </Button>
    {/if}

    {#if transition}
      {#if on}
        <!-- Transition delays unmounting to allow children to transition (ex. Drawer/Dialog) -->
        <div transition:transition={transitionParams}>
          {@render toggleRender?.({ on, toggle, toggleOn, toggleOff })}
        </div>
      {/if}
    {:else if on}
      {@render toggleRender?.({ on, toggle, toggleOn, toggleOff })}
    {/if}

    {#if buttonPlacement === 'after'}
      <Button
        {...restProps}
        onclick={(e) => {
          toggle();
          restProps['onclick']?.(e);
        }}
      >
        {@render childrenRender?.({ on, toggle, toggleOn, toggleOff })}
      </Button>
    {/if}
  {/snippet}
</Toggle>
