<script lang="ts">
  import { addDays } from 'date-fns';

  import { mdiCalendarStart, mdiCalendarEnd } from '@mdi/js';

  import Button from '$lib/components/Button.svelte';
  import DateField from '$lib/components/DateField.svelte';
  import Preview from '$lib/components/Preview.svelte';

  import { getSettings } from '$lib/components/settings.js';
  const { localeSettings } = getSettings();

  let value: Date;
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
  <Button on:click={() => (value = new Date())}>
    {$localeSettings.dictionary.Date.PeriodDay.Current}
  </Button>
  <Button on:click={() => (value = addDays(new Date(), -1))}>
    {$localeSettings.dictionary.Date.PeriodDay.Last}
  </Button>
  <Button on:click={() => (value = addDays(new Date(), -7))}>
    {$localeSettings.dictionary.Date.PeriodWeek.Last}
  </Button>
  <Button on:click={() => (value = addDays(new Date(), 7))}>
    <!-- TODO: Add to dictionary -->
    Next week
  </Button>
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

<h2>Custom format (ignore Intl settings)</h2>

<Preview>
  <DateField
    label="Birth date"
    {value}
    on:change={(e) => (value = e.detail.value)}
    picker
    clearable
    format="dd/MM/yyyy"
  />
  value: {value}
</Preview>
