<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { mdiMinus, mdiPlus } from '@mdi/js';

  import { Button, TextField } from '.';

  export let value: number = 0;

  const dispatch = createEventDispatcher();

  $: dispatch('change', { value });
</script>

<TextField type="integer" bind:value align="center" class="w-24" {...$$restProps}>
  <div slot="prepend" class="flex">
    <Button icon={mdiMinus} on:click={() => (value -= 1)} size="sm" />
  </div>
  <div slot="append" class="flex">
    <Button icon={mdiPlus} on:click={() => (value += 1)} size="sm" />
  </div>
</TextField>
