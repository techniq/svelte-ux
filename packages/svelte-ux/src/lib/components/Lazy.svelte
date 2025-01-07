<script lang="ts">
  import { cls } from '../utils/styles.js';
  import { intersection } from '../actions/observer.js';
  import { getComponentClasses } from './theme.js';
  import type { Snippet } from 'svelte';
  import type { SvelteHTMLElements } from 'svelte/elements';

  type Offset = {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };

  interface Props {
    /**
     * Placeholder height.  Should match closely to resulting height to reducing scroll bouncing
     */
    height: string | number;
    /**
     * Unmount item once no longer visible.  Captures rendered height before unmounting
     */
    unmount?: boolean;
    offset?: Offset;
    onintersecting?: svelteHTML.HTMLAttributes['onintersecting'];
    children?: Snippet;
  }

  let {
    height = $bindable(),
    unmount = false,
    class: className,
    offset = {},
    onintersecting,
    children,
    ...restProps
  }: Props & Omit<SvelteHTMLElements['div'], keyof Props> = $props();

  const settingsClasses = getComponentClasses('Lazy');
  let show = $state(false);
</script>

<div
  use:intersection={{
    rootMargin: `${offset.top ?? '0px'} ${offset.right ?? '0px'} ${offset.bottom ?? '0px'} ${
      offset.left ?? '0px'
    }`,
  }}
  onintersecting={(e) => {
    if (e.detail.isIntersecting) {
      show = true;
    } else if (unmount) {
      height = e.detail.boundingClientRect.height;
      show = false;
    }
    onintersecting?.(e);
  }}
  style:min-height={typeof height === 'number' ? `${height}px` : height}
  {...restProps}
  class={cls('Lazy', settingsClasses.root, className)}
>
  {#if show}
    {@render children?.()}
  {/if}
</div>
