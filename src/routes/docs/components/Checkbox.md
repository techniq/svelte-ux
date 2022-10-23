---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script>
  import api from '$lib/components/Checkbox.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import AppBar from '$lib/components/AppBar.svelte';
  import Checkbox from '$lib/components/Checkbox.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import SectionDivider from '$lib/components/SectionDivider.svelte';
</script>

# Examples

## Default

<Preview>
  <Checkbox />
  <Checkbox checked />
</Preview>

## Label

<Preview>
  <Checkbox>Label</Checkbox>
  <Checkbox checked>Label</Checkbox>
</Preview>

## Disabled

<Preview>
  <Checkbox disabled />
  <Checkbox disabled checked />
  <Checkbox disabled>Label</Checkbox>
  <Checkbox disabled checked>Label</Checkbox>
</Preview>

## Indeterminate

<Preview>
  <Checkbox indeterminate />
  <Checkbox indeterminate checked />
</Preview>

## Dense

<Preview>
  <div>
    <Checkbox size="xs" />
    <Checkbox size="xs" checked />
    <Checkbox size="xs">Label</Checkbox>
    <Checkbox size="xs" checked>Label</Checkbox>
  </div>
  <div>
    <Checkbox size="sm" />
    <Checkbox size="sm" checked />
    <Checkbox size="sm">Label</Checkbox>
    <Checkbox size="sm" checked>Label</Checkbox>
  </div>
    <div>
    <Checkbox size="md" />
    <Checkbox size="md" checked />
    <Checkbox size="md">Label</Checkbox>
    <Checkbox size="md" checked>Label</Checkbox>
  </div>
    <div>
    <Checkbox size="lg" />
    <Checkbox size="lg" checked />
    <Checkbox size="lg">Label</Checkbox>
    <Checkbox size="lg" checked>Label</Checkbox>
  </div>
</Preview>

<SectionDivider>Circle</SectionDivider>

## Default

<Preview>
  <Checkbox circle />
  <Checkbox circle checked />
  <Checkbox circle />
</Preview>

## Label

<Preview>
  <Checkbox circle>First</Checkbox>
  <Checkbox circle>Second</Checkbox>
  <Checkbox circle>Third</Checkbox>
</Preview>

## Disabled

<Preview>
  <Checkbox circle disabled />
  <Checkbox circle disabled checked />
</Preview>

## Indeterminate

<Preview>
  <Checkbox circle indeterminate />
  <Checkbox circle indeterminate checked />
</Preview>

## Dense

<Preview>
  <Checkbox circle dense />
  <Checkbox circle dense checked />
</Preview>

# API

<ApiDocs {api} />
