<script lang="ts">
  import type { ComponentProps } from '$lib/types';
  import { mdiMenuDown } from '@mdi/js';

  import { cls } from '../utils/styles';

  import Button from './Button.svelte';
  import Icon from './Icon.svelte';
  import Menu from './Menu.svelte';
  import MenuItem from './MenuItem.svelte';
  import { getComponentTheme } from './theme';

  export let options: Array<{ label: string; value: any; icon?: string }> = undefined;
  export let value = null;
  export let menuProps: ComponentProps<Menu> = { placement: 'bottom-start' };
  export let menuIcon = mdiMenuDown;
  $: selected = options?.find((x) => x.value === value);

  export let classes: {
    root?: string;
    label?: string;
    icon?: string;
  } = {};
  const theme = getComponentTheme('MenuButton');

  let open = false;
</script>

<Button
  on:click={() => (open = !open)}
  {...$$restProps}
  class={cls('MenuButton', theme.root, classes.root, $$props.class)}
>
  <slot name="selection">
    <span class={cls('truncate', theme.label, classes.label)}>
      {selected?.label ?? 'No selection'}
    </span>
  </slot>

  <Icon
    path={menuIcon}
    class={cls(
      'opacity-50 transform transition-all -mr-2 duration-300',
      open && '-rotate-180',
      theme.icon,
      classes.icon
    )}
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
