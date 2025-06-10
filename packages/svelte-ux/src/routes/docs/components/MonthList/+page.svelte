<script lang="ts">
  import {
    endOfInterval,
    intervalOffset,
    isDateAfter,
    isSameInterval,
    startOfInterval,
  } from '@layerstack/utils';

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
