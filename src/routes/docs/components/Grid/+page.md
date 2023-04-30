<script lang="ts">
  import api from '$lib/components/Grid.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

	import Grid from '$lib/components/Grid.svelte';
	import Preview from '$lib/components/Preview.svelte';
</script>

# Examples

## Default

<Preview>
  <Grid>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </Grid>
</Preview>

## Gap

<Preview>
  <Grid gap={8}>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </Grid>
</Preview>

## Columns

<Preview>
  <Grid columns={4}>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </Grid>
</Preview>

## Columns with gap

<Preview>
  <Grid columns={4} gap={8}>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </Grid>
</Preview>

## Auto Columns

<Preview>
  <Grid autoColumns="160px" gap={8}>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </Grid>
</Preview>

## Template

<Preview>
  <Grid template="auto 1fr auto" gap={8}>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </Grid>
</Preview>

# API

<ApiDocs {api} />
