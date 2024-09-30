<script lang="ts">
  import {
    addMonths,
    subMonths,
    isSameMonth,
    isAfter,
    startOfQuarter,
    endOfQuarter,
  } from 'date-fns';

  import { MonthList } from 'svelte-ux';
  import { type SelectedDate } from '@layerstack/utils';
  import { type DateRange } from '@layerstack/utils/dateRange';

  import Preview from '$lib/components/Preview.svelte';

  let selected: SelectedDate = null;
  let selectedArr: Date[] = [];
  let selectedRange: DateRange = { from: null, to: null };
  let selectedQuarter: DateRange = { from: null, to: null };
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
  <MonthList disabledDates={[subMonths(new Date(), 2), new Date(), addMonths(new Date(), 2)]} />
</Preview>

<h2>Disabled months w/ range</h2>

<Preview>
  <MonthList
    disabledDates={{
      from: subMonths(new Date(), 2),
      to: addMonths(new Date(), 2),
    }}
  />
</Preview>

<h2>Disabled months w/ function</h2>

<Preview>
  <MonthList disabledDates={(date) => isAfter(date, new Date())} />
</Preview>

<h2>Selected w/ single</h2>

<Preview>
  <MonthList selected={new Date()} />
</Preview>

<h2>Selected w/ array</h2>

<Preview>
  <MonthList selected={[subMonths(new Date(), 2), new Date(), addMonths(new Date(), 2)]} />
</Preview>

<h2>Selected w/ range</h2>

<Preview>
  <MonthList
    selected={{
      from: subMonths(new Date(), 2),
      to: addMonths(new Date(), 2),
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
      if (selectedArr.some((d) => isSameMonth(d, date))) {
        selectedArr = selectedArr.filter((d) => !isSameMonth(d, date));
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
      } else if (isSameMonth(date, selectedRange.from)) {
        newSelectedRange.from = null;
      } else if (selectedRange.to === null) {
        if (isAfter(date, selectedRange.from)) {
          newSelectedRange.to = date;
        } else {
          newSelectedRange.to = selectedRange.from;
          newSelectedRange.from = date;
        }
      } else if (isSameMonth(date, selectedRange.to)) {
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
          from: startOfQuarter(date),
          to: endOfQuarter(date),
        };
      }}
    />
  </div>
</Preview>
