import type { Action } from 'svelte/action';

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
  moveNode(node, options);

  return {
    update(options) {
      moveNode(node, options);
    },
    destroy() {
      const target = getTarget(options);
      // If target still contains node that was moved, remove it.  Not sure if required
      if (target?.contains(node)) {
        target.removeChild(node);
      }
    },
  };
};

function moveNode(node: HTMLElement, options: PortalOptions = {}) {
  const enabled = typeof options === 'boolean' ? options : options.enabled;
  if (enabled === false) return;

  const target = getTarget(options);
  target?.appendChild(node);
}

function getTarget(options: PortalOptions = {}) {
  const target = typeof options === 'object' ? options.target : undefined;
  if (target instanceof HTMLElement) {
    return target;
  } else if (typeof target === 'string') {
    return document.querySelector(target);
  } else {
    return document.body;
  }
}
