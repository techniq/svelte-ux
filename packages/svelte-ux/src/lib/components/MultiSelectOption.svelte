<script lang="ts">
  import Checkbox from './Checkbox.svelte';
  import { cls } from '../utils/styles';
  import { getComponentTheme } from './theme';

  export let checked: boolean;
  export let indeterminate = false;
  export let disabled = false;

  export let classes: {
    root?: string;
    checkbox?: string;
    container?: string;
  } = {};
  const theme = getComponentTheme('MultiSelectOption');
</script>

<div
  class={cls(
    'MultiSelectOption',
    'grid grid-cols-[1fr,auto] py-2',
    theme.root,
    classes.root,
    $$props.class
  )}
>
  <Checkbox
    bind:checked
    bind:indeterminate
    on:change
    {disabled}
    class={cls(theme.checkbox, classes.checkbox)}
  >
    <div
      class={cls(
        'ml-1 inline-block cursor-pointer text-sm text-surface-content',
        theme.container,
        classes.container
      )}
    >
      <slot />
    </div>
  </Checkbox>
  <slot name="actions" />
</div>
