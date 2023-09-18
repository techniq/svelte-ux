<script lang="ts">
  import Button from './Button.svelte';
  import Toggle from './Toggle.svelte';

  import { fade } from 'svelte/transition';
  import type { TransitionParams } from '$lib/types';

  export let on = false;
  export let transition: typeof fade | false = fade;
  export let transitionParams: TransitionParams = {};
  export let buttonPlacement: 'before' | 'after' = 'before';
</script>

<Toggle bind:on let:toggle let:toggleOn let:toggleOff>
  {#if buttonPlacement === 'before'}
    <Button {...$$restProps} on:click={toggle} on:click>
      <slot {on} {toggle} {toggleOn} {toggleOff} />
    </Button>
  {/if}

  <!-- Transition delays unmount to allow children to transition (ex. Drawer/Dialog) -->
  {#if transition}
    {#if on}
      <div transition:transition={transitionParams}>
        <slot name="toggle" {on} {toggle} {toggleOn} {toggleOff} />
      </div>
    {/if}
  {:else if on}
    <slot name="toggle" {on} {toggle} {toggleOn} {toggleOff} />
  {/if}

  {#if buttonPlacement === 'after'}
    <Button {...$$restProps} on:click={toggle} on:click>
      <slot {on} {toggle} {toggleOn} {toggleOff} />
    </Button>
  {/if}
</Toggle>
