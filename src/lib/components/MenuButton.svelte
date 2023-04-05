<script lang="ts">
  import type { ComponentProps } from '$lib/types';
  import { mdiMenuDown } from '@mdi/js';

  import { cls } from '../utils/styles';

  import Button from './Button.svelte';
  import Icon from './Icon.svelte';
  import Menu from './Menu.svelte';
  import MenuItem from './MenuItem.svelte';

  export let options: Array<{ label: string; value: any; icon?: string }> = undefined;
  export let value = null;
  export let menuProps: ComponentProps<Menu> = { placement: 'bottom-start' };
  export let menuIcon = mdiMenuDown;
  $: selected = options?.find((x) => x.value === value);

  let open = false;
</script>

<Button on:click={() => (open = !open)} {...$$restProps}>
  <slot name="selection">
    <span class="truncate text-sm">
      {selected?.label ?? 'No selection'}
    </span>
  </slot>

  <Icon
    path={menuIcon}
    class={cls('opacity-50 transform transition-all -mr-2 duration-300', {
      '-rotate-180': open,
    })}
  />

  <Menu
    {open}
    on:close={() => {
      open = false;
    }}
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
</Button>
