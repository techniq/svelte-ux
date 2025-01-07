<script lang="ts">
  import type { SvelteHTMLElements } from 'svelte/elements';
  import type { ComponentProps, Snippet } from 'svelte';

  import ProgressCircle from './ProgressCircle.svelte';
  import Header from './Header.svelte';
  import Overlay from './Overlay.svelte';
  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';

  interface Props {
    title?: string | string[] | null;
    subheading?: string | string[] | null;
    loading?: boolean | null;
    classes?: {
      root?: string;
      header?: ComponentProps<typeof Header>['classes'];
      headerContainer?: string;
      content?: string;
      actions?: string;
    };
    header?: Snippet;
    children?: Snippet;
    contents?: Snippet;
    actions?: Snippet;
  }

  let {
    title,
    subheading,
    loading,
    class: className,
    classes = {},
    header,
    children,
    contents,
    actions,
    ...restProps
  }: Props & Omit<SvelteHTMLElements["div"], keyof Props> = $props();

  const settingsClasses = getComponentClasses('Card');
</script>

<!--
  `position:relative` sets a container for `position:absolute` children (ex. Overlay)

  `position: relative` with `z-index` sets new stacking context to keep
  z-index of children (ex. Overlay, sticky columns, etc) from overlapping other components
-->

<div
  {...restProps}
  class={cls(
    'Card',
    'relative z-0 bg-surface-100 border rounded elevation-1 flex flex-col justify-between',
    settingsClasses.root,
    classes.root,
    className
  )}
>
  {#if loading}
    <Overlay center class="rounded">
      <ProgressCircle />
    </Overlay>
  {/if}

  {#if title || subheading || header}
    <div class={cls('p-4', classes.headerContainer)}>
      {#if header}
        {@render header()}
      {:else}
        <Header {title} {subheading} classes={classes.header} />
      {/if}
    </div>
  {/if}

  {@render children?.()}

  {#if contents}
    <div class={cls('px-4 flex-1', classes.content)}>
      {@render contents()}
    </div>
  {/if}

  {#if actions}
    <div class={cls('py-2 px-1', classes.actions)}>
      {@render actions()}
    </div>
  {/if}
</div>
