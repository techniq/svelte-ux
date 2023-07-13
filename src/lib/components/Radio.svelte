<script lang="ts">
  import { mdiCheckboxBlankCircle } from '@mdi/js';

  import Icon from './Icon.svelte';
  import { uniqueId } from '../utils/string';
  import { cls } from '../utils/styles';
  import { getComponentTheme } from './theme';

  export let id = uniqueId('radio-');
  export let name: string = '';
  export let value: any = undefined;
  export let group: any = undefined;
  export let checked: boolean = false;
  export let disabled: boolean = false;
  export let size: 'xs' | 'sm' | 'md' | 'lg' = 'sm';

  export let classes: {
    root?: string;
    checkbox?: string;
    label?: string;
    icon?: string;
  } = {};
  const theme = getComponentTheme('Radio');

  $: checked = group !== undefined ? group === value : checked;
</script>

<div class={cls('Radio', 'inline-flex items-center', theme.root, classes.root, $$props.class)}>
  <input
    {id}
    {name}
    type="radio"
    bind:group
    on:change
    {value}
    class="peer appearance-none absolute"
    {disabled}
  />
  <label
    for={id}
    class={cls(
      'inline-grid place-items-center border-2 rounded-full bg-white',
      'peer-disabled:opacity-50 transition-shadow duration-300',
      !disabled &&
        'peer-focus-visible:ring-2 peer-hover:border-accent-500 peer-focus-visible:border-accent-500 ring-accent-300 ring-offset-0',
      !checked && !disabled && 'peer-hover:bg-accent-100',
      checked ? (disabled ? ' border-gray-500' : 'border-accent-500') : 'border-gray-500',
      theme.checkbox,
      classes.checkbox
    )}
  >
    <Icon
      path={mdiCheckboxBlankCircle}
      class={cls(
        'pointer-events-none transition-transform',
        disabled ? 'text-gray-500' : 'text-accent-500',
        checked ? 'scale-100' : 'scale-0',
        theme.icon,
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
        'peer-disabled:opacity-50 pl-1',
        {
          xs: 'text-xs', // 12px
          sm: 'text-sm', // 14px
          md: 'text-md', // 16px
          lg: 'text-lg', // 18px
        }[size],
        theme.label,
        classes.label
      )}
    >
      <slot />
    </label>
  {/if}
</div>
