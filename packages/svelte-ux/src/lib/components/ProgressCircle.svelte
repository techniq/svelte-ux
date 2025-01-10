<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { SvelteHTMLElements } from 'svelte/elements';
  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';

  interface Props {
    value?: number | null;
    rotate?: number;
    size?: number;
    width?: number;
    track?: boolean;
    class?: string;
    style?: string;
    children?: Snippet;
  }

  let {
    value,
    rotate = 0,
    size = 40,
    width = 4,
    track = false,
    class: className,
    style,
    children,
    ...restProps
  }: Props & Omit<SvelteHTMLElements["div"], keyof Props> = $props();

  const settingsClasses = getComponentClasses('ProgressCircle');

  const radius = 20;

  let indeterminate = $derived(value == null);
  let circumference = $derived(2 * Math.PI * radius);
  let strokeDashArray = $derived(Math.round(circumference * 1000) / 1000);
  let strokeDashOffset = $derived(((100 - (value ?? 0)) / 100) * circumference + 'px');
  let viewBoxSize = $derived(radius / (1 - width / size));
  let strokeWidth = $derived((width / size) * viewBoxSize * 2);
</script>

<div
  {...restProps}
  class={cls(
    'ProgressCircular',
    'relative inline-flex justify-center items-center align-middle',
    settingsClasses.root,
    className
  )}
  class:indeterminate
  style="height: {size}px; width: {size}px; {style}"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style="transform: rotate({rotate - (indeterminate ? 0 : 90)}deg)"
    viewBox="{viewBoxSize}
    {viewBoxSize}
    {2 * viewBoxSize}
    {2 * viewBoxSize}"
  >
    {#if track}
      <circle
        class="track"
        fill="transparent"
        cx={2 * viewBoxSize}
        cy={2 * viewBoxSize}
        r={radius}
        stroke-width={strokeWidth}
        stroke-dasharray={strokeDashArray}
        stroke-dashoffset={0}
      />
    {/if}

    <circle
      class="path"
      fill="transparent"
      cx={2 * viewBoxSize}
      cy={2 * viewBoxSize}
      r={radius}
      stroke-width={strokeWidth}
      stroke-dasharray={strokeDashArray}
      stroke-dashoffset={strokeDashOffset}
    />
  </svg>
  <div class="info">
    {@render children?.()}
  </div>
</div>

<style lang="postcss">
  svg {
    width: 100%;
    height: 100%;
    margin: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 0;
  }

  .indeterminate > svg {
    animation: rotate 1.4s linear infinite;
    transform-origin: center center;
    transition: all 0.2s ease-in-out;
  }
  .indeterminate .path {
    animation: dash 1.4s ease-in-out infinite;
    stroke-linecap: round;
    stroke-dasharray: 80, 200;
    stroke-dashoffset: 0px;
  }

  .info {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .track {
    stroke: var(--track-color, rgba(0, 0, 0, 0.1));
    z-index: 1;
  }

  .path {
    /* stroke: currentColor; */
    stroke: var(--path-color, currentColor);
    z-index: 2;
    transition: all 0.6s ease-in-out;
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0px;
    }

    50% {
      stroke-dasharray: 100, 200;
      stroke-dashoffset: -15px;
    }

    100% {
      stroke-dasharray: 100, 200;
      stroke-dashoffset: -125px;
    }
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
</style>
