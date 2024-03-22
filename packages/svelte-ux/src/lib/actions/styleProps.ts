import { entries, keys } from '../types/typeHelpers.js';
import type { Action } from 'svelte/action';

type CSSProps = { [key: string]: string | number | boolean | null | undefined };

export const styleProps: Action<HTMLElement, CSSProps> = (node, props) => {
  entries(props ?? {}).forEach(([key, value]) => {
    // Ignore if null or undefined
    if (value != null) {
      value = typeof value === 'boolean' ? (value ? 1 : 0) : value;
      node.style.setProperty(String(key), String(value));
    }
  });

  let lastProps = {};

  return {
    update(newProps: CSSProps) {
      const newKeys = keys(newProps);
      keys(lastProps)
        .filter((key) => !newKeys.includes(key))
        .forEach((key) => node.style.removeProperty(key));

      entries(newProps).forEach(([key, value]) => {
        // Ignore if null or undefined
        if (value != null) {
          node.style.setProperty(String(key), String(value));
        }
        if (props) {
          delete props[key];
        }
      });

      lastProps = newProps;
    },
  };
};
