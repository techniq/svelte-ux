<script>
  import { addDays } from 'date-fns';

  import { mdiCalendarStart, mdiCalendarEnd } from '@mdi/js';

  import api from '$lib/components/DateField.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Button from '$lib/components/Button.svelte';
  import DateField from '$lib/components/DateField.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import SectionDivider from '$lib/components/SectionDivider.svelte';

  let value;
</script>

<h1>Examples</h1>

<h2>Playground</h2>

<Preview>
  <DateField
    label="Birth date"
    {value}
    on:change={(e) => (value = e.detail.value)}
    picker
    clearable
  />
  value: {value}
</Preview>

<h2>Controlled</h2>

<Preview>
  <DateField {value} />
  <Button on:click={() => (value = new Date())}>Today</Button>
  <Button on:click={() => (value = addDays(new Date(), -1))}>Yesterday</Button>
  <Button on:click={() => (value = addDays(new Date(), -7))}>Last Week</Button>
  <Button on:click={() => (value = addDays(new Date(), 7))}>Next Week</Button>
</Preview>

<h2>Picker</h2>

<Preview>
  <DateField {value} on:change={(e) => (value = e.detail.value)} picker />
</Preview>

<h2>Clearable</h2>

<Preview>
  <DateField {value} on:change={(e) => (value = e.detail.value)} clearable />
</Preview>

<h2>Label</h2>

<Preview>
  <DateField label="Birth date" />
</Preview>

<h2>Icon</h2>

<Preview>
  <div class="grid gap-2">
    <DateField label="Start date" icon={mdiCalendarStart} />
    <DateField label="End date" icon={mdiCalendarEnd} />
  </div>
</Preview>

<h2>Error</h2>

<Preview>
  <DateField label="Birth date" error="This is a required field" />
</Preview>

<h2>Disabled</h2>

<Preview>
  <DateField label="Birth date" disabled />
</Preview>

<h2>on:change event</h2>

<Preview>
  <DateField label="Birth date" on:change={(e) => console.log(e.detail)} />
</Preview>

<h1>API</h1>

<ApiDocs {api} />
