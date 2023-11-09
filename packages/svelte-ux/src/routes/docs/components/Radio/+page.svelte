<script lang="ts">
  import Preview from '$lib/components/Preview.svelte';
  import Radio from '$lib/components/Radio.svelte';

  let group: number | undefined = undefined;
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
  <Radio name="group-value" bind:group value={1} />
  <Radio name="group-value" bind:group value={2} />
  <Radio name="group-value" bind:group value={3} />
</Preview>

<h2>Label</h2>

<Preview>
  <Radio name="label" bind:group value={1}>First</Radio>
  <Radio name="label" bind:group value={2}>Second</Radio>
  <Radio name="label" bind:group value={3}>Third</Radio>
</Preview>

<h2>Long labels</h2>

<Preview>
  <div class="border w-[150px] overflow-auto p-1">
    {#each { length: 5 } as _, i}
      <Radio name="long-label" bind:group value={i}>This is a really long label {i}</Radio>
    {/each}
  </div>
</Preview>

<h2>Long labels (truncate)</h2>

<Preview>
  <div class="border w-[150px] overflow-auto p-1">
    {#each { length: 5 } as _, i}
      <Radio
        name="long-label-truncate"
        bind:group
        value={i}
        classes={{ root: 'truncate max-w-full', label: 'truncate' }}
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
    <Radio name="xs" size="xs" />
    <Radio name="xs" size="xs" checked />
    <Radio name="xs" size="xs">Label</Radio>
    <Radio name="xs" size="xs" checked>Label</Radio>
  </div>
  <div>
    <Radio name="sm" size="sm" />
    <Radio name="sm" size="sm" checked />
    <Radio name="sm" size="sm">Label</Radio>
    <Radio name="sm" size="sm" checked>Label</Radio>
  </div>
  <div>
    <Radio name="md" size="md" />
    <Radio name="md" size="md" checked />
    <Radio name="md" size="md">Label</Radio>
    <Radio name="md" size="md" checked>Label</Radio>
  </div>
  <div>
    <Radio name="lg" size="lg" />
    <Radio name="lg" size="lg" checked />
    <Radio name="lg" size="lg">Label</Radio>
    <Radio name="lg" size="lg" checked>Label</Radio>
  </div>
</Preview>
