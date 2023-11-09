import { tick } from 'svelte';
import type { ActionReturn } from 'svelte/action';

export function focusMove(
  node: HTMLElement,
  options: { restoreFocus?: boolean; disabled?: boolean } = {
    restoreFocus: false,
    disabled: false,
  }
): ActionReturn {
  if (!options.disabled) {
    let previousActiveElement = document.activeElement;

    // Set `tabIndex` to `-1` which makes any element (ex. div) focusable programmaitcally (and mouse), but not via keyboard navigation - https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
    node.tabIndex = -1;
    // Appear to need to wait for tabIndex to update before applying focus
    tick().then(() => {
      node.focus();
    });

    return {
      destroy() {
        // Restore previous active element
        if (
          !options.disabled &&
          options.restoreFocus &&
          previousActiveElement instanceof HTMLElement
        ) {
          previousActiveElement.focus();
        }
      },
    };
  }

  return {};
}

// TODO: Add `focusTrap`
// https://css-tricks.com/a-css-approach-to-trap-focus-inside-of-an-element/
// export function focusTrap(node: HTMLElement): ActionReturn {
//   //
// }
