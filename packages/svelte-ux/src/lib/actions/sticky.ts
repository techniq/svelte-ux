import type { Action } from 'svelte/action';

import { keys } from '../types/typeHelpers.js';
import DomTracker from './_domTracker.js';

export type Edge = 'top' | 'bottom' | 'left' | 'right';

type StickyOptions = {
  [edge in Edge]?: boolean;
};

/*
  TODO
    - [ ] Consider raising a `stuck` event for styling (example: https://svelte.dev/repl/4ad71e00c86c47d29806e17f09ff0869?version=3.35.0)
*/
export const sticky: Action<HTMLElement, StickyOptions | undefined> = (node, options) => {
  // Track changes so they can be reversed on an update
  const tracker = new DomTracker(node);

  function update(options?: StickyOptions) {
    if (options === undefined) {
      // Default to top sticky if no options passed
      options = { top: true };
    }

    // Reset state from last update
    tracker.reset();

    keys(options).forEach((edge) => {
      const enabled = options![edge] ?? false;

      if (enabled) {
        // TODO: Could smartly only enable once
        tracker.addStyle('position', 'sticky');
      }

      if (enabled) {
        switch (edge) {
          case 'top':
            tracker.addStyle(
              'top',
              `calc(var(--sticky-top, 0px) + ${node.offsetTop}px)` // Add offsetTop to parent (for nested table headers)
            );
            break;
          case 'bottom':
            tracker.addStyle('bottom', `calc(var(--sticky-bottom, 0px))`);
            break;
          case 'left':
            // TODO: Determine workaround for reading `node.offsetLeft` having big performance implicaitons
            tracker.addStyle(
              'left',
              // `calc(var(--sticky-left, 0px) + ${node.offsetLeft}px)` // Add offsetLeft to parent (for columns after the first)
              `calc(var(--sticky-left, 0px))`
            );
            break;
          case 'right':
            tracker.addStyle('right', `calc(var(--sticky-right, 0px))`);
            break;
        }
      }
    });
  }
  update(options);

  function destroy() {
    // Do we always need to reset if being unmounted?
    tracker.reset();
  }

  return {
    update,
    destroy,
  };
};

type StickyContextOptions = { type: 'page' | 'container' };

export const stickyContext: Action<HTMLElement, StickyContextOptions> = (node, options) => {
  const type = options?.type ?? 'page';

  function setSticky() {
    let stickyTop = 0;
    let stickyBottom = 0;

    switch (type) {
      case 'page':
        const marginTop = getComputedStyle(node).marginTop; // Remove marginTop (offsetTop does not include margins)
        stickyTop = node.offsetTop - parseInt(marginTop);

        // If any parent is overflow: 'auto', etc, remove their offset top (as they are the scroll container)
        let parent = node.parentElement;
        while (parent) {
          const overflow = getComputedStyle(parent).overflow;

          if (overflow !== 'visible') {
            stickyTop -= parent.offsetTop;
          }
          parent = parent.parentElement;
        }
        break;

      case 'container':
        stickyTop = 0;
        node.style.setProperty('overflow', 'scroll');
        break;

      default:
        console.error(`Unexpected type: ${type}`);
    }

    node.style.setProperty('--sticky-top', `${stickyTop}px`);

    // TODO: Calculate stickyBottom offset instead of always 0 (only useful for last row).  Tricky as rows can be rendered one at a time (ex. HierarchyTable)
    node.style.setProperty('--sticky-bottom', `${stickyBottom}px`);
  }

  setSticky();
};
