<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { slide } from 'svelte/transition';
  import { mdiChevronDown } from '@mdi/js';
  import { cls } from '@layerstack/tailwind';

  import Icon from './Icon.svelte';
  import type { TransitionParams } from '../types/index.js';
  import { getComponentClasses } from './theme.js';

  /**
   * @slot {{ active: number }} trigger - Primary content to trigger the show/hide
   */

  const dispatch = createEventDispatcher();

  export let name = '';
  export let value: any = undefined;
  export let group: any = undefined;
  export let open = false;
  export let popout = false;
  export let disabled = false;
  export let icon = mdiChevronDown;

  export let transition = slide;
  export let transitionParams: TransitionParams = {};

  export let classes: {
    root?: string;
    trigger?: string;
    icon?: string;
    content?: string;
  } = {};
  const settingsClasses = getComponentClasses('Collapse');

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
    'Collapse',
    popout && 'transition-all duration-all',
    popout && open && 'my-3',
    popout && list === 'type' && 'first-of-type:mt-0 last-of-type:mb-0',
    popout && list === 'parent' && 'first:mt-0 last:mb-0',
    popout && list === 'group' && 'group-first:mt-0 group-last:mb-0',
    settingsClasses.root,
    classes.root,
    $$props.class
  )}
  aria-expanded={open}
>
  <button
    type="button"
    class="flex items-center w-full text-left select-text focus:outline-none"
    {disabled}
    on:click={() => {
      open = !open;
      group = group === value ? undefined : value;
    }}
  >
    <slot name="trigger" {open}
      ><span class={cls('flex-1', settingsClasses.trigger, classes.trigger)}>{name}</span></slot
    >

    <slot name="icon" {open}>
      <div
        data-open={open}
        style:--duration="{transitionParams.duration ?? 300}ms"
        class={cls(
          'transition-all duration-[var(--duration)] transform',
          'data-[open=true]:-rotate-180',
          settingsClasses.icon,
          classes.icon
        )}
      >
        <Icon data={icon} />
      </div>
    </slot>
  </button>

  {#if open}
    <div
      transition:transition={transitionParams}
      class={cls(settingsClasses.content, classes.content)}
    >
      <slot {open} />
    </div>
  {/if}
</div>
