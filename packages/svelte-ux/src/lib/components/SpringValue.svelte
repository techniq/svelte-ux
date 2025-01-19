<script lang="ts">
  import { spring } from 'svelte/motion';
  import type { FormatNumberStyle } from '@layerstack/utils';

  import { getSettings } from './settings.js';

  type SpringOptions = Parameters<typeof spring<number | null>>[1];

  export let value: number | null;
  export let format: FormatNumberStyle = 'none';
  export let options: SpringOptions = undefined;
  export let disabled = false;

  const { format: formatUtil } = getSettings();
  const springValue = spring(value, options);
  $: $springValue = value ?? 0;
  $: displayValue = disabled || value == null ? value : $springValue;
</script>

<slot value={displayValue}>
  {$formatUtil(displayValue, format)}
</slot>
