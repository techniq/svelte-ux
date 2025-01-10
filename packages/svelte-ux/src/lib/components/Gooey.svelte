<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { SvelteHTMLElements, SVGAttributes } from 'svelte/elements';

  import { uniqueId } from '../utils/string.js';
  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';

  interface Props {
    /** Apply gaussian blur.  Required unless blurring externally (`filter: blur()`, etc) */
    blur?: number;
    /** `a4` of feColorMatrix.  See https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feColorMatrix for details  */
    alphaPixel?: number;
    /** `a5` of feColorMatrix.  See https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feColorMatrix for details  */
    alphaShift?: number;
    composite?: SVGAttributes<SVGFECompositeElement>['operator'];
    /** @type {{root?: string, icon?: string, loading?: string}} */
    classes?: {
      root?: string;
      svg?: string;
    };
    children?: Snippet;
  }

  let {
    blur = undefined,
    alphaPixel = 255,
    alphaShift = -140,
    composite = undefined,
    classes = {},
    class: className,
    children,
    ...restProps
  }: Props & Omit<SvelteHTMLElements['div'], keyof Props> = $props();
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
  {...restProps}
  class={cls('inline-block', settingsClasses.root, classes?.root, className)}
>
  {@render children?.()}
</div>
