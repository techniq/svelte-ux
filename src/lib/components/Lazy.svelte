<script lang="ts">
  import { cls } from '$lib/utils/styles';
  import { intersection } from '../actions/observer';
  import { getComponentTheme } from './theme';

  /**
   * Placeholder height.  Should match closely to resulting height to reducing scroll bouncing
   */
  export let height: string | number;

  /**
   * Unmount item once no longer visible.  Captures rendered height before unmounting
   */
  export let unmount = false;

  let show = false;

  type Offset = {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };

  export let offset: Offset = {};

  const theme = getComponentTheme('Lazy');
</script>

<div
  use:intersection={{
    rootMargin: `${offset.top ?? '0px'} ${offset.right ?? '0px'} ${offset.bottom ?? '0px'} ${
      offset.left ?? '0px'
    }`,
  }}
  on:intersecting={(e) => {
    if (e.detail.isIntersecting) {
      show = true;
    } else if (unmount) {
      height = e.detail.boundingClientRect.height;
      show = false;
    }
  }}
  on:intersecting
  style:min-height={typeof height === 'number' ? `${height}px` : height}
  {...$$restProps}
  class={cls('Lazy', theme.root, $$props.class)}
>
  {#if show}
    <slot />
  {/if}
</div>
