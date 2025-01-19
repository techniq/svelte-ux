<script lang="ts">
  import { createEventDispatcher, type ComponentProps } from 'svelte';
  import { mdiChevronLeft, mdiChevronRight, mdiMenuDown } from '@mdi/js';

  import { cls } from '@layerstack/tailwind';

  import Field from './Field.svelte';
  import Icon from './Icon.svelte';
  import Menu from './Menu.svelte';
  import MenuItem from './MenuItem.svelte';
  import Button from './Button.svelte';
  import type { MenuOption } from '../types/index.js';
  import { getComponentSettings } from './settings.js';

  const { classes: settingsClasses, defaults } = getComponentSettings('MenuField');

  export let options: MenuOption[] = [];
  export let value: any = null;
  export let menuProps: ComponentProps<Menu> | undefined = {
    autoPlacement: true,
    resize: true,
  };
  export let menuIcon = mdiMenuDown;
  /** If true, show left/right buttons to step through options */
  export let stepper = false;

  export let classes: ComponentProps<Field>['classes'] & {
    option?: string;
    menuItem?: ComponentProps<MenuItem>['classes'];
    menuIcon?: string;
    group?: string;
  } = {};

  let open = false;
  export let selected: any = undefined;
  $: selected = options?.find((x) => x.value === value);

  $: previous = () => {
    const index = options.findIndex((o) => o.value === value);
    if (index === 0 || index === -1) {
      // If first item, or no selected value yet, return last item
      return options[options.length - 1].value;
    } else {
      // Previous item
      return options[index - 1].value;
    }
  };

  $: next = () => {
    const index = options.findIndex((x) => x.value === value);
    if (index === options.length - 1) {
      // First value
      return options[0].value;
    } else {
      // Next value
      return options[index + 1].value;
    }
  };

  const dispatch = createEventDispatcher<{ change: { value: any; option: MenuOption } }>();
  $: dispatch('change', { value, option: selected });

  function setValue(val: any): void {
    value = val;
  }

  $: restProps = { ...defaults, ...$$restProps };
</script>

<Field
  class="cursor-pointer"
  {...restProps}
  classes={{ input: 'overflow-hidden', ...$$props.classes }}
  on:click={() => (open = !open)}
>
  <slot name="selection">
    <div class="truncate text-sm">
      {selected?.label ?? 'No selection'}
    </div>
  </slot>

  <span slot="prepend">
    {#if stepper}
      <Button icon={mdiChevronLeft} on:click={() => (value = previous())} class="mr-2" size="sm" />
    {/if}
    <slot name="prepend" />
  </span>

  <span slot="append" class="flex items-center">
    <slot name="append" />

    <Icon
      path={menuIcon}
      class={cls(
        'text-surface-content/50 mr-1 transform transition-all duration-300',
        {
          '-rotate-180': open,
        },
        settingsClasses.menuIcon,
        classes.menuIcon
      )}
      on:click={() => (open = !open)}
    />

    {#if stepper}
      <Button icon={mdiChevronRight} on:click={() => (value = next())} class="mr-2" size="sm" />
    {/if}
  </span>

  <Menu
    slot="root"
    {open}
    on:close={() => {
      open = false;
    }}
    matchWidth
    {...menuProps}
  >
    <slot {options} {selected} close={() => (open = false)} {setValue}>
      <menu class="group p-1">
        {#each options as option, index (`${option.group}-${option.value}`)}
          {@const previousOption = options[index - 1]}
          {#if option.group && option.group !== previousOption?.group}
            <div
              class={cls(
                'group-header text-xs leading-8 tracking-widest text-surface-content/50 px-2',
                settingsClasses.group,
                classes.group
              )}
            >
              {option.group}
            </div>
          {/if}

          <MenuItem
            icon={option.icon}
            selected={option.value === value}
            class={cls(option.group ? 'px-4' : 'px-2', settingsClasses.option, classes.option)}
            classes={classes.menuItem}
            disabled={option.disabled}
            on:click={() => (value = option.value)}
          >
            {option.label}
          </MenuItem>
        {/each}
      </menu>
    </slot>
  </Menu>
</Field>
