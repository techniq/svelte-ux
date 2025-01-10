<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cls } from '../utils/styles.js';
  import { scaleLinear } from 'd3-scale';
  import { getComponentClasses } from './theme.js';

  interface Props {
    maxRotation?: number;
    setBrightness?: boolean;
    class?: string;
    children?: Snippet;
  }

  let {
    maxRotation = 20,
    setBrightness = false,
    class: className,
    children,
  }: Props = $props();

  const settingsClasses = getComponentClasses('Tilt');

  let width = $state(0);
  let height = $state(0);

  let rotateX = $state(0);
  let rotateY = $state(0);
  let brightness = $state(1);

  let scaleX = $derived(scaleLinear().domain([0, height]).range([-maxRotation, maxRotation]));
  let scaleY = $derived(scaleLinear().domain([0, width]).range([maxRotation, -maxRotation]));
  let scaleBrightness = $derived(scaleLinear().domain([0, height]).range([2.0, 1.0]));

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

<!-- svelte-ignore a11y_no_static_element_interactions -->
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
  onmousemove={onMouseMove}
  onmouseleave={onMouseLeave}
>
  {@render children?.()}
</div>
