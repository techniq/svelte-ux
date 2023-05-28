import {
  computePosition,
  autoUpdate,
  flip,
  offset,
  shift,
  autoPlacement,
  size,
  type Placement,
  type ComputePositionConfig,
  type Alignment,
} from '@floating-ui/dom';
import portal from './portal';

type PopoverOptions = {
  anchorEl?: HTMLElement;
  placement?: Placement;
  offset?: number;
  padding?: number;
  autoPlacement?: boolean;
  matchWidth?: boolean;
  resize?: boolean;
};

export function popover(node: HTMLElement, options?: PopoverOptions): SvelteActionReturnType {
  const popoverEl = node;
  const anchorEl = options?.anchorEl ?? node.parentElement;

  const cleanup = autoUpdate(anchorEl, popoverEl, () => {
    // Only allow autoPlacement to swap sides (ex. top/bottom) and not also axises (ex. left/right).  Matches flip behavor
    const alignment =
      options?.autoPlacement && options?.placement
        ? (options?.placement.split('-')[1] as Alignment)
        : undefined;
    const allowedPlacements =
      options?.autoPlacement && options?.placement
        ? [options?.placement, getOppositePlacement(options?.placement)]
        : undefined;

    const positionOptions: ComputePositionConfig = {
      placement: options?.placement,
      middleware: [
        offset(options?.offset),
        options?.autoPlacement ? autoPlacement({ alignment, allowedPlacements }) : flip(),
        options?.resize &&
          size({
            padding: options?.padding,
            apply({ availableWidth, availableHeight, elements }) {
              Object.assign(elements.floating.style, {
                maxWidth: `${availableWidth}px`,
                maxHeight: `${availableHeight}px`,
              });
            },
          }),
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

  // Used to track if the mouse changed targets between `mousedown` and `mouseup` (ex. drag from within input to body).  Better control than `click`
  let clickTarget = null;
  function onMouseDown(e) {
    clickTarget = e.target;
  }
  document.addEventListener('mousedown', onMouseDown);

  function onMouseUp(e) {
    if (clickTarget === e.target && !anchorEl.contains(e.target) && !popoverEl.contains(e.target)) {
      node.dispatchEvent(new CustomEvent('clickOutside', node));
    }
  }
  document.addEventListener('mouseup', onMouseUp);

  const portalResult = portal(node);

  return {
    ...portalResult,
    destroy() {
      cleanup();
      portalResult?.destroy?.();
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    },
  };
}

// See: https://github.com/floating-ui/floating-ui/blob/master/packages/core/src/utils/getOppositePlacement.ts (not exported)
const hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };

export function getOppositePlacement<T extends string>(placement: T): T {
  return placement.replace(/left|right|bottom|top/g, (matched) => (hash as any)[matched]) as T;
}
