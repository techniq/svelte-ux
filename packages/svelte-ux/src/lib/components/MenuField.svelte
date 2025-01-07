<script lang="ts">
  import { type ComponentProps, type Snippet } from 'svelte';
  import { mdiChevronLeft, mdiChevronRight, mdiMenuDown } from '@mdi/js';

  import { cls } from '../utils/styles.js';

  import Field from './Field.svelte';
  import Icon from './Icon.svelte';
  import Menu from './Menu.svelte';
  import MenuItem from './MenuItem.svelte';
  import Button from './Button.svelte';
  import type { MenuOption } from '../types/index.js';
  import { getComponentSettings } from './settings.js';

  const { classes: settingsClasses, defaults } = getComponentSettings('MenuField');

  let open = $state(false);
  interface Props {
    options?: MenuOption[];
    value?: any;
    menuProps?: ComponentProps<typeof Menu>;
    menuIcon?: string;
    /** If true, show left/right buttons to step through options */
    stepper?: boolean;
    classes?: ComponentProps<typeof Field>['classes'] & {
      option?: string;
      menuItem?: ComponentProps<typeof MenuItem>['classes'];
      menuIcon?: string;
      group?: string;
    };
    selected?: MenuOption;
    onChange?: (value?: any, option?: MenuOption) => void;
    selection?: Snippet;
    prepend?: Snippet;
    append?: Snippet;
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
    value = $bindable(),
    menuProps = {
      autoPlacement: true,
      resize: true,
    },
    menuIcon = mdiMenuDown,
    stepper = false,
    classes = {},
    selected = $bindable(),
    selection,
    onChange,
    prepend,
    append,
    children,
    ...rest
  }: Props & Omit<ComponentProps<typeof Field>, keyof Props> = $props();

  $effect(() => {
    selected = options?.find((x) => x.value === value);
  });

  let previous = $derived(() => {
    const index = options.findIndex((o) => o.value === value);
    if (index === 0 || index === -1) {
      // If first item, or no selected value yet, return last item
      return options[options.length - 1].value;
    } else {
      // Previous item
      return options[index - 1].value;
    }
  });

  let next = $derived(() => {
    const index = options.findIndex((x) => x.value === value);
    if (index === options.length - 1) {
      // First value
      return options[0].value;
    } else {
      // Next value
      return options[index + 1].value;
    }
  });

  $effect(() => {
    onChange?.(value, selected);
  });

  function setValue(val: any): void {
    value = val;
  }

  let restProps = $derived({ ...defaults, ...rest });
</script>

<Field
  class="cursor-pointer"
  {...restProps}
  classes={{ input: 'overflow-hidden', ...classes }}
  onclick={() => (open = !open)}
>
  {#if selection}
    {@render selection()}
  {:else}
    <div class="truncate text-sm">
      {selected?.label ?? 'No selection'}
    </div>
  {/if}

  {#snippet prepend()}
    <span>
      {#if stepper}
        <Button
          icon={mdiChevronLeft}
          onclick={() => (value = previous())}
          class="mr-2"
          size="sm"
        />
      {/if}
      {@render prepend?.()}
    </span>
  {/snippet}

  {#snippet append()}
    <span class="flex items-center">
      {@render append?.()}

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
        onclick={() => (open = !open)}
      />

      {#if stepper}
        <Button icon={mdiChevronRight} onclick={() => (value = next())} class="mr-2" size="sm" />
      {/if}
    </span>
  {/snippet}

  {#snippet root()}
    <Menu
      {open}
      onClose={() => {
        open = false;
      }}
      matchWidth
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
              onclick={() => (value = option.value)}
            >
              {option.label}
            </MenuItem>
          {/each}
        </menu>
      {/if}
    </Menu>
  {/snippet}
</Field>
