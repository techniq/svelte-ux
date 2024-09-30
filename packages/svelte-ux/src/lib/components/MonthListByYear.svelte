<script lang="ts">
  import { addYears, subYears } from 'date-fns';
  import { getMinSelectedDate, getMaxSelectedDate } from '@layerstack/utils/date';
  import type { SelectedDate } from '@layerstack/utils';

  import Button from './Button.svelte';
  import MonthList from './MonthList.svelte';

  export let selected: SelectedDate | undefined = undefined;
  export let minDate: Date | undefined = undefined;
  export let maxDate: Date | undefined = undefined;

  let minYear: number;
  $: minYear =
    minYear ??
    (minDate
      ? minDate.getFullYear()
      : subYears(getMinSelectedDate(selected) || new Date(), 2).getFullYear());

  let maxYear: number;
  $: maxYear =
    maxYear ??
    (maxDate
      ? maxDate.getFullYear()
      : addYears(getMaxSelectedDate(selected) || new Date(), 2).getFullYear());

  $: years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);

  // TODO: Scroll into view not typically centered
  $: selectedYear = (getMinSelectedDate(selected) || new Date()).getFullYear();
</script>

<div class="grid divide-y">
  <Button on:click={() => (minYear -= 10)}>More</Button>

  {#each years ?? [] as year (year)}
    <div class="grid grid-cols-[auto,1fr] items-center gap-2 p-2">
      <div class="text-xl font-bold">
        {year}
      </div>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(48px,1fr))] gap-y-4">
        <MonthList {year} {selected} on:dateChange />
      </div>
    </div>
  {/each}

  <Button on:click={() => (maxYear += 10)}>More</Button>
</div>
