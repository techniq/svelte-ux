<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { mdiMinus, mdiPlus } from '@mdi/js';

  import { Button, TextField } from '.';
  import { selectOnFocus } from '$lib/actions/input';

  export let value: number = 0;
  export let min: number | undefined = undefined;
  export let max: number | undefined = undefined;

  const dispatch = createEventDispatcher();

  $: dispatch('change', { value });
</script>

<TextField
  type="integer"
  bind:value
  align="center"
  class="NumberStepper w-24"
  actions={(node) => [selectOnFocus(node)]}
  {...$$restProps}
>
  <div slot="prepend" class="flex">
    <Button
      icon={mdiMinus}
      on:click={() => (value -= 1)}
      size="sm"
      disabled={min != null && value <= min}
    />
  </div>
  <div slot="append" class="flex">
    <Button
      icon={mdiPlus}
      on:click={() => (value += 1)}
      size="sm"
      disabled={max != null && value >= max}
    />
  </div>
</TextField>
