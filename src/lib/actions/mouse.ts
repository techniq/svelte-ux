/**
 * Dispatch event after element has been pressed for a duration of time
 */
export function longpress(node: HTMLElement, duration: number) {
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
    update(newDuration) {
      duration = newDuration;
    },
    destroy() {
      node.removeEventListener('mousedown', handleMousedown);
      node.removeEventListener('mouseup', handleMouseup);
    },
  };
}

/**
 * Track mouse position changes from mouse down on node to mouse up
 */
type PannableOptions = {
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
export function pannable(node: HTMLElement, options: PannableOptions = {}): SvelteActionReturnType {
  let lastX = 0;
  let lastY = 0;

  function handleMouseDown(event: MouseEvent) {
    lastX = event.clientX;
    lastY = event.clientY;

    node.dispatchEvent(
      new CustomEvent('panstart', {
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
        dx = dx - (dx % options.step);
        lastX = event.clientX;
      } else {
        dx = 0;
      }

      if (Math.abs(dy) >= options.step) {
        dy = dy - (dy % options.step);
        lastY = event.clientY;
      } else {
        dy = 0;
      }
    } else if (options.stepPercent) {
      const parentWidth = node.parentElement.offsetWidth;
      const parentHeight = node.parentElement.offsetHeight;

      if (Math.abs(dx / parentWidth) >= options.stepPercent) {
        dx = dx - (dx % (parentWidth * options.stepPercent));
        lastX = event.clientX;
      } else {
        dx = 0;
      }

      if (Math.abs(dy / parentHeight) >= options.stepPercent) {
        dy = dy - (dy % (parentHeight * options.stepPercent));
        lastY = event.clientY;
      } else {
        dy = 0;
      }
    } else {
      lastX = event.clientX;
      lastY = event.clientY;
    }

    if ((xEnabled && dx) || (yEnabled && dy)) {
      node.dispatchEvent(
        new CustomEvent('panmove', {
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
      new CustomEvent('panend', {
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
}
