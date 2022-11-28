import {
  computePosition,
  Placement,
  autoUpdate,
  ComputePositionConfig,
  flip,
  offset,
  shift,
} from '@floating-ui/dom';
import portal from './portal';

type PopoverOptions = {
  anchorEl?: HTMLElement;
  placement?: Placement;
  offset?: number;
  padding?: number;
  matchWidth?: boolean;
};

/*
  TODO:
    - [x] Position
    - [x] Update on scroll
    - [x] matchWidth
    - [x] updatePosition?
      - Not needed anymore (handled by autoUpdate)
    - [x] explicit close
    - [x] Escape to close
    - [ ] Components
      - [ ] Tooltip
      - [ ] Menu
    - [ ] maxViewportHeight
      - Removed (for now).  See: https://floating-ui.com/docs/size
*/

export function popover(node: HTMLElement, options?: PopoverOptions): SvelteActionReturnType {
  const popoverEl = node;
  const anchorEl = options?.anchorEl ?? node.parentElement;

  const cleanup = autoUpdate(anchorEl, popoverEl, () => {
    const positionOptions: ComputePositionConfig = {
      placement: options?.placement,
      middleware: [offset(options?.offset), flip(), shift({ padding: options?.padding })],
    };
    computePosition(anchorEl, popoverEl, positionOptions).then(({ x, y }) => {
      Object.assign(popoverEl.style, {
        left: `${x}px`,
        top: `${y}px`,
        ...(options?.matchWidth && {
          width: `${anchorEl.offsetWidth}px`,
        }),
      });
    });
  });

  function onClickOutside(e) {
    if (!anchorEl.contains(e.target) && !popoverEl.contains(e.target)) {
      node.dispatchEvent(new CustomEvent('clickOutside', node));
    }
  }

  document.addEventListener('click', onClickOutside);

  const portalResult = portal(node);

  return {
    ...portalResult,
    destroy() {
      cleanup();
      portalResult?.destroy?.();
      document.removeEventListener('click', onClickOutside);
    },
  };
}
