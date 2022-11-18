---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script>
  import api from '$lib/components/Radio.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import AppBar from '$lib/components/AppBar.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import Radio from '$lib/components/Radio.svelte';

  let group = undefined;
</script>

# Examples

## Controlled via checked prop

<Preview>
  <Radio />
  <Radio checked />
  <Radio checked={false} />
</Preview>

## Controlled via bind:group and value

<Preview>
  <Radio bind:group value={1} />
  <Radio bind:group value={2} />
  <Radio bind:group value={3} />
</Preview>

## Label

<Preview>
  <Radio bind:group value={1}>First</Radio>
  <Radio bind:group value={2}>Second</Radio>
  <Radio bind:group value={3}>Third</Radio>
</Preview>

## Long labels

<Preview>
  <div class="border w-[150px] overflow-auto p-1">
    {#each { length: 5 } as _, i}
      <Radio bind:group value={i}>This is a really long label {i}</Radio>
    {/each}
  </div>
</Preview>

## Long labels (truncate)

<Preview>
  <div class="border w-[150px] overflow-auto p-1">
    {#each { length: 5 } as _, i}
      <Radio bind:group value={i} classes={{ root: 'truncate max-w-full', label: 'truncate' }}>This is a really long label {i}</Radio>
    {/each}
  </div>
</Preview>

## Disabled

<Preview>
  <Radio disabled />
  <Radio disabled checked />
  <Radio disabled>Label</Radio>
</Preview>

## Size

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

# API

<ApiDocs {api} />
