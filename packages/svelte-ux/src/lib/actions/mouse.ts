import type { Action } from 'svelte/action';

/**
 * Dispatch event after element has been pressed for a duration of time
 */
export const longpress: Action<HTMLElement, number> = (node, duration) => {
  let timeoutID: number;

  function onMouseDown() {
    timeoutID = window.setTimeout(() => {
      node.dispatchEvent(new CustomEvent('longpress'));
    }, duration);
  }

  function onMouseUp() {
    clearTimeout(timeoutID);
  }

  node.addEventListener('mousedown', onMouseDown);
  node.addEventListener('mouseup', onMouseUp);

  return {
    update(newDuration: number) {
      duration = newDuration;
    },
    destroy() {
      node.removeEventListener('mousedown', onMouseDown);
      node.removeEventListener('mouseup', onMouseUp);
    },
  };
};

// /**
//  * Dispatch event similar to `click` but only if target is same between `mousedown` and `mouseup` (ie. ignore if drag from within input to body)
//  */
// export const clickWithin: Action<HTMLElement, Function> = (node, handle) => {
//   let clickTarget: EventTarget | null = null;

//   function onMouseDown(e: MouseEvent) {
//     clickTarget = e.target;
//   }

//   function onMouseUp(e: MouseEvent) {
//     if (e.target instanceof HTMLElement && clickTarget === e.target) {
//       handle?.(e);
//       node.dispatchEvent(new CustomEvent('clickWithin'));
//     }
//     clickTarget = null;
//   }

//   node.addEventListener('mousedown', onMouseDown);
//   node.addEventListener('mouseup', onMouseUp);

//   return {
//     destroy() {
//       node.removeEventListener('mousedown', onMouseDown);
//       node.removeEventListener('mouseup', onMouseUp);
//     },
//   };
// };

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

/**
 * Track mouse position changes from mouse down on node to mouse up
 */
export const movable: Action<HTMLElement, MovableOptions | undefined> = (node, options = {}) => {
  let lastX = 0;
  let lastY = 0;

  function onMouseDown(event: MouseEvent) {
    lastX = event.clientX;
    lastY = event.clientY;

    node.dispatchEvent(
      new CustomEvent('movestart', {
        detail: { x: lastX, y: lastY },
      })
    );

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }

  function onMouseMove(event: MouseEvent) {
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

  function onMouseUp(event: MouseEvent) {
    lastX = event.clientX;
    lastY = event.clientY;

    node.dispatchEvent(
      new CustomEvent('moveend', {
        detail: { x: lastX, y: lastY },
      })
    );

    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  }

  node.addEventListener('mousedown', onMouseDown);

  return {
    destroy() {
      node.removeEventListener('mousedown', onMouseDown);
    },
  };
};

// TODO: Use options
type MouseCoordsOptions = {
  target: HTMLElement;
  cssVars: boolean;
  context: 'viewport' | 'relative';
};

/** Set relative mouse coordinates as --x/--y CSS variables */
export const mouseCoords: Action<HTMLElement, HTMLElement | undefined> = (node, target = node) => {
  function onMouseMove(e: MouseEvent) {
    // Mouse coordinates relative to node instead of viewport (`e.offsetX/Y` changes based on target/children)
    const rect = node.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    node.style.setProperty('--x', `${x}px`);
    node.style.setProperty('--y', `${y}px`);
  }

  function onMouseLeave() {
    // node.style.removeProperty('--x');
    // node.style.removeProperty('--y');
    node.style.setProperty('--x', `-9999px`);
    node.style.setProperty('--y', `-9999px`);
  }

  // Init x/y values, clear on exit
  onMouseLeave();

  target.addEventListener('mousemove', onMouseMove);
  node.addEventListener('mouseleave', onMouseLeave);

  return {
    update(target: HTMLElement | undefined) {
      target = target;
    },
    destroy() {
      target.removeEventListener('mousedown', onMouseMove);
      node.removeEventListener('mouseleave', onMouseLeave);
    },
  };
};
