<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { slide } from 'svelte/transition';
  import clsx from 'clsx';
  import { mdiChevronDown } from '@mdi/js';

  import Icon from './Icon.svelte';

  const dispatch = createEventDispatcher();

  export let name = 'default';
  export let group = '';
  export let open = false;
  export let popout = false;
  export let disabled = false;

  /**
   * Controls how first, last, and gap between are calculated
   *   - type: items are of the same type
   *   - parent: items share a common parent
   *   - group: closest element with 'group' class
   */
  export let list: 'type' | 'parent' | 'group' = 'parent';

  $: if (open) {
    group = name;
  }
  $: active = group === name;
  $: dispatch('change', { open: active, name });
</script>

<div
  {...$$restProps}
  class={clsx(
    popout && 'transition-all duration-all',
    popout && active && 'my-3',
    popout && list === 'type' && 'first-of-type:mt-0 last-of-type:mb-0',
    popout && list === 'parent' && 'first:mt-0 last:mb-0',
    popout && list === 'group' && 'group-first:mt-0 group-last:mb-0',
    $$props.class
  )}
>
  <button
    class="flex items-center w-full text-left select-text focus:outline-none"
    class:cursor-default={disabled}
    on:click={() => {
      if (!disabled) {
        group = group === name ? '' : name;
      }
    }}
  >
    <slot name="trigger" {active}><span class="flex-1">{name}</span></slot>

    <slot name="icon" {active}>
      <div class="transition-all duration-300 transform" class:-rotate-180={active}>
        <Icon path={mdiChevronDown} />
      </div>
    </slot>
  </button>

  {#if active}
    <div transition:slide|local>
      <slot {active} />
    </div>
  {/if}
</div>
