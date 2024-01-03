<script lang="ts">
  import Preview from '$lib/components/Preview.svelte';

  import Button from '$lib/components/Button.svelte';
  import ProgressCircle from '$lib/components/ProgressCircle.svelte';
  import Overlay from '$lib/components/Overlay.svelte';
  import Toggle from '$lib/components/Toggle.svelte';
</script>

<h1>Examples</h1>

<h2>Loading overlay</h2>

<Preview>
  <div class="relative">
    <Overlay center>
      <ProgressCircle />
    </Overlay>
    <div>Some content</div>
    <div>Some content</div>
    <div>Some content</div>
    <div>Some content</div>
  </div>
</Preview>

<h2>Change color</h2>

<Preview>
  <div class="relative">
    <Overlay center class="bg-surface-content/10">
      <ProgressCircle />
    </Overlay>
    <div>Some content</div>
    <div>Some content</div>
    <div>Some content</div>
    <div>Some content</div>
  </div>
</Preview>

<h2>Prompt</h2>

<Preview>
  <Toggle let:on={show} let:toggle>
    <div class="relative">
      {#if show}
        <Overlay center>
          <Button on:click={toggle} class="border">Close Overlay</Button>
        </Overlay>
      {/if}
      <div>Some content</div>
      <div>Some content</div>
      <div>Some content</div>
      <div>Some content</div>
      <Button on:click={toggle} class="border mt-4">Show Overlay</Button>
    </div>
  </Toggle>
</Preview>
