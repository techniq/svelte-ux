export type Actions<TNode = HTMLElement | SVGElement> = (node: TNode) => SvelteActionReturnType[];

/**
 * Helper action to handle multiple actions as a single action.  Useful for adding actions for custom components
 */
export default function multi<TNode = HTMLElement | SVGElement>(
  node: TNode,
  actions?: Actions<TNode>
): SvelteActionReturnType {
  let destroyFuncs: (() => void)[] | undefined = undefined;

  function update() {
    destroy();
    if (actions) {
      destroyFuncs = actions(node)
        .filter((x) => x)
        .map((x) => (x ? x.destroy : () => {}));
    }
  }

  function destroy() {
    destroyFuncs?.forEach((fn) => fn());
  }

  update();

  return { update, destroy };
}
