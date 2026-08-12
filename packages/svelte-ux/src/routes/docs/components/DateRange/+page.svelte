<script lang="ts">
  import { startOfInterval, endOfInterval } from '@layerstack/utils';
  import { DateRange, getSettings, Switch } from 'svelte-ux';
  import { PeriodType, getDateFuncsByPeriodType } from '@layerstack/utils';
  import type { DateRange as DateRangeType } from '@layerstack/utils/dateRange';

  import Preview from '$lib/components/Preview.svelte';

  const { localeSettings } = getSettings();

  let selected = {
    from: new Date('1982-03-01T00:00:00'),
    to: new Date('1982-03-31T23:59:59'),
    periodType: 30,
  };
  // $: console.log({ selected });

  let selectedUtc: DateRangeType | null = { from: null, to: null, periodType: PeriodType.Day };
  let utcSelected = false;

  const iso = (date: Date | null | undefined) => date?.toISOString() ?? '(none)';
</script>

<h1>Examples</h1>

<h2>Default</h2>

<Preview>
  <DateRange />
</Preview>

<h2>Controlled</h2>

<Preview>
  <DateRange bind:selected />
</Preview>

<h2>PeriodType options</h2>

<Preview>
  <DateRange
    periodTypes={[
      PeriodType.Month,
      PeriodType.Quarter,
      PeriodType.CalendarYear,
      PeriodType.FiscalYearOctober,
    ]}
  />
</Preview>

<h2>Single PeriodType options with presets</h2>

<Preview>
  <DateRange periodTypes={[PeriodType.Day]} />
</Preview>

<h2>Single PeriodType options without presets</h2>

<Preview>
  <DateRange periodTypes={[PeriodType.Day]} getPeriodTypePresets={() => []} />
</Preview>

<h2>PeriodType presets</h2>

<Preview>
  <DateRange
    periodTypes={[PeriodType.Day, PeriodType.Month]}
    getPeriodTypePresets={(fnSettings, fnPeriodType) => {
      const { start, end, add } = getDateFuncsByPeriodType($localeSettings, fnPeriodType);

      if (fnPeriodType === PeriodType.Day) {
        const today = startOfInterval('day', new Date());
        const yesterday = start(add(today, -1));
        return [
          {
            label: 'Month to date',
            value: {
              from: startOfInterval('month', today),
              to: end(today),
              periodType: fnPeriodType,
            },
          },
          {
            label: 'Year to date',
            value: {
              from: startOfInterval('year', today),
              to: end(today),
              periodType: fnPeriodType,
            },
          },
          {
            label: 'Last 30 days',
            value: {
              from: add(yesterday, -29),
              to: end(yesterday),
              periodType: fnPeriodType,
            },
          },
          {
            label: 'Last 60 days',
            value: {
              from: add(yesterday, -59),
              to: end(yesterday),
              periodType: fnPeriodType,
            },
          },
          {
            label: 'Last 90 days',
            value: {
              from: add(yesterday, -89),
              to: end(yesterday),
              periodType: fnPeriodType,
            },
          },
          {
            label: 'Last 180 days',
            value: {
              from: add(yesterday, -179),
              to: end(yesterday),
              periodType: fnPeriodType,
            },
          },
          {
            label: 'Last 365 days',
            value: {
              from: add(yesterday, -364),
              to: end(yesterday),
              periodType: fnPeriodType,
            },
          },
        ];
      } else if (fnPeriodType === PeriodType.Month) {
        const today = endOfInterval('month', new Date());
        const lastMonth = start(add(today, -1));

        return [
          {
            label: 'Current month', // Month to Date
            value: {
              from: start(today),
              to: end(today),
              periodType: fnPeriodType,
            },
          },
          {
            label: 'Last month',
            value: {
              from: lastMonth,
              to: end(lastMonth),
              periodType: fnPeriodType,
            },
          },
          {
            label: 'Last 3 months',
            value: {
              from: start(add(lastMonth, -2)),
              to: end(lastMonth),
              periodType: fnPeriodType,
            },
          },
          {
            label: 'Last 6 months',
            value: {
              from: start(add(lastMonth, -5)),
              to: end(lastMonth),
              periodType: fnPeriodType,
            },
          },
          {
            label: 'Last 12 months',
            value: {
              from: start(add(lastMonth, -11)),
              to: end(lastMonth),
              periodType: fnPeriodType,
            },
          },
        ];
      } else {
        return [];
      }
    }}
  />
</Preview>

<h2>UTC</h2>

<div class="text-sm text-surface-content/60 mb-2">
  With <code>utc</code>, period boundaries and presets are calculated on the UTC calendar, so a
  selected day/month/year starts at <code>T00:00:00.000Z</code> and ends at
  <code>T23:59:59.999Z</code> instead of the local equivalents. Pick a range, or apply a preset, and
  compare with <code>utc</code> toggled.
</div>

<Preview>
  <label class="flex items-center gap-2 text-sm w-fit mb-3">
    <Switch bind:checked={utcSelected} size="md" /> utc
  </label>

  <!-- utc is read when the nested calendar is created, so re-create on toggle -->
  {#key utcSelected}
    <DateRange utc={utcSelected} bind:selected={selectedUtc} />
  {/key}

  <div class="text-sm text-surface-content/50 mt-3">
    <div>from: {iso(selectedUtc?.from)}</div>
    <div>to: {iso(selectedUtc?.to)}</div>
  </div>
</Preview>
