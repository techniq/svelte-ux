---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script lang="ts">
  import { mdiCalendar } from '@mdi/js';

  import api from '$lib/components/DatePickerField.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Preview from '$lib/components/Preview.svelte';
  import DatePickerField from '$lib/components/DatePickerField.svelte';

  import { PeriodType } from '$lib/utils/date';

  let value = new Date();
</script>

# Examples

## Default

<Preview>
  <DatePickerField />
</Preview>

## Controlled

<Preview>
  <DatePickerField bind:value />
</Preview>

## Icon

<Preview>
  <DatePickerField icon={mdiCalendar} bind:value />
</Preview>

## Label

<Preview>
  <DatePickerField label="Date of Birth" icon={mdiCalendar} bind:value />
</Preview>

## Stepper w/ default (day)

<Preview>
  <DatePickerField bind:value stepper />
</Preview>

## Stepper w/ month

<Preview>
  <DatePickerField periodType={PeriodType.Month} bind:value stepper />
</Preview>

## Stepper w/ rounded & filled

<Preview>
  <DatePickerField bind:value stepper rounded filled />
</Preview>

## Stepper w/ rounded & filled & center

<Preview>
  <DatePickerField bind:value stepper rounded filled center />
</Preview>

## Icon only

<Preview>
  <DatePickerField iconOnly />
</Preview>

## Label only

<Preview>
  <DatePickerField label="Start Date" />
</Preview>

## Clearable

<Preview>
  <DatePickerField label="Start Date" clearable />
</Preview>

# API

<ApiDocs {api} />
