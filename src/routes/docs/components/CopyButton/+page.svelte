<script lang="ts">
  import api from '$lib/components/CopyButton.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

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
      <CopyButton value="Stop copying me!" color="accent" />
    </div>
    <div>
      <CopyButton value="Stop copying me!" color="accent" variant="outline" />
    </div>
    <div>
      <CopyButton value="Stop copying me!" color="accent" variant="fill" />
    </div>
    <div>
      <CopyButton value="Stop copying me!" color="accent" variant="fill-light" />
    </div>
    <div>
      <CopyButton value="Stop copying me!" color="accent" variant="fill-outline" />
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
      <CopyButton value="Stop copying me!" color="accent" size="sm" />
    </div>
    <div>
      <CopyButton value="Stop copying me!" color="accent" variant="outline" size="sm" />
    </div>
    <div>
      <CopyButton value="Stop copying me!" color="accent" variant="fill" size="sm" />
    </div>
    <div>
      <CopyButton value="Stop copying me!" color="accent" variant="fill-light" size="sm" />
    </div>
    <div>
      <CopyButton value="Stop copying me!" color="accent" variant="fill-outline" size="sm" />
    </div>
  </div>
</Preview>

<h1>API</h1>

<ApiDocs {api} />
