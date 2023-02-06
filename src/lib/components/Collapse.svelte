<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { slide } from 'svelte/transition';
  import { mdiChevronDown } from '@mdi/js';
  import { cls } from '../utils/styles';

  import Icon from './Icon.svelte';
  import type { TransitionParams } from '$lib/types';

  /**
   * @slot {{ active: number }} trigger - Primary content to trigger the show/hide
   */

  const dispatch = createEventDispatcher();

  export let name = '';
  export let value = undefined;
  export let group = undefined;
  export let open = false;
  export let popout = false;
  export let disabled = false;

  export let transition = slide;
  export let transitionParams: TransitionParams = {};

  /**
   * Controls how first, last, and gap between are calculated
   *   - type: items are of the same type
   *   - parent: items share a common parent
   *   - group: closest element with 'group' class
   */
  export let list: 'type' | 'parent' | 'group' = 'parent';

  $: open = group !== undefined ? group === value : open;
  $: dispatch('change', { open, name });
</script>

<div
  {...$$restProps}
  class={cls(
    popout && 'transition-all duration-all',
    popout && open && 'my-3',
    popout && list === 'type' && 'first-of-type:mt-0 last-of-type:mb-0',
    popout && list === 'parent' && 'first:mt-0 last:mb-0',
    popout && list === 'group' && 'group-first:mt-0 group-last:mb-0',
    $$props.class
  )}
>
  <button
    type="button"
    class="flex items-center w-full text-left select-text focus:outline-none"
    class:cursor-default={disabled}
    on:click={() => {
      if (!disabled) {
        open = !open;
        group = group === value ? undefined : value;
      }
    }}
  >
    <slot name="trigger" {open}><span class="flex-1">{name}</span></slot>

    <slot name="icon" {open}>
      <div
        style:--duration="{transitionParams.duration ?? 300}ms"
        class="transition-all duration-[var(--duration)] transform"
        class:-rotate-180={open}
      >
        <Icon path={mdiChevronDown} />
      </div>
    </slot>
  </button>

  {#if open}
    <div transition:transition|local={transitionParams}>
      <slot {open} />
    </div>
  {/if}
</div>
