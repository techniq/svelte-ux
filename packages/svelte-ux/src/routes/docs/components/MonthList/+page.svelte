<script lang="ts">
  import {
    addMonths,
    subMonths,
    isSameMonth,
    isAfter,
    startOfQuarter,
    endOfQuarter,
  } from 'date-fns';

  import { MonthList, type SelectedDate } from 'svelte-ux';
  import type { DateRange } from '$lib/utils/dateRange.js';
  import Preview from '$lib/components/Preview.svelte';

  let selected: SelectedDate = $state(null);
  let selectedArr: Date[] = $state([]);
  let selectedRange: DateRange = $state({ from: null, to: null });
  let selectedQuarter: DateRange = $state({ from: null, to: null });
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
    onDateChange={(value) => {
      selected = value;
    }}
  />
</Preview>

<h2>Selected state w/ array</h2>

<Preview>
  <MonthList
    selected={selectedArr}
    onDateChange={(value) => {
      const date = value;
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
    onDateChange={(value) => {
      const date = value;
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
      onDateChange={(value) => {
        const date = value;
        selectedQuarter = {
          from: startOfQuarter(date),
          to: endOfQuarter(date),
        };
      }}
    />
  </div>
</Preview>
