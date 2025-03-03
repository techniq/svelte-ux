<script lang="ts">
  import Preview from '$lib/components/Preview.svelte';
</script>

<h1>Examples</h1>

<h2>Default</h2>

<Preview>
  <div class="grid">
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </div>
</Preview>

<h2>Gap</h2>

<Preview>
  <div class="grid gap-2">
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </div>
</Preview>

<h2>Columns</h2>

<Preview>
  <div class="grid grid-cols-4">
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </div>
</Preview>

<h2>Columns with gap</h2>

<Preview>
  <div class="grid grid-cols-4 gap-2">
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </div>
</Preview>

<h2>Auto Columns</h2>

<Preview>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-2">
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </div>
</Preview>

<h2>Template</h2>

<Preview>
  <div class="grid grid-cols-[auto_1fr_auto] gap-2">
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </div>
</Preview>
