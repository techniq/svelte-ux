import type { Action } from 'svelte/action';

export type PortalOptions =
  | {
      enabled?: boolean;
      target?: HTMLElement | string;
    }
  | boolean;

type PortalTargets = {
  fallbackTarget: Element | null;
  originalParent: HTMLElement | null;
};

/**
 * Render component outside current DOM hierarchy
 */
export const portal: Action<HTMLElement, PortalOptions> = (node, options) => {
  const targets = {
    // prefer ancestors, but it doesn't have to be an ancestor
    fallbackTarget: node.closest('.PortalTarget') ?? document.querySelector('.PortalTarget'),
    originalParent: node.parentElement,
  };
  let currentTarget = moveNode(node, options, targets);

  return {
    update(options) {
      currentTarget = moveNode(node, options, targets);
    },
    destroy() {
      // If target still contains node that was moved, remove it.  Not sure if required
      if (currentTarget && node.parentElement === currentTarget) {
        currentTarget.removeChild(node);
      }
    },
  };
};

function moveNode(
  node: HTMLElement,
  options: PortalOptions = {},
  targets: PortalTargets
): Element | null {
  const enabled = typeof options === 'boolean' ? options : options.enabled;
  if (enabled === false) {
    // Put it back where it came from
    if (targets.originalParent !== node.parentElement) {
      targets.originalParent?.appendChild(node);
    }
    return targets.originalParent;
  }

  const target = getTarget(options, targets.fallbackTarget);
  target?.appendChild(node);
  return target;
}

function getTarget(options: PortalOptions = {}, fallbackTarget: Element | null): Element | null {
  const target = typeof options === 'object' ? options.target : undefined;
  if (target instanceof HTMLElement) {
    return target;
  } else if (typeof target === 'string') {
    return document.querySelector(target);
  } else {
    return fallbackTarget ?? document.body;
  }
}
