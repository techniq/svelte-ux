<script lang="ts">
  import CopyButton from '$lib/components/CopyButton.svelte';
  import Preview from '$lib/components/Preview.svelte';
</script>

<h1>Examples</h1>

<h2>Basic</h2>

<Preview>
  <div class="grid gap-2">
    <div>
      <CopyButton value="Stop copying me!" />
    </div>
    <div>
      <CopyButton value="Stop copying me!" color="primary" />
    </div>
    <div>
      <CopyButton value="Stop copying me!" color="primary" variant="outline" />
    </div>
    <div>
      <CopyButton value="Stop copying me!" color="primary" variant="fill" />
    </div>
    <div>
      <CopyButton value="Stop copying me!" color="primary" variant="fill-light" />
    </div>
    <div>
      <CopyButton value="Stop copying me!" color="primary" variant="fill-outline" />
    </div>
  </div>
</Preview>

<h2>Size</h2>

<Preview>
  <div class="grid gap-2">
    <div>
      <CopyButton value="Stop copying me!" size="sm" />
    </div>
    <div>
      <CopyButton value="Stop copying me!" color="primary" size="sm" />
    </div>
    <div>
      <CopyButton value="Stop copying me!" color="primary" variant="outline" size="sm" />
    </div>
    <div>
      <CopyButton value="Stop copying me!" color="primary" variant="fill" size="sm" />
    </div>
    <div>
      <CopyButton value="Stop copying me!" color="primary" variant="fill-light" size="sm" />
    </div>
    <div>
      <CopyButton value="Stop copying me!" color="primary" variant="fill-outline" size="sm" />
    </div>
  </div>
</Preview>
