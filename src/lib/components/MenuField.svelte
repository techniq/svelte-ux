<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { ComponentProps } from '$lib/types';
  import { mdiChevronLeft, mdiChevronRight, mdiMenuDown } from '@mdi/js';

  import { cls } from '../utils/styles';

  import Field from './Field.svelte';
  import Icon from './Icon.svelte';
  import Menu from './Menu.svelte';
  import MenuItem from './MenuItem.svelte';
  import Button from './Button.svelte';
  import { getComponentTheme } from './theme';

  type Options = Array<{ label: string; value: any; icon?: string; group?: string }>;

  export let options: Options;
  export let value: any = null;
  export let menuProps: ComponentProps<Menu> | undefined = undefined;
  export let menuIcon = mdiMenuDown;
  /** If true, show left/right buttons to step through options */
  export let stepper = false;

  export let classes: ComponentProps<Field>['classes'] & {
    menuIcon?: string;
    group?: string;
  } = {};
  const theme = getComponentTheme('MenuField');

  let open = false;
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

  const dispatch = createEventDispatcher();
  $: dispatch('change', { value });
</script>

<Field
  class="cursor-pointer"
  {...$$restProps}
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
        'text-black/50 mr-1 transform transition-all duration-300',
        {
          '-rotate-180': open,
        },
        theme.menuIcon,
        classes.menuIcon
      )}
      on:click={() => (open = !open)}
    />

    {#if stepper}
      <Button icon={mdiChevronRight} on:click={() => (value = next())} class="mr-2" size="sm" />
    {/if}
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
        {#each options as option, index}
          {@const previousOption = options[index - 1]}
          {#if option.group && option.group !== previousOption?.group}
            <div
              class={cls(
                'group-header text-xs leading-8 tracking-widest text-black/50 px-2',
                theme.group,
                classes.group
              )}
            >
              {option.group}
            </div>
          {/if}

          <MenuItem icon={option.icon} on:click={() => (value = option.value)}>
            {option.label}
          </MenuItem>
        {/each}
      </menu>
    </slot>
  </Menu>
</Field>
