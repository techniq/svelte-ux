<script lang="ts">
  import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';

  import Field from './Field.svelte';
  import Button from './Button.svelte';
  import { getComponentSettings, getSettings } from './settings.js';
  import type { FormatNumberStyle } from '../utils/format.js';
  import type { ComponentProps } from 'svelte';

  const { defaults } = getComponentSettings('RangeField');

  const { format: formatUtil } = getSettings();

  interface Props {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    format?: FormatNumberStyle;
    onChange?: (value: number) => void;
  }

  let {
    value = $bindable(0),
    min = 0,
    max = 100,
    step = 1,
    format = 'none',
    onChange,
    ...rest
  }: Props & Omit<ComponentProps<typeof Field>, keyof Props> = $props();

  let restProps = $derived({ ...defaults, ...rest });

  $effect(() => {
    onChange?.(value);
  });
</script>

<Field classes={{ input: 'my-1' }} {...restProps}>
  {#snippet prepend()}
    <span>
      <Button
        icon={mdiChevronLeft}
        onclick={() => (value -= value > min ? step : 0)}
        class="mr-2"
        size="sm"
      />
    </span>
  {/snippet}

  {#snippet children({ id })}
    <input type="range" bind:value {min} {max} {step} {id} class="h-6 w-full" />

    <!-- Stack on top to account for min/max value width -->
    <span class="ml-2 text-sm text-surface-content/50 tabular-nums text-right inline-grid">
      <span class="col-span-full row-span-full invisible">{$formatUtil(min, format)}</span>
      <span class="col-span-full row-span-full">{$formatUtil(value, format)}</span>
      <span class="col-span-full row-span-full invisible">{$formatUtil(max, format)}</span>
    </span>
  {/snippet}
  {#snippet append()}
    <span>
      <Button
        icon={mdiChevronRight}
        onclick={() => (value += value < max ? step : 0)}
        class="ml-2"
        size="sm"
      />
    </span>
  {/snippet}
</Field>
