import clsx, { type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * Convert object to style string
 */
export function objectToString(styleObj: { [key: string]: string }) {
  return Object.entries(styleObj)
    .map(([key, value]) => {
      if (value) {
        // Convert camelCase into kaboob-case (ex.  (transformOrigin => transform-origin))
        const propertyName = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        return `${propertyName}: ${value};`;
      } else {
        return null;
      }
    })
    .filter((x) => x)
    .join(' ');
}

/**
 * Wrapper around `tailwind-merge` and `clsx`
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      shadow: ['shadow-border-l', 'shadow-border-r', 'shadow-border-t', 'shadow-border-b'],
    },
  }
});

export const cls = (...inputs: ClassValue[]) => twMerge(clsx(...inputs));
