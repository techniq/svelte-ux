<script lang="ts">
  import { mdiCheckboxBlankCircle } from '@mdi/js';

  import Icon from './Icon.svelte';
  import { uniqueId } from '@layerstack/utils';
  import { cls } from '@layerstack/tailwind';
  import { getComponentClasses } from './theme.js';

  export let id = uniqueId('radio-');
  export let name = '';
  export let value: any = undefined;
  export let group: any = undefined;
  export let checked = false;
  export let required = false;
  export let disabled = false;
  export let fullWidth = false;
  export let size: 'xs' | 'sm' | 'md' | 'lg' = 'sm';

  export let classes: {
    root?: string;
    input?: string;
    radio?: string;
    label?: string;
    icon?: string;
  } = {};
  const settingsClasses = getComponentClasses('Radio');

  $: checked = group !== undefined ? group === value : checked;
</script>

<div
  class={cls(
    'Radio',
    fullWidth ? 'flex' : 'inline-flex',
    'items-center',
    settingsClasses.root,
    classes.root,
    $$props.class
  )}
>
  <input
    {id}
    {name}
    type="radio"
    bind:group
    on:change
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

  {#if $$slots.default}
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
      <slot />
    </label>
  {/if}
</div>
