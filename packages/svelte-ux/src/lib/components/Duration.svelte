<script lang="ts">
  import {
    DurationUnits,
    getDuration,
    humanizeDuration,
    type Duration,
  } from '../utils/duration.js';
  import timerStore from '../stores/timerStore.js';
  import { getComponentClasses } from './theme.js';
  import { cls } from '../utils/styles.js';

  interface Props {
    start?: Date;
    end?: Date;
    duration?: Partial<Duration>;
    minUnits?: DurationUnits;
    totalUnits?: number;
    variant?: 'short' | 'long';
    class?: string;
  }

  let {
    start,
    end,
    duration,
    minUnits = DurationUnits.Millisecond,
    totalUnits = 99,
    variant = 'short',
    class: className,
  }: Props = $props();

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

  let displayDuration = $derived(
    humanizeDuration({
      start,
      end: end ?? $timer,
      duration,
      minUnits,
      totalUnits,
      variant,
    })
  );
</script>

<span class={cls('Duration', settingsClasses.root, className)}>{displayDuration}</span>
