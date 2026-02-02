<script lang="ts">
  import { Month } from 'svelte-ux';
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
