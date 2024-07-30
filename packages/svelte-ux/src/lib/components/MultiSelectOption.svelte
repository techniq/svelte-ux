<script lang="ts">
  import type { ComponentProps } from 'svelte';

  import Checkbox from './Checkbox.svelte';
  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';

  export let checked: boolean;
  export let indeterminate = false;
  export let disabled = false;

  export let classes: {
    root?: string;
    checkbox?: ComponentProps<Checkbox>['classes'];
    container?: string;
  } = {};
  const settingsClasses = getComponentClasses('MultiSelectOption');
</script>

<div
  class={cls(
    'MultiSelectOption',
    'grid grid-cols-[1fr,auto]',
    settingsClasses.root,
    classes.root,
    $$props.class
  )}
  role="option"
  aria-selected={checked}
>
  <Checkbox
    bind:checked
    bind:indeterminate
    on:change
    {disabled}
    classes={{
      root: 'px-2 rounded hover:bg-surface-content/5',
      label: 'py-2',
      ...settingsClasses.checkbox,
      ...classes.checkbox,
    }}
  >
    <div
      class={cls(
        'ml-1 inline-block text-sm text-surface-content',
        !disabled && 'cursor-pointer',
        settingsClasses.container,
        classes.container
      )}
    >
      <slot />
    </div>
  </Checkbox>
  <slot name="actions" />
</div>
