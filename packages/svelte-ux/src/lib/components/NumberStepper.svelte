<script lang="ts">
  import { mdiMinus, mdiPlus } from '@mdi/js';

  import Button from './Button.svelte';
  import TextField from './TextField.svelte';
  import { selectOnFocus } from '../actions/input.js';
  import { getComponentClasses } from './theme.js';
  import { cls } from '../utils/styles.js';
  import { step as stepUtil } from '../utils/number.js';
  import type { ComponentProps } from 'svelte';

  interface Props {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    class?: string;
    onChange?: (value: number) => void;
  }

  let {
    value = $bindable(0),
    min,
    max,
    step = 1,
    class: className,
    onChange,
    ...restProps
  }: Props & Omit<ComponentProps<typeof TextField>, keyof Props> = $props();

  const settingsClasses = getComponentClasses('NumberStepper');

  $effect(() => {
    onChange?.(value);
  });
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
  {...restProps}
>
  {#snippet prepend()}
    <div>
      <Button
        icon={mdiMinus}
        onclick={() => (value = stepUtil(value, -step))}
        size="sm"
        disabled={min != null && value <= min}
      />
    </div>
  {/snippet}
  {#snippet append()}
    <div>
      <Button
        icon={mdiPlus}
        onclick={() => (value = stepUtil(value, step))}
        size="sm"
        disabled={max != null && value >= max}
      />
    </div>
  {/snippet}
</TextField>
