<script lang="ts">
  import { createEventDispatcher, type ComponentProps } from 'svelte';
  import { formatHex } from 'culori';

  import TextField from '$lib/components/TextField.svelte';
  import { colorVariableValue, type SupportedColorSpace } from '$lib/styles/theme';

  const dispatch = createEventDispatcher<{
    change: { value: string | undefined };
  }>();

  type $$Props = ComponentProps<TextField> & { value: string };

  export let value: string;
  export let colorSpace: SupportedColorSpace | 'hex' = 'rgb';

  function formatColor(value: string, colorSpace: SupportedColorSpace | 'hex') {
    if (value) {
      if (colorSpace === 'hex') {
        // Only format if not already formatted.  Fixes `#123` becoming `#112233`
        return value.startsWith('#') ? value : formatHex(value);
      } else {
        const colorValue = colorVariableValue(value, colorSpace);
        if (colorValue) {
          return `${colorSpace}(${colorValue})`;
        } else {
          // Return original if unable to convert (i.e invalid such as `rgb( 20 30)`)
          return value;
        }
      }
    } else {
      return value;
    }
  }
</script>

<TextField
  value={formatColor(value, colorSpace)}
  on:change={(e) => {
    value = formatColor(e.detail.inputValue, colorSpace);
    console.log(value, e.detail.inputValue);
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
      class="w-6 h-6 rounded opacity-0"
    />
  </div>
</TextField>
