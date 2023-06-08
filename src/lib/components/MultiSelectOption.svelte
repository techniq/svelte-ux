<script lang="ts">
  import Checkbox from './Checkbox.svelte';
  import { cls } from '../utils/styles';

  export let checked: boolean;
  export let indeterminate = false;
  export let disabled = false;

  export let classes: {
    root?: string;
    checkbox?: string;
    container?: string;
  } = {};
</script>

<div
  class={cls('MultiSelectOption', 'grid grid-cols-[1fr,auto] py-2', classes.root, $$props.class)}
>
  <Checkbox bind:checked bind:indeterminate on:change {disabled} class={classes.checkbox}>
    <div class={cls('ml-1 inline-block cursor-pointer text-sm text-gray-900', classes.container)}>
      <slot />
    </div>
  </Checkbox>
  <slot name="actions" />
</div>
