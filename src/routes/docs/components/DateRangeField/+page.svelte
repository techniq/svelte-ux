<script lang="ts">
  import { subDays } from 'date-fns';

  import { mdiCalendarRange } from '@mdi/js';

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

<h1>Examples</h1>

<h2>Default</h2>

<Preview>
  <DateRangeField />
</Preview>

<h2>Controlled</h2>

<Preview>
  <DateRangeField bind:value />
</Preview>

<h2>Clearable</h2>

<Preview>
  <DateRangeField bind:value clearable />
</Preview>

<h2>Icon</h2>

<Preview>
  <DateRangeField bind:value icon={mdiCalendarRange} />
</Preview>

<h2>Stepper</h2>

<Preview>
  <DateRangeField bind:value stepper />
</Preview>

<h2>Stepper w/ icon</h2>

<Preview>
  <DateRangeField bind:value stepper icon={mdiCalendarRange} />
</Preview>

<h2>Stepper w/ rounded & filled & centered</h2>

<Preview>
  <DateRangeField bind:value stepper rounded filled center />
</Preview>
