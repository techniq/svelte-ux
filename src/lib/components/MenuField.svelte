<script lang="ts">
  import type { ComponentProps } from '$lib/types';
  import { mdiMenuDown } from '@mdi/js';
  import clsx from 'clsx';

  import Field from './Field.svelte';
  import Icon from './Icon.svelte';
  import Menu from './Menu.svelte';

  export let options: Array<{ label: string; value: any; icon?: string }> = undefined;
  export let value = null;
  export let menuProps: ComponentProps<Menu> = undefined;
  export let menuIcon = mdiMenuDown;
  $: selected = options?.find((x) => x.value === value);

  let open = false;
</script>

<Field on:click={() => (open = !open)} class="cursor-pointer" {...$$restProps}>
  <slot name="selection">
    <div class="w-full whitespace-nowrap text-sm ">
      {selected?.label ?? 'No selection'}
    </div>
  </slot>

  <slot slot="prepend" name="prepend" />

  <span slot="append" class="flex items-center">
    <slot name="append" />

    <Icon
      path={menuIcon}
      class={clsx('text-black/50 mr-1 transform transition-all duration-300', {
        '-rotate-180': open,
      })}
      on:click={() => (open = !open)}
    />
  </span>

  <Menu slot="fieldset" {open} on:close={() => (open = false)} matchWidth {...menuProps}>
    <slot {options} {selected} setValue={(val) => (value = val)}>
      <menu>
        {#each options as option}
          <li
            class="cursor-pointer p-2 text-sm hover:bg-black/5 flex gap-2"
            on:click={() => (value = option.value)}
          >
            {#if option.icon}
              <Icon path={option.icon} class="text-black/50" />
            {/if}
            {option.label}
          </li>
        {/each}
      </menu>
    </slot>
  </Menu>
</Field>
