<script lang="ts">
  import { createEventDispatcher, type ComponentProps } from 'svelte';
  import { getSettings, getComponentSettings } from './settings.js';

  import { cls } from '@layerstack/tailwind';

  import Button from './Button.svelte';
  import Icon from './Icon.svelte';
  import Menu from './Menu.svelte';
  import MenuItem from './MenuItem.svelte';
  import type { IconProp, MenuOption } from '../types/index.js';
  import { asIconData } from '$lib/utils/icons.js';

  const dispatch = createEventDispatcher<{ change: { value: any; option: MenuOption } }>();

  const { icons } = getSettings();
  const { classes: settingsClasses, defaults } = getComponentSettings('MenuButton');

  export let options: MenuOption[] = [];
  export let value: any = null;
  export let menuProps: ComponentProps<Menu> = { placement: 'bottom-start' };
  export let menuIcon: IconProp | false | null = icons.chevronDown;
  $: selected = options?.find((x) => x.value === value);

  let className: string | undefined = undefined;
  export { className as class };

  export let classes: {
    root?: string;
    label?: string;
    icon?: string;
  } = {};

  let open = false;

  $: restProps = { ...defaults, ...$$restProps };

  function setValue(val: typeof value) {
    value = val;
  }
</script>

<Button
  on:click={() => (open = !open)}
  {...restProps}
  class={cls('MenuButton', settingsClasses.root, classes.root, className)}
>
  <slot name="selection" value={selected}>
    <span class={cls('truncate', settingsClasses.label, classes.label)}>
      {selected?.label ?? 'No selection'}
    </span>
  </slot>

  {#if menuIcon}
    {#if typeof menuIcon === 'function'}
      <!-- Component, such as unplugin-icons -->
      <Icon
        data={menuIcon}
        class={cls(
          'opacity-50 transform transition-all -mr-2 duration-300',
          open && '-rotate-180',
          settingsClasses.icon,
          classes.icon
        )}
      />
    {:else if typeof menuIcon === 'string' || 'icon' in menuIcon}
      <!-- font path/url/etc or font-awesome IconDefinition -->
      <Icon
        data={asIconData(menuIcon)}
        class={cls(
          'opacity-50 transform transition-all -mr-2 duration-300',
          open && '-rotate-180',
          settingsClasses.icon,
          classes.icon
        )}
      />
    {/if}
  {/if}

  <Menu
    {open}
    on:close={() => {
      open = false;
    }}
    {...menuProps}
  >
    <slot {options} {selected} close={() => (open = false)} {setValue}>
      <menu class="group p-1">
        {#each options as option}
          <MenuItem
            icon={option.icon}
            selected={option.value === value}
            on:click={() => {
              value = option.value;
              dispatch('change', { option, value });
            }}
            disabled={option.disabled}
          >
            {option.label}
          </MenuItem>
        {/each}
      </menu>
    </slot>
  </Menu>
</Button>
