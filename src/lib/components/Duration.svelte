<script lang="ts">
  import { DurationUnits, getDuration, humanizeDuration } from '../utils/duration';
  import timerStore from '../stores/timerStore';

  export let start: Date | undefined = undefined;
  export let end: Date | undefined = undefined;
  export let duration: Partial<Duration> | undefined = undefined;
  export let minUnits: DurationUnits | undefined = DurationUnits.Millisecond;
  export let totalUnits: number = 99;
  export let variant: 'short' | 'long' = 'short';

  function getDelay() {
    const newDuration = getDuration(start, end ?? $timer, duration);

    const unitsMoreThanSeconds = [
      newDuration.years,
      newDuration.days,
      newDuration.hours,
      newDuration.minutes,
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
    duration,
    minUnits,
    totalUnits,
    variant,
  });
</script>

<span class="Duration">{displayDuration}</span>
