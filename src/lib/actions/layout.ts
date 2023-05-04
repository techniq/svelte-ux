/**
 * Set `height` or `max-height` to viewport height excluding node's current viewport top
 */
export function remainingViewportHeight(
  node: HTMLElement,
  options?: { max?: boolean; offset?: number; enabled?: boolean }
): SvelteActionReturnType {
  function update(options) {
    const viewportClientTop = node.getBoundingClientRect().top;
    const property = options?.max ? 'max-height' : 'height';

    if (options?.enabled === false) {
      node.style.removeProperty(property);
    } else {
      node.style.setProperty(
        property,
        `calc(100vh - ${viewportClientTop}px - ${options?.offset ?? 0}px)`
      );
    }
  }

  update(options);
  return { update };
}

/**
 * Set `width` or `max-width` to viewport width excluding node's current viewport left
 */
export function remainingViewportWidth(
  node: HTMLElement,
  options?: { max?: boolean; offset?: number; enabled?: boolean }
): SvelteActionReturnType {
  function update(options) {
    // TODO: Find way to watch/update when viewport location changes (ex. closing side drawer).  Resizer observer does not work for these cases.  Using the absolute positioned sentinel element sounds promising: https://stackoverflow.com/questions/40251082/an-event-or-observer-for-changes-to-getboundingclientrect
    const viewportClientLeft = node.getBoundingClientRect().left;

    const property = options?.max ? 'max-width' : 'width';

    if (options?.enabled === false) {
      node.style.removeProperty(property);
    } else {
      node.style.setProperty(
        property,
        `calc(100vw - ${viewportClientLeft}px - ${options?.offset ?? 0}px)`
      );
    }
  }

  update(options);
  return { update };
}

/**
 * Watch for overflow changes (x or y) and dispatch `overflowX` / `overflowY` events with amount
 */
export function overflow(node: HTMLElement) {
  let overflowedX = 0;
  let overflowedY = 0;

  function update() {
    const prevOverflowedX = overflowedX;
    overflowedX = node.scrollWidth - node.clientWidth;
    if (overflowedX !== prevOverflowedX) {
      node.dispatchEvent(
        new CustomEvent('overflowX', { detail: node.scrollWidth - node.clientWidth })
      );
    }

    const prevOverflowedY = overflowedY;
    overflowedY = node.scrollHeight - node.clientHeight;
    if (overflowedY !== prevOverflowedY) {
      node.dispatchEvent(
        new CustomEvent('overflowY', { detail: node.scrollHeight - node.clientHeight })
      );
    }
  }

  // Update when node resized (and on initial mount)
  const resizeObserver = new ResizeObserver((entries, observer) => {
    update();
  });
  resizeObserver.observe(node);

  // Update when new children (or grandchildren) are added/removed
  const mutationObserver = new MutationObserver((entries, observer) => {
    update();
  });
  mutationObserver.observe(node, { childList: true, subtree: true /*attributes: true, */ }); // TODO: Attributes without filter cause browser to lock up

  return {
    update,
    destroy() {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    },
  };
}
