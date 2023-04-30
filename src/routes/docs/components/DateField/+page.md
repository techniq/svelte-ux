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

# Examples

## Playground

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

## Controlled

<Preview>
  <DateField {value} />
  <Button on:click={() => (value = new Date())}>Today</Button>
  <Button on:click={() => (value = addDays(new Date(), -1))}>Yesterday</Button>
  <Button on:click={() => (value = addDays(new Date(), -7))}>Last Week</Button>
  <Button on:click={() => (value = addDays(new Date(), 7))}>Next Week</Button>
</Preview>

## Picker

<Preview>
  <DateField {value} on:change={(e) => (value = e.detail.value)} picker />
</Preview>

## Clearable

<Preview>
  <DateField {value} on:change={(e) => (value = e.detail.value)} clearable />
</Preview>

## Label

<Preview>
  <DateField label="Birth date" />
</Preview>

## Icon

<Preview>
  <div class="grid gap-2">
    <DateField label="Start date" icon={mdiCalendarStart} />
    <DateField label="End date" icon={mdiCalendarEnd} />
  </div>
</Preview>

## Error

<Preview>
  <DateField label="Birth date" error="This is a required field" />
</Preview>

## Disabled

<Preview>
  <DateField label="Birth date" disabled />
</Preview>

## on:change event

<Preview>
  <DateField label="Birth date" on:change={(e) => console.log(e.detail)} />
</Preview>

# API

<ApiDocs {api} />
