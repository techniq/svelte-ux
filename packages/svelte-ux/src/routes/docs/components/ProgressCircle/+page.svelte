<script lang="ts">
  import { ProgressCircle } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';

  let value = $state(50);
  let size = $state(40);
  let width = $state(4);
  let rotate = $state(0);
  let track = $state(false);
  let indeterminate = $state(true);
  let label = $state(false);
</script>

<h1>Examples</h1>

<h2>Demo</h2>

<div class="border rounded bg-surface-100">
  <div class="grid grid-cols-[1fr,auto] items-center justify-items-center gap-4">
    <ProgressCircle value={indeterminate ? null : value} {size} {width} {rotate} {track}>
      {#if label}
        <span class="text-surface-content/50 text-xs">
          {#if indeterminate}Loading...{:else}{value}%{/if}
        </span>
      {/if}
    </ProgressCircle>
    <div class="bg-surface-content/5 border-l p-4">
      <label class="block">
        size:
        <input type="range" min={0} max={120} bind:value={size} />
      </label>
      <label class="block">
        width:
        <input type="range" min={0} max={20} bind:value={width} />
      </label>
      <label class="block">
        rotate:
        <input type="range" min={0} max={360} bind:value={rotate} />
      </label>
      <label class="block">
        value:
        <input type="range" min={0} max={100} bind:value disabled={indeterminate} />
      </label>
      <label class="block">
        indeterminate:
        <input type="checkbox" bind:checked={indeterminate} />
      </label>
      <label class="block">
        track:
        <input type="checkbox" bind:checked={track} />
      </label>
      <label class="block">
        label:
        <input type="checkbox" bind:checked={label} />
      </label>
    </div>
  </div>
</div>

<h2>Default</h2>

<Preview>
  <ProgressCircle />
</Preview>

<h2>Value</h2>

<Preview>
  <div class="flex gap-4">
    <ProgressCircle value={0} />
    <ProgressCircle value={20} />
    <ProgressCircle value={40} />
    <ProgressCircle value={60} />
    <ProgressCircle value={80} />
    <ProgressCircle value={100} />
  </div>
</Preview>

<h2>Value w/ with track</h2>

<Preview>
  <div class="flex gap-4">
    <ProgressCircle value={0} track />
    <ProgressCircle value={20} track />
    <ProgressCircle value={40} track />
    <ProgressCircle value={60} track />
    <ProgressCircle value={80} track />
    <ProgressCircle value={100} track />
  </div>
</Preview>

<h2>Value w/ with label</h2>

<Preview>
  <div class="flex gap-4">
    <ProgressCircle value={0}>
      <span class="text-surface-content/50 text-xs">0%</span>
    </ProgressCircle>
    <ProgressCircle value={20}>
      <span class="text-surface-content/50 text-xs">20%</span>
    </ProgressCircle>
    <ProgressCircle value={40}>
      <span class="text-surface-content/50 text-xs">40%</span>
    </ProgressCircle>
    <ProgressCircle value={60}>
      <span class="text-surface-content/50 text-xs">60%</span>
    </ProgressCircle>
    <ProgressCircle value={80}>
      <span class="text-surface-content/50 text-xs">80%</span>
    </ProgressCircle>
    <ProgressCircle value={100}>
      <span class="text-surface-content/50 text-xs">100%</span>
    </ProgressCircle>
  </div>
</Preview>

<h2>Value w/ with label and track</h2>

<Preview>
  <div class="flex gap-4">
    <ProgressCircle value={0} track>
      <span class="text-surface-content/50 text-xs">0%</span>
    </ProgressCircle>
    <ProgressCircle value={20} track>
      <span class="text-surface-content/50 text-xs">20%</span>
    </ProgressCircle>
    <ProgressCircle value={40} track>
      <span class="text-surface-content/50 text-xs">40%</span>
    </ProgressCircle>
    <ProgressCircle value={60} track>
      <span class="text-surface-content/50 text-xs">60%</span>
    </ProgressCircle>
    <ProgressCircle value={80} track>
      <span class="text-surface-content/50 text-xs">80%</span>
    </ProgressCircle>
    <ProgressCircle value={100} track>
      <span class="text-surface-content/50 text-xs">100%</span>
    </ProgressCircle>
  </div>
</Preview>

<h2>Size</h2>

<Preview>
  <div class="flex gap-4">
    <ProgressCircle size={20} />
    <ProgressCircle />
    <ProgressCircle size={100} />
  </div>
</Preview>

<h2>Width</h2>

<Preview>
  <div class="flex gap-4">
    <ProgressCircle width={1} />
    <ProgressCircle width={2} />
    <ProgressCircle />
    <ProgressCircle width={10} />
  </div>
</Preview>

<h2>Color</h2>

<Preview>
  <div class="flex gap-4">
    <ProgressCircle class="text-blue-500" />
    <ProgressCircle class="text-danger" />
    <ProgressCircle class="text-info" />
    <ProgressCircle class="text-success" />
    <ProgressCircle class="text-orange-500" />
  </div>
</Preview>

<h2>Track Color</h2>

<Preview>
  <div class="flex gap-4">
    <ProgressCircle class="text-blue-500 [--track-color:theme(colors.blue.500/10%)]" track />
    <ProgressCircle class="text-danger [--track-color:theme(colors.danger/10%)]" track />
    <ProgressCircle class="text-info [--track-color:theme(colors.info/10%)]" track />
    <ProgressCircle class="text-success [--track-color:theme(colors.success/10%)]" track />
    <ProgressCircle class="text-warning [--track-color:theme(colors.warning/10%)]" track />
  </div>
</Preview>
