---
component: $component
filename: $filename
---

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

  import Month from '$lib/components/Month.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import Stack from '$lib/components/Stack.svelte';

  let selected = null;
  let selectedArr = [];
  let selectedRange = { from: null, to: null };
  let selectedWeek = { from: null, to: null };
  let selectedMultiMonth = { from: null, to: null };
</script>

<!-- TODO: Add playground -->

## Default

<Preview>
  <Month />
</Preview>

## Show Outside Days

<Preview>
<Month showOutsideDays />
</Preview>

## Disabled days w/ single

<Preview>
<Month disabledDays={new Date()} />
</Preview>

## Disabled days w/ array

<Preview>
  <Month
    disabledDays={[
    subDays(new Date(), 2),
    new Date(),
    addDays(new Date(), 2),
    ]}
  />
</Preview>

## Disabled days w/ range

<Preview>
  <Month
    disabledDays={{
      from: subDays(new Date(), 2),
      to: addDays(new Date(), 2),
    }}
  />
</Preview>

## Disabled days w/ function

<Preview>
  <Month disabledDays={(date) => isAfter(date, new Date())} />
</Preview>

## Selected w/ single

<Preview>
  <Month selected={new Date()} />
</Preview>

## Selected w/ array

<Preview>
  <Month
    selected={[subDays(new Date(), 2), new Date(), addDays(new Date(), 2)]}
  />
</Preview>

## Selected w/ range

<Preview>
  <Month
    selected={{ from: subDays(new Date(), 2), to: addDays(new Date(), 2) }}
  />
</Preview>

## Selected state w/ single

<Preview>
  <Month
    {selected}
    on:dateChange={(e) => {
      selected = e.detail;
    }}
  />
</Preview>

## Selected state w/ array

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

## Selected state w/ range

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

## Selected state w/ week

<Preview>
  <Month
    selected={selectedWeek}
    on:dateChange={(e) => {
      const date = e.detail;
      selectedWeek = { from: startOfWeek(date), to: endOfWeek(date) };
    }}
  />
</Preview>

## Selected state w/ multi-month

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
