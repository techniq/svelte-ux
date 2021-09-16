export function resize(node) {
  let observer = new ResizeObserver((entries, observer) => {
    entries.forEach((entry) => {
      node.dispatchEvent(new CustomEvent('resize', { detail: entry }));
    });
  });
  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    },
  };
}

export function intersection(node) {
  const options = {
    root: node.parentNode,
    threshold: 1,
  };

  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      node.dispatchEvent(new CustomEvent('intersecting', { detail: entry }));
    });
  }, options);
  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    },
  };
}

export function mutate(node: HTMLElement | SVGElement, options: MutationObserverInit) {
  let observer: MutationObserver | null = null;

  function update(options: MutationObserverInit) {
    destroy();
    observer = new MutationObserver((mutations) => {
      node.dispatchEvent(new CustomEvent('mutate', { detail: mutations }));
    });
    observer.observe(node, options);
  }

  function destroy() {
    observer?.disconnect();
    observer = null;
  }

  update(options);

  return { update, destroy };
}
