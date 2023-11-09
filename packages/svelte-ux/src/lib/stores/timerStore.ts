import { writable } from 'svelte/store';

export type TimerOptions<T> = {
  initial?: T;
  delay?: number;
  disabled?: boolean;

  /** Called on each interval tick.  Returned value is used to update store value, defaulting to current Date */
  onTick?: (current: T | null) => any;
};

/**
 * Subscribable timer store
 */
export default function timerStore<T = any>(options: TimerOptions<T> = {}) {
  let initial = options.initial ?? null;
  let intervalId: ReturnType<typeof setInterval> | null = null;
  let delay = options.delay ?? 1000;
  const isRunning = writable(false);

  const state = writable<T | null>(initial, () => {
    if (!options.disabled) {
      start();
    }

    return () => stop();
  });

  function start() {
    stop();
    intervalId = setInterval(() => {
      state.update((current) => options.onTick?.(current) ?? new Date());
    }, delay);
    isRunning.set(true);
  }

  function stop() {
    if (intervalId) {
      clearInterval(intervalId);
    }
    intervalId = null;
    isRunning.set(false);
  }

  function reset() {
    return state.set(initial);
  }

  function getDelay() {
    return delay;
  }

  function setDelay(value: number) {
    stop();
    delay = value;
    start();
  }

  return {
    ...state,
    start,
    stop,
    reset,
    isRunning,
    getDelay,
    setDelay,
  };
}
