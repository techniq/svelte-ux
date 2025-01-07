<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { mdiCheckboxBlankCircle } from '@mdi/js';
  import Icon from './Icon.svelte';
  import { uniqueId } from '../utils/string.js';
  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';

  interface Props {
    id?: string;
    name?: string;
    value?: any;
    group?: any;
    checked?: boolean;
    required?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    classes?: {
      root?: string;
      input?: string;
      radio?: string;
      label?: string;
      icon?: string;
    };
    class?: string;
    onchange?: HTMLInputAttributes['onchange'];
    children?: Snippet;
  }

  let {
    id = uniqueId('radio-'),
    name = '',
    value,
    group = $bindable(),
    checked = $bindable(false),
    required = false,
    disabled = false,
    fullWidth = false,
    size = 'sm',
    classes = {},
    class: className,
    onchange,
    children,
  }: Props = $props();
  const settingsClasses = getComponentClasses('Radio');

  $effect(() => {
    checked = group !== undefined ? group === value : checked;
  });
</script>

<div
  class={cls(
    'Radio',
    fullWidth ? 'flex' : 'inline-flex',
    'items-center',
    settingsClasses.root,
    classes.root,
    className
  )}
>
  <input
    {id}
    {name}
    type="radio"
    bind:group
    {onchange}
    {value}
    class={cls('input', 'peer appearance-none absolute', settingsClasses.input, classes.input)}
    {required}
    {disabled}
  />
  <label
    for={id}
    class={cls(
      'radio',
      'inline-grid place-items-center border-2 rounded-full bg-surface-100',
      'peer-disabled:opacity-50 transition-shadow duration-300',
      !disabled &&
        'peer-focus-visible:ring-2 peer-hover:border-primary peer-focus-visible:border-primary ring-primary/20 ring-offset-0',
      !checked && !disabled && 'peer-hover:bg-primary/10',
      checked
        ? disabled
          ? 'border-surface-content/50'
          : 'border-primary'
        : 'border-surface-content/50',
      settingsClasses.radio,
      classes.radio
    )}
  >
    <Icon
      path={mdiCheckboxBlankCircle}
      class={cls(
        'icon',
        'pointer-events-none transition-transform',
        disabled ? 'text-surface-content' : 'text-primary',
        checked ? 'scale-100' : 'scale-0',
        settingsClasses.icon,
        classes.icon
      )}
      size={{
        xs: '.75rem', // 12px
        sm: '.875rem', // 14px
        md: '1rem', // 16px
        lg: '1.125rem', // 18px
      }[size]}
    />
  </label>

  {#if children}
    <label
      for={id}
      class={cls(
        'label',
        'flex-1',
        'pl-1 peer-disabled:opacity-50',
        {
          xs: 'text-xs', // 12px
          sm: 'text-sm', // 14px
          md: 'text-md', // 16px
          lg: 'text-lg', // 18px
        }[size],
        settingsClasses.label,
        classes.label
      )}
    >
      {@render children()}
    </label>
  {/if}
</div>
