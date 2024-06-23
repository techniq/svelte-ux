import type { Action } from 'svelte/action';
import {
  computePosition,
  autoUpdate,
  flip,
  offset,
  shift,
  autoPlacement,
  size,
  type Alignment,
  type ComputePositionConfig,
  type OffsetOptions,
  type Placement,
} from '@floating-ui/dom';

import { portal } from './portal.js';

export type PopoverOptions = {
  anchorEl?: Element | HTMLElement;
  placement?: Placement;
  offset?: OffsetOptions;
  padding?: number;
  autoPlacement?: boolean;
  matchWidth?: boolean;
  resize?: boolean | 'width' | 'height';
};

export const popover: Action<Element | HTMLElement, PopoverOptions> = (node, options) => {
  const popoverEl = node;
  const anchorEl = options?.anchorEl ?? node.parentElement;

  if (!anchorEl) {
    return;
  }

  const cleanup = autoUpdate(anchorEl, popoverEl as HTMLElement, () => {
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
                ...((options?.resize === true || options?.resize === 'width') && {
                  maxWidth: `${availableWidth}px`,
                }),
                ...((options?.resize === true || options?.resize === 'height') && {
                  maxHeight: `${availableHeight}px`,
                }),
              });
            },
          }),
        shift({ padding: options?.padding }),
      ],
    };
    computePosition(anchorEl, popoverEl as HTMLElement, positionOptions).then(({ x, y }) => {
      Object.assign((popoverEl as HTMLElement).style, {
        left: `${x}px`,
        top: `${y}px`,
        ...(options?.matchWidth && {
          width: `${(anchorEl as HTMLElement).offsetWidth}px`,
        }),
      });
    });
  });

  // Used to track if the mouse changed targets between `mousedown` and `mouseup` (ex. drag from within input to body).  Better control than `click`
  let clickTarget: EventTarget | null = null;
  function onMouseDown(e: MouseEvent) {
    clickTarget = e.target;
  }
  document.addEventListener('mousedown', onMouseDown);

  function onMouseUp(e: MouseEvent) {
    if (
      e.target instanceof HTMLElement &&
      clickTarget === e.target &&
      !anchorEl?.contains(e.target) &&
      !popoverEl.contains(e.target)
    ) {
      node.dispatchEvent(new CustomEvent('clickOutside'));
    }
  }
  document.addEventListener('mouseup', onMouseUp);

  const portalResult = portal(node as HTMLElement, {});

  return {
    destroy() {
      cleanup();
      portalResult?.destroy?.();
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    },
  };
};

// See: https://github.com/floating-ui/floating-ui/blob/master/packages/core/src/utils/getOppositePlacement.ts (not exported)
const hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };

export function getOppositePlacement<T extends string>(placement: T): T {
  return placement.replace(/left|right|bottom|top/g, (matched) => (hash as any)[matched]) as T;
}
