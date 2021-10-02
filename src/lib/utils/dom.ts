/**
 * Find the closest scrollable parent
 * - see: https://stackoverflow.com/questions/35939886/find-first-scrollable-parent
 * - see: https://gist.github.com/twxia/bb20843c495a49644be6ea3804c0d775
 */
export function getScrollParent(node): HTMLElement | null {
  const isElement = node instanceof HTMLElement;
  const overflowY = isElement && (window?.getComputedStyle(node).overflowY ?? 'visible');
  const isScrollable = overflowY !== 'visible' && overflowY !== 'hidden';

  if (!node) {
    return null;
  } else if (isScrollable && node.scrollHeight >= node.clientHeight) {
    return node;
  }

  return getScrollParent(node.parentNode) || document.body;
}
