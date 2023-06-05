import type { Action } from 'svelte/action';

/**
 * Dispatch event after element has been pressed for a duration of time
 */
export const longpress: Action<HTMLElement, number> = (node, duration) => {
  let timeoutID: number;

  const handleMousedown = () => {
    timeoutID = window.setTimeout(() => {
      node.dispatchEvent(new CustomEvent('longpress'));
    }, duration);
  };

  const handleMouseup = () => {
    clearTimeout(timeoutID);
  };

  node.addEventListener('mousedown', handleMousedown);
  node.addEventListener('mouseup', handleMouseup);

  return {
    update(newDuration: number) {
      duration = newDuration;
    },
    destroy() {
      node.removeEventListener('mousedown', handleMousedown);
      node.removeEventListener('mouseup', handleMouseup);
    },
  };
};

/**
 * Track mouse position changes from mouse down on node to mouse up
 */
type MovableOptions = {
  /**
   * Number of pixels to step
   */
  step?: number;

  /**
   * Percentage of parent element's pixels to step
   */
  stepPercent?: number;

  axis?: 'x' | 'y' | 'xy';
};
export const movable: Action<HTMLElement, MovableOptions> = (node, options = {}) => {
  let lastX = 0;
  let lastY = 0;

  function handleMouseDown(event: MouseEvent) {
    lastX = event.clientX;
    lastY = event.clientY;

    node.dispatchEvent(
      new CustomEvent('movestart', {
        detail: { x: lastX, y: lastY },
      })
    );

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }

  function handleMouseMove(event: MouseEvent) {
    // TODO: Handle page scroll?  clientX/Y is based on viewport (apply to parent?)
    let dx = event.clientX - lastX;
    let dy = event.clientY - lastY;

    const xEnabled = options?.axis?.includes('x') ?? true;
    const yEnabled = options?.axis?.includes('y') ?? true;

    if (options.step) {
      if (Math.abs(dx) >= options.step) {
        const overStep = dx % options.step;
        dx = dx - overStep;
        lastX = event.clientX - overStep;
      } else {
        dx = 0;
      }

      if (Math.abs(dy) >= options.step) {
        const overStep = dy % options.step;
        dy = dy - overStep;
        lastY = event.clientY - overStep;
      } else {
        dy = 0;
      }
    } else if (options.stepPercent) {
      const parentWidth = node.parentElement?.offsetWidth ?? 0;
      const parentHeight = node.parentElement?.offsetHeight ?? 0;

      if (Math.abs(dx / parentWidth) >= options.stepPercent) {
        const overStep = dx % (parentWidth * options.stepPercent);
        dx = dx - overStep;
        lastX = event.clientX - overStep;
      } else {
        dx = 0;
      }

      if (Math.abs(dy / parentHeight) >= options.stepPercent) {
        const overStep = dy % (parentHeight * options.stepPercent);
        dy = dy - overStep;
        lastY = event.clientY - overStep;
      } else {
        dy = 0;
      }
    } else {
      lastX = event.clientX;
      lastY = event.clientY;
    }

    if ((xEnabled && dx) || (yEnabled && dy)) {
      node.dispatchEvent(
        new CustomEvent('move', {
          detail: { x: lastX, y: lastX, dx: xEnabled ? dx : 0, dy: yEnabled ? dy : 0 },
        })
      );
    } else {
      // Not enough change
    }
  }

  function handleMouseUp(event: MouseEvent) {
    lastX = event.clientX;
    lastY = event.clientY;

    node.dispatchEvent(
      new CustomEvent('moveend', {
        detail: { x: lastX, y: lastY },
      })
    );

    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }

  node.addEventListener('mousedown', handleMouseDown);

  return {
    destroy() {
      node.removeEventListener('mousedown', handleMouseDown);
    },
  };
};
