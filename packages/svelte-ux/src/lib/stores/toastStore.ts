import type { IconInput } from '$lib/utils/icons.js';
import type { SvelteComponent } from 'svelte';
import { get, writable } from 'svelte/store';

const DEFAULT_TOAST_TIME_IN_MS = 3000;

type ToastActionType = {
  children?: string | SvelteComponent,
  classes?: string,
  onClick: () => {}
}

type ToastContents = {
  text: string;
  actions?: ToastActionType[];
  icon?: IconInput;
  variant?: string // TODO:
}

type Toast = {
  timeAdded: Date;
} & ToastContents

/**
 * Create a global store to save information on toast components
 */
const toastStore = writable<Toast[]>([]);

export function addToast(toastConents: ToastContents, durationInMS = DEFAULT_TOAST_TIME_IN_MS) {
  const timeAdded = new Date();
  const toast: Toast = {
    ...toastConents,
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
