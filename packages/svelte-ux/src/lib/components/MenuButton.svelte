<script lang="ts">
  import { type ComponentProps, type Snippet } from 'svelte';
  import { getComponentSettings } from './settings.js';
  import { mdiMenuDown } from '@mdi/js';

  import { cls } from '../utils/styles.js';

  import Button from './Button.svelte';
  import Icon from './Icon.svelte';
  import Menu from './Menu.svelte';
  import MenuItem from './MenuItem.svelte';
  import type { MenuOption } from '../types/index.js';

  const { classes: settingsClasses, defaults } = getComponentSettings('MenuButton');

  interface Props {
    options?: MenuOption[];
    value?: any;
    menuProps?: ComponentProps<typeof Menu>;
    menuIcon?: string | null;
    classes?: {
      root?: string;
      label?: string;
      icon?: string;
    };
    class?: string;
    onChange?: ({ option, value }: { option: MenuOption; value: any }) => void;
    selection?: Snippet<[{ value?: MenuOption }]>;
    children?: Snippet<
      [
        {
          options: MenuOption[];
          selected?: MenuOption;
          close: () => boolean;
          setValue: (value: any) => void;
        },
      ]
    >;
  }

  let {
    options = [],
    value = $bindable(null),
    menuProps = { placement: 'bottom-start' },
    menuIcon = mdiMenuDown,
    classes = {},
    class: className,
    onChange,
    selection,
    children,
    ...rest
  }: Props & Omit<ComponentProps<typeof Button>, keyof Props> = $props();

  let open = $state(false);

  function setValue(val: typeof value) {
    value = val;
  }
  let selected = $derived(options?.find((x) => x.value === value));
  let restProps = $derived({ ...defaults, ...rest });
</script>

<Button
  onclick={() => (open = !open)}
  {...restProps}
  class={cls('MenuButton', settingsClasses.root, classes.root, className)}
>
  {#if selection}
    {@render selection({ value: selected })}
  {:else}
    <span class={cls('truncate', settingsClasses.label, classes.label)}>
      {selected?.label ?? 'No selection'}
    </span>
  {/if}

  {#if menuIcon}
    <Icon
      path={menuIcon}
      class={cls(
        'opacity-50 transform transition-all -mr-2 duration-300',
        open && '-rotate-180',
        settingsClasses.icon,
        classes.icon
      )}
    />
  {/if}

  <Menu
    {open}
    onClose={() => {
      open = false;
    }}
    {...menuProps}
  >
    {#if children}
      {@render children({
        options,
        selected,
        close: () => (open = false),
        setValue,
      })}
    {:else}
      <menu class="group p-1">
        {#each options as option}
          <MenuItem
            icon={option.icon}
            selected={option.value === value}
            onclick={() => {
              value = option.value;
              onChange?.({ option, value });
            }}
            disabled={option.disabled}
          >
            {option.label}
          </MenuItem>
        {/each}
      </menu>
    {/if}
  </Menu>
</Button>
