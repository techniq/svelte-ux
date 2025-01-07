<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cls } from '../utils/styles.js';
  import Icon from './Icon.svelte';
  import { getComponentClasses } from './theme.js';

  interface Props {
    size?: 'sm' | 'md' | 'lg' | 'unset';
    icon?: string;
    class?: string;
    children?: Snippet;
  }

  let { size = 'md', icon, class: className, children }: Props = $props();

  const settingsClasses = getComponentClasses('Avatar');
</script>

<div
  class={cls(
    'Avatar',
    'rounded-full inline-flex items-center justify-center flex-shrink-0',
    {
      sm: 'w-6 h-6',
      md: 'w-10 h-10',
      lg: 'w-14 h-14',
      unset: '',
    }[size],
    settingsClasses.root,
    className
  )}
>
  {#if children}
    {@render children()}
  {:else if icon}
    <Icon data={icon} />
  {/if}
</div>
