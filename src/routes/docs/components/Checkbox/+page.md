---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script>
  import api from '$lib/components/Checkbox.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import AppBar from '$lib/components/AppBar.svelte';
  import Button from '$lib/components/Button.svelte';
  import Checkbox from '$lib/components/Checkbox.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import SectionDivider from '$lib/components/SectionDivider.svelte';

  let checked = true;
  let group = [2];
</script>

# Examples

## Default

<Preview>
  <Checkbox />
  <Checkbox checked />
</Preview>

## bind:checked

<Preview>
  <Checkbox bind:checked />
  <div class="text-sm">
    set: <Button size="sm" on:click={() => checked = true}>true</Button>
    <Button size="sm" on:click={() => checked = false}>false</Button>
  </div>
</Preview>

## bind:group

<Preview>
  <Checkbox bind:group value={1}>One</Checkbox>
  <Checkbox bind:group value={2}>Two</Checkbox>
  <Checkbox bind:group value={3}>Three</Checkbox>
  <Checkbox bind:group value={4} disabled>Four (disabled)</Checkbox>
  <div>{JSON.stringify(group)}</div>
  <div class="text-sm">
    <Button size="sm" on:click={() => group = []}>clear</Button>
    <Button size="sm" on:click={() => group = [1,2,3,4]}>select all</Button>
  </div>
</Preview>

## Label

<Preview>
  <Checkbox>Label</Checkbox>
  <Checkbox checked>Label</Checkbox>
</Preview>

## Long labels

<Preview>
  <div class="border w-[150px] overflow-auto p-1">
    {#each { length: 5 } as _}
      <Checkbox>This is a really long label</Checkbox>
    {/each}
  </div>
</Preview>

## Long labels (truncate)

<Preview>
  <div class="border w-[150px] overflow-auto p-1">
    {#each { length: 5 } as _}
      <Checkbox classes={{ root: 'truncate max-w-full', label: 'truncate' }}>This is a really long label</Checkbox>
    {/each}
  </div>
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

## Size

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

## Size

<Preview>
  <div>
    <Checkbox size="xs" circle />
    <Checkbox size="xs" circle checked />
    <Checkbox size="xs" circle>Label</Checkbox>
    <Checkbox size="xs" circle checked>Label</Checkbox>
  </div>
  <div>
    <Checkbox size="sm" circle />
    <Checkbox size="sm" circle checked />
    <Checkbox size="sm" circle>Label</Checkbox>
    <Checkbox size="sm" circle checked>Label</Checkbox>
  </div>
    <div>
    <Checkbox size="md" circle />
    <Checkbox size="md" circle checked />
    <Checkbox size="md" circle>Label</Checkbox>
    <Checkbox size="md" circle checked>Label</Checkbox>
  </div>
    <div>
    <Checkbox size="lg" circle />
    <Checkbox size="lg" circle checked />
    <Checkbox size="lg" circle>Label</Checkbox>
    <Checkbox size="lg" circle checked>Label</Checkbox>
  </div>
</Preview>

# API

<ApiDocs {api} />
