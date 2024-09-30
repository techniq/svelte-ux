<script lang="ts">
  import { cls } from '@layerstack/tailwind';
  import { uniqueId } from '@layerstack/utils';

  import { getComponentClasses } from './theme.js';

  /** Color of light */
  export let lightColor = '#666666';

  /** Size of light */
  export let lightRadius = 300;

  /** Depth of effect */
  export let depth = 1;

  /** Represents the height of the surface for a light filter primitive */
  export let surfaceScale = 2;

  /** The bigger the value the bigger the reflection */
  export let specularConstant = 0.75;

  /** controls the focus for the light source. The bigger the value the brighter the light */
  export let specularExponent = 120;

  /** @type {{root?: string, icon?: string, loading?: string}} */
  export let classes: {
    root?: string;
    svg?: string;
  } = {};
  const settingsClasses = getComponentClasses('Shine');

  const filterId = uniqueId('filter-');

  let mouse = { x: 0, y: 0 };
  let wrapperBox = { left: 0, top: 0 };
  let wrapperEl: HTMLDivElement | null = null;

  function onPointerMove(e: PointerEvent) {
    wrapperBox = wrapperEl?.getBoundingClientRect() ?? { left: 0, top: 0 };
    mouse = { x: e.clientX, y: e.clientY };
  }

  function onScroll() {
    wrapperBox = wrapperEl?.getBoundingClientRect() ?? { left: 0, top: 0 };
  }
</script>

<svelte:window on:pointermove={onPointerMove} on:scroll={onScroll} />

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
  {...$$restProps}
  class={cls('inline-block', settingsClasses.root, classes?.root, $$props.class)}
  bind:this={wrapperEl}
>
  <slot />
</div>
