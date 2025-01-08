<script lang="ts">
  import { addYears, subYears } from 'date-fns';

  import Button from './Button.svelte';
  import MonthList from './MonthList.svelte';

  import { getMinSelectedDate, getMaxSelectedDate } from '../utils/date.js';
  import type { SelectedDate } from '../utils/date.js';
  import type { ComponentProps } from 'svelte';

  interface Props {
    selected?: SelectedDate;
    minDate?: Date;
    maxDate?: Date;
    onDateChange?: ComponentProps<typeof MonthList>['onDateChange'];
  }

  let { selected, minDate, maxDate, onDateChange }: Props = $props();

  let minYear = $state() as number;
  $effect(() => {
    minYear =
      minYear ??
      (minDate
        ? minDate.getFullYear()
        : subYears(getMinSelectedDate(selected) || new Date(), 2).getFullYear());
  });

  let maxYear = $state() as number;
  $effect(() => {
    maxYear =
      maxYear ??
      (maxDate
        ? maxDate.getFullYear()
        : addYears(getMaxSelectedDate(selected) || new Date(), 2).getFullYear());
  });

  let years = $derived(Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i));

  // TODO: Scroll into view not typically centered
  let selectedYear = $derived((getMinSelectedDate(selected) || new Date()).getFullYear());
</script>

<div class="grid divide-y">
  <Button onclick={() => (minYear -= 10)}>More</Button>

  {#each years ?? [] as year (year)}
    <div class="grid grid-cols-[auto,1fr] items-center gap-2 p-2">
      <div class="text-xl font-bold">
        {year}
      </div>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(48px,1fr))] gap-y-4">
        <MonthList {year} {selected} {onDateChange} />
      </div>
    </div>
  {/each}

  <Button onclick={() => (maxYear += 10)}>More</Button>
</div>
