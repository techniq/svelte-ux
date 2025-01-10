<script lang="ts">
  import { slide, type TransitionConfig } from 'svelte/transition';
  import { mdiChevronDown } from '@mdi/js';
  import { cls } from '../utils/styles.js';

  import Icon from './Icon.svelte';
  import type { TransitionParams } from '../types/typeHelpers.js';
  import { getComponentClasses } from './theme.js';
  import type { Snippet } from 'svelte';
  import type { SvelteHTMLElements } from 'svelte/elements';

  const settingsClasses = getComponentClasses('Collapse');

  interface Props {
    name?: string;
    value?: any;
    group?: any;
    open?: boolean;
    popout?: boolean;
    disabled?: boolean;
    icon?: string | Snippet<[{ open: boolean }]>;
    transition?: (node: HTMLElement, params: TransitionParams) => TransitionConfig;
    transitionParams?: TransitionParams;
    classes?: {
      root?: string;
      trigger?: string;
      icon?: string;
      content?: string;
    };
    /**
     * Controls how first, last, and gap between are calculated
     *   - type: items are of the same type
     *   - parent: items share a common parent
     *   - group: closest element with 'group' class
     */
    list?: 'type' | 'parent' | 'group';
    onChange?: ({ open, name }: { open: boolean; name: string }) => void;
    trigger?: Snippet<[{ open: boolean }]>;
    children?: Snippet<[{ open: boolean }]>;
  }

  let {
    name = '',
    value,
    group = $bindable(),
    open = $bindable(false),
    popout = false,
    disabled = false,
    icon = mdiChevronDown,
    transition = slide,
    transitionParams = {},
    classes = {},
    class: className,
    list = 'parent',
    onChange,
    trigger,
    children,
    ...restProps
  }: Props & Omit<SvelteHTMLElements['div'], keyof Props> = $props();

  $effect(() => {
    open = group !== undefined ? group === value : open;
  });

  $effect(() => {
    onChange?.({ open, name });
  });
</script>

<div
  {...restProps}
  class={cls(
    'Collapse',
    popout && 'transition-all duration-all',
    popout && open && 'my-3',
    popout && list === 'type' && 'first-of-type:mt-0 last-of-type:mb-0',
    popout && list === 'parent' && 'first:mt-0 last:mb-0',
    popout && list === 'group' && 'group-first:mt-0 group-last:mb-0',
    settingsClasses.root,
    classes.root,
    className
  )}
  aria-expanded={open}
>
  <button
    type="button"
    class="flex items-center w-full text-left select-text focus:outline-none"
    {disabled}
    onclick={() => {
      open = !open;
      group = group === value ? undefined : value;
    }}
  >
    {#if trigger}
      {@render trigger({ open })}
    {:else}
      <span class={cls('flex-1', settingsClasses.trigger, classes.trigger)}>{name}</span>
    {/if}

    {#if typeof icon === 'function'}
      {@render icon({ open })}
    {:else}
      <div
        data-open={open}
        style:--duration="{transitionParams.duration ?? 300}ms"
        class={cls(
          'transition-all duration-[var(--duration)] transform',
          'data-[open=true]:-rotate-180',
          settingsClasses.icon,
          classes.icon
        )}
      >
        <Icon data={icon} />
      </div>
    {/if}
  </button>

  {#if open}
    <div
      transition:transition={transitionParams}
      class={cls(settingsClasses.content, classes.content)}
    >
      {@render children?.({ open })}
    </div>
  {/if}
</div>
