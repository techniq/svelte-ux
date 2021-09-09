<script lang="ts">
	import Grid from '$lib/components/Grid.svelte';
	import Preview from '$lib/components/Preview.svelte';
</script>

## Default

<Grid>
  <div class="border">item</div>
  <div class="border">item</div>
  <div class="border">item</div>
  <div class="border">item</div>
  <div class="border">item</div>
  <div class="border">item</div>
</Grid>

## Gap

<Grid gap={8}>
  <div class="border">item</div>
  <div class="border">item</div>
  <div class="border">item</div>
  <div class="border">item</div>
  <div class="border">item</div>
  <div class="border">item</div>
</Grid>

## Columns

<Grid columns={4}>
  <div class="border">item</div>
  <div class="border">item</div>
  <div class="border">item</div>
  <div class="border">item</div>
  <div class="border">item</div>
  <div class="border">item</div>
</Grid>

## Columns with gap

<Grid columns={4} gap={8}>
  <div class="border">item</div>
  <div class="border">item</div>
  <div class="border">item</div>
  <div class="border">item</div>
  <div class="border">item</div>
  <div class="border">item</div>
</Grid>

## Auto Columns

<Grid autoColumns="160px" gap={8}>
  <div class="border">item</div>
  <div class="border">item</div>
  <div class="border">item</div>
  <div class="border">item</div>
  <div class="border">item</div>
  <div class="border">item</div>
</Grid>

## Template

<Grid template="auto 1fr auto" gap={8}>
  <div class="border">item</div>
  <div class="border">item</div>
  <div class="border">item</div>
</Grid>
