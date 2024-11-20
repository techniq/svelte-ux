<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';
  import { cls } from '@layerstack/tailwind';
  import { uniqueId } from '@layerstack/utils';

  import { getComponentClasses } from './theme.js';

  /** Apply gaussian blur.  Required unless blurring externally (`filter: blur()`, etc) */
  export let blur: number | undefined = undefined;

  /** `a4` of feColorMatrix.  See https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feColorMatrix for details  */
  export let alphaPixel = 255;

  /** `a5` of feColorMatrix.  See https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feColorMatrix for details  */
  export let alphaShift = -140;

  export let composite: SVGAttributes<SVGFECompositeElement>['operator'] = undefined;

  /** @type {{root?: string, icon?: string, loading?: string}} */
  export let classes: {
    root?: string;
    svg?: string;
  } = {};
  const settingsClasses = getComponentClasses('Gooey');

  const filterId = uniqueId('filter-');
</script>

<svg class={cls('fixed inset-0 pointer-events-none', settingsClasses.svg, classes?.svg)}>
  <filter id={filterId}>
    {#if blur}
      <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="blur" />
    {/if}

    <feColorMatrix
      in="blur"
      type="matrix"
      values="1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 {alphaPixel} {alphaShift}"
      result="goo"
    />

    {#if composite}
      <feComposite in="SourceGraphic" in2="goo" operator={composite} />
    {/if}
  </filter>
</svg>

<div
  style:filter="url(#{filterId})"
  {...$$restProps}
  class={cls('inline-block', settingsClasses.root, classes?.root, $$props.class)}
>
  <slot />
</div>
