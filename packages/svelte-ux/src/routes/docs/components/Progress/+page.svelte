<script lang="ts">
  import { Progress } from 'svelte-ux';
  import { cls } from '@layerstack/tailwind';

  import Preview from '$lib/components/Preview.svelte';

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
  <Progress value={0.5} class="[--color:theme(colors.success)]" />
  <Progress value={0.7} class="[--color:theme(colors.warning)]" />
  <Progress value={0.9} class="[--color:theme(colors.danger)]" />
</Preview>

<h2>Track color</h2>

<Preview>
  <Progress value={0.5} class="[--track-color:theme(colors.primary/5%)]" />
  <Progress
    value={0.5}
    class="[--color:theme(colors.success)] [--track-color:theme(colors.success/5%)]"
  />
  <Progress
    value={0.7}
    class="[--color:theme(colors.warning)] [--track-color:theme(colors.warning/5%)]"
  />
  <Progress
    value={0.9}
    class="[--color:theme(colors.danger)] [--track-color:theme(colors.danger/5%)]"
  />
</Preview>

<h2>Color based on value</h2>

<Preview>
  <Progress
    bind:value
    class={cls(
      value > 90
        ? '[--color:theme(colors.danger)]'
        : value > 50
          ? '[--color:theme(colors.warning)]'
          : '[--color:theme(colors.success)]'
    )}
    max={100}
  />
  <input type="range" bind:value class="w-full" />
</Preview>
