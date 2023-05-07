<script lang="ts">
  import {
    addMonths,
    subMonths,
    isSameMonth,
    isAfter,
    startOfQuarter,
    endOfQuarter,
  } from 'date-fns';

  import api from '$lib/components/MonthList.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Grid from '$lib/components/Grid.svelte';
  import MonthList from '$lib/components/MonthList.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import Stack from '$lib/components/Stack.svelte';

  let selected = null;
  let selectedArr = [];
  let selectedRange = { from: null, to: null };
  let selectedQuarter = { from: null, to: null };
</script>

<h1>Examples</h1>

<h2>Default</h2>

<Preview>
  <MonthList />
</Preview>

<h2>Horizontal Stack wrapper</h2>

<Preview>
  <Stack horizontal>
    <MonthList />
  </Stack>
</Preview>

<h2>Vertical Stack wrapper</h2>

<Preview>
  <Stack vertical>
    <MonthList />
  </Stack>
</Preview>

<h2>Grid wrapper w/ auto columns (100px)</h2>

<Preview>
  <Grid autoColumns="100px">
    <MonthList />
  </Grid>
</Preview>

<h2>Grid wrapper w/ 3 columns</h2>

<Preview>
  <Grid columns={3}>
    <MonthList />
  </Grid>
</Preview>

<h2>Format w/ as name</h2>

<Preview>
  <Grid autoColumns="100px">
    <MonthList format="MMMM" />
  </Grid>
</Preview>

<h2>Format w/ as number</h2>

<Preview>
  <MonthList format="M" />
</Preview>

<h2>Disabled months w/ single</h2>

<Preview>
  <MonthList disabledMonths={new Date()} />
</Preview>

<h2>Disabled months w/ array</h2>

<Preview>
  <MonthList
    disabledMonths={[
      subMonths(new Date(), 2),
      new Date(),
      addMonths(new Date(), 2),
    ]}
  />
</Preview>

<h2>Disabled months w/ range</h2>

<Preview>
  <MonthList
    disabledMonths={{
      from: subMonths(new Date(), 2),
      to: addMonths(new Date(), 2),
    }}
  />
</Preview>

<h2>Disabled months w/ function</h2>

<Preview>
  <MonthList disabledMonths={(date) => isAfter(date, new Date())} />
</Preview>

<h2>Selected w/ single</h2>

<Preview>
  <MonthList selected={new Date()} />
</Preview>

<h2>Selected w/ array</h2>

<Preview>
  <MonthList
    selected={[
      subMonths(new Date(), 2),
      new Date(),
      addMonths(new Date(), 2),
    ]}
  />
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

<h2>Selected state w/ quarter</h2>

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

<h1>API</h1>

<ApiDocs {api} />
