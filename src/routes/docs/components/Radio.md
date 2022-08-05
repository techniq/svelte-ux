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

## Disabled

<Preview>
  <Radio disabled />
  <Radio disabled checked />
  <Radio disabled>Label</Radio>
</Preview>

## Dense

<Preview>
  <Radio dense />
  <Radio dense checked />
  <Radio dense>Label</Radio>
</Preview>

# API

<ApiDocs {api} />
