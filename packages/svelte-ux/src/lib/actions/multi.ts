import type { ActionReturn } from 'svelte/action';

export type Actions<TNode = HTMLElement | SVGElement> = (
  node: TNode
) => (ActionReturn | undefined | null | void)[];

/**
 * Helper action to handle multiple actions as a single action.  Useful for adding actions for custom components
 */
export function multi<TNode extends HTMLElement | SVGElement = any>(
  node: TNode,
  actions?: Actions<TNode>
): ActionReturn<Actions<any> | undefined> | undefined {
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
}
