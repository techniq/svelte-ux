import { get, writable } from 'svelte/store';

const DEFAULT_TOAST_TIME_IN_MS = 3000;

export type Toast = {
  text: string;
  timeAdded: Date;
};

/**
 * Create a global store to save information on toast components
 */
const toastStore = writable<Toast[]>([]);

export function addToast(text: string, durationInMS = DEFAULT_TOAST_TIME_IN_MS) {
  const timeAdded = new Date();
  const toast: Toast = {
    text,
    timeAdded,
  };
  toastStore.set([...get(toastStore), toast]);

  setTimeout(() => {
    const remainingToasts = [...get(toastStore)].filter((toast) => {
      return toast.timeAdded != timeAdded;
    });
    toastStore.set(remainingToasts);
  }, durationInMS);
}

export default toastStore;
