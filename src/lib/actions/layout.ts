/**
 * Set `height` or `max-height` to viewport height excluding node's current viewport top
 */
export function remainingViewportHeight(
  node: HTMLElement,
  options?: { max?: boolean; offset?: number; enabled?: boolean }
): SvelteActionReturnType {
  const max = options?.max ?? false;
  const offset = options?.offset ?? 0;

  const viewportClientTop = node.getBoundingClientRect().top;

  if (options?.enabled !== false) {
    node.style.setProperty(
      max ? 'max-height' : 'height',
      `calc(100vh - ${viewportClientTop}px - ${offset}px)`
    );
  }
}

/**
 * Set `width` or `max-width` to viewport width excluding node's current viewport left
 */
export function remainingViewportWidth(
  node: HTMLElement,
  options?: { max?: boolean; offset?: number; enabled?: boolean }
): SvelteActionReturnType {
  const max = options?.max ?? false;
  const offset = options?.offset ?? 0;

  const viewportClientLeft = node.getBoundingClientRect().left;

  if (options?.enabled !== false) {
    node.style.setProperty(
      max ? 'max-width' : 'width',
      `calc(100vw - ${viewportClientLeft}px - ${offset}px)`
    );
  }
}
