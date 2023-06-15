import type { Action } from 'svelte/action';

export type PortalOptions =
  | {
      enabled?: boolean;
      target?: HTMLElement | string;
    }
  | boolean;

/**
 * Render component outside current DOM hierarchy
 * @see:
 *  - https://dev.to/jsmitar/svelte-creating-dialog-component-with-use-portal-3hp4
 *  - https://svelte.dev/repl/79e33c2d7695444b994ba74255bb1387?version=3.24.0
 *  - https://svelte.dev/repl/86ec36c27be2471f86590e0c18c7198c?version=3.23.2
 *  - https://github.com/sveltejs/svelte/issues/3088#issuecomment-505785516
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
