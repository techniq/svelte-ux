<script lang="ts">
  import { mdiCheck, mdiMinus } from '@mdi/js';

  import Icon from './Icon.svelte';
  import { uniqueId } from '../utils/string';
  import { cls } from '../utils/styles';
  import { getComponentClasses } from './theme';

  export let id = uniqueId('checkbox-');
  export let name = '';
  export let value: any = undefined;
  export let checked: boolean = false;
  export let group: any[] | null = null;
  export let indeterminate: boolean = false;
  export let disabled: boolean = false;
  export let circle: boolean = false;
  export let size: 'xs' | 'sm' | 'md' | 'lg' = 'sm';

  export let classes: {
    root?: string;
    checkbox?: string;
    label?: string;
    icon?: string;
  } = {};
  const settingsClasses = getComponentClasses('Checkbox');

  // Update when group changes.  Separate function to break reactivity loop
  $: if (group !== null) {
    groupCheck();
  }
  function groupCheck() {
    checked = group.includes(value);
  }

  // Update group when checkbox changes
  function onChange() {
    if (group !== null) {
      let inGroup = group.includes(value);
      if (!inGroup) {
        // Add to group
        group = [...group, value];
      } else {
        // Remove from group
        group = group.filter((v) => v != value);
      }
    }
  }
</script>

<div class={cls('Checkbox', 'inline-flex items-center', settingsClasses.root, classes.root, $$props.class)}>
  <input
    {id}
    {name}
    type="checkbox"
    bind:checked
    on:change={onChange}
    on:change
    {value}
    class="peer appearance-none absolute"
    {disabled}
  />
  <label
    for={id}
    class={cls(
      'inline-grid place-items-center border-2',
      circle ? 'rounded-full' : 'rounded',
      'peer-disabled:opacity-50 transition-shadow duration-300',
      !disabled &&
        'peer-hover:border-primary peer-focus-visible:border-primary peer-focus-visible:ring-2 ring-primary/60 ring-offset-1',
      !checked && !disabled && 'peer-hover:bg-primary/10',
      checked
        ? disabled
          ? 'bg-gray-500 border-gray-500'
          : 'bg-primary border-primary'
        : 'border-gray-500',
      settingsClasses.checkbox,
      classes.checkbox
    )}
  >
    <Icon
      path={indeterminate ? mdiMinus : mdiCheck}
      class={cls(
        'pointer-events-none text-primary-content transition-transform',
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
        'peer-disabled:opacity-50 pl-1',
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
