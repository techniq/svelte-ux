---
component: $component
filename: $filename
---

<script lang="ts">
  import {
    addMonths,
    subMonths,
    isSameMonth,
    isAfter,
    startOfQuarter,
    endOfQuarter,
  } from 'date-fns';

  import Grid from '$lib/components/Grid.svelte';
  import MonthList from '$lib/components/MonthList.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import Stack from '$lib/components/Stack.svelte';

  let selected = null;
  let selectedArr = [];
  let selectedRange = { from: null, to: null };
  let selectedQuarter = { from: null, to: null };
</script>

## Default

<Preview>
  <MonthList />
</Preview>

## Horizontal Stack wrapper

<Preview>
  <Stack horizontal>
    <MonthList />
  </Stack>
</Preview>

## Vertical Stack wrapper

<Preview>
  <Stack vertical>
    <MonthList />
  </Stack>
</Preview>

## Grid wrapper w/ auto columns (100px)

<Preview>
  <Grid autoColumns="100px">
    <MonthList />
  </Grid>
</Preview>

## Grid wrapper w/ 3 columns

<Preview>
  <Grid columns={3}>
    <MonthList />
  </Grid>
</Preview>

## Format w/ as name

<Preview>
  <Grid autoColumns="100px">
    <MonthList format="MMMM" />
  </Grid>
</Preview>

## Format w/ as number

<Preview>
  <MonthList format="M" />
</Preview>

## Disabled months w/ single

<Preview>
  <MonthList disabledMonths={new Date()} />
</Preview>

## Disabled months w/ array

<Preview>
  <MonthList
    disabledMonths={[
      subMonths(new Date(), 2),
      new Date(),
      addMonths(new Date(), 2),
    ]}
  />
</Preview>

## Disabled months w/ range

<Preview>
  <MonthList
    disabledMonths={{
      from: subMonths(new Date(), 2),
      to: addMonths(new Date(), 2),
    }}
  />
</Preview>

## Disabled months w/ function

<Preview>
  <MonthList disabledMonths={(date) => isAfter(date, new Date())} />
</Preview>

## Selected w/ single

<Preview>
  <MonthList selected={new Date()} />
</Preview>

## Selected w/ array

<Preview>
  <MonthList
    selected={[
      subMonths(new Date(), 2),
      new Date(),
      addMonths(new Date(), 2),
    ]}
  />
</Preview>

## Selected w/ range

<Preview>
  <MonthList
    selected={{
      from: subMonths(new Date(), 2),
      to: addMonths(new Date(), 2),
    }}
  />
</Preview>

## Selected state w/ single

<Preview>
  <MonthList
    {selected}
    on:dateChange={(e) => {
      selected = e.detail;
    }}
  />
</Preview>

## Selected state w/ array

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

## Selected state w/ range

<Preview>
  <MonthList
    selected={selectedRange}
    on:dateChange={(e) => {
      const date = e.detail;
      const newSelectedRange = { ...selectedRange };
      if (selectedRange.from === undefined) {
        newSelectedRange.from = date;
      } else if (isSameMonth(date, selectedRange.from)) {
        newSelectedRange.from = undefined;
      } else if (selectedRange.to === undefined) {
        if (isAfter(date, selectedRange.from)) {
          newSelectedRange.to = date;
        } else {
          newSelectedRange.to = selectedRange.from;
          newSelectedRange.from = date;
        }
      } else if (isSameMonth(date, selectedRange.to)) {
        newSelectedRange.to = undefined;
      } else {
        newSelectedRange.from = date;
        newSelectedRange.to = undefined;
      }
      selectedRange = newSelectedRange;
    }}
  />
</Preview>

## Selected state w/ quarter

<Preview>
  <Grid columns={6}>
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
  </Grid>
</Preview>
