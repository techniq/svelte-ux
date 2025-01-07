<script lang="ts">
  import { type ComponentProps } from 'svelte';
  import { formatHex } from 'culori';

  import { TextField } from 'svelte-ux';
  import { formatColor } from './colors.js';
  import { type SupportedColorSpace } from '$lib/styles/theme.js';

  interface Props {
    value: string;
    colorSpace?: SupportedColorSpace | 'hex';
    onChange?: (value?: string) => void;
  }

  let {
    value = $bindable(),
    colorSpace = 'rgb',
    onChange,
    ...restProps
  }: Props & Omit<ComponentProps<typeof TextField>, keyof Props> = $props();
</script>

<TextField
  value={formatColor(value, colorSpace)}
  onChange={({inputValue}) => {
    // @ts-expect-error
    value = formatColor(inputValue, colorSpace);
    onChange?.(value);
  }}
  {...restProps}
>
  {#snippet prepend()}
    <div class="grid grid-stack mr-3">
      <div class="w-6 h-6 border rounded" style:background={value}></div>
      <input
        type="color"
        value={formatHex(value)}
        oninput={(e) => {
          // @ts-expect-error
          value = formatColor(e.target.value, colorSpace);
          onChange?.(value);
        }}
        class="w-6 h-6 rounded opacity-0 cursor-pointer"
      />
    </div>
  {/snippet}
</TextField>
