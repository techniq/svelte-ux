<script lang="ts">
  import type { ComponentProps } from 'svelte';

  import ProgressCircle from './ProgressCircle.svelte';
  import Header from './Header.svelte';
  import Overlay from './Overlay.svelte';
  import { cls, clsMerge } from '@layerstack/tailwind';
  import { getComponentClasses } from './theme.js';

  export let title: string | string[] | null = null;
  export let subheading: string | string[] | null = null;
  export let loading: boolean | null = null;
  let className: string | undefined = undefined;
  export { className as class };

  export let classes: {
    root?: string;
    header?: ComponentProps<Header>['classes'];
    headerContainer?: string;
    content?: string;
    actions?: string;
  } = {};

  const settingsClasses = getComponentClasses('Card');
</script>

<!--
  `position:relative` sets a container for `position:absolute` children (ex. Overlay)

  `position: relative` with `z-index` sets new stacking context to keep
  z-index of children (ex. Overlay, sticky columns, etc) from overlapping other components
-->

<div
  {...$$restProps}
  class={cls(
    'Card',
    'relative z-0 bg-surface-100 border rounded-sm elevation-1 flex flex-col justify-between',
    settingsClasses.root,
    classes.root,
    className
  )}
>
  {#if loading}
    <Overlay center class="rounded-sm">
      <ProgressCircle />
    </Overlay>
  {/if}

  {#if title || subheading || $$slots.header}
    <div class={cls('p-4', settingsClasses.headerContainer, classes.headerContainer)}>
      <slot name="header">
        <Header {title} {subheading} classes={clsMerge(settingsClasses.header, classes.header)} />
      </slot>
    </div>
  {/if}

  <slot />

  {#if $$slots.contents}
    <div class={cls('px-4 flex-1', settingsClasses.content, classes.content)}>
      <slot name="contents" />
    </div>
  {/if}

  {#if $$slots.actions}
    <div class={cls('py-2 px-1', settingsClasses.actions, classes.actions)}>
      <slot name="actions" />
    </div>
  {/if}
</div>
