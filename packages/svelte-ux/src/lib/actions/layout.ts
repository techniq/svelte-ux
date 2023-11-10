import type { Action } from 'svelte/action';

/**
 * Set `height` or `max-height` to viewport height excluding node's current viewport top
 */
export const remainingViewportHeight: Action<
  HTMLElement,
  { max?: boolean; offset?: number; enabled?: boolean }
> = (node, options) => {
  type Options = typeof options;
  function update(options: Options) {
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
};

/**
 * Set `width` or `max-width` to viewport width excluding node's current viewport left
 */
export const remainingViewportWidth: Action<
  HTMLElement,
  { max?: boolean; offset?: number; enabled?: boolean }
> = (node, options) => {
  type Options = typeof options;
  function update(options: Options) {
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
};

/**
 * Watch for overflow changes (x or y) and dispatch `overflowX` / `overflowY` events with amount
 */
export const overflow: Action<HTMLElement> = (node) => {
  let overflowX = 0;
  let overflowY = 0;

  function update() {
    const prevOverflowX = overflowX;
    overflowX = node.scrollWidth - node.clientWidth;

    const prevOverflowY = overflowY;
    overflowY = node.scrollHeight - node.clientHeight;

    if (overflowX !== prevOverflowX || overflowY !== prevOverflowY) {
      node.dispatchEvent(
        new CustomEvent('overflow', {
          detail: {
            overflowX,
            overflowY,
          },
        })
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
};
