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
  <Progress value={0.5} class="[--color:var(--color-success)]" />
  <Progress value={0.7} class="[--color:var(--color-warning)]" />
  <Progress value={0.9} class="[--color:var(--color-danger)]" />
</Preview>

<h2>Track color</h2>

<Preview>
  <Progress value={0.5} class="[--track-color:var(--color-primary)]/5" />
  <Progress
    value={0.5}
    class="[--color:var(--color-success)] [--track-color:var(--color-success)]/5"
  />
  <Progress
    value={0.7}
    class="[--color:var(--color-warning)] [--track-color:var(--color-warning)]/5"
  />
  <Progress
    value={0.9}
    class="[--color:var(--color-danger)] [--track-color:var(--color-danger)]/5"
  />
</Preview>

<h2>Color based on value</h2>

<Preview>
  <Progress
    bind:value
    class={cls(
      value > 90
        ? '[--color:var(--color-danger)]'
        : value > 50
          ? '[--color:var(--color-warning)]'
          : '[--color:var(--color-success)]'
    )}
    max={100}
  />
  <input type="range" bind:value class="w-full" />
</Preview>
