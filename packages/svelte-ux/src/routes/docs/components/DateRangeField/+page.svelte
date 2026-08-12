<script lang="ts">
  import { DateRangeField, Switch } from 'svelte-ux';
  import { intervalOffset, PeriodType } from '@layerstack/utils';

  import LucideCalendarRange from '~icons/lucide/calendar-range';

  import Preview from '$lib/components/Preview.svelte';

  let today = new Date();
  let value = {
    from: intervalOffset('day', today, -3),
    to: today,
    periodType: PeriodType.Day,
  };

  let valueUtc = {
    from: new Date('2026-08-01T00:00:00Z'),
    to: new Date('2026-08-31T23:59:59.999Z'),
    periodType: PeriodType.Day,
  };
  let utcValue = false;

  // Week ending the day before US DST starts (2026-03-08), to verify stepping across the transition
  let valueDst = {
    from: new Date('2026-03-01T00:00:00Z'),
    to: new Date('2026-03-07T23:59:59.999Z'),
    periodType: PeriodType.Day,
  };
  let utcDst = false;

  const iso = (date: Date | null | undefined) => date?.toISOString() ?? '(none)';
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
        value: {
          from: intervalOffset('day', today, -1),
          to: intervalOffset('day', today, -1),
          periodType: PeriodType.Day,
        },
      },
      {
        label: 'Last 7 days',
        value: { from: intervalOffset('day', today, -7), to: today, periodType: PeriodType.Day },
      },
      {
        label: 'Last 30 days',
        value: { from: intervalOffset('day', today, -30), to: today, periodType: PeriodType.Day },
      },
      {
        label: 'Last 6 months',
        value: {
          from: intervalOffset('month', today, -6),
          to: today,
          periodType: PeriodType.Month,
        },
      },
      {
        label: 'Last year',
        value: {
          from: intervalOffset('year', today, -1),
          to: today,
          periodType: PeriodType.CalendarYear,
        },
      },
    ]}
  />
</Preview>

<h2>Icon</h2>

<Preview>
  <DateRangeField bind:value icon={LucideCalendarRange} />
</Preview>

<h2>Stepper</h2>

<Preview>
  <DateRangeField bind:value stepper />
</Preview>

<h2>Stepper w/ icon</h2>

<Preview>
  <DateRangeField bind:value stepper icon={LucideCalendarRange} />
</Preview>

<h2>Stepper w/ rounded & centered</h2>

<Preview>
  <DateRangeField bind:value stepper rounded center />
</Preview>

<h2>UTC</h2>

<h3>Selected value</h3>

<div class="text-sm text-surface-content/60 mb-2">
  With <code>utc</code>, the displayed range and the picked values use the UTC calendar, so periods
  run from <code>T00:00:00.000Z</code> to <code>T23:59:59.999Z</code> instead of the local
  equivalents. The initial value is <code>2026-08-01T00:00:00Z</code> -
  <code>2026-08-31T23:59:59.999Z</code>, which is a whole month only in UTC.
</div>

<Preview>
  <label class="flex items-center gap-2 text-sm w-fit mb-3">
    <Switch bind:checked={utcValue} size="md" /> utc
  </label>

  <!-- utc is read when the nested calendar is created, so re-create on toggle -->
  {#key utcValue}
    <DateRangeField utc={utcValue} bind:value={valueUtc} icon={LucideCalendarRange} />
  {/key}

  <div class="text-sm text-surface-content/50 mt-3">
    <div>from: {iso(valueUtc?.from)}</div>
    <div>to: {iso(valueUtc?.to)}</div>
  </div>
</Preview>

<h3>Stepper across a DST transition</h3>

<div class="text-sm text-surface-content/60 mb-2">
  Starting at <code>2026-03-01</code> - <code>2026-03-07</code> (US DST starts Mar 8), step forward
  a period. With <code>utc</code> each period stays aligned to UTC midnight, while local periods keep
  local midnight and shift their UTC offset by an hour after the transition.
</div>

<Preview>
  <label class="flex items-center gap-2 text-sm w-fit mb-3">
    <Switch bind:checked={utcDst} size="md" /> utc
  </label>

  {#key utcDst}
    <DateRangeField utc={utcDst} bind:value={valueDst} stepper />
  {/key}

  <div class="text-sm text-surface-content/50 mt-3">
    <div>from: {iso(valueDst?.from)}</div>
    <div>to: {iso(valueDst?.to)}</div>
  </div>
</Preview>
