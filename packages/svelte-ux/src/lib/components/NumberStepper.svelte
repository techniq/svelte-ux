<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { mdiMinus, mdiPlus } from '@mdi/js';
  import { cls } from '@layerstack/tailwind';
  import { step as stepUtil } from '@layerstack/utils/number';
  import { selectOnFocus } from '@layerstack/svelte-actions';

  import Button from './Button.svelte';
  import TextField from './TextField.svelte';
  import { getComponentClasses } from './theme.js';

  export let value: number = 0;
  export let min: number | undefined = undefined;
  export let max: number | undefined = undefined;
  export let step = 1;
  let className: string | undefined = undefined;
  export { className as class };

  const settingsClasses = getComponentClasses('NumberStepper');

  const dispatch = createEventDispatcher();

  $: dispatch('change', { value });
</script>

<TextField
  type="integer"
  bind:value
  {min}
  {max}
  {step}
  align="center"
  class={cls('NumberStepper w-24', settingsClasses.root, className)}
  actions={(node) => [selectOnFocus(node)]}
  {...$$restProps}
>
  <div slot="prepend">
    <Button
      icon={mdiMinus}
      on:click={() => (value = stepUtil(value, -step))}
      size="sm"
      disabled={min != null && value <= min}
    />
  </div>
  <div slot="prefix"><slot name="prefix" /></div>
  <div slot="suffix"><slot name="suffix" /></div>
  <div slot="append">
    <Button
      icon={mdiPlus}
      on:click={() => (value = stepUtil(value, step))}
      size="sm"
      disabled={max != null && value >= max}
    />
  </div>
</TextField>
