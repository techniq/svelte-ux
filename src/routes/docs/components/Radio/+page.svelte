<script lang="ts">
  import api from '$lib/components/Radio.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import AppBar from '$lib/components/AppBar.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import Radio from '$lib/components/Radio.svelte';

  let group = undefined;
</script>

<h1>Examples</h1>

<h2>Controlled via checked prop</h2>

<Preview>
  <Radio />
  <Radio checked />
  <Radio checked={false} />
</Preview>

<h2>Controlled via bind:group and value</h2>

<Preview>
  <Radio bind:group value={1} />
  <Radio bind:group value={2} />
  <Radio bind:group value={3} />
</Preview>

<h2>Label</h2>

<Preview>
  <Radio bind:group value={1}>First</Radio>
  <Radio bind:group value={2}>Second</Radio>
  <Radio bind:group value={3}>Third</Radio>
</Preview>

<h2>Long labels</h2>

<Preview>
  <div class="border w-[150px] overflow-auto p-1">
    {#each { length: 5 } as _, i}
      <Radio bind:group value={i}>This is a really long label {i}</Radio>
    {/each}
  </div>
</Preview>

<h2>Long labels (truncate)</h2>

<Preview>
  <div class="border w-[150px] overflow-auto p-1">
    {#each { length: 5 } as _, i}
      <Radio bind:group value={i} classes={{ root: 'truncate max-w-full', label: 'truncate' }}
        >This is a really long label {i}</Radio
      >
    {/each}
  </div>
</Preview>

<h2>Disabled</h2>

<Preview>
  <Radio disabled />
  <Radio disabled checked />
  <Radio disabled>Label</Radio>
</Preview>

<h2>Size</h2>

<Preview>
  <div>
    <Radio size="xs" />
    <Radio size="xs" checked />
    <Radio size="xs">Label</Radio>
    <Radio size="xs" checked>Label</Radio>
  </div>
  <div>
    <Radio size="sm" />
    <Radio size="sm" checked />
    <Radio size="sm">Label</Radio>
    <Radio size="sm" checked>Label</Radio>
  </div>
  <div>
    <Radio size="md" />
    <Radio size="md" checked />
    <Radio size="md">Label</Radio>
    <Radio size="md" checked>Label</Radio>
  </div>
  <div>
    <Radio size="lg" />
    <Radio size="lg" checked />
    <Radio size="lg">Label</Radio>
    <Radio size="lg" checked>Label</Radio>
  </div>
</Preview>

<h1>API</h1>

<ApiDocs {api} />
