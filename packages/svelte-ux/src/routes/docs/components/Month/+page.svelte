<script lang="ts">
  import {
    addDays,
    subDays,
    isAfter,
    isSameDay,
    startOfWeek,
    endOfWeek,
    addMonths,
    startOfMonth,
  } from 'date-fns';

  import { Month } from 'svelte-ux';
  import type { DateRange } from '@layerstack/utils/dateRange';
  import Preview from '$lib/components/Preview.svelte';

  let selected: Date | null = null;
  let selectedArr: Date[] = [];
  let selectedRange: DateRange = { from: null, to: null };
  let selectedWeek: DateRange = { from: null, to: null };
  let selectedMultiMonth: DateRange = { from: null, to: null };
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
  <Month disabledDates={[subDays(new Date(), 2), new Date(), addDays(new Date(), 2)]} />
</Preview>

<h2>Disabled days w/ range</h2>

<Preview>
  <Month
    disabledDates={{
      from: subDays(new Date(), 2),
      to: addDays(new Date(), 2),
    }}
  />
</Preview>

<h2>Disabled days w/ function</h2>

<Preview>
  <Month disabledDates={(date) => isAfter(date, new Date())} />
</Preview>

<h2>Selected w/ single</h2>

<Preview>
  <Month selected={new Date()} />
</Preview>

<h2>Selected w/ array</h2>

<Preview>
  <Month selected={[subDays(new Date(), 2), new Date(), addDays(new Date(), 2)]} />
</Preview>

<h2>Selected w/ range</h2>

<Preview>
  <Month selected={{ from: subDays(new Date(), 2), to: addDays(new Date(), 2) }} />
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
      if (selectedArr.some((d) => isSameDay(d, date))) {
        selectedArr = selectedArr.filter((d) => !isSameDay(d, date));
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
      } else if (isSameDay(date, selectedRange.from)) {
        newSelectedRange.from = null;
      } else if (selectedRange.to === null) {
        if (isAfter(date, selectedRange.from)) {
          newSelectedRange.to = date;
        } else {
          newSelectedRange.to = selectedRange.from;
          newSelectedRange.from = date;
        }
      } else if (isSameDay(date, selectedRange.to)) {
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
      selectedWeek = { from: startOfWeek(date), to: endOfWeek(date) };
    }}
  />
</Preview>

<h2>Selected state w/ multi-month</h2>

<Preview>
  <div class="grid grid-cols-[1fr,1fr] gap-10">
    <div>
      <Month
        selected={selectedMultiMonth}
        on:dateChange={(e) => {
          const date = e.detail;
          const newSelectedRange = { ...selectedMultiMonth };
          if (selectedMultiMonth.from === null) {
            newSelectedRange.from = date;
          } else if (isSameDay(date, selectedMultiMonth.from)) {
            newSelectedRange.from = null;
          } else if (selectedMultiMonth.to === null) {
            if (isAfter(date, selectedMultiMonth.from)) {
              newSelectedRange.to = date;
            } else {
              newSelectedRange.to = selectedMultiMonth.from;
              newSelectedRange.from = date;
            }
          } else if (isSameDay(date, selectedMultiMonth.to)) {
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
        startOfMonth={startOfMonth(addMonths(new Date(), 1))}
        on:dateChange={(e) => {
          const date = e.detail;
          const newSelectedRange = { ...selectedMultiMonth };
          if (selectedMultiMonth.from === null) {
            newSelectedRange.from = date;
          } else if (isSameDay(date, selectedMultiMonth.from)) {
            newSelectedRange.from = null;
          } else if (selectedMultiMonth.to === null) {
            if (isAfter(date, selectedMultiMonth.from)) {
              newSelectedRange.to = date;
            } else {
              newSelectedRange.to = selectedMultiMonth.from;
              newSelectedRange.from = date;
            }
          } else if (isSameDay(date, selectedMultiMonth.to)) {
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
