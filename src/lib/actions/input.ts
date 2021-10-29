import { tick } from 'svelte';

/**
 * Auto focus node when rendered.  Useful for inputs
 */
export function autoFocus(node: HTMLInputElement | HTMLTextAreaElement): SvelteActionReturnType {
  // TODO: Determine why `setTimeout` (`tick` used to work) is required on page transitions for some reason
  // tick().then(() => {
  //   node.focus();
  // });
  setTimeout(() => {
    node.focus();
  }, 0);
}

/**
 * Selects the text inside a text node when the node is focused
 */
export function selectOnFocus(
  node: HTMLInputElement | HTMLTextAreaElement
): SvelteActionReturnType {
  const handleFocus = (event: FocusEvent) => {
    node.select();
  };

  node.addEventListener('focus', handleFocus);

  return {
    destroy() {
      node.removeEventListener('focus', handleFocus);
    },
  };
}

/**
 * Blurs the node when Escape is pressed
 */
export function blurOnEscape(node: HTMLInputElement | HTMLTextAreaElement): SvelteActionReturnType {
  const handleKey = (event) => {
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
}

/**
 * Automatically resize textarea based on content
 * See:
 *  - https://svelte.dev/repl/ead0f1fcd2d4402bbbd64eca1d665341?version=3.14.1
 *  - https://svelte.dev/repl/f1a7e24a08a54947bb4447f295c741fb?version=3.14.1
 */
export function autoHeight(node: HTMLTextAreaElement): SvelteActionReturnType {
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
}

/**
 * Debounce event handler (change, input, etc)
 */
export function debounceEvent(
  node: HTMLInputElement | HTMLTextAreaElement,
  { type, listener, timeout }: { type: string; listener: (e: Event) => any; timeout?: number }
): SvelteActionReturnType {
  let lastTimeoutId;

  function onEvent(e) {
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
