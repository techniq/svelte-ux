export type Actions<TNode = HTMLElement | SVGElement> = (
  node: TNode
) => (void | { destroy: () => void })[];

/**
 * Helper action to handle multiple actions as a single action.  Useful for adding actions for custom components
 */
export default function multi<TNode = HTMLElement | SVGElement>(
  node: TNode,
  actions?: Actions<TNode>
) {
  let destroyFuncs: (() => void)[] | undefined = undefined;

  function update() {
    destroy();
    destroyFuncs = actions?.(node)
      .filter((x) => x)
      .map((x) => x.destroy);
  }

  function destroy() {
    destroyFuncs?.forEach((fn) => fn());
  }

  update();

  return { update, destroy };
}
