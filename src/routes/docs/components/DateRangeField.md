---
component: $component
filename: $filename
---

<script lang="ts">
  import { subDays } from 'date-fns';

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

## Stepper

<Preview>
  <DateRangeField bind:value stepper />
</Preview>

## Stepper w/ rounded & filled

<Preview>
  <DateRangeField bind:value stepper rounded filled />
</Preview>

# API

<ApiDocs {api} />
