<script lang="ts">
  import { cls } from '@layerstack/tailwind';
  import { DurationUnits, getDuration, humanizeDuration } from '@layerstack/utils';
  import { type Duration } from '@layerstack/utils/duration';
  import { timerStore } from '@layerstack/svelte-stores';

  import { getComponentClasses } from './theme.js';

  export let start: Date | undefined = undefined;
  export let end: Date | undefined = undefined;
  export let duration: Partial<Duration> | undefined = undefined;
  export let minUnits: DurationUnits = DurationUnits.Millisecond;
  export let totalUnits: number = 99;
  export let variant: 'short' | 'long' = 'short';
  let className: string | undefined = undefined;
  export { className as class };

  const settingsClasses = getComponentClasses('Duration');

  function getDelay(useTimer = true) {
    const endTime = end ?? (useTimer ? $timer : null);
    const newDuration = getDuration(start, endTime, duration);

    const unitsMoreThanSeconds = [
      newDuration?.years,
      newDuration?.days,
      newDuration?.hours,
      newDuration?.minutes,
    ].filter((x) => x).length;

    // DurationUnits is indexed biggest (Year) to smallest (Milliseconds)
    if (minUnits < DurationUnits.Second) {
      // Never showing seconds, so only update once a minute
      return 60 * 1000;
    } else if (unitsMoreThanSeconds >= totalUnits) {
      // If only showing values above seconds, only update once a minute (could update even less frequently for hours, etc)
      return 60 * 1000;
    } else {
      return 1000;
    }
  }

  const timer = timerStore({
    // Pass false to avoid referencing `timer` before it exists
    delay: getDelay(false),
    disabled: end != null,
    onTick: () => {
      // Update delay based on display duration
      const newDelay = getDelay();
      if (newDelay != timer.getDelay()) {
        timer.setDelay(newDelay);
      }
    },
  });

  $: displayDuration = humanizeDuration({
    start,
    end: end ?? $timer,
    duration,
    minUnits,
    totalUnits,
    variant,
  });
</script>

<span class={cls('Duration', settingsClasses.root, className)}>{displayDuration}</span>
