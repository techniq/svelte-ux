import type { Action, ActionReturn } from 'svelte/action';

/**
 * Apply changes to an HTMLElement with the ability to reverse.
 * Useful with Svelte actions when being destroyed
 */
export default class DomTracker {
  node: HTMLElement;

  changes: {
    classes: string[];
    styles: { property: string; value: string }[];
    attributes: { qualifiedName: string; value: string }[];
    eventListeners: { type: string; listener: () => any }[];
    actions: Map<string, ActionReturn | void>;
  };

  constructor(node: HTMLElement) {
    this.node = node;

    this.changes = {
      classes: [],
      styles: [],
      attributes: [],
      eventListeners: [],
      actions: new Map<string, ActionReturn>(),
    };
  }

  addClass(className: string) {
    this.node.classList.add(className);
    this.changes.classes.push(className);
  }

  addStyle(property: string, value: string) {
    this.node.style.setProperty(property, value);
    this.changes.styles.push({ property, value });
  }

  addAttribute(qualifiedName: string, value: string) {
    this.node.setAttribute(qualifiedName, value);
    this.changes.attributes.push({ qualifiedName, value });
  }

  addEventListener(type: string, listener: () => any) {
    this.node.addEventListener(type, listener);
    this.changes.eventListeners.push({ type, listener });
  }

  addAction<TOptions>(action: Action, options: TOptions) {
    const existingAction = this.changes.actions.get(action.name);
    if (existingAction) {
      // Action already created, call action's update() (if available)
      existingAction.update?.(options as any);
    } else {
      // Add new action
      this.changes.actions.set(action.name, action(this.node, options as any));
    }
  }

  reset() {
    this.changes.classes.forEach((className) => {
      this.node.classList.remove(className);
    });

    this.changes.styles.forEach(({ property, value }) => {
      this.node.style.removeProperty(property);
    });

    this.changes.attributes.forEach(({ qualifiedName, value }) => {
      this.node.removeAttribute(qualifiedName);
    });

    this.changes.eventListeners.forEach(({ type, listener }) => {
      this.node.removeEventListener(type, listener);
    });

    // Do not destroy actions so internal state is kept

    this.changes = {
      ...this.changes,
      classes: [],
      styles: [],
      attributes: [],
      eventListeners: [],
    };
  }

  destroy() {
    this.reset();

    // Destroy actions (cleanup any global state like actions on `window`, etc)
    for (var action of this.changes.actions.values()) {
      if (action) {
        action.destroy?.();
      }
    }
  }
}
