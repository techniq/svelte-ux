import type { Action } from 'svelte/action';

/**
 * Auto focus node when rendered.  Useful for inputs
 */
export const autoFocus: Action<HTMLInputElement | HTMLTextAreaElement, { delay?: number }> = (
  node,
  options?
) => {
  // TODO: Add options to "restoreFocus" on destroy()
  // const elementFocused = document.activeElement as HTMLElement;
  setTimeout(() => {
    node.focus();
  }, options?.delay ?? 0);
};

/**
 * Selects the text inside a text node when the node is focused
 */
export const selectOnFocus: Action<HTMLInputElement | HTMLTextAreaElement> = (node) => {
  const handleFocus = (event: FocusEvent) => {
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
  const handleKey = (event: Event) => {
    if (event.key === 'Escape') {
      node.blur();
    }
  };

  node.addEventListener('keydown', handleKey);

  return {
    destroy() {
      node.removeEventListener('keydown', handleKey);
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
  function resize({ target }) {
    target.style.height = '1px';
    target.style.height = +target.scrollHeight + 'px';
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
  { type: string; listener: (e: Event) => any; timeout?: number }
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
