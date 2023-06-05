import type { Action, ActionReturn } from 'svelte/action';

export type Actions<TNode = HTMLElement | SVGElement> = (node: TNode) => ActionReturn[];

/**
 * Helper action to handle multiple actions as a single action.  Useful for adding actions for custom components
 */
export const multi: Action<HTMLElement | SVGElement> = (node, actions?: Actions) => {
  let destroyFuncs: ActionReturn['destroy'][] = [];

  function update() {
    destroy();
    if (actions) {
      destroyFuncs = actions(node)
        .filter((x) => x)
        .map((x) => (x ? x.destroy : () => {}));
    }
  }

  function destroy() {
    destroyFuncs.forEach((fn) => fn?.());
  }

  if (actions?.length) {
    update();
    return { update, destroy };
  }
};
