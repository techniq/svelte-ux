<script lang="ts">
  import type { Snippet } from 'svelte';
  import { uniqueId } from '../utils/string.js';
  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';
  import type { SvelteHTMLElements } from 'svelte/elements';

  interface Props {
    /** Color of light */
    lightColor?: string;
    /** Size of light */
    lightRadius?: number;
    /** Depth of effect */
    depth?: number;
    /** Represents the height of the surface for a light filter primitive */
    surfaceScale?: number;
    /** The bigger the value the bigger the reflection */
    specularConstant?: number;
    /** controls the focus for the light source. The bigger the value the brighter the light */
    specularExponent?: number;
    /** @type {{root?: string, icon?: string, loading?: string}} */
    classes?: {
      root?: string;
      svg?: string;
    };
    children?: Snippet;
  }

  let {
    lightColor = '#666666',
    lightRadius = 300,
    depth = 1,
    surfaceScale = 2,
    specularConstant = 0.75,
    specularExponent = 120,
    classes = {},
    class: className,
    children,
    ...restProps
  }: Props & Omit<SvelteHTMLElements['div'], keyof Props> = $props();

  const settingsClasses = getComponentClasses('Shine');

  const filterId = uniqueId('filter-');

  let mouse = $state({ x: 0, y: 0 });
  let wrapperBox = $state({ left: 0, top: 0 });
  let wrapperEl: HTMLDivElement | null = $state(null);

  function onPointerMove(e: PointerEvent) {
    wrapperBox = wrapperEl?.getBoundingClientRect() ?? { left: 0, top: 0 };
    mouse = { x: e.clientX, y: e.clientY };
  }

  function onScroll() {
    wrapperBox = wrapperEl?.getBoundingClientRect() ?? { left: 0, top: 0 };
  }
</script>

<svelte:window onpointermove={onPointerMove} onscroll={onScroll} />

<svg class={cls('fixed inset-0 pointer-events-none', settingsClasses.svg, classes?.svg)}>
  <filter id={filterId} color-interpolation-filters="sRGB">
    <feGaussianBlur in="SourceAlpha" stdDeviation={depth} />

    <feSpecularLighting
      result="light-source"
      {surfaceScale}
      {specularConstant}
      {specularExponent}
      lighting-color={lightColor}
    >
      <fePointLight x={mouse.x - wrapperBox.left} y={mouse.y - wrapperBox.top} z={lightRadius} />
    </feSpecularLighting>

    <feComposite result="reflections" in="light-source" in2="SourceAlpha" operator="in" />

    <feComposite
      in="SourceGraphic"
      in2="reflections"
      operator="arithmetic"
      k1="0"
      k2="1"
      k3="1"
      k4="0"
    />
  </filter>
</svg>

<div
  style:filter="url(#{filterId})"
  {...restProps}
  class={cls('inline-block', settingsClasses.root, classes?.root, className)}
  bind:this={wrapperEl}
>
  {@render children?.()}
</div>
