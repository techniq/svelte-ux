<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { ComponentProps } from '$lib/types';
  import { mdiMenuDown } from '@mdi/js';

  import { cls } from '../utils/styles';

  import Field from './Field.svelte';
  import Icon from './Icon.svelte';
  import Menu from './Menu.svelte';
  import MenuItem from './MenuItem.svelte';

  export let options: Array<{ label: string; value: any; icon?: string }>;
  export let value: any = null;
  export let menuProps: ComponentProps<Menu> | undefined = undefined;
  export let menuIcon = mdiMenuDown;
  $: selected = options?.find((x) => x.value === value);

  let open = false;

  const dispatch = createEventDispatcher();
  $: dispatch('change', { value });
</script>

<Field on:click={() => (open = !open)} class="cursor-pointer" {...$$restProps}>
  <slot name="selection">
    <div class="truncate text-sm">
      {selected?.label ?? 'No selection'}
    </div>
  </slot>

  <slot slot="prepend" name="prepend" />

  <span slot="append" class="flex items-center">
    <slot name="append" />

    <Icon
      path={menuIcon}
      class={cls('text-black/50 mr-1 transform transition-all duration-300', {
        '-rotate-180': open,
      })}
      on:click={() => (open = !open)}
    />
  </span>

  <Menu
    slot="fieldset"
    {open}
    on:close={() => {
      open = false;
    }}
    matchWidth
    {...menuProps}
  >
    <slot {options} {selected} close={() => (open = false)} setValue={(val) => (value = val)}>
      <menu>
        {#each options as option}
          <MenuItem icon={option.icon} on:click={() => (value = option.value)}>
            {option.label}
          </MenuItem>
        {/each}
      </menu>
    </slot>
  </Menu>
</Field>
