<script lang="ts">
  import {
    endOfInterval,
    intervalOffset,
    isDateAfter,
    isSameInterval,
    startOfInterval,
  } from '@layerstack/utils';

  import { MonthList, Switch } from 'svelte-ux';
  import { type SelectedDate } from '@layerstack/utils';
  import { type DateRange } from '@layerstack/utils/dateRange';

  import Preview from '$lib/components/Preview.svelte';

  let selected: SelectedDate = null;
  let selectedArr: Date[] = [];
  let selectedRange: DateRange = { from: null, to: null };
  let selectedQuarter: DateRange = { from: null, to: null };

  let selectedUtc: Date | null = null;
  let utcSelected = false;
  let utcInstant = false;

  // Instant which falls in a different month/year when read as local vs UTC (for timezones behind
  // UTC.  Timezones ahead of UTC see the same with an instant late in the UTC day)
  const yearBoundaryUtc = new Date('2026-01-01T00:00:00Z');

  const iso = (date: Date | null) => date?.toISOString() ?? '(none)';
</script>

<h1>Examples</h1>

<h2>Default</h2>

<Preview>
  <MonthList />
</Preview>

<h2>Horizontal layout</h2>

<Preview>
  <div class="grid grid-flow-col">
    <MonthList />
  </div>
</Preview>

<h2>Vertical layout</h2>

<Preview>
  <div class="grid">
    <MonthList />
  </div>
</Preview>

<h2>Auto columns (100px)</h2>

<Preview>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))]">
    <MonthList />
  </div>
</Preview>

<h2>3 columns</h2>

<Preview>
  <div class="grid grid-cols-3">
    <MonthList />
  </div>
</Preview>

<h2>Format w/ as name</h2>

<Preview>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))]">
    <MonthList format="MMMM" />
  </div>
</Preview>

<h2>Format w/ as number</h2>

<Preview>
  <MonthList format="M" />
</Preview>

<h2>Disabled months w/ single</h2>

<Preview>
  <MonthList disabledDates={new Date()} />
</Preview>

<h2>Disabled months w/ array</h2>

<Preview>
  <MonthList
    disabledDates={[
      intervalOffset('month', new Date(), -2),
      new Date(),
      intervalOffset('month', new Date(), 2),
    ]}
  />
</Preview>

<h2>Disabled months w/ range</h2>

<Preview>
  <MonthList
    disabledDates={{
      from: intervalOffset('month', new Date(), -2),
      to: intervalOffset('month', new Date(), 2),
    }}
  />
</Preview>

<h2>Disabled months w/ function</h2>

<Preview>
  <MonthList disabledDates={(date) => isDateAfter(date, new Date())} />
</Preview>

<h2>Selected w/ single</h2>

<Preview>
  <MonthList selected={new Date()} />
</Preview>

<h2>Selected w/ array</h2>

<Preview>
  <MonthList
    selected={[
      intervalOffset('month', new Date(), -2),
      new Date(),
      intervalOffset('month', new Date(), 2),
    ]}
  />
</Preview>

<h2>Selected w/ range</h2>

<Preview>
  <MonthList
    selected={{
      from: intervalOffset('month', new Date(), -2),
      to: intervalOffset('month', new Date(), 2),
    }}
  />
</Preview>

<h2>Selected state w/ single</h2>

<Preview>
  <MonthList
    {selected}
    on:dateChange={(e) => {
      selected = e.detail;
    }}
  />
</Preview>

<h2>Selected state w/ array</h2>

<Preview>
  <MonthList
    selected={selectedArr}
    on:dateChange={(e) => {
      const date = e.detail;
      if (selectedArr.some((d) => isSameInterval('month', d, date))) {
        selectedArr = selectedArr.filter((d) => !isSameInterval('month', d, date));
      } else {
        selectedArr = [...selectedArr, date];
      }
    }}
  />
</Preview>

<h2>Selected state w/ range</h2>

<Preview>
  <MonthList
    selected={selectedRange}
    on:dateChange={(e) => {
      const date = e.detail;
      const newSelectedRange = { ...selectedRange };
      if (selectedRange.from === null) {
        newSelectedRange.from = date;
      } else if (isSameInterval('month', date, selectedRange.from)) {
        newSelectedRange.from = null;
      } else if (selectedRange.to === null) {
        if (isDateAfter(date, selectedRange.from)) {
          newSelectedRange.to = date;
        } else {
          newSelectedRange.to = selectedRange.from;
          newSelectedRange.from = date;
        }
      } else if (isSameInterval('month', date, selectedRange.to)) {
        newSelectedRange.to = null;
      } else {
        newSelectedRange.from = date;
        newSelectedRange.to = null;
      }
      selectedRange = newSelectedRange;
    }}
  />
</Preview>

<h2>Selected state w/ quarter</h2>

<Preview>
  <div class="grid grid-cols-6">
    <MonthList
      selected={selectedQuarter}
      on:dateChange={(e) => {
        const date = e.detail;
        selectedQuarter = {
          from: startOfInterval('quarter', date),
          to: endOfInterval('quarter', date),
        };
      }}
    />
  </div>
</Preview>

<h2>UTC</h2>

<h3>Selected state</h3>

<div class="text-sm text-surface-content/60 mb-2">
  With <code>utc</code>, the months are built from UTC boundaries and selections are dispatched as
  the UTC start of month (<code>-01T00:00:00.000Z</code>) instead of the local one.
</div>

<Preview>
  <label class="flex items-center gap-2 text-sm w-fit mb-3">
    <Switch bind:checked={utcSelected} size="md" /> utc
  </label>

  <div class="grid grid-cols-3">
    <MonthList
      utc={utcSelected}
      selected={selectedUtc}
      on:dateChange={(e) => {
        selectedUtc = e.detail;
      }}
    />
  </div>

  <div class="text-sm text-surface-content/50 mt-3">{iso(selectedUtc)}</div>
</Preview>

<h3>Selected w/ instant near a year boundary</h3>

<div class="text-sm text-surface-content/60 mb-2">
  <code>2026-01-01T00:00:00Z</code> is still Dec 2025 in timezones behind UTC (ex. Americas), so
  with
  <code>{'year={2026}'}</code> nothing is selected until <code>utc</code> is enabled. Timezones
  ahead of UTC (ex. Europe/Asia) see the same with an instant late in the UTC day (ex.
  <code>2026-12-31T23:00:00Z</code>).
</div>

<Preview>
  <label class="flex items-center gap-2 text-sm w-fit mb-3">
    <Switch bind:checked={utcInstant} size="md" /> utc
  </label>

  <div class="grid grid-cols-3">
    <MonthList year={2026} utc={utcInstant} selected={yearBoundaryUtc} />
  </div>

  <div class="text-sm text-surface-content/50 mt-3">{iso(yearBoundaryUtc)}</div>
</Preview>
