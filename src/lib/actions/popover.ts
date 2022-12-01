import {
  computePosition,
  Placement,
  autoUpdate,
  ComputePositionConfig,
  flip,
  offset,
  shift,
  autoPlacement,
} from '@floating-ui/dom';
import portal from './portal';

type PopoverOptions = {
  anchorEl?: HTMLElement;
  placement?: Placement;
  offset?: number;
  padding?: number;
  autoPlacement?: boolean;
  matchWidth?: boolean;
};

/*
  TODO:
    - [ ] Add `maxViewportHeight` / `resize`.  See: https://floating-ui.com/docs/size
*/

export function popover(node: HTMLElement, options?: PopoverOptions): SvelteActionReturnType {
  const popoverEl = node;
  const anchorEl = options?.anchorEl ?? node.parentElement;

  const cleanup = autoUpdate(anchorEl, popoverEl, () => {
    // Only allow autoPlacement to swap sides (ex. top/bottom) and not also axises (ex. left/right).  Mathces flip behavor
    const allowedPlacements =
      options?.autoPlacement && options?.placement
        ? [options?.placement, getOppositePlacement(options?.placement)]
        : undefined;

    const positionOptions: ComputePositionConfig = {
      placement: options?.placement,
      middleware: [
        offset(options?.offset),
        options?.autoPlacement ? autoPlacement({ allowedPlacements }) : flip(),
        shift({ padding: options?.padding }),
      ],
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

// See: https://github.com/floating-ui/floating-ui/blob/master/packages/core/src/utils/getOppositePlacement.ts (not exported)
const hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };

export function getOppositePlacement<T extends string>(placement: T): T {
  return placement.replace(/left|right|bottom|top/g, (matched) => (hash as any)[matched]) as T;
}
