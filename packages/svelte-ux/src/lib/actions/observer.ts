import type { Action } from 'svelte/action';

export const resize: Action<Element, ResizeObserverOptions | undefined> = (node, options) => {
  let observer = new ResizeObserver((entries, observer) => {
    entries.forEach((entry) => {
      node.dispatchEvent(new CustomEvent('resize', { detail: entry }));
    });
  });
  observer.observe(node, options);

  return {
    destroy() {
      observer.disconnect();
    },
  };
};

export const intersection: Action<Element, IntersectionObserverInit | undefined> = (
  node,
  options = {}
) => {
  // TODO: Support defininting `options.root = node.parentNode` easily (maybe querySelector() string?)

  let observer = new IntersectionObserver(
    (entries, observer) => {
      const entry = entries[0];
      node.dispatchEvent(new CustomEvent('intersecting', { detail: entry }));
      // if (entry.intersectionRatio > 0) {
      //   node.dispatchEvent(new CustomEvent('visible', { detail: entry }));
      // } else {
      //   node.dispatchEvent(new CustomEvent('invisible', { detail: entry }));
      // }
    },
    { root: node.parentElement, ...options }
  );
  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    },
  };
};

export const mutate: Action<Element, MutationObserverInit> = (node, options) => {
  let observer: MutationObserver | null = null;

  function update(options: MutationObserverInit | undefined) {
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
};
