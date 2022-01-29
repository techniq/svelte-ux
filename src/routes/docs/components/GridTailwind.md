---
filename: $filename
---

<script lang="ts">
	import Preview from '$lib/components/Preview.svelte';
</script>

# Examples

## Default

<Preview>
  <div display="grid">
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </div>
</Preview>

## Gap

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

## Columns

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

## Columns with gap

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

## Auto Columns

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

## Template

<Preview>
  <div class="grid grid-cols-[auto,1fr,auto] gap-2">
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </div>
</Preview>
