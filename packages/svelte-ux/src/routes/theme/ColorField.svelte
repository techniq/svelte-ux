<script lang="ts">
  import { createEventDispatcher, type ComponentProps } from 'svelte';
  import { formatHex } from 'culori';

  import { TextField } from 'svelte-ux';
  import { formatColor } from './colors.js';
  import { type SupportedColorSpace } from '$lib/styles/theme.js';

  const dispatch = createEventDispatcher<{
    change: { value: string | undefined };
  }>();

  type $$Props = ComponentProps<TextField> & { value: string };

  export let value: string;
  export let colorSpace: SupportedColorSpace | 'hex' = 'rgb';
</script>

<TextField
  value={formatColor(value, colorSpace)}
  on:change={(e) => {
    value = formatColor(e.detail.inputValue, colorSpace);
    dispatch('change', { value });
  }}
  {...$$restProps}
>
  <div slot="prepend" class="grid grid-stack mr-3">
    <div class="w-6 h-6 border rounded" style:background={value} />
    <input
      type="color"
      value={formatHex(value)}
      on:input={(e) => {
        value = formatColor(e.target.value, colorSpace);
        dispatch('change', { value });
      }}
      class="w-6 h-6 rounded opacity-0 cursor-pointer"
    />
  </div>
</TextField>
