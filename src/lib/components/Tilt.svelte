<script lang="ts">
  import { cls } from '$lib/utils/styles';
  import { scaleLinear } from 'd3-scale';

  export let maxRotation = 20;
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
    brightness = scaleBrightness(mouseY);
  }

  function onMouseLeave(e: MouseEvent) {
    rotateX = 0;
    rotateY = 0;
    brightness = 1;
  }
</script>

<div
  class={cls('Tilt [perspective:600px]', $$props.class)}
  style:--rotateX="{rotateX}deg"
  style:--rotateY="{rotateY}deg"
  style:--brightness={brightness}
  bind:clientWidth={width}
  bind:clientHeight={height}
  on:mousemove={onMouseMove}
  on:mouseleave={onMouseLeave}
>
  <slot />
</div>

<style>
  .Tilt > :global(*) {
    transform: rotateX(var(--rotateX)) rotateY(var(--rotateY));
    filter: brightness(var(--brightness));
  }
</style>
