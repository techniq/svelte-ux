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
    actions: { update?: (options: any) => any; destroy?: () => any }[];
  };

  constructor(node: HTMLElement) {
    this.node = node;

    this.changes = {
      classes: [],
      styles: [],
      attributes: [],
      eventListeners: [],
      actions: [],
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

  addAction(action: { update?: (options: any) => any; destroy?: () => any }) {
    // Action added in creation
    this.changes.actions.push(action);
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

    this.changes.actions.forEach((action) => {
      action.destroy?.();
    });

    this.changes = {
      classes: [],
      styles: [],
      attributes: [],
      eventListeners: [],
      actions: [],
    };
  }
}
