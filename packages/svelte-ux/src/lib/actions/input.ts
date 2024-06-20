import type { Action } from 'svelte/action';
import { focusMove } from './focus.js';

/**
 * Auto focus node when rendered.  Useful for inputs
 */
export function autoFocus(
  node: HTMLElement | SVGElement,
  options?: Parameters<typeof focusMove>['1']
) {
  // Delay by 1ms by default since Dialog/Drawer/Menu also call `focusMove` but with default `0ms` delay, and we want to focus last
  return focusMove(node, { delay: 1, ...options });
}

/**
 * Selects the text inside a text node when the node is focused
 */
export const selectOnFocus: Action<HTMLInputElement | HTMLTextAreaElement> = (node) => {
  const handleFocus = (event: Event) => {
    node.select();
  };

  node.addEventListener('focus', handleFocus);

  return {
    destroy() {
      node.removeEventListener('focus', handleFocus);
    },
  };
};

/**
 * Blurs the node when Escape is pressed
 */
export const blurOnEscape: Action<HTMLInputElement | HTMLTextAreaElement> = (node) => {
  const handleKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      node.blur();
    }
  };

  (node as HTMLInputElement).addEventListener('keydown', handleKey);

  return {
    destroy() {
      (node as HTMLInputElement).removeEventListener('keydown', handleKey);
    },
  };
};

/**
 * Automatically resize textarea based on content
 * See:
 *  - https://svelte.dev/repl/ead0f1fcd2d4402bbbd64eca1d665341?version=3.14.1
 *  - https://svelte.dev/repl/f1a7e24a08a54947bb4447f295c741fb?version=3.14.1
 */
export const autoHeight: Action<HTMLTextAreaElement> = (node) => {
  function resize({ target }: { target: EventTarget | null }) {
    if (target instanceof HTMLElement) {
      target.style.height = '1px';
      target.style.height = +target.scrollHeight + 'px';
    }
  }

  node.style.overflow = 'hidden';
  node.addEventListener('input', resize);

  // Resize initially
  resize({ target: node });

  return {
    destroy() {
      node.removeEventListener('input', resize);
    },
  };
};

/**
 * Debounce event handler (change, input, etc)
 */
export const debounceEvent: Action<
  HTMLInputElement | HTMLTextAreaElement,
  { type: string; listener: (e: Event) => any; timeout?: number } | undefined | null
> = (node, options) => {
  if (options) {
    const { type, listener, timeout } = options;

    let lastTimeoutId: ReturnType<typeof setTimeout>;

    function onEvent(e: Event) {
      clearTimeout(lastTimeoutId);
      lastTimeoutId = setTimeout(() => {
        listener(e);
      }, timeout ?? 300);
    }

    node.addEventListener(type, onEvent);
    return {
      destroy() {
        node.removeEventListener(type, onEvent);
      },
    };
  }
};
