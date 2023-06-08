<script lang="ts">
  import api from '$lib/components/ProgressCircle.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import ProgressCircle from '$lib/components/ProgressCircle.svelte';
  import Preview from '$lib/components/Preview.svelte';

  let value = 50;
  let size = 40;
  let width = 4;
  let rotate = 0;
  let track = false;
  let indeterminate = true;
  let label = false;
</script>

<h1>Examples</h1>

<h2>Demo</h2>

<div class="border border-black/20 rounded bg-white">
  <div class="grid grid-cols-[1fr,auto] items-center justify-items-center gap-4">
    <ProgressCircle value={indeterminate ? null : value} {size} {width} {rotate} {track}>
      {#if label}
        <span class="text-black/50 text-xs">
          {#if indeterminate}Loading...{:else}{value}%{/if}
        </span>
      {/if}
    </ProgressCircle>
    <div class="bg-black/5 border-l border-black/20 p-4">
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
      <span class="text-black/50 text-xs">0%</span>
    </ProgressCircle>
    <ProgressCircle value={20}>
      <span class="text-black/50 text-xs">20%</span>
    </ProgressCircle>
    <ProgressCircle value={40}>
      <span class="text-black/50 text-xs">40%</span>
    </ProgressCircle>
    <ProgressCircle value={60}>
      <span class="text-black/50 text-xs">60%</span>
    </ProgressCircle>
    <ProgressCircle value={80}>
      <span class="text-black/50 text-xs">80%</span>
    </ProgressCircle>
    <ProgressCircle value={100}>
      <span class="text-black/50 text-xs">100%</span>
    </ProgressCircle>
  </div>
</Preview>

<h2>Value w/ with label and track</h2>

<Preview>
  <div class="flex gap-4">
    <ProgressCircle value={0} track>
      <span class="text-black/50 text-xs">0%</span>
    </ProgressCircle>
    <ProgressCircle value={20} track>
      <span class="text-black/50 text-xs">20%</span>
    </ProgressCircle>
    <ProgressCircle value={40} track>
      <span class="text-black/50 text-xs">40%</span>
    </ProgressCircle>
    <ProgressCircle value={60} track>
      <span class="text-black/50 text-xs">60%</span>
    </ProgressCircle>
    <ProgressCircle value={80} track>
      <span class="text-black/50 text-xs">80%</span>
    </ProgressCircle>
    <ProgressCircle value={100} track>
      <span class="text-black/50 text-xs">100%</span>
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
    <ProgressCircle class="text-red-500" />
    <ProgressCircle class="text-purple-500" />
    <ProgressCircle class="text-green-500" />
    <ProgressCircle class="text-orange-500" />
  </div>
</Preview>

<h2>Track Color</h2>

<Preview>
  <div class="flex gap-4">
    <ProgressCircle class="text-blue-500 [--track-color:theme(colors.blue.100)]" track />
    <ProgressCircle class="text-red-500 [--track-color:theme(colors.red.100)]" track />
    <ProgressCircle class="text-purple-500 [--track-color:theme(colors.purple.100)]" track />
    <ProgressCircle class="text-green-500 [--track-color:theme(colors.green.100)]" track />
    <ProgressCircle class="text-orange-500 [--track-color:theme(colors.orange.100)]" track />
  </div>
</Preview>

<h1>API</h1>

<ApiDocs {api} />
