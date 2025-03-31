<script lang="ts">
  import { subDays, subMonths, subYears } from 'date-fns';
  import { mdiCalendarRange } from '@mdi/js';

  import { DateRangeField } from 'svelte-ux';
  import { PeriodType } from '@layerstack/utils';

  import Preview from '$lib/components/Preview.svelte';

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

<h2>PeriodType options</h2>

<Preview>
  <DateRangeField
    bind:value
    periodTypes={[PeriodType.Day, PeriodType.Month, PeriodType.CalendarYear]}
  />
</Preview>

<h2>Single PeriodType options with presets</h2>

<Preview>
  <DateRangeField bind:value periodTypes={[PeriodType.Day]} />
</Preview>

<h2>Single PeriodType options without presets</h2>

<Preview>
  <DateRangeField bind:value periodTypes={[PeriodType.Day]} getPeriodTypePresets={() => []} />
</Preview>

<h2>Quick Presets</h2>

<Preview>
  <DateRangeField
    bind:value
    quickPresets={[
      { label: 'Today', value: { from: today, to: today, periodType: PeriodType.Day } },
      {
        label: 'Yesterday',
        value: { from: subDays(today, 1), to: subDays(today, 1), periodType: PeriodType.Day },
      },
      {
        label: 'Last 7 days',
        value: { from: subDays(today, 7), to: today, periodType: PeriodType.Day },
      },
      {
        label: 'Last 30 days',
        value: { from: subDays(today, 30), to: today, periodType: PeriodType.Day },
      },
      {
        label: 'Last 6 months',
        value: { from: subMonths(today, 6), to: today, periodType: PeriodType.Month },
      },
      {
        label: 'Last year',
        value: { from: subYears(today, 1), to: today, periodType: PeriodType.CalendarYear },
      },
    ]}
  />
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

<h2>Stepper w/ rounded & centered</h2>

<Preview>
  <DateRangeField bind:value stepper rounded center />
</Preview>
