<script lang="ts">
  import { Grid } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';
</script>

<h1>Examples</h1>

<h2>Default</h2>

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

<h2>Gap</h2>

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

<h2>Columns</h2>

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

<h2>Columns with gap</h2>

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

<h2>Auto Columns</h2>

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

<h2>Template</h2>

<Preview>
  <Grid template="auto 1fr auto" gap={8}>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </Grid>
</Preview>
