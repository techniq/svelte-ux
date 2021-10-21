<script>
  import { parseISO, addDays } from 'date-fns';
  
  import Button from '$lib/components/Button.svelte';
  import DateField from '$lib/components/DateField.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import SectionDivider from '$lib/components/SectionDivider.svelte';

  let value;
</script>

## Default

<Preview>
  <DateField />
</Preview>

## Value

<Preview>
  <DateField value={parseISO('1982-03-30')} />
</Preview>

## Controlled

<Preview>
  <DateField {value} />
  <Button on:click={() => value = new Date()}>Today</Button>
  <Button on:click={() => value = addDays(new Date(), -1)}>Yesterday</Button>
  <Button on:click={() => value = addDays(new Date(), -7)}>Last Week</Button>
  <Button on:click={() => value = addDays(new Date(), 7)}>Next Week</Button>
</Preview>

## Clearable

<Preview>
  <DateField {value} on:change={e => value = e.detail.value } clearable />
</Preview>

## Label

<Preview>
  <DateField label="Birth date" />
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
  <DateField label="Birth date" on:change={e => console.log(e.detail)} />
</Preview>
