<script lang="ts">
  import { Button, Checkbox, SectionDivider } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';

  let checked = $state(true);
  let group = $state([2]);
</script>

<h1>Examples</h1>

<h2>Default</h2>

<Preview>
  <Checkbox />
  <Checkbox checked />
</Preview>

<h2>bind:checked</h2>

<Preview>
  <Checkbox bind:checked />
  <div class="text-sm">
    set: <Button size="sm" onclick={() => (checked = true)}>true</Button>
    <Button size="sm" onclick={() => (checked = false)}>false</Button>
  </div>
</Preview>

<h2>bind:group</h2>

<Preview>
  <Checkbox bind:group value={1}>One</Checkbox>
  <Checkbox bind:group value={2}>Two</Checkbox>
  <Checkbox bind:group value={3}>Three</Checkbox>
  <Checkbox bind:group value={4} disabled>Four (disabled)</Checkbox>
  <div>{JSON.stringify(group)}</div>
  <div class="text-sm">
    <Button size="sm" onclick={() => (group = [])}>clear</Button>
    <Button size="sm" onclick={() => (group = [1, 2, 3, 4])}>select all</Button>
  </div>
</Preview>

<h2>Label</h2>

<Preview>
  <Checkbox>Label</Checkbox>
  <Checkbox checked>Label</Checkbox>
</Preview>

<h2>Full width</h2>

<Preview>
  <Checkbox fullWidth>One</Checkbox>
  <Checkbox fullWidth>Two</Checkbox>
  <Checkbox fullWidth>Three</Checkbox>
  <Checkbox fullWidth>Four (disabled)</Checkbox>
</Preview>

<h2>Long labels</h2>

<Preview>
  <div class="border w-[150px] overflow-auto p-1">
    {#each { length: 5 } as _}
      <Checkbox>This is a really long label</Checkbox>
    {/each}
  </div>
</Preview>

<h2>Long labels (truncate)</h2>

<Preview>
  <div class="border w-[150px] overflow-auto p-1">
    {#each { length: 5 } as _}
      <Checkbox classes={{ root: 'truncate max-w-full', label: 'truncate' }}
        >This is a really long label</Checkbox
      >
    {/each}
  </div>
</Preview>

<h2>Disabled</h2>

<Preview>
  <Checkbox disabled />
  <Checkbox disabled checked />
  <Checkbox disabled>Label</Checkbox>
  <Checkbox disabled checked>Label</Checkbox>
</Preview>

<h2>Indeterminate</h2>

<Preview>
  <Checkbox indeterminate />
  <Checkbox indeterminate checked />
</Preview>

<h2>Size</h2>

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

<h2>Default</h2>

<Preview>
  <Checkbox circle />
  <Checkbox circle checked />
  <Checkbox circle />
</Preview>

<h2>Label</h2>

<Preview>
  <Checkbox circle>First</Checkbox>
  <Checkbox circle>Second</Checkbox>
  <Checkbox circle>Third</Checkbox>
</Preview>

<h2>Disabled</h2>

<Preview>
  <Checkbox circle disabled />
  <Checkbox circle disabled checked />
</Preview>

<h2>Indeterminate</h2>

<Preview>
  <Checkbox circle indeterminate />
  <Checkbox circle indeterminate checked />
</Preview>

<h2>Size</h2>

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
