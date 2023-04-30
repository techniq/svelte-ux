<script>
  import api from '$lib/components/CircularProgress.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import CircularProgress from '$lib/components/CircularProgress.svelte';
  // import LinearProgress from '$lib/components/LinearProgress.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import Stack from '$lib/components/Stack.svelte';

  let value = 50;
  let size = 40;
  let width = 4;
  let rotate = 0;
  let track = false;
  let indeterminate = true;
  let label = false;
</script>

# Examples

## Demo

<div class="border border-black/20 rounded bg-white ">
  <Stack horizontal template="1fr auto" items="center" justifyItems="center">
      <CircularProgress
        value={indeterminate ? null : value}
        {size}
        {width}
        {rotate}
        {track}
      >
        {#if label}
          <span class="text-black/50 text-xs">
            {#if indeterminate}Loading...{:else}{value}%{/if}
          </span>
        {/if}
      </CircularProgress>
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
  </Stack>
</div>

## Default

  <Preview>
    <CircularProgress />
  </Preview>

## Value

  <Preview>
    <Stack horizontal justify="start" gap={32}>
      <CircularProgress value={0} />
      <CircularProgress value={20} />
      <CircularProgress value={40} />
      <CircularProgress value={60} />
      <CircularProgress value={80} />
      <CircularProgress value={100} />
    </Stack>
  </Preview>

## Value w/ with track

<Preview>
<Stack horizontal justify="start" gap={32}>
<CircularProgress value={0} track />
<CircularProgress value={20} track />
<CircularProgress value={40} track />
<CircularProgress value={60} track />
<CircularProgress value={80} track />
<CircularProgress value={100} track />
</Stack>
</Preview>

## Value w/ with label

<Preview>
<Stack horizontal justify="start" gap={32}>
<CircularProgress value={0}>
<span class="text-black/50 text-xs">0%</span>
</CircularProgress>
<CircularProgress value={20}>
<span class="text-black/50 text-xs">20%</span>
</CircularProgress>
<CircularProgress value={40}>
<span class="text-black/50 text-xs">40%</span>
</CircularProgress>
<CircularProgress value={60}>
<span class="text-black/50 text-xs">60%</span>
</CircularProgress>
<CircularProgress value={80}>
<span class="text-black/50 text-xs">80%</span>
</CircularProgress>
<CircularProgress value={100}>
<span class="text-black/50 text-xs">100%</span>
</CircularProgress>
</Stack>
</Preview>

## Value w/ with label and track

<Preview>
  <Stack horizontal justify="start" gap={32}>
    <CircularProgress value={0} track>
      <span class="text-black/50 text-xs">0%</span>
    </CircularProgress>
    <CircularProgress value={20} track>
      <span class="text-black/50 text-xs">20%</span>
    </CircularProgress>
    <CircularProgress value={40} track>
      <span class="text-black/50 text-xs">40%</span>
    </CircularProgress>
    <CircularProgress value={60} track>
      <span class="text-black/50 text-xs">60%</span>
    </CircularProgress>
    <CircularProgress value={80} track>
      <span class="text-black/50 text-xs">80%</span>
    </CircularProgress>
    <CircularProgress value={100} track>
      <span class="text-black/50 text-xs">100%</span>
    </CircularProgress>
  </Stack>
</Preview>

## Size

<Preview>
  <Stack horizontal justify="start" gap={32}>
    <CircularProgress size={20} />
    <CircularProgress />
    <CircularProgress size={100} />
  </Stack>
</Preview>

## Width

<Preview>
  <Stack horizontal justify="start" gap={32}>
    <CircularProgress width={1} />
    <CircularProgress width={2} />
    <CircularProgress />
    <CircularProgress width={10} />
  </Stack>
</Preview>

## Color

<Preview>
  <Stack horizontal justify="start" gap={32}>
    <CircularProgress class="text-blue-500" />
    <CircularProgress class="text-red-500" />
    <CircularProgress class="text-purple-500" />
    <CircularProgress class="text-green-500" />
    <CircularProgress class="text-orange-500" />
  </Stack>
</Preview>

## Track Color

<Preview>
  <Stack horizontal justify="start" gap={32}>
    <CircularProgress
      class="text-blue-500 [--track-color:theme(colors.blue.100)]"
      track
    />
    <CircularProgress
      class="text-red-500 [--track-color:theme(colors.red.100)]"
      track
    />
    <CircularProgress
      class="text-purple-500 [--track-color:theme(colors.purple.100)]"
      track
    />
    <CircularProgress
      class="text-green-500 [--track-color:theme(colors.green.100)]"
      track
    />
    <CircularProgress
      class="text-orange-500 [--track-color:theme(colors.orange.100)]"
      track
    />
  </Stack>
</Preview>

# API

<ApiDocs {api} />
