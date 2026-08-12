<script lang="ts">
  import { Month, Switch } from 'svelte-ux';
  import type { DateRange } from '@layerstack/utils/dateRange';
  import Preview from '$lib/components/Preview.svelte';
  import {
    intervalOffset,
    isDateAfter,
    isSameInterval,
    startOfInterval,
    endOfInterval,
  } from '@layerstack/utils';

  let selected: Date | null = null;
  let selectedArr: Date[] = [];
  let selectedRange: DateRange = { from: null, to: null };
  let selectedWeek: DateRange = { from: null, to: null };
  let selectedMultiMonth: DateRange = { from: null, to: null };

  let selectedUtc: Date | null = null;
  let utcSelected = false;
  let utcInstant = false;
  let utcDisabled = false;

  // Instant which falls on a different calendar day when read as local vs UTC (for timezones behind
  // UTC.  Timezones ahead of UTC see the same with an instant late in the UTC day)
  const dayBoundaryUtc = new Date('2026-08-01T00:00:00Z');

  const iso = (date: Date | null) => date?.toISOString() ?? '(none)';
</script>

<h1>Examples</h1>

<h2>Default</h2>

<Preview>
  <Month />
</Preview>

<h2>Show Outside Days</h2>

<Preview>
  <Month showOutsideDays />
</Preview>

<h2>Disabled days w/ single</h2>

<Preview>
  <Month disabledDates={new Date()} />
</Preview>

<h2>Disabled days w/ array</h2>

<Preview>
  <Month
    disabledDates={[
      intervalOffset('day', new Date(), -2),
      new Date(),
      intervalOffset('day', new Date(), 2),
    ]}
  />
</Preview>

<h2>Disabled days w/ range</h2>

<Preview>
  <Month
    disabledDates={{
      from: intervalOffset('day', new Date(), -2),
      to: intervalOffset('day', new Date(), 2),
    }}
  />
</Preview>

<h2>Disabled days w/ function</h2>

<Preview>
  <Month disabledDates={(date) => isDateAfter(date, new Date())} />
</Preview>

<h2>Selected w/ single</h2>

<Preview>
  <Month selected={new Date()} />
</Preview>

<h2>Selected w/ array</h2>

<Preview>
  <Month
    selected={[
      intervalOffset('day', new Date(), -2),
      new Date(),
      intervalOffset('day', new Date(), 2),
    ]}
  />
</Preview>

<h2>Selected w/ range</h2>

<Preview>
  <Month
    selected={{
      from: intervalOffset('day', new Date(), -2),
      to: intervalOffset('day', new Date(), 2),
    }}
  />
</Preview>

<h2>Selected state w/ single</h2>

<Preview>
  <Month
    {selected}
    on:dateChange={(e) => {
      selected = e.detail;
    }}
  />
</Preview>

<h2>Selected state w/ array</h2>

<Preview>
  <Month
    selected={selectedArr}
    on:dateChange={(e) => {
      const date = e.detail;
      if (selectedArr.some((d) => isSameInterval('day', d, date))) {
        selectedArr = selectedArr.filter((d) => !isSameInterval('day', d, date));
      } else {
        selectedArr = [...selectedArr, date];
      }
    }}
  />
</Preview>

<h2>Selected state w/ range</h2>

<Preview>
  <Month
    selected={selectedRange}
    on:dateChange={(e) => {
      const date = e.detail;
      const newSelectedRange = { ...selectedRange };
      if (selectedRange.from === null) {
        newSelectedRange.from = date;
      } else if (isSameInterval('day', date, selectedRange.from)) {
        newSelectedRange.from = null;
      } else if (selectedRange.to === null) {
        if (isDateAfter(date, selectedRange.from)) {
          newSelectedRange.to = date;
        } else {
          newSelectedRange.to = selectedRange.from;
          newSelectedRange.from = date;
        }
      } else if (isSameInterval('day', date, selectedRange.to)) {
        newSelectedRange.to = null;
      } else {
        newSelectedRange.from = date;
        newSelectedRange.to = null;
      }
      selectedRange = newSelectedRange;
    }}
  />
</Preview>

<h2>Selected state w/ week</h2>

<Preview>
  <Month
    selected={selectedWeek}
    on:dateChange={(e) => {
      const date = e.detail;
      selectedWeek = { from: startOfInterval('week', date), to: endOfInterval('week', date) };
    }}
  />
</Preview>

<h2>Selected state w/ multi-month</h2>

<Preview>
  <div class="grid grid-cols-[1fr_1fr] gap-10">
    <div>
      <Month
        selected={selectedMultiMonth}
        on:dateChange={(e) => {
          const date = e.detail;
          const newSelectedRange = { ...selectedMultiMonth };
          if (selectedMultiMonth.from === null) {
            newSelectedRange.from = date;
          } else if (isSameInterval('day', date, selectedMultiMonth.from)) {
            newSelectedRange.from = null;
          } else if (selectedMultiMonth.to === null) {
            if (isDateAfter(date, selectedMultiMonth.from)) {
              newSelectedRange.to = date;
            } else {
              newSelectedRange.to = selectedMultiMonth.from;
              newSelectedRange.from = date;
            }
          } else if (isSameInterval('day', date, selectedMultiMonth.to)) {
            newSelectedRange.to = null;
          } else {
            newSelectedRange.from = date;
            newSelectedRange.to = null;
          }
          selectedMultiMonth = newSelectedRange;
        }}
      />
    </div>
    <div>
      <Month
        selected={selectedMultiMonth}
        startOfMonth={startOfInterval('month', intervalOffset('month', new Date(), 1))}
        on:dateChange={(e) => {
          const date = e.detail;
          const newSelectedRange = { ...selectedMultiMonth };
          if (selectedMultiMonth.from === null) {
            newSelectedRange.from = date;
          } else if (isSameInterval('day', date, selectedMultiMonth.from)) {
            newSelectedRange.from = null;
          } else if (selectedMultiMonth.to === null) {
            if (isDateAfter(date, selectedMultiMonth.from)) {
              newSelectedRange.to = date;
            } else {
              newSelectedRange.to = selectedMultiMonth.from;
              newSelectedRange.from = date;
            }
          } else if (isSameInterval('day', date, selectedMultiMonth.to)) {
            newSelectedRange.to = null;
          } else {
            newSelectedRange.from = date;
            newSelectedRange.to = null;
          }
          selectedMultiMonth = newSelectedRange;
        }}
      />
    </div>
  </div>
</Preview>

<h2>UTC</h2>

<h3>Selected state</h3>

<div class="text-sm text-surface-content/60 mb-2">
  With <code>utc</code>, the grid is built from UTC day boundaries and selections are dispatched as
  UTC midnight (<code>T00:00:00.000Z</code>) instead of local midnight. Toggle it and re-select the
  same day to compare.
</div>

<Preview>
  <label class="flex items-center gap-2 text-sm w-fit mb-3">
    <Switch bind:checked={utcSelected} size="md" /> utc
  </label>

  <!-- utc is read when the component is created, so re-create it when toggled -->
  {#key utcSelected}
    <Month
      utc={utcSelected}
      selected={selectedUtc}
      on:dateChange={(e) => {
        selectedUtc = e.detail;
      }}
    />
  {/key}

  <div class="text-sm text-surface-content/50 mt-3">{iso(selectedUtc)}</div>
</Preview>

<h3>Selected w/ instant near a day boundary</h3>

<div class="text-sm text-surface-content/60 mb-2">
  <code>2026-08-01T00:00:00Z</code> is still Jul 31 in timezones behind UTC (ex. Americas), so
  enabling <code>utc</code> changes both the highlighted day and the month shown. Timezones ahead of
  UTC (ex. Europe/Asia) see the same with an instant late in the UTC day (ex.
  <code>2026-08-31T23:00:00Z</code>).
</div>

<Preview>
  <label class="flex items-center gap-2 text-sm w-fit mb-3">
    <Switch bind:checked={utcInstant} size="md" /> utc
  </label>

  {#key utcInstant}
    <Month utc={utcInstant} selected={dayBoundaryUtc} />
  {/key}

  <div class="text-sm text-surface-content/50 mt-3">{iso(dayBoundaryUtc)}</div>
</Preview>

<h3>Disabled dates</h3>

<div class="text-sm text-surface-content/60 mb-2">
  Disabled ranges are expanded to UTC day boundaries, so
  <code>2026-08-01T00:00:00Z</code> - <code>2026-08-05T00:00:00Z</code> can cover a different set of days
  than in local mode.
</div>

<Preview>
  <label class="flex items-center gap-2 text-sm w-fit mb-3">
    <Switch bind:checked={utcDisabled} size="md" /> utc
  </label>

  {#key utcDisabled}
    <Month
      utc={utcDisabled}
      selected={dayBoundaryUtc}
      disabledDates={{ from: dayBoundaryUtc, to: new Date('2026-08-05T00:00:00Z') }}
    />
  {/key}
</Preview>
