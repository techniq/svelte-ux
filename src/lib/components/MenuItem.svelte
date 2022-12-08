<script lang="ts">
  import Button from './Button.svelte';
  import type { ComponentProps } from '../types';

  type ButtonProps = ComponentProps<Button>;

  export let icon: ButtonProps['icon'] = undefined;
  export let classes: ButtonProps['classes'] = {
    icon: 'text-black/50 mr-2',
  };
</script>

<Button base {icon} {classes} fullWidth class="p-2" on:click>
  <slot />
</Button>
