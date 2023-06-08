<script lang="ts">
  import { cls } from '../utils/styles';
  import Icon from './Icon.svelte';

  export let size: 'sm' | 'md' | 'lg' | 'unset' = 'md';
  export let icon: string | undefined = undefined;
</script>

<div
  class={cls(
    'Avatar',
    'rounded-full inline-flex items-center justify-center flex-shrink-0',
    {
      sm: 'w-6 h-6',
      md: 'w-10 h-10',
      lg: 'w-14 h-14',
    }[size],
    $$props.class
  )}
>
  <slot>
    {#if icon}
      <Icon path={icon} />
    {/if}
  </slot>
</div>
