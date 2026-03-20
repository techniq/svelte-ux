<script lang="ts">
  import { tweened } from 'svelte/motion';
  import type { FormatNumberStyle } from '@layerstack/utils';

  import { getSettings } from './settings.js';

  type TweenedOptions = {
    delay?: number;
    duration?: number | ((from: number | null, to: number | null) => number);
    easing?: (t: number) => number;
    interpolate?: (a: number | null, b: number | null) => (t: number) => number | null;
  };

  export let value: number | null;
  export let format: FormatNumberStyle = 'none';
  export let options: TweenedOptions | undefined = undefined;
  export let disabled = false;

  const { format: formatUtil } = getSettings();
  const tweenedValue = tweened(value, options);
  $: $tweenedValue = value ?? 0;
  $: displayValue = disabled || value == null ? value : $tweenedValue;
</script>

<slot value={displayValue}>
  {$formatUtil(displayValue, format)}
</slot>
