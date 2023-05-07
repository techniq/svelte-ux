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

  import api from '$lib/components/Month.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Month from '$lib/components/Month.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import Stack from '$lib/components/Stack.svelte';

  let selected = null;
  let selectedArr = [];
  let selectedRange = { from: null, to: null };
  let selectedWeek = { from: null, to: null };
  let selectedMultiMonth = { from: null, to: null };
</script>

<h1>Examples</h1>

<!-- TODO: Add playground -->

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
<Month disabledDays={new Date()} />
</Preview>

<h2>Disabled days w/ array</h2>

<Preview>
  <Month
    disabledDays={[
    subDays(new Date(), 2),
    new Date(),
    addDays(new Date(), 2),
    ]}
  />
</Preview>

<h2>Disabled days w/ range</h2>

<Preview>
  <Month
    disabledDays={{
      from: subDays(new Date(), 2),
      to: addDays(new Date(), 2),
    }}
  />
</Preview>

<h2>Disabled days w/ function</h2>

<Preview>
  <Month disabledDays={(date) => isAfter(date, new Date())} />
</Preview>

<h2>Selected w/ single</h2>

<Preview>
  <Month selected={new Date()} />
</Preview>

<h2>Selected w/ array</h2>

<Preview>
  <Month
    selected={[subDays(new Date(), 2), new Date(), addDays(new Date(), 2)]}
  />
</Preview>

<h2>Selected w/ range</h2>

<Preview>
  <Month
    selected={{ from: subDays(new Date(), 2), to: addDays(new Date(), 2) }}
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
      if (selectedRange.from === undefined) {
        newSelectedRange.from = date;
      } else if (isSameDay(date, selectedRange.from)) {
        newSelectedRange.from = undefined;
      } else if (selectedRange.to === undefined) {
        if (isAfter(date, selectedRange.from)) {
          newSelectedRange.to = date;
        } else {
          newSelectedRange.to = selectedRange.from;
          newSelectedRange.from = date;
        }
      } else if (isSameDay(date, selectedRange.to)) {
        newSelectedRange.to = undefined;
      } else {
        newSelectedRange.from = date;
        newSelectedRange.to = undefined;
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
  <Stack horizontal gap={40}>
    <Month
      selected={selectedMultiMonth}
      on:dateChange={(e) => {
        const date = e.detail;
        const newSelectedRange = { ...selectedMultiMonth };
        if (selectedMultiMonth.from === undefined) {
          newSelectedRange.from = date;
        } else if (isSameDay(date, selectedMultiMonth.from)) {
          newSelectedRange.from = undefined;
        } else if (selectedMultiMonth.to === undefined) {
        if (isAfter(date, selectedMultiMonth.from)) {
          newSelectedRange.to = date;
        } else {
          newSelectedRange.to = selectedMultiMonth.from;
          newSelectedRange.from = date;
        }
        } else if (isSameDay(date, selectedMultiMonth.to)) {
          newSelectedRange.to = undefined;
        } else {
          newSelectedRange.from = date;
          newSelectedRange.to = undefined;
        }
        selectedMultiMonth = newSelectedRange;
      }}
    />
    <Month
      selected={selectedMultiMonth}
      startOfMonth={startOfMonth(addMonths(new Date(), 1))}
      on:dateChange={(e) => {
        const date = e.detail;
        const newSelectedRange = { ...selectedMultiMonth };
        if (selectedMultiMonth.from === undefined) {
          newSelectedRange.from = date;
        } else if (isSameDay(date, selectedMultiMonth.from)) {
          newSelectedRange.from = undefined;
        } else if (selectedMultiMonth.to === undefined) {
        if (isAfter(date, selectedMultiMonth.from)) {
          newSelectedRange.to = date;
        } else {
          newSelectedRange.to = selectedMultiMonth.from;
          newSelectedRange.from = date;
        }
        } else if (isSameDay(date, selectedMultiMonth.to)) {
          newSelectedRange.to = undefined;
        } else {
          newSelectedRange.from = date;
          newSelectedRange.to = undefined;
        }
        selectedMultiMonth = newSelectedRange;
      }}
    />
  </Stack>
</Preview>

<h1>API</h1>

<ApiDocs {api} />
