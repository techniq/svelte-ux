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
    offset: 10,
    blur: 6,
    spread: -7,
    color: 'rgba(0,0,0,0.2)',
    scrollRatio: 5,
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

    const shadows = [];

    // Top shadow
    if (verticalScrollPercent > 0) {
      let { offset, blur, spread, color, scrollRatio } = resolvedOptions.top;
      offset = Math.min(scrollTop / scrollRatio, offset);
      shadows.push(`inset 0px ${offset}px ${blur}px ${spread}px ${color}`);
    }

    // Bottom shadow
    if (verticalScrollPercent < 1) {
      let { offset, blur, spread, color, scrollRatio } = resolvedOptions.bottom;
      offset = Math.min((scrollHeight - clientHeight - scrollTop) / scrollRatio, offset);
      shadows.push(`inset 0px -${offset}px ${blur}px ${spread}px ${color}`);
    }

    // Left shadow
    if (horizontalScrollPercent > 0) {
      let { offset, blur, spread, color, scrollRatio } = resolvedOptions.left;
      offset = Math.min(scrollLeft / scrollRatio, offset);
      shadows.push(`inset ${offset}px 0px ${blur}px ${spread}px ${color}`);
    }

    // Right shadow
    if (horizontalScrollPercent < 1) {
      let { offset, blur, spread, color, scrollRatio } = resolvedOptions.right;
      offset = Math.min((scrollWidth - clientWidth - scrollLeft) / scrollRatio, offset);
      shadows.push(`inset -${offset}px 0px ${blur}px ${spread}px ${color}`);
    }

    node.style.setProperty('--shadow', shadows.join(', '));

    node.classList.add(
      'relative',
      'overflow-auto',

      'after:block',
      'after:h-full',
      'after:w-full',
      'after:sticky',
      'after:top-0',
      'after:left-0',
      'after:mt-[-9999px]',
      'after:pointer-events-none',
      'after:[box-shadow:var(--shadow)]'
    );
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
  mutationObserver.observe(node, { childList: true, subtree: true /*attributes: true, */ }); // TODO: Attributes without filter cause browser to lock up

  return {
    destroy() {
      node.removeEventListener('scroll', onScroll);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    },
  };
}
