<script lang="ts">
  import { cls } from '@layerstack/tailwind';
  import { getComponentClasses } from './theme.js';

  export let value: number | null = null;
  export let rotate = 0;
  export let size = 40;
  export let width = 4;
  export let track = false;
  let className: string | undefined = undefined;
  export { className as class };

  const settingsClasses = getComponentClasses('ProgressCircle');

  const radius = 20;

  $: indeterminate = value == null;
  $: circumference = 2 * Math.PI * radius;
  $: strokeDashArray = Math.round(circumference * 1000) / 1000;
  $: strokeDashOffset = ((100 - (value ?? 0)) / 100) * circumference + 'px';
  $: viewBoxSize = radius / (1 - width / size);
  $: strokeWidth = (width / size) * viewBoxSize * 2;
</script>

<div
  {...$$props}
  class={cls(
    'ProgressCircular',
    'relative inline-flex justify-center items-center align-middle',
    settingsClasses.root,
    className
  )}
  class:indeterminate
  style="height: {size}px; width: {size}px; {$$props.style}"
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
    <slot />
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
