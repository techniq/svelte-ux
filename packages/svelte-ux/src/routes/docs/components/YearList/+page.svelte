<script lang="ts">
  import { intervalOffset, startOfInterval } from '@layerstack/utils';

  import { Switch, YearList } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';

  let selected = new Date('1982-03-30');

  let selectedUtc: Date | null = null;
  let utcSelected = false;
  let utcInstant = false;

  // Instant which falls in a different year when read as local vs UTC (for timezones behind UTC.
  // Timezones ahead of UTC see the same with an instant late in the UTC day)
  const yearBoundaryUtc = new Date('2026-01-01T00:00:00Z');

  const iso = (date: Date | null) => date?.toISOString() ?? '(none)';
</script>

<h1>Examples</h1>

<h2>Default</h2>

<Preview>
  <YearList />
</Preview>

<h2>Selected</h2>

<Preview>
  <YearList
    {selected}
    on:dateChange={(e) => {
      selected = e.detail;
    }}
  />
</Preview>

<h2>Selected w/ Scroll into view</h2>

<Preview>
  <div class="overflow-auto h-64">
    <YearList
      minDate={intervalOffset('year', selected, -10)}
      maxDate={intervalOffset('year', selected, 10)}
      {selected}
      on:dateChange={(e) => {
        selected = e.detail;
      }}
    />
  </div>
</Preview>

<h2>Min / Max date</h2>

<Preview>
  <YearList
    minDate={startOfInterval('year', intervalOffset('year', new Date(), -3))}
    maxDate={new Date()}
  />
</Preview>

<h2>UTC</h2>

<h3>Selected state</h3>

<div class="text-sm text-surface-content/60 mb-2">
  With <code>utc</code>, the years are built from UTC boundaries and selections are dispatched as
  the UTC start of year (<code>-01-01T00:00:00.000Z</code>) instead of the local one.
</div>

<Preview>
  <label class="flex items-center gap-2 text-sm w-fit mb-3">
    <Switch bind:checked={utcSelected} size="md" /> utc
  </label>

  <div class="overflow-auto h-64">
    <YearList
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
  <code>2026-01-01T00:00:00Z</code> is still 2025 in timezones behind UTC (ex. Americas), so
  enabling
  <code>utc</code> moves the selection to 2026. Timezones ahead of UTC (ex. Europe/Asia) see the
  same with an instant late in the UTC day (ex. <code>2026-12-31T23:00:00Z</code>).
</div>

<Preview>
  <label class="flex items-center gap-2 text-sm w-fit mb-3">
    <Switch bind:checked={utcInstant} size="md" /> utc
  </label>

  <div class="overflow-auto h-64">
    {#key utcInstant}
      <YearList utc={utcInstant} selected={yearBoundaryUtc} />
    {/key}
  </div>

  <div class="text-sm text-surface-content/50 mt-3">{iso(yearBoundaryUtc)}</div>
</Preview>
