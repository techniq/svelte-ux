<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { mdiMinus, mdiPlus } from '@mdi/js';

  import Button from './Button.svelte';
  import TextField from './TextField.svelte';
  import { selectOnFocus } from '$lib/actions/input';
  import { getComponentClasses } from './theme';
  import { cls } from '$lib/utils/styles';

  export let value: number = 0;
  export let min: number | undefined = undefined;
  export let max: number | undefined = undefined;
  let className: string | undefined = undefined;
  export { className as class };

  const settingsClasses = getComponentClasses('NumberStepper');

  const dispatch = createEventDispatcher();

  $: dispatch('change', { value });
</script>

<TextField
  type="integer"
  bind:value
  align="center"
  class={cls('NumberStepper w-24', settingsClasses.root, className)}
  actions={(node) => [selectOnFocus(node)]}
  {...$$restProps}
>
  <div slot="prepend">
    <Button
      icon={mdiMinus}
      on:click={() => (value -= 1)}
      size="sm"
      disabled={min != null && value <= min}
    />
  </div>
  <div slot="append">
    <Button
      icon={mdiPlus}
      on:click={() => (value += 1)}
      size="sm"
      disabled={max != null && value >= max}
    />
  </div>
</TextField>
