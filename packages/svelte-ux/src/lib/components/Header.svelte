<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cls } from '../utils/styles.js';
  import Breadcrumb from './Breadcrumb.svelte';
  import { getComponentClasses } from './theme.js';

  interface Props {
    title?: string | string[] | Snippet | null;
    subheading?: string | string[] | Snippet | null;
    class?: string;
    classes?: {
      root?: string;
      container?: string;
      title?: string;
      subheading?: string;
    };
    avatar?: Snippet;
    actions?: Snippet;
  }

  let { title, subheading, class: className, classes = {}, avatar, actions }: Props = $props();

  const settingsClasses = getComponentClasses('Header');
</script>

<div
  class={cls('Header', 'flex items-center gap-4', settingsClasses.root, classes.root, className)}
>
  {@render avatar?.()}

  <div class={cls('flex-1', classes.container)}>
    {#if typeof title === 'function'}
      {@render title()}
    {:else if title}
      {#if Array.isArray(title)}
        <Breadcrumb items={title} class="text-lg" />
      {:else}
        <div class={cls('text-lg', classes.title)}>{title}</div>
      {/if}
    {/if}

    {#if typeof subheading === 'function'}
      {@render subheading()}
    {:else if subheading}
      {#if Array.isArray(subheading)}
        <Breadcrumb
          items={subheading}
          class={cls('text-sm text-surface-content/50', classes.subheading)}
        />
      {:else}
        <div class={cls('text-sm text-surface-content/50', classes.subheading)}>{subheading}</div>
      {/if}
    {/if}
  </div>

  {@render actions?.()}
</div>
