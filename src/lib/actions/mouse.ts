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
export function pannable(node: HTMLElement): SvelteActionReturnType {
  let x = 0;
  let y = 0;

  function handleMouseDown(event: MouseEvent) {
    x = event.clientX;
    y = event.clientY;

    node.dispatchEvent(
      new CustomEvent('panstart', {
        detail: { x, y },
      })
    );

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }

  function handleMouseMove(event: MouseEvent) {
    const dx = event.clientX - x;
    const dy = event.clientY - y;
    x = event.clientX;
    y = event.clientY;

    node.dispatchEvent(
      new CustomEvent('panmove', {
        detail: { x, y, dx, dy },
      })
    );
  }

  function handleMouseUp(event: MouseEvent) {
    x = event.clientX;
    y = event.clientY;

    node.dispatchEvent(
      new CustomEvent('panend', {
        detail: { x, y },
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
