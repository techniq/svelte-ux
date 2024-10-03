import type { ButtonColor, ButtonRounded, ButtonVariant } from '$lib/types/index.js';
import type { IconInput } from '$lib/utils/icons.js';
import type { SvelteComponent } from 'svelte';
import { get, writable } from 'svelte/store';

type ToastActionType = {
  children?: string | SvelteComponent,
  icon?: IconInput,
  variant?: ButtonVariant,
  rounded?: ButtonRounded,
  onClick: (event?: MouseEvent) => void,
  color?: ButtonColor
}

export type ToastContents = {
  text: string;
  actions?: ToastActionType[];
  actionPlacement?: 'below' | 'right' | 'split'
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

export function removeToast(
  toastToRemove: Toast
){
  const remainingToasts = [...get(toastStore)].filter((toast) => {
    return toast.timeAdded != toastToRemove.timeAdded;
  });
  toastStore.set(remainingToasts);
}

export function addToast(
  toastContents: ToastContents | string,
  durationInMS?: number
) {
  const timeAdded = new Date();

  // allow toast contents to also just be a simple string for quick toasts
  const contentsAreStringOnly = typeof toastContents == 'string';
  const toast: Toast = contentsAreStringOnly ? {
    text: toastContents,
    timeAdded
  } : {
    ...toastContents,
    timeAdded,
    actionPlacement: toastContents.actionPlacement || 'below'
  };
  toastStore.set([...get(toastStore), toast]);

  if(durationInMS != undefined){
    setTimeout(() => {
      removeToast(toast);
    }, durationInMS);
  }
}

export default toastStore;
