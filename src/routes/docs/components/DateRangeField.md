<script lang="ts">
  import { subDays } from 'date-fns';

  import Preview from '../components/Preview.svelte';
  import DateRangeField from '../components/DateRangeField.svelte';

  import { PeriodType } from '../utils/date';

  let today = new Date();
  let value = {
    from: subDays(today, 3),
    to: today,
    periodType: PeriodType.Day,
  };
</script>

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
