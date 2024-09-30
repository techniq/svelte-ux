<script lang="ts">
  import { cls } from '@layerstack/tailwind';
  import { scaleLinear } from 'd3-scale';
  import { getComponentClasses } from './theme.js';

  export let maxRotation = 20;
  export let setBrightness = false;
  let className: string | undefined = undefined;
  export { className as class };

  const settingsClasses = getComponentClasses('Tilt');

  let width = 0;
  let height = 0;

  let rotateX = 0;
  let rotateY = 0;
  let brightness = 1;

  $: scaleX = scaleLinear().domain([0, height]).range([-maxRotation, maxRotation]);
  $: scaleY = scaleLinear().domain([0, width]).range([maxRotation, -maxRotation]);
  $: scaleBrightness = scaleLinear().domain([0, height]).range([2.0, 1.0]);

  function onMouseMove(e: MouseEvent) {
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    rotateY = scaleY(mouseX);
    rotateX = scaleX(mouseY);
    if (setBrightness) {
      brightness = scaleBrightness(mouseY);
    }
  }

  function onMouseLeave(e: MouseEvent) {
    rotateX = 0;
    rotateY = 0;
    brightness = 1;
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  style:--rotateX="{rotateX}deg"
  style:--rotateY="{rotateY}deg"
  style:--brightness={brightness}
  class={cls(
    'Tilt [perspective:600px]',
    '[&>*]:[transform:rotateX(var(--rotateX))_rotateY(var(--rotateY))]',
    '[&>*]:brightness-[var(--brightness)]',
    settingsClasses.root,
    className
  )}
  bind:clientWidth={width}
  bind:clientHeight={height}
  on:mousemove={onMouseMove}
  on:mouseleave={onMouseLeave}
>
  <slot />
</div>
