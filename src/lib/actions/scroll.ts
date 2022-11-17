export function scrollIntoView(
  node: HTMLElement,
  options: {
    condition: boolean | ((node: HTMLElement) => boolean);
    initial?: boolean;
    delay?: number;
  }
): SvelteActionReturnType {
  // TODO: scroll options not supported by Safari or IE: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView

  function update(options: Parameters<typeof scrollIntoView>[1]) {
    if (typeof options.condition === 'boolean' ? options.condition : options.condition(node)) {
      setTimeout(() => {
        node.scrollIntoView({
          block: 'center',
          behavior: 'smooth',
        });
        // node.scrollIntoViewIfNeeded({
        //   block: 'center',
        // });
      }, options.delay ?? 0);
    }
  }

  if (options.initial !== false) {
    update(options);
  }
  return { update };
}

export function scrollShadow(
  node: HTMLElement,
  options?: {
    top?: {
      color?: string;
    };
    bottom?: {
      color?: string;
    };
    left?: {
      color?: string;
    };
    right?: {
      color?: string;
    };
  }
): SvelteActionReturnType {
  const defaultOptions = {
    color: 'rgba(0,0,0,0.2)',
    length: 10,
  };

  const resolvedOptions = {
    top: {
      ...defaultOptions,
      ...options?.top,
    },
    bottom: {
      ...defaultOptions,
      ...options?.bottom,
    },
    left: {
      ...defaultOptions,
      ...options?.left,
    },
    right: {
      ...defaultOptions,
      ...options?.right,
    },
  };

  function onScroll(e) {
    const { clientWidth, clientHeight, scrollWidth, scrollHeight, scrollTop, scrollLeft } =
      e.target;

    const verticalScrollPercent = scrollTop / (scrollHeight - clientHeight);
    const horizontalScrollPercent = scrollLeft / (scrollWidth - clientWidth);

    const shadowScrollRatio = 5;

    const shadows = [];

    // Top shadow
    if (verticalScrollPercent > 0) {
      const offset = Math.min(scrollTop / shadowScrollRatio, resolvedOptions.top.length);
      shadows.push(`inset 0px ${offset}px 8px -7px ${resolvedOptions.top.color}`);
    }

    // Bottom shadow
    if (verticalScrollPercent < 1) {
      const offset = Math.min(
        (scrollHeight - clientHeight - scrollTop) / shadowScrollRatio,
        resolvedOptions.bottom.length
      );
      shadows.push(`inset 0px -${offset}px 8px -7px ${resolvedOptions.bottom.color}`);
    }

    // Left shadow
    if (horizontalScrollPercent > 0) {
      const offset = Math.min(scrollLeft / shadowScrollRatio, resolvedOptions.left.length);
      shadows.push(`inset ${offset}px 0px 8px -7px ${resolvedOptions.left.color}`);
    }

    // Right shadow
    if (horizontalScrollPercent < 1) {
      const offset = Math.min(
        (scrollWidth - clientWidth - scrollLeft) / shadowScrollRatio,
        resolvedOptions.right.length
      );
      shadows.push(`inset -${offset}px 0px 8px -7px ${resolvedOptions.right.color}`);
    }

    node.style.boxShadow = shadows.join(', ');
  }
  node.addEventListener('scroll', onScroll, { passive: true });

  // Update when node resized (and on initial mount)
  let resizeObserver = new ResizeObserver((entries, observer) => {
    onScroll({ target: node });
  });
  resizeObserver.observe(node);

  let mutationObserver = new MutationObserver((entries, observer) => {
    onScroll({ target: node });
  });
  mutationObserver.observe(node, { childList: true, attributes: true, subtree: true });

  return {
    destroy() {
      node.removeEventListener('scroll', onScroll);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    },
  };
}
