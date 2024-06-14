<script lang="ts">
  import { RangeField, uniqueId, truncate, toTitleCase } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';
  import Code from '$lib/components/Code.svelte';

  let str = 'This is very long text that will be truncated';
  let totalChars = 20;
  let endChars = 5;
</script>

<h1>Usage</h1>

<Code
  source={`import { uniqueId, truncate, toTitleCase } from 'svelte-ux';`}
  language="javascript"
  class="mb-4"
/>

<h1>Examples</h1>

<h2>truncate()</h2>

<Code source={`import { truncate } from 'svelte-ux';`} language="javascript" class="mb-4" />

<h3>Playground</h3>
<div class="grid grid-cols-2 gap-2 mb-2">
  <RangeField label="Total chars" bind:value={totalChars} />
  <RangeField label="End chars" bind:value={endChars} />
</div>
<Preview>
  <div>{truncate(str, totalChars, endChars)}</div>
</Preview>

<h3>Total only</h3>
<Preview>
  <div>{truncate(str, 20)}</div>
</Preview>

<h3>Middle ellipsis</h3>
<Preview>
  <div>{truncate(str, 20, 10)}</div>
</Preview>

<h2>unique()</h2>

<Code source={`import { uniqueId } from 'svelte-ux';`} language="javascript" class="mb-4" />

<h3>Basic</h3>
<Preview>
  <div>{uniqueId('checkbox-')}</div>
  <div>{uniqueId('checkbox-')}</div>
  <div>{uniqueId('checkbox-')}</div>
  <div>{uniqueId('radio-')}</div>
</Preview>
