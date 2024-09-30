<script lang="ts">
  import { subDays, subSeconds } from 'date-fns';

  import { Duration } from 'svelte-ux';
  import { DurationUnits } from '@layerstack/utils';

  import Preview from '$lib/components/Preview.svelte';
</script>

<h1>Examples</h1>

<h2>Duration</h2>

<Preview>
  <div class="grid">
    <Duration start={new Date()} />
    <Duration start={new Date()} totalUnits={1} />
    <Duration start={new Date()} totalUnits={2} />
    <Duration start={new Date()} totalUnits={2} minUnits={DurationUnits.Second} />
    <Duration start={new Date()} minUnits={DurationUnits.Minute} />
    <Duration start={subSeconds(new Date(), 55)} totalUnits={1} />
  </div>
</Preview>

<h2>Fixed range</h2>

<Preview>
  <Duration start={subDays(new Date(), 3)} end={subDays(new Date(), 1)} />
</Preview>

<h2>Age</h2>

<Preview>
  <Duration start={new Date('1982-03-30')} totalUnits={1} variant="long" /> old
</Preview>

<h2>Explicit duration</h2>

<Preview>
  <Duration duration={{ milliseconds: 54321 }} />
</Preview>
