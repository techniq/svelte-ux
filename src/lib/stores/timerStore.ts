import { writable } from 'svelte/store';

export type TimerOptions = {
  delay?: number;
  disabled?: boolean;

  /** Called on each interval tick.  Returned value is used to update store value, defaulting to current Date */
  onTick?: () => any;
};

/**
 * Subscribable timer store
 */
export default function timerStore<T = any>(options: TimerOptions = {}) {
  let intervalId = null;
  let delay = options.delay ?? 1000;

  const state = writable<T>(null, () => {
    if (!options.disabled) {
      start();
    }

    return () => stop();
  });

  function start() {
    stop();
    intervalId = setInterval(() => {
      // console.log('tick');
      state.set(options.onTick?.() ?? new Date());
    }, delay);
  }

  function stop() {
    clearInterval(intervalId);
    intervalId = null;
  }

  function isRunning() {
    return intervalId != null;
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
    subscribe: state.subscribe,
    start,
    stop,
    isRunning,
    getDelay,
    setDelay,
  };
}
