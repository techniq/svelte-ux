<script lang="ts">
  import Progress from '$lib/components/Progress.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import { cls } from '$lib/utils/styles';

  let value = 50;
</script>

<h1>Examples</h1>

<h2>Value</h2>

<Preview>
  <Progress value={0} />
  <Progress value={0.2} />
  <Progress value={0.4} />
  <Progress value={0.6} />
  <Progress value={0.8} />
  <Progress value={1} />
  <Progress value={null} />
</Preview>

<h2>Max</h2>

<Preview>
  <Progress value={50} max={100} />
</Preview>

<h2>Color</h2>

<Preview>
  <Progress value={0.5} class="[--color:theme(colors.green.500)]" />
  <Progress value={0.7} class="[--color:theme(colors.yellow.500)]" />
  <Progress value={0.9} class="[--color:theme(colors.red.500)]" />
</Preview>

<h2>Track color</h2>

<Preview>
  <Progress value={0.5} class="[--track-color:theme(colors.accent.50)]" />
  <Progress
    value={0.5}
    class="[--color:theme(colors.green.500)] [--track-color:theme(colors.green.50)]"
  />
  <Progress
    value={0.7}
    class="[--color:theme(colors.yellow.500)] [--track-color:theme(colors.yellow.50)]"
  />
  <Progress
    value={0.9}
    class="[--color:theme(colors.red.500)] [--track-color:theme(colors.red.50)]"
  />
</Preview>

<h2>Color based on value</h2>

<Preview>
  <Progress
    bind:value
    class={cls(
      value > 90
        ? '[--color:theme(colors.red.500)]'
        : value > 70
        ? '[--color:theme(colors.yellow.500)]'
        : '[--color:theme(colors.green.500)]'
    )}
    max={100}
  />
  <input type="range" bind:value class="w-full" />
</Preview>
