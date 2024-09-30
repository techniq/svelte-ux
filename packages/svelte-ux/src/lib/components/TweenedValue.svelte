<script lang="ts">
  import { tweened } from 'svelte/motion';
  import type { FormatNumberStyle } from '@layerstack/utils';

  import { getSettings } from './settings.js';

  type TweenedOptions = Parameters<typeof tweened<number | null>>[1];

  export let value: number | null;
  export let format: FormatNumberStyle = 'none';
  export let options: TweenedOptions = undefined;
  export let disabled = false;

  const { format: formatUtil } = getSettings();
  const tweenedValue = tweened(value, options);
  $: $tweenedValue = value ?? 0;
  $: displayValue = disabled || value == null ? value : $tweenedValue;
</script>

<slot value={displayValue}>
  {$formatUtil(displayValue, format)}
</slot>
