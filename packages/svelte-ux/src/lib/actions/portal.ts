import type { Action } from 'svelte/action';
import { getSettings } from '$lib/components/settings.js';

export type PortalOptions =
  | {
      enabled?: boolean;
      target?: HTMLElement | string;
    }
  | boolean;

/**
 * Render component outside current DOM hierarchy
 */
export const portal: Action<HTMLElement, PortalOptions> = (node, options) => {
  const defaultTarget = getDefaultTarget();
  moveNode(node, options, defaultTarget);

  return {
    update(options) {
      moveNode(node, options, defaultTarget);
    },
    destroy() {
      const target = getTarget(options, defaultTarget);
      // If target still contains node that was moved, remove it.  Not sure if required
      if (target?.contains(node)) {
        target.removeChild(node);
      }
    },
  };
};

function moveNode(node: HTMLElement, options: PortalOptions = {}, defaultTarget: HTMLElement | string) {
  const enabled = typeof options === 'boolean' ? options : options.enabled;
  if (enabled === false) return;

  const target = getTarget(options, defaultTarget);
  target?.appendChild(node);
}

function getTarget(options: PortalOptions = {}, defaultTarget: HTMLElement | string) {
  const target = typeof options === 'object' ? options.target ?? defaultTarget : defaultTarget;
  if (target instanceof HTMLElement) {
    return target;
  } else {
    return document.querySelector(target) ?? document.body;
  }
}

function getDefaultTarget(): HTMLElement | string  {
  const settings = getSettings();
  return settings.actions?.portal?.target ?? document.body;
}
