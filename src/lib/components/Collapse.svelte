<script>
  import { createEventDispatcher } from 'svelte';
  import { slide } from 'svelte/transition';
  import { mdiChevronDown } from '@mdi/js';

  import Icon from './Icon.svelte';

  const dispatch = createEventDispatcher();

  export let name = 'default';
  export let group = '';
  export let open = false;
  export let popout = false;
  export let nested = false;
  export let disabled = false;

  $: if (open) {
    group = name;
  }
  $: active = group === name;
  $: dispatch('change', { open: active, name });
</script>

<div
  class={$$props.class}
  class:transition-all={popout}
  class:duration-all={popout}
  class:first:mt-0={popout && !nested}
  class:last:mb-0={popout && !nested}
  class:group-first:mt-0={popout && nested}
  class:group-last:mb-0={popout && nested}
  class:my-3={popout && active}
  style={$$props.style}
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
    <div transition:slide>
      <slot {active} />
    </div>
  {/if}
</div>
