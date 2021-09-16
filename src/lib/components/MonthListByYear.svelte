<script lang="ts">
  import { addYears, subYears } from 'date-fns';

  import Button from './Button.svelte';
  import MonthList from './MonthList.svelte';
  import Grid from './Grid.svelte';
  import Stack from './Stack.svelte';

  import { getMinSelectedDate, getMaxSelectedDate } from '../utils/date';
  import type { SelectedDate } from '../utils/date';
  import { scrollIntoView } from '../actions/scroll';

  export let selected: SelectedDate | undefined = undefined;
  export let minDate: Date | undefined = undefined;
  export let maxDate: Date | undefined = undefined;

  $: minYear =
    minYear ??
    (minDate
      ? minDate.getFullYear()
      : subYears(getMinSelectedDate(selected) || new Date(), 2).getFullYear());

  $: maxYear =
    maxYear ??
    (maxDate
      ? maxDate.getFullYear()
      : addYears(getMaxSelectedDate(selected) || new Date(), 2).getFullYear());

  $: years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);

  // TODO: Scroll into view not typically centered
  $: selectedYear = (getMinSelectedDate(selected) || new Date()).getFullYear();
</script>

<Stack vertical class="divide-y">
  <Button on:click={() => (minYear -= 1)}>More</Button>

  {#each years ?? [] as year (year)}
    <Grid template="auto 1fr" columnGap={8} items="center" class="p-2">
      <div class="text-xl font-bold" use:scrollIntoView={{ condition: year === selectedYear }}>
        {year}
      </div>
      <Grid autoColumns="48px" rowGap={4}>
        <MonthList {year} {selected} on:dateChange />
      </Grid>
    </Grid>
  {/each}

  <Button on:click={() => (maxYear += 1)}>More</Button>
</Stack>
