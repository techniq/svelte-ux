<script lang="ts">
  import Checkbox from './Checkbox.svelte';

  export let checked: boolean;
  export let indeterminate = false;
  export let disabled = false;
</script>

<div class="grid grid-cols-[1fr,auto] py-2">
  <Checkbox bind:checked bind:indeterminate on:change {disabled}>
    <div class="ml-1 inline-block cursor-pointer text-sm text-gray-900">
      <slot />
    </div>
  </Checkbox>
  <slot name="actions" />
</div>
