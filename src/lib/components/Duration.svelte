<script lang="ts">
  import { DurationUnits, getDuration, humanizeDuration } from '../utils/duration';
  import timerStore from '../stores/timerStore';

  export let start: Date;
  export let end: Date = undefined;
  export let minUnits: DurationUnits = DurationUnits.Millisecond;
  export let totalUnits: number = undefined;
  export let variant: 'short' | 'long' = undefined;

  function getDelay() {
    const duration = getDuration(start, end ?? $timer);

    const unitsMoreThanSeconds = [
      duration.years,
      duration.days,
      duration.hours,
      duration.minutes,
    ].filter((x) => x).length;

    // DurationUnits is indexed biggested (Year) to smallest (Milliseconds)
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
    delay: getDelay(),
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
    minUnits,
    totalUnits,
    variant,
  });
</script>

<span>{displayDuration}</span>
