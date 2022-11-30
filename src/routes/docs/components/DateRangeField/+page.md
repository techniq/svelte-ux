---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script lang="ts">
  import { subDays } from 'date-fns';

  import { mdiCalendarRange } from '@mdi/js';

  import api from '$lib/components/DateRangeField.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Preview from '$lib/components/Preview.svelte';
  import DateRangeField from '$lib/components/DateRangeField.svelte';

  import { PeriodType } from '$lib/utils/date';

  let today = new Date();
  let value = {
    from: subDays(today, 3),
    to: today,
    periodType: PeriodType.Day,
  };
</script>

# Examples

## Default

<Preview>
  <DateRangeField />
</Preview>

## Controlled

<Preview>
  <DateRangeField bind:value />
</Preview>

## Clearable

<Preview>
  <DateRangeField bind:value clearable />
</Preview>

## Icon

<Preview>
  <DateRangeField bind:value  icon={mdiCalendarRange} />
</Preview>

## Stepper

<Preview>
  <DateRangeField bind:value stepper />
</Preview>

## Stepper w/ icon

<Preview>
  <DateRangeField bind:value stepper icon={mdiCalendarRange} />
</Preview>

## Stepper w/ rounded & filled & centered

<Preview>
  <DateRangeField  bind:value stepper rounded filled center />
</Preview>

# API

<ApiDocs {api} />
